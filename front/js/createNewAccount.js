import CurrentAccount from "./accountcurrent.js";
import SavingAccount from "./accountsaving.js";
import { logged_user_id, createAccountsAvailable, users_accounts_base } from "./userPage.js";

function create_saving_account(){
    const newSavingAccount = SavingAccount.createNewAccount(logged_user_id)
    //console.log(newSavingAccount);
    const saving_new_register = {account_id:newSavingAccount.accountID,account_accountnumber:newSavingAccount.accountNumber,
            account_userid:newSavingAccount.userid,account_currentbalance:newSavingAccount.currentBalance}
    //console.log(JSON.stringify(saving_new_register, null, 2));
    users_accounts_base.push(saving_new_register)
    localStorage.setItem('repo_json/users_accounts.json', JSON.stringify(users_accounts_base));
    createAccountsAvailable()
}

function create_current_account(){
    const newCurrentAccount = CurrentAccount.createNewAccount(logged_user_id)
    console.log(newCurrentAccount);
    //console.log(newCurrentAccount);
    const current_new_register = {account_id:newCurrentAccount.accountID,account_accountnumber:newCurrentAccount.accountNumber,
            account_userid:newCurrentAccount.userid,account_currentbalance:newCurrentAccount.currentBalance}
    //console.log(JSON.stringify(saving_new_register, null, 2));
    users_accounts_base.push(current_new_register)
    localStorage.setItem('repo_json/users_accounts.json', JSON.stringify(users_accounts_base));
    createAccountsAvailable()
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('transactions-request-saving-button').addEventListener('click', () => create_saving_account());
    document.getElementById('transactions-request-current-button').addEventListener('click', () => create_current_account());
})