import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
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

  public execute({ client, reason, value, date }: RequestDTO): Transaction {

    const transaction = this.transactionsRepository.create({
      client,
      reason,
      value,
      date,
    });
    return transaction;
  }
}

export default CreateTransactionService;
