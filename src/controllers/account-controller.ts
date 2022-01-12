import { Request, Response } from 'express';
import { Account } from '../entities/account';
import { AccountRepository } from '../repositories/account-repository';

export class AccountController {
  private accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  createAccount(req: Request, res: Response) {
    const { name, cpf, balance } = req.body;
    const account = new Account(name, cpf, balance);
    this.accountRepository.insert(account);
    res.status(201).json({
      id_account: account.id,
      id_customer: account.customer.id,
      name: account.customer.name,
      cpf: account.customer.cpf,
      balance: account.balance,
    });
  }

  updateAccount(req: Request, res: Response) {
    const { cpf } = req.params;
    const { value, type } = req.body;
    const account = this.accountRepository.findByCpf(cpf);
    const amount = Number(value);
    if (!account) {
      return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }
    if (type === 'withdrawal' && amount > account.balance) {
      this.accountRepository.updateBalance(account, cpf, amount, type);
    }
    if (type === 'deposit' && amount > 0) {
      this.accountRepository.updateBalance(account, cpf, amount, type);
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
    const { cpf } = req.params;
    const account = this.accountRepository.findByCpf(cpf);
    if (!account) {
      return res.status(404).json({
        mensagem: 'Conta não encontrada',
      });
    }
    const deletedAccount = this.accountRepository.remove(cpf);
    return res.status(204).send({ deleted: deletedAccount });
  }

  getAll(req: Request, res: Response) {
    const accounts = this.accountRepository.findAll();
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
