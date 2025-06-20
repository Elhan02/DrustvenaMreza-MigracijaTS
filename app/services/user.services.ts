import { User } from "../model/user.model";

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
}
