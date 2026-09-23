import { useState } from "react";

// Componente do formulário de abertura de chamados.
// Recebe a prop 'aoCadastrar', que é a função enviada pelo App.jsx para salvar o novo chamado no estado global.
export function FormularioChamado({ aoCadastrar }) {
  // 1. ESTADOS DO FORMULÁRIO (Guarda o que o usuário digita em cada campo)
  const [solicitante, setSolicitante] = useState("");
  const [documento, setDocumento] = useState(""); // RA ou CPF
  const [categoria, setCategoria] = useState("Suporte Técnico");
  const [prioridade, setPrioridade] = useState("Média");
  const [descricao, setDescricao] = useState("");
  
  // Estados para controle de feedback do usuário
  const [erros, setErros] = useState({});
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  // Função auxiliar para limpar o erro de um campo específico assim que o usuário começa a digitar nele
  function limparErro(campo) {
    setErros((prev) => ({ ...prev, [campo]: "" }));
  }

  // 2. FUNÇÃO DE SUBMISSÃO E VALIDAÇÃO
  function handleSubmit(e) {
    e.preventDefault(); // Impede o recarregamento padrão da página
    const novosErros = {};

    // Validando o campo 'Solicitante'
    if (solicitante.trim().length < 3) {
      novosErros.solicitante = "Informe o nome do solicitante (mínimo 3 caracteres).";
    }

    // Validando o campo 'Documento' (RA ou CPF)
    if (!documento.trim()) {
      novosErros.documento = "Informe o RA ou CPF do solicitante.";
    }

    // Validando a 'Descrição'
    if (descricao.trim().length < 10) {
      novosErros.descricao = "Descreva a solicitação com pelo menos 10 caracteres.";
    }

    // Se houver algum erro no objeto 'novosErros', interrompe o envio e exibe as mensagens
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      setMensagemSucesso("");
      return;
    }

    // 3. ENVIO DOS DADOS
    // Se passar em todas as validações, chama a função do pai (App.jsx) passando o objeto do novo chamado
    aoCadastrar({
      solicitante: solicitante.trim(),
      documento: documento.trim(),
      categoria,
      prioridade,
      descricao: descricao.trim()
    });

    // Limpa o formulário e exibe mensagem de sucesso
    setMensagemSucesso("Chamado registrado com sucesso!");
    setSolicitante("");
    setDocumento("");
    setPrioridade("Média");
    setDescricao("");
    setErros({});
  }

  // 4. ESTRUTURA JSX (Interface)
  return (
    <form className="formulario-chamado" onSubmit={handleSubmit}>
      <h2>Abertura de Chamado</h2>

      {/* Exibe a mensagem de sucesso se ela existir */}
      {mensagemSucesso && <p className="mensagem-sucesso">{mensagemSucesso}</p>}

      {/* Campo: Nome do Solicitante */}
      <div className="campo-group">
        <label htmlFor="solicitante">Nome do Solicitante:</label>
        <input
          id="solicitante"
          type="text"
          value={solicitante}
          onChange={(e) => {
            setSolicitante(e.target.value);
            limparErro("solicitante");
          }}
        />
        {erros.solicitante && <span className="mensagem-erro">{erros.solicitante}</span>}
      </div>

      {/* Campo: RA ou CPF */}
      <div className="campo-group">
        <label htmlFor="documento">CPF do Solicitante:</label>
        <input
          id="documento"
          type="text"
          value={documento}
          onChange={(e) => {
            setDocumento(e.target.value);
            limparErro("documento");
          }}
        />
        {erros.documento && <span className="mensagem-erro">{erros.documento}</span>}
      </div>

      {/* Campo Select: Categoria */}
      <div className="campo-group">
        <label htmlFor="categoria">Categoria:</label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="Suporte Técnico">Suporte Técnico</option>
          <option value="Financeiro / Rematrícula">Financeiro / Rematrícula</option>
          <option value="Dúvidas Acadêmicas">Dúvidas Acadêmicas</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      {/* Campo Select: Prioridade */}
      <div className="campo-group">
        <label htmlFor="prioridade">Prioridade da Solicitação:</label>
        <select
          id="prioridade"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
          <option value="Urgente">Urgente</option>
        </select>
      </div>

      {/* Campo Textarea: Descrição */}
      <div className="campo-group">
        <label htmlFor="descricao">Descrição do Chamado:</label>
        <textarea
          id="descricao"
          rows={4}
          value={descricao}
          onChange={(e) => {
            setDescricao(e.target.value);
            limparErro("descricao");
          }}
        />
        {erros.descricao && <span className="mensagem-erro">{erros.descricao}</span>}
      </div>

      <button type="submit" className="btn-submit">Enviar Chamado</button>
    </form>
  );
}