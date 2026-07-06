# Prompt de Correção — Sidebar Global com Controle de Acesso por Autenticação (MyServer)

Implemente uma **Sidebar (Menu Lateral) Global** para o **MyServer**, que esteja presente em **todas as páginas do site**, incluindo tanto a **área pública** quanto a **área autenticada**. A Sidebar deve ser o principal componente de navegação da aplicação, mantendo a identidade visual consistente em toda a plataforma.

O sistema deverá utilizar **controle de acesso baseado no estado de autenticação do usuário**. A Sidebar nunca deverá desaparecer; apenas seu conteúdo deverá mudar conforme o usuário estiver autenticado ou não.

---

# Funcionamento Geral

A Sidebar deve ser exibida em todas as páginas da aplicação, incluindo:

* Página inicial (Servidores Públicos)
* Visualização de Servidor
* Planos
* Categorias
* Login
* Cadastro
* Recuperação de Senha
* Dashboard
* Meus Servidores
* Gerenciamento de Servidor
* Perfil
* Notificações
* Suporte
* Configurações

Independentemente da página acessada, a Sidebar deverá permanecer fixa, alterando apenas os itens disponíveis conforme o nível de acesso do usuário.

---

# Usuário Não Autenticado (Visitante)

Quando o usuário **não estiver logado**, a Sidebar deverá exibir apenas as funcionalidades públicas.

Itens disponíveis:

* Página Inicial
* Servidores Públicos
* Categorias
* Planos
* Sobre a Plataforma
* Central de Ajuda
* Login
* Criar Conta

Essas páginas devem ser totalmente acessíveis.

---

## Funcionalidades Restritas

As funcionalidades abaixo deverão permanecer visíveis para divulgar os recursos da plataforma, porém bloqueadas para visitantes:

* Dashboard
* Meus Servidores
* Servidores Favoritos
* Notificações
* Suporte
* Perfil
* Configurações
* Gerenciamento de Servidor
* Console
* Arquivos
* Monitoramento
* Backups
* Logs
* Usuários do Servidor

Esses itens devem aparecer visualmente diferentes, por exemplo:

* Ícone de cadeado.
* Opacidade reduzida.
* Cursor indicando restrição.
* Tooltip com a mensagem:

> "Faça login para acessar esta funcionalidade."

Ao clicar em qualquer funcionalidade protegida, **não deve ocorrer navegação**.

Em vez disso, deverá ser aberto um **modal moderno** contendo:

Título:

> Acesso Restrito

Mensagem:

> Para utilizar esta funcionalidade é necessário entrar em sua conta ou criar uma nova conta gratuitamente.

Botões:

* Entrar
* Criar Conta
* Fechar

Nenhuma informação privada deverá ser carregada antes da autenticação.

---

# Usuário Autenticado

Após realizar login com sucesso, a Sidebar deverá ser atualizada automaticamente sem recarregar a aplicação.

Todos os itens protegidos passam a ficar habilitados.

Itens disponíveis:

### Principal

* Dashboard
* Meus Servidores
* Servidores Favoritos

### Comunicação

* Notificações
* Suporte

### Conta

* Perfil
* Configurações

---

# Gerenciamento de Servidor

O submenu de gerenciamento só deverá aparecer quando o usuário selecionar um servidor pertencente à sua conta.

Enquanto nenhum servidor estiver selecionado, esse grupo não deverá ser exibido.

Após selecionar um servidor, deverá aparecer automaticamente:

* Visão Geral
* Console
* Arquivos
* Monitoramento
* Backups
* Configurações
* Logs
* Usuários do Servidor

Ao trocar de servidor, o submenu deverá permanecer, atualizando apenas os dados referentes ao novo servidor selecionado.

---

# Comportamento da Sidebar

A Sidebar deve permanecer fixa durante toda a navegação.

Somente o conteúdo principal da página deverá ser alterado.

Não deve haver recarregamento completo da aplicação.

Utilizar React Router para navegação.

O item correspondente à página atual deverá permanecer destacado.

Ao recolher a Sidebar:

* Mostrar apenas os ícones.
* Exibir tooltip ao passar o mouse.

---

# Rodapé da Sidebar

## Visitante

Enquanto o usuário não estiver autenticado, o rodapé deverá exibir:

* Avatar padrão
* Texto "Visitante"
* Botão Entrar
* Botão Criar Conta

---

## Usuário Logado

Após autenticação:

Mostrar:

* Foto do perfil
* Nome
* Plano contratado
* Cargo (caso exista)

Ao clicar:

Abrir menu contendo:

* Meu Perfil
* Configurações
* Notificações
* Central de Ajuda
* Alternar Tema
* Sair

---

# Segurança

A Sidebar nunca deve ser utilizada como mecanismo de autorização.

Ela apenas controla a interface.

Todas as permissões deverão ser validadas novamente pela API Django antes de retornar qualquer dado.

Mesmo que um usuário tente acessar diretamente uma rota protegida digitando a URL manualmente, o sistema deverá:

* verificar a autenticação;
* redirecionar para a tela de Login caso não exista um token válido;
* ou exibir uma página **403 - Acesso Negado** caso o usuário esteja autenticado, mas não possua permissão suficiente.

---

# Experiência do Usuário

A navegação deve transmitir a sensação de que toda a plataforma está integrada em um único ambiente.

O visitante deve conseguir explorar as funcionalidades disponíveis, visualizar quais recursos existem e entender o potencial da plataforma, mesmo sem estar autenticado. Ao mesmo tempo, as funcionalidades restritas devem incentivar o login de forma clara e elegante, sem esconder completamente os recursos disponíveis. Após a autenticação, a Sidebar deve se transformar automaticamente em um painel completo de gerenciamento, mantendo a mesma identidade visual e proporcionando uma transição fluida entre a área pública e a área privada do **MyServer**.
