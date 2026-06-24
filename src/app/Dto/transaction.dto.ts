interface TranssactionDto extends Dto {
    currency: string;
    transactionType: string;
    amount: number;
    balanceBefore: number;
    balanceAfter: number;
}