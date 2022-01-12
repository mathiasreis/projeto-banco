export class Customer {
  public id: string;

  public name: string;

  public cpf: string;

  constructor(name: string, cpf: string) {
    this.id = Math.floor(Math.random() * 10).toString();
    this.name = name;
    this.cpf = cpf;
  }
}
