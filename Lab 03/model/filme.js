export class Filme {
   constructor(id, titulo, descricao, genero, classificacao, duracao, dataEstreia, imagem) {
     this.id = id;
     this.titulo = titulo;
     this.descricao = descricao;
     this.genero = genero;
     this.classificacao = classificacao;
     this.duracao = duracao;
     this.dataEstreia = dataEstreia;
     this.imagem = imagem; // base64
   }
 }
 