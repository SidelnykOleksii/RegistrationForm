document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const gender = document.querySelector(
      'input[name="gender"]:checked'
    )?.value;

    if (!validatePassword(password)) return; // Виклик функції перевірки
    if (!gender) {
      alert("Please select a gender.");
      return;
    }

    // Відправка запиту на сервер
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, gender }),
    });

    const result = await response.json();

    if (response.status === 409) {
      alert("❌ Користувач з таким email вже існує!");
    } else if (response.status === 201) {
      alert("✅ Реєстрація успішна!");
    } else {
      alert("❌ Помилка: " + result.error);
    }
  });

// Функція перевірки пароля на кількість символів і спецсимволи
function validatePassword(password) {
  const passwordError = document.getElementById("passwordError");
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/; // Regex для пошуку спецсимволів
  let errorMessage = "";

  if (password.length < 8) {
    errorMessage = "Пароль має бути не менше 8 символів";
  } else if (!specialChars.test(password)) {
    // test() — це метод об'єкта RegExp, який перевіряє, чи рядок (password) містить хоча б один із вказаних символів. Оператор ! (логічне заперечення) інвертує результат
    errorMessage = "Пароль має містити хоча б один спецсимвол";
  }

  if (errorMessage) {
    passwordError.textContent = errorMessage;
    passwordError.style.display = "block";
    return false;
  } else {
    passwordError.style.display = "none";
    return true;
  }
}

document.getElementById("toggleUsers").addEventListener("click", async () => {
  const dropdown = document.getElementById("userDropdown");

  // Перемикаємо відображення дропдауна
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";

  // Якщо дропдаун відкривається завантажуємо користувачів
  if (dropdown.style.display === "block") {
    try {
      const response = await fetch("http://localhost:3000/users");
      console.log(response);
      const users = await response.json();
      const userList = document.getElementById("userList");
      userList.innerHTML = ""; // Очищаємо попередній список

      users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
      });
    } catch (error) {
      console.error("Помилка завантаження користувачів:", error);
    }
  }
});

async function fetchUsers() {
  const response = await fetch("http://localhost:3000/users");
  return response.json();
}

async function renderUserTable() {
  const users = await fetchUsers();
  const tableBody = document.querySelector("#userTable tbody");
  tableBody.innerHTML = ""; // Очищуємо таблицю перед рендером

  users.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.gender || "N/A"}</td>
    <td class="action-icons">
    <button class="update-icon">✏️</button>
    <button class="delete-icon" data-email="${user.email}">❌</button>
    </td>
    `;

    tableBody.appendChild(row);
  });
}

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

  async function deleteUser(email) {
    const response = await fetch(`http://localhost:3000/users/${email}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Користувача успішно видалено");
      fetchUsers();
    } else {
      alert("Помилка при видаленні користувача");
    }
  }

  // Додаємо обробник подій на кнопку видалення (делегування подій)
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-icon")) {
      const email = event.target.getAttribute("data-email");
      showDeleteModal(email);
    }
  });
});

// Calling render when the page loads
document.addEventListener("DOMContentLoaded", renderUserTable);
