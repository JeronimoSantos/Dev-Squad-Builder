# Dev Squad Builder

Inspirado nos modos de construção de time dos videogames de futebol (FIFA Ultimate Team, eFootball), o **Dev Squad Builder** é uma aplicação web onde você monta seu time dos sonhos usando pessoas reais da **bolha dev brasileira** — devs, influencers, educadores e criadores de conteúdo de tecnologia.

---

## Funcionalidades

- **Formação tática** — escolha entre 12 formações clássicas do futebol
- **Campo interativo** — campo com linhas SVG, slots clicáveis e fotos dos jogadores posicionados
- **Elenco de 28 devs brasileiros** — com atributos, posições e overall calculado
- **Técnicos brasileiros** — cada um com filosofia própria e bônus que afetam os atributos do time
- **Funções especiais** — atribua capitão, cobrador de pênalti, cobrador de falta e cobrador de escanteio
- **Estatísticas do time** — média de atributos em tempo real com bônus do técnico aplicados
- **Busca de jogadores** — filtre por nome, handle, role ou tecnologia
- **Exportar card para redes sociais** — gera uma imagem 1080×1080px pronta para Instagram, Twitter/X e LinkedIn
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

| Técnico            | Handle             | Filosofia                             | Bônus         |
|--------------------|--------------------|---------------------------------------|---------------|
| Gustavo Guanabara  | @gustavoguanabara  | Educação para Todos                   | +7 COM, +5 CST|
| Fábio Akita        | @Akitaonrails      | Pense por Si Mesmo                    | +8 LGC, +4 INV|
| Paulo Silveira     | @paulo_caelum      | Ensinar é Aprender Duas Vezes         | +5 LGC, +6 COL|
| Felipão DIO        | @felipeaguinaldo   | Pratique, Pratique, Pratique          | +8 CST, +4 COL|
| Gabriel Fróes      | @gabrielfroes      | Criatividade é uma Habilidade Técnica | +8 INV, +4 COM|
| Vanessa Weber      | @vanessaweber      | Comunidade Transforma Carreiras       | +9 COL, +4 COM|

---

## Atributos dos Jogadores

| Sigla | Atributo    | Descrição                                  |
|-------|-------------|--------------------------------------------|
| LGC   | Lógica      | Capacidade de resolver problemas complexos |
| COM   | Comunicação | Clareza ao transmitir conhecimento         |
| COL   | Colaboração | Contribuição para times e comunidade       |
| INV   | Inovação    | Criação de soluções novas e criativas      |
| CST   | Consistência| Frequência e qualidade de entrega          |

---

## Funções Especiais

| Função               | Descrição                          |
|----------------------|------------------------------------|
| Capitão              | Líder do time, inspira todos       |
| Cobrador de Pênalti  | Frieza total sob pressão           |
| Cobrador de Falta    | Precisão e criatividade            |
| Cobrador de Escanteio| Visão de jogo e estratégia         |

Cada jogador pode ter no máximo uma função. Ao remover um jogador do campo, sua função é limpa automaticamente.

---

## Formações disponíveis

| Formação | Características                                                   |
|----------|-------------------------------------------------------------------|
| 4-3-3    | 3 MLG no meio, 2 pontas + 1 CA                                   |
| 4-4-2    | 2 MLE/MLD nas alas, 2 CA                                         |
| 4-2-3-1  | 2 VOL na base, trio ofensivo (PTE + MAT + PTD) + 1 CA            |
| 4-3-2-1  | "Árvore de Natal" — 3 MLG, 2 MAT e 1 CA em pirâmide             |
| 4-3-1-2  | 3 MLG + 1 MAT avançado, dupla de centroavantes                   |
| 4-2-1-2  | Losango no meio: 2 VOL + 1 MAT + 2 MLE/MLD ofensivos + 1 CA     |
| 4-1-4-1  | 1 VOL pivô, 4 meias em bloco + 1 CA isolado                      |
| 3-4-3    | 3 ZA, 4 meias com MLE/MLD, trio de ataque com pontas             |
| 3-5-2    | 3 ZA, meio-campo amplo com MLE/MLD, 2 CA                         |
| 5-2-2-1  | 5 defensores, 2 VOL, 2 MAT de apoio + 1 CA                      |
| 5-3-2    | 5 defensores, 3 MLG, 2 CA                                        |
| 3-1-4-2  | 3 ZA + 1 VOL pivô, 4 meias largos (MLE/MLD), 2 CA               |

---

## Card de Compartilhamento

Ao posicionar pelo menos um jogador no campo, o botão **Compartilhar** aparece no header.

**Fluxo:**
1. Clique em **Compartilhar** no canto superior direito
2. Clique em **Gerar Prévia** para renderizar o card
3. Clique em **Baixar PNG** para salvar o arquivo (`dev-squad-4-3-3.png`)

**Conteúdo do card (1080×1080px):**
- Nome da formação e overall médio do time
- Campo tático com nomes, posições e overall de cada jogador
- Badges de funções especiais (C = Capitão, P = Pênalti, F = Falta, E = Escanteio)
- Técnico selecionado e sua filosofia
- Barras de atributos com bônus do técnico aplicados
- Hashtags `#DevSquadBuilder` e `#BolhaDev`

---

## Compartilhamento por Link

Ao posicionar pelo menos um jogador no campo, o botão **Copiar Link** aparece no header. O link gerado codifica todo o time no hash da URL (`#...`) — sem backend, sem banco de dados.

**Fluxo:**
1. Monte seu time normalmente
2. Clique em **Copiar Link** — o botão muda para "✓" por 2 segundos
3. Cole o link em qualquer lugar (chat, redes sociais, e-mail)
4. Quem abrir o link verá o time montado automaticamente

**Formato da URL:**
```
https://seusite.com/#eyJmIjoiNDMzIiwiYyI6...
```

- `lib/shareUrl.ts` serializa apenas os IDs em JSON compacto e converte para base64 URL-safe
- O hash não é enviado ao servidor, preservando privacidade e compatibilidade com deploys estáticos

---

## Gerenciamento de Jogadores e Técnicos

O usuário tem controle total sobre o elenco e o banco de técnicos, sem precisar editar arquivos JSON.

### Jogadores

Na aba **Jogadores**, logo abaixo da barra de busca, há o botão **+ Novo Jogador**. Ao passar o mouse sobre qualquer card, dois botões aparecem:

| Botão    | Ação                                             |
|----------|--------------------------------------------------|
| ✎ (azul) | Abre o formulário de edição preenchido           |
| ✕ (vermelho) | Remove o jogador da lista (pede confirmação) |

**Formulário de jogador:** Nome, handle, URL da foto (opcional), role, posições, 5 atributos (slider 1–99) e tags.

### Técnicos

Na aba **Técnico**, um botão **+ Novo Técnico** aparece no rodapé da lista com os mesmos botões de hover. Ao remover um técnico selecionado, a seleção é limpa automaticamente.

---

## Login e Sincronização (Supabase)

O botão **Entrar** no canto superior direito permite criar conta ou fazer login para sincronizar o squad e os dados customizados entre dispositivos.

### Métodos de autenticação
- **E-mail + senha** — funciona imediatamente
- **Google OAuth** — requer configuração no Supabase Dashboard
- **GitHub OAuth** — requer configuração no Supabase Dashboard

### Como funciona a sincronização
1. Ao fazer login, os dados da nuvem são carregados e mesclados com o estado local
2. Qualquer alteração no squad ou no elenco customizado é enviada automaticamente para o banco (com debounce de 1–1,5s)
3. O mesmo squad fica disponível em qualquer browser onde o usuário esteja logado

### Banco de dados (Supabase PostgreSQL)

Duas tabelas com Row Level Security (RLS) — cada usuário acessa apenas seus próprios dados:

```sql
squads(user_id PK, squad_data JSONB, updated_at)
user_data(user_id PK, custom_data JSONB, updated_at)
```

### Configuração

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Execute o script `supabase/schema.sql` no SQL Editor do Supabase
3. Crie o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

Para habilitar OAuth (Google/GitHub): Supabase Dashboard → Authentication → Providers.

---

## Dark / Light Mode

O botão **sol/lua** no header alterna entre dois temas inspirados nos uniformes da Seleção Brasileira:

| Modo          | Tema           | Cores                                               |
|---------------|----------------|-----------------------------------------------------|
| 🌙 Camisa Azul  | Dark (padrão) | Azul marinho escuro `#0d0d1a`, amarelo, branco      |
| ☀️ Camisa Amarela | Light       | Azul-branco `#EFF6FF`, azul Brasil `#1E3A8A`, amarelo |

- A preferência é salva no `localStorage` e restaurada automaticamente ao recarregar
- O tema é aplicado antes da hidratação do React (anti-FOUC) para evitar flash de cor errada
- O amarelo (`yellow-400`) permanece inalterado em ambos os modos

---

## Layout Responsivo

A aplicação adapta o layout automaticamente para diferentes tamanhos de tela:

| Tela      | Layout                                                        |
|-----------|---------------------------------------------------------------|
| Mobile    | Campo no topo (altura fixa `46vh`) + painel com abas embaixo |
| Desktop   | 3 colunas: painel esquerdo · campo central · stats à direita  |

- O campo tático usa `max-w-55` (mobile) → `max-w-xs` (tablet) → `max-w-sm` (desktop)
- Players no campo: `w-8 h-8` (mobile) → `w-12 h-12` (desktop)
- Stats ficam em aba separada no mobile e em painel fixo no desktop

---

## Animações e Transições

| Animação          | Onde ocorre                                     | Duração  |
|-------------------|-------------------------------------------------|----------|
| `slot-enter`      | Entrada de jogadores no campo (efeito mola)     | 0,4s     |
| `fade-up`         | Troca entre painéis do menu lateral             | 0,22s    |
| `slide-down`      | Banner de importação de squad por link          | 0,28s    |
| `modal-appear`    | Abertura de todos os modais (scale + translateY)| 0,22s    |
| Posição dos slots | Transição suave ao trocar formação (`left/top`) | 0,45s    |

---

## Persistência Local (localStorage)

| Chave                  | Conteúdo                                        |
|------------------------|-------------------------------------------------|
| `dev-squad-builder`    | Formação, jogadores, técnico e funções do squad |
| `dev-squad-custom-data`| Jogadores e técnicos customizados pelo usuário  |
| `dev-squad-theme`      | Preferência de tema (dark / light)              |

O estado é restaurado automaticamente ao recarregar. O botão **Resetar** limpa o squad da memória e do localStorage.

---

## Stack Técnica

| Tecnologia          | Uso                                                            |
|---------------------|----------------------------------------------------------------|
| Next.js 16          | Framework React com App Router                                 |
| TypeScript          | Tipagem estática em todo o projeto                             |
| Tailwind CSS v4     | Estilização utilitária com variáveis CSS para temas            |
| Zustand 5           | Gerenciamento de estado (squad, custom data, auth, tema)       |
| zustand/middleware  | `persist` para localStorage em todos os stores                 |
| Supabase            | Autenticação (email, Google, GitHub) + banco PostgreSQL        |
| @supabase/supabase-js | Cliente Supabase para browser                                |
| html-to-image       | Geração de imagem PNG para compartilhar                        |

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
│   ├── ShareCard.tsx         # Card 1080×1080px para exportação social
│   ├── ShareModal.tsx        # Modal com prévia e botão de download
│   ├── AuthModal.tsx         # Modal de login/cadastro/recuperação de senha
│   ├── AuthButton.tsx        # Botão de login/logout no header
│   ├── AppInit.tsx           # Inicializa o listener de autenticação Supabase
│   ├── SyncProvider.tsx      # Sincronização automática squad ↔ nuvem (debounced)
│   ├── ThemeProvider.tsx     # Aplica data-theme no <html> ao montar/alterar tema
│   └── ThemeButton.tsx       # Botão sol/lua para alternar dark e light mode
├── lib/
│   ├── supabase.ts           # Singleton do cliente Supabase (browser-only)
│   ├── db.ts                 # Operações de leitura/escrita no banco (squads, user_data)
│   ├── shareUrl.ts           # encodeSquad() / decodeSquad() para URL sharing
│   └── photoFallback.ts      # Fallback de foto por handle ou iniciais SVG
├── store/
│   ├── squadStore.ts         # Store Zustand do squad com persist
│   ├── customDataStore.ts    # Store de jogadores/técnicos customizados com persist
│   ├── authStore.ts          # Store de autenticação (user, session, loading)
│   └── themeStore.ts         # Store de tema (dark/light) com persist
├── supabase/
│   └── schema.sql            # Script SQL para criar tabelas e políticas RLS
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

## Como rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

> Para habilitar login e sincronização, crie o arquivo `.env.local` com as credenciais do Supabase (ver seção [Login e Sincronização](#login-e-sincronização-supabase)).

**Fluxo sugerido:**
1. Escolha uma **Formação** na aba correspondente
2. Selecione um **Técnico** e veja os bônus ativos
3. Clique em um slot vazio no campo → vá para **Jogadores** → clique no dev para posicioná-lo
4. Atribua **Funções** especiais na aba Funções
5. Acompanhe as **Estatísticas** no painel lateral (desktop) ou aba Stats (mobile)
6. Clique em **Copiar Link** para compartilhar o time pela URL
7. Clique em **Compartilhar** para gerar e baixar o card PNG para redes sociais
8. Use o botão **☀️/🌙** para alternar entre Camisa Amarela e Camisa Azul
9. Clique em **Entrar** para criar conta e sincronizar o squad entre dispositivos

> O time é salvo automaticamente — ao fechar e reabrir a aba, o squad estará exatamente onde você deixou.