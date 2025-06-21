import { User } from "../model/user.model";
import { UserFormData } from "../model/userFormData.model";

export class UserService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:33229/api/users"
    }

    getAll(): Promise<User[]> {
        return fetch(this.apiUrl)
        .then(response => {
            if(!response.ok){
                throw {status: response.status, message: response.text}
            }
            return response.json()
        })
        .then((users: User[]) => {
            return users;
        })
        .catch(error => {
            console.error('Error:', error.status)
            throw error
        })
    }

    add(formData: UserFormData): Promise<User> {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if(!response.ok){
                throw {status: response.status, message: response.text}
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error: ' + error.status)

            if(error.status && error.status === 400){
                alert('Data is invalid')
            } else {
                alert('An error occured while creating group. Please try again')
            }
        })

    }
}
