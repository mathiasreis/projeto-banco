export class Customer {
  public id: number;

  public name: string;

  public cpf: string;

  constructor(name: string, cpf: string, id?: number) {
    this.id = id ?? Math.floor(Math.random() * 100);
    this.name = name;
    this.cpf = cpf;
  }
}
