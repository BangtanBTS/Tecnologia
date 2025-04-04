document.getElementById('formulario-aluno').addEventListener('submit', function(event) {
   event.preventDefault(); 

   const nome = document.getElementById('nome').value;
   const idade = document.getElementById('idade').value;
   const curso = document.getElementById('curso').value;
   const nota = parseFloat(document.getElementById('nota').value);

   const aluno = { nome, idade, curso, nota };

   alunos.push(aluno);

   atualizarTabela();

   document.getElementById('formulario-aluno').reset(); // limpa o formulário
});

let alunos = [];

// exibir a tabela de alunos
function atualizarTabela() {
   const tabela = document.getElementById('tabela-aluno').getElementsByTagName('tbody')[0];
   tabela.innerHTML = ''; // limpa a tabela antes de adicionar os novos dados

   alunos.forEach((aluno, index) => {
       const row = tabela.insertRow();
       row.innerHTML = `
           <td>${aluno.nome}</td>
           <td>${aluno.idade}</td>
           <td>${aluno.curso}</td>
           <td>${aluno.nota}</td>
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
   const botaoEditar = document.querySelectorAll('.editar-btn');
   botaoEditar.forEach(botao => {
       botao.addEventListener('click', function() {
           const index = botao.getAttribute('data-index');
           editarAluno(index);
       });
   });

   // excluir
   const botaoExcluir = document.querySelectorAll('.excluir-btn');
   botaoExcluir.forEach(botao => {
       botao.addEventListener('click', function() {
           const index = botao.getAttribute('data-index');
           excluirAluno(index);
       });
   });
}

// função editar um aluno
function editarAluno(index) {
   const aluno = alunos[index];

   // preenche os campos do formulário com os dados do aluno
   document.getElementById('nome').value = aluno.nome;
   document.getElementById('idade').value = aluno.idade;
   document.getElementById('curso').value = aluno.curso;
   document.getElementById('nota').value = aluno.nota;

   // remove o aluno da lista para poder editar
   alunos.splice(index, 1);
   atualizarTabela();
}

// função excluir um aluno
function excluirAluno(index) {
   alunos.splice(index, 1);
   atualizarTabela();
}
