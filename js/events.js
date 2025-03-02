import { registerUser, deleteUser } from "./api.js";
import { renderUserTable } from "./ui.js";
import { validatePassword } from "./validation.js";

// Adding an event for the registration form
document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const enteredPassword = document.getElementById("password").value;
    const selectedGender = document.querySelector('input[name="gender"]:checked')?.value ?? "N/A";

    if (!validatePassword(enteredPassword)) return;

    const userData = {
      name: document.getElementById("name").value.toLowerCase(),
      email: document.getElementById("email").value.toLowerCase(),
      password: enteredPassword,
      gender: selectedGender,
    };

    await registerUser(userData);
    await renderUserTable();
  });

// Event for delete user
document.addEventListener("DOMContentLoaded", () => {
  const deleteModal = document.getElementById("deleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDelete");
  const cancelDeleteBtn = document.getElementById("cancelDelete");

  let userEmailToDelete = null;

  const showDeleteModal = (email) => {
    userEmailToDelete = email;
    deleteModal.style.display = "flex";
  };

  const hideDeleteModal = () => {
    deleteModal.style.display = "none";
    userEmailToDelete = null;
  };

  confirmDeleteBtn.addEventListener("click", async () => {
    if (userEmailToDelete) {
      await deleteUser(userEmailToDelete);
      hideDeleteModal();
    }
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