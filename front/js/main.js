// main.js - Lógica principal para login y registro
// Importa funciones de login y registro
import { log_in } from "./login.js";
import { new_register } from "./register.js";

// Inicializa el almacenamiento local de usuarios si no existe
if(!localStorage.getItem('repo_json/users.json')){
    const initial_users = [];
    localStorage.setItem('repo_json/users.json',JSON.stringify(initial_users));
} 

// Inicializa el almacenamiento local de cuentas si no existe
if(!localStorage.getItem('repo_json/users_accounts.json')){
    const initial_users_accounts = [];
    localStorage.setItem('repo_json/users_accounts.json',JSON.stringify(initial_users_accounts));
} 

// Devuelve el arreglo de usuarios desde localStorage
export function updateUsers(){
    return JSON.parse(localStorage.getItem('repo_json/users.json'))
}

// Referencias a los campos de usuario y contraseña en el login
const mainUser = document.getElementById('user-login')
const mainPassword = document.getElementById('password-login')
let user_error = document.getElementById('login-user-error')
let password_error = document.getElementById('login-password-error')

// Limpia los campos y mensajes de error del formulario de login
export function clean_fields (){
    const inputs = document.querySelectorAll('.login-aside input');
    inputs.forEach(input => input.value = '');
    const error_inputs = document.querySelectorAll('.login-aside label')
    error_inputs.forEach(input =>input.style.display = 'none')
}

// Función principal para manejar login o registro según el botón presionado
export function login_main(operation){
    if (operation=="Login"){
        // Validación de campos vacíos
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
            // Si ambos campos están llenos, intenta login
            user_error.style.display = 'none'
            password_error.style.display = 'none'
            log_in(mainUser.value,mainPassword.value)
        }
    } else if (operation=='Register'){
        // Abre el modal de registro
        new_register()
    }
}

// Asigna eventos a los botones de login, registro y limpiar
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('main-login-button').addEventListener('click', () => login_main('Login'));
    document.getElementById('main-register-button').addEventListener('click', () => login_main('Register'));
    document.getElementById('main-clean-button').addEventListener('click', () => clean_fields());
})

// Carga inicial de usuarios (no se usa directamente pero puede ser útil)
let users_base = updateUsers()