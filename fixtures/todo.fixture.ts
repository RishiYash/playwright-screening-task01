import { test as base } from '@playwright/test';
import { TodoMvcPage } from '../pages/todomvc.page';

type MyFixtures = {
  todoPage: TodoMvcPage;
};

export const test = base.extend<MyFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoMvcPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect } from '@playwright/test';