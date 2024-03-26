// Dados simulados de benefícios
const beneficios = [
  {    nome: "Benefício b",    data_nascimento: "1990-01-01",    outro_campo: "Valor 1",  },
  {    nome: "Benefício a",    data_nascimento: "1985-05-10",    outro_campo: "Valor 2",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício c",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
  {    nome: "Benefício d",    data_nascimento: "1992-08-15",    outro_campo: "Valor 3",  },
];

let itemsPerPage = 10; // Quantidade de itens por página
let currentPage = 1; // Página atual inicial

//Elementos
const tableColumnSelect = document.getElementById("tableColumnSelect");
const tableValueSelect = document.getElementById("tableValueSelect");
const table = document.getElementById("beneficiosTable");
const pageCurrent = document.getElementById("pageCurrent");
const pagination = document.getElementById("pagination");
const itemsPerPageElement = document.getElementById("itemsPerPage");

function renderTable(data) {
  table.innerHTML = ""; // Limpa a tabela

  // Cria a linha de cabeçalho
  const headerRow = document.createElement("tr");
  Object.keys(data[0]).forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitaliza o texto
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Cria as linhas de dados
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const rowData = data[i];
    const row = document.createElement("tr");
    Object.values(rowData).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(td);
    });
    table.appendChild(row);
  }

  // Atualiza a paginação
  renderPagination(data.length);
}

//Selecão de itens por página
function selectItemsPerPage() {
  console.log("select_itemsPerPage");
  console.log("itemsPerPage ANTES:" + itemsPerPage);

  itemsPerPage = itemsPerPageElement.value;

  console.log("itemsPerPage DEPOIS:" + itemsPerPage);
  currentPage = "1";
  renderTable(beneficios);
}

// Função para renderizar a paginação
function renderPagination(totalItems) {
  pagination.innerHTML = "";
  pageCurrent.textContent = "Página Atual: " + currentPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage); //arredonda para cima
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i + " ";
    if (i === currentPage) {
      pageLink.classList.add("active");
    }
    pageLink.addEventListener("click", () => {
      currentPage = i;
      pageCurrent.textContent = "Página Atual: " + currentPage;
      renderTable(beneficios);
    });
    pagination.appendChild(pageLink);
  }
}

function populateColumnSelect() {
  const columns = Object.keys(beneficios[0]);
  columns.forEach((column) => {
    const option = document.createElement("option");
    option.value = column;
    option.textContent = column.charAt(0).toUpperCase() + column.slice(1); // Capitaliza o texto
    tableColumnSelect.appendChild(option);
  });

  fillTableValueSelect();
}

// Função para preencher o tableValueSelect com valores únicos da coluna selecionada
function fillTableValueSelect() {
  tableValueSelect.innerHTML = '<option value="">Selecione...</option>';
  const column = tableColumnSelect.value;
  const values = [...new Set(beneficios.map((beneficio) => beneficio[column]))];
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    tableValueSelect.appendChild(option);
  });

  console.log("column: " + column);

  if (column === "") {
    tableValueSelect.innerHTML = '<option value="">Selecione...</option>';
    tableValueSelect.disabled = true;
  } else {
    tableValueSelect.disabled = false;
  }
}

// Função para pesquisar benefícios com base no picklist
function searchByValue() {
  const column = tableColumnSelect.value;
  const selectedValue = tableValueSelect.value;
  if (!selectedValue) {
    //exibe todos os benefícios
    beneficiosFiltered = [...beneficios];
  } else {
    // Filtra os benefícios com base no valor selecionado
    beneficiosFiltered = beneficios.filter((beneficio) => {
      return beneficio[column] === selectedValue;
    });
  }
  currentPage = "1";
  renderTable(beneficiosFiltered);
}

tableColumnSelect.addEventListener("change", fillTableValueSelect);

populateColumnSelect();
renderTable(beneficios);
