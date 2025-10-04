// accountcurrent.js - Clase para cuentas corrientes
import Account from "./accounts.js";

// Clase CurrentAccount extiende Account para cuentas corrientes
class CurrentAccount extends Account{
    // Constructor: incluye sobregiro permitido
    constructor(userid, currentBalance=0, accountNumber=null, accountID=null, overdraft=500000){
        super(userid,currentBalance,accountNumber,accountID)
        this.overdraft = overdraft
    }

    // Crea una nueva cuenta corriente
    static createNew(userid, currentBalance=0) {
        return new this(userid, currentBalance)
    }

    // Instancia una cuenta corriente existente
    static existingAccount(accountSelected){
        return new this(
            accountSelected.account_userid,
            accountSelected.account_currentbalance,
            accountSelected.account_accountnumber,
            accountSelected.account_id,
            this.overdraft
        )
    }

    // Genera un número de cuenta corriente (prefijo CA)
    generateAccountNumber(){
        const min = 1000000000; // 10 dígitos mínimo
        const max = 9999999999; // 10 dígitos máximo
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return `CA-${randomNumber}`;
    }    

    // Procesa un retiro y registra la transacción
    processWithdraw(withdrawAmount){
        this.currentBalance = this.currentBalance - withdrawAmount
        this.registerTransaction(this.currentBalance,'Retiro',withdrawAmount)
    }

    // Procesa un depósito y registra la transacción
    processDeposit(depositAmount){
        this.currentBalance = this.currentBalance + depositAmount
        this.registerTransaction(this.currentBalance,'Consignación',depositAmount)
    }

    // Procesa una transferencia y registra ambas transacciones (envío y recepción)
    processTransfer(transferAmount,accountToTransferid,accountToTransferBalance){
        this.currentBalance = this.currentBalance - transferAmount
        this.registerTransaction(this.currentBalance,'Envio Transferencia',transferAmount)
        let transferNewBalance = accountToTransferBalance + transferAmount
        this.registerTransaction(transferNewBalance,'Recepción Transferencia',transferAmount,accountToTransferid)
    }
}

export default CurrentAccount