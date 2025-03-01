import { fetchUsers } from "./api.js";
import { renderUserTable } from "./ui.js";
import "./events.js";

async function init() {
    console.log("🚀Initializinf app...");

    try {
        const users = await fetchUsers();
        console.log("✅ Users fetched:", users);
        renderUserTable();
    } catch (error) {
        console.error("❌ Error loading users:", error);
    }
}

document.addEventListener("DOMContentLoaded", init);