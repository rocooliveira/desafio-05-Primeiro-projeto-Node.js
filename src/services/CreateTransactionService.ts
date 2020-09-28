import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute( { title, value, type }: Request ): Transaction {

    if(!title)
      throw new Error("The transaction title has not been set");
    
    if(!value)
      throw new Error("The transaction value has not been set");
    
    if( ! ['income', 'outcome'].includes(type) )
      throw new Error("The transaction must have a type defined as income or outcome");

    
    const {total} = this.transactionsRepository.getBalance();

    if(type == 'outcome' && value > total ){
      throw new Error("You don't have enough balance"); 
    }


    const transaction = this.transactionsRepository.create({title, value, type});

    return transaction;

  }
}

export default CreateTransactionService;
