Como o **MyServer** será uma plataforma profissional de gerenciamento de servidores dedicados, a tela de cadastro deve transmitir segurança, simplicidade e modernidade. Ela deve seguir a mesma identidade visual do restante da aplicação (Tailwind CSS + Shadcn/UI + Framer Motion).

Segue um prompt completo:

---

# Prompt – Tela de Cadastro (Sign Up) – MyServer

Desenvolva a tela de **Cadastro** do **MyServer** utilizando **React + TypeScript + Tailwind CSS + Shadcn/UI**, seguindo a identidade visual moderna da plataforma. A interface deve ser minimalista, responsiva e focada na experiência do usuário, inspirada em serviços como GitHub, Discord, DigitalOcean, Cloudflare e Railway.

A tela deve ser acessível pela rota `/cadastro` e também pelos botões **"Criar Conta"** presentes na Sidebar e nos modais de autenticação.

---

# Layout

A página deve ser dividida em duas colunas no desktop.

## Lado Esquerdo

Área institucional ocupando aproximadamente 45% da tela.

Deverá conter:

* Logo do MyServer.
* Nome da plataforma.
* Slogan.

Exemplo:

> Gerencie seus servidores de Minecraft e Terraria em um só lugar.

Logo abaixo apresentar alguns benefícios da plataforma.

Exemplo:

* Gerenciamento completo dos seus servidores.
* Monitoramento em tempo real.
* Upload e gerenciamento de arquivos.
* Backups automáticos.
* Console integrado.
* Painel moderno e responsivo.

Adicionar uma ilustração ou imagem relacionada ao universo de servidores de jogos.

No modo mobile esta coluna deverá desaparecer, exibindo apenas o formulário.

---

## Lado Direito

Centralizar verticalmente o formulário de cadastro.

No topo:

Título:

> Criar Conta

Subtítulo:

> Crie sua conta gratuitamente e comece a utilizar o MyServer.

---

# Campos do Formulário

## Nome Completo

Campo obrigatório.

Placeholder:

```text
Digite seu nome completo
```

---

## Nome de Usuário

Campo obrigatório.

Regras:

* Apenas letras, números e "_".
* Entre 3 e 20 caracteres.
* Verificar disponibilidade futuramente via API.

Placeholder:

```text
Escolha um nome de usuário
```

---

## E-mail

Campo obrigatório.

Placeholder:

```text
Digite seu e-mail
```

Validação em tempo real.

---

## Senha

Campo obrigatório.

Placeholder:

```text
Crie uma senha
```

Ao lado direito deverá existir um botão para mostrar ou ocultar a senha.

---

## Confirmar Senha

Campo obrigatório.

Placeholder:

```text
Confirme sua senha
```

Mostrar erro caso as senhas sejam diferentes.

---

# Indicador de Força da Senha

Enquanto o usuário digita, exibir uma barra de força da senha.

Critérios:

* Muito fraca
* Fraca
* Média
* Forte
* Muito forte

Também mostrar quais requisitos já foram atendidos:

* Mínimo de 8 caracteres.
* Pelo menos uma letra maiúscula.
* Pelo menos uma letra minúscula.
* Pelo menos um número.
* Pelo menos um caractere especial.

---

# Termos de Uso

Adicionar um checkbox obrigatório.

Texto:

> Li e aceito os Termos de Uso e a Política de Privacidade do MyServer.

Os textos "Termos de Uso" e "Política de Privacidade" devem ser clicáveis.

---

# Botão

Botão principal:

> Criar Conta

Ao enviar:

Desabilitar o botão.

Mostrar loading.

Exibir animação de carregamento.

---

# Login Social (Preparado para o futuro)

Adicionar uma seção separada por um divisor.

Texto:

> ou continue com

Exibir os botões:

* Google (desabilitado, com selo "Em breve")
* Discord (desabilitado, com selo "Em breve")
* GitHub (desabilitado, com selo "Em breve")

Esses botões não devem executar nenhuma ação por enquanto.

---

# Link Inferior

Texto:

> Já possui uma conta?

Botão:

Entrar

Redirecionar para:

```text
/login
```

---

# Validações

Utilizar React Hook Form + Zod.

Validar:

* Nome obrigatório.
* Usuário obrigatório.
* Usuário válido.
* E-mail válido.
* Senha forte.
* Senhas iguais.
* Checkbox obrigatório.

---

# Integração com a API

Ao clicar em "Criar Conta", enviar uma requisição para a API Django REST Framework.

Exemplo:

```http
POST /api/auth/register
```

Payload:

```json
{
  "nome": "João Silva",
  "username": "joaosilva",
  "email": "joao@email.com",
  "password": "Senha123@"
}
```

Se o cadastro for realizado com sucesso:

* Exibir uma notificação de sucesso.
* Redirecionar automaticamente para a tela de login.

Em caso de erro:

* Exibir mensagens específicas para cada campo retornadas pela API.

---

# Responsividade

### Desktop

Layout em duas colunas.

### Tablet

Imagem reduzida.

Formulário centralizado.

### Mobile

Apenas o formulário.

Todos os campos devem ocupar 100% da largura.

---

# Objetivo

A tela de cadastro deve transmitir confiança e profissionalismo, permitindo que novos usuários criem uma conta de forma rápida e intuitiva. O design deve seguir a identidade visual do **MyServer**, priorizando uma experiência limpa, acessível e responsiva, além de estar preparada para integração com a API Django REST Framework e futuras funcionalidades, como login social e verificação de disponibilidade de nome de usuário.
