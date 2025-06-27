import { UserService } from "../services/user.services.js";

const userService = new UserService();

function Initialize() {
  const spinner = document.querySelector('#spinner')
  const addButton = document.querySelector("#add-user-btn");
  addButton.addEventListener('click', function(){
    window.location.href = "../usersForm/usersForm.html";
  });
  spinner.classList.remove('hidden')
  setTimeout(() => {
    renderUsers();
    spinner.classList.add('hidden');
  }, 2000);
}

function renderUsers(): void {
  userService
    .getAll()
    .then((users) => {
      const table = document.querySelector("table tbody");
      table.innerHTML = "";

      const tableHeader = document.querySelector("table thead");

      if (users.length === 0) {
        tableHeader.classList.add("hidden");

        const noDatamessage = document.querySelector("#no-data-message");
        noDatamessage.classList.remove("hidden");
      } else {
        tableHeader.classList.remove("hidden");

        const noDatamessage = document.querySelector("#no-data-message");
        noDatamessage.classList.add("hidden");
      }

      for (const user of users) {
        const newRow = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.textContent = user.id.toString();
        newRow.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.textContent = user["userName"];
        newRow.appendChild(cell2);

        const cell3 = document.createElement("td");
        cell3.textContent = user["name"];
        newRow.appendChild(cell3);

        const cell4 = document.createElement("td");
        cell4.textContent = user["lastname"];
        newRow.appendChild(cell4);

        const cell5 = document.createElement("td");
        cell5.textContent = new Date(user["birthdate"]).toLocaleDateString();
        newRow.appendChild(cell5);

        const cell6 = document.createElement("td");
        newRow.appendChild(cell6);
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "tableButton";
        editButton.onclick = function() {
          window.location.href = `../usersForm/usersForm.html?id=${user.id}`
        }
        cell6.appendChild(editButton);

        const cell7 = document.createElement("td");
        newRow.appendChild(cell7);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "tableButton";
        deleteButton.onclick = function() {
          userService.delete(user.id);
          renderUsers();
        }
        cell7.appendChild(deleteButton);

        table.appendChild(newRow);
      }
    })
    .catch((error) => {
      console.error("Error: ", error.status);
      const noDatamessage = document.querySelector("#no-data-message");
      noDatamessage.classList.remove('hidden');
    });
}

document.addEventListener("DOMContentLoaded", Initialize);
