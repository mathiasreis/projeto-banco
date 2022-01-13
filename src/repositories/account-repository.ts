import { PrismaClient } from '@prisma/client';
import { Account } from '../entities/account';
import { Customer } from '../entities/customer';

export class AccountRepository {
  private prisma;
  // private accounts: Account[];
  

  constructor() {
    this.prisma = new PrismaClient();
    // this.accounts = [];
  }

  async insert(account: Account): Promise<void> {
    await this.prisma.customer.create({
      data: {
        id: account.customer.id,
        name: account.customer.name,
        cpf: account.customer.cpf,
        Account: {
          create: {
            id: account.id,
            balance: account.balance
          }
        }
      }
    })
    // this.accounts.push(account);
  }

  // async findCustomer(cpf: string): Promise<Customer | undefined> {
  //   // return this.accounts.find((p) => p.customer.cpf === cpf);
  //   const result = await this.prisma.customer.findFirst({
  //     where: {
  //       cpf,
  //     }
  //   });
  //   if(!result) {
  //     return undefined;
  //   }
  //   return new Customer(result.name, result.cpf);
  // }

  async findAccount(id: number): Promise<Account | undefined> {
    const resultAcc = await this.prisma.account.findFirst({
      where: {
        "customerId": id,
      }
    });
    if(!resultAcc) {
      return undefined;
    }
    
    const resultCust = await this.prisma.customer.findFirst({
      where: {
        id: resultAcc.customerId,
      }
    });
    if(!resultCust) {
      return undefined;
    }
    
    const customer = new Customer(resultCust.name, resultCust.cpf, resultCust.id);
    return new Account(customer, resultAcc.balance, resultAcc.id);
  }

  async updateBalance(id: number, type: string, amount: number): Promise<Account | undefined> {
    const result = await this.findAccount(id);
    if(!result) {
      return undefined;
    }

    if (type === 'withdrawal' && amount < result.balance) {
      const newBalance = (result.balance) - amount;
      await this.prisma.account.update({
        data: {
          balance: newBalance,
        },
        where: {
          id: result.id,
        },
      });
      return new Account(result.customer, newBalance, result.id);
    }
    if (type === 'deposit' && amount > 0) {
      const newBalance = (result.balance) + amount;
      await this.prisma.account.update({
        data: {
          balance: newBalance,
        },
        where: {
          id: result.id,
        },
      });
      return new Account(result.customer, newBalance, result.id);
    }

  }

  async removeAccount(id: number): Promise<Account | undefined> {
    const result = await this.findAccount(id);
    if(!result) {
      return undefined;
    }
    await this.prisma.account.delete({
      where: {
        id: result.id,
      }
    });
    return new Account(result.customer, result.balance, result.id); 
  }

  async findAll() {
    return this.prisma.account.findMany();
    
  }
}
