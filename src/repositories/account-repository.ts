import { Account } from '../entities/account';

export class AccountRepository {
  private accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  insert(account: Account) {
    this.accounts.push(account);
  }

  findByCpf(cpf: string): Account | undefined {
    return this.accounts.find((p) => p.customer.cpf === cpf);
  }

  updateBalance(account: Account, cpf: string, amount: number, type: string) {
    // const account = this.findByCpf(cpf) as Account;
    this.accounts = this.accounts.filter((p) => p.customer.cpf !== cpf);
    if (type === 'deposit') {
      account.setDeposity(amount);
    }
    if (type === 'withdrawal') {
      account.setWithdrawal(amount);
    }
    this.accounts.push(account);
  }

  remove(cpf: string) {
    const index = this.accounts.findIndex((p) => p.customer.cpf === cpf);
    return this.accounts.splice(index, 1);
  }

  findAll() {
    return this.accounts;
  }
}
