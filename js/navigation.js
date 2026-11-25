// navigation.js - Shared nav logic for pages inside /pages
// Handles the "logout" link (<a href="#" id="logout-button">)

const navLogoutButton = document.getElementById("logout-button");

navLogoutButton?.addEventListener("click", async (event) => {
  event.preventDefault();

  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    alert("Logout failed. Please try again.");
    return;
  }

  window.location.href = "../index.html";
});
