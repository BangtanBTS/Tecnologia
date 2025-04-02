class Funcionario {
   constructor(nome, idade, cargo, salario) {
       this.nome = nome;
       this.idade = idade;
       this.cargo = cargo;
       this.salario = salario;
   }

   getNome() {
       return this.nome;
   }

   setNome(nome) {
       this.nome = nome;
   }

   getIdade() {
       return this.idade;
   }

   setIdade(idade) {
       this.idade = idade;
   }

   getCargo() {
       return this.cargo;
   }

   setCargo(cargo) {
       this.cargo = cargo;
   }

   getSalario() {
       return this.salario;
   }

   setSalario(salario) {
       this.salario = salario;
   }

   toString() {
       return `${this.nome} - ${this.idade} anos - ${this.cargo} - R$ ${this.salario}`;
   }
}

const funcionarios = [];

document.getElementById('formulario-funcionario').addEventListener('submit', function(event) {
   event.preventDefault();

   const nome = document.getElementById('nome').value;
   const idade = document.getElementById('idade').value;
   const cargo = document.getElementById('cargo').value;
   const salario = document.getElementById('salario').value;

   const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
   funcionarios.push(novoFuncionario);

   exibirFuncionarios();
   document.getElementById('formulario-funcionario').reset();
});

function exibirFuncionarios() {
   const tabela = document.getElementById('tabela-funcionario').getElementsByTagName('tbody')[0];
   tabela.innerHTML = '';

   funcionarios.forEach(funcionario => {
       const row = tabela.insertRow();

       row.insertCell(0).textContent = funcionario.getNome();
       row.insertCell(1).textContent = funcionario.getIdade();
       row.insertCell(2).textContent = funcionario.getCargo();
       row.insertCell(3).textContent = funcionario.getSalario();
   });
}
