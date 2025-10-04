// login.js - Lógica para validar el inicio de sesión
import { clean_fields, updateUsers } from "./main.js"

// Contador de intentos fallidos de contraseña
let password_tries = 0

// Referencias a los mensajes de error en el login
let user_error = document.getElementById('login-user-error')
let password_error = document.getElementById('login-password-error')

// Función principal para validar usuario y contraseña
export function log_in(username,password){
    let users_base = updateUsers()
    // Si no hay usuarios registrados
    if (users_base.length==0){
        alert("No existen usuarios registrados por favor registre un usuario antes de continuar")
        clean_fields()
    } else {
        // Busca si el usuario existe
        let register_user = users_base.some(record => record.user_username.toLowerCase()==username.toLowerCase())

        if(!register_user){
            // Usuario no existe
            user_error.textContent = `El usuario ${username} no existe, por favor registrese para continuar`;
            user_error.style.display = 'block';      
        } else {
            // Usuario existe, verifica contraseña
            let user_register = users_base.find(record => record.user_username.toLowerCase()==username.toLowerCase())
            let correct_password = (user_register.user_password == password)
            if (correct_password){
                // Login exitoso, guarda sesión y redirige
                const user_db = users_base.find(record => record.user_username.toLowerCase()==username.toLowerCase())          
                sessionStorage.setItem('loggedIn','true')
                sessionStorage.setItem('userID',user_db.user_id)
                window.location.href = 'transactions.html'
                password_tries = 0                
                clean_fields()
            } else {
                // Contraseña incorrecta
                password_tries++
                if (password_tries==3){
                    // Bloquea cuenta tras 3 intentos
                    alert("Cuenta bloqueada por 24 horas, comunicate con tu banco");
                    clean_fields()
                    password_tries = 0
                }  else {
                    password_error.textContent = `Clave incorrecta, por favor trate de nuevo\nIntento(s) ${password_tries}, tiene ${3-password_tries} restantes`;
                    password_error.style.display = 'block';
                }   
            }
        }
    }
}