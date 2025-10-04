import CurrentAccount from "./accountcurrent.js";
import SavingAccount from "./accountsaving.js";
import { account_selected } from "./userPage.js";

function processWithdraw(){
    
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
        const withdrawInput = document.createElement('input')
        withdrawInput.type = 'text'
        withdrawInput.id = 'selected-account-withdraw-value'
        withdrawInput.className = 'selected-account-withdraw-input'
        withdrawInput.placeholder = '$0.00'
        const withdrawButton = document.createElement('button')
        withdrawButton.textContent = 'Realizar retiro'
        withdrawInput.id = 'selected-account-withdraw-button'
        withdrawInput.className = 'sselected-account-withdraw-button'
        operation_result.appendChild(withdrawInput)
        operation_result.appendChild(withdrawButton)

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

        withdrawInput.addEventListener('input',function(event){
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

        withdrawInput.addEventListener('keypress', function(event) {
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

        withdrawButton.addEventListener('click',function(){

            if(!savedValue || savedValue ==0){                
                if(!input_error_value){
                    input_error_value = document.createElement('span');                
                    input_error_value.textContent = `Debe realizar un retiro por un valor mayor a cero`
                    operation_result.appendChild(input_error_value)
                }
            } else{
                if(input_error_value){
                    input_error_value.remove();
                    input_error_value = null;
                }
                // withdrawButton.remove();
                // withdrawInput.remove();
                if(account_selected.currentBalance<savedValue && account_selected instanceof SavingAccount){
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
                    withdrawButton.remove();
                    withdrawInput.remove();
                    account_selected.processWithdraw(savedValue)                   
                }
                //account_selected.processDeposit(savedValue)
            }            
        })

    }
}

document.getElementById('transactions-account-withdrawal-button').addEventListener('click',()=>processWithdraw())