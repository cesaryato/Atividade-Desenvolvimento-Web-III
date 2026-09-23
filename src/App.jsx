import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";import { FormularioChamado } from "./Chamados/FormularioChamado";
import { TabelaChamados } from "./Chamados/TabelaChamado";
import "./App.css";
export function App() {
  const [chamados, setChamados] = useState([]);

  function adicionarChamado(novoChamado) {
    setChamados((prev) => [...prev, { ...novoChamado, id: Date.now(), status: "Aberto" }]);
  }

  function atualizarStatusChamado(id, novoStatus, nomeAtendente) {
    setChamados((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: novoStatus, atendente: nomeAtendente || item.atendente } : item
      )
    );
  } // <--- A função auxiliar fecha AQUI

  // O return deve ficar DENTRO da função App()
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
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
} // <--- A chave da função App() deve fechar AQUI no final!

export default App;