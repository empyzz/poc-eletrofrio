import React, { useState } from 'react';

export function Sidebar({ telaAtiva, setTelaAtiva }) {
  const [isOpen, setIsOpen] = useState(true);
  const [expands, setExpands] = useState({ chamados: true, gestao: true }); // Removido utilizadores daqui

  const toggleExpand = (key) => {
    setExpands(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const Icon = ({ name }) => {
    const icons = {
      home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
      telemetria: <><path d="M2 8V4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v4"/><rect width="20" height="8" x="2" y="8" rx="2"/><path d="M2 16v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4"/><line x1="6" x2="6.01" y1="12" y2="12"/><line x1="10" x2="10.01" y1="12" y2="12"/></>,
      ocorrencias: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
      falhas: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></>,
      chamados: <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M9 14h6"/><path d="M9 18h6"/><path d="M9 10h6"/></>,
      relatorios: <><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></>,
      empresas: <><path d="M6 22V4c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v18Z"/><path d="M6 18H2v-4a2 2 0 0 1 2-2h2"/><path d="M18 22v-4h4"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></>,
      manutencao: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
      permissoes: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>,
      conexao: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
      fluxo: <><path d="m18 8 4 4-4 4"/><path d="M2 12h20"/><path d="m6 8-4 4 4 4"/></>,
      api: <><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/></>,
      analise: <><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></>,
      config: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>
    };
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icons[name]}
      </svg>
    );
  };

  return (
    <div className="sidebar-container" style={{ width: isOpen ? '260px' : '56px' }}>
      <style>{`
        .sidebar-container {
          background: #1f1f1f;
          height: 100vh;
          transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 2px 0 8px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          flex-shrink: 0;
          overflow-x: hidden;
        }
        .sidebar-header {
          padding: 10px 18px;
          height: 48px;
          display: flex;
          align-items: center;
        }
        .hamburger {
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .menu-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0 8px;
        }
        .menu-scroll::-webkit-scrollbar { width: 0px; }
        .group-label {
          font-size: 11px;
          color: #6e6e6e;
          font-weight: 600;
          letter-spacing: 0.06em;
          margin: 20px 0 8px 12px;
          white-space: nowrap;
          display: ${isOpen ? 'block' : 'none'};
        }
        .menu-item {
          height: 40px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          border-radius: 6px;
          color: #d4d4d4;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
          margin-bottom: 2px;
        }
        .menu-item:hover { background: #2a2a2a; color: #ffffff; }
        .menu-item:hover svg { color: #ffffff; }
        
        .menu-item.active { 
          background: #2f81f7; 
          color: #ffffff; 
          font-weight: 500; 
        }
        .menu-item.active svg { color: #ffffff; }
        
        .icon-container {
          min-width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9d9d9d;
        }
        .label-text {
          margin-left: 12px;
          font-size: 14px;
          white-space: nowrap;
          opacity: ${isOpen ? 1 : 0};
          transition: opacity 0.2s;
        }
        .chevron {
          margin-left: auto;
          display: ${isOpen ? 'block' : 'none'};
          transition: transform 0.2s;
        }
        .sub-menu {
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }
        .sub-item {
          height: 36px;
          display: flex;
          align-items: center;
          padding-left: 44px;
          color: #9d9d9d;
          font-size: 13px;
          cursor: pointer;
          border-radius: 6px;
          position: relative;
        }
        .sub-item:hover { color: #d4d4d4; background: #2a2a2a; }
        
        .sub-item.active { 
          background: #2f81f7; 
          color: #ffffff; 
          font-weight: 500; 
        }
      `}</style>

      <div className="sidebar-header">
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)} title="Recolher menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>

      <div className="menu-scroll">
        <div className={`menu-item ${telaAtiva === 'home' ? 'active' : ''}`} onClick={() => setTelaAtiva('home')}>
          <div className="icon-container"><Icon name="home" /></div>
          <span className="label-text">Página Inicial</span>
        </div>

        <div className="group-label">MONITORAMENTO</div>
        <div className={`menu-item ${telaAtiva === 'telemetria' ? 'active' : ''}`} onClick={() => setTelaAtiva('telemetria')}>
          <div className="icon-container"><Icon name="telemetria" /></div>
          <span className="label-text">Telemetria ao Vivo</span>
        </div>
        <div className={`menu-item ${telaAtiva === 'ocorrencias' ? 'active' : ''}`} onClick={() => setTelaAtiva('ocorrencias')}>
          <div className="icon-container"><Icon name="ocorrencias" /></div>
          <span className="label-text">Ocorrências</span>
        </div>
        <div className={`menu-item ${telaAtiva === 'falhas' ? 'active' : ''}`} onClick={() => setTelaAtiva('falhas')}>
          <div className="icon-container"><Icon name="falhas" /></div>
          <span className="label-text">Falhas Operacionais</span>
        </div>

        <div className="group-label">CHAMADOS</div>
        <div className={`menu-item ${telaAtiva?.includes('chamado') ? 'active' : ''}`} onClick={() => toggleExpand('chamados')}>
          <div className="icon-container"><Icon name="chamados" /></div>
          <span className="label-text">Chamados Ativos</span>
          <div className="chevron" style={{ transform: expands.chamados ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div className="sub-menu" style={{ maxHeight: expands.chamados ? '100px' : '0' }}>
          <div className={`sub-item ${telaAtiva === 'operacao_chamado' ? 'active' : ''}`} onClick={() => setTelaAtiva('operacao_chamado')}>Operação do Chamado</div>
        </div>
        <div className={`menu-item ${telaAtiva === 'relatorios' ? 'active' : ''}`} onClick={() => setTelaAtiva('relatorios')}>
          <div className="icon-container"><Icon name="relatorios" /></div>
          <span className="label-text">Relatório de Chamados</span>
        </div>

        <div className="group-label">GESTÃO</div>
        <div className={`menu-item ${telaAtiva?.includes('ativos') ? 'active' : ''}`} onClick={() => toggleExpand('gestao')}>
          <div className="icon-container"><Icon name="empresas" /></div>
          <span className="label-text">Empresas / Ativos</span>
          <div className="chevron" style={{ transform: expands.gestao ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div className="sub-menu" style={{ maxHeight: expands.gestao ? '120px' : '0' }}>
          <div className={`sub-item ${telaAtiva === 'ativos_ativos' ? 'active' : ''}`} onClick={() => setTelaAtiva('ativos_ativos')}>Ativos ativos</div>
          <div className={`sub-item ${telaAtiva === 'inativos' ? 'active' : ''}`} onClick={() => setTelaAtiva('inativos')}>Inativos</div>
          <div className={`sub-item ${telaAtiva === 'grupos_ativos' ? 'active' : ''}`} onClick={() => setTelaAtiva('grupos_ativos')}>Grupos</div>
        </div>

        {/* 🌟 A SEÇÃO DE UTILIZADORES ESTAVA AQUI E FOI REMOVIDA COMPLETAMENTE */}

        <div className={`menu-item ${telaAtiva === 'manutencao' ? 'active' : ''}`} onClick={() => setTelaAtiva('manutencao')}>
          <div className="icon-container"><Icon name="manutencao" /></div>
          <span className="label-text">Em Manutenção</span>
        </div>
        <div className={`menu-item ${telaAtiva === 'permissoes' ? 'active' : ''}`} onClick={() => setTelaAtiva('permissoes')}>
          <div className="icon-container"><Icon name="permissoes" /></div>
          <span className="label-text">Funções / Permissões</span>
        </div>

        <div className="group-label">SISTEMA</div>
        <div className={`menu-item ${telaAtiva === 'conexao' ? 'active' : ''}`} onClick={() => setTelaAtiva('conexao')}>
          <div className="icon-container"><Icon name="conexao" /></div>
          <span className="label-text">Conexão</span>
        </div>
        <div className={`menu-item ${telaAtiva === 'fluxo' ? 'active' : ''}`} onClick={() => setTelaAtiva('fluxo')}>
          <div className="icon-container"><Icon name="fluxo" /></div>
          <span className="label-text">Fluxo de Mensagem</span>
        </div>
        <div className={`menu-item ${telaAtiva === 'api' ? 'active' : ''}`} onClick={() => setTelaAtiva('api')}>
          <div className="icon-container"><Icon name="api" /></div>
          <span className="label-text">Conexão API</span>
        </div>
        <div className={`menu-item ${telaAtiva === 'analise' ? 'active' : ''}`} onClick={() => setTelaAtiva('analise')}>
          <div className="icon-container"><Icon name="analise" /></div>
          <span className="label-text">Análise</span>
        </div>
        <div className={`menu-item ${telaAtiva === 'config' ? 'active' : ''}`} onClick={() => setTelaAtiva('config')}>
          <div className="icon-container"><Icon name="config" /></div>
          <span className="label-text">Configuração</span>
        </div>
      </div>
    </div>
  );
}