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
let acoes = null; // edição do funcionario

document.getElementById('formulario-funcionario').addEventListener('submit', (event) => {
   event.preventDefault(); // eh chamada quando clica no botão cadastrar

   const nome = document.getElementById('nome').value;
   const idade = document.getElementById('idade').value;
   const cargo = document.getElementById('cargo').value;
   const salario = document.getElementById('salario').value;

   if (acoes) {
      acoes.setNome(nome);
      acoes.setIdade(idade);
      acoes.setCargo(cargo);
      acoes.setSalario(salario);

      // Limpa a area depois de atualizar
      acoes = null;
   } else {
      // Cria um novo funcionário na tabela
      const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
      funcionarios.push(novoFuncionario);
   }

   atualizaTabela(); 
   document.getElementById('formulario-funcionario').reset(); // Limpa o formulário
});

function atualizaTabela() {
   const tabela = document.getElementById('tabela-funcionario').getElementsByTagName('tbody')[0];
   tabela.innerHTML = '';

   funcionarios.forEach((funcionario, index) => {
       const row = tabela.insertRow();

       row.insertCell(0).textContent = funcionario.getNome();
       row.insertCell(1).textContent = funcionario.getIdade();
       row.insertCell(2).textContent = funcionario.getCargo();
       row.insertCell(3).textContent = funcionario.getSalario();

       // Coluna de Ações
       const acoesCell = row.insertCell(4);
       const btnEditar = document.createElement('button');
       btnEditar.textContent = 'Editar';
       btnEditar.onclick = function() {
           carregarFormularioEdicao(index);
       };
       acoesCell.appendChild(btnEditar);
       const btnExcluir = document.createElement('button');
       btnExcluir.textContent = 'Excluir';
       btnExcluir.onclick = function() {
           excluirFuncionario(index);
       };
       acoesCell.appendChild(btnExcluir);
   });
}

function carregarFormularioEdicao(index) { 
   const funcionario = funcionarios[index];
   document.getElementById('nome').value = funcionario.getNome();
   document.getElementById('idade').value = funcionario.getIdade();
   document.getElementById('cargo').value = funcionario.getCargo();
   document.getElementById('salario').value = funcionario.getSalario();
   acoes = funcionario; // Marca o funcionário q estar sendo editado
}

function excluirFuncionario(index) {
   funcionarios.splice(index, 1); // Remove o funcionário do array
   atualizaTabela(); 
}
