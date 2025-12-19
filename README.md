# 📱 LearniFy - Plataforma de Blogging Educacional

![Status](https://img.shields.io/badge/STATUS-CONCLUÍDO-brightgreen?style=for-the-badge&logo=appveyor)
![Mobile](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Backend](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Database](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

> **TCC - Análise e Desenvolvimento de Sistemas**
> Uma rede social acadêmica focada em mobile para conectar alunos e professores através do compartilhamento ágil de conhecimento.

---

## 📸 Demonstração

|                         Feed Principal (Mobile)                         |                             Upload de Imagem                              |                          Versão Web (Vercel)                           |
| :---------------------------------------------------------------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------: |
| <img src="https://via.placeholder.com/150x300?text=Feed" width="150" /> | <img src="https://via.placeholder.com/150x300?text=Upload" width="150" /> | <img src="https://via.placeholder.com/150x300?text=Web" width="150" /> |


---

## 🛠 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando uma arquitetura **Full-Stack JavaScript** moderna:

### 📱 Front-End (Mobile & Web)

- **React Native (Expo):** Framework core para desenvolvimento híbrido.
- **TypeScript:** Tipagem estática para maior segurança e manutenibilidade.
- **NativeWind (TailwindCSS):** Estilização utilitária e responsiva.
- **Axios & Fetch:** Comunicação com API e upload de arquivos `multipart/form-data`.
- **Context API:** Gerenciamento de estado global (Autenticação).
- **Expo SecureStore:** Armazenamento seguro de tokens no dispositivo.

### ⚙️ Back-End (API REST)

- **Node.js & Express:** Servidor de alta performance.
- **MongoDB Atlas:** Banco de dados NoSQL na nuvem.
- **AWS S3:** Armazenamento de objetos (imagens dos posts).
- **Jest & Supertest:** Testes automatizados de integração.
- **Swagger:** Documentação automática da API.

---

## 🏗 Arquitetura e Desafios

### Arquitetura em Camadas

Adotamos o padrão **MVC (Model-View-Controller)** no Back-End para separar responsabilidades:

1.  **Models:** Schemas do Mongoose (User, Post, Comment).
2.  **Services:** Regras de negócio (ex: lógica de like, comunicação com S3).
3.  **Controllers:** Validação de entrada e resposta HTTP.

### Desafios Superados

1.  **Compatibilidade Web:** O uso de bibliotecas nativas como `SecureStore` quebrou a versão web. **Solução:** Implementamos um padrão _Adapter_ (`storage.ts`) que detecta a plataforma e alterna automaticamente entre `localStorage` (Web) e `SecureStore` (Mobile).
2.  **Upload no Android:** O Axios apresentou instabilidade com `FormData` no Android. **Solução:** Utilizamos a API nativa `fetch` para uploads, garantindo a integridade dos dados binários.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (v18+)
- Conta no Expo (para rodar no celular)
- Docker (opcional, para rodar banco localmente)

### 1. Back-End

```bash
cd Back-End
npm install
# Crie um arquivo .env com suas chaves (MONGO_URI, AWS_KEYS...)
npm run dev
# Para rodar os testes:
npm test
```

### 2. Front-End

```bash
cd Front-End
npm install
# Rodar no celular/emulador:
npx expo start
# Rodar na Web (modo dev):
npx expo start --web
```

---
## 📦 Deploy e Entrega

- **API:** Hospedada no Render.

- **Web App:** Hospedado na Vercel.

- **Mobile:** APK gerado via Expo EAS.

---
### Desenvolvido por Renan Santos de Oliveira