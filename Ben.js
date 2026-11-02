const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
const cron = require("node-cron");
const crypto = require("crypto");
const path = require("path");

const app = express();
app.use(express.json());

const DB_PATH = "./breusug.db";
const JWT_SECRET = "breusug-secret-key";

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error("DB error:", err);
  else console.log("Connected to SQLite");
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    referral_code TEXT UNIQUE NOT NULL,
    referred_by TEXT,
    balance REAL DEFAULT 0,
    daily_earnings REAL DEFAULT 375000,
    last_income_at INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (unixepoch())
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    note TEXT,
    created_at INTEGER DEFAULT (unixepoch())
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS referrals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_user_id INTEGER NOT NULL,
    child_user_id INTEGER NOT NULL,
    level INTEGER NOT NULL,
    created_at INTEGER DEFAULT (unixepoch())
  )
`);

function generateReferralCode() {
  return "BR" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

function createToken(user) {
  return jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET, { expiresIn: "7d" });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

function addTransaction(userId, type, amount, note) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO transactions (user_id, type, amount, note) VALUES (?, ?, ?, ?)",
      [userId, type, amount, note],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function getUserByPhone(phone) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE phone = ?", [phone], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function getUserByReferralCode(code) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE referral_code = ?", [code], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

app.use(express.static(path.join(__dirname, ".")));

app.post("/api/signup", async (req, res) => {
  const { phone, password, confirmPassword, referralCode } = req.body;

  if (!phone || !password || !confirmPassword) {
    return res.status(400).json({ error: "Phone number and password are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const existing = await getUserByPhone(phone);
  if (existing) {
    return res.status(400).json({ error: "Phone number already registered" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  let parentUser = null;

  if (referralCode) {
    parentUser = await getUserByReferralCode(referralCode);
  }

  const referral = generateReferralCode();
  const now = Date.now();

  db.run(
    "INSERT INTO users (phone, password_hash, referral_code, referred_by, balance, daily_earnings, last_income_at) VALUES (?, ?, ?, ?, 0, 375000, ?)",
    [phone, passwordHash, referral, parentUser ? parentUser.referral_code : null, now],
    async function (err) {
      if (err) return res.status(500).json({ error: "Signup failed" });

      const newUser = await getUserById(this.lastID);

      if (parentUser) {
        const bonus = Number(newUser.daily_earnings) * 0.25;
        const parentBalance = Number(parentUser.balance) + bonus;

        db.run("UPDATE users SET balance = ? WHERE id = ?", [parentBalance, parentUser.id]);
        await addTransaction(parentUser.id, "referral", bonus, "Level 1 referral bonus");

        db.run(
          "INSERT INTO referrals (parent_user_id, child_user_id, level) VALUES (?, ?, ?)",
          [parentUser.id, newUser.id, 1]
        );
      }

      const token = createToken(newUser);

      res.json({
        token,
        user: {
          id: newUser.id,
          phone: newUser.phone,
          referralCode: newUser.referral_code,
          balance: newUser.balance,
          dailyEarnings: newUser.daily_earnings
        }
      });
    }
  );
});

app.post("/api/login", async (req, res) => {
  const { phone, password } = req.body;

  const user = await getUserByPhone(phone);
  if (!user) return res.status(400).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(400).json({ error: "Invalid password" });

  const token = createToken(user);

  res.json({
    token,
    user: {
      id: user.id,
      phone: user.phone,
      referralCode: user.referral_code,
      balance: user.balance,
      dailyEarnings: user.daily_earnings
    }
  });
});

app.get("/api/dashboard", authMiddleware, async (req, res) => {
  const user = await getUserById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  db.all(
    "SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 20",
    [user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Failed to fetch transactions" });

      res.json({
        user: {
          id: user.id,
          phone: user.phone,
          referralCode: user.referral_code,
          balance: user.balance,
          dailyEarnings: user.daily_earnings,
          lastIncomeAt: user.last_income_at
        },
        transactions: rows
      });
    }
  );
});

app.post("/api/deposit", authMiddleware, async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid deposit amount" });
  }

  const user = await getUserById(req.user.id);
  const newBalance = Number(user.balance) + Number(amount);

  db.run("UPDATE users SET balance = ? WHERE id = ?", [newBalance, user.id], async () => {
    await addTransaction(user.id, "deposit", Number(amount), "Deposit");
    res.json({ balance: newBalance });
  });
});

app.post("/api/withdraw", authMiddleware, async (req, res) => {
  const { amount, name, phone } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid withdrawal amount" });
  }

  const user = await getUserById(req.user.id);
  if (Number(user.balance) < Number(amount)) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  const newBalance = Number(user.balance) - Number(amount);

  db.run("UPDATE users SET balance = ? WHERE id = ?", [newBalance, user.id], async () => {
    await addTransaction(user.id, "withdraw", Number(amount), `Withdrawal by ${name} (${phone})`);
    res.json({ balance: newBalance });
  });
});

app.post("/api/collect-daily", authMiddleware, async (req, res) => {
  const user = await getUserById(req.user.id);
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;

  if (now - Number(user.last_income_at) < msPerDay) {
    return res.status(400).json({ error: "Income can only be collected once every 24 hours" });
  }

  const amount = Number(user.daily_earnings);
  const newBalance = Number(user.balance) + amount;

  db.run("UPDATE users SET balance = ?, last_income_at = ? WHERE id = ?", [newBalance, now, user.id], async () => {
    await addTransaction(user.id, "daily_income", amount, "Daily earnings");
    res.json({ amount, balance: newBalance });
  });
});

cron.schedule("0 0 * * * *", () => {
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;

  db.all("SELECT * FROM users", (err, users) => {
    if (err) return;

    users.forEach((user) => {
      if (now - Number(user.last_income_at) >= msPerDay) {
        const newBalance = Number(user.balance) + Number(user.daily_earnings);

        db.run("UPDATE users SET balance = ?, last_income_at = ? WHERE id = ?", [newBalance, now, user.id], () => {
          addTransaction(user.id, "daily_income", Number(user.daily_earnings), "Auto daily income");
        });
      }
    });
  });
});

app.listen(3000, () => {
  console.log("breus-ug backend running on http://localhost:3000");
});
