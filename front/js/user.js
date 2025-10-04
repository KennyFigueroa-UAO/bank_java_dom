
let users_base = JSON.parse(localStorage.getItem('repo_json/users.json'))

class User{
    constructor(id,fname,lname,password,username,address){
        this.id = id
        this.fname = fname
        this.lname = lname
        this.password = password
        this.username = username
        this.address = address
    }

    checkCurrentPassword(currentPasswordInput){
        return currentPasswordInput == this.password
    }

    updatePassword(newPassword,operation_result){
        let user_to_update = users_base.find(record =>record.user_id==this.id)
        user_to_update.user_password = newPassword
        this.password = newPassword
        localStorage.setItem('repo_json/users.json',JSON.stringify(users_base))
        const update_password_success_span = document.createElement('span')
        update_password_success_span.textContent = `Su contraseña ha sido actualizada correctamente`
        update_password_success_span.className = 'transactions-user-update-password-confirmation-span'
        operation_result.appendChild(update_password_success_span)
        
    }

    updateUserData(fnameUpdate,lnameUpdate,addressUpdate,operation_result){
        let user_to_update = users_base.find(record =>record.user_id==this.id)
        user_to_update.user_fname = fnameUpdate 
        this.fname = fnameUpdate
        user_to_update.user_lname = lnameUpdate 
        this.lname = lnameUpdate
        user_to_update.user_address = addressUpdate 
        this.address = addressUpdate
        localStorage.setItem('repo_json/users.json',JSON.stringify(users_base))
        const update_user_data_success_span = document.createElement('span')
        update_user_data_success_span.textContent = `Sus datos personales han sido actualizados correctamente`
        update_user_data_success_span.className = 'transactions-user-update-user-data-confirmation-span'
        operation_result.appendChild(update_user_data_success_span)
    }

}

export default User