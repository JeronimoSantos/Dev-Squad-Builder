# ⚽ Dev Squad Builder
<img src="https://img.shields.io/badge/license-MIT-green" alt="licença" />

Inspirado nos modos de construção de time dos videogames de futebol (FIFA Ultimate Team, eFootball), o **Dev Squad Builder** é uma aplicação web onde você monta seu time dos sonhos usando pessoas reais da **bolha dev brasileira** — devs, influencers, educadores e criadores de conteúdo de tecnologia.

> Projeto open source — contribuições são muito bem-vindas! Veja a seção [Como Contribuir](#como-contribuir).

---

## Funcionalidades

- **Formação tática** — escolha entre 12 formações clássicas do futebol
- **Campo interativo** — campo com linhas SVG, slots clicáveis e fotos dos jogadores posicionados
- **Elenco de 28 devs brasileiros** — com atributos, posições e overall calculado
- **Técnicos brasileiros** — cada um com filosofia própria e bônus que afetam os atributos do time
- **Funções especiais** — atribua capitão, cobrador de pênalti, cobrador de falta e cobrador de escanteio
- **Estatísticas do time** — média de atributos em tempo real com bônus do técnico aplicados
- **Busca de jogadores** — filtre por nome, handle, role ou tecnologia
- **Exportar card para redes sociais** — dois estilos de card para compartilhar: **Social** (1080×1080px, ideal para Instagram/Twitter/LinkedIn) e **Transmissão** (1080×608px, estilo broadcast FIFA, ideal para YouTube/banners)
- **Persistência local** — o time montado é salvo automaticamente no navegador (localStorage)
- **Compartilhar por link** — gera uma URL com o time inteiro codificado no hash
- **Elenco customizável** — adicione, edite e remova jogadores e técnicos diretamente pelo painel
- **Paginação na lista de jogadores** — 6 jogadores por página para facilitar a navegação
- **Login e sincronização** — autenticação via e-mail/senha, Google ou GitHub com sincronização automática entre dispositivos
- **Dark / Light mode** — alterne entre Camisa Azul (escuro) e Camisa Amarela (claro) com um clique
- **Layout responsivo** — experiência otimizada para desktop e dispositivos móveis
- **Animações e transições** — entrada de jogadores no campo, troca de painéis e abertura de modais animados
- **Cursor personalizado** — cursor de bola de futebol em toda a aplicação
- **Favicon personalizado** — ícone de camisa de futebol na aba do navegador

---

## Posições (nomenclatura brasileira)

| Sigla | Posição               |
|-------|-----------------------|
| GO    | Goleiro               |
| ZA    | Zagueiro              |
| LE    | Lateral Esquerdo      |
| LD    | Lateral Direito       |
| VOL   | Volante               |
| MLG   | Meia                  |
| MLE   | Meia Lateral Esquerdo |
| MLD   | Meia Lateral Direito  |
| MAT   | Meia Atacante         |
| SA    | Segundo Atacante      |
| PTE   | Ponta Esquerda        |
| PTD   | Ponta Direita         |
| CA    | Centroavante          |

---

## Elenco de Jogadores

| Jogador               | Handle              | Posições   | Tags principais                        |
|-----------------------|---------------------|------------|----------------------------------------|
| Filipe Deschamps      | @FilipeDeschamps    | MAT, PTE   | JavaScript, Node.js, YouTube           |
| Giovanni Bassi        | @giovannibassi      | ZA, VOL    | .NET, C#, DDD, Arquitetura             |
| Mayk Brito            | @maykbrito          | PTE, MAT   | JavaScript, Rocketseat, HTML, CSS      |
| Lucas Montano         | @lucasmontano       | PTD, MLD   | Flutter, Dart, Mobile, YouTube         |
| Diego Fernandes       | @dieegosf           | MLG, MAT   | React, Node.js, Rocketseat, TypeScript |
| Willian Justen        | @Willian_justen     | LD, MLD    | SVG, CSS, TypeScript, Open Source      |
| Henrique Bastos       | @henriquebastos     | VOL, ZA    | Python, Django, Open Source            |
| Loiane Groner         | @loiane             | MLG, MAT   | Java, Angular, Spring, Educação        |
| Rodrigo Manguinho     | @rmanguinho         | ZA, VOL    | TDD, Clean Architecture, TypeScript    |
| Iuri Silva            | @iuricode           | PTE, MLE   | UI, CSS, React, Design System          |
| Leandro TK            | @leandrotk_         | MLG, MLE   | TypeScript, React, Python              |
| Fábio Vedovelli       | @vedovelli          | LE, MLE    | Vue.js, Nuxt, Testes, JavaScript       |
| Elton Minetto         | @eminetto           | ZA, LE     | Go, PHP, Clean Architecture            |
| Jaydson Gomes         | @jaydson            | MLG, VOL   | JavaScript, BrazilJS, Open Source      |
| Robson Marques        | @oRobsonMarques     | GO         | Rocketseat, React Native, Liderança    |
| Natan Souza           | @designernatan      | PTD, MLD   | HTML, CSS, Design, Acessibilidade      |
| Alda Rocha            | @mjcoffeeholics     | CA         | Python, Django, Diversidade            |
| Luan Moreno           | @lnmoreno           | CA, MAT    | Node.js, React, TypeScript             |
| Ana Paula Lima        | @anaguiar           | MLG, MLE   | DevRel, Comunidade, Inclusão           |
| Eduardo Zanfranceschi | @zanfranceschi      | ZA, LD     | Sistemas Distribuídos, .NET, Backend   |
| Lauro Moura           | @lauromoura         | LE, VOL    | C++, EFL, Open Source, Linux           |
| Mano Deyvin           | @manodeyvin         | CA, PTD    | JavaScript, YouTube, Humor             |
| Guilherme Lima        | @guilhermeonrails   | MLG, VOL   | Python, Django, Alura                  |
| Rafa Ballerini        | @rafaballerini      | PTE, MLE   | CSS, HTML, Alura, Frontend             |
| Attekita Dev          | @attekita           | SA, MAT    | Carreira, Engenharia de Software       |
| Monica Hillman        | @MonicaHillman      | MLG, MLE   | DevRel, Comunidade, Inclusão           |
| O Primo Dev           | @oprimodev          | CA, SA     | JavaScript, YouTube, Iniciantes        |
| Venilton FalvoJr      | @falvojr            | VOL, ZA    | Java, DIO, Open Source, Android        |

---

## Técnicos

| Técnico            | Handle             | Filosofia                             | Bônus          |
|--------------------|--------------------|---------------------------------------|----------------|
| Gustavo Guanabara  | @gustavoguanabara  | Educação para Todos                   | +7 COM, +5 CST |
| Fábio Akita        | @Akitaonrails      | Pense por Si Mesmo                    | +8 LGC, +4 INV |
| Paulo Silveira     | @paulo_caelum      | Ensinar é Aprender Duas Vezes         | +5 LGC, +6 COL |
| Felipão DIO        | @felipeaguinaldo   | Pratique, Pratique, Pratique          | +8 CST, +4 COL |
| Gabriel Fróes      | @gabrielfroes      | Criatividade é uma Habilidade Técnica | +8 INV, +4 COM |
| Vanessa Weber      | @vanessaweber      | Comunidade Transforma Carreiras       | +9 COL, +4 COM |

---

## Atributos dos Jogadores

| Sigla | Atributo     | Descrição                                  |
|-------|--------------|--------------------------------------------|
| LGC   | Lógica       | Capacidade de resolver problemas complexos |
| COM   | Comunicação  | Clareza ao transmitir conhecimento         |
| COL   | Colaboração  | Contribuição para times e comunidade       |
| INV   | Inovação     | Criação de soluções novas e criativas      |
| CST   | Consistência | Frequência e qualidade de entrega          |

---

## Funções Especiais

| Função                | Descrição                          |
|-----------------------|------------------------------------|
| Capitão               | Líder do time, inspira todos       |
| Cobrador de Pênalti   | Frieza total sob pressão           |
| Cobrador de Falta     | Precisão e criatividade            |
| Cobrador de Escanteio | Visão de jogo e estratégia         |

Cada jogador pode ter no máximo uma função. Ao remover um jogador do campo, sua função é limpa automaticamente.

---

## Formações disponíveis

| Formação | Características                                               |
|----------|---------------------------------------------------------------|
| 4-3-3    | 3 MLG no meio, 2 pontas + 1 CA                               |
| 4-4-2    | 2 MLE/MLD nas alas, 2 CA                                     |
| 4-2-3-1  | 2 VOL na base, trio ofensivo (PTE + MAT + PTD) + 1 CA        |
| 4-3-2-1  | "Árvore de Natal" — 3 MLG, 2 MAT e 1 CA em pirâmide         |
| 4-3-1-2  | 3 MLG + 1 MAT avançado, dupla de centroavantes               |
| 4-2-1-2  | Losango no meio: 2 VOL + 1 MAT + 2 MLE/MLD ofensivos + 1 CA |
| 4-1-4-1  | 1 VOL pivô, 4 meias em bloco + 1 CA isolado                  |
| 3-4-3    | 3 ZA, 4 meias com MLE/MLD, trio de ataque com pontas         |
| 3-5-2    | 3 ZA, meio-campo amplo com MLE/MLD, 2 CA                     |
| 5-2-2-1  | 5 defensores, 2 VOL, 2 MAT de apoio + 1 CA                  |
| 5-3-2    | 5 defensores, 3 MLG, 2 CA                                    |
| 3-1-4-2  | 3 ZA + 1 VOL pivô, 4 meias largos (MLE/MLD), 2 CA           |

---

## Card de Compartilhamento

Ao posicionar pelo menos um jogador no campo, o botão **Compartilhar** aparece no header.

**Fluxo:**
1. Clique em **Compartilhar** no canto superior direito
2. Escolha o estilo do card: **Social** ou **Transmissão**
3. Clique em **Gerar Prévia** para renderizar o card
4. Clique em **Baixar PNG** para salvar o arquivo

### Estilo Social (1080×1080px)

Ideal para Instagram, Twitter/X e LinkedIn.

- Campo tático interativo com foto, nome, posição e overall de cada jogador
- Badges de funções especiais (C = Capitão, P = Pênalti, F = Falta, E = Escanteio)
- Painel com nome e filosofia do técnico
- Barras de atributos médios com bônus do técnico aplicados
- Painel de funções especiais atribuídas
- Degradê brasileiro (amarelo → verde → azul) no canto inferior esquerdo
- Hashtags `#DevSquadBuilder · #BolhaDev · #CopaDoMundo2026 · #UltimateTeam · #Gamification`
- Arquivo: `dev-squad-4-3-3.png`

### Estilo Transmissão (1080×608px)

Layout estilo broadcast/FIFA — ideal para banners, thumbnails de YouTube e stories horizontais.

- **Coluna esquerda:** campo tático em miniatura com pontos/fotos dos jogadores posicionados + foto e nome do técnico
- **Coluna central:** lista completa de jogadores ordenados por posição, com foto, overall, badge de função e posição
- **Coluna direita:** foto em destaque do capitão (ou jogador com maior overall), com nome e overall sobrepostos
- Barra de acento tricolor (amarelo → verde → azul) no topo
- Degradê brasileiro no canto inferior esquerdo
- Cabeçalho com "MEU TIME" em Bebas Neue, badge de formação e overall médio
- Arquivo: `dev-squad-4-3-3-broadcast.png`

---

## Compartilhamento por Link

Ao posicionar pelo menos um jogador no campo, o botão **Copiar Link** aparece no header. O link codifica todo o time no hash da URL (`#...`) — sem backend, sem banco de dados.

**Fluxo:**
1. Monte seu time normalmente
2. Clique em **Copiar Link** — o botão muda para "✓" por 2 segundos
3. Cole o link em qualquer lugar (chat, redes sociais, e-mail)
4. Quem abrir o link verá o time montado automaticamente

**Formato da URL:**
```
https://seusite.com/#eyJmIjoiNDMzIiwiYyI6...
```

`lib/shareUrl.ts` serializa apenas os IDs em JSON compacto e converte para base64 URL-safe. O hash não é enviado ao servidor, preservando privacidade e compatibilidade com deploys estáticos.

---

## Gerenciamento de Jogadores e Técnicos

O usuário tem controle total sobre o elenco e o banco de técnicos, sem precisar editar arquivos JSON.

### Jogadores

Na aba **Jogadores**, abaixo da barra de busca, há o botão **+ Novo Jogador**. Ao passar o mouse sobre qualquer card, dois botões aparecem:

| Botão        | Ação                                         |
|--------------|----------------------------------------------|
| ✎ (azul)     | Abre o formulário de edição preenchido       |
| ✕ (vermelho) | Remove o jogador da lista (pede confirmação) |

**Formulário:** Nome, handle, URL da foto (opcional), role, posições, 5 atributos (slider 1–99) e tags.

### Técnicos

Na aba **Técnico**, o botão **+ Novo Técnico** aparece no rodapé da lista com os mesmos botões de hover. Ao remover um técnico selecionado, a seleção é limpa automaticamente.

---

## Login e Sincronização (Supabase)

O botão **Entrar** no canto superior direito permite criar conta ou fazer login para sincronizar o squad e os dados customizados entre dispositivos.

### Métodos de autenticação

| Método          | Status      |
|-----------------|-------------|
| E-mail + senha  | ✅ Funcional |
| Google OAuth    | ✅ Funcional |
| GitHub OAuth    | ✅ Funcional |

### Como funciona a sincronização

1. Ao fazer login, os dados da nuvem são carregados e aplicados ao estado local
2. Qualquer alteração no squad ou no elenco customizado é enviada automaticamente ao banco (debounce de 1–1,5s)
3. O mesmo squad fica disponível em qualquer browser onde o usuário esteja logado

### Banco de dados (Supabase PostgreSQL)

Duas tabelas com Row Level Security (RLS) — cada usuário acessa apenas seus próprios dados:

```sql
squads(user_id PK, squad_data JSONB, updated_at)
user_data(user_id PK, custom_data JSONB, updated_at)
```

### Configuração do ambiente local

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Execute `supabase/schema.sql` no SQL Editor do Supabase
3. Crie o arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

---

## OAuth — Configuração Completa

### GitHub OAuth

**1. Criar o OAuth App no GitHub**

Acesse [github.com/settings/developers](https://github.com/settings/developers) → **OAuth Apps** → **New OAuth App**:

| Campo                      | Valor                                              |
|----------------------------|----------------------------------------------------|
| Application name           | Dev Squad Builder                                  |
| Homepage URL               | URL do seu site (Vercel ou localhost)              |
| Authorization callback URL | `https://<project-id>.supabase.co/auth/v1/callback`|

Após criar, copie o **Client ID** e gere um **Client Secret**.

**2. Habilitar no Supabase**

Supabase Dashboard → **Authentication** → **Providers** → **GitHub**:
- Cole o Client ID e o Client Secret
- Salve

---

### Google OAuth

**1. Criar credenciais no Google Cloud Console**

Acesse [console.cloud.google.com](https://console.cloud.google.com) → **APIs e serviços** → **Credenciais** → **Criar credenciais** → **ID do cliente OAuth**:

| Campo                              | Valor                                               |
|------------------------------------|-----------------------------------------------------|
| Tipo de aplicativo                 | Aplicativo da Web                                   |
| Origens JavaScript autorizadas     | URL do site (Vercel) + `http://localhost:3000`      |
| URIs de redirecionamento autorizados | `https://<project-id>.supabase.co/auth/v1/callback` |

Copie o **Client ID** e o **Client Secret**.

> Para recuperar as credenciais: Google Cloud Console → **APIs e serviços** → **Credenciais** → clique no nome do cliente OAuth.

**2. Habilitar no Supabase**

Supabase Dashboard → **Authentication** → **Providers** → **Google**:
- Cole o Client ID e o Client Secret
- Salve

---

### Configuração de Redirect no Supabase (obrigatório para produção)

Supabase Dashboard → **Authentication** → **URL Configuration**:

| Campo        | Valor                          |
|--------------|--------------------------------|
| Site URL     | URL de produção na Vercel      |
| Redirect URLs| `https://seu-dominio.vercel.app/**` e `http://localhost:3000/**` |

> Sem essa configuração, o OAuth redireciona para `localhost` mesmo em produção.

---

## Dark / Light Mode

O botão **sol/lua** no header alterna entre dois temas inspirados nos uniformes da Seleção Brasileira:

| Modo              | Tema         | Cores principais                                    |
|-------------------|--------------|-----------------------------------------------------|
| 🌙 Camisa Azul    | Dark (padrão)| Azul marinho `#0d0d1a`, amarelo `#FBBF24`, branco   |
| ☀️ Camisa Amarela | Light        | Azul-branco `#EFF6FF`, azul Brasil `#1E3A8A`, amarelo |

- A preferência é salva no `localStorage` e restaurada ao recarregar
- Anti-FOUC: o tema é aplicado via script inline no `<head>` antes da hidratação do React
- O amarelo permanece inalterado em ambos os modos

---

## Layout Responsivo

| Tela    | Layout                                                         |
|---------|----------------------------------------------------------------|
| Mobile  | Campo no topo (altura fixa `46vh`) + painel com abas embaixo  |
| Desktop | 3 colunas: painel esquerdo · campo central · stats à direita  |

- Campo: `max-w-55` (mobile) → `max-w-xs` (tablet) → `max-w-sm` (desktop)
- Jogadores no campo: `w-8 h-8` (mobile) → `w-12 h-12` (desktop)
- Stats: aba separada no mobile, painel fixo no desktop

---

## Animações e Transições

| Animação          | Onde ocorre                                      | Duração |
|-------------------|--------------------------------------------------|---------|
| `slot-enter`      | Entrada de jogadores no campo (efeito mola)      | 0,4s    |
| `fade-up`         | Troca entre painéis do menu lateral              | 0,22s   |
| `slide-down`      | Banner de importação de squad por link           | 0,28s   |
| `modal-appear`    | Abertura de modais (scale + translateY)          | 0,22s   |
| Posição dos slots | Transição suave ao trocar formação (`left/top`)  | 0,45s   |

---

## Persistência Local (localStorage)

| Chave                   | Conteúdo                                         |
|-------------------------|--------------------------------------------------|
| `dev-squad-builder`     | Formação, jogadores, técnico e funções do squad  |
| `dev-squad-custom-data` | Jogadores e técnicos customizados pelo usuário   |
| `dev-squad-theme`       | Preferência de tema (dark / light)               |

O estado é restaurado automaticamente ao recarregar. O botão **Resetar** limpa o squad da memória e do localStorage.

---

## Stack Técnica

| Tecnologia            | Versão   | Uso                                                      |
|-----------------------|----------|----------------------------------------------------------|
| Next.js               | 16.2.9   | Framework React com App Router                           |
| React                 | 19.2.4   | Biblioteca de UI                                         |
| TypeScript            | ^5       | Tipagem estática em todo o projeto                       |
| Tailwind CSS          | ^4       | Estilização utilitária com variáveis CSS para temas      |
| Zustand               | ^5.0.14  | Gerenciamento de estado (squad, custom data, auth, tema) |
| @supabase/supabase-js | ^2.108.2 | Autenticação + banco de dados PostgreSQL                 |
| html-to-image         | ^1.11.13 | Geração de imagem PNG para compartilhar                  |

---

## Estrutura do Projeto

```
projeto-squad-builder/
├── app/
│   ├── page.tsx              # Página principal — layout, tabs, share, hash hydration
│   ├── layout.tsx            # Layout raiz — metadados, tema inline, anti-FOUC script
│   └── globals.css           # Animações customizadas e scrollbar
├── components/
│   ├── TacticalField.tsx     # Campo tático SVG com slots animados e responsivos
│   ├── PlayerCard.tsx        # Card de jogador com botões hover de edição/remoção
│   ├── PlayerSelector.tsx    # Lista paginada com busca e CRUD de jogadores
│   ├── PlayerFormModal.tsx   # Modal formulário para criar/editar jogador
│   ├── FormationPicker.tsx   # Seletor de formações táticas
│   ├── CoachPicker.tsx       # Seletor de técnico com CRUD
│   ├── CoachFormModal.tsx    # Modal formulário para criar/editar técnico
│   ├── SquadStats.tsx        # Estatísticas médias do time com bônus
│   ├── SquadRolesPanel.tsx   # Painel de funções especiais
│   ├── ShareCard.tsx         # Card 1080×1080px estilo Social para exportação
│   ├── ShareCardBroadcast.tsx# Card 1080×608px estilo Transmissão (broadcast FIFA)
│   ├── ShareModal.tsx        # Modal com seletor de estilo, prévia e download
│   ├── AuthModal.tsx         # Modal de login/cadastro/recuperação de senha
│   ├── AuthButton.tsx        # Botão de login/logout no header
│   ├── AppInit.tsx           # Inicializa o listener de autenticação Supabase
│   ├── SyncProvider.tsx      # Sincronização automática squad ↔ nuvem (debounced)
│   ├── ThemeProvider.tsx     # Aplica data-theme no <html> ao montar/alterar tema
│   └── ThemeButton.tsx       # Botão sol/lua para alternar dark e light mode
├── lib/
│   ├── supabase.ts           # Singleton do cliente Supabase (browser-only)
│   ├── db.ts                 # Operações de leitura/escrita no banco
│   ├── shareUrl.ts           # encodeSquad() / decodeSquad() para URL sharing
│   └── photoFallback.ts      # Fallback de foto por handle ou iniciais SVG
├── store/
│   ├── squadStore.ts         # Store Zustand do squad com persist
│   ├── customDataStore.ts    # Store de jogadores/técnicos customizados com persist
│   ├── authStore.ts          # Store de autenticação (user, session, loading)
│   └── themeStore.ts         # Store de tema (dark/light) com persist
├── supabase/
│   └── schema.sql            # Script SQL — tabelas, RLS e triggers
├── types/
│   └── index.ts              # Tipos TypeScript do domínio
├── public/
│   ├── bola-de-futebol.png   # Cursor personalizado
│   └── camisa-de-futebol.png # Favicon da aplicação
└── data/
    ├── players.json          # 28 devs brasileiros com atributos
    ├── formations.json       # 12 formações com coordenadas x/y dos slots
    └── coaches.json          # 6 técnicos com filosofia e bônus
```

---

## Deploy na Vercel

### Primeiro deploy

1. Faça push do projeto para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) → **Add New Project** → importe o repositório
3. Antes de confirmar o deploy, adicione as variáveis de ambiente:

| Variável                    | Valor                              |
|-----------------------------|------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`  | `https://<project-id>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_...`           |

4. Clique em **Deploy**

### Atualizando o deploy

A cada `git push` para a branch `main`, a Vercel realiza um novo deploy automaticamente.

Para forçar um redeploy sem alteração de código: **Vercel Dashboard** → **Deployments** → menu `···` no deploy mais recente → **Redeploy**.

### Adicionando variáveis de ambiente após o deploy

**Vercel Dashboard** → **Settings** → **Environment Variables** → adicione a variável → **Save** → faça um redeploy para aplicar.

> Variáveis com prefixo `NEXT_PUBLIC_` são expostas no browser — use sempre a chave **anon/publishable** do Supabase, nunca a **service_role**.

---

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/projeto-squad-builder.git
cd projeto-squad-builder

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.local.example .env.local
# edite .env.local com suas credenciais do Supabase

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

**Fluxo sugerido:**
1. Escolha uma **Formação** na aba correspondente
2. Selecione um **Técnico** e veja os bônus ativos
3. Clique em um slot vazio no campo → **Jogadores** → clique no dev para posicioná-lo
4. Atribua **Funções** especiais na aba Funções
5. Acompanhe as **Estatísticas** no painel lateral (desktop) ou aba Stats (mobile)
6. Clique em **Copiar Link** para compartilhar o time pela URL
7. Clique em **Compartilhar** → escolha o estilo **Social** (1080×1080) ou **Transmissão** (1080×608) → **Gerar Prévia** → **Baixar PNG**
8. Use o botão **☀️/🌙** para alternar entre Camisa Amarela e Camisa Azul
9. Clique em **Entrar** para criar conta e sincronizar o squad entre dispositivos

> O time é salvo automaticamente — ao fechar e reabrir a aba, o squad estará exatamente onde você deixou.

---

## Como Contribuir

Contribuições são muito bem-vindas! Seja corrigindo um bug, adicionando um novo dev ao elenco, propondo uma nova formação ou melhorando a UI — toda ajuda é válida.

### Antes de começar

- Verifique se já existe uma [Issue](../../issues) aberta para o que você quer fazer
- Se não existir, abra uma antes de começar a codar — isso evita trabalho duplicado
- Para mudanças grandes (nova feature, refactor), discuta a ideia na Issue antes de abrir o PR

### Passo a passo

```bash
# 1. Faça um fork do repositório e clone localmente
git clone https://github.com/seu-usuario/projeto-squad-builder.git

# 2. Crie uma branch descritiva a partir da main
git checkout -b feat/adicionar-jogador-john-doe
# ou: fix/corrigir-calculo-overall
# ou: docs/atualizar-readme

# 3. Faça as alterações e commite seguindo o padrão Conventional Commits
git commit -m "feat: adicionar John Doe ao elenco de devs"

# 4. Envie a branch para o seu fork
git push origin feat/adicionar-jogador-john-doe

# 5. Abra um Pull Request para a branch main deste repositório
```

### Padrão de commits (Conventional Commits)

Use o formato `tipo: descrição curta em português`:

| Tipo       | Quando usar                                      |
|------------|--------------------------------------------------|
| `feat`     | Nova funcionalidade                              |
| `fix`      | Correção de bug                                  |
| `docs`     | Alterações apenas na documentação                |
| `style`    | Formatação, sem mudança de lógica                |
| `refactor` | Refatoração sem nova feature ou correção de bug  |
| `chore`    | Tarefas de manutenção (deps, config, build)      |

**Exemplos:**
```
feat: adicionar formação 4-5-1 com coordenadas dos slots
fix: corrigir cálculo de overall quando técnico não está selecionado
docs: adicionar guia de contribuição ao README
chore: atualizar @supabase/supabase-js para 2.109.0
```

### Boas práticas de código

**TypeScript**
- Sempre tipar props de componentes com `interface`
- Evitar `any` — prefira tipos específicos ou `unknown`
- Exportar tipos reutilizáveis em `types/index.ts`

**Componentes React**
- Um componente por arquivo, nomeado igual ao arquivo
- Marcar com `"use client"` apenas componentes que usam hooks ou eventos de browser
- Extrair lógica complexa para hooks customizados em `hooks/`

**Estado (Zustand)**
- Novos dados globais → novo store em `store/`
- Usar `persist` apenas quando faz sentido manter após reload
- Não acessar stores diretamente fora de componentes React

**Estilo (Tailwind CSS v4)**
- Preferir classes utilitárias a CSS inline
- Usar as variáveis de tema (`bg-(--c-bg)`, `bg-(--c-modal)`) para respeitar o dark/light mode
- Não usar cores hardcoded como `bg-[#0d0d1a]` — isso quebra o sistema de temas

**Dados (players.json / coaches.json)**
- Novos jogadores devem ter todos os campos obrigatórios: `id`, `name`, `handle`, `photo`, `nationality`, `role`, `positions`, `attributes`, `overall`, `tags`
- O `overall` é a média arredondada dos 5 atributos (LGC, COM, COL, INV, CST)
- Usar `https://unavatar.io/{handle}` como `photo` caso não haja URL específica
- O `id` deve ser único — use o handle sem `@` em kebab-case (ex: `filipe-deschamps`)

### O que você pode contribuir

- **Novos devs no elenco** — adicione pessoas relevantes da bolha dev brasileira em `data/players.json`
- **Novos técnicos** — adicione educadores e líderes em `data/coaches.json`
- **Novas formações** — adicione em `data/formations.json` com as coordenadas `x/y` de cada slot
- **Melhorias de UI/UX** — animações, acessibilidade, responsividade
- **Correções de bugs** — veja as Issues abertas com a label `bug`
- **Testes** — o projeto ainda não tem testes automatizados; contribuições nessa área são especialmente valiosas
- **Internacionalização** — adicionar suporte a outros idiomas (i18n)
- **Documentação** — melhorar este README ou adicionar comentários em partes complexas do código

### Checklist antes de abrir o PR

- [ ] O código compila sem erros (`npm run build`)
- [ ] O lint passa sem warnings (`npm run lint`)
- [ ] Testei manualmente no browser (desktop e mobile)
- [ ] Não quebrei funcionalidades existentes
- [ ] Segui o padrão de commits Conventional Commits
- [ ] Atualizei o README se adicionei/removi funcionalidades

---

## Licença

Este projeto é open source e está disponível sob a licença **MIT**. Sinta-se à vontade para usar, modificar e distribuir.