import { Filme } from "../model/filme.js";

class FilmeController {
  constructor() {
    this.listaFilmes = JSON.parse(localStorage.getItem("filmes") || "[]");
    this.idEmEdicao = null;
    this.imagemBase64 = null;

    this.init();
  }

  init() {
    document.getElementById("btnSalvarFilme")?.addEventListener("click", () => this.salvar());
    document.getElementById("imagem")?.addEventListener("change", (e) => this.lerImagem(e));
    this.atualizarTabela();
  }

  lerImagem(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagemBase64 = reader.result;
    };
    reader.readAsDataURL(file);
  }

  salvar() {
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const genero = document.getElementById("genero").value;
    const classificacao = document.getElementById("classificacao").value;
    const duracao = parseInt(document.getElementById("duracao").value);
    const dataEstreia = document.getElementById("dataEstreia").value;

    if (!titulo || !descricao || !genero || !classificacao || !duracao || !dataEstreia) {
      alert("Preencha todos os campos!");
      return;
    }

    const filme = new Filme(
      this.idEmEdicao || Date.now(),
      titulo,
      descricao,
      genero,
      classificacao,
      duracao,
      dataEstreia,
      this.imagemBase64
    );

    if (this.idEmEdicao) {
      const index = this.listaFilmes.findIndex(f => f.id === this.idEmEdicao);
      this.listaFilmes[index] = filme;
      this.idEmEdicao = null;
    } else {
      this.listaFilmes.push(filme);
    }

    localStorage.setItem("filmes", JSON.stringify(this.listaFilmes));
    document.getElementById("formFilme").reset();
    this.imagemBase64 = null;
    this.atualizarTabela();
  }

  atualizarTabela() {
    const tbody = document.querySelector("tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    this.listaFilmes.forEach(filme => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${filme.imagem}" width="50"></td>
        <td>${filme.titulo}</td>
        <td>${filme.genero}</td>
        <td>${filme.classificacao}</td>
        <td>${filme.duracao} min</td>
        <td>${new Date(filme.dataEstreia).toLocaleDateString("pt-BR")}</td>
        <td>
          <button class="btn btn-warning btn-sm btn-editar" data-id="${filme.id}">Editar</button>
          <button class="btn btn-danger btn-sm btn-excluir" data-id="${filme.id}">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);

      tr.querySelector(".btn-editar").addEventListener("click", () => this.abrirEdicao(filme));
      tr.querySelector(".btn-excluir").addEventListener("click", () => this.excluir(filme.id));
    });
  }

  abrirEdicao(filme) {
    this.idEmEdicao = filme.id;
    this.imagemBase64 = filme.imagem;

    document.getElementById("titulo").value = filme.titulo;
    document.getElementById("descricao").value = filme.descricao;
    document.getElementById("genero").value = filme.genero;
    document.getElementById("classificacao").value = filme.classificacao;
    document.getElementById("duracao").value = filme.duracao;
    document.getElementById("dataEstreia").value = filme.dataEstreia;

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  excluir(id) {
    if (!confirm("Deseja realmente excluir este filme?")) return;

    this.listaFilmes = this.listaFilmes.filter(f => f.id !== id);
    localStorage.setItem("filmes", JSON.stringify(this.listaFilmes));
    this.atualizarTabela();
  }
}

document.addEventListener("DOMContentLoaded", () => new FilmeController());
