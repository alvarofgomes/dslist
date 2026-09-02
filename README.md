# DS List

API REST para catalogar jogos e organizá-los em listas personalizáveis (ex.: "Aventura e RPG", "Jogos de plataforma"), com suporte a reordenação manual dos itens dentro de cada lista.

Projeto baseado no curso de Spring Boot do Nelio Alves (DevSuperior), reimplementado e adaptado.

## Tecnologias

- Java 21
- Spring Boot 3.4.1 (Web, Data JPA)
- PostgreSQL (produção) / H2 (perfil de teste, em memória)
- Maven

## Arquitetura

Arquitetura em camadas (Controller → Service → Repository → Entity), com DTOs isolando o contrato da API das entidades JPA:

```
controllers/   endpoints REST
services/      regras de negócio e transações
repositories/  acesso a dados
entities/      mapeamento JPA
dto/           objetos de transporte entre camadas
projections/   projeções de consulta (leitura otimizada)
```

## Modelo de dados

- **Game**: um jogo (título, ano, gênero, plataformas, nota, descrições).
- **GameList**: uma lista de jogos (ex.: "Jogos de plataforma").
- **Belonging**: associação N-N entre `Game` e `GameList`, com chave composta (`BelongingPK`) e um campo `position` que define a ordem do jogo dentro da lista.

A reordenação (drag-and-drop no front) é feita pelo endpoint de replacement: recalcula as posições apenas no intervalo entre os índices de origem e destino, em vez de reescrever a lista inteira.

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/games` | Lista todos os jogos (dados resumidos) |
| GET | `/games/{id}` | Detalhes completos de um jogo |
| GET | `/lists` | Lista todas as listas de jogos |
| GET | `/lists/{listId}/games` | Jogos de uma lista, na ordem definida |
| POST | `/lists/{listId}/replacement` | Move um jogo de `sourceIndex` para `destinationIndex` dentro da lista |

## Como rodar localmente

Não precisa configurar banco de dados — o perfil padrão é `test`, que usa H2 em memória já populado via `import.sql`.

```bash
./mvnw spring-boot:run
```

- Front-end estático: http://localhost:8080/
- API: http://localhost:8080/games
- Console H2: http://localhost:8080/h2-console (JDBC URL `jdbc:h2:mem:testdb`, usuário `sa`, sem senha)

Para rodar contra PostgreSQL local, copie `application-dev.properties.example` para `application-dev.properties`, ajuste com suas credenciais, e use o perfil `dev`:

```bash
APP_PROFILE=dev ./mvnw spring-boot:run
```

## Deploy em produção

O perfil `prod` lê a conexão das variáveis de ambiente `DB_URL`, `DB_USERNAME` e `DB_PASSWORD`, e as origens liberadas para CORS da variável `CORS_ORIGINS` (lista separada por vírgula).

Como `ddl-auto=none`, o schema não é criado automaticamente: antes do primeiro deploy, rode [`db/schema.sql`](db/schema.sql) manualmente no banco de produção.
