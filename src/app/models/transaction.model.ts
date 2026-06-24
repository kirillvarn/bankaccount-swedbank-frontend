interface TransactionModel {
    id: string,
    currency: string,
    transactionType: string,
    amount: number,
    accountId: string
    balanceBefore: number,
    balanceAfter: number,
    createdAt: Date
}