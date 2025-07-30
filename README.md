# CodeLeap Technical Test - Frontend

Este projeto é a minha solução para o teste técnico de Frontend da CodeLeap. O objetivo era criar uma aplicação simples de rede social com funcionalidades CRUD (Criar, Ler, Atualizar, Deletar).

## Tecnologias Utilizadas

- **Next.js**: Framework para aplicações React.
- **Tailwind CSS v4**: Framework de CSS para estilização rápida e responsiva.
- **Shadcn/UI**: Biblioteca de componentes reutilizáveis e acessíveis, integrada ao Tailwind.
- **TypeScript**: Linguagem de programação para garantir um código mais robusto e seguro.

## Funcionalidades Implementadas

### Tela de Login

- Uma tela de login simples com um campo para o nome de usuário.
- O botão "ENTER" fica desativado até que o campo seja preenchido.
- O layout é responsivo para diferentes tamanhos de tela.

### Tela Principal (Feed)

- Um feed de posts com cabeçalho fixo.
- Um formulário para a criação de novos posts.
- A lista de posts é exibida em cards, com título, nome de usuário, conteúdo e tempo.
- **Operações CRUD**:
  - **Criar**: É possível criar novos posts usando o formulário.
  - **Ler**: Os posts são exibidos em uma lista.
  - **Deletar**: Ao clicar no ícone de lixeira, um modal de confirmação aparece. O post é removido da lista após a confirmação.
  - **Atualizar**: Ao clicar no ícone de edição, um modal aparece com o título e conteúdo do post preenchidos, permitindo a alteração dos dados.
- Os ícones de edição e exclusão estão presentes em todos os posts.

## Próximos Passos (Diferenciais)

Para me destacar no teste, estou trabalhando na implementação das seguintes funcionalidades:

- **Login Persistente**: Usar `localStorage` para manter o usuário logado e redirecionar entre as páginas de login e principal.
- **Simulação de API**: Usar `useEffect` e estados de carregamento (`loading state`) para simular chamadas de API na página principal.

## Como Rodar o Projeto Localmente

1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`

---

**Autor**: Felipe Campos Assis
