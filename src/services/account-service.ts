import { Account } from "../entities/account";
import { Customer } from "../entities/customer";
import { AccountRepository } from "../repositories/account-repository";

export class AccountService {
    private accountRepository: AccountRepository;

    constructor() {
        this.accountRepository = new AccountRepository();
    }

    async create(name: string, cpf: string, balance: number): Promise<Account> {
        const customer = new Customer(name, cpf);
        const account = new Account(customer, balance);
        await this.accountRepository.insert(account);
        return account;
    }

    async getAccountByCustomerId(id: number): Promise<Error | Account> {
        const account = await this.accountRepository.findAccount(id);
        if(!account) {
            return new Error('Customer not found');
        }
        return account;
    }

    async update(id: number, type: string, amount: number): Promise<Error | Account> {
        const account = await this.accountRepository.updateBalance(id, type, amount);
        if(!account) {
            return new Error('Customer not found');
        }
        return account;
    }

    async remove(id: number): Promise<Error | Account> {
        const account = await this.accountRepository.removeAccount(id);
        if(!account) {
            return new Error('Customer not found');
        }
        return account;
    }

    async getAll() {
        return this.accountRepository.findAll();
    }
}