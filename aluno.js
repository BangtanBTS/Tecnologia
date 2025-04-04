document.getElementById('formulario-aluno').addEventListener('submit', function(event) {
   event.preventDefault(); 

   const nome = document.getElementById('nome').value;
   const idade = document.getElementById('idade').value;
   const curso = document.getElementById('curso').value;
   const nota = document.getElementById('nota').value;

   const aluno = { nome, idade, curso, nota };

   alunos.push(aluno);

   atualizarTabela();

   document.getElementById('formulario-aluno').reset(); //limpa o formulario
});

let alunos = [];

// Função para exibir a tabela de alunos
function atualizarTabela() {
   const tabela = document.getElementById('tabela-aluno').getElementsByTagName('tbody')[0];
   tabela.innerHTML = ''; 

   alunos.forEach((aluno, index) => {
       const row = tabela.insertRow();
       row.innerHTML = `
           <td>${aluno.nome}</td>
           <td>${aluno.idade}</td>
           <td>${aluno.curso}</td>
           <td>${aluno.nota}</td>
           <td>
               <button onclick="editarAluno(${index})">Editar</button>
               <button onclick="excluirAluno(${index})">Excluir</button>
           </td>
       `;
   });
}

// Função para editar um aluno
function editarAluno(index) {
   const aluno = alunos[index];

   // Preenche os campos do formulário com os dados do aluno
   document.getElementById('nome').value = aluno.nome;
   document.getElementById('idade').value = aluno.idade;
   document.getElementById('curso').value = aluno.curso;
   document.getElementById('nota').value = aluno.nota;

   // Remove o aluno da lista para poder editar
   alunos.splice(index, 1);
   atualizarTabela();
}

// Função para excluir um aluno
function excluirAluno(index) {
   alunos.splice(index, 1);
   atualizarTabela();
}
