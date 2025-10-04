import { account_selected } from "./userPage.js";


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

document.getElementById('transactions-account-transactions-view-button').addEventListener('click',()=>transactionsCheck())