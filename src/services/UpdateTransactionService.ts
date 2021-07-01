import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  id_transaction: string;
  client: string;
  reason: string;
  value: number;
  date: Date;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ id_transaction, client, reason, value, date }: RequestDTO): Transaction {

    const transaction = this.transactionsRepository.findById(id_transaction);

    if (!transaction) {
      throw new Error('Transaction not found!');
    }

    transaction.client = client;
    transaction.reason = reason;
    transaction.value = value;
    transaction.date = date;

    return this.transactionsRepository.update(transaction);
  }
}

export default CreateTransactionService;
