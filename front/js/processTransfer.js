import CurrentAccount from "./accountcurrent.js";
import SavingAccount from "./accountsaving.js";
import { account_selected } from "./userPage.js";


let accounts_users_base = JSON.parse(localStorage.getItem('repo_json/users_accounts.json'))

function processTransfer(){

    const operation_result = document.getElementById('transactions-operation-result-print-result')
    operation_result.innerHTML = ''

    if (!account_selected){
        const balance_result_print = document.createElement('span');
        balance_result_print.textContent = `Debe seleccionar una cuenta para continuar`
        operation_result.appendChild(balance_result_print)
    } else if(account_selected.currentBalance==0 && account_selected instanceof SavingAccount){
        const balance_result_print = document.createElement('span');
        balance_result_print.textContent = `Su cuenta de ahorros no cuenta con saldo disponible en este momento`
        operation_result.appendChild(balance_result_print)
    } else if (account_selected.currentBalance <= -account_selected.overdraft && account_selected instanceof CurrentAccount) {
        const balance_result_print = document.createElement('span');
        balance_result_print.textContent = `Su cuenta corriente no cuenta con saldo disponible en este momento`
        operation_result.appendChild(balance_result_print)
    }else {
        const accountToTransferInput = document.createElement('input')
        accountToTransferInput.type = 'text'
        accountToTransferInput.id = 'selected-account-to-transfer-value'
        accountToTransferInput.className = 'selected-account-to-transfer-input'
        const accountToTransfeLabel = document.createElement('label')
        accountToTransfeLabel.htmlFor = 'selected-account-to-transfer-value'
        accountToTransfeLabel.className = 'selected-account-to-transfer-label'
        accountToTransfeLabel.textContent = `Digite el numero de cuenta destino`
        const transferInput = document.createElement('input')
        transferInput.type = 'text'
        transferInput.id = 'selected-account-transfer-value'
        transferInput.className = 'selected-account-transfer-input'
        transferInput.placeholder = '$0.00'
        const transferButton = document.createElement('button')
        transferButton.textContent = 'Realizar transferencia'
        transferInput.id = 'selected-account-transfer-button'
        transferInput.className = 'selected-account-transfer-button'
        operation_result.appendChild(accountToTransfeLabel)
        operation_result.appendChild(accountToTransferInput)
        operation_result.appendChild(transferInput)
        operation_result.appendChild(transferButton)

        function currencyFormat(textNumber){
            // textNumber = textNumber.replace(',','.')
            const formatter = new Intl.NumberFormat('en-US',{
                style:'currency',
                currency:'USD',
                minimumFractionDigits:0,
                maximumFractionDigits:20,
            })
            const formatterNumber = formatter.format(textNumber)
            return formatterNumber
        }

        let savedValue = 0
        let accountToTransferSavedValue=''

        accountToTransferInput.addEventListener('input',function(event){
            let accountToTransferInputValue=event.target.value
            accountToTransferSavedValue = accountToTransferInputValue
        })

        transferInput.addEventListener('input',function(event){
            let inputValue = event.target.value
            //console.log('dato leido:'+inputValue);
            inputValue = inputValue.replace(/[^0-9.]/g, '')
            //console.log('dato limpiado:'+inputValue);
            const endsWithDot = inputValue.endsWith('.');
            savedValue = parseFloat(inputValue) || 0
            //console.log('dato convertido a numero:'+inputValue);
            let formattedValue = currencyFormat(savedValue);
            if (endsWithDot && !isNaN(savedValue)) {
            formattedValue = formattedValue + '.';
            }

            //console.log('dato convertido a currency: ' + formattedValue);
            event.target.value=formattedValue
        })

        transferInput.addEventListener('keypress', function(event) {
            const validKeys = "0123456789."

            if(validKeys.includes(event.key)){
                if (event.target.value.includes(".")) {
                    if (event.key === ".") {
                        event.preventDefault();
                    } //else {
                    //console.log(event.target.value);
                    //}
                    } //else {
                        //console.log(event.target.value);
                    //}
            } else {
                    event.preventDefault()
                }
        })

        let input_error_value = null

        transferButton.addEventListener('click',function(){
            if(input_error_value){
                    input_error_value.remove();
                    input_error_value = null;
                }

            if(!savedValue || savedValue ==0 || !accountToTransferSavedValue||accountToTransferSavedValue==''){

                if(!input_error_value){
                    const invalidAmountInput=!savedValue || savedValue == 0
                    const invalidAccountToTransferInput = !accountToTransferSavedValue || accountToTransferSavedValue == ''
                    // console.log(`InValid ammount ${invalidAmountInput}`);
                    // console.log(`InValid account ${invalidAccountToTransferInput}`);
                    if(invalidAmountInput && !invalidAccountToTransferInput){
                        input_error_value = document.createElement('span')
                        input_error_value.textContent = `Debe realizar una transferencia por un valor mayor a cero`
                        operation_result.appendChild(input_error_value)
                    } else if (invalidAccountToTransferInput && !invalidAmountInput){
                        input_error_value = document.createElement('span');
                        input_error_value.textContent = `Digite el numero de cuenta destino\n
                                                        SA-(10 digitos) Cuenta Ahorros\n
                                                        CA-(10 digitos) Cuenta Corriente`
                        input_error_value.style.whiteSpace = 'pre-line'
                        operation_result.appendChild(input_error_value)
                    } else {
                        input_error_value = document.createElement('span');
                        input_error_value.textContent = `Debe realizar una transferencia por un valor mayor a cero\n
                                                        Digite el numero de cuenta destino\n
                                                        SA-(10 digitos) Cuenta Ahorros\n
                                                        CA-(10 digitos) Cuenta Corriente`
                        input_error_value.style.whiteSpace = 'pre-line'
                        operation_result.appendChild(input_error_value)
                    }
                }
            } else{
                if(input_error_value){
                    input_error_value.remove();
                    input_error_value = null;
                }
                // transferButton.remove();
                // transferInput.remove();

                let validAccountToTransfer = accounts_users_base.some(record => record.account_accountnumber.toLowerCase()==accountToTransferSavedValue.toLowerCase())

                if (!validAccountToTransfer){
                    if(input_error_value){
                    input_error_value.remove();
                    input_error_value = null;
                    }
                    input_error_value = document.createElement('span');
                    input_error_value.textContent = `El numero de cuenta ${accountToTransferSavedValue} no existe\n
                                                    Por favor verifique el numero de cuenta destino\n
                                                    SA-(10 digitos) Cuenta Ahorros\n
                                                    CA-(10 digitos) Cuenta Corriente`
                    input_error_value.style.whiteSpace = 'pre-line'
                    operation_result.appendChild(input_error_value)
                } else if(account_selected.currentBalance<savedValue && account_selected instanceof SavingAccount){
                    input_error_value = document.createElement('span');
                    input_error_value.textContent = `No tienes saldo suficiente en tu cuenta de ahorros. \n
                    Tu saldo disponible es ${currencyFormat(account_selected.currentBalance)}`
                    input_error_value.style.whiteSpace = 'pre-line';
                    operation_result.appendChild(input_error_value)
                } else if ((account_selected.currentBalance - savedValue) < -account_selected.overdraft && account_selected instanceof CurrentAccount){
                    input_error_value = document.createElement('span');
                    input_error_value.textContent = `No tienes saldo suficiente en tu cuenta corriente. \n
                    Tu saldo disponible es ${currencyFormat(account_selected.currentBalance+account_selected.overdraft)}`
                    input_error_value.style.whiteSpace = 'pre-line';
                    operation_result.appendChild(input_error_value)
                    // console.log(account_selected.currentBalance+account_selected.overdraft);
                    // console.log('se paso carnal');
                } else {
                    accounts_users_base = JSON.parse(localStorage.getItem('repo_json/users_accounts.json'))
                    let accountToTransfer = accounts_users_base.find(record => record.account_accountnumber.toLowerCase()==accountToTransferSavedValue.toLowerCase())
                    if(account_selected.accountID == accountToTransfer.account_id){
                        input_error_value = document.createElement('span');
                        input_error_value.textContent = `No puedes transferir a la misma cuenta\n
                                                        Por favor selecciona otra cuenta a transferir\n
                                                        SA-(10 digitos) Cuenta Ahorros\n
                                                        CA-(10 digitos) Cuenta Corriente`
                        input_error_value.style.whiteSpace = 'pre-line';
                        operation_result.appendChild(input_error_value)
                    } else{                    
                        accountToTransfeLabel.remove();
                        accountToTransferInput.remove();
                        transferButton.remove();
                        transferInput.remove();                    
                        account_selected.processTransfer(savedValue,accountToTransfer.account_id,accountToTransfer.account_currentbalance)
                    }
                }
                //account_selected.processDeposit(savedValue)
            }
        })

    }
}

document.getElementById('transactions-account-transfer-button').addEventListener('click',()=>processTransfer())