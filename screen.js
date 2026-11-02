async function loginUser() {
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password })
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.error || "Login failed");
    return;
  }

  localStorage.setItem("breusug_token", data.token);
  window.location.href = "dashboard.html";
}
