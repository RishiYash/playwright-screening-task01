# Playwright Screening Task01

End-to-end tests written with Playwright Test and TypeScript for:

- TodoMVC demo app: https://demo.playwright.dev/todomvc
- Playwright docs site: https://playwright.dev

## Project structure

- `pages/` page objects (`todomvc.page.ts`)
- `fixtures/` custom fixtures (`todo.fixture.ts`, built with `test.extend`)
- `tests/` test files (`todomvc.spec.ts`, `docs.spec.ts`)
- `playwright.config.ts` baseURL, Chromium and Firefox projects, retries, trace, HTML report
- `.github/workflows/playwright.yml` CI workflow

## Install

1. Install Node.js (LTS).
2. Install dependencies: `npm install`
3. Install browsers: `npx playwright install`

## Run

- All tests: `npm test`
- Headed mode: `npm run test:headed`
- Open the HTML report: `npm run report`

## How I would deal with a flaky test

First I would reproduce it by running it many times (`--repeat-each`) and
looking at the trace to find the real cause, instead of just adding retries.
Most flakiness comes from bad waiting, shared state between tests, or unstable
locators, so I would fix it with web-first assertions, isolated test data and
role-based locators. I would never add hard sleeps. CI retries are only a
safety net, and a test that stays flaky gets quarantined with a ticket so it
does not hide real failures.

## CI

[Add the link to the passing GitHub Actions run here]