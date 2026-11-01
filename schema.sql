<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>breus-ug dashboard</title>
  <style>
    :root{
      --bg:#061a2d;
      --bg-2:#0d2340;
      --sidebar:#0a1d33;
      --panel:#122d4d;
      --panel-2:#163a62;
      --panel-3:#0b233d;
      --line:rgba(151, 205, 255, 0.12);
      --text:#edf8ff;
      --muted:#c2dff9;
      --primary:#49c5ff;
      --primary-2:#00a8ff;
      --green:#3cd98b;
      --gold:#ffd166;
      --danger:#ff6b6b;
      --shadow:0 18px 42px rgba(0,0,0,0.28);
      --radius:18px;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior:smooth; }
    body{
      margin:0; font-family:Arial, Helvetica, sans-serif;
      background: radial-gradient(circle at top left, rgba(73,197,255,0.15), transparent 28%), linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%);
      color:var(--text); line-height:1.6;
    }

    a{ color:inherit; text-decoration:none; }
    button, input{ font:inherit; }

    .app{
      display:grid; grid-template-columns:260px 1fr; min-height:100vh;
    }

    .sidebar{
      background:linear-gradient(180deg, rgba(10,29,51,0.98), rgba(6,26,45,0.98));
      border-right:1px solid var(--line);
      padding:18px 16px;
      position:relative;
    }

    .brand{
      display:flex; align-items:center; gap:12px; padding:10px 8px 18px;
      font-weight:700; letter-spacing:0.06em; text-transform:lowercase;
    }

    .brand-mark{
      width:42px; height:42px; border-radius:12px; display:grid; place-items:center; font-weight:900;
      background:linear-gradient(135deg, var(--primary), var(--primary-2));
      color:#041b2d;
      box-shadow:0 12px 24px rgba(73,197,255,0.25);
    }

    .nav{ display:grid; gap:10px; margin-top:18px; }
    .nav-item{
      display:flex; align-items:center; gap:12px; padding:12px 14px; border-radius:12px; color:var(--muted);
      border:1px solid transparent; transition:0.2s ease; font-weight:600;
    }
    .nav-item:hover{
      background:rgba(255,255,255,0.02); border-color:var(--line); color:var(--text);
    }
    .nav-item.active{
      background:linear-gradient(135deg, rgba(73,197,255,0.12), rgba(0,168,255,0.06));
      border:1px solid rgba(73,197,255,0.2); color:var(--text);
    }
    .nav-badge{
      margin-left:auto; background:rgba(73,197,255,0.12); color:#dff4ff;
      border:1px solid rgba(73,197,255,0.2); border-radius:999px; padding:4px 8px; font-size:0.72rem; font-weight:700;
    }

    .sidebar-card{
      margin-top:22px; background:linear-gradient(180deg, rgba(22,58,90,0.7), rgba(11,29,47,0.7));
      border:1px solid var(--line); border-radius:18px; padding:16px; box-shadow:var(--shadow);
    }
    .sidebar-card h4{
      margin:0 0 10px; font-size:0.92rem; letter-spacing:0.06em; text-transform:uppercase; color:var(--muted);
    }
    .small-amount{
      font-size:1.6rem; font-weight:900; letter-spacing:-0.06em; color:#86e7ff;
    }

    .main{ padding:22px; }

    .topbar{
      display:flex; align-items:center; justify-content:space-between; gap:16px;
      background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:18px; padding:16px 18px; margin-bottom:20px;
    }

    .search-box{
      flex:1; max-width:450px; display:flex; align-items:center; gap:10px;
      background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:12px; padding:11px 14px; color:var(--muted);
    }
    .search-box input{
      width:100%; background:transparent; border:none; outline:none; color:var(--text);
    }

    .topbar-actions{ display:flex; align-items:center; gap:12px; flex-wrap:wrap; }

    .btn{
      border:none; cursor:pointer; border-radius:12px; padding:11px 16px; font-weight:700; transition:0.2s ease;
    }
    .btn:hover{ transform:translateY(-1px); }
    .btn.primary{
      color:#041d32; background:linear-gradient(135deg, var(--primary), var(--primary-2)); box-shadow:0 12px 24px rgba(73,197,255,0.3);
    }
    .btn.secondary{
      background:rgba(255,255,255,0.02); color:var(--text); border:1px solid var(--line);
    }

    .summary-grid{
      display:grid; grid-template-columns:repeat(4, minmax(180px, 1fr)); gap:16px; margin-bottom:20px;
    }

    .card{
      background:linear-gradient(180deg, rgba(23,58,92,0.86), rgba(11,29,47,0.92));
      border:1px solid var(--line); border-radius:18px; box-shadow:var(--shadow); padding:18px 18px 14px;
    }

    .card .label{ color:var(--muted); font-size:0.8rem; letter-spacing:0.08em; text-transform:uppercase; }
    .card .value{
      font-size:2rem; font-weight:900; letter-spacing:-0.06em; margin-top:8px; color:#8ee6ff;
    }
    .card .trend{
      display:inline-flex; align-items:center; gap:8px; margin-top:10px; font-size:0.8rem; color:var(--green); font-weight:700;
    }

    .content-grid{
      display:grid; grid-template-columns:1.3fr 0.7fr; gap:18px;
    }

    .table-card{ padding:18px; }
    .section-head{
      display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px;
    }
    .section-head h3{ margin:0; font-size:1.2rem; }

    table{
      width:100%; border-collapse:collapse;
    }
    th, td{
      text-align:left; padding:12px 12px; border-bottom:1px solid var(--line); font-size:0.95rem;
    }
    th{
      color:var(--muted); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.08em; font-weight:700;
    }
    tbody tr:last-child td{ border-bottom:none; }
    .status{
      display:inline-block; padding:5px 8px; border-radius:999px; font-size:0.76rem; font-weight:700;
      background:rgba(60,217,139,0.12); color:var(--green); border:1px solid rgba(60,217,139,0.25);
    }
    .status.warning{
      background:rgba(255,209,102,0.12); color:var(--gold); border-color:rgba(255,209,102,0.2);
    }

    .side-stack{ display:grid; gap:18px; }
    .mini-panel{ padding:18px; }
    .mini-panel h3{ margin:0 0 12px; font-size:1.05rem; }

    .reward-box, .team-box{ display:grid; gap:12px; margin-top:12px; }
    .reward-item{
      display:flex; align-items:center; justify-content:space-between; gap:10px; padding:12px 10px;
      border-radius:12px; background:rgba(255,255,255,0.02); border:1px solid var(--line);
    }
    .reward-value{
      font-weight:900; color:#8ee6ff; font-size:1.4rem; letter-spacing:-0.05em;
    }

    .team-row{
      display:flex; align-items:center; justify-content:space-between; padding:12px 10px;
      border:1px solid var(--line); border-radius:12px; background:rgba(255,255,255,0.02);
    }
    .team-name{ font-weight:700; }
    .team-meta{ color:var(--muted); font-size:0.8rem; }

    .invite-box{
      margin-top:12px; background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:12px;
      padding:12px 14px; display:flex; align-items:center; justify-content:space-between; gap:12px; word-break:break-all;
    }
    .invite-link{ color:#dff4ff; font-weight:600; }

    .mini-btn{
      background:rgba(73,197,255,0.1); color:#dff4ff; border:1px solid rgba(73,197,255,0.2);
      border-radius:10px; padding:7px 10px; cursor:pointer; font-weight:700;
    }

    .bottom-grid{
      display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:20px;
    }

    .action-box{ padding:18px; }
    .action-box h3{ margin:0 0 12px; font-size:1.1rem; }
    .action-box p{ margin:0 0 12px; color:var(--muted); }

    .phone{
      font-size:1.5rem; font-weight:900; letter-spacing:0.08em; color:var(--green); margin:12px 0 14px;
    }

    .bal-row{
      display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:10px; padding:12px 14px; border:1px solid var(--line); border-radius:12px; background:rgba(255,255,255,0.02);
    }
    .bal-row strong{ font-size:1.3rem; letter-spacing:-0.05em; color:#bceeff; }

    .daily-row{
      display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:12px; padding:12px 14px; border:1px solid rgba(255,209,102,0.25); background:rgba(255,209,102,0.06); border-radius:12px;
    }
    .daily-row strong{ font-size:1.25rem; letter-spacing:-0.05em; color:var(--gold); }

    .modal{
      position:fixed; inset:0; background:rgba(3, 12, 22, 0.7); display:none; place-items:center; z-index:200; padding:16px;
    }
    .modal.show{ display:grid; }

    .modal-box{
      width:min(520px, 100%); background:linear-gradient(180deg,#10314d,#0a1f39); border:1px solid var(--line); border-radius:18px; box-shadow:var(--shadow); padding:22px;
    }

    .modal-header{
      display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;
    }
    .modal-header h3{ margin:0; font-size:1.4rem; }

    .close{
      background:transparent; border:none; color:var(--text); font-size:2rem; cursor:pointer; line-height:1;
    }

    .form-grid{ display:grid; gap:12px; }
    .field{ display:grid; gap:7px; }
    .field label{ color:var(--muted); font-size:0.8rem; font-weight:700; }
    .field input{
      width:100%; border:1px solid var(--line); background:rgba(255,255,255,0.03); border-radius:12px; padding:12px 14px; color:var(--text); outline:none;
    }
    .field input:focus{
      border-color:rgba(73,197,255,0.7); box-shadow:0 0 0 3px rgba(73,197,255,0.12);
    }

    @media (max-width:1100px){
      .app{ grid-template-columns:1fr; }
      .sidebar{ border-right:none; border-bottom:1px solid var(--line); }
      .nav{ grid-template-columns:repeat(2, minmax(150px, 1fr)); }
      .content-grid{ grid-template-columns:1fr; }
    }

    @media (max-width:760px){
      .summary-grid, .bottom-grid{ grid-template-columns:1fr; }
      .topbar{ flex-direction:column; align-items:stretch; }
      .search-box{ max-width:none; }
      .topbar-actions{ justify-content:space-between; }
      .nav{ grid-template-columns:1fr; }
    }
  </style>
</head>
<body>
  <div class="app">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">B</div>
        <span>breus-ug</span>
      </div>

      <nav class="nav">
        <a href="#" class="nav-item active">
          <span>Overview</span>
          <span class="nav-badge">24</span>
        </a>
        <a href="#" class="nav-item"><span>Products</span></a>
        <a href="#" class="nav-item"><span>Team</span><span class="nav-badge">12</span></a>
        <a href="#" class="nav-item"><span>Rewards</span></a>
        <a href="#" class="nav-item" id="balanceNavButton"><span>Account balance</span></a>
        <a href="#" class="nav-item" id="dailyNavButton"><span>Daily earnings</span></a>
        <a href="#" class="nav-item"><span>Deposit</span></a>
        <a href="#" class="nav-item"><span>Withdraw</span></a>
      </nav>

      <div class="sidebar-card">
        <h4>Wallet balance</h4>
        <div class="small-amount" id="walletBalanceDisplay">UGX 0</div>
      </div>
    </aside>

    <main class="main">
      <div class="topbar">
        <div class="search-box">
          <span>🔎</span>
          <input type="text" placeholder="Search products, customers, rewards..." />
        </div>

        <div class="topbar-actions">
          <button class="btn secondary" type="button" id="openBalanceModal">Account balance</button>
          <button class="btn secondary" type="button" id="openDailyModal">Daily earnings</button>
          <button class="btn secondary" type="button" id="openWithdraw">Withdraw</button>
          <button class="btn primary" type="button" id="openDeposit">Deposit</button>
        </div>
      </div>

      <div class="summary-grid">
        <div class="card">
          <div class="label">Customer balance</div>
          <div class="value" id="balanceCard">UGX 0</div>
          <div class="trend">▲ Earnings update every 24 hours</div>
        </div>

        <div class="card">
          <div class="label">Daily earnings</div>
          <div class="value" id="dailyCard">UGX 0</div>
          <div class="trend">▲ Auto-generated daily</div>
        </div>

        <div class="card">
          <div class="label">Total returns</div>
          <div class="value">UGX 3.4M</div>
          <div class="trend">▲ 15.0% fixed</div>
        </div>

        <div class="card">
          <div class="label">Referral bonus</div>
          <div class="value">UGX 1.7M</div>
          <div class="trend">▲ 12.3%</div>
        </div>
      </div>

      <div class="content-grid">
        <div class="card table-card">
          <div class="section-head">
            <h3>Recent customer activity</h3>
            <button class="btn secondary" type="button">Export</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Product</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bakaki Peter</td>
                <td>0748 799100</td>
                <td>Royal Empire</td>
                <td>UGX 3,000,000</td>
                <td><span class="status">Active</span></td>
              </tr>
              <tr>
                <td>Sarah N.</td>
                <td>0772 345678</td>
                <td>Classic Bloom</td>
                <td>UGX 20,000</td>
                <td><span class="status warning">Pending</span></td>
              </tr>
              <tr>
                <td>Joseph K.</td>
                <td>0753 987654</td>
                <td>Velvet Rose</td>
                <td>UGX 40,000</td>
                <td><span class="status">Active</span></td>
              </tr>
              <tr>
                <td>Mary L.</td>
                <td>0782 444321</td>
                <td>Emerald Gold</td>
                <td>UGX 350,000</td>
                <td><span class="status">Active</span></td>
              </tr>
              <tr>
                <td>David M.</td>
                <td>0762 223450</td>
                <td>Golden Muse</td>
                <td>UGX 60,000</td>
                <td><span class="status">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="side-stack">
          <div class="card mini-panel">
            <h3>Referral bonuses</h3>
            <div class="reward-box">
              <div class="reward-item">
                <span>Level 1</span>
                <span class="reward-value">25%</span>
              </div>
              <div class="reward-item">
                <span>Level 2</span>
                <span class="reward-value">2%</span>
              </div>
              <div class="reward-item">
                <span>Level 3</span>
                <span class="reward-value">1%</span>
              </div>
            </div>
          </div>

          <div class="card mini-panel">
            <h3>Top team members</h3>
            <div class="team-box">
              <div class="team-row">
                <div>
                  <div class="team-name">Musa T.</div>
                  <div class="team-meta">12 referrals</div>
                </div>
                <strong>UGX 320K</strong>
              </div>

              <div class="team-row">
                <div>
                  <div class="team-name">Patricia A.</div>
                  <div class="team-meta">8 referrals</div>
                </div>
                <strong>UGX 210K</strong>
              </div>

              <div class="team-row">
                <div>
                  <div class="team-name">Sam B.</div>
                  <div class="team-meta">5 referrals</div>
                </div>
                <strong>UGX 160K</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-grid">
        <div class="card action-box">
          <h3>Deposit</h3>
          <p>Tap to see the official deposit account and make payment.</p>
          <button class="btn primary" type="button" id="showDeposit">Show deposit details</button>
        </div>

        <div class="card action-box">
          <h3>Unique invitation link</h3>
          <p>Every customer can share this to bring more buyers.</p>
          <div class="invite-box">
            <span class="invite-link" id="inviteLink">https://breus-ug.com/invite/BakakiPeter</span>
            <button class="mini-btn" type="button" id="copyInvite">Copy</button>
          </div>
        </div>
      </div>
    </main>
  </div>

  <div class="modal" id="withdrawModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Withdraw form</h3>
        <button class="close" type="button" aria-label="Close" id="closeWithdraw">&times;</button>
      </div>

      <div class="form-grid">
        <div class="field">
          <label>Customer name</label>
          <input type="text" placeholder="Enter customer name" />
        </div>

        <div class="field">
          <label>Phone number</label>
          <input type="tel" placeholder="Enter phone number" />
        </div>
      </div>

      <button class="btn primary" type="button" style="width:100%; margin-top:18px;">Submit withdrawal</button>
    </div>
  </div>

  <div class="modal" id="depositModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Deposit details</h3>
        <button class="close" type="button" aria-label="Close" id="closeDeposit">&times;</button>
      </div>

      <div class="action-box" style="background:none; border:none; box-shadow:none; padding:0;">
        <p>Pay to the account below:</p>
        <div class="phone">0748 799100</div>
        <p><strong>Bakaki Peter</strong></p>
        <button class="btn primary" type="button" id="copyDepositValue">Copy account</button>
      </div>
    </div>
  </div>

  <div class="modal" id="balanceModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Account balance</h3>
        <button class="close" type="button" aria-label="Close" id="closeBalanceModal">&times;</button>
      </div>
      <div class="bal-row">
        <span>Available balance</span>
        <strong id="balanceModalAmount">UGX 0</strong>
      </div>
      <div class="daily-row">
        <span>Daily earnings</span>
        <strong id="dailyModalAmount">UGX 0</strong>
      </div>
      <button class="btn primary" type="button" id="collectDailyBtn" style="width:100%; margin-top:18px;">
        Collect daily income
      </button>
    </div>
  </div>

  <div class="modal" id="dailyModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Daily earnings</h3>
        <button class="close" type="button" aria-label="Close" id="closeDailyModal">&times;</button>
      </div>

      <div class="action-box" style="background:none; border:none; box-shadow:none; padding:0;">
        <p>Next income refresh in</p>
        <div class="phone" id="countdownText">24:00:00</div>

        <div class="bal-row">
          <span>Today's earnings</span>
          <strong id="todayEarningsValue">UGX 0</strong>
        </div>

        <button class="btn primary" type="button" id="manualIncomeBtn" style="width:100%; margin-top:18px;">
          Generate daily income now
        </button>
      </div>
    </div>
  </div>

  <script>
    const STORAGE_KEY = "breus_ug_daily_income";
    const defaultState = { balance: 2500000, dailyEarnings: 375000, lastIncomeAt: Date.now() };

    function loadState() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return { ...defaultState };
        return { ...defaultState, ...JSON.parse(stored) };
      } catch {
        return { ...defaultState };
      }
    }

    let state = loadState();

    function formatMoney(value) {
      return new Intl.NumberFormat("en-US").format(value);
    }

    function formatUGX(value) {
      return "UGX " + formatMoney(value);
    }

    function saveState() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function updateBalanceUI() {
      document.getElementById("walletBalanceDisplay").textContent = formatUGX(state.balance);
      document.getElementById("balanceCard").textContent = formatUGX(state.balance);
      document.getElementById("dailyCard").textContent = formatUGX(state.dailyEarnings);
      document.getElementById("balanceModalAmount").textContent = formatUGX(state.balance);
      document.getElementById("dailyModalAmount").textContent = formatUGX(state.dailyEarnings);
      document.getElementById("todayEarningsValue").textContent = formatUGX(state.dailyEarnings);
      saveState();
    }

    function getTimeUntilNextIncome() {
      const msPerDay = 24 * 60 * 60 * 1000;
      const elapsed = Date.now() - state.lastIncomeAt;
      const remaining = msPerDay - (elapsed % msPerDay);
      return Math.max(0, remaining);
    }

    function updateCountdown() {
      const remaining = getTimeUntilNextIncome();
      const totalSeconds = Math.floor(remaining / 1000);

      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const seconds = String(totalSeconds % 60).padStart(2, "0");

      document.getElementById("countdownText").textContent = hours + ":" + minutes + ":" + seconds;
    }

    function applyDailyIncome() {
      state.balance += state.dailyEarnings;
      state.lastIncomeAt = Date.now();
      updateBalanceUI();
      updateCountdown();
      alert("Daily income generated: " + formatUGX(state.dailyEarnings));
    }

    function syncPastIncome() {
      const msPerDay = 24 * 60 * 60 * 1000;
      const elapsed = Date.now() - state.lastIncomeAt;

      if (elapsed >= msPerDay) {
        const cycles = Math.floor(elapsed / msPerDay);
        state.balance += state.dailyEarnings * cycles;
        state.lastIncomeAt = Date.now() - (elapsed % msPerDay);
      }
    }

    function copyText(value) {
      const temp = document.createElement("textarea");
      temp.value = value;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
      alert("Copied: " + value);
    }

    document.getElementById("openBalanceModal").addEventListener("click", function() {
      document.getElementById("balanceModal").classList.add("show");
    });
    document.getElementById("balanceNavButton").addEventListener("click", function(e) {
      e.preventDefault();
      document.getElementById("balanceModal").classList.add("show");
    });
    document.getElementById("closeBalanceModal").addEventListener("click", function() {
      document.getElementById("balanceModal").classList.remove("show");
    });

    document.getElementById("openDailyModal").addEventListener("click", function() {
      document.getElementById("dailyModal").classList.add("show");
    });
    document.getElementById("dailyNavButton").addEventListener("click", function(e) {
      e.preventDefault();
      document.getElementById("dailyModal").classList.add("show");
    });
    document.getElementById("closeDailyModal").addEventListener("click", function() {
      document.getElementById("dailyModal").classList.remove("show");
    });

    document.getElementById("openDeposit").addEventListener("click", function() {
      document.getElementById("depositModal").classList.add("show");
    });
    document.getElementById("showDeposit").addEventListener("click", function() {
      document.getElementById("depositModal").classList.add("show");
    });
    document.getElementById("closeDeposit").addEventListener("click", function() {
      document.getElementById("depositModal").classList.remove("show");
    });

    document.getElementById("openWithdraw").addEventListener("click", function() {
      document.getElementById("withdrawModal").classList.add("show");
    });
    document.getElementById("closeWithdraw").addEventListener("click", function() {
      document.getElementById("withdrawModal").classList.remove("show");
    });

    document.getElementById("copyInvite").addEventListener("click", function() {
      copyText(document.getElementById("inviteLink").textContent);
    });

    document.getElementById("copyDepositValue").addEventListener("click", function() {
      copyText("0748 799100");
    });

    document.getElementById("collectDailyBtn").addEventListener("click", function() {
      applyDailyIncome();
    });

    document.getElementById("manualIncomeBtn").addEventListener("click", function() {
      applyDailyIncome();
    });

    document.getElementById("balanceModal").addEventListener("click", function(e){
      if (e.target.id === "balanceModal") e.target.classList.remove("show");
    });

    document.getElementById("dailyModal").addEventListener("click", function(e){
      if (e.target.id === "dailyModal") e.target.classList.remove("show");
    });

    document.getElementById("depositModal").addEventListener("click", function(e){
      if (e.target.id === "depositModal") e.target.classList.remove("show");
    });

    document.getElementById("withdrawModal").addEventListener("click", function(e){
      if (e.target.id === "withdrawModal") e.target.classList.remove("show");
    });

    syncPastIncome();
    updateBalanceUI();
    updateCountdown();

    setInterval(function() {
      syncPastIncome();
      updateBalanceUI();
      updateCountdown();
    }, 1000);
  </script>
</body>
</html>
