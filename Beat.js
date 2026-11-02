<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>breus-ug</title>
  <style>
    :root{
      --bg:#061a2d;
      --bg-2:#0d2340;
      --sidebar:#0a1d33;
      --panel:#122d4d;
      --line:rgba(164, 213, 255, 0.12);
      --text:#edf8ff;
      --muted:#cfe9ff;
      --primary:#52c3ff;
      --primary-2:#00a8ff;
      --green:#3bd98c;
      --gold:#ffd166;
      --danger:#ff7a7a;
      --shadow:0 18px 44px rgba(0,0,0,0.32);
    }

    *{ box-sizing:border-box; }
    html{ scroll-behavior:smooth; }
    body{
      margin:0;
      font-family:Arial, Helvetica, sans-serif;
      background:radial-gradient(circle at top left, rgba(82,195,255,0.16), transparent 28%), linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%);
      color:var(--text);
      line-height:1.6;
    }

    a{ color:inherit; text-decoration:none; }
    img{ display:block; max-width:100%; }
    button,input{ font:inherit; }

    .hidden{ display:none !important; }

    .container{ width:min(1250px, calc(100% - 28px)); margin:0 auto; }

    .topbar{
      position:sticky; top:0; z-index:30; background:rgba(7,29,49,0.78); backdrop-filter:blur(10px); border-bottom:1px solid var(--line);
    }

    .nav{ min-height:80px; display:flex; align-items:center; justify-content:space-between; gap:18px; }
    .brand{ display:flex; align-items:center; gap:12px; font-weight:700; letter-spacing:0.06em; text-transform:lowercase; }
    .brand-mark{
      width:42px; height:42px; border-radius:12px; display:grid; place-items:center; font-weight:900;
      background:linear-gradient(135deg, var(--primary), var(--primary-2)); color:#021b2d; box-shadow:0 12px 24px rgba(82,195,255,0.25);
    }

    .nav-links{ display:flex; align-items:center; gap:20px; color:var(--muted); font-weight:600; font-size:0.95rem; }
    .nav-links a:hover{ color:var(--text); }

    .nav-actions{ display:flex; align-items:center; gap:12px; flex-wrap:wrap; }

    .btn{
      border:none; cursor:pointer; border-radius:12px; padding:11px 16px; font-weight:700; transition:0.2s ease;
    }
    .btn:hover{ transform:translateY(-1px); }
    .btn:disabled{
      opacity:0.55;
      cursor:not-allowed;
      transform:none;
    }

    .btn.primary{
      color:#041d32;
      background:linear-gradient(135deg, var(--primary), var(--primary-2));
      box-shadow:0 12px 26px rgba(82,195,255,0.32);
    }

    .btn.secondary{
      background:rgba(255,255,255,0.02); color:var(--text); border:1px solid var(--line);
    }

    .panel{
      background:linear-gradient(180deg, rgba(23,58,92,0.9), rgba(11,29,47,0.94));
      border:1px solid var(--line); border-radius:22px; box-shadow:var(--shadow);
    }

    .hero{ padding:60px 0 30px; }
    .hero-grid{ display:grid; grid-template-columns:1.2fr 0.8fr; gap:26px; align-items:center; }

    .eyebrow{
      display:inline-flex; align-items:center; padding:8px 14px; border-radius:999px; border:1px solid rgba(82,195,255,0.25); background:rgba(82,195,255,0.08); color:#dff4ff; font-size:0.72rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:18px;
    }

    h1{ margin:0; font-size:clamp(2.8rem, 5vw, 5rem); line-height:1.02; letter-spacing:-0.07em; }
    .hero-copy p{ color:var(--muted); margin:18px 0 25px; max-width:640px; font-size:1.08rem; }
    .hero-actions{ display:flex; flex-wrap:wrap; gap:12px; margin-bottom:28px; }

    .stats-row{ display:grid; grid-template-columns:repeat(3, minmax(120px, 1fr)); gap:16px; max-width:620px; }
    .stat-box{
      background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:16px; padding:18px 14px; box-shadow:var(--shadow);
    }
    .stat-box strong{
      display:block; font-size:1.7rem; margin-bottom:6px; color:#8de6ff; letter-spacing:-0.05em;
    }
    .stat-box span{ color:var(--muted); font-size:0.84rem; }

    .signup-panel{ padding:22px; }
    .signup-panel h3{ margin:0 0 18px; font-size:1.5rem; }

    .form-grid{ display:grid; gap:12px; }
    .field{ display:grid; gap:7px; }
    .field label{ color:var(--muted); font-size:0.8rem; font-weight:700; }
    .field input{
      width:100%; border:1px solid var(--line); background:rgba(255,255,255,0.03); border-radius:12px; padding:12px 14px; color:var(--text); outline:none;
    }
    .field input:focus{
      border-color:rgba(82,195,255,0.75); box-shadow:0 0 0 3px rgba(82,195,255,0.12);
    }

    .verification-box{
      display:flex; align-items:center; justify-content:space-between; gap:10px; border:1px solid var(--line); background:rgba(255,255,255,0.03); border-radius:12px; padding:10px 12px;
    }
    .code{ font-weight:900; letter-spacing:0.12em; color:#dff4ff; font-size:0.98rem; }
    .mini-btn{
      border:none; background:rgba(59,217,140,0.12); color:var(--green); border:1px solid rgba(59,217,140,0.3); border-radius:10px; padding:8px 10px; cursor:pointer; font-weight:700;
    }
    .signup-panel .btn{ width:100%; margin-top:14px; }
    .notice{ margin-top:12px; color:var(--muted); font-size:0.8rem; text-align:center; }

    section{ padding:32px 0; }
    .section-head{ display:flex; align-items:end; justify-content:space-between; gap:16px; margin-bottom:20px; }
    .section-head h2{ margin:0; font-size:clamp(1.9rem, 3vw, 2.8rem); letter-spacing:-0.06em; }
    .section-head p{ margin:0; color:var(--muted); }

    .products{ display:grid; grid-template-columns:repeat(4, minmax(220px, 1fr)); gap:20px; }
    .product-card{
      background:linear-gradient(180deg, rgba(22,55,88,0.84), rgba(11,29,47,0.96));
      border:1px solid var(--line); border-radius:20px; overflow:hidden; box-shadow:var(--shadow);
    }
    .product-card img{ width:100%; height:220px; object-fit:cover; }
    .product-body{ padding:16px 16px 18px; }
    .product-top{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:10px; }
    .product-name{ font-weight:700; font-size:1.05rem; }
    .badge{
      background:rgba(82,195,255,0.1); border:1px solid rgba(82,195,255,0.22); color:#dff4ff; padding:5px 8px; border-radius:999px; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em;
    }
    .price{ font-size:1.7rem; font-weight:900; color:#8de6ff; letter-spacing:-0.06em; margin:8px 0 14px; }
    .small{ display:flex; justify-content:space-between; gap:12px; color:var(--muted); font-size:0.8rem; margin-top:8px; }
    .buy-btn{
      width:100%; margin-top:14px; background:linear-gradient(135deg, #0d3c72, #0c2d53); border:1px solid rgba(82,195,255,0.18); color:var(--text);
    }

    .returns-layout{ display:grid; grid-template-columns:1.08fr 0.92fr; gap:22px; align-items:stretch; }
    .highlight{ background:linear-gradient(135deg, rgba(82,195,255,0.12), rgba(0,168,255,0.08)); border:1px solid rgba(82,195,255,0.2); }
    .returns-panel{ padding:22px; }
    .returns-list{ display:grid; gap:12px; margin-top:18px; }
    .returns-item{
      display:flex; align-items:center; justify-content:space-between; gap:16px; background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:14px; padding:14px 16px;
    }
    .returns-item strong{ color:var(--green); font-size:1.3rem; letter-spacing:-0.04em; }
    .bonus-grid{ display:grid; grid-template-columns:repeat(3, minmax(150px, 1fr)); gap:16px; margin-top:18px; }
    .bonus-item{
      background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:16px; padding:18px 16px; text-align:center;
    }
    .bonus-item .tier{ color:var(--muted); font-size:0.75rem; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px; }
    .bonus-item .value{ font-size:2rem; letter-spacing:-0.06em; color:#8de6ff; font-weight:900; }

    .action-row{ display:grid; grid-template-columns:repeat(2, minmax(220px, 1fr)); gap:20px; margin-top:18px; }
    .action-box{
      background:linear-gradient(180deg, rgba(22,55,88,0.8), rgba(11,29,47,0.96));
      border:1px solid var(--line); border-radius:18px; padding:20px; box-shadow:var(--shadow);
    }
    .action-box h3{ margin:0 0 8px; font-size:1.2rem; }
    .action-box p{ margin:0 0 12px; color:var(--muted); }
    .phone-number{ font-size:1.35rem; font-weight:900; color:var(--green); letter-spacing:0.08em; margin:10px 0 16px; }

    .team-layout{ display:grid; grid-template-columns:1fr 1fr; gap:22px; align-items:stretch; }
    .team-card{ padding:20px; }
    .team-stats{ display:grid; grid-template-columns:repeat(3, minmax(110px, 1fr)); gap:12px; margin-top:12px; }
    .team-stat{
      background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:14px; text-align:center; padding:12px 10px;
    }
    .team-stat strong{ display:block; font-size:1.9rem; color:#8de6ff; letter-spacing:-0.05em; margin-bottom:3px; }
    .team-stat span{ color:var(--muted); font-size:0.8rem; }
    .invite-box{
      display:flex; align-items:center; justify-content:space-between; gap:12px; background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:12px; padding:12px 14px; margin-top:16px; word-break:break-all;
    }
    .invite-url{ color:#eaf9ff; font-weight:600; }

    .footer{ padding:30px 0 50px; color:var(--muted); text-align:center; border-top:1px solid var(--line); margin-top:28px; }

    .auth-shell{
      width:min(1100px, 100%);
      background:linear-gradient(180deg, rgba(16, 45, 77, 0.9), rgba(7, 26, 45, 0.94));
      border:1px solid var(--line); border-radius:24px; box-shadow:var(--shadow); overflow:hidden; display:grid; grid-template-columns:1.1fr 0.9fr; margin:40px auto;
    }
    .brand-side{
      padding:36px 28px; background:linear-gradient(180deg, rgba(82,195,255,0.08), rgba(0,0,0,0.1)), linear-gradient(135deg, rgba(11,30,49,0.9), rgba(13, 35, 64, 0.8)); border-right:1px solid var(--line); position:relative;
    }
    .auth-brand{ display:flex; align-items:center; gap:12px; font-weight:700; letter-spacing:0.06em; text-transform:lowercase; margin-bottom:30px; }
    .auth-brand-mark{ width:44px; height:44px; border-radius:12px; display:grid; place-items:center; font-weight:900; background:linear-gradient(135deg, var(--primary), var(--primary-2)); color:#021b2d; box-shadow:0 12px 24px rgba(82,195,255,0.25); }
    .welcome-box{ margin-top:30px; padding:18px 20px; border:1px solid var(--line); border-radius:18px; background:rgba(255,255,255,0.02); }
    .welcome-box h1{ margin:0 0 10px; font-size:clamp(2.1rem, 3vw, 3.5rem); line-height:1.05; letter-spacing:-0.06em; }
    .welcome-box p{ margin:0; color:var(--muted); font-size:1rem; }
    .feature-list{ margin-top:24px; display:grid; gap:12px; }
    .feature-item{
      display:flex; align-items:center; gap:10px; color:var(--muted); background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:12px; padding:10px 12px; font-weight:600;
    }
    .dot{ width:10px; height:10px; border-radius:50%; background:linear-gradient(135deg, var(--primary), var(--green)); box-shadow:0 0 18px rgba(82,195,255,0.5); }
    .form-side{ padding:36px 28px; display:flex; align-items:center; justify-content:center; }
    .form-panel{ width:min(100%, 430px); }
    .toptext{ margin-bottom:24px; }
    .toptext h2{ margin:0 0 8px; font-size:2rem; letter-spacing:-0.05em; }
    .toptext p{ margin:0; color:var(--muted); }
    .row{ display:flex; align-items:center; justify-content:space-between; gap:8px; margin:8px 0 18px; font-size:0.85rem; color:var(--muted); }
    .row a{ color:#dff4ff; text-decoration:none; font-weight:700; }
    .divider{ display:flex; align-items:center; gap:12px; margin:20px 0; color:var(--muted); font-size:0.8rem; }
    .divider::before, .divider::after{ content:""; flex:1; height:1px; background:var(--line); }
    .help{ margin-top:20px; text-align:center; color:var(--muted); font-size:0.9rem; }
    .help a{ color:#dff4ff; font-weight:700; text-decoration:none; }
    .checkbox-row{ display:flex; align-items:center; gap:8px; color:var(--muted); font-size:0.84rem; margin-bottom:18px; }

    .app{
      display:grid; grid-template-columns:260px 1fr; min-height:100vh;
    }
    .sidebar{
      background:linear-gradient(180deg, rgba(10,29,51,0.98), rgba(6,26,45,0.98)); border-right:1px solid var(--line); padding:18px 16px; position:relative;
    }
    .nav{ display:grid; gap:10px; margin-top:18px; }
    .nav-item{
      display:flex; align-items:center; gap:12px; padding:12px 14px; border-radius:12px; color:var(--muted); border:1px solid transparent; transition:0.2s ease; font-weight:600;
    }
    .nav-item:hover{ background:rgba(255,255,255,0.02); border-color:var(--line); color:var(--text); }
    .nav-item.active{ background:linear-gradient(135deg, rgba(73,197,255,0.12), rgba(0,168,255,0.06)); border:1px solid rgba(73,197,255,0.2); color:var(--text); }
    .nav-badge{ margin-left:auto; background:rgba(73,197,255,0.12); color:#dff4ff; border:1px solid rgba(73,197,255,0.2); border-radius:999px; padding:4px 8px; font-size:0.72rem; font-weight:700; }
    .sidebar-card{
      margin-top:22px; background:linear-gradient(180deg, rgba(22,58,90,0.7), rgba(11,29,47,0.7)); border:1px solid var(--line); border-radius:18px; padding:16px; box-shadow:var(--shadow);
    }
    .sidebar-card h4{ margin:0 0 10px; font-size:0.92rem; letter-spacing:0.06em; text-transform:uppercase; color:var(--muted); }
    .small-amount{ font-size:1.6rem; font-weight:900; letter-spacing:-0.06em; color:#86e7ff; }

    .main{ padding:22px; }
    .topbar-dashboard{
      display:flex; align-items:center; justify-content:space-between; gap:16px; background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:18px; padding:16px 18px; margin-bottom:20px;
    }
    .search-box{
      flex:1; max-width:450px; display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:12px; padding:11px 14px; color:var(--muted);
    }
    .search-box input{ width:100%; background:transparent; border:none; outline:none; color:var(--text); }
    .topbar-actions{ display:flex; align-items:center; gap:12px; flex-wrap:wrap; }

    .summary-grid{ display:grid; grid-template-columns:repeat(4, minmax(180px, 1fr)); gap:16px; margin-bottom:20px; }
    .card{
      background:linear-gradient(180deg, rgba(23,58,92,0.86), rgba(11,29,47,0.92)); border:1px solid var(--line); border-radius:18px; box-shadow:var(--shadow); padding:18px 18px 14px;
    }
    .card .label{ color:var(--muted); font-size:0.8rem; letter-spacing:0.08em; text-transform:uppercase; }
    .card .value{ font-size:2rem; font-weight:900; letter-spacing:-0.06em; margin-top:8px; color:#8ee6ff; }
    .card .trend{ display:inline-flex; align-items:center; gap:8px; margin-top:10px; font-size:0.8rem; color:var(--green); font-weight:700; }

    .content-grid{ display:grid; grid-template-columns:1.3fr 0.7fr; gap:18px; }
    .table-card{ padding:18px; }
    .section-head{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px; }
    .section-head h3{ margin:0; font-size:1.2rem; }
    table{ width:100%; border-collapse:collapse; }
    th,td{ text-align:left; padding:12px 12px; border-bottom:1px solid var(--line); font-size:0.95rem; }
    th{ color:var(--muted); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.08em; font-weight:700; }
    tbody tr:last-child td{ border-bottom:none; }
    .status{ display:inline-block; padding:5px 8px; border-radius:999px; font-size:0.76rem; font-weight:700; background:rgba(60,217,139,0.12); color:var(--green); border:1px solid rgba(60,217,139,0.25); }
    .status.warning{ background:rgba(255,209,102,0.12); color:var(--gold); border-color:rgba(255,209,102,0.2); }
    .side-stack{ display:grid; gap:18px; }
    .mini-panel{ padding:18px; }
    .mini-panel h3{ margin:0 0 12px; font-size:1.05rem; }
    .reward-box,.team-box{ display:grid; gap:12px; margin-top:12px; }
    .reward-item{
      display:flex; align-items:center; justify-content:space-between; gap:10px; padding:12px 10px; border-radius:12px; background:rgba(255,255,255,0.02); border:1px solid var(--line);
    }
    .reward-value{ font-weight:900; color:#8ee6ff; font-size:1.4rem; letter-spacing:-0.05em; }
    .team-row{ display:flex; align-items:center; justify-content:space-between; padding:12px 10px; border:1px solid var(--line); border-radius:12px; background:rgba(255,255,255,0.02); }
    .team-name{ font-weight:700; }
    .team-meta{ color:var(--muted); font-size:0.8rem; }
    .invite-box{ margin-top:12px; background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:12px; padding:12px 14px; display:flex; align-items:center; justify-content:space-between; gap:12px; word-break:break-all; }
    .invite-link{ color:#dff4ff; font-weight:600; }
    .bottom-grid{ display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:20px; }
    .action-box{ padding:18px; }
    .action-box h3{ margin:0 0 12px; font-size:1.1rem; }
    .action-box p{ margin:0 0 12px; color:var(--muted); }
    .phone{ font-size:1.5rem; font-weight:900; letter-spacing:0.08em; color:var(--green); margin:12px 0 14px; }
    .bal-row{
      display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:10px; padding:12px 14px; border:1px solid var(--line); border-radius:12px; background:rgba(255,255,255,0.02);
    }
    .bal-row strong{ font-size:1.3rem; letter-spacing:-0.05em; color:#bceeff; }
    .daily-row{
      display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:12px; padding:12px 14px; border:1px solid rgba(255,209,102,0.25); background:rgba(255,209,102,0.06); border-radius:12px;
    }
    .daily-row strong{ font-size:1.25rem; letter-spacing:-0.05em; color:var(--gold); }

    .withdraw-history-list{
      display:grid; gap:10px; margin-top:14px;
    }
    .history-item{
      display:flex; justify-content:space-between; align-items:center; gap:12px;
      background:rgba(255,255,255,0.02); border:1px solid var(--line); border-radius:12px; padding:12px 14px;
    }
    .history-item strong{ font-size:1rem; }
    .history-status{
      color:var(--gold);
      background:rgba(255,209,102,0.08);
      border:1px solid rgba(255,209,102,0.18);
      padding:6px 10px;
      border-radius:999px;
      font-size:0.72rem;
      font-weight:700;
      text-transform:uppercase;
      letter-spacing:0.04em;
    }

    .modal{
      position:fixed; inset:0; background:rgba(3, 12, 22, 0.7); display:none; place-items:center; z-index:200; padding:16px;
    }
    .modal.show{ display:grid; }
    .modal-box{
      width:min(520px, 100%); background:linear-gradient(180deg,#10314d,#0a1f39); border:1px solid var(--line); border-radius:18px; box-shadow:var(--shadow); padding:22px;
    }
    .modal-header{ display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
    .modal-header h3{ margin:0; font-size:1.4rem; }
    .close{ background:transparent; border:none; color:var(--text); font-size:2rem; cursor:pointer; line-height:1; }

    @media (max-width: 980px){
      .hero-grid, .returns-layout, .team-layout{ grid-template-columns:1fr; }
      .products{ grid-template-columns:repeat(2, minmax(220px, 1fr)); }
      .bonus-grid{ grid-template-columns:1fr; }
      .auth-shell{ grid-template-columns:1fr; }
      .brand-side{ border-right:none; border-bottom:1px solid var(--line); }
      .app{ grid-template-columns:1fr; }
      .sidebar{ border-right:none; border-bottom:1px solid var(--line); }
      .nav{ grid-template-columns:repeat(2, minmax(150px, 1fr)); }
      .content-grid{ grid-template-columns:1fr; }
    }

    @media (max-width: 720px){
      .nav{ flex-wrap:wrap; justify-content:center; padding:14px 0; }
      .nav-links{ order:3; width:100%; justify-content:center; flex-wrap:wrap; }
      .products{ grid-template-columns:1fr; }
      .stats-row{ grid-template-columns:1fr; }
      .action-row{ grid-template-columns:1fr; }
      .team-stats{ grid-template-columns:1fr; }
      .section-head{ flex-direction:column; align-items:flex-start; }
      .summary-grid, .bottom-grid{ grid-template-columns:1fr; }
      .topbar-dashboard{ flex-direction:column; align-items:stretch; }
      .search-box{ max-width:none; }
      .topbar-actions{ justify-content:space-between; }
      .nav{ grid-template-columns:1fr; }
    }
  </style>
</head>
<body>

  <div id="landingView" class="view">
    <header class="topbar">
      <div class="container nav">
        <div class="brand">
          <div class="brand-mark">B</div>
          <span>breus-ug</span>
        </div>

        <nav class="nav-links">
          <a href="#products">Products</a>
          <a href="#returns">Returns</a>
          <a href="#team">Team</a>
          <a href="#deposit">Deposit</a>
        </nav>

        <div class="nav-actions">
          <button class="btn secondary" data-show="login">Login</button>
          <button class="btn primary" data-show="signup">Signup</button>
        </div>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <div class="eyebrow">Perfume investment</div>
            <h1>Earn 15% returns on every perfume purchase.</h1>
            <p>breus-ug helps customers invest in premium fragrance products, grow a strong referral network, and receive structured bonuses from every successful customer purchase.</p>

            <div class="hero-actions">
              <button class="btn primary" data-show="signup">Start investing</button>
              <button class="btn secondary" id="copyInviteLink">Copy invite link</button>
            </div>

            <div class="stats-row">
              <div class="stat-box"><strong>15%</strong><span>Guaranteed return</span></div>
              <div class="stat-box"><strong>25%</strong><span>Level 1 bonus</span></div>
              <div class="stat-box"><strong>1k+</strong><span>Active customers</span></div>
            </div>
          </div>

          <div class="panel signup-panel">
            <h3>Create account</h3>
            <div class="form-grid">
              <div class="field">
                <label>Phone number</label>
                <input id="landingPhone" type="tel" placeholder="+256 700 000000" />
              </div>
              <div class="field">
                <label>Password</label>
                <input id="landingPassword" type="password" placeholder="Enter password" />
              </div>
              <div class="field">
                <label>Confirm password</label>
                <input id="landingConfirmPassword" type="password" placeholder="Confirm password" />
              </div>
              <div class="field">
                <label>Referral code</label>
                <input id="landingReferral" type="text" value="breus-ug-2026" />
              </div>
              <div class="field">
                <label>Verification code</label>
                <div class="verification-box">
                  <span class="code" id="verificationCode">BR-1842</span>
                  <button class="mini-btn" type="button" id="copyCodeBtn">Copy</button>
                </div>
              </div>
            </div>

            <button id="landingSignupBtn" class="btn primary" type="button">Register account</button>
            <div class="notice">Your verification code is generated and can be copied for customer registration.</div>
          </div>
        </div>
      </section>

      <section id="products">
        <div class="container">
          <div class="section-head">
            <div><h2>Perfume product packages</h2></div>
            <p>From UGX 20,000 to UGX 3,000,000</p>
          </div>

          <div class="products">
            <article class="product-card">
              <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80" alt="Classic Bloom fragrance">
              <div class="product-body">
                <div class="product-top"><span class="product-name">Classic Bloom</span><span class="badge">Starter</span></div>
                <div class="price">UGX 20,000</div>
                <div class="small"><span>15% Return</span><span>1 unit</span></div>
                <button class="btn buy-btn" type="button">Buy now</button>
              </div>
            </article>

            <article class="product-card">
              <img src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80" alt="Velvet Rose fragrance">
              <div class="product-body">
                <div class="product-top"><span class="product-name">Velvet Rose</span><span class="badge">Popular</span></div>
                <div class="price">UGX 40,000</div>
                <div class="small"><span>15% Return</span><span>2 units</span></div>
                <button class="btn buy-btn" type="button">Buy now</button>
              </div>
            </article>

            <article class="product-card">
              <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80" alt="Golden Muse fragrance">
              <div class="product-body">
                <div class="product-top"><span class="product-name">Golden Muse</span><span class="badge">Best seller</span></div>
                <div class="price">UGX 60,000</div>
                <div class="small"><span>15% Return</span><span>3 units</span></div>
                <button class="btn buy-btn" type="button">Buy now</button>
              </div>
            </article>

            <article class="product-card">
              <img src="https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=900&q=80" alt="Royal Whisper fragrance">
              <div class="product-body">
                <div class="product-top"><span class="product-name">Royal Whisper</span><span class="badge">Value</span></div>
                <div class="price">UGX 100,000</div>
                <div class="small"><span>15% Return</span><span>4 units</span></div>
                <button class="btn buy-btn" type="button">Buy now</button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="returns">
        <div class="container">
          <div class="section-head">
            <div><h2>Returns and rewards</h2></div>
            <p>Build earnings from purchases and referrals</p>
          </div>

          <div class="returns-layout">
            <div class="panel highlight returns-panel">
              <h3>Investment return</h3>
              <div class="returns-list">
                <div class="returns-item"><span>Every perfume purchase</span><strong>15%</strong></div>
                <div class="returns-item"><span>Referral growth</span><strong>Boosted</strong></div>
                <div class="returns-item"><span>Team expansion</span><strong>Active</strong></div>
              </div>
            </div>

            <div class="panel returns-panel">
              <h3>Referral bonuses</h3>
              <div class="bonus-grid">
                <div class="bonus-item"><div class="tier">Level 1</div><div class="value">25%</div></div>
                <div class="bonus-item"><div class="tier">Level 2</div><div class="value">2%</div></div>
                <div class="bonus-item"><div class="tier">Level 3</div><div class="value">1%</div></div>
              </div>
            </div>
          </div>

          <div class="action-row" id="deposit">
            <div class="action-box">
              <h3>Deposit</h3>
              <p>Tap to see the official deposit account and make payment.</p>
              <button class="btn primary" type="button" id="showDeposit">Show deposit details</button>
            </div>

            <div class="action-box">
              <h3>Withdraw</h3>
              <p>Enter your name and phone number when requesting a withdrawal.</p>
              <button class="btn secondary" type="button" id="openWithdraw2">Withdraw now</button>
            </div>
          </div>
        </div>
      </section>

      <section id="team">
        <div class="container">
          <div class="section-head">
            <div><h2>Team</h2></div>
            <p>See invited customers and your unique referral link</p>
          </div>

          <div class="team-layout">
            <div class="panel team-card">
              <h3>Team size</h3>
              <div class="team-stats">
                <div class="team-stat"><strong>125</strong><span>Total invited</span></div>
                <div class="team-stat"><strong>48</strong><span>Active buyers</span></div>
                <div class="team-stat"><strong>12</strong><span>Top sellers</span></div>
              </div>
            </div>

            <div class="panel team-card">
              <h3>Invitation link</h3>
              <div class="invite-box">
                <span class="invite-url" id="inviteLink">https://breus-ug.com/invite/BakakiPeter</span>
                <button class="mini-btn" type="button" id="copyInvite">Copy</button>
              </div>
              <div class="notice" style="text-align:left; margin-top:16px;">Share your link and earn referral bonuses at each level.</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">&copy; 2026 breus-ug. Demo concept for fragrance investment marketing.</footer>

    <div class="modal" id="withdrawModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3>Withdraw form</h3>
          <button class="close" type="button" aria-label="Close" id="closeWithdraw">&times;</button>
        </div>
        <div class="form-grid">
          <div class="field"><label>Customer name</label><input type="text" id="withdrawName" placeholder="Enter customer name" /></div>
          <div class="field"><label>Phone number</label><input type="tel" id="withdrawPhone" placeholder="Enter phone number" /></div>
        </div>
        <button class="btn primary" type="button" style="width:100%; margin-top:18px;" id="submitWithdrawBtn">Submit withdrawal</button>
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
          <div class="phone-number">0748 799100</div>
          <p><strong>Bakaki Peter</strong></p>
          <button class="btn primary" type="button" id="copyDepositBtn">Copy account</button>
        </div>
      </div>
    </div>
  </div>

  <div id="loginView" class="view hidden">
    <div class="auth-shell">
      <div class="brand-side">
        <div class="auth-brand">
          <div class="auth-brand-mark">B</div>
          <span>breus-ug</span>
        </div>

        <div class="welcome-box">
          <h1>Welcome back.</h1>
          <p>Log in to access your investment dashboard, balance, daily earnings, and referral rewards.</p>
        </div>

        <div class="feature-list">
          <div class="feature-item"><span class="dot"></span>Track your customer balance</div>
          <div class="feature-item"><span class="dot"></span>Monitor daily earnings</div>
          <div class="feature-item"><span class="dot"></span>Manage team and referrals</div>
        </div>
      </div>

      <div class="form-side">
        <div class="form-panel">
          <div class="toptext">
            <h2>Login</h2>
            <p>Use your registered phone number and password.</p>
          </div>

          <div class="field"><label>Phone number</label><input id="loginPhone" type="tel" placeholder="+256 700 000000" /></div>
          <div class="field"><label>Password</label><input id="loginPassword" type="password" placeholder="Enter your password" /></div>

          <div class="row">
            <label style="display:flex; align-items:center; gap:8px;"><input type="checkbox" /><span>Remember me</span></label>
            <a href="#">Forgot password?</a>
          </div>

          <button id="loginBtn" class="btn primary" type="button">Login</button>
          <div class="divider">or</div>
          <button class="btn secondary" type="button">Continue with Google</button>

          <div class="help">Don’t have an account? <a href="#" data-show="signup">Create account</a></div>
        </div>
      </div>
    </div>
  </div>

  <div id="signupView" class="view hidden">
    <div class="auth-shell">
      <div class="brand-side">
        <div class="auth-brand">
          <div class="auth-brand-mark">B</div>
          <span>breus-ug</span>
        </div>

        <div class="welcome-box">
          <h1>Create account.</h1>
          <p>Register with your phone number, password, referral code, and verification code to start earning.</p>
        </div>

        <div class="feature-list">
          <div class="feature-item"><span class="dot"></span>Earn 15% from perfume investments</div>
          <div class="feature-item"><span class="dot"></span>Get referral bonuses up to 25%</div>
          <div class="feature-item"><span class="dot"></span>Track your team and daily returns</div>
        </div>
      </div>

      <div class="form-side">
        <div class="form-panel">
          <div class="toptext"><h2>Sign Up</h2><p>Start your breus-ug account today.</p></div>

          <div class="field"><label>Phone number</label><input id="signupPhone" type="tel" placeholder="+256 700 000000" /></div>
          <div class="field"><label>Password</label><input id="signupPassword" type="password" placeholder="Create password" /></div>
          <div class="field"><label>Confirm password</label><input id="signupConfirmPassword" type="password" placeholder="Confirm password" /></div>
          <div class="field"><label>Referral code</label><input id="signupReferral" type="text" value="breus-ug-2026" /></div>

          <div class="field">
            <label>Verification code</label>
            <div class="verification-box">
              <span class="code" id="signupVerificationCode">BR-1842</span>
              <button class="mini-btn" type="button" id="copySignupCodeBtn">Copy</button>
            </div>
          </div>

          <div class="checkbox-row"><input type="checkbox" /><span>I agree to the terms and conditions.</span></div>
          <button id="signupBtn" class="btn primary" type="button">Create account</button>

          <div class="help">Already have an account? <a href="#" data-show="login">Login</a></div>
        </div>
      </div>
    </div>
  </div>

  <div id="dashboardView" class="view hidden">
    <div class="app">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">B</div>
          <span>breus-ug</span>
        </div>

        <nav class="nav">
          <a href="#" class="nav-item active"><span>Overview</span><span class="nav-badge">24</span></a>
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
        <div class="topbar-dashboard">
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
                  <th>Name</th><th>Phone</th><th>Product</th><th>Value</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Bakaki Peter</td><td>0748 799100</td><td>Royal Empire</td><td>UGX 3,000,000</td><td><span class="status">Active</span></td></tr>
                <tr><td>Sarah N.</td><td>0772 345678</td><td>Classic Bloom</td><td>UGX 20,000</td><td><span class="status warning">Pending</span></td></tr>
                <tr><td>Joseph K.</td><td>0753 987654</td><td>Velvet Rose</td><td>UGX 40,000</td><td><span class="status">Active</span></td></tr>
                <tr><td>Mary L.</td><td>0782 444321</td><td>Emerald Gold</td><td>UGX 350,000</td><td><span class="status">Active</span></td></tr>
                <tr><td>David M.</td><td>0762 223450</td><td>Golden Muse</td><td>UGX 60,000</td><td><span class="status">Active</span></td></tr>
              </tbody>
            </table>
          </div>

          <div class="side-stack">
            <div class="card mini-panel">
              <h3>Referral bonuses</h3>
              <div class="reward-box">
                <div class="reward-item"><span>Level 1</span><span class="reward-value">25%</span></div>
                <div class="reward-item"><span>Level 2</span><span class="reward-value">2%</span></div>
                <div class="reward-item"><span>Level 3</span><span class="reward-value">1%</span></div>
              </div>
            </div>

            <div class="card mini-panel">
              <h3>Top team members</h3>
              <div class="team-box">
                <div class="team-row"><div><div class="team-name">Musa T.</div><div class="team-meta">12 referrals</div></div><strong>UGX 320K</strong></div>
                <div class="team-row"><div><div class="team-name">Patricia A.</div><div class="team-meta">8 referrals</div></div><strong>UGX 210K</strong></div>
                <div class="team-row"><div><div class="team-name">Sam B.</div><div class="team-meta">5 referrals</div></div><strong>UGX 160K</strong></div>
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

        <div class="card action-box" style="margin-top:20px;">
          <h3>Withdraw history</h3>
          <div id="withdrawHistoryList" class="withdraw-history-list"></div>
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
          <div class="field"><label>Customer name</label><input type="text" id="withdrawName" placeholder="Enter customer name" /></div>
          <div class="field"><label>Phone number</label><input type="tel" id="withdrawPhone" placeholder="Enter phone number" /></div>
        </div>
        <button class="btn primary" type="button" style="width:100%; margin-top:18px;" id="submitWithdrawBtn">Submit withdrawal</button>
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
        <div class="bal-row"><span>Available balance</span><strong id="balanceModalAmount">UGX 0</strong></div>
        <div class="daily-row"><span>Daily earnings</span><strong id="dailyModalAmount">UGX 0</strong></div>
        <button class="btn primary" type="button" id="collectDailyBtn" style="width:100%; margin-top:18px;">Collect daily income</button>
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
          <div class="bal-row"><span>Today's earnings</span><strong id="todayEarningsValue">UGX 0</strong></div>
          <button class="btn primary" type="button" id="manualIncomeBtn" style="width:100%; margin-top:18px;">Generate daily income now</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    const STORAGE_KEY = "breusug_demo_v2";

    const appState = {
      users: [],
      withdrawals: [],
      purchases: [],
      currentUserId: null,
      lastUserId: 1
    };

    function loadState() {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved) Object.assign(appState, saved);
      } catch (error) {
        console.log("No saved state");
      }
    }

    function saveState() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    }

    function getCurrentUser() {
      return appState.users.find(user => user.id === appState.currentUserId) || null;
    }

    function formatUGX(value) {
      return "UGX " + Number(value || 0).toLocaleString();
    }

    function generateCode() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "BR-";
      for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
      document.getElementById("verificationCode").textContent = code;
      document.getElementById("signupVerificationCode").textContent = code;
    }

    function showView(viewId) {
      document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
      document.getElementById(viewId).classList.remove("hidden");
    }

    function createUser(phone, password) {
      const newUser = {
        id: appState.lastUserId++,
        phone,
        password,
        balance: 2500000,
        dailyEarnings: 375000,
        lastIncomeAt: Date.now()
      };

      appState.users.push(newUser);
      appState.currentUserId = newUser.id;
      saveState();
      return newUser;
    }

    function loginUser(phone, password) {
      const user = appState.users.find(u => u.phone === phone && u.password === password);
      if (!user) {
        alert("Invalid login details");
        return false;
      }

      appState.currentUserId = user.id;
      saveState();
      return true;
    }

    function syncUserIncome(user) {
      const msPerDay = 24 * 60 * 60 * 1000;
      const elapsed = Date.now() - Number(user.lastIncomeAt || Date.now());

      if (elapsed >= msPerDay) {
        const cycles = Math.floor(elapsed / msPerDay);
        user.balance += user.dailyEarnings * cycles;
        user.lastIncomeAt = Date.now() - (elapsed % msPerDay);
        saveState();
      }
    }

    function refreshDashboard() {
      const user = getCurrentUser();
      if (!user) return;

      document.getElementById("walletBalanceDisplay").textContent = formatUGX(user.balance);
      document.getElementById("balanceCard").textContent = formatUGX(user.balance);
      document.getElementById("dailyCard").textContent = formatUGX(user.dailyEarnings);
      document.getElementById("balanceModalAmount").textContent = formatUGX(user.balance);
      document.getElementById("dailyModalAmount").textContent = formatUGX(user.dailyEarnings);
      document.getElementById("todayEarningsValue").textContent = formatUGX(user.dailyEarnings);

      const msPerDay = 24 * 60 * 60 * 1000;
      const remaining = Math.max(0, msPerDay - (Date.now() - Number(user.lastIncomeAt || Date.now())));
      const totalSeconds = Math.floor(remaining / 1000);

      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const seconds = String(totalSeconds % 60).padStart(2, "0");

      const countdown = document.getElementById("countdownText");
      if (countdown) countdown.textContent = hours + ":" + minutes + ":" + seconds;

      renderWithdrawHistory();
      updateBuyButtons();
    }

    function renderWithdrawHistory() {
      const list = document.getElementById("withdrawHistoryList");
      if (!list) return;

      if (!appState.withdrawals.length) {
        list.innerHTML = '<div class="history-item"><strong>No withdrawal requests yet</strong><span class="history-status">No status</span></div>';
        return;
      }

      list.innerHTML = appState.withdrawals.map(item => `
        <div class="history-item">
          <strong>${formatUGX(item.amount)}</strong>
          <span class="history-status">${item.status}</span>
        </div>
      `).join("");
    }

    function updateBuyButtons() {
      const user = getCurrentUser();
      document.querySelectorAll(".buy-btn").forEach(button => {
        const canBuy = !!user && Number(user.balance) > 0;
        button.disabled = !canBuy;
      });
    }

    function collectDailyIncome() {
      const user = getCurrentUser();
      if (!user) return;

      const msPerDay = 24 * 60 * 60 * 1000;
      const elapsed = Date.now() - Number(user.lastIncomeAt || Date.now());

      if (elapsed < msPerDay) {
        alert("Income can only be collected once every 24 hours.");
        return;
      }

      user.balance += user.dailyEarnings;
      user.lastIncomeAt = Date.now();
      saveState();
      refreshDashboard();
      alert("Daily income generated: " + formatUGX(user.dailyEarnings));
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

    function submitAccountRegistration(phone, password, confirmPassword) {
      if (!phone || !password || !confirmPassword) {
        alert("Please fill all required fields");
        return false;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
      }

      const existing = appState.users.find(u => u.phone === phone);
      if (existing) {
        alert("This phone number is already registered");
        return false;
      }

      createUser(phone, password);
      refreshDashboard();
      showView("dashboardView");
      return true;
    }

    function registerFromLanding() {
      const phone = document.getElementById("landingPhone").value.trim();
      const password = document.getElementById("landingPassword").value;
      const confirmPassword = document.getElementById("landingConfirmPassword").value;

      return submitAccountRegistration(phone, password, confirmPassword);
    }

    function registerFromSignupPage() {
      const phone = document.getElementById("signupPhone").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById("signupConfirmPassword").value;

      return submitAccountRegistration(phone, password, confirmPassword);
    }

    function setupProductButtons() {
      const buttons = document.querySelectorAll(".buy-btn");

      buttons.forEach(button => {
        const card = button.closest(".product-card");
        const nameEl = card.querySelector(".product-name");
        const priceEl = card.querySelector(".price");

        const productName = nameEl ? nameEl.textContent.trim() : "Perfume Product";
        const amountText = priceEl ? priceEl.textContent.replace(/[^0-9]/g, "") : "0";
        const amount = Number(amountText || 0);

        button.dataset.productName = productName;
        button.dataset.amount = String(amount);

        button.addEventListener("click", function () {
          const user = getCurrentUser();
          if (!user) {
            alert("Please log in or create an account first.");
            showView("loginView");
            return;
          }

          const price = Number(this.dataset.amount || 0);

          if (!user.balance || user.balance <= 0) {
            alert("Your account balance is empty. Please deposit before buying.");
            return;
          }

          if (user.balance < price) {
            alert("Insufficient balance to buy this product.");
            return;
          }

          user.balance -= price;
          appState.purchases.unshift({
            product: this.dataset.productName,
            amount: price,
            status: "Paid"
          });

          saveState();
          refreshDashboard();
          alert(`${this.dataset.productName} purchased successfully.`);
        });
      });
    }

    document.querySelectorAll("[data-show]").forEach(button => {
      button.addEventListener("click", function () {
        const view = this.dataset.show;
        if (view === "dashboard") {
          const user = getCurrentUser();
          if (!user) {
            showView("loginView");
            return;
          }
          syncUserIncome(user);
          refreshDashboard();
          showView("dashboardView");
          return;
        }

        showView(view + "View");
      });
    });

    document.getElementById("landingSignupBtn").addEventListener("click", function () {
      if (registerFromLanding()) {
        refreshDashboard();
        showView("dashboardView");
      }
    });

    document.getElementById("signupBtn").addEventListener("click", function () {
      if (registerFromSignupPage()) {
        refreshDashboard();
        showView("dashboardView");
      }
    });

    document.getElementById("loginBtn").addEventListener("click", function () {
      const phone = document.getElementById("loginPhone").value.trim();
      const password = document.getElementById("loginPassword").value;
      if (!phone || !password) {
        alert("Please enter phone and password");
        return;
      }

      if (loginUser(phone, password)) {
        const user = getCurrentUser();
        if (user) {
          syncUserIncome(user);
          refreshDashboard();
          showView("dashboardView");
        }
      }
    });

    document.getElementById("copyCodeBtn").addEventListener("click", function() {
      copyText(document.getElementById("verificationCode").textContent);
    });

    document.getElementById("copySignupCodeBtn").addEventListener("click", function() {
      copyText(document.getElementById("signupVerificationCode").textContent);
    });

    document.getElementById("copyInviteLink").addEventListener("click", function() {
      copyText(document.getElementById("inviteLink").textContent);
    });

    document.getElementById("copyInvite").addEventListener("click", function() {
      copyText(document.getElementById("inviteLink").textContent);
    });

    document.getElementById("copyDepositBtn").addEventListener("click", function() {
      copyText("0748 799100");
    });

    document.getElementById("copyDepositValue").addEventListener("click", function() {
      copyText("0748 799100");
    });

    document.getElementById("showDeposit").addEventListener("click", function() {
      document.getElementById("depositModal").classList.add("show");
    });
    document.getElementById("closeDeposit").addEventListener("click", function() {
      document.getElementById("depositModal").classList.remove("show");
    });
    document.getElementById("openDeposit").addEventListener("click", function() {
      document.getElementById("depositModal").classList.add("show");
    });

    document.getElementById("openWithdraw").addEventListener("click", function() {
      document.getElementById("withdrawModal").classList.add("show");
    });
    document.getElementById("openWithdraw2").addEventListener("click", function() {
      document.getElementById("withdrawModal").classList.add("show");
    });
    document.getElementById("closeWithdraw").addEventListener("click", function() {
      document.getElementById("withdrawModal").classList.remove("show");
    });

    document.getElementById("submitWithdrawBtn").addEventListener("click", function() {
      const user = getCurrentUser();
      if (!user) {
        showView("loginView");
        return;
      }

      const name = document.getElementById("withdrawName").value.trim();
      const phone = document.getElementById("withdrawPhone").value.trim();

      if (!name || !phone) {
        alert("Please enter your name and phone number");
        return;
      }

      if (user.balance <= 0) {
        alert("Your balance is too low to request a withdrawal.");
        return;
      }

      const amount = 100000;

      appState.withdrawals.unshift({
        amount,
        status: "Waiting for approval",
        name,
        phone,
        date: new Date().toLocaleString()
      });

      saveState();
      renderWithdrawHistory();
      document.getElementById("withdrawModal").classList.remove("show");
      showView("dashboardView");
      alert("Withdrawal request has been sent. It is now waiting for approval.");
      refreshDashboard();
    });

    document.getElementById("openBalanceModal").addEventListener("click", function() {
      document.getElementById("balanceModal").classList.add("show");
    });
    document.getElementById("closeBalanceModal").addEventListener("click", function() {
      document.getElementById("balanceModal").classList.remove("show");
    });
    document.getElementById("openDailyModal").addEventListener("click", function() {
      document.getElementById("dailyModal").classList.add("show");
    });
    document.getElementById("closeDailyModal").addEventListener("click", function() {
      document.getElementById("dailyModal").classList.remove("show");
    });

    document.getElementById("collectDailyBtn").addEventListener("click", collectDailyIncome);
    document.getElementById("manualIncomeBtn").addEventListener("click", collectDailyIncome);

    document.getElementById("balanceNavButton").addEventListener("click", function(e) {
      e.preventDefault();
      document.getElementById("balanceModal").classList.add("show");
    });

    document.getElementById("dailyNavButton").addEventListener("click", function(e) {
      e.preventDefault();
      document.getElementById("dailyModal").classList.add("show");
    });

    document.getElementById("depositModal").addEventListener("click", function(e) {
      if (e.target.id === "depositModal") e.target.classList.remove("show");
    });
    document.getElementById("dailyModal").addEventListener("click", function(e) {
      if (e.target.id === "dailyModal") e.target.classList.remove("show");
    });
    document.getElementById("balanceModal").addEventListener("click", function(e) {
      if (e.target.id === "balanceModal") e.target.classList.remove("show");
    });
    document.getElementById("withdrawModal").addEventListener("click", function(e) {
      if (e.target.id === "withdrawModal") e.target.classList.remove("show");
    });

    loadState();
    setupProductButtons();
    generateCode();
    renderWithdrawHistory();

    if (appState.currentUserId) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        syncUserIncome(currentUser);
        refreshDashboard();
        showView("dashboardView");
      } else {
        showView("landingView");
      }
    } else {
      showView("landingView");
    }

    setInterval(() => {
      const user = getCurrentUser();
      if (user) {
        syncUserIncome(user);
        refreshDashboard();
      }
    }, 1000);
  </script>
</body>
</html>
