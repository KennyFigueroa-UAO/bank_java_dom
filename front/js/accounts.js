// accounts.js - Clase base para cuentas y lógica de transacciones
import { logged_user, users_accounts_base } from "./userPage.js"

// Inicializa el almacenamiento de transacciones si no existe
if(!localStorage.getItem('repo_json/accounts_transactions.json')){
    const initial_account_transactions = [];
    localStorage.setItem('repo_json/accounts_transactions.json',JSON.stringify(initial_account_transactions));
}

// Base de transacciones de cuentas desde localStorage
let accounts_transactions_base = JSON.parse(localStorage.getItem('repo_json/accounts_transactions.json'))

// Fecha actual para registrar transacciones
let transactionDate = new Date()

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

// Clase base Account para cuentas bancarias
class Account{
    // Constructor: inicializa datos principales de la cuenta
    constructor(userid,currentBalance=0,accountNumber=null,accountID=null){        
        this.userid = userid
        this.currentBalance = currentBalance
        this.accountNumber = accountNumber || this.generateAccountNumber()
        this.accountID = accountID || this.generateAccountID()
    }

    // Crea una nueva cuenta (factory)
    static createNewAccount(userid){
        return new this(userid)
    }

    // Instancia una cuenta existente desde un objeto
    static existingAccount(accountSelected){
        return new this(
            accountSelected.account_userid,
            accountSelected.account_currentbalance,
            accountSelected.account_accountnumber,
            accountSelected.account_id
        )
    }

    // Genera un nuevo ID de cuenta
    generateAccountID(){
        if(users_accounts_base.length==0){
            return 1
        } else {
            return Math.max(...users_accounts_base.map(user => user.account_id))+1
        }
    }

    // Genera un nuevo ID de transacción
    generateTransactionID(){
        if(accounts_transactions_base.length==0){
            return 1
        } else {
            return Math.max(...accounts_transactions_base.map(user => user.transac_id))+1
        }
    }

    // Genera un número de cuenta aleatorio
    generateAccountNumber(){
        const randomNumber = Math.floor(Math.random() * 1000000000);  
        return randomNumber
    }

    // Devuelve el saldo actual de la cuenta
    getBalance(){
        return this.currentBalance
    }

    // Registra una transacción en la cuenta y actualiza el saldo
    registerTransaction(newBalance,transactionType,depositAmount,account_id=this.accountID){
        const transaction_date_time = transactionDate.toLocaleString()
        const newRegister = {
            transac_id :this.generateTransactionID(),
            transac_userid:this.userid,
            transac_accountid:account_id,
            transac_transactype:transactionType,
            transac_value:depositAmount,
            transac_balance:newBalance,
            transac_timedate:transaction_date_time
        }
        accounts_transactions_base.push(newRegister)
        localStorage.setItem('repo_json/accounts_transactions.json', JSON.stringify(accounts_transactions_base))
        // Actualiza el saldo en la base de cuentas
        const user_account = users_accounts_base.find(record => record.account_id == account_id)
        user_account.account_currentbalance = newBalance
        localStorage.setItem('repo_json/users_accounts.json',JSON.stringify(users_accounts_base))
        // Muestra mensaje de éxito si es la cuenta activa
        if(account_id==this.accountID){
            const operation_result = document.getElementById('transactions-operation-result-print-result')
            const balance_result_print = document.createElement('span');
            balance_result_print.textContent = `${logged_user.fname}, su ${transactionType.toLowerCase()} por ${currencyFormat(depositAmount)} ha sido realizado, su nuevo saldo es ${currencyFormat(newBalance)} \nTransacción exitosa registrada ${transaction_date_time}`
            balance_result_print.style.whiteSpace = 'pre-line';
            operation_result.appendChild(balance_result_print)
        }
    }

    // Muestra el historial de transacciones de la cuenta en una tabla
    viewTransactions(){
        let transactionsAccount = accounts_transactions_base.filter(record => 
                record.transac_accountid==this.accountID)
        const operation_result = document.getElementById('transactions-operation-result-print-result')
        if (transactionsAccount.length==0){
            const balance_result_print = document.createElement('span');
            balance_result_print.textContent = `No hay movimientos registrados para la cuenta ${this.accountNumber}`
            balance_result_print.style.whiteSpace = 'pre-line';
            operation_result.appendChild(balance_result_print)
        } else {
            // Crea tabla de transacciones
            const transactions_table_result = document.createElement('table')
            transactions_table_result.className = 'transactions-selected-account-transactions-table'
            const transactions_table_result_header_head = document.createElement('thead')
            transactions_table_result_header_head.className = 'transactions-selected-account-transactions-table-thead'    
            const transactions_table_result_header_row = document.createElement('tr')
            transactions_table_result_header_row.className = 'transactions-selected-account-transactions-table-thead-tr' 
            const transactions_table_result_body = document.createElement('tbody')
            transactions_table_result_body.className = 'transactions-selected-account-transactions-table-tbody'
            transactions_table_result_header_head.appendChild(transactions_table_result_header_row)
            transactions_table_result.appendChild(transactions_table_result_header_head)
            transactions_table_result.appendChild(transactions_table_result_body)
            operation_result.appendChild(transactions_table_result)
            // Encabezados de la tabla
            const transaction_table_result_headers_values  = ['Fecha y Hora','Concepto','Valor','Saldo']
            transaction_table_result_headers_values.forEach(element =>{
                const table_header_value = document.createElement('th')
                table_header_value.textContent = element
                table_header_value.className = 'transactions-selected-account-transactions-table-thear-tr-value'
                transactions_table_result_header_row.appendChild(table_header_value)
            })
            // Filas de la tabla
            transactionsAccount.forEach(rowData => {
                const table_value_row = document.createElement('tr')
                table_value_row.className = 'transactions-selected-account-transactions-table-tbody-tr-value'
                const propertiesToShow = ['transac_timedate', 'transac_transactype', 'transac_value', 'transac_balance']
                propertiesToShow.forEach(property => {
                    const table_value = document.createElement('td')
                    table_value.className = 'transactions-selected-account-transactions-table-tbody-td-value'
                    table_value.textContent = rowData[property]
                    table_value_row.appendChild(table_value)
                    // Formatea valores y aplica estilos según el tipo de transacción
                    if(property=='transac_balance'){
                        table_value.textContent = currencyFormat(rowData[property])
                    }
                    if (property=='transac_value'){
                        const transactionType = rowData['transac_transactype'];
                        table_value.textContent = currencyFormat(rowData[property])
                        if (transactionType.includes('Consignación') || transactionType.includes('Recepción')) {
                            table_value.style.color = '#28a745';
                            table_value.style.backgroundColor = 'rgba(40, 167, 69, 0.15)';
                            table_value.style.borderRadius = '6px';
                        } 
                        else if (transactionType.includes('Retiro') || transactionType.includes('Envio')) {
                            table_value.style.color = '#dc3545';
                            table_value.style.backgroundColor = 'rgba(220, 53, 69, 0.15)';
                            table_value.style.borderRadius = '6px';
                        }
                    }
                })
                transactions_table_result_body.appendChild(table_value_row)
            });
        }
    }
}

export default Account