import { showMessage } from "./ui.js";

const API_URL = "http://localhost:3000/api";

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const result = await response.json();

  if (response.status === 409) {
    showMessage("❌ Користувач з таким email вже існує!", "error");
    return false;
  } else if (response.status === 200) {
    showMessage("✅ Реєстрація успішна!", "success");
    return true;
  } else {
    showMessage("❌ Помилка: " + result.error, "error");
    return false;
  }
}

export async function deleteUser(email) {
  const response = await fetch(`${API_URL}/users/${email}`, {
    method: "DELETE",
  });
  const result = await response.json();
  if (response.status === 200) {
    showMessage("User deleted", "success");
    return true;
  } else {
    showMessage("Error deleting user:", result.error, "error");
    return false;
  }
}
