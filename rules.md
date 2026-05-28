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
