import { account_selected } from "./userPage.js";

function processDeposit(){
    
    const operation_result = document.getElementById('transactions-operation-result-print-result')
    operation_result.innerHTML = ''    
    if (!account_selected){
        const balance_result_print = document.createElement('span');
        balance_result_print.textContent = `Debe seleccionar una cuenta para continuar`
        operation_result.appendChild(balance_result_print)
    }else {
        const depositInput = document.createElement('input')
        depositInput.type = 'text'
        depositInput.id = 'selected-account-deposit-value'
        depositInput.className = 'selected-account-deposit-input'
        depositInput.placeholder = '$0.00'
        const depositButton = document.createElement('button')
        depositButton.textContent = 'Realizar deposito'
        depositInput.id = 'selected-account-deposit-button'
        depositInput.className = 'selected-account-deposit-button'
        operation_result.appendChild(depositInput)
        operation_result.appendChild(depositButton)

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

        depositInput.addEventListener('input',function(event){
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

        depositInput.addEventListener('keypress', function(event) {
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

        depositButton.addEventListener('click',function(){
            if(!savedValue || savedValue ==0){                
                if(!input_error_value){
                    input_error_value = document.createElement('span');                
                    input_error_value.textContent = `Debe realizar una consignación por un valor mayor a cero`
                    operation_result.appendChild(input_error_value)
                }
            } else{
                if(input_error_value){
                    input_error_value.remove();
                    input_error_value = null;
                }
                depositButton.remove();
                depositInput.remove();
                account_selected.processDeposit(savedValue)
            }            
        })

    }
}

document.getElementById('transactions-account-deposit-button').addEventListener('click',()=>processDeposit())