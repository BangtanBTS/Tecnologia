class Aluno {
   constructor(nome, idade, curso, notaFinal) {
       this.nome = nome;
       this.idade = idade;
       this.curso = curso;
       this.notaFinal = parseFloat(notaFinal);
   }

   isAprovado() {
       return this.notaFinal >= 7;
   }

   toString = () => {
       return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}`;
   }
}

document.getElementById('formulario-aluno').addEventListener('submit', (event) => {
   event.preventDefault();

   const nome = document.getElementById('nome').value;
   const idade = document.getElementById('idade').value;
   const curso = document.getElementById('curso').value;
   const nota = document.getElementById('nota').value;

   // criando uma instância da classe Aluno
   const aluno = new Aluno(nome, idade, curso, nota);
   alunos.push(aluno);

   atualizarTabela();

   document.getElementById('formulario-aluno').reset(); // limpa o formulário

   // exibe mensagem após salvar aluno
   console.log(`Aluno ${aluno.nome} cadastrado com sucesso!`);
});

let alunos = [];

// exibir a tabela de alunos
const atualizarTabela = () => {
   const tabela = document.getElementById('tabela-aluno').getElementsByTagName('tbody')[0];
   tabela.innerHTML = ""; 

   alunos.forEach((aluno, index) => {
       const row = tabela.insertRow();
       row.innerHTML = `
           <td>${aluno.nome}</td>
           <td>${aluno.idade}</td>
           <td>${aluno.curso}</td>
           <td>${aluno.notaFinal}</td>
           <td>
               <button class="editar-btn" data-index="${index}">Editar</button>
               <button class="excluir-btn" data-index="${index}">Excluir</button>
           </td>
       `;
   });

   adicionarEventosBotao();
}

function adicionarEventosBotao() {
   // editar
   document.querySelectorAll(".editar-btn").forEach(btn => 
      btn.addEventListener("click", (event) => editarAluno(event.target.dataset.index))
   );
   //excluir
   document.querySelectorAll(".excluir-btn").forEach(btn => 
      btn.addEventListener("click", (event) => excluirAluno(event.target.dataset.index))
   );
}

// função para editar um aluno
function editarAluno(index) {
   const aluno = alunos[index];

   // preenche os campos do formulário com os dados do aluno
   document.getElementById('nome').value = aluno.nome;
   document.getElementById('idade').value = aluno.idade;
   document.getElementById('curso').value = aluno.curso;
   document.getElementById('nota').value = aluno.notaFinal;

   // remove o aluno da lista para poder editar
   alunos.splice(index, 1);
   atualizarTabela();

   // mensagem após editar
   alert(`Aluno ${aluno.nome} editado com sucesso!`);
}

// função para excluir um aluno
function excluirAluno(index) {
   const aluno = alunos[index];

   alunos.splice(index, 1);
   atualizarTabela();

   // mensagem após excluir
   alert(`Aluno ${aluno.nome} excluído com sucesso!`);
}

// Relatórios
const relatorioDiv = document.getElementById("relatorio");

// listar alunos aprovados
document.getElementById("btn-aprovados").addEventListener("click", () => {
   const aprovados = alunos.filter(aluno => aluno.isAprovado());
   exibirRelatorio("Alunos Aprovados", aprovados.map(aluno => aluno.nome).join("<br>"));
});

// calcular a média das notas
document.getElementById("btn-media-notas").addEventListener("click", () => {
   if (alunos.length === 0) return alert("Nenhum aluno cadastrado.");
   
   const mediaNotas = alunos.reduce((soma, aluno) => soma + aluno.notaFinal, 0) / alunos.length;
   exibirRelatorio("Média das Notas", `A média das notas é: ${mediaNotas.toFixed(2)}`);
});

// calcular a média das idades
document.getElementById("btn-media-idades").addEventListener("click", () => {
   if (alunos.length === 0) return alert("Nenhum aluno cadastrado.");

   const mediaIdades = alunos.reduce((soma, aluno) => soma + parseInt(aluno.idade), 0) / alunos.length;
   exibirRelatorio("Média das Idades", `A média das idades é: ${mediaIdades.toFixed(2)} anos`);
});

// listar os nomes dos alunos em ordem alfabética
document.getElementById("btn-ordem-alfabetica").addEventListener("click", () => {
   const nomesOrdenados = alunos.map(aluno => aluno.nome).sort();
   exibirRelatorio("Alunos em Ordem Alfabética", nomesOrdenados.join("<br>"));
});

// qtd de alunos por curso
document.getElementById("btn-contagem-curso").addEventListener("click", () => {
   let contagemCursos = {};

   alunos.forEach(aluno => {
       contagemCursos[aluno.curso] = (contagemCursos[aluno.curso] || 0) + 1;
   });

   let resultado = Object.entries(contagemCursos)
       .map(([curso, quantidade]) => `${curso}: ${quantidade} aluno(s)`)
       .join("<br>");

   exibirRelatorio("Quantidade de Alunos por Curso", resultado);
});

// exibir relatório
const exibirRelatorio = (titulo, conteudo) => {
   relatorioDiv.innerHTML = `<h2>${titulo}</h2><p>${conteudo}</p>`;
};