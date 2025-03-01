export function validatePassword(password) {
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