import { test, expect } from '../fixtures/todo.fixture';

test.describe('TodoMVC', () => {
  // Test 1: add 3 todos
  test('adds 3 todos and shows them in the list', async ({ todoPage }) => {
    await todoPage.addTodos(['Buy milk', 'Walk dog', 'Read book']);
    await expect(todoPage.todoItems).toHaveText(['Buy milk', 'Walk dog', 'Read book']);
  });

  // Test 2: complete one, counter shows "2 items left"
  test('completing one todo updates the counter', async ({ todoPage }) => {
    await todoPage.addTodos(['Buy milk', 'Walk dog', 'Read book']);
    await todoPage.complete('Walk dog');
    await expect(todoPage.counter).toHaveText('2 items left');
  });

  // Test 3: Active and Completed filters
  test('filters show the correct items', async ({ todoPage }) => {
    await todoPage.addTodos(['Buy milk', 'Walk dog', 'Read book']);
    await todoPage.complete('Walk dog');

    await todoPage.filter('Active');
    await expect(todoPage.todoItems).toHaveText(['Buy milk', 'Read book']);

    await todoPage.filter('Completed');
    await expect(todoPage.todoItems).toHaveText(['Walk dog']);
  });

  // Test 4: edit a todo
  test('edits a todo', async ({ todoPage }) => {
    await todoPage.addTodos(['Buy milk', 'Walk dog']);
    await todoPage.edit('Buy milk', 'Buy oat milk');
    await expect(todoPage.todoItems).toHaveText(['Buy oat milk', 'Walk dog']);
  });

  // Test 5: delete a todo
  test('deletes a todo', async ({ todoPage }) => {
    await todoPage.addTodos(['Buy milk', 'Walk dog']);
    await todoPage.delete('Buy milk');
    await expect(todoPage.itemByText('Buy milk')).toHaveCount(0);
    await expect(todoPage.todoItems).toHaveText(['Walk dog']);
  });

  // Test 6: clear completed removes only completed items
  test('clear completed removes only completed items', async ({ todoPage }) => {
    await todoPage.addTodos(['Buy milk', 'Walk dog', 'Read book']);
    await todoPage.complete('Buy milk');
    await todoPage.clearCompletedButton.click();
    await expect(todoPage.todoItems).toHaveText(['Walk dog', 'Read book']);
  });

  // Test 7: todos survive a reload
  test('todos are still there after reload', async ({ todoPage, page }) => {
    await todoPage.addTodos(['Buy milk', 'Walk dog']);
    await page.reload();
    await expect(todoPage.todoItems).toHaveText(['Buy milk', 'Walk dog']);
  });

  // Test 8: empty or whitespace-only todo is not added
  test('empty and whitespace-only todos are not added', async ({ todoPage }) => {
    await todoPage.addTodo('');
    await todoPage.addTodo('     ');
    await expect(todoPage.todoItems).toHaveCount(0);
    await expect(todoPage.counter).toBeHidden();
  });

  // Test 9: data-driven test
  const todos = ['Learn Playwright', 'Write tests', 'Fix bugs', 'Drink water'];

  test('adds several todos from an array', async ({ todoPage }) => {
    await todoPage.addTodos(todos);
    await expect(todoPage.todoItems).toHaveText(todos);
    await expect(todoPage.counter).toHaveText(`${todos.length} items left`);
  });
});