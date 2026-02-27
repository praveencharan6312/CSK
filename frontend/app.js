document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.error("SW registration failed:", err));
}

  const data = await res.json();
  if (data.success) {
    alert("Login successful!");
    window.location.href = "places.html";
  } else {
    alert("Invalid credentials");
  }
});

// Add place
document.getElementById("placeForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const placeName = document.getElementById("placeName").value;
  const userId = localStorage.getItem("userId"); // store after login

  const res = await fetch("http://localhost:5000/places/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, placeName })
  });

  const data = await res.json();
  if (data.success) {
    loadPlaces();
  }
});

// Load places
async function loadPlaces() {
  const userId = localStorage.getItem("userId");
  const res = await fetch(`http://localhost:5000/places/${userId}`);
  const places = await res.json();

  const list = document.getElementById("placesList");
  list.innerHTML = "";
  places.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.placeName;
    list.appendChild(li);
  });
}
