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

// usando uma função anônima no evento submit
document.getElementById('formulario-funcionario').addEventListener('submit', (event) => {
   event.preventDefault(); // eh chamada quando clica no botão cadastrar

   const nome = document.getElementById('nome').value;
   const idade = document.getElementById('idade').value;
   const cargo = document.getElementById('cargo').value;
   const salario = document.getElementById('salario').value;

   // atualiza/adiciona um novo funcionário
   if (acoes) {
      acoes.setNome(nome);
      acoes.setIdade(idade);
      acoes.setCargo(cargo);
      acoes.setSalario(salario);
      acoes = null; // limpa a área de edição após atualizar
   } else {
      const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
      funcionarios.push(novoFuncionario);
   }

   atualizaTabela(); 
   document.getElementById('formulario-funcionario').reset(); // limpa o formulário
});

// usando uma expressão lambda para atualizar a tabela
const atualizaTabela = () => {
   const tabela = document.getElementById('tabela-funcionario').getElementsByTagName('tbody')[0];
   tabela.innerHTML = '';

   funcionarios.forEach((funcionario, index) => {
       const row = tabela.insertRow();

       row.insertCell(0).textContent = funcionario.getNome();
       row.insertCell(1).textContent = funcionario.getIdade();
       row.insertCell(2).textContent = funcionario.getCargo();
       row.insertCell(3).textContent = funcionario.getSalario();

       // coluna de ações com funções anônimas e arrow functions
       const acoesCell = row.insertCell(4);
       
       const btnEditar = document.createElement('button');
       btnEditar.textContent = 'Editar';
       btnEditar.onclick = () => carregarFormularioEdicao(index); // função anônima
       acoesCell.appendChild(btnEditar);

       const btnExcluir = document.createElement('button');
       btnExcluir.textContent = 'Excluir';
       btnExcluir.onclick = () => excluirFuncionario(index); // função anônima
       acoesCell.appendChild(btnExcluir);
   });
}

// carregar os dados do funcionário no formulário para edição
const carregarFormularioEdicao = (index) => {
   const funcionario = funcionarios[index];
   document.getElementById('nome').value = funcionario.getNome();
   document.getElementById('idade').value = funcionario.getIdade();
   document.getElementById('cargo').value = funcionario.getCargo();
   document.getElementById('salario').value = funcionario.getSalario();
   acoes = funcionario; // marca o funcionário que está sendo editado
}

// excluir um funcionário da lista
const excluirFuncionario = (index) => {
   funcionarios.splice(index, 1); // remove o funcionário da lista
   atualizaTabela(); 
}

const relatorioDiv = document.getElementById("relatorio");

//listar todos os funcionários com salário maior que R$ 5000
document.getElementById("btn_salarioMaiorQue5000").addEventListener("click", () => {
   const salarioMaiorQue5000 = funcionarios.filter(funcionarios => funcionarios.getSalario() > 5000);
   exibirRelatorio("Funcionarios com salário maior que 5000:", salarioMaiorQue5000.map(funcionarios => funcionarios.nome).join("<br>"))
})

//mostrar a média salarial dos funcionários
document.getElementById("btn_mediaSalarial").addEventListener("click", () => {
   const mediaSalarial = funcionarios.reduce((soma, funcionario) => soma + parseInt(funcionario.salario), 0) / funcionarios.length;
   exibirRelatorio("Media Salarial:", `A média salarial é: R$ ${mediaSalarial.toFixed(2)}`)
})

//listar apenas os cargos únicos (sem repetição)
document.getElementById("btn_cargosUnicos").addEventListener("click", () => {
   const cargosUnicos = [...new Set(funcionarios.map(funcionario => funcionario.getCargo()))];
   exibirRelatorio("Cargos Únicos:", cargosUnicos.join("<br>"))
})

//criar uma lista de nomes em maiúsculo
document.getElementById("btn_nomesMaiusculo").addEventListener("click", () => {
   const nomesMaiusculo = funcionarios.map(funcionario => funcionario.getNome().toUpperCase());
   exibirRelatorio("Nomes em maiúsculo:", nomesMaiusculo.join("<br>"))
})

// Exibir relatório
const exibirRelatorio = (titulo, conteudo) => {
   relatorioDiv.innerHTML = `<h2>${titulo}</h2><p>${conteudo}</p>`;
};