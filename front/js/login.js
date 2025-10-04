import { clean_fields, updateUsers } from "./main.js"



let password_tries = 0

let user_error = document.getElementById('login-user-error')
let password_error = document.getElementById('login-password-error')

export function log_in(username,password){
    let users_base = updateUsers()
    if (users_base.length==0){
        alert("No existen usuarios registrados por favor registre un usuario antes de continuar")
        clean_fields()
    } else {
        let register_user = users_base.some(record => record.user_username.toLowerCase()==username.toLowerCase())

        if(!register_user){
            user_error.textContent = `El usuario ${username} no existe, por favor registrese para continuar`;
            user_error.style.display = 'block';      
        } else {
            let user_register = users_base.find(record => record.user_username.toLowerCase()==username.toLowerCase())
            let correct_password = (user_register.user_password == password)
            if (correct_password){
                const user_db = users_base.find(record => record.user_username.toLowerCase()==username.toLowerCase())          
                          
                sessionStorage.setItem('loggedIn','true')
                sessionStorage.setItem('userID',user_db.user_id)
                window.location.href = 'transactions.html'
                password_tries = 0                
                clean_fields()
            } else {
                password_tries++

                if (password_tries==3){
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