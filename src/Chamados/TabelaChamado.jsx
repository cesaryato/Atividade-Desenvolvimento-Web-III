import { useState } from "react";

export function TabelaChamados({ chamados = [], onAtualizarStatus, onExcluir }) {
  const [nomeFuncionario, setNomeFuncionario] = useState("Atendente 01");
  
  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoParaExcluir, setChamadoParaExcluir] = useState(null);

  function abrirModalConfirmacao(chamado) {
    setChamadoParaExcluir(chamado);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setChamadoParaExcluir(null);
  }

  function confirmarExclusao() {
    if (chamadoParaExcluir) {
      onExcluir(chamadoParaExcluir.id);
      fecharModal();
    }
  }

  if (chamados.length === 0) {
    return <p className="mensagem-vazia">Nenhum chamado registrado até o momento.</p>;
  }

  return (
    <div className="container-tabela">
      <h2>Painel de Gestão de Chamados</h2>
      
      <div className="campo-atendente">
        <label htmlFor="atendente">Funcionário Atendendo: </label>
        <input
          id="atendente"
          type="text"
          value={nomeFuncionario}
          onChange={(e) => setNomeFuncionario(e.target.value)}
        />
      </div>

      <table className="tabela-chamados">
        <thead>
          <tr>
            <th>Protocolo</th>
            <th>Data e Hora</th>
            <th>Solicitante</th>
            <th>Prioridade</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Atendente</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map((item) => (
            <tr key={item.id}>
              <td>#{item.id}</td>
              <td>{item.dataCriacao}</td>
              <td>
                <span className="nome-solicitante">{item.solicitante}</span>
                <small className="documento-solicitante"> ({item.documento})</small>
              </td>
              <td>
                <span className={`badge-prioridade ${item.prioridade.toLowerCase()}`}>
                  {item.prioridade}
                </span>
              </td>
              <td>{item.categoria}</td>
              <td>{item.descricao}</td>
              <td>{item.atendente}</td>
              <td>
                <span className={`badge-status ${item.status.toLowerCase().replace(" ", "-")}`}>
                  {item.status}
                </span>
              </td>
              <td>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      onAtualizarStatus(item.id, e.target.value, nomeFuncionario)
                    }
                  >
                    <option value="Aberto">Aberto</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluído">Concluído</option>
                  </select>

                  <button
                    type="button"
                    className="btn-excluir"
                    onClick={() => abrirModalConfirmacao(item)}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* JANELA DE CONFIRMAÇÃO ESTILO WINDOWS */}
      {modalAberto && (
        <div className="win-overlay">
          <div className="win-dialog">
            {/* Barra de Título */}
            <div className="win-header">
              <span className="win-title">Confirmar Exclusão</span>
              <button className="win-close-btn" onClick={fecharModal}>✕</button>
            </div>

            {/* Conteúdo com ícone de aviso */}
            <div className="win-body">
              <div className="win-icon-warning">⚠️</div>
              <div className="win-message">
                <p>Tem certeza de que deseja excluir o chamado <strong>#{chamadoParaExcluir?.id}</strong>?</p>
                <p className="win-subtext">Esta ação não poderá ser desfeita.</p>
              </div>
            </div>

            {/* Rodapé com botões do Windows */}
            <div className="win-footer">
              <button className="win-btn win-btn-danger" onClick={confirmarExclusao}>
                Sim
              </button>
              <button className="win-btn" onClick={fecharModal}>
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}