import { Request, Response } from 'express';
import { AccountRepository } from '../repositories/account-repository';
import { AccountService } from '../services/account-service';

export class AccountController {
  private accountRepository: AccountRepository;
  private accountService: AccountService;

  constructor() {
    this.accountRepository = new AccountRepository();
    this.accountService = new AccountService();
  }

  async createAccount(req: Request, res: Response) {
    const { name, cpf, balance } = req.body;
    // const customer = new Customer(name, cpf);
    // const account = new Account(customer, balance);
    // this.accountRepository.insert(account);
    const account = await this.accountService.create(name, cpf, balance);
    res.status(201).json({
      id_account: account.id,
      id_customer: account.customer.id,
      name: account.customer.name,
      cpf: account.customer.cpf,
      balance: account.balance,
    });
  }

  async getAccount(req: Request, res: Response) {
    const { id } = req.params;
    const account = await this.accountService.getAccountByCustomerId(Number(id));
    if(account instanceof Error) {
      return res.status(404).json({ message: account.message });
    }
    return res.status(200).json(account);
  }

  async updateAccount(req: Request, res: Response) {
    const { id } = req.params;
    const { value, type } = req.body;
    const amount = Number(value);
    const account = await this.accountService.update(Number(id), type, amount);
    if(account instanceof Error) {
      return res.status(404).json({ message: account.message });
    }
    return res.status(200).json({
      id_account: account.id,
      id_customer: account.customer.id,
      name: account.customer.name,
      cpf: account.customer.cpf,
      balance: account.balance,
    });
  }

  deleteAccount(req: Request, res: Response) {
    const { id } = req.params;
    const account = this.accountService.remove(Number(id));
    if(account instanceof Error) {
      return res.status(404).json({ message: account.message });
    }
    // const deletedAccount = this.accountRepository.remove(cpf);
    return res.status(204).send({ deleted: account });
  }

  async getAll(req: Request, res: Response) {
    const accounts = await this.accountService.getAll();
    return res.status(200).json(accounts);
  }

  // deposity(req: Request, res: Response) {
  //   const { cpf } = req.params;
  //   const { value } = req.body;
  //   const account = this.accountRepository.findByCpf(cpf);
  //   const amount = Number(value);
  //   if (!account) {
  //     return res.status(404).json({ mensagem: 'Conta não encontrada' });
  //   }
  //   if (amount > 0) {
  //     account.setDeposity(amount);
  //     return res.status(200).json({
  //       id_account: account.id,
  //       id_customer: account.customer.id,
  //       name: account.customer.name,
  //       cpf: account.customer.cpf,
  //       balance: account.balance,
  //     });
  //   }
  //   return res
  //     .status(404)
  //     .json({ mensagem: 'Deposite um valor superior a zero' });
  // }

  // withdrawal(req: Request, res: Response) {
  //   const { cpf } = req.params;
  //   const { value } = req.body;
  //   const account = this.accountRepository.findByCpf(cpf);
  //   const amount = Number(value);
  //   if (!account) {
  //     return res.status(404).json({ mensagem: 'Conta não encontrada' });
  //   }
  //   if (amount > account.balance) {
  //     account.setWithdrawal(amount);
  //     return res.status(200).json({
  //       id_account: account.id,
  //       id_customer: account.customer.id,
  //       name: account.customer.name,
  //       cpf: account.customer.cpf,
  //       balance: account.balance,
  //     });
  //   }
  //   return res
  //     .status(404)
  //     .json({ mensagem: 'Deposite um valor superior a zero' });
  // }

  // getPokemonByName(req: Request, res: Response) {
  //   const { nome } = req.params;
  //   const pokemon = this.pokemonRepository.findByName(nome);
  //   if (!pokemon) {
  //     return res.status(404).json({
  //       mensagem: 'Pokemon não encontrado',
  //     });
  //   }
  //   return res.status(200).json({
  //     id: pokemon.id,
  //     nome: pokemon.nome,
  //     nivel: pokemon.nivel,
  //     tipo: pokemon.tipo,
  //   });
  // }
}
