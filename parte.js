// ===== REFERÊNCIAS AOS ELEMENTOS =====
const form = document.getElementById('formDisciplina');
const btnSalvar = document.getElementById('btnSalvar');
const btnLimpar = document.getElementById('btnLimpar');
const mensagem = document.getElementById('mensagem');
const corpoTabela = document.getElementById('corpoTabela');

// ===== FUNÇÃO: Exibir mensagem na div =====
function mostrarMensagem(texto) {
  mensagem.textContent = texto;
  mensagem.classList.add('ativa');
}

// ===== FUNÇÃO: Limpar mensagem da div =====
function limparMensagem() {
  mensagem.textContent = '';
  mensagem.classList.remove('ativa');
}

// ===== FUNÇÃO: Limpar o formulário =====
function limparFormulario() {
  form.reset();
  document.querySelectorAll('.campo.erro').forEach(campo => campo.classList.remove('erro'));
}

// ===== FUNÇÃO: Atualizar estado visual de um campo =====
function atualizarEstadoCampo(campo) {
  const input = campo.querySelector('input, select');
  if (!input) return;

  const valor = input.type === 'date' ? input.value : input.value.trim();
  campo.classList.toggle('erro', !valor);
}

// ===== FUNÇÃO: Validar todos os campos =====
function validarCampos() {
  document.querySelectorAll('.campo').forEach(campo => atualizarEstadoCampo(campo));
  return document.querySelectorAll('.campo.erro').length === 0;
}

// ===== EVENTOS PARA MARCAR O CAMPO QUANDO ESTIVER VAZIO =====
document.querySelectorAll('.campo input, .campo select').forEach(elemento => {
  elemento.addEventListener('input', () => atualizarEstadoCampo(elemento.closest('.campo')));
  elemento.addEventListener('change', () => atualizarEstadoCampo(elemento.closest('.campo')));
  elemento.addEventListener('blur', () => atualizarEstadoCampo(elemento.closest('.campo')));
});

// ===== BOTÃO SALVAR =====
btnSalvar.addEventListener('click', function () {
  // Captura os valores dos campos
  const nomeDisciplina = document.getElementById('nomeDisciplina').value.trim();
  const codigoDisciplina = document.getElementById('codigoDisciplina').value.trim();
  const nomeProfessor = document.getElementById('nomeProfessor').value.trim();
  const cargaHoraria = document.getElementById('cargaHoraria').value.trim();
  const emailProfessor = document.getElementById('emailProfessor').value.trim();
  const dataInicio = document.getElementById('dataInicio').value;
  const periodo = document.getElementById('periodo').value;
  const sala = document.getElementById('sala').value.trim();

  // Valida se todos os campos obrigatórios estão preenchidos
  if (!validarCampos()) {
    mostrarMensagem('⚠️ Preencha todos os campos antes de salvar.');
    return;
  }

  // Formata a data para o padrão brasileiro (dd/mm/aaaa)
  const [ano, mes, dia] = dataInicio.split('-');
  const dataFormatada = `${dia}/${mes}/${ano}`;

  // Cria uma nova linha na tabela
  const novaLinha = document.createElement('tr');

  novaLinha.innerHTML = `
    <td>${nomeDisciplina}</td>
    <td>${codigoDisciplina}</td>
    <td>${nomeProfessor}</td>
    <td>${cargaHoraria}h</td>
    <td>${emailProfessor}</td>
    <td>${dataFormatada}</td>
    <td>${periodo}</td>
    <td>${sala}</td>
  `;

  corpoTabela.appendChild(novaLinha);

  // Limpa o formulário após salvar
  limparFormulario();
});

// ===== BOTÃO LIMPAR =====
btnLimpar.addEventListener('click', function () {
  limparFormulario();
});
