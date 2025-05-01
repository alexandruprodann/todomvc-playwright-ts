# 💻 Playwright + TypeScript E2E Automation: TodoMVC App

This project automates end-to-end tests for the [TodoMVC React-Redux](https://todomvc.com/examples/react-redux/dist/) app using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** design pattern.

---

## 📁 Project Structure

- **tests/**
  - `add-todo.spec.ts` – Tests for adding todo items.
  - `clear-completed.spec.ts` – Tests for clearing completed items.
  - `complete-todo.spec.ts` – Tests for marking/unmarking todos as complete.
  - `delete-todo.spec.ts` – Tests for deleting todo items.
  - `edit-todo.spec.ts` - Tests for editing todo text.
  - `filters.spec.ts` – Tests for filtering All / Active / Completed todos.

- **pages/**
  - `BasePage.ts` – Contains shared page functionality.
  - `TodoPage.ts` – Page Object Model class for interacting with the TodoMVC app.

- **utils/**
  - `testData.ts` – Reusable constants and data used across tests (e.g., `TODO_ITEMS`).

- **playwright.config.ts** – Configuration file for Playwright setup.
---

## ⚙️ Setup

### Prerequisites

- Node.js
- Playwright (`npm install playwright`)
- TypeScript (`npm install typescript`)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/alexandruprodann/todomvc-playwright-ts.git
   ```
   
2. Navigate to the project folder:
   ```
   cd todomvc-playwright-ts
   ```
   
3. Install dependencies:
   ```
   npm install
   ```

### Running Tests

You can run all tests with the following command:
```
npx playwright test
```

### Running Tests with Specific Browser

You can specify the browser you want to use:
```
npx playwright test --project="Desktop Chrome"
```

### Running Tests in Headed mode

To run tests in headed mode, you can use:
```
npx playwright test --headed
```

### Running Smoke Tests

To only run the smoke tests, you can use:
```
npm run playwright:smoke
```
