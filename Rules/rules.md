# ESLint Rules & Code Quality Guidelines

This document outlines the ESLint rules and code quality standards for the Advanced Playwright Framework project.

## TypeScript & Code Style Rules

### Strict Type Checking
- **no-any**: Disallow the use of `any` type without explicit annotation
- **no-implicit-any**: Variables must have explicit types
- **strict**: All strict type-checking options enabled

### Variable & Function Rules
- **no-unused-vars**: Flag unused variables and parameters
- **no-unused-expressions**: Disallow unused expressions
- **no-empty-function**: Disallow empty function declarations
- **no-var**: Use `let` or `const` instead of `var`
- **prefer-const**: Use `const` when variable is not reassigned

### Code Quality
- **eqeqeq**: Use `===` and `!==` instead of `==` and `!=`
- **no-console**: Warn on console.log usage in production code
- **no-debugger**: Flag debugger statements
- **no-duplicate-imports**: Prevent duplicate imports from the same module
- **no-implicit-coercion**: Avoid implicit type coercion

### Function & Class Rules
- **@typescript-eslint/explicit-function-return-types**: Functions must have explicit return types
- **@typescript-eslint/explicit-member-accessibility**: Class members must have visibility modifiers (public/private/protected)
- **@typescript-eslint/naming-convention**: Enforce consistent naming conventions
  - camelCase for variables, functions, and parameters
  - PascalCase for classes and interfaces
  - UPPER_CASE for constants

### Async/Promise Rules
- **no-floating-promises**: Disallow unhandled promise rejections
- **@typescript-eslint/no-misused-promises**: Proper promise usage in conditionals

### Import Rules
- **sort-imports**: Imports are automatically sorted alphabetically

## Running Linting

```bash
# Check for linting errors
npm run lint

# Automatically fix linting issues
npm run lint:fix

# Check code formatting
npm run format:check

# Format code according to rules
npm run format
```

## Pre-Commit Hook

Linting automatically runs on every code commit via husky and lint-staged. This ensures:
- All staged files are checked against ESLint rules
- Code formatting is validated with Prettier
- Commits cannot proceed if linting fails

## File-Specific Rules

### Test Files (`src/tests/**/*.spec.ts`)
- **no-console**: Allowed for test logging and debugging
- **@typescript-eslint/no-explicit-any**: Allowed in test fixtures and mocks

### Page Objects (`src/pages/**/*.ts`)
- **@typescript-eslint/explicit-function-return-types**: Strictly enforced
- Methods should clearly define return types for page interactions

### Configuration Files (`src/config/**/*.ts`)
- Constants must use UPPER_CASE naming
- No complex logic, configuration only

## Test Quality Checks

These rules ensure high-quality, maintainable test code in Playwright tests.

### Test Structure & Clarity
- **Test names must be descriptive**: Clearly indicate what is being tested
  ```typescript
  // ❌ Bad
  test('login test', async ({ page }) => {
  
  // ✅ Good
  test('should successfully log in with valid credentials', async ({ page }) => {
  ```
- **Each test should test one thing**: Follow Single Responsibility Principle
- **Avoid test interdependencies**: Tests must run independently
- **Use meaningful assertion messages**: Helps with debugging test failures

### Assertion Practices
- **No empty assertions**: Every assertion must have a clear purpose
  ```typescript
  // ❌ Bad
  expect(response).toBeTruthy();
  
  // ✅ Good
  expect(response.status()).toBe(200);
  ```
- **Specific assertions over generic**: Use exact matchers
- **Assert one logical thing per assertion**: Avoid multiple conditions

### Test Fixtures & Setup
- **Initialize fixtures properly**: Use `beforeEach` and `afterEach` hooks
- **Clean up resources**: Ensure all test data is cleaned up after tests
- **No hardcoded values**: Use test data from `src/testdata/`
- **Reuse Page Object methods**: Avoid duplicating element selectors

### Error Handling in Tests
- **No silently caught errors**: Always handle or log errors
- **Proper timeout management**: Set appropriate timeouts for async operations
  ```typescript
  // ❌ Bad
  await page.waitForSelector('.element');
  
  // ✅ Good
  await page.waitForSelector('.element', { timeout: 5000 });
  ```
- **Use try-catch wisely**: Catch only expected errors

### Test Performance
- **Minimize unnecessary waits**: Use smart waits instead of `page.waitForTimeout()`
- **Parallel test execution**: Write tests that can run in parallel
- **Avoid brittle selectors**: Use stable, meaningful selectors
- **No test data pollution**: Each test should start with a clean state

### Debugging & Logging
- **Use console for test insights**: Log important test events
  ```typescript
  console.log('Navigating to login page');
  console.warn('Unexpected element not found, retrying...');
  console.error('Test failed due to network timeout');
  ```
- **Leverage Playwright Debug Mode**: Use `--debug` flag for development
- **Attach screenshots on failure**: Helps troubleshoot flaky tests

### Code Organization in Tests
- **Group related tests with describe blocks**: Organize by feature/page
  ```typescript
  test.describe('Authentication Module', () => {
    test('should handle valid login', () => { });
    test('should reject invalid credentials', () => { });
  });
  ```
- **Use meaningful variable names**: Make test intent clear
- **Follow DRY principle**: Extract common test operations into helpers

## Prettier Configuration

Code is automatically formatted with Prettier using:
- 2-space indentation
- Single quotes for strings
- Trailing commas where valid
- 80-character line length

## Continuous Integration

All PRs must pass:
- ✅ ESLint validation (`npm run lint`)
- ✅ Type checking (`npm run type-check`)
- ✅ Prettier formatting (`npm run format:check`)
- ✅ All tests passing (`npm test`)

## Disabling Rules

To disable a rule for a specific line:
```typescript
// eslint-disable-next-line rule-name
const variable: any = value;
```

To disable a rule for an entire file:
```typescript
/* eslint-disable rule-name */
```

Only disable rules when absolutely necessary and with clear justification.
