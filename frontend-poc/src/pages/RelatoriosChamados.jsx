import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import '../style/App.css'; // 🔥 Correção do erro aplicada aqui!

export function RelatoriosChamados() {
  // Dados reais puxados dos cartões para alimentar os gráficos
  const dadosStatus = [
    { name: 'Ativos', chamados: 156, color: '#38bdf8' },
    { name: 'Em andamento', chamados: 89, color: '#818cf8' },
    { name: 'Esperando', chamados: 24, color: '#fbbf24' },
  ];

  const dadosAtencao = [
    { name: 'Pedidos', chamados: 15, color: '#94a3b8' },
    { name: 'Em Risco', chamados: 3, color: '#ef4444' },
    { name: 'Sem Resp.', chamados: 8, color: '#f97316' },
    { name: 'Atrasados', chamados: 5, color: '#f43f5e' },
  ];

  return (
    <div className="home-container">
      
      {/* Cabeçalho */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Base &gt; Relatório de Chamados</span>
        <h1 style={{ margin: '10px 0 10px 0', fontSize: '1.8rem', color: '#f8fafc' }}>Visão Geral de Chamados</h1>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', maxWidth: '900px', lineHeight: '1.5' }}>
          Acompanhe o volume de chamados em toda a sua infraestrutura e tome medidas para otimizar o tempo de resposta. 
        </p>
      </div>

      {/* SESSÃO 1: Métricas Principais (4 Cartões) */}
      <div className="grid-4-cols">
        <div className="dash-card">
          <h4>Registro de chamados</h4>
          <div className="big-number">842</div>
          <p className="subtitle">Total de chamados na organização</p>
          <a href="#" style={{ color: '#38bdf8', fontSize: '0.85rem', textDecoration: 'none', marginTop: 'auto' }}>Explorar todos →</a>
        </div>
        <div className="dash-card">
          <h4>Chamados ativos</h4>
          <div className="big-number" style={{ color: '#f8fafc' }}>156</div>
          <p className="subtitle" style={{ color: '#38bdf8' }}>+12 esta semana</p>
        </div>
        <div className="dash-card">
          <h4>Chamados em andamento</h4>
          <div className="big-number">89</div>
          <p className="subtitle">Técnicos em campo ou remotos</p>
        </div>
        <div className="dash-card">
          <h4>Aguardando aprovação</h4>
          <div className="big-number">24</div>
          <p className="subtitle">Liberação de peças/orçamento</p>
        </div>
      </div>

      {/* SESSÃO 2: Principais Ações */}
      <h2 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '20px', marginTop: '40px' }}>Principais ações para si</h2>
      
      <div className="grid-4-cols">
        <div className="dash-card">
          <h4>Pedidos de chamado</h4>
          <div className="big-number">15</div>
          <div className="card-actions"><button className="card-btn">Gerenciar pedidos</button></div>
        </div>
        <div className="dash-card" style={{ border: '1px solid #7f1d1d' }}>
          <h4>Sistemas em risco 🔒</h4>
          <div className="big-number" style={{ color: '#fca5a5' }}>3</div>
          <p className="subtitle">Anomalias críticas detectadas</p>
        </div>
        <div className="dash-card">
          <h4>Sem responsável</h4>
          <div className="big-number">8</div>
          <div className="card-actions"><button className="card-btn">Atribuir técnicos</button></div>
        </div>
        <div className="dash-card">
          <h4>Manutenções Atrasadas 🔒</h4>
          <div className="big-number">5</div>
          <a href="#" style={{ color: '#38bdf8', fontSize: '0.85rem', textDecoration: 'none', marginTop: 'auto' }}>Agendar intervenções</a>
        </div>
      </div>

      {/* 🌟 NOVA SESSÃO 3: Análise em Gráficos */}
      <h2 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '20px', marginTop: '40px' }}>Análise de chamados</h2>
      
      <div className="grid-2-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Gráfico 1: Status de Execução */}
        <div className="dash-card" style={{ height: '300px' }}>
          <h4 style={{ marginBottom: '20px' }}>Distribuição de Status</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dadosStatus} margin={{ top: 10, right: 30, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#334155', opacity: 0.4 }} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} />
              <Bar dataKey="chamados" radius={[4, 4, 0, 0]}>
                {dadosStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico 2: Pontos de Atenção */}
        <div className="dash-card" style={{ height: '300px' }}>
          <h4 style={{ marginBottom: '20px' }}>Pontos de Atenção Crítica</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dadosAtencao} margin={{ top: 10, right: 30, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#334155', opacity: 0.4 }} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} />
              <Bar dataKey="chamados" radius={[4, 4, 0, 0]}>
                {dadosAtencao.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}