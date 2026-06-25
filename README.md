# 🚀 Motor Preditivo e Agente Cognitivo - Eletrofrio

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge\&logo=FastAPI\&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge\&logo=scikit-learn\&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-Local_LLM-black?style=for-the-badge\&logo=ollama\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)

Middleware preditivo *stateless* desenvolvido para a cadeia de frio do varejo alimentar. O sistema consome telemetria IoT de balcões refrigerados, utiliza Machine Learning para diagnosticar esforço mecânico, calcula o tempo estimado para falhas (ETA) e aciona um Agente LLM local para triagem técnica automatizada via WhatsApp.

---

## ✨ Principais Funcionalidades

* **Monitoramento em Background (APScheduler):** varredura assíncrona da telemetria a cada 5 minutos, sem bloquear a thread principal da API.
* **Detecção de Anomalias (Isolation Forest):** motor matemático multivariado que analisa o esforço mecânico cruzando temperatura, abertura de válvula e superaquecimento, reduzindo falsos positivos causados por ciclos normais de degelo.
* **Forecasting Preditivo (ETA):** utiliza Regressão Linear sobre janelas móveis para prever em quanto tempo o equipamento pode entrar em colapso térmico.
* **Agente Especialista Local (Llama 3.2 + RAG):** IA generativa rodando localmente, garantindo maior privacidade. Utiliza *Few-Shot Prompting* e uma base RAG com manuais e normas técnicas para gerar laudos técnicos objetivos.
* **Triagem Autônoma via WhatsApp:** integração com webhooks para enviar alertas e laudos diretamente ao celular do técnico de campo ou gerente da loja.

---

## 🛠️ Stack Tecnológica e Arquitetura

### Backend: Motor API & ML

* **FastAPI:** orquestração assíncrona de rotas e microsserviços.
* **Pandas & NumPy:** tratamento de dados ausentes, *forward fill* e cálculo de tendência linear.
* **Scikit-learn:** modelo preditivo não supervisionado com *Isolation Forest*.
* **APScheduler:** agendador de tarefas em background na mesma instância do Uvicorn.

### Inteligência Artificial

* **Ollama:** servidor local para execução de modelos de linguagem.
* **Llama 3.2 3B:** modelo fundacional otimizado com restrições negativas para respostas executivas de chão de fábrica.
* **RAG:** recuperação de contexto técnico com base em manuais, normas e instruções operacionais.

### Frontend e Integrações

* **React + Vite:** interface web para acompanhamento dos dados.
* **Recharts:** visualização gráfica dos indicadores.
* **Integração de Mensageria:** webhooks e APIs REST, como uTalk, Umbler ou CallMeBot, para envio de mensagens via WhatsApp.

---

## 📂 Estrutura da Arquitetura

```bash
poc-root/
│
├── backend/
│   ├── app/
│   │   ├── core/           # Configurações globais, variáveis de ambiente e logs
│   │   ├── routers/        # Endpoints da API: REST e webhooks WhatsApp
│   │   ├── services/       # Regras de negócio: ML, LLM, ingestão, ETA e RAG
│   │   └── scripts/        # Scripts de CLI: mocks e buscadores
│   ├── main.py             # Ponto de entrada: Lifespan e FastAPI
│   └── .env                # Variáveis de ambiente: chaves API e timers
│
└── frontend/
    ├── src/
    └── package.json
```

---

## ⚙️ Como Executar Localmente

### 1️⃣ Pré-requisitos

* Python 3.10+
* Node.js
* Ollama instalado na máquina host para o processamento da IA

Após instalar o Ollama, baixe o modelo executando no terminal:

```bash
ollama run llama3.2
```

---

### 2️⃣ Inicializando o Backend: FastAPI

Abra o terminal e navegue até a pasta do backend:

```bash
# 1. Crie e ative o ambiente virtual
python -m venv venv
```

No Linux ou macOS:

```bash
source venv/bin/activate
```

No Windows:

```bash
venv\Scripts\activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Configure o arquivo `.env` na raiz do backend:

```bash
echo "MONITORAMENTO_ATIVO=True" > .env
echo "INTERVALO_MONITORAMENTO_MIN=5" >> .env
```

Inicie o servidor:

```bash
uvicorn app.main:app --reload
```

A API estará disponível em:

```text
http://localhost:8000/docs
```

---

### 3️⃣ Inicializando o Frontend: React

Em outro terminal, navegue até a pasta do frontend:

```bash
npm install
npm run dev
```

Acesse o painel em:

```text
http://localhost:5173
```

---

## 🧪 Como Testar e Apresentar a Aplicação

Para facilitar apresentações acadêmicas, bancárias ou corporativas, o projeto conta com ferramentas de simulação e contingência.

---

### Opção A: Monitoramento Ativo com Logs de Background

Com o servidor rodando, observe o terminal.

A cada 5 minutos, ou no intervalo configurado no `.env`, o sistema fará automaticamente:

1. Varredura da telemetria;
2. Cálculo dos indicadores;
3. Estimativa de ETA;
4. Acionamento da LLM quando necessário;
5. Registro das ações nos logs da aplicação.

---

### Opção B: Buscador de Falhas e Sandbox via CLI

O projeto possui um script interativo que varre a infraestrutura buscando equipamentos com falha no momento ou gera uma sandbox simulada para apresentação.

Em um novo terminal, execute:

```bash
python -m app.scripts.buscar_equipamento_quebrado
```

O menu oferece duas opções principais:

* **Menu 1:** varre a API da Eletrofrio para encontrar falhas reais.
* **Menu 2:** gera dados mockados estruturados para testar o comportamento da LLM de forma controlada.

---

## 📌 Observações

* O sistema foi projetado para operar como middleware preditivo entre a telemetria IoT e os canais de atendimento técnico.
* A execução local da LLM reduz dependência de APIs externas e aumenta a privacidade dos dados operacionais.
* O uso de simulações facilita demonstrações em ambientes onde a integração oficial ainda não está disponível.

---

## 🎓 Sobre o Projeto

Projeto desenvolvido para a faculdade juntamente com a empresa Eletrofrio, com foco em manutenção preditiva, integração de sistemas, machine learning aplicado e agentes cognitivos locais.
