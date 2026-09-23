import { useState } from "react";

export function TabelaChamados({ chamados = [], onAtualizarStatus }) {
  const [nomeFuncionario, setNomeFuncionario] = useState("Atendente 01");

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
            <th>Data/Hora</th>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}