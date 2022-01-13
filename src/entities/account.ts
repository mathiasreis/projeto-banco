import { Customer } from './customer';

export class Account {
  public id: number;

  public customer: Customer;

  public balance: number;

  constructor(customer: Customer, balance: number, id?: number) {
    this.id = id ?? Math.floor(Math.random() * 1000);
    this.customer = customer;
    this.balance = balance;
  }

  setDeposity(value: number) {
    this.balance += value;
  }

  setWithdrawal(value: number) {
    this.balance -= value;
    // let amount = value;
    // const bills = [
    //   { '100': 0 },
    //   { '50': 0 },
    //   { '20': 0 },
    //   { '10': 0 },
    //   { '5': 0 },
    //   { '2': 0 },
    // ];
    // if (amount % 2 !== 0) {
    //   amount -= 5;
    //   bills[4] = { '5': 1 };
    // }
    // if (amount % 2 === 0) {
    //   // eslint-disable-next-line no-plusplus
    //   for (let i = 0; i < bills.length; i++) {
    //     let cedulas = amount / parseInt(bills[i][100])
    //   }

    // }
  }
}
