import { UserFormData } from "../model/userFormData.model";
import { UserService } from "../../dist/services/user.services.js";

const userService = new UserService();

function Initialize(): void {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  if (id) {
    userService
      .getById(id)
      .then((user) => {
        (document.querySelector("#username") as HTMLInputElement).value =
          user.userName;

        (document.querySelector("#firstName") as HTMLInputElement).value =
          user.name;

        (document.querySelector("#lastName") as HTMLInputElement).value =
          user.lastname;

        (document.querySelector("#birthDate") as HTMLInputElement).value =
          new Date(user.birthdate).toLocaleDateString("sv-SE");
        //toLocaleDateString("sv-SE") je švedska lokalizacija koja koristi tačno format YYYY-MM-DD
        //Ako se koristi toISOString(), stavlja vreme na UTC, ako je 00:00:00, vratice dan unazad.
      })
      .catch((error) => {
        console.error(error.status, error.text);
      });

    const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
    addBtn.textContent = "Update";
    addBtn.setAttribute('data-tooltip', 'Update existing user')
    addBtn.disabled = false;
    addBtn.addEventListener("click", function () {
      addBtn.disabled = true;
      addBtn.textContent = 'Updating...'
      UpdateUser(id);
    });
  } else {
    const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
    addBtn.setAttribute('data-tooltip', 'Create new user')
    addBtn.disabled = false;
    addBtn.addEventListener("click", function () {
      addBtn.disabled = true;
      addBtn.textContent = 'Creating...'
      AddUser();
    });
  }

  const cancelBtn = document.getElementById("cancel-btn");
  cancelBtn.addEventListener("click", function () {
    window.location.href = "../user/user.html";
  });
}

function UpdateUser(id: string): void {
    userService.update(GetAndValidate(), id)
    .then(() => {
        window.location.href = "../user/user.html"
    })
    .catch(error => {
        console.error(error.status, error.text);
    })
}

function AddUser(): void {
  userService.add(GetAndValidate());
  window.location.href = "../user/user.html";
}

function GetAndValidate(): UserFormData {
  try {
    const username = (document.querySelector("#username") as HTMLInputElement)
      .value;
    const firstName = (document.querySelector("#firstName") as HTMLInputElement)
      .value;
    const lastName = (document.querySelector("#lastName") as HTMLInputElement)
      .value;
    const birthDate = new Date(
      (document.querySelector("#birthDate") as HTMLInputElement).value
    );

    if (
      username.toString().trim() == "" ||
      firstName.toString().trim() == "" ||
      lastName.toString().trim() == "" ||
      birthDate.toDateString() == "Invalid Date"
    ) {
      document.querySelector(".required-field").classList.remove("hidden");
      return;
    }

    const formData: UserFormData = {
      userName: username,
      name: firstName,
      lastname: lastName,
      birthdate: birthDate,
    };
    return formData;
  } catch (error) {
    if (error.name == "TypeError") {
      document.querySelector(".required-field").classList.remove("hidden");
      return;
    } else {
      console.error("Unexpected error occured.");
    }
  }
}

window.addEventListener("DOMContentLoaded", Initialize);
