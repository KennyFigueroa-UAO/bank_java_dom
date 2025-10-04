// check_balance.js - Lógica para mostrar el saldo de la cuenta seleccionada
import { account_selected } from "./userPage.js";

// Formatea un número como moneda USD
function currencyFormat(textNumber){
    const formatter = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',
        minimumFractionDigits:0,
        maximumFractionDigits:20,
    })
    const formatterNumber = formatter.format(textNumber)
    return formatterNumber
}

// Muestra el saldo de la cuenta seleccionada o un mensaje si no hay selección
function balanceChek(){
    const operation_result = document.getElementById('transactions-operation-result-print-result')
    operation_result.innerHTML = ''
    const balance_result_print = document.createElement('span');
    if (!account_selected){
        balance_result_print.textContent = `Debe seleccionar una cuenta para continuar`
        operation_result.appendChild(balance_result_print)
    }else{
        balance_result_print.textContent = `El saldo de su cuenta ${account_selected.accountNumber} es ${currencyFormat(account_selected.getBalance())}`
        operation_result.appendChild(balance_result_print)
    }
}

// Asigna el evento al botón de consultar saldo
document.getElementById('transactions-account-balance-button').addEventListener('click',()=>balanceChek())