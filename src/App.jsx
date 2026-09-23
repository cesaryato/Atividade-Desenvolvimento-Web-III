import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; 
import { FormularioChamado } from "./Chamados/FormularioChamado";
import { TabelaChamados } from "./Chamados/TabelaChamado";
import "./App.css"; 

export function App() {
  const [chamados, setChamados] = useState([]);

  // Adiciona o chamado com data e hora atual
  function adicionarChamado(novoChamado) {
    const agora = new Date();
    const horaFormatada = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });
    const dataFormatada = agora.toLocaleDateString("pt-BR");

    setChamados((prev) => [
      ...prev,
      {
        ...novoChamado,
        id: Date.now(),
        status: "Aberto",
        dataCriacao: `${dataFormatada} às ${horaFormatada}`,
        atendente: "Não atribuído"
      }
    ]);
  }

  // Atualiza o status
  function atualizarStatusChamado(id, novoStatus, nomeAtendente) {
    setChamados((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: novoStatus, atendente: nomeAtendente || item.atendente }
          : item
      )
    );
  }

  // Função para excluir o chamado pelo ID
  function excluirChamado(id) {
    setChamados((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f0f0f0" }}>
        <Link to="/">Novo Chamado</Link>
        <Link to="/listar">Listar Chamados ({chamados.length})</Link>
      </nav>

      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route
            path="/"
            element={<FormularioChamado aoCadastrar={adicionarChamado} />}
          />
          <Route
            path="/listar"
            element={
              <TabelaChamados
                chamados={chamados}
                onAtualizarStatus={atualizarStatusChamado}
                onExcluir={excluirChamado}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;