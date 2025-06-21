import { UserFormData } from "../model/userFormData.model"
import { UserService } from "../../dist/services/user.services.js"

const userService = new UserService();

    function Initialize(): void {
    const addBtn = document.getElementById('add-btn')
    addBtn.addEventListener('click', function(){
        CreateGroup()
    })

    const cancelBtn = document.getElementById('cancel-btn')
    cancelBtn.addEventListener('click', function(){
        window.location.href = '../user/user.html'
    })
}

function CreateGroup(): void {

    try {
    const username = (document.querySelector("#username") as HTMLInputElement).value
    const firstName = (document.querySelector("#firstName") as HTMLInputElement).value
    const lastName = (document.querySelector("#lastName") as HTMLInputElement).value
    const birthDate = new Date((document.querySelector("#birthDate") as HTMLInputElement).value)

    
    if (username.toString().trim() == '' || firstName.toString().trim() == '' || lastName.toString().trim() == '' || birthDate.toDateString() == "Invalid Date"){
        document.querySelector('.required-field').classList.remove('hidden')
        return;
    }

    const formData: UserFormData = {
        userName: username,
        name: firstName,
        lastname: lastName,
        birthdate: birthDate
    }
    userService.add(formData)
    window.location.href = "../user/user.html"
    }
    catch(error){
        if (error.name == 'TypeError'){
            document.querySelector('.required-field').classList.remove('hidden')
            return;
        }
        else{
            console.error("Unexpected error occured.")
        }
    }
}

window.addEventListener("DOMContentLoaded", Initialize)