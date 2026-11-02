async function loadDashboard() {
  const token = localStorage.getItem("breusug_token");
  if (!token) return window.location.href = "login.html";

  const response = await fetch("/api/dashboard", {
    headers: { Authorization: "Bearer " + token }
  });

  const data = await response.json();
  if (!response.ok) {
    alert(data.error || "Failed to load dashboard");
    return;
  }

  console.log(data.user);
  document.getElementById("balanceCard").textContent = "UGX " + data.user.balance.toLocaleString();
}
