// check_transactions.js - Lógica para mostrar los movimientos de la cuenta seleccionada
import { account_selected } from "./userPage.js";

// Muestra los movimientos de la cuenta seleccionada o un mensaje si no hay selección
function transactionsCheck(){
    const operation_result = document.getElementById('transactions-operation-result-print-result')
    operation_result.innerHTML = ''
    const balance_result_print = document.createElement('span');
    if (!account_selected){
        balance_result_print.textContent = `Debe seleccionar una cuenta para continuar`
        operation_result.appendChild(balance_result_print)
    }else{
        account_selected.viewTransactions()
    }
}

// Asigna el evento al botón de consultar movimientos
document.getElementById('transactions-account-transactions-view-button').addEventListener('click',()=>transactionsCheck())