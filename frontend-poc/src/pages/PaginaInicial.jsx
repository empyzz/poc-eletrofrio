import React, { useState } from 'react';

// ─── DADOS MOCKADOS (substituir por API futuramente) ────────────────────────
const metrics = {
  equipamentos: { total: 142, ativos: 138, emFalha: 4, emManutencao: 3 },
  chamados: { total: 27, criticos: 5, urgentes: 8, emAndamento: 11, aguardandoAprovacao: 3 },
  anomalias: { detectadas: 19, falsosPositivos: 7, falhasReais: 12, isolationForestAlerts: 4 },
  utilizadores: { total: 34, tecnicos: 18, supervisores: 10, admins: 6 },
};

const alertasRecentes = [
  { id: 1, tipo: 'Falha Real',        prioridade: 'Crítica', empresa: 'Supermercado BomPreço',  equipamento: 'Câmara Fria 03', hora: '08:31', status: 'Aberto' },
  { id: 2, tipo: 'Falha Real',        prioridade: 'Urgente', empresa: 'Rede FrioBom',           equipamento: 'Balcão Frigorífico 01', hora: '09:15', status: 'Em andamento' },
  { id: 3, tipo: 'Oscilação Normal',  prioridade: 'Normal',  empresa: 'Atacadão Norte',         equipamento: 'Expositor Laticínios', hora: '09:42', status: 'Resolvido' },
  { id: 4, tipo: 'Em Análise',        prioridade: 'Alta',    empresa: 'Mercado Central',        equipamento: 'Compressor Setor B', hora: '10:05', status: 'Em andamento' },
  { id: 5, tipo: 'Falha Real',        prioridade: 'Urgente', empresa: 'SuperFrio Ltda',         equipamento: 'Câmara Fria 01', hora: '10:22', status: 'Aberto' },
];

const acoesPrincipais = [
  {
    titulo: 'Anomalias Críticas',
    badge: 'Crítico',
    badgeClass: 'status-critical',
    corpo: '4 equipamentos com score Isolation Forest > 0.85',
    detalhes: [
      { label: 'Câmara Fria 03 — BomPreço', valor: 'Score 0.91' },
      { label: 'Compressor Setor B — Central', valor: 'Score 0.87' },
    ],
  },
  {
    titulo: 'Chamados sem Responsável',
    badge: 'Urgente',
    badgeClass: 'status-warning',
    corpo: '5 chamados abertos sem técnico atribuído',
    detalhes: [],
    subtexto: 'Atribua técnicos para evitar SLA vencido.',
  },
  {
    titulo: 'Manutenções Atrasadas',
    badge: 'Precisa de ação',
    badgeClass: 'status-warning',
    corpo: '3 manutenções preventivas com prazo vencido',
    detalhes: [],
    subtexto: 'Reagende para evitar degradação dos ativos.',
  },
  {
    titulo: 'Diagnósticos RAG Disponíveis',
    badge: 'Recomendado',
    badgeClass: 'status-info',
    corpo: '7 alertas aguardam diagnóstico humanizado via IA',
    detalhes: [],
    subtexto: 'Acione o Especialista IA para análise contextualizada.',
  },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────
const prioridadeConfig = {
  'Mínima':  { color: '#aaaaaa', bg: '#1a1a1a' },
  'Baixa':   { color: '#00cfff', bg: '#001f2e' },
  'Normal':  { color: '#00ff94', bg: '#001a0f' },
  'Alta':    { color: '#ffe600', bg: '#1f1a00' },
  'Urgente': { color: '#ff6a00', bg: '#1f0e00' },
  'Crítica': { color: '#ff2d55', bg: '#1f0008' },
};

const tipoConfig = {
  'Falha Real':       { color: '#ff2d55', label: '🔴 Falha Real' },
  'Em Análise':       { color: '#ffe600', label: '🟡 Em Análise' },
  'Oscilação Normal': { color: '#00ff94', label: '🟢 Oscilação Normal' },
};

function PrioridadeBadge({ nivel }) {
  const cfg = prioridadeConfig[nivel] || prioridadeConfig['Normal'];
  return (
    <span style={{
      fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px',
      borderRadius: '4px', background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.color}44`, whiteSpace: 'nowrap',
      boxShadow: nivel === 'Crítica' ? `0 0 6px ${cfg.color}66` : 'none',
      animation: nivel === 'Crítica' ? 'glowPulse 1.8s ease-in-out infinite' : 'none',
    }}>
      {nivel}
    </span>
  );
}

// ─── COMPONENTE PRINCIPAL ───────────────────────────────────────────────────
export function PaginaInicial() {
  const [filtroAtivo, setFiltroAtivo] = useState('Anomalias');
  const filtros = ['Anomalias', 'Chamados', 'Equipamentos', 'Utilizadores', 'Manutenção'];

  return (
    <div style={{ padding: '24px 28px', color: '#e6edf3', fontFamily: 'system-ui, sans-serif', background: '#0d1117', minHeight: '100vh' }}>

      {/* Keyframes */}
      <style>{`
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 4px #ff2d55; }
          50%      { box-shadow: 0 0 14px #ff2d55, 0 0 28px #ff2d5544; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pi-card {
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 10px;
          padding: 18px;
          animation: fadeIn 0.4s ease both;
        }
        .pi-card:hover { border-color: #30363d; }
        .pi-btn {
          background: transparent;
          border: 1px solid #30363d;
          color: #c9d1d9;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
        }
        .pi-btn:hover { border-color: #8b949e; color: #fff; }
        .pi-section-title {
          font-size: 1rem;
          font-weight: 600;
          color: #e6edf3;
          margin: 28px 0 14px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #21262d;
        }
        .pi-pill {
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          border: 1px solid #30363d;
          background: transparent;
          color: #8b949e;
          cursor: pointer;
        }
        .pi-pill.active {
          background: #1f6feb;
          border-color: #1f6feb;
          color: #fff;
        }
        .pi-badge {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          margin-left: 8px;
        }
        .status-critical { background: #3d0c0c; color: #ff2d55; border: 1px solid #ff2d5544; }
        .status-warning  { background: #2d1f00; color: #ff6a00; border: 1px solid #ff6a0044; }
        .status-info     { background: #001f2e; color: #00cfff; border: 1px solid #00cfff44; }
        .status-good     { background: #001a0f; color: #00ff94; border: 1px solid #00ff9444; }
        .pi-big-num {
          font-size: 2.4rem;
          font-weight: 700;
          color: #ffffff;
          margin: 8px 0 4px;
          line-height: 1;
        }
        .pi-sub { font-size: 0.78rem; color: #8b949e; margin: 0; }
        .pi-row { display: flex; gap: 16px; }
        .pi-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
        .pi-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .pi-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
        .pi-divider { width: 1px; background: #21262d; margin: 0 8px; }
        .pi-alert-row {
          display: grid;
          grid-template-columns: 1fr 1.4fr 1fr 90px 90px;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 0.82rem;
          border-bottom: 1px solid #21262d;
        }
        .pi-alert-row:hover { background: #1c2128; }
        .pi-alert-row:last-child { border-bottom: none; }
        .pi-top-bar {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 4px;
        }
        .readonly-badge {
          font-size: 0.72rem;
          color: #00cfff;
          border: 1px solid #00cfff33;
          background: #001f2e;
          padding: 4px 10px;
          border-radius: 20px;
        }
      `}</style>

      {/* TOP BAR */}
      <div className="pi-top-bar">
        <span className="readonly-badge">● MODO LEITURA — IA não controla equipamentos</span>
      </div>

      {/* ── SESSÃO 1: KPIs PRINCIPAIS ── */}
      <div className="pi-section-title">Visão geral do sistema</div>
      <div className="pi-grid-4">

        {/* Card Equipamentos */}
        <div className="pi-card">
          <p className="pi-sub">Equipamentos monitorados</p>
          <div className="pi-big-num">{metrics.equipamentos.total}</div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Ativos</div><div style={{ fontWeight: 700, color: '#00ff94' }}>{metrics.equipamentos.ativos}</div></div>
            <div className="pi-divider" />
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Em Falha</div><div style={{ fontWeight: 700, color: '#ff2d55' }}>{metrics.equipamentos.emFalha}</div></div>
            <div className="pi-divider" />
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Manutenção</div><div style={{ fontWeight: 700, color: '#ffe600' }}>{metrics.equipamentos.emManutencao}</div></div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8b949e', marginBottom: '4px' }}>
              <span>Operacionais</span>
              <span>{metrics.equipamentos.ativos}/{metrics.equipamentos.total}</span>
            </div>
            <div style={{ width: '100%', height: '5px', background: '#21262d', borderRadius: '3px' }}>
              <div style={{ width: `${(metrics.equipamentos.ativos / metrics.equipamentos.total) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #00ff94, #00cfff)', borderRadius: '3px' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
            <button className="pi-btn">Ver ativos</button>
            <button className="pi-btn">Em manutenção</button>
          </div>
        </div>

        {/* Card Chamados */}
        <div className="pi-card">
          <p className="pi-sub">Chamados ativos</p>
          <div className="pi-big-num">{metrics.chamados.total}</div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Críticos</div><div style={{ fontWeight: 700, color: '#ff2d55' }}>{metrics.chamados.criticos}</div></div>
            <div className="pi-divider" />
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Urgentes</div><div style={{ fontWeight: 700, color: '#ff6a00' }}>{metrics.chamados.urgentes}</div></div>
            <div className="pi-divider" />
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Andamento</div><div style={{ fontWeight: 700, color: '#ffe600' }}>{metrics.chamados.emAndamento}</div></div>
            <div className="pi-divider" />
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Aprovação</div><div style={{ fontWeight: 700, color: '#00cfff' }}>{metrics.chamados.aguardandoAprovacao}</div></div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
            <button className="pi-btn">Ver chamados</button>
            <button className="pi-btn">+ Novo chamado</button>
          </div>
        </div>

        {/* Card Anomalias IA */}
        <div className="pi-card">
          <p className="pi-sub">Anomalias detectadas pela IA</p>
          <div className="pi-big-num">{metrics.anomalias.detectadas}</div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Falhas Reais</div><div style={{ fontWeight: 700, color: '#ff2d55' }}>{metrics.anomalias.falhasReais}</div></div>
            <div className="pi-divider" />
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Falsos Positivos</div><div style={{ fontWeight: 700, color: '#00ff94' }}>{metrics.anomalias.falsosPositivos}</div></div>
            <div className="pi-divider" />
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Score Alto</div><div style={{ fontWeight: 700, color: '#ff6a00' }}>{metrics.anomalias.isolationForestAlerts}</div></div>
          </div>
          <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#8b949e' }}>
            Isolation Forest · LightGBM · RAG
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
            <button className="pi-btn">Ver ocorrências</button>
            <button className="pi-btn">⚡ Acionar IA</button>
          </div>
        </div>

        {/* Card Utilizadores */}
        <div className="pi-card">
          <p className="pi-sub">Utilizadores do sistema</p>
          <div className="pi-big-num">{metrics.utilizadores.total}</div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Técnicos</div><div style={{ fontWeight: 700, color: '#00cfff' }}>{metrics.utilizadores.tecnicos}</div></div>
            <div className="pi-divider" />
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Supervisores</div><div style={{ fontWeight: 700, color: '#ffe600' }}>{metrics.utilizadores.supervisores}</div></div>
            <div className="pi-divider" />
            <div><div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Admins</div><div style={{ fontWeight: 700, color: '#00ff94' }}>{metrics.utilizadores.admins}</div></div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
            <button className="pi-btn">Gerir utilizadores</button>
          </div>
        </div>

      </div>

      {/* ── SESSÃO 2: AÇÕES PRINCIPAIS ── */}
      <div className="pi-section-title">Ações principais</div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        {filtros.map(f => (
          <button key={f} className={`pi-pill ${filtroAtivo === f ? 'active' : ''}`} onClick={() => setFiltroAtivo(f)}>{f}</button>
        ))}
      </div>
      <div className="pi-grid-4">
        {acoesPrincipais.map((a, i) => (
          <div key={i} className="pi-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>
              {a.titulo}
              <span className={`pi-badge ${a.badgeClass}`}>{a.badge}</span>
            </h4>
            <p style={{ fontWeight: 700, margin: '12px 0 8px', fontSize: '0.85rem' }}>{a.corpo}</p>
            {a.detalhes.map((d, j) => (
              <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#8b949e', padding: '3px 0' }}>
                <span>{d.label}</span><span style={{ color: '#ff6a00' }}>{d.valor}</span>
              </div>
            ))}
            {a.subtexto && <p style={{ fontSize: '0.78rem', color: '#8b949e', margin: '6px 0 0' }}>{a.subtexto}</p>}
          </div>
        ))}
      </div>

      {/* ── SESSÃO 3: ALERTAS RECENTES + STATUS ── */}
      <div className="pi-grid-2" style={{ marginTop: '28px' }}>

        {/* Alertas recentes */}
        <div className="pi-card" style={{ gridColumn: '1 / 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Alertas recentes</h4>
            <button className="pi-btn">Ver todos →</button>
          </div>
          {/* Header da tabela */}
          <div className="pi-alert-row" style={{ color: '#8b949e', fontSize: '0.72rem', fontWeight: 600, borderBottom: '1px solid #21262d', padding: '6px 14px' }}>
            <span>EMPRESA</span><span>EQUIPAMENTO</span><span>TIPO</span><span>PRIORIDADE</span><span>HORA</span>
          </div>
          {alertasRecentes.map(a => {
            const tipo = tipoConfig[a.tipo] || tipoConfig['Em Análise'];
            return (
              <div key={a.id} className="pi-alert-row">
                <span style={{ color: '#c9d1d9', fontSize: '0.8rem' }}>{a.empresa}</span>
                <span style={{ color: '#8b949e' }}>{a.equipamento}</span>
                <span style={{ color: tipo.color, fontSize: '0.75rem' }}>{tipo.label}</span>
                <PrioridadeBadge nivel={a.prioridade} />
                <span style={{ color: '#8b949e', textAlign: 'right' }}>{a.hora}</span>
              </div>
            );
          })}
        </div>

        {/* Status geral + OPEX */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <div className="pi-card">
            <h4 style={{ margin: '0 0 14px', fontSize: '0.9rem' }}>Estado dos sistemas <span className="pi-badge status-good">Online</span></h4>
            {[
              { label: 'Sistema Galileo (API)',       status: 'Operacional', cor: '#00ff94' },
              { label: 'Motor Isolation Forest',      status: 'Operacional', cor: '#00ff94' },
              { label: 'Serviço RAG / LlamaIndex',   status: 'Operacional', cor: '#00ff94' },
              { label: 'Mensageria (RabbitMQ)',       status: 'Operacional', cor: '#00ff94' },
              { label: 'Pipeline ETL Python',         status: 'Atenção',     cor: '#ffe600' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', borderBottom: '1px solid #21262d' }}>
                <span style={{ color: '#c9d1d9' }}>{s.label}</span>
                <span style={{ color: s.cor, fontWeight: 600 }}>● {s.status}</span>
              </div>
            ))}
          </div>

          <div className="pi-card">
            <h4 style={{ margin: '0 0 10px', fontSize: '0.9rem' }}>Eficiência energética (OPEX)</h4>
            <div className="pi-grid-2" style={{ gap: '10px' }}>
              <div style={{ background: '#0d1117', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Fora do Set Point</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ff6a00' }}>6</div>
                <div style={{ fontSize: '0.7rem', color: '#8b949e' }}>equipamentos</div>
              </div>
              <div style={{ background: '#0d1117', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Impacto estimado</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffe600' }}>+14%</div>
                <div style={{ fontSize: '0.7rem', color: '#8b949e' }}>consumo elétrico</div>
              </div>
              <div style={{ background: '#0d1117', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Time to Failure</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ff2d55' }}>3h 20m</div>
                <div style={{ fontSize: '0.7rem', color: '#8b949e' }}>equipamento crítico</div>
              </div>
              <div style={{ background: '#0d1117', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: '#8b949e' }}>Ativos eficientes</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#00ff94' }}>89%</div>
                <div style={{ fontSize: '0.7rem', color: '#8b949e' }}>dentro do padrão</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}