// register.js - Lógica para el registro de nuevos usuarios
import { updateUsers } from "./main.js"

// Referencias a elementos del modal de registro y mensajes de error
let new_user_registration = document.getElementById('main-register-user')
let cancel_new_user_button = document.getElementsByClassName('cancel-new-user')[0]
const fnameError = document.getElementById('fname-error')
const lnameError = document.getElementById('lname-error')
const addressError = document.getElementById('address-error')
const usernameError = document.getElementById('username-error')
const documentidError = document.getElementById('documentid-error')
const newPasswordError = document.getElementById('new-password-error')
const confirmNewPasswordError = document.getElementById('confirm-new-password-error')

// Muestra el modal de registro
export function new_register(){   
    new_user_registration.style.display = "block"
}

// Base de usuarios desde localStorage
let users_base = JSON.parse(localStorage.getItem('repo_json/users.json')) || []

// Clase para crear y guardar un nuevo usuario
class NewUserRegister {
    constructor(fname,lname,username,documentid,new_password,address){
        this.fname = fname
        this.lname = lname
        this.username = username
        this.documentid = documentid
        this.newPassword = new_password      
        this.address = address
        this.createNewUser()
    }
    // Agrega el nuevo usuario al array y lo guarda en localStorage
    createNewUser() {
        let nextUserID
        if(users_base.length==0){
            nextUserID =1
        } else {
            nextUserID = Math.max(...users_base.map(user =>user.user_id))+1
        }
        const user_new_register = {user_id:nextUserID,user_username:this.username,
            user_fname:this.fname,user_lname:this.lname,user_address:this.address,
            user_documentid:this.documentid,user_password:this.newPassword}
        users_base.push(user_new_register)
        localStorage.setItem('repo_json/users.json', JSON.stringify(users_base));
    }
}

// Función para cerrar el modal y limpiar campos
function closeModal() {
    new_user_registration.style.display = "none";
    document.getElementById('new-user-data').reset();
    fnameError.style.display = 'none';
    lnameError.style.display = 'none';
    addressError.style.display = 'none';
    usernameError.style.display = 'none';
    documentidError.style.display = 'none';
    newPasswordError.style.display = 'none';
    confirmNewPasswordError.style.display = 'none';
}

// Lógica para cerrar el modal de registro y limpiar campos
if (window.location.pathname.includes('index.html')) {
    let new_user_registration = document.getElementById('main-register-user');
    let cancel_new_user_button = document.getElementsByClassName('cancel-new-user')[0];
    
    // Cerrar al hacer clic en el botón X
    if (cancel_new_user_button) {
        cancel_new_user_button.onclick = closeModal;
    }
    
    // Cerrar al hacer clic en el backdrop (fuera del contenido del modal)
    if (new_user_registration) {
        new_user_registration.onclick = function(event) {
            if (event.target === new_user_registration) {
                closeModal();
            }
        };
    }
}

// Verifica si ya existe un usuario por documento o username
function existingUser(userNumberId='',userUsername=''){
    if (!userUsername){
        return users_base.some(record => record.user_documentid.toLowerCase()==userNumberId.toLowerCase())
    } else if (!userNumberId){
        return users_base.some(record => record.user_username.toLowerCase()==userUsername.toLowerCase())
    }
}

// Valida los campos del formulario de registro
function validateFields(event){
    event.preventDefault()
    let formValid = true    
    const fname = document.getElementById('fname')
    const lname = document.getElementById('lname')
    const address = document.getElementById('address')
    const username = document.getElementById('username')
    const documentid = document.getElementById('documentid')
    const newPassword = document.getElementById('new-password')
    const confirmNewPassword = document.getElementById('confirm-new-password')
    // Validación de nombre
    if (!fname.value) {
        fnameError.textContent = 'Por favor, ingresa tu nombre.';
        fnameError.style.display = 'block';
        formValid = false;
    } else if (fname.value.length<2){
        fnameError.textContent = `El nombre ${fname.value},es muy corto, por favor ingrese un nombre valido`;
        fnameError.style.display = 'block';
        formValid = false;
    } else {
        fnameError.style.display = 'none';
    }
    // Validación de apellido
    if (!lname.value) {
        lnameError.textContent = 'Por favor, ingresa tu apellido.';
        lnameError.style.display = 'block';
        formValid = false;
    } else if (lname.value.length <2 ){
        lnameError.textContent = `El apellido ${lname.value},es muy corto, por favor ingrese un apellido valido`;
        lnameError.style.display = 'block';
        formValid = false;
    } else {
        lnameError.style.display = 'none';
    }
    // Validación de dirección
    if (!address.value) {
        addressError.textContent = 'Por favor, ingresa tu dirección.';
        addressError.style.display = 'block';
        formValid = false;
    } else if (address.value.length <10){
        addressError.textContent = `La dirección ${address.value},es muy corto, por favor ingrese una dirección valida`;
        addressError.style.display = 'block';
        formValid = false;
    } else {
        addressError.style.display = 'none';
    }
    // Validación de nombre de usuario
    if (!username.value) {
        usernameError.textContent = 'Por favor, ingresa tu nombre de usuario.';
        usernameError.style.display = 'block';
        formValid = false;
    } else if (username.value.length<5){
        usernameError.textContent = `El nombre de usuario debe contener al menos 5 caracteres`;
        usernameError.style.display = 'block';
        formValid = false;
    } else if (existingUser(undefined,username.value)){
        usernameError.textContent = `El nombre de usuario ya existe, use su nombre de usuario para iniciar sesion`;
        usernameError.style.display = 'block';
        formValid = false;
    } else {
        usernameError.style.display = 'none';
    }
    // Validación de documento
    if (!documentid.value) {
        documentidError.textContent = 'Por favor, ingresa tu numero de documento.';
        documentidError.style.display = 'block';
        formValid = false;
    } else if(documentid.value.length<7){
        documentidError.textContent = `El numero de identicacion solo tiene ${documentid.value.length} caracteres, el minimo es 7`;
        documentidError.style.display = 'block';
        formValid = false;
    } else if(existingUser(documentid.value)){
        documentidError.textContent = `El numero de identicacion ya existe, use su nombre de usuario para iniciar sesion`;
        documentidError.style.display = 'block';
        formValid = false;
    } else {
        documentidError.style.display = 'none';
    }
    // Validación de contraseña
    if (!newPassword.value) {
        newPasswordError.textContent = 'Por favor, ingresa tu contraseña.';
        newPasswordError.style.display = 'block';
        formValid = false;
    } else if(newPassword.value.length<4){
        newPasswordError.textContent = `Su contraseña solo tiene ${newPassword.value.length} caracteres, el minimo es 4`;
        newPasswordError.style.display = 'block';
        formValid = false;
    } else {
        newPasswordError.style.display = 'none';
    }
    // Validación de confirmación de contraseña
    if (!confirmNewPassword.value) {
        confirmNewPasswordError.textContent = 'Por favor, confirma tu contraseña.';
        confirmNewPasswordError.style.display = 'block';
        formValid = false;
    } else {
        confirmNewPasswordError.style.display = 'none';
    }
    // Verifica que ambas contraseñas coincidan
    if(newPassword.value!=confirmNewPassword.value){
        confirmNewPasswordError.textContent = 'Por favor, intenta de nuevo, contraseña no coinciden.';
        confirmNewPasswordError.style.display = 'block';        
        formValid = false;
        newPassword.value =''
        confirmNewPassword.value=''
    } else {
        confirmNewPasswordError.style.display = 'none';
    }
    // Si todo es válido, crea el usuario y cierra el modal
    if (formValid){
        const new_user_register = new NewUserRegister(fname.value,
            lname.value,username.value,documentid.value,newPassword.value,address.value
        )
        new_user_registration.style.display = "none";
        updateUsers()
    }
}

// Asigna el validador al formulario de registro
document.getElementById('new-user-data').addEventListener('submit',validateFields)