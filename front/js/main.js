import { log_in } from "./login.js";
import { new_register } from "./register.js";

if(!localStorage.getItem('repo_json/users.json')){
    const initial_users = [];
    localStorage.setItem('repo_json/users.json',JSON.stringify(initial_users));
} 

if(!localStorage.getItem('repo_json/users_accounts.json')){
    const initial_users_accounts = [];
    localStorage.setItem('repo_json/users_accounts.json',JSON.stringify(initial_users_accounts));
} 
export function updateUsers(){
    return JSON.parse(localStorage.getItem('repo_json/users.json'))
}

const mainUser = document.getElementById('user-login')
const mainPassword = document.getElementById('password-login')
let user_error = document.getElementById('login-user-error')
let password_error = document.getElementById('login-password-error')

export function clean_fields (){
    const inputs = document.querySelectorAll('.login-aside input');
                inputs.forEach(input => input.value = '');
    const error_inputs = document.querySelectorAll('.login-aside label')
                error_inputs.forEach(input =>input.style.display = 'none')
}

export function login_main(operation){
    
    if (operation=="Login"){
        if (!mainUser.value || !mainPassword.value){
            if(!mainUser.value && !mainPassword.value){
                user_error.textContent = `Debes agregar el usuario`;
                user_error.style.display = 'block';
                password_error.textContent = `Debes agregar la contraseña`;
                password_error.style.display = 'block';
            } else if (!mainUser.value){
                user_error.textContent = `Debes agregar el usuario`;
                user_error.style.display = 'block';       
                password_error.style.display = 'none'         
            } else {
                password_error.textContent = `Debes agregar la contraseña`;
                password_error.style.display = 'block';    
                user_error.style.display = 'none'
            }
        } else {
            user_error.style.display = 'none'
            password_error.style.display = 'none'
            log_in(mainUser.value,mainPassword.value)
        }
    } else if (operation=='Register'){
        new_register()
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('main-login-button').addEventListener('click', () => login_main('Login'));
    document.getElementById('main-register-button').addEventListener('click', () => login_main('Register'));
    document.getElementById('main-clean-button').addEventListener('click', () => clean_fields());
})
let users_base = updateUsers()