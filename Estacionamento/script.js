 // Definir vagas fixas (exemplo: 1 a 20)
const TOTAL_VAGAS = 20;

// Função para salvar reserva
function salvarReserva(event) {
  event.preventDefault();

  const reserva = {
    placa: document.getElementById("placa").value,
    proprietario: document.getElementById("proprietario").value,
    apartamento: document.getElementById("apartamento").value,
    bloco: document.getElementById("bloco").value,
    modelo: document.getElementById("modelo").value,
    cor: document.getElementById("cor").value,
    vaga: parseInt(document.getElementById("vaga").value)
  };

  // Validação da vaga
  if (reserva.vaga < 1 || reserva.vaga > TOTAL_VAGAS) {
    alert("Número da vaga inválido!");
    return;
  }

  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  if (reservas.find(r => r.vaga === reserva.vaga)) {
    alert("Essa vaga já está ocupada!");
    return;
  }

  // Salvar no LocalStorage
  reservas.push(reserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  // Exibir console.log
  console.log("Reserva cadastrada:", reserva);

  // Pop-up de sucesso
  alert("Cadastro realizado com sucesso!");
  document.getElementById("formCadastro").reset();
}

// Função para listar vagas
function listarVagas() {
  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  let lista = document.getElementById("listaVagas");
  if (!lista) return;

  lista.innerHTML = "";

  for (let i = 1; i <= TOTAL_VAGAS; i++) {
    let vaga = document.createElement("div");
    vaga.classList.add("vaga");

    let reserva = reservas.find(r => r.vaga === i);

    if (reserva) {
      vaga.classList.add("ocupada");
      vaga.innerHTML = `Vaga ${i}<br>Ocupada<br>${reserva.placa}`;
    } else {
      vaga.classList.add("disponivel");
      vaga.innerHTML = `Vaga ${i}<br>Disponível`;
    }

    lista.appendChild(vaga);
  }
}

// Eventos
const form = document.getElementById("formCadastro");
if (form) {
  form.addEventListener("submit", salvarReserva);
}

if (document.getElementById("listaVagas")) {
  listarVagas();
}
