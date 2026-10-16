# QA Playwright Framework

![tests](https://github.com/Georgyo-Luka/qa-playwright-framework/actions/workflows/tests.yml/badge.svg)

> 🇺🇸 [English version below](#english)

Framework de automação de testes **E2E e de API** com **Playwright + TypeScript**, usando a aplicação pública [ServeRest](https://serverest.dev) como sistema sob teste.

O objetivo é demonstrar como estruturo uma suíte de testes pensada para crescer: camadas bem separadas, dados criados por API, execução paralela e pipeline de CI.

## Stack

| Ferramenta | Uso |
| --- | --- |
| Playwright Test | Testes E2E e de API no mesmo runner |
| TypeScript | Tipagem do framework e dos dados de teste |
| Faker | Geração de dados únicos por teste |
| GitHub Actions | CI com matriz de navegadores e sharding |
| Docker | Execução idêntica local e em CI |
| Allure | Relatório de execução |

## Arquitetura

```
src/
  api/        Cliente tipado da API (ServeRestClient)
  pages/      Page Objects das telas
  fixtures/   Fixtures customizadas (api, loginPage, registeredUser)
  factories/  Geradores de dados de teste
tests/
  api/        Testes de API (sem navegador)
  e2e/        Testes de interface
```

**Decisões principais** (detalhes em [docs/decisions.md](docs/decisions.md)):

- O estado inicial dos testes E2E é criado **pela API**, não pela interface. Isso deixa os testes mais rápidos e menos frágeis.
- Cada usuário criado por um teste é **removido ao final** pela própria fixture.
- Locators usam `data-testid` e papéis de acessibilidade, nunca seletores CSS de layout.

## Como rodar

```bash
npm install
npx playwright install
cp .env.example .env

npm test            # tudo
npm run test:api    # só API
npm run test:e2e    # só E2E no Chromium
npm run report      # abre o relatório HTML
```

Com Docker:

```bash
docker build -t qa-framework .
docker run --rm qa-framework
```

## Roadmap

- [x] Estrutura base, fixtures e Page Objects
- [x] Testes de API de usuários e login
- [x] Pipeline com matriz de navegadores e sharding
- [ ] Fluxos E2E de produtos e carrinho
- [ ] Validação de JSON Schema nas respostas
- [ ] Relatório Allure publicado no GitHub Pages
- [ ] Testes de acessibilidade com axe-core

---

<a id="english"></a>

## English

**E2E and API** test automation framework built with **Playwright + TypeScript**, using the public [ServeRest](https://serverest.dev) application as the system under test.

It shows how I structure a test suite designed to scale: clear layers, test data created through the API, parallel execution and a CI pipeline.

**Key decisions:** E2E preconditions are created via the API instead of the UI; every user a test creates is deleted by the fixture afterwards; locators rely on `data-testid` and accessibility roles.

**Run it:** `npm install && npx playwright install && npm test`.

## Autor

**Georgyo Luka dos Anjos Maralha** — QA Engineer
[LinkedIn](https://www.linkedin.com/in/georgyo-luka-dos-anjos-maralha-7843a7259/)
