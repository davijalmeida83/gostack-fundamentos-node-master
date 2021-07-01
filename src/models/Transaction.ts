import { uuid } from 'uuidv4';

class Transaction {
  id: string;
  client: string;
  reason: string;
  value: number;
  date: Date;

  constructor({ client, reason, value, date }: Omit<Transaction, 'id'>) {
    this.id = uuid();

    this.client = client;
    this.reason = reason;
    this.value = value;
    this.date = date;
  }
}

export default Transaction;
