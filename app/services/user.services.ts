import { User } from "../model/user.model";
import { UserFormData } from "../model/userFormData.model";

export class UserService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = "http://localhost:33229/api/users";
  }

  getAll(): Promise<User[]> {
    return fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw { status: response.status, message: response.text };
        }
        return response.json();
      })
      .then((users: User[]) => {
        return users;
      })
      .catch((error) => {
        console.error("Error:", error.status);
        throw error;
      });
  }

  getById(id: string): Promise<User> {
    return fetch(`${this.apiUrl}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw { status: response.status, message: response.text };
        }
        return response.json();
      })
      .then((user: User) => {
        return user;
      })
      .catch((error) => {
        console.error("Error:", error.status);
        throw error;
      });
  }

  add(formData: UserFormData): Promise<User> {
    return fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw { status: response.status, message: response.text };
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error: " + error.status);

        if (error.status && error.status === 400) {
          throw("Data is invalid");
        } else {
          alert("An error occured while creating user. Please try again");
        }
      });
  }

  update(formData: UserFormData, id: string): Promise<User> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw { status: response.status, message: response.text };
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error: " + error.status);

        if (error.status && error.status === 400) {
          throw("Data is invalid");
        } else {
          alert("An error occured while updating user. Please try again");
        }
      });
  }

  delete(id: number): Promise<void> {
    return fetch(`${this.apiUrl}/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed. Status: " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error: " + error.message);
        alert("An error occured while deleting user. Please try again.");
      });
  }
}
