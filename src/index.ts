// /* eslint-disable no-console */
// /* eslint-disable class-methods-use-this */
// /* eslint-disable max-classes-per-file */
// /* eslint-disable no-useless-constructor */

// abstract class Pokemon {
//   // Atributos
//   protected nome: string;

//   protected nivel: number;

//   protected tipo: string;

//   constructor(nome: string, nivel: number, tipo: string) {
//     console.log('Construtor pokemon chamado!');
//     this.nome = nome;
//     this.nivel = nivel;
//     this.tipo = tipo;
//   }

//   // Métodos
//   public abstract dizerOla(): void;
// }

// class Charmander extends Pokemon {
//   constructor(nivel: number) {
//     console.log('Construtor charmander chamado!');
//     super('Charmander', nivel, 'Fogo');
//   }

//   public override dizerOla() {
//     console.log('Charmanderrr!');
//   }
// }

// class Squirtle extends Pokemon {
//   constructor(nivel: number) {
//     console.log('Construtor squirtle chamado!');
//     super('Squirtle', nivel, 'Agua');
//   }

//   public override dizerOla() {
//     console.log('Squirtleee!');
//   }
// }

// class Bulbasaur extends Pokemon {
//   constructor(nivel: number) {
//     super('Bulbasaur', nivel, 'Grama');
//   }

//   public override dizerOla() {
//     console.log('bulbasaurrr!');
//   }
// }

// const charmander: Pokemon = new Charmander(20);
// const squirtle: Pokemon = new Squirtle(10);
// const bulbasaur: Pokemon = new Bulbasaur(10);

// // charmander.dizerOla();

// charmander.dizerOla();
// squirtle.dizerOla();
// bulbasaur.dizerOla();
