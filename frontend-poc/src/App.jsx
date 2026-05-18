import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './style/App.css';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [diagnostico, setDiagnostico] = useState('');
  const [carregandoIa, setCarregandoIa] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/telemetria/30663')
      .then((response) => response.json())
      .then((json) => {
        setData(json.dados);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
        setLoading(false); // Adicionado para não travar a tela de loading se a API falhar
      });
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Carregando dados do Galileo...</div>;

  const anomalias = data.filter((ponto) => ponto.is_anomaly);

  const solicitarDiagnosticoRAG = (anomalia) => {
    setCarregandoIa(true);

    fetch('http://localhost:8000/diagnostico-ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        temperatura: anomalia['Temperatura Ambiente'],
        status_degelo: anomalia['Status Degelo'],
        horario: anomalia.horario,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDiagnostico(data.diagnostico_rag);
        setCarregandoIa(false);
      })
      .catch((err) => {
        console.error(err);
        setCarregandoIa(false);
      });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h2>Painel de Monitoramento Preditivo - Eletrofrio</h2>
      <p>Equipamento: Balcão Frigorífico (ID: 30663)</p>

      <div
        style={{ height: '400px', marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="horario" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Linha normal da temperatura */}
            <Line
              type="monotone"
              dataKey="Temperatura Ambiente"
              stroke="#0288d1"
              strokeWidth={2}
              dot={{ r: 4 }}
            />

            {/* Renderiza pontos vermelhos em cima das coordenadas onde is_anomaly for true */}
            {anomalias.map((anomalia, index) => (
              <ReferenceDot
                key={index}
                x={anomalia.horario}
                y={anomalia['Temperatura Ambiente']}
                r={8}
                fill="red"
                stroke="none"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#ffebee',
          borderLeft: '5px solid red',
        }}
      >
        <h3>🚨 Alertas da Inteligência Artificial</h3>
        {anomalias.length > 0 ? (
          <div>
            <ul>
              {/* Correção do map: agrupamos as informações em um único <li> */}
              {anomalias.map((a, idx) => (
                <li key={idx} style={{ marginBottom: '1rem' }}>
                  <strong>{a.horario}</strong>: Anomalia térmica detectada (
                  {a['Temperatura Ambiente']}°C). Status de Degelo:{' '}
                  {a['Status Degelo'] === 1.0 ? 'Ativo' : 'Inativo'}.
                  <br />
                  <button
                    onClick={() => solicitarDiagnosticoRAG(a)}
                    style={{
                      marginTop: '10px',
                      padding: '8px 16px',
                      background: '#2e7d32',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    ✨ Solicitar Diagnóstico da IA (RAG)
                  </button>
                </li>
              ))}
            </ul>

            {/* A renderização da resposta da IA fica fora do <ul> para não quebrar a semântica do HTML */}
            {carregandoIa && (
              <p>
                <em>A IA está lendo o manual Eletrofrio...</em>
              </p>
            )}
            {diagnostico && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: '#e8f5e9',
                  border: '1px solid #2e7d32',
                  borderRadius: '4px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                <h4 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>
                  🤖 Diagnóstico Humanizado
                </h4>
                {diagnostico}
              </div>
            )}
          </div>
        ) : (
          <p>Operação normal. Nenhuma anomalia detectada.</p>
        )}
      </div>
    </div>
  );
}

export default App;
