# Dev Squad Builder

Inspirado nos modos de construção de time dos videogames de futebol (FIFA Ultimate Team, eFootball), o **Dev Squad Builder** é uma aplicação web onde você monta seu time dos sonhos usando pessoas reais da **bolha dev brasileira** — devs, influencers, educadores e criadores de conteúdo de tecnologia.

---

## Funcionalidades

- **Formação tática** — escolha entre 5 formações clássicas do futebol (4-3-3, 4-4-2, 4-2-3-1, 3-5-2, 5-3-2)
- **Campo interativo** — campo com linhas SVG, slots clicáveis e fotos dos jogadores posicionados
- **Elenco de 28 devs brasileiros** — com atributos, posições e overall calculado
- **Técnicos brasileiros** — cada um com filosofia própria e bônus que afetam os atributos do time
- **Funções especiais** — atribua capitão, cobrador de pênalti, cobrador de falta e cobrador de escanteio
- **Estatísticas do time** — média de atributos em tempo real com bônus do técnico aplicados
- **Busca de jogadores** — filtre por nome, handle, role ou tecnologia
- **Exportar card para redes sociais** — gera uma imagem 1080×1080px pronta para Instagram, Twitter/X e LinkedIn
- **Persistência local** — o time montado é salvo automaticamente no navegador (localStorage) e sobrevive ao reload da página
- **Compartilhar por link** — gera uma URL com o time inteiro codificado no hash; quem abrir o link vê exatamente o mesmo time
- **Elenco customizável** — adicione, edite e remova jogadores diretamente pelo painel; dados customizados persistem no localStorage
- **Técnicos customizáveis** — crie técnicos com filosofia e bônus próprios; edite ou remova qualquer técnico da lista
- **Paginação na lista de jogadores** — 6 jogadores por página para facilitar a navegação

---

## Posições (nomenclatura brasileira)

| Sigla | Posição              |
|-------|----------------------|
| GO    | Goleiro              |
| ZA    | Zagueiro             |
| LE    | Lateral Esquerdo     |
| LD    | Lateral Direito      |
| VOL   | Volante              |
| MLG   | Meia                 |
| MLE   | Meia Lateral Esquerdo|
| MLD   | Meia Lateral Direito |
| MAT   | Meia Atacante        |
| SA    | Segundo Atacante     |
| PTE   | Ponta Esquerda       |
| PTD   | Ponta Direita        |
| CA    | Centroavante         |

---

## Elenco de Jogadores

| Jogador              | Handle             | Posições      | Tags principais                        |
|----------------------|--------------------|---------------|----------------------------------------|
| Filipe Deschamps     | @FilipeDeschamps   | MAT, PTE      | JavaScript, Node.js, YouTube           |
| Giovanni Bassi       | @giovannibassi     | ZA, VOL       | .NET, C#, DDD, Arquitetura             |
| Mayk Brito           | @maykbrito         | PTE, MAT      | JavaScript, Rocketseat, HTML, CSS      |
| Lucas Montano        | @lucasmontano      | PTD, MLD      | Flutter, Dart, Mobile, YouTube         |
| Diego Fernandes      | @dieegosf          | MLG, MAT      | React, Node.js, Rocketseat, TypeScript |
| Willian Justen       | @Willian_justen    | LD, MLD       | SVG, CSS, TypeScript, Open Source      |
| Henrique Bastos      | @henriquebastos    | VOL, ZA       | Python, Django, Open Source            |
| Loiane Groner        | @loiane            | MLG, MAT      | Java, Angular, Spring, Educação        |
| Rodrigo Manguinho    | @rmanguinho        | ZA, VOL       | TDD, Clean Architecture, TypeScript    |
| Iuri Silva           | @iuricode          | PTE, MLE      | UI, CSS, React, Design System          |
| Leandro TK           | @leandrotk_        | MLG, MLE      | TypeScript, React, Python              |
| Fábio Vedovelli      | @vedovelli         | LE, MLE       | Vue.js, Nuxt, Testes, JavaScript       |
| Elton Minetto        | @eminetto          | ZA, LE        | Go, PHP, Clean Architecture            |
| Jaydson Gomes        | @jaydson           | MLG, VOL      | JavaScript, BrazilJS, Open Source      |
| Robson Marques       | @oRobsonMarques    | GO            | Rocketseat, React Native, Liderança    |
| Natan Souza          | @designernatan     | PTD, MLD      | HTML, CSS, Design, Acessibilidade      |
| Alda Rocha           | @mjcoffeeholics    | CA            | Python, Django, Diversidade            |
| Luan Moreno          | @lnmoreno          | CA, MAT       | Node.js, React, TypeScript             |
| Ana Paula Lima       | @anaguiar          | MLG, MLE      | DevRel, Comunidade, Inclusão           |
| Eduardo Zanfranceschi| @zanfranceschi     | ZA, LD        | Sistemas Distribuídos, .NET, Backend   |
| Lauro Moura          | @lauromoura        | LE, VOL       | C++, EFL, Open Source, Linux           |
| Mano Deyvin          | @manodeyvin        | CA, PTD       | JavaScript, YouTube, Humor             |
| Guilherme Lima       | @guilhermeonrails  | MLG, VOL      | Python, Django, Alura                  |
| Rafa Ballerini       | @rafaballerini     | PTE, MLE      | CSS, HTML, Alura, Frontend             |
| Attekita Dev         | @attekita          | SA, MAT       | Carreira, Engenharia de Software       |
| Monica Hillman       | @MonicaHillman     | MLG, MLE      | DevRel, Comunidade, Inclusão           |
| O Primo Dev          | @oprimodev         | CA, SA        | JavaScript, YouTube, Iniciantes        |
| Venilton FalvoJr     | @falvojr           | VOL, ZA       | Java, DIO, Open Source, Android        |

---

## Técnicos

| Técnico             | Handle             | Filosofia                            | Bônus                          |
|---------------------|--------------------|--------------------------------------|--------------------------------|
| Gustavo Guanabara   | @gustavoguanabara  | Educação para Todos                  | +7 COM, +5 CST                 |
| Fábio Akita         | @Akitaonrails      | Pense por Si Mesmo                   | +8 LGC, +4 INV                 |
| Paulo Silveira      | @paulo_caelum      | Ensinar é Aprender Duas Vezes        | +5 LGC, +6 COL                 |
| Felipão DIO         | @felipeaguinaldo   | Pratique, Pratique, Pratique         | +8 CST, +4 COL                 |
| Gabriel Fróes       | @gabrielfroes      | Criatividade é uma Habilidade Técnica| +8 INV, +4 COM                 |
| Vanessa Weber       | @vanessaweber      | Comunidade Transforma Carreiras      | +9 COL, +4 COM                 |

---

## Atributos dos Jogadores

| Sigla | Atributo      | Descrição                                      |
|-------|---------------|------------------------------------------------|
| LGC   | Lógica        | Capacidade de resolver problemas complexos     |
| COM   | Comunicação   | Clareza ao transmitir conhecimento             |
| COL   | Colaboração   | Contribuição para times e comunidade           |
| INV   | Inovação      | Criação de soluções novas e criativas          |
| CST   | Consistência  | Frequência e qualidade de entrega              |

---

## Funções Especiais

| Função                | Descrição                              |
|-----------------------|----------------------------------------|
| Capitão               | Líder do time, inspira todos           |
| Cobrador de Pênalti   | Frieza total sob pressão               |
| Cobrador de Falta     | Precisão e criatividade                |
| Cobrador de Escanteio | Visão de jogo e estratégia             |

Cada jogador pode ter no máximo uma função. Ao remover um jogador do campo, sua função é limpa automaticamente.

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

## Persistência Local (localStorage)

O time montado é salvo automaticamente no `localStorage` do navegador usando o middleware `persist` do Zustand. Não é necessária nenhuma ação do usuário — a cada mudança de formação, jogador, técnico ou função, o estado é gravado no browser.

**Comportamento:**
- Ao recarregar a página, o time é restaurado exatamente como estava
- Apenas o `squad` (formação, jogadores, técnico, funções) é persistido; o estado de UI (`activeSlotIndex`) é descartado no reload
- Chave de armazenamento: `dev-squad-builder`
- O botão **Resetar** no header limpa tanto o estado em memória quanto o localStorage

**Implementação:** `store/squadStore.ts` envolve o store Zustand com `persist()` e usa `partialize` para salvar somente o slice `squad`:

```typescript
persist(
  (set, get) => ({ /* lógica do store */ }),
  {
    name: "dev-squad-builder",
    partialize: (state) => ({ squad: state.squad }),
  }
)
```

---

## Compartilhamento por Link

Ao posicionar pelo menos um jogador no campo, o botão **Copiar Link** aparece no header ao lado do botão Compartilhar. O link gerado codifica todo o time no hash da URL (`#...`) — sem backend, sem banco de dados.

**Fluxo:**
1. Monte seu time normalmente
2. Clique em **Copiar Link** no header — o botão muda para "Link copiado!" por 2 segundos
3. Cole o link em qualquer lugar (chat, redes sociais, e-mail)
4. Quem abrir o link verá o time montado automaticamente, sem precisar instalar nada

**Formato da URL:**
```
https://seusite.com/#eyJmIjoiNDMzIiwiYyI6...
```

**Como funciona:**
- `lib/shareUrl.ts` exporta `encodeSquad()` e `decodeSquad()`
- `encodeSquad()` serializa apenas os IDs (formação, técnico, jogadores por slot, funções) em JSON compacto e converte para base64 URL-safe
- `decodeSquad()` reconstrói o `Squad` completo a partir dos IDs, fazendo lookup nos arquivos `players.json`, `coaches.json` e `formations.json`
- Em `app/page.tsx`, um `useEffect` lê `window.location.hash` na montagem, decodifica e hidrata o store via `useSquadStore.setState()`, depois limpa o hash da URL com `history.replaceState`

**Por que hash e não query string?**
O hash (`#`) não é enviado ao servidor, evitando logs e facilitando uso em deploys estáticos (Vercel, GitHub Pages).

---

## Gerenciamento de Jogadores e Técnicos

O usuário tem controle total sobre o elenco e o banco de técnicos, sem precisar editar arquivos JSON.

### Jogadores

Na aba **Jogadores**, logo abaixo da barra de busca, há o botão **+ Novo Jogador**. Ao passar o mouse sobre qualquer card, dois botões aparecem no lado direito:

| Botão | Ação |
|-------|------|
| ✎ (azul) | Abre o formulário de edição preenchido com os dados do jogador |
| ✕ (vermelho) | Remove o jogador da lista (pede confirmação) |

**Formulário de jogador:**
- Nome e handle (obrigatórios)
- URL da foto (opcional — usa `unavatar.io/{handle}` se vazio)
- Role (select com 11 opções)
- Posições (botões toggle — selecione ao menos uma)
- 5 atributos com slider + campo numérico (1–99); OVR calculado automaticamente
- Tags separadas por vírgula

**Comportamento ao editar jogador dos dados originais:**
O jogador original é ocultado e uma cópia editada é salva com o mesmo ID — squads que já tinham esse jogador continuam funcionando.

### Técnicos

Na aba **Técnico**, um botão **+ Novo Técnico** aparece no rodapé da lista. Ao passar o mouse sobre qualquer técnico, os mesmos botões ✎ e ✕ são exibidos.

**Formulário de técnico:**
- Nome, handle e filosofia (obrigatórios)
- URL da foto (opcional)
- 2 bônus: escolha o atributo (LGC / COM / COL / INV / CST) e o valor (+1 a +15)

Ao remover um técnico que está selecionado no squad atual, a seleção é limpa automaticamente.

### Armazenamento dos dados customizados

Todos os jogadores e técnicos criados ou editados pelo usuário são salvos na chave `dev-squad-custom-data` do localStorage, separada da chave do squad (`dev-squad-builder`). Os dados originais dos arquivos JSON nunca são modificados — jogadores/técnicos removidos são apenas ocultados pela aplicação.

---

## Formações disponíveis

| Formação | Características                                                  |
|----------|------------------------------------------------------------------|
| 4-3-3    | 3 MLG no meio, 2 pontas + 1 CA                                  |
| 4-4-2    | 2 MLE/MLD nas alas, 2 CA                                        |
| 4-2-3-1  | 2 VOL na base, trio ofensivo (PTE + MAT + PTD) + 1 CA           |
| 4-3-2-1  | "Árvore de Natal" — 3 MLG, 2 MAT e 1 CA em pirâmide            |
| 4-3-1-2  | 3 MLG + 1 MAT avançado, dupla de centroavantes                  |
| 4-2-1-2  | Losango no meio: 2 VOL + 1 MAT + 2 MLE/MLD ofensivos + 1 CA    |
| 4-1-4-1  | 1 VOL pivô, 4 meias em bloco + 1 CA isolado                     |
| 3-4-3    | 3 ZA, 4 meias com MLE/MLD, trio de ataque com pontas            |
| 3-5-2    | 3 ZA, meio-campo amplo com MLE/MLD, 2 CA                        |
| 5-2-2-1  | 5 defensores, 2 VOL, 2 MAT de apoio + 1 CA                     |
| 5-3-2    | 5 defensores, 3 MLG, 2 CA                                       |
| 3-1-4-2  | 3 ZA + 1 VOL pivô, 4 meias largos (MLE/MLD), 2 CA              |

---

## Stack Técnica

| Tecnologia              | Uso                                                        |
|-------------------------|------------------------------------------------------------|
| Next.js 16              | Framework React com App Router                             |
| TypeScript              | Tipagem estática em todo o projeto                         |
| Tailwind CSS            | Estilização utilitária                                     |
| Zustand                 | Gerenciamento de estado global do squad                    |
| zustand/middleware      | `persist` para salvar squad e dados customizados           |
| html-to-image           | Geração de imagem PNG para compartilhar                    |

---

## Estrutura do Projeto

```
projeto-squad-builder/
├── app/
│   ├── page.tsx           # Página principal com layout, abas, Copiar Link e hash hydration
│   ├── layout.tsx         # Layout raiz com metadados
│   └── globals.css        # Estilos globais e scrollbar customizada
├── components/
│   ├── TacticalField.tsx    # Campo tático SVG com slots interativos
│   ├── PlayerCard.tsx       # Card de jogador com botões hover de edição/remoção
│   ├── PlayerSelector.tsx   # Lista paginada (6/pág) com busca e CRUD de jogadores
│   ├── PlayerFormModal.tsx  # Modal formulário para criar/editar jogador
│   ├── FormationPicker.tsx  # Seletor de formações táticas
│   ├── CoachPicker.tsx      # Seletor de técnico com CRUD
│   ├── CoachFormModal.tsx   # Modal formulário para criar/editar técnico
│   ├── SquadStats.tsx       # Estatísticas médias do time
│   ├── SquadRolesPanel.tsx  # Painel de funções especiais
│   ├── ShareCard.tsx        # Card 1080×1080px para exportação
│   └── ShareModal.tsx       # Modal com prévia e botão de download
├── lib/
│   └── shareUrl.ts          # encodeSquad() / decodeSquad() para URL sharing
├── store/
│   ├── squadStore.ts        # Store Zustand do squad com persist (localStorage)
│   └── customDataStore.ts   # Store de jogadores/técnicos customizados com persist
├── types/
│   └── index.ts           # Tipos TypeScript do domínio
└── data/
    ├── players.json        # 28 devs brasileiros
    ├── formations.json     # 5 formações com coordenadas x/y
    └── coaches.json        # 6 técnicos com bônus
```

---

## Como rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

**Fluxo sugerido:**
1. Escolha uma **Formação** na aba correspondente
2. Selecione um **Técnico** e veja os bônus ativos
3. Clique em um slot vazio no campo → vá para **Jogadores** → clique no dev para posicioná-lo
4. Atribua **Funções** especiais (capitão, pênalti, falta, escanteio) na aba Funções
5. Acompanhe as **Estatísticas** no painel direito em tempo real
6. Clique em **Copiar Link** para compartilhar o time com alguém pela URL
7. Clique em **Compartilhar** no header para gerar e baixar o card PNG para redes sociais

> O time é salvo automaticamente — ao fechar e reabrir a aba, o squad estará exatamente onde você deixou.

**Para gerenciar o elenco:**
- Clique em **+ Novo Jogador** (aba Jogadores) para adicionar um dev customizado
- Passe o mouse sobre qualquer card para ver os botões ✎ (editar) e ✕ (remover)
- Na aba **Técnico**, use **+ Novo Técnico** e os mesmos botões de hover
