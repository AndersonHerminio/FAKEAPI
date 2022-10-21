const pegarListaAtualizada = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem("allItens", JSON.stringify(json));
    });
};

let originalItems = [];

let dadosFilter = []

const init = async () => {
  let storageItems = localStorage.getItem("allItens");

  if (!storageItems) {
    await pegarListaAtualizada()
    storageItems = localStorage.getItem("allItens")
  
  }
  originalItems = JSON.parse(storageItems);

  renderTable(getItemsToRender());
  generatePagination(originalItems);
};

const renderTable = (dadosJSON) => {
  let print = dadosJSON.reduce((printered, dado) => {
    printered += `
      <tr>
      <td style="text-align: center;">${dado.id}</td>
      <td style="padding-left: 50px;">${dado.title}</td>
      <td><div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Ações</button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" data-toggle="modal" data-target="#exampleModal" onclick="editModal(${dado.id})">Editar</a>
        <a class="dropdown-item" data-toggle="modal" data-target="#removeModal" onclick="removeEdit(${dado.id})">Remover</a>
      </div>
    </div></td>
      </tr>`;
    return printered;
  }, "");

  document.getElementById("tabela-Api").innerHTML = print;
};

//-------- PAGINAÇÃO --------//

let currentPage = 1;   //Página Atual
const itemsPerPage = 20;   //Itens por página
let totalPages = 0;   //Variável inicializada

const generatePagination = (items) => {
  const totalItems = items.length;
  totalPages = Math.ceil(totalItems / itemsPerPage);

  let html =
    '<li class="page-item"><a class="page-link" onclick="previousPage(event)" href="#">Anterior</a></li>';

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <li class="page-item"><a class="page-link" onclick="changePage(event, ${i})" href="#">${i}</a></li>
    `;
  }

  html +=
    '<li class="page-item"><a class="page-link" onclick="nextPage(event)" href="#">Próximo</a></li>';

  document.getElementById("pagination").innerHTML = html;
};

//------- INCLUSÃO DO TÍTULO E DESCRIÇÃO NO MODAL --------//

const editModal = (id) => {
  const inputTitle = document.querySelector("#inputTitle");
  const textAreaBody = document.querySelector("#textAreaBody");

  const data = originalItems.find((element) => element.id == id);
  console.log(data);

  inputTitle.value = data.title;
  textAreaBody.value = data.body;

  // ------------ EDIÇÃO DO MODAL ------------//

  const buttonModal = document.getElementById("buttonModal");

  buttonModal.onclick = () => {
    if (!inputTitle.value && !textAreaBody.value) return Swal.fire({ icon: 'error', title: 'Oops...', text: 'Título e Descrição Inválidos' });
    
    if (!inputTitle.value) return Swal.fire({ icon: 'error', title: 'Oops...', text: 'Título Inválido!' });

    if (!textAreaBody.value) return Swal.fire({ icon: 'error', title: 'Oops...', text: 'Descrição Inválida' });


    originalItems.forEach(element => {
      
      if (element.id !== ~~id) {
        return;
      }
      
      element.title = inputTitle.value;
      element.body = textAreaBody.value;
    });

    localStorage.setItem("allItens", JSON.stringify(originalItems));

Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Seu post foi salvo com sucesso',
  showConfirmButton: false,
  timer: 1500
}).then(() => {
  renderTable(getItemsToRender());
  generatePagination(originalItems);
})
  };
};

//------------ BOTÃO ATUALIZAÇÃO -----------//
const atualizacao = document.getElementById("buttonAtualizar");

atualizacao.onclick = () => {
  localStorage.clear();
  init();
};

//---------- BOTÃO REMOÇÃO --------//

function removeEdit(id) {
  document.getElementById("buttonRemove");

  Swal.fire({
    title: "Você deseja excluir este post?",
    text: "Se realmente deseja clique nas opções abaixo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, quero excluir!",
  }).then((result) => {
    if (result.isConfirmed) {
      const filteredItems = JSON.parse(localStorage.getItem("allItens")) || originalItems;
      dadosFilter = filteredItems.filter(dados => dados.id !== id);

      localStorage.setItem("allItens", JSON.stringify(dadosFilter));

      Swal.fire("Excluído!", "Seu post foi excluído.", "success").then(() => {
        renderTable(dadosFilter);

      });
    }
  });
}

const previousPage = (event) => {
  const page = currentPage - 1;

  if (!page) {
    event.preventDefault();
    return;
  }

  changePage(event, page);
};

const nextPage = (event) => {
  const page = currentPage + 1;

  if (page > totalPages) {
    event.preventDefault();
    return;
  }

  changePage(event, page);
};

const changePage = (event, page) => {
  event.preventDefault();

  if (currentPage === page) {
    return;
  }

  currentPage = page;

  renderTable(getItemsToRender());
};

const getItemsToRender = () => {
  const offset = (currentPage - 1) * itemsPerPage;

  return originalItems.slice(offset, offset + itemsPerPage);
};


const filterTable = () => {
  const inputFiltrado = document.getElementById("select_input").value;
  const inputNormalizado =
    inputFiltrado &&
    inputFiltrado
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  if (!inputFiltrado) {
    init(originalItems);
    return;
  }

  const itemsFiltrados = getItemsToRender().filter((item) => {
    let valido = true;

    if (
      inputNormalizado &&
      !item.title.includes(inputNormalizado) &&
      !inputNormalizado.includes(item.id)
    ) {
      valido = false;
    }

    return valido;
  });

  generatePagination(itemsFiltrados);
  renderTable(itemsFiltrados);
};

init();
