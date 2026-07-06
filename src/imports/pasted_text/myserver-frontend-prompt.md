Essa ideia melhora bastante a proposta do **MyServer**, pois transforma a plataforma em um **portal de descoberta de servidores**, e não apenas em um painel administrativo. Isso cria dois ambientes bem definidos: uma área pública para visitantes conhecerem os servidores e uma área privada para clientes administrarem seus serviços.

Abaixo está um prompt detalhado para orientar uma IA no desenvolvimento do front-end.

---

# Prompt – Desenvolvimento do Front-end do MyServer

## Visão Geral do Projeto

O **MyServer** é uma plataforma web moderna para hospedagem e gerenciamento de servidores de jogos. O sistema será dividido em duas áreas principais:

* **Área Pública**: qualquer visitante pode navegar pelos servidores públicos, conhecer comunidades e contratar planos.
* **Área Privada**: acessível apenas após autenticação, destinada aos clientes administrarem seus servidores.

O design deve seguir o padrão de plataformas modernas como Steam, Discord, Pterodactyl Panel, Cloudflare Dashboard e DigitalOcean, com foco em usabilidade, performance, responsividade e uma identidade visual profissional.

---

# Tecnologias

## Framework

* React 19
* Vite

## Linguagem

* TypeScript

## Interface

* Tailwind CSS
* Shadcn/UI
* Lucide React

## Navegação

* React Router DOM

## Comunicação com API

* Axios

## Estado Global

* Context API
* TanStack Query

## Formulários

* React Hook Form
* Zod

## Gráficos

* Recharts

## Notificações

* Sonner

---

# Fluxo Inicial

O usuário acessa:

```
https://myserver.com
```

A primeira tela **NÃO** será login.

Ela será uma vitrine de servidores públicos cadastrados na plataforma.

Somente servidores marcados como **Públicos** pelo proprietário aparecerão nesta página.

---

# Tela Inicial – Servidores Públicos

Esta será a página principal do sistema.

Seu objetivo é divulgar servidores hospedados na plataforma.

A aparência deve lembrar um catálogo moderno, semelhante à Steam.

Cada servidor será apresentado em um Card contendo:

* Banner do servidor
* Foto (Avatar)
* Nome
* Categoria
* Jogo
* Quantidade de jogadores online
* Status Online/Offline
* Número de curtidas
* Pequena descrição
* Botão **Visualizar**

Na parte superior da tela haverá:

* Logo do MyServer
* Campo de pesquisa
* Botão Login
* Botão Conheça os Planos

A pesquisa deverá funcionar em tempo real.

Será possível pesquisar por:

* Nome
* Categoria
* Jogo

---

# Tela de Visualização do Servidor

Ao clicar em **Visualizar**, será aberta uma página dedicada ao servidor.

Esta página deve ocupar praticamente toda a tela e apresentar todas as informações públicas do servidor.

## Cabeçalho

* Banner
* Foto de perfil
* Nome
* Categoria
* Jogo
* Status
* Jogadores Online
* Likes
* Botão Favoritar
* Botão Compartilhar

---

## Informações Gerais

Exibir:

Descrição completa

Regras

Versão

IP

Porta

Discord

Website

Instagram

YouTube

TikTok

Facebook

Links externos devem abrir em nova aba.

---

## Estatísticas

Mostrar:

Quantidade de jogadores online

Quantidade máxima

Tempo online

Data de criação

Quantidade de favoritos

Quantidade de visualizações

Quantidade de comentários

---

## Comentários

Abaixo das informações haverá um sistema de comentários.

Cada comentário exibirá:

Foto

Nome

Data

Texto

Likes

Resposta do proprietário (quando existir)

Para comentar será obrigatório estar autenticado.

Caso o visitante não esteja logado:

```
Faça login para comentar.
```

---

## Sistema de Favoritos

O botão Favoritar ficará disponível.

Caso o visitante clique sem estar logado:

Abrir modal solicitando login.

Após login:

Adicionar servidor aos favoritos.

---

## Sistema de Curtidas

Mostrar quantidade total de likes.

Usuário autenticado poderá curtir apenas uma vez.

---

## Sistema de Denúncias

Botão:

"Denunciar servidor"

Disponível apenas para usuários autenticados.

Ao clicar:

Modal contendo:

Motivo

Descrição

Enviar denúncia

---

# Tela de Planos

Disponível para qualquer visitante.

Exibir todos os planos comercializados.

Cada plano deverá conter:

Nome

Preço

RAM

CPU

Armazenamento

Slots

Backups

Suporte

Botão Contratar

Cards modernos.

---

# Tela Categorias

Apresentar todas as categorias.

Exemplo:

Minecraft

FiveM

Rust

ARK

CS2

Valheim

Terraria

Servidor VPS

Servidor Dedicado

Cada categoria exibirá:

Imagem

Quantidade de servidores

Botão visualizar

---

# Login

Ao clicar em Login.

Tela contendo:

Email

Senha

Lembrar acesso

Esqueci minha senha

Entrar

Cadastro

Autenticação via JWT.

---

# Área do Cliente

Após login o usuário será redirecionado para o Dashboard.

A partir deste momento aparecerá uma Sidebar.

---

# Sidebar

Itens:

Dashboard

Meus Servidores

Notificações

Suporte

Perfil

Configurações

Logout

---

# Dashboard

Resumo da conta.

Cards:

Servidores ativos

Servidores suspensos

Uso médio

Notificações

Tickets

Plano contratado

Atividades recentes

---

# Tela Meus Servidores

Lista apenas os servidores pertencentes ao usuário.

Cada servidor possuirá:

Nome

Status

CPU

RAM

Disco

Players

Categoria

Botão Gerenciar

---

# Gerenciamento do Servidor

Ao abrir um servidor.

Sidebar própria contendo:

Resumo

Console

Arquivos

Configurações

Logs

Backups

Usuários

Monitoramento

---

## Resumo

Mostrar:

Status

IP

Porta

Uso de CPU

Uso de RAM

Espaço em Disco

Jogadores

Uptime

Gráficos em tempo real.

---

## Console

Console semelhante ao Pterodactyl.

Área escura.

Logs em tempo real.

Campo para comandos.

Botão enviar.

Auto Scroll.

---

## Gerenciamento de Arquivos

Explorador completo.

Permitir:

Criar pasta

Criar arquivo

Editar

Excluir

Renomear

Upload

Download

Mover arquivos

Editor integrado

---

## Configurações do Servidor

Editar:

Nome

Descrição

Banner

Avatar

Servidor Público

Servidor Privado

Redes sociais

Discord

Instagram

YouTube

TikTok

Facebook

Mensagem inicial

Auto Start

Auto Backup

---

## Logs

Histórico completo.

Filtros.

Pesquisa.

Exportação.

---

## Backups

Lista de backups.

Criar

Excluir

Restaurar

Download

---

# Perfil

Alteração de:

Foto

Banner

Nome

Email

Senha

Autenticação em duas etapas

Sessões ativas

---

# Notificações

Lista completa.

Sistema semelhante ao Discord.

Categorias:

Sistema

Servidor

Financeiro

Suporte

Segurança

---

# Suporte

Sistema de Tickets.

Criar Ticket

Responder

Anexar arquivos

Fechar Ticket

Histórico completo

---

# Configurações Gerais

Tema

Idioma

Sessão

Privacidade

Preferências

Notificações

Integrações

---

# Responsividade

O sistema deve ser totalmente responsivo.

Desktop:

Sidebar fixa.

Tablet:

Sidebar recolhível.

Celular:

Menu Drawer.

Todos os cards devem se reorganizar automaticamente conforme a largura da tela.

---

# Objetivo Final

O front-end do **MyServer** deve oferecer uma experiência semelhante a uma plataforma de descoberta e gerenciamento de servidores de jogos. A área pública funciona como uma vitrine para atrair novos jogadores e clientes, permitindo explorar servidores públicos, visualizar detalhes, interagir com a comunidade e conhecer os planos disponíveis. Após a autenticação, o usuário acessa um painel administrativo completo para gerenciar seus próprios servidores, arquivos, configurações, monitoramento, suporte e notificações, utilizando uma interface moderna, intuitiva, responsiva e integrada à API REST do Django. O foco principal é unir facilidade de uso, desempenho e escalabilidade em uma única plataforma.
