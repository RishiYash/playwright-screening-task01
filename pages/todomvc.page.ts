import { Page, Locator } from '@playwright/test';

export class TodoMvcPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly counter: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.counter = page.getByTestId('todo-count');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addTodos(texts: string[]) {
    for (const text of texts) {
      await this.addTodo(text);
    }
  }

  itemByText(text: string): Locator {
    return this.todoItems.filter({ hasText: text });
  }

  async complete(text: string) {
    await this.itemByText(text).getByRole('checkbox').check();
  }

  async edit(oldText: string, newText: string) {
    await this.itemByText(oldText).getByText(oldText).dblclick();
    const editBox = this.todoItems.getByRole('textbox', { name: 'Edit' });
    await editBox.fill(newText);
    await editBox.press('Enter');
  }

  async delete(text: string) {
    const item = this.itemByText(text);
    await item.hover();
    await item.getByRole('button', { name: 'Delete' }).click();
  }

  async filter(name: 'All' | 'Active' | 'Completed') {
    await this.page.getByRole('link', { name }).click();
  }
}