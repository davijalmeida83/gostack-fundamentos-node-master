import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateTransactionService from '../services/CreateTransactionService';
import UpdateTransactionService from '../services/UpdateTransactionService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    return response.json({
      transactions,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.get('/:id', (request, response) => {

  const id = request.params.id;

  try {
    const transactions = transactionsRepository.findById(id);
    return response.json({
      transactions,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const {client, reason, value, date } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({
      client,
      reason,
      value,
      date,
    });
    return response.json(transaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.put('/:id', (request, response) => {
  try {
    const {client, reason, value, date } = request.body;
    const id_transaction = request.params.id;

    const updateTransaction = new UpdateTransactionService(
      transactionsRepository,
    );

    const transaction = updateTransaction.execute({
      id_transaction,
      client,
      reason,
      value,
      date,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.delete('/:id', (request, response) => {
  try {
    const id = request.params.id;

    const transactions = transactionsRepository.delete(id);

    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
