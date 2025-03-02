import { fetchUsers } from "./api.js";
import { renderUserTable } from "./ui.js";
import "./events.js";

async function initializeApp() {
    try {
        const userList = await fetchUsers();
        renderUserTable(userList);
    } catch (error) {
        console.error("Error loading users:", error);
    }
}

document.addEventListener("DOMContentLoaded", initializeApp);
