import React from 'react';
import '../style/App.css';

export function ChamadosAtivos() {
  
  // Função para dar cor à prioridade
  const getPrioridadeBadge = (prioridade) => {
    const cores = {
      'Minima': { bg: '#0284c720', text: '#38bdf8' },
      'Baixa': { bg: '#05966920', text: '#34d399' },
      'Normal': { bg: '#47556940', text: '#cbd5e1' },
      'Alta': { bg: '#d9770620', text: '#fbbf24' },
      'Urgente': { bg: '#dc262620', text: '#f87171' },
      'Critica': { bg: '#7f1d1d', text: '#fca5a5', bold: true }
    };
    const estilo = cores[prioridade] || cores['Normal'];
    
    return (
      <span style={{ 
        backgroundColor: estilo.bg, 
        color: estilo.text, 
        padding: '4px 8px', 
        borderRadius: '4px', 
        fontSize: '0.75rem', 
        fontWeight: estilo.bold ? 'bold' : 'normal',
        border: estilo.bold ? '1px solid #ef4444' : 'none'
      }}>
        {prioridade}
      </span>
    );
  };

  const chamados = [
    { id: 1, titulo: 'Falha no Compressor - Câmara 01', email: 'acesso.terminalpng@grupotlog.com.br', prioridade: 'Critica', estado: '☁️ Ativo', ultimaInteracao: '11 de dez de 2025 às 9:30 a.m.' },
    { id: 2, titulo: 'Dúvida: Setpoint do Balcão', email: 'acesso.terminalsjp@grupotlog.com.br', prioridade: 'Minima', estado: '☁️ Ativo', ultimaInteracao: '10 de dez de 2025 às 2:38 p.m.' },
    { id: 3, titulo: 'Alarme Crítico de Temperatura', email: 'adm.terminalpng@grupotlog.com.br', prioridade: 'Urgente', estado: '☁️ Ativo', ultimaInteracao: '19 de jan de 2026 às 9:15 a.m.' },
    { id: 4, titulo: 'Manutenção Preventiva Atrasada', email: 'adm.terminalsjp@grupotlog.com.br', prioridade: 'Alta', estado: '☁️ Ativo', ultimaInteracao: '19 de jan de 2026 às 9:16 a.m.' },
    { id: 5, titulo: 'Solicitação de Peças', email: 'administrativo@grupotlog.com.br', prioridade: 'Normal', estado: '☁️ Ativo', ultimaInteracao: '25 de jan de 2025 às 5:04 a.m.' },
  ];

  return (
    <div className="home-container">
      {/* ... (Todo o cabeçalho e botões mantêm-se iguais ao código anterior) ... */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ margin: '0 0 20px 0', fontSize: '1.8rem', color: '#f8fafc' }}>Chamados ativos</h1>
      </div>

      <div style={{ border: '1px solid #334155', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
            <tr>
              <th style={{ padding: '12px 15px', width: '40px' }}><input type="checkbox" /></th>
              <th style={{ padding: '12px 15px', color: '#f8fafc', fontWeight: 'normal' }}>Título do Chamado ↑</th>
              <th style={{ padding: '12px 15px', color: '#f8fafc', fontWeight: 'normal' }}>Prioridade</th>
              <th style={{ padding: '12px 15px', color: '#f8fafc', fontWeight: 'normal' }}>E-mail (Criador)</th>
              <th style={{ padding: '12px 15px', color: '#f8fafc', fontWeight: 'normal' }}>Estado</th>
              <th style={{ padding: '12px 15px', color: '#f8fafc', fontWeight: 'normal' }}>Última interação com IA</th>
            </tr>
          </thead>
          <tbody>
            {chamados.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #1e293b', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '12px 15px' }}><input type="checkbox" /></td>
                <td style={{ padding: '12px 15px', color: '#f8fafc', fontWeight: '500' }}>{item.titulo}</td>
                <td style={{ padding: '12px 15px' }}>{getPrioridadeBadge(item.prioridade)}</td>
                <td style={{ padding: '12px 15px', color: '#cbd5e1' }}>{item.email}</td>
                <td style={{ padding: '12px 15px', color: '#cbd5e1' }}>{item.estado}</td>
                <td style={{ padding: '12px 15px', color: '#cbd5e1' }}>{item.ultimaInteracao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}