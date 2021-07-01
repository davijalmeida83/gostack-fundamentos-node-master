import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  client: string;
  reason: string;
  value: number;
  date: Date;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public findById(id_transaction: string): Transaction | undefined {
    const findTransaction = this.transactions.find(
      transaction => transaction.id === id_transaction,
    );
    return findTransaction;
  }

  public create({
    client,
    reason,
    value,
    date,
  }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ client, reason, value, date });
    this.transactions.push(transaction);
    return transaction;
  }

  public update(transaction: Transaction): Transaction {
    const findIndex = this.transactions.findIndex(
      findTransaction => findTransaction.id === transaction.id,
    );
    this.transactions[findIndex] = transaction;

    return transaction;
  }

  public delete(id: string): Transaction[] {
    const findIndex = this.transactions.findIndex(
      findTransaction => findTransaction.id === id,
    );

    if (findIndex !== -1) this.transactions.splice(findIndex, 1);

    return this.transactions;
  }
}

export default TransactionsRepository;
