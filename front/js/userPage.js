// userPage.js - Lógica de la página de usuario y selección de cuentas

import CurrentAccount from "./accountcurrent.js"
import SavingAccount from "./accountsaving.js"
import User from "./user.js"
import './check_balance.js'
import './processDeposit.js'
import './processWithdrawal.js'
import './processTransfer.js'
import './check_transactions.js'
import './updateuserdata.js'

// Base de cuentas de usuario desde localStorage
export let users_accounts_base = JSON.parse(localStorage.getItem('repo_json/users_accounts.json'))

// Redirección si el usuario no está logueado
window.onload = function (){
    if(window.location.pathname.includes('transactions.html')){
        const loggedIn = sessionStorage.getItem('loggedIn')
        if (loggedIn!='true'){
            window.location.href = 'index.html'
        }
    }
}

// Base de usuarios y datos del usuario logueado
let users_base = JSON.parse(localStorage.getItem('repo_json/users.json'))
export const logged_user_id = sessionStorage.getItem('userID')
export let selected_account_id = null
export let account_selected = null

// Permite cambiar la cuenta seleccionada desde otros módulos
export function setAccountSelected(value) {
    account_selected = value
}

// Instancia del usuario logueado
const user_db = users_base.find(record => record.user_id==logged_user_id)
export const logged_user = new User(user_db.user_id,user_db.user_fname,user_db.user_lname,
                    user_db.user_password,user_db.user_username,user_db.user_address
                )  

// Muestra el nombre del usuario en la página
userTitle(logged_user)

// Cierra sesión y redirige al login
function log_out (){
    sessionStorage.removeItem('loggedIn')
    sessionStorage.removeItem('userID')
    window.location.href = 'index.html'
}

// Asigna evento al botón de logout
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userPage-logout').addEventListener('click', () => log_out());
})

// Cambia el título de bienvenida con el nombre del usuario
export function userTitle(user){       
    const user_title = document.getElementById('transactions-user-title')
    user_title.textContent = `Bienvenido ${user.fname} ${user.lname}`    
}

// Crea las opciones de cuentas disponibles (ahorro y corriente)
export function createAccountsAvailable(){
    const savings_selections = document.getElementById('transactions-saving-available-selection')
    savings_selections.innerHTML = ''
    const updated_account = JSON.parse(localStorage.getItem('repo_json/users_accounts.json'))
    // Filtra cuentas de ahorro
    const savings_account = updated_account.filter(record => 
        record.account_userid==logged_user_id &&
        record.account_accountnumber.startsWith("SA")  
    )
    savings_account.forEach((account,index)=>{
        const optionDivSavings = document.createElement('div');
        const savingRadioInput = document.createElement('input')
        savingRadioInput.type = 'radio'
        savingRadioInput.value = account.account_id
        savingRadioInput.name = 'transactions-select-account'
        savingRadioInput.id =  account.account_id
        const savingLabelInput = document.createElement('label')
        savingLabelInput.textContent = account.account_accountnumber
        savingLabelInput.htmlFor = account.account_id
        optionDivSavings.appendChild(savingRadioInput)
        optionDivSavings.appendChild(savingLabelInput)
        savings_selections.appendChild(optionDivSavings)
    })
    // Filtra cuentas corrientes
    const currents_selections = document.getElementById('transactions-current-available-selection')
    currents_selections.innerHTML = ''
    const currents_account = updated_account.filter(record => 
        record.account_userid==logged_user_id &&
        record.account_accountnumber.startsWith("CA")  
    )   
    currents_account.forEach((account,index)=>{
        const optionDivCurrents = document.createElement('div');
        const currentRadioInput = document.createElement('input')
        currentRadioInput.type = 'radio'
        currentRadioInput.value = account.account_id
        currentRadioInput.name = 'transactions-select-account'
        currentRadioInput.id =  account.account_id
        const currentLabelInput = document.createElement('label')
        currentLabelInput.textContent = account.account_accountnumber
        currentLabelInput.htmlFor = account.account_id
        optionDivCurrents.appendChild(currentRadioInput)
        optionDivCurrents.appendChild(currentLabelInput)
        currents_selections.appendChild(optionDivCurrents)
    })
    // Asigna eventos a las opciones de cuenta
    account_selection()
}

// Asigna eventos a los radio buttons de cuentas para seleccionar la activa
export function account_selection(){
    const account_options = document.getElementsByName('transactions-select-account')
    account_options.forEach(selection => {
        selection.addEventListener('change',function(){
            users_accounts_base = JSON.parse(localStorage.getItem('repo_json/users_accounts.json'))
            const operation_result = document.getElementById('transactions-operation-result-print-result')
            operation_result.innerHTML = ''
            const selected_account = users_accounts_base.find(record => 
                record.account_id==this.value )
            if(selected_account.account_accountnumber.startsWith('SA')){
                account_selected = SavingAccount.existingAccount(selected_account)                
            } else {
                account_selected = CurrentAccount.existingAccount(selected_account)                
            }
        })
    })
}

// Inicializa la lista de cuentas disponibles al cargar la página
createAccountsAvailable()