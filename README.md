# Convert Coin 💱

Um conversor de moedas moderno e intuitivo desenvolvido como projeto de desafio. Permite conversão entre mais de 160 moedas diferentes com taxas de câmbio fixas para as principais moedas.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação e Execução

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd convert-coin
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
Abra seu navegador em `http://localhost:5173`

### Outros Comandos Disponíveis

```bash
# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Executar testes
npm run test

# Executar testes com interface
npm run test:ui

# Linting
npm run lint
```

## 💰 Moedas Suportadas

O projeto suporta **167 moedas diferentes** de países ao redor do mundo, incluindo:

### Principais Moedas
- **USD** - Dólar Americano 🇺🇸
- **EUR** - Euro 🇪🇺
- **BRL** - Real Brasileiro 🇧🇷
- **GBP** - Libra Esterlina 🇬🇧
- **JPY** - Iene Japonês 🇯🇵
- **CAD** - Dólar Canadense 🇨🇦
- **AUD** - Dólar Australiano 🇦🇺
- **CHF** - Franco Suíço 🇨🇭

### Outras Moedas Incluem
- Moedas da América Latina (ARS, MXN, CLP, COP, PEN, etc.)
- Moedas Europeias (NOK, SEK, DKK, PLN, CZK, etc.)
- Moedas Asiáticas (CNY, KRW, THB, INR, SGD, etc.)
- Moedas Africanas (ZAR, EGP, NGN, KES, etc.)
- E muitas outras...

## 🔄 Taxas de Câmbio Fixas

O projeto utiliza **taxas de câmbio fixas** para as principais conversões:

| De | Para | Taxa |
|---|---|---|
| BRL | USD | 0.18 |
| USD | BRL | 5.43 |
| BRL | EUR | 0.16 |
| EUR | BRL | 6.35 |
| USD | EUR | 0.86 |
| EUR | USD | 1.17 |

> **Nota**: As taxas fixas são utilizadas como fallback quando há algum erro na API de câmbio em tempo real, garantindo que o conversor continue funcionando mesmo em caso de falhas na conexão.

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **Material-UI** - Componentes de interface
- **Axios** - Cliente HTTP
- **Vitest** - Framework de testes
- **React Testing Library** - Testes de componentes

## 📱 Funcionalidades

- ✅ Conversão entre 167+ moedas
- ✅ Interface responsiva e moderna
- ✅ Taxas de câmbio fixas para principais moedas
- ✅ Suporte a bandeiras dos países
- ✅ Cálculo em tempo real
- ✅ Design intuitivo e acessível
- ✅ Testes automatizados

## 🧪 Testes

Execute os testes com:
```bash
npm run test
```

Para interface visual dos testes:
```bash
npm run test:ui
```

## 📦 Build de Produção

Para gerar a build de produção:
```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/` e podem ser servidos por qualquer servidor web estático.
