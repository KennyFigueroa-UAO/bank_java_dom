import Account from "./accounts.js";



class SavingAccount extends Account {
    constructor(userid, currentBalance=0, accountNumber=null, accountID=null, monthlyInterest=0.01){
        super(userid,currentBalance,accountNumber,accountID)
        this.monthlyInterest = monthlyInterest
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
            this.monthlyInterest
        )
    }

    generateAccountNumber(){
        const min = 1000000000; // 10 dígitos mínimo
        const max = 9999999999; // 10 dígitos máximo
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return `SA-${randomNumber}`;
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

export default SavingAccount