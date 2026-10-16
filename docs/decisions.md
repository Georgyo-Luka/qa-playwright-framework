# Decisões técnicas

Registro das escolhas feitas no framework e o motivo de cada uma. Novas decisões entram no fim, com data.

## 1. Playwright em vez de Cypress (2026-10)

Já uso Cypress no trabalho. Escolhi Playwright aqui para:
- rodar testes de API e E2E no mesmo runner, sem plugins;
- ter paralelismo e sharding nativos;
- testar em Chromium, Firefox e WebKit;
- usar o trace viewer para depurar falhas no CI.

## 2. Estado inicial criado pela API

Testes E2E não passam pela tela de cadastro para criar um usuário. A fixture `registeredUser` cria o usuário via `POST /usuarios` e o remove ao final.

**Por quê:** testes mais rápidos, independentes entre si e que falham só pelo motivo que estão testando.

## 3. Page Objects + fixtures

Page Objects encapsulam locators e ações de cada tela. Fixtures entregam esses objetos prontos para o teste, sem `new` espalhado pelos specs.

## 4. Dados únicos por teste com Faker

Cada execução gera e-mails únicos. Isso permite rodar em paralelo contra um ambiente compartilhado sem colisão de dados.

## 5. Retries só no CI

`retries: 2` no CI e `0` localmente. Localmente quero ver a falha na primeira vez; no CI, o retry evita bloquear o pipeline por instabilidade de rede, e o relatório marca o teste como *flaky* para investigação.
