import { registerUser, deleteUser } from "./api.js";
import { renderUserTable } from "./ui.js";
import { validatePassword } from "./validation.js";

// Adding an event for the registration form
document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reloads

    const password = document.getElementById("password").value;
    const gender =  document.querySelector('input[name="gender"]:checked')?.value || "N/A";
    
    if (!validatePassword(password)) return;
    
    if (!gender) {
      alert("Please select a gender.");
      return;
    }

    const userData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password,
      gender,
    };
    await registerUser(userData);
    await renderUserTable();
  });

// Event for delete user
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("deleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDelete");
  const cancelDeleteBtn = document.getElementById("cancelDelete");

  let userEmailToDelete = null;

  function showDeleteModal(email) {
    userEmailToDelete = email;
    modal.style.display = "flex";
  }

  function hideDeleteModal() {
    modal.style.display = "none";
    userEmailToDelete = null;
  }

  confirmDeleteBtn.addEventListener("click", async () => {
    if (userEmailToDelete) {
      await deleteUser(userEmailToDelete);
    }
    hideDeleteModal();
  });

  cancelDeleteBtn.addEventListener("click", hideDeleteModal);

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-icon")) {
      const email = event.target.getAttribute("data-email");
      showDeleteModal(email);
    }
  });
});

// Calling render when the page loads
document.addEventListener("DOMContentLoaded", renderUserTable);