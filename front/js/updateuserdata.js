import { logged_user, setAccountSelected } from "./userPage.js"

function update_user_data_menu(){
    const operation_result = document.getElementById('transactions-operation-result-print-result')
    operation_result.innerHTML = ''
    const radioButtons = document.getElementsByName('transactions-select-account')
    
    radioButtons.forEach(button => {
        button.checked=false
    })
    
    setAccountSelected(null)

    const update_user_data_button = document.createElement('button')
    update_user_data_button.textContent = `Actualizar datos personales para ${logged_user.fname}`
    const update_password_button = document.createElement('button')
    update_password_button.textContent = `Actualizar contraseña ingreso para ${logged_user.fname}`

    operation_result.appendChild(update_user_data_button)
    operation_result.appendChild(update_password_button)

    update_user_data_button.addEventListener('click',()=>update_user_data(operation_result,update_user_data_button,update_password_button))
    update_password_button.addEventListener('click',()=>update_user_password(operation_result,update_user_data_button,update_password_button))


}

function update_user_password(operation_result,update_user_data_button,update_password_button){
    update_user_data_button.remove()
    update_password_button.remove()

    const current_password_input = document.createElement('input')
    current_password_input.type = 'password'
    current_password_input.id = 'transactions-user-current-password'
    current_password_input.className = 'transactions-user-current-password'
    const currentPasswordLabel = document.createElement('label')
    currentPasswordLabel.htmlFor = 'transactions-user-current-password'
    currentPasswordLabel.className = 'transactions-user-current-password-label'
    currentPasswordLabel.textContent = `Digite su contraseña actual`

    operation_result.appendChild(currentPasswordLabel)
    operation_result.appendChild(current_password_input)

    const new_password_input = document.createElement('input')
    new_password_input.type = 'password'
    new_password_input.id = 'transactions-user-new-password'
    new_password_input.className = 'transactions-user-new-password'
    const new_password_label = document.createElement('label')
    new_password_label.htmlFor = 'transactions-user-new-password'
    new_password_label.className = 'transactions-user-new-password-label'
    new_password_label.textContent = `Digite su nueva contraseña`

    operation_result.appendChild(new_password_label)
    operation_result.appendChild(new_password_input)

    const confirm_new_password_input = document.createElement('input')
    confirm_new_password_input.type = 'password'
    confirm_new_password_input.id = 'transactions-user-confirm-new-password'
    confirm_new_password_input.className = 'transactions-user-confirm-new-password'
    const confirm_new_password_label = document.createElement('label')
    confirm_new_password_label.htmlFor = 'transactions-user-confirm-new-password'
    confirm_new_password_label.className = 'transactions-user-confirm-new-password-label'
    confirm_new_password_label.textContent = `Confirme su nueva contraseña`

    operation_result.appendChild(confirm_new_password_label)
    operation_result.appendChild(confirm_new_password_input)
    
    const confirm_update_password_button = document.createElement('button')
    confirm_update_password_button.textContent = 'Actualizar contraseña'
    confirm_update_password_button.id = 'transactions-user-confirm-update_password-button'
    confirm_update_password_button.className = 'transactions-user-confirm-update_password-button'

    operation_result.appendChild(confirm_update_password_button)

    let current_password_input_value=''
    let new_password_input_value=''
    let confirm_new_password_input_value=''

    let current_password_input_error = null
    let new_password_input_error = null
    let confirm_new_password_input_error = null

    current_password_input.addEventListener('input',function(event){
        current_password_input_value = event.target.value
    })

    new_password_input.addEventListener('input',function(event){
        new_password_input_value = event.target.value
    })

    confirm_new_password_input.addEventListener('input',function(event){
        confirm_new_password_input_value = event.target.value
    })

    confirm_update_password_button.addEventListener('click',function(){
        
        removeAllErrors()

        if(!current_password_input_value || !new_password_input_value || !confirm_new_password_input_value){
            
            if(!current_password_input_value){
                current_password_input_error = document.createElement('span')
                current_password_input_error.textContent = `Debe ingresar su contraseña actual para continuar`
                current_password_input_error.className = 'transactions-user-current-password-error-msg'
                current_password_input.insertAdjacentElement('afterend',current_password_input_error)  
                cleanAllInputs()
            }
            if(!new_password_input_value){
                new_password_input_error = document.createElement('span')
                new_password_input_error.textContent = `Debe ingresar una nueva contraseña para continuar`
                new_password_input_error.className = 'transactions-user-new-password-error-msg'
                new_password_input.insertAdjacentElement('afterend',new_password_input_error)  
                cleanAllInputs()
            }
            if(!confirm_new_password_input_value){
                confirm_new_password_input_error = document.createElement('span')
                confirm_new_password_input_error.textContent = `Debe confirmar una nueva contraseña para continuar`
                confirm_new_password_input_error.className = 'transactions-user-conrim-new-password-error-msg'
                confirm_new_password_input.insertAdjacentElement('afterend',confirm_new_password_input_error)  
                cleanAllInputs()
            }

        } else if (logged_user.checkCurrentPassword(current_password_input_value)){
            if(new_password_input_value==confirm_new_password_input_value){
                if(new_password_input_value.length<4){
                    new_password_input_error = document.createElement('span')
                    new_password_input_error.textContent = `La nueva contraseña es muy corta, debe tener minimo 4 digitos`
                    new_password_input_error.className = 'transactions-user-new-password-error-msg'
                    new_password_input.insertAdjacentElement('afterend',new_password_input_error)  
                    cleanAllInputs()
                } else {
                    if(new_password_input_value==current_password_input_value){
                        new_password_input_error = document.createElement('span')
                        new_password_input_error.textContent = `La nueva contraseña es igual a la actual, intente una nueva contraseña`
                        new_password_input_error.className = 'transactions-user-new-password-error-msg'
                        new_password_input.insertAdjacentElement('afterend',new_password_input_error)  
                        cleanAllInputs()
                    } else {
                        cleanAllInputs()
                        cleanOperationResult()
                        logged_user.updatePassword(new_password_input_value,operation_result)
                    }                    
                }
            } else {
                confirm_new_password_input_error = document.createElement('span')
                confirm_new_password_input_error.textContent = `Las contraseñas no coinciden, por favor intente de nuevo`
                confirm_new_password_input_error.className = 'transactions-user-conrim-new-password-error-msg'
                confirm_new_password_input.insertAdjacentElement('afterend',confirm_new_password_input_error)  
                cleanAllInputs()
            }
        } else {
            current_password_input_error = document.createElement('span')
            current_password_input_error.textContent = `Su contraseña no es correcta, por favor verifique y trate de nuevo`
            current_password_input_error.className = 'transactions-user-update-password-error-msg'
            current_password_input.insertAdjacentElement('afterend',current_password_input_error)  
            cleanAllInputs()
        }
        
    })
    function cleanOperationResult(){
        current_password_input.remove()
        currentPasswordLabel.remove()
        new_password_input.remove()
        new_password_label.remove()
        confirm_new_password_input.remove()
        confirm_new_password_label.remove()
        confirm_update_password_button.remove()
    }
    function cleanAllInputs(){
        current_password_input.value = ''
        new_password_input.value = ''
        confirm_new_password_input.value = ''
    }

    function removeAllErrors(){
        if(current_password_input_error){
            current_password_input_error.remove()
            current_password_input_error = null
        }
        
        if(new_password_input_error){
            new_password_input_error.remove()
            new_password_input_error = null
        }

        if(confirm_new_password_input_error){
            confirm_new_password_input_error.remove()
            confirm_new_password_input_error = null
        }     
         
    }
    
}

function update_user_data(operation_result,update_user_data_button,update_password_button){
    update_user_data_button.remove()
    update_password_button.remove()

    const new_fname_input = document.createElement('input')
    new_fname_input.type = 'text'
    new_fname_input.id = 'transactions-user-new-fname'
    new_fname_input.className = 'transactions-user-new-fname'
    new_fname_input.value = logged_user.fname
    const new_fname_label = document.createElement('label')
    new_fname_label.htmlFor = 'transactions-user-new-fname'
    new_fname_label.className = 'transactions-user-new-fname-label'
    new_fname_label.textContent = `Nombre`

    operation_result.appendChild(new_fname_label)
    operation_result.appendChild(new_fname_input)
    
    const new_lname_input = document.createElement('input')
    new_lname_input.type = 'text'
    new_lname_input.id = 'transactions-user-new-lname'
    new_lname_input.className = 'transactions-user-new-lname'
    new_lname_input.value = logged_user.lname
    const new_lname_label = document.createElement('label')
    new_lname_label.htmlFor = 'transactions-user-new-lname'
    new_lname_label.className = 'transactions-user-new-lname-label'
    new_lname_label.textContent = `Apellido`

    operation_result.appendChild(new_lname_label)
    operation_result.appendChild(new_lname_input)

    const new_address_input = document.createElement('input')
    new_address_input.type = 'text'
    new_address_input.id = 'transactions-user-new-address'
    new_address_input.className = 'transactions-user-new-address'
    new_address_input.value = logged_user.address
    const new_address_label = document.createElement('label')
    new_address_label.htmlFor = 'transactions-user-new-address'
    new_address_label.className = 'transactions-user-new-address-label'
    new_address_label.textContent = `Dirección`

    operation_result.appendChild(new_address_label)
    operation_result.appendChild(new_address_input)

    const confirm_update_data_user_button = document.createElement('button')
    confirm_update_data_user_button.textContent = `Actualizar datos ${logged_user.fname} ${logged_user.lname}`
    confirm_update_data_user_button.id = 'transactions-user-confirm-update_password-button'
    confirm_update_data_user_button.className = 'transactions-user-confirm-update_password-button'

    operation_result.appendChild(confirm_update_data_user_button)

    let new_fname_input_error = null
    let new_lname_input_error = null
    let new_address_input_error = null

    
    confirm_update_data_user_button.addEventListener('click', function() {
        removeAllErrors()
        let new_fname_input_value=new_fname_input.value
        let new_lname_input_value=new_lname_input.value
        let new_address_input_value=new_address_input.value
        
        if(!new_fname_input_value||!new_lname_input_value||!new_address_input_value){
            
            if (!new_fname_input_value){
                new_fname_input_error = document.createElement('span')
                new_fname_input_error.textContent = `El nombre no debe ir en blanco, por favor ingrese un nuevo nombre`
                new_fname_input_error.className = 'transactions-user-new-fname-error-msg'
                new_fname_input.insertAdjacentElement('afterend',new_fname_input_error)
                new_fname_input.value = logged_user.fname
            }

            if (!new_lname_input_value){
                new_lname_input_error = document.createElement('span')
                new_lname_input_error.textContent = `El apellido no debe ir en blanco, por favor ingrese un nuevo apellido`
                new_lname_input_error.className = 'transactions-user-new-lname-error-msg'
                new_lname_input.insertAdjacentElement('afterend',new_lname_input_error)
                new_lname_input.value = logged_user.lname
            }
            
            if (!new_address_input_value){
                new_address_input_error = document.createElement('span')
                new_address_input_error.textContent = `La dirección no debe ir en blanco, por favor ingrese una nuevo dirección`
                new_address_input_error.className = 'transactions-user-new-address-error-msg'
                new_address_input.insertAdjacentElement('afterend',new_address_input_error)
                new_address_input.value = logged_user.address
            }

        }else if (new_fname_input_value == logged_user.fname && new_lname_input_value == logged_user.lname 
            && new_address_input_value == logged_user.address
            ){
            removeAllUpdateData()
            const no_update_msg_error = document.createElement('span')
            no_update_msg_error.textContent = `No se digitaron cambios para ${logged_user.fname}, datos personales conservados`
            no_update_msg_error.className = 'trnasactions-user-update-data-error'
            operation_result.appendChild(no_update_msg_error)

        } else if(new_fname_input_value.length<2||new_lname_input_value.length<2||new_address_input_value.length<10){
            if(new_fname_input_value.length<2) {
                new_fname_input_error = document.createElement('span')
                new_fname_input_error.textContent = `El nombre ${new_fname_input_value} es muy corto, por favor ingrese un nombre valido`
                new_fname_input_error.className = 'transactions-user-new-fname-error-msg'
                new_fname_input.insertAdjacentElement('afterend',new_fname_input_error)
                new_fname_input.value = logged_user.fname
            }
            if (new_lname_input_value.length<2){
                new_lname_input_error = document.createElement('span')
                new_lname_input_error.textContent = `El apellido ${new_lname_input_value} es muy corto, por favor ingrese un apellido valido`
                new_lname_input_error.className = 'transactions-user-new-lname-error-msg'
                new_lname_input.insertAdjacentElement('afterend',new_lname_input_error)
                new_lname_input.value = logged_user.lname
            }
            if (new_address_input_value.length<10){
                new_address_input_error = document.createElement('span')
                new_address_input_error.textContent = `La dirección ${new_address_input_value} es muy corto, por favor ingrese una dirección valido`
                new_address_input_error.className = 'transactions-user-new-address-error-msg'
                new_address_input.insertAdjacentElement('afterend',new_address_input_error)
                new_address_input.value = logged_user.address
            }           
        } else {
            removeAllUpdateData()
            logged_user.updateUserData(new_fname_input_value,new_lname_input_value,new_address_input_value,operation_result)
        }
    })
    
    function removeAllErrors(){
        if(new_fname_input_error){
            new_fname_input_error.remove()
            new_fname_input_error = null
        }
        
        if(new_lname_input_error){
            new_lname_input_error.remove()
            new_lname_input_error = null
        }

        if(new_address_input_error){
            new_address_input_error.remove()
            new_address_input_error = null
        }     
         
    }

    function removeAllUpdateData(){
        new_fname_input.remove()
        new_fname_label.remove()
        new_lname_input.remove()
        new_lname_label.remove()
        new_address_input.remove()
        new_address_label.remove()
        confirm_update_data_user_button.remove()
    }

    
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('transactions-user-update-data-button').addEventListener('click', () => update_user_data_menu());
})