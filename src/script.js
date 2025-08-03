const form = document.getElementById("form");
const nomeDespesa = document.getElementById("nome");
const valorDespesa = document.getElementById("valor");
const formBtn = document.getElementById("form-btn");
const listaDespesa = document.getElementById("lista");
const valorTotalElement = document.getElementById("valor-total");
const deleteListBtn = document.getElementById("deletar-lista__btn");
const darkModeBtn = document.getElementById("switch-shadow");
const background = document.getElementById("bg-container");
const titulo = document.getElementById(".titulo");
const secoes = document.querySelectorAll(".secao");
const darkModeTitle = document.querySelector(".dark-mode__title");

let despesas = [];

const LOCAL_STORAGE_KEY = "minhasDespesas";

function reset() {
  nomeDespesa.value = "";
  valorDespesa.value = "";
}

function atualizarValorTotal() {
  const total = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
  valorTotalElement.textContent = `R$ ${total.toFixed(2)}`;
}

function salvarDespesas() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(despesas));
}

function deletarDespesas() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  despesas = [];
}

function renderizarDespesas() {
  listaDespesa.innerHTML = "";

  despesas.forEach((despesa, index) => {
    const listaItem = document.createElement("li");
    listaItem.classList.add("lista-item");

    listaItem.innerHTML = `
    <div class="lista-item">
        <div class="lista-item__container">
            <div class="lista-despesas__container">
              <span class="lista-item__bloco">${despesa.nome}</span>
              <span class="lista-item__bloco">R$ ${despesa.valor.toFixed(
                2
              )}</span>
            </div>
            <div class="icon-container">
                <button class="lista-item__icon delete-btn" data-index="${index}">Deletar</button>
            </div>
        </div>
        <hr class="linha" />
    </div>
    `;
    listaDespesa.appendChild(listaItem);
  });
  atualizarValorTotal();
  salvarDespesas();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = nomeDespesa.value.trim();

  const valorInputTratado = valorDespesa.value.trim().replace(",", ".");
  const valor = parseFloat(valorInputTratado);

  if (nome === "") {
    alert("Por favor, preencha o nome da despesa.");
    return;
  }

  if (valorInputTratado === "") {
    alert("Por favor, preencha o valor da despesa.");
    return;
  }

  if (isNaN(valor)) {
    alert(
      "O valor inserido não é um número válido. Use o formato: 10.50 ou 10,50."
    );
    return;
  }

  if (valor <= 0) {
    alert("O valor da despesa deve ser maior que zero.");
    return;
  }

  despesas.push({ nome, valor });
  renderizarDespesas();
  reset();
});

listaDespesa.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const indexToDelete = parseInt(e.target.dataset.index);

    despesas.splice(indexToDelete, 1);
    renderizarDespesas();
  }
});

deleteListBtn.addEventListener("click", () => {
  if (LOCAL_STORAGE_KEY) {
    deletarDespesas();
    listaDespesa.innerHTML = "";
    valorTotalElement.innerHTML = "";
  }
  console.log(despesas);
});

document.addEventListener("DOMContentLoaded", () => {
  const storedDespesas = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedDespesas) {
    despesas = JSON.parse(storedDespesas);
  }
  renderizarDespesas();
});

darkModeBtn.addEventListener("click", () => {
  background.classList.toggle("dark-mode");
  if (background.classList.contains("dark-mode")) {
    darkModeTitle.style = "display: block";
  } else {
    darkModeTitle.style = "display: none";
  }
});
