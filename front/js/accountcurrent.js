import Account from "./accounts.js";

class CurrentAccount extends Account{
    constructor(userid, currentBalance=0, accountNumber=null, accountID=null, overdraft=500000){
        super(userid,currentBalance,accountNumber,accountID)
        this.overdraft = overdraft
    }

    static createNew(userid, currentBalance=0) {
        return new this(userid, currentBalance)
    }

    static existingAccount(accountSelected){
        return new this(
            accountSelected.account_userid,
            accountSelected.account_currentbalance,
            accountSelected.account_accountnumber,
            accountSelected.account_id,
            this.overdraft
        )
    }

    generateAccountNumber(){
        const min = 1000000000; // 10 dígitos mínimo
        const max = 9999999999; // 10 dígitos máximo
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return `CA-${randomNumber}`;
    }    
    processWithdraw(withdrawAmount){
        this.currentBalance = this.currentBalance - withdrawAmount
        this.registerTransaction(this.currentBalance,'Retiro',withdrawAmount)
    }
    processDeposit(depositAmount){
        this.currentBalance = this.currentBalance + depositAmount
        this.registerTransaction(this.currentBalance,'Consignación',depositAmount)
    }
    processTransfer(transferAmount,accountToTransferid,accountToTransferBalance){
        this.currentBalance = this.currentBalance - transferAmount
        this.registerTransaction(this.currentBalance,'Envio Transferencia',transferAmount)
        let transferNewBalance = accountToTransferBalance + transferAmount
        this.registerTransaction(transferNewBalance,'Recepción Transferencia',transferAmount,accountToTransferid)
    }
}

export default CurrentAccount