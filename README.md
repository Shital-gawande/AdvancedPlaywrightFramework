# Advanced Playwright Framework

A comprehensive, production-ready testing framework built with Playwright, TypeScript, and Page Object Model (POM) design pattern. This framework is designed for scalable end-to-end testing with built-in reporting, linting, and Docker support.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Code Quality](#code-quality)
- [Docker Usage](#docker-usage)
- [Environment Variables](#environment-variables)
- [Reporting](#reporting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Page Object Model (POM)**: Well-organized, maintainable test structure
- **TypeScript Support**: Full type safety and IDE autocomplete
- **ESLint & Prettier**: Automatic code linting and formatting
- **Pre-commit Hooks**: Code quality checks on every commit using Husky
- **Allure Reporting**: Beautiful, detailed test reports
- **Docker Support**: Run tests in containerized environments
- **Environment Configuration**: Flexible .env-based configuration
- **Type-Safe Environment Variables**: Full TypeScript support for process.env
- **Multiple Browsers**: Support for Chromium, Firefox, and WebKit

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: For version control
- **Docker** (optional): For containerized testing

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Shital-gawande/AdvancedPlaywrightFramework.git
cd AdvancedPlaywrightFramework
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Initialize Husky (Git Hooks)

```bash
npx husky install
```

### 4. Setup Environment Variables

```bash
# Copy the template
cp .env .env.local

# Edit with your configuration
# .env.local is in .gitignore, so your sensitive data stays local
```

## 📁 Project Structure

```
AdvancedPlaywrightFramework/
├── src/
│   ├── api/                 # API test utilities and helpers
│   ├── config/              # Configuration files
│   ├── fixtures/            # Playwright fixtures
│   ├── modules/             # Custom modules and utilities
│   ├── pages/               # Page Object Model classes
│   ├── testdata/            # Test data and fixtures
│   ├── tests/               # Test specifications
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── .env                     # Environment template
├── .env.local              # Local environment (git ignored)
├── .eslintrc.json          # ESLint configuration
├── .prettierrc.json        # Prettier formatting config
├── .husky/                 # Git hooks
├── Dockerfile              # Docker configuration
├── tsconfig.json           # TypeScript configuration
├── playwright.config.ts    # Playwright configuration
├── package.json            # Dependencies and scripts
└── rules.md                # ESLint rules documentation
```

## ⚙️ Configuration

### TypeScript Configuration

Configured in `tsconfig.json` with:
- ES2020 target
- Strict type checking enabled
- Path aliases for easy imports:
  - `@/*` → `src/*`
  - `@pages/*` → `src/pages/*`
  - `@api/*` → `src/api/*`
  - `@tests/*` → `src/tests/*`
  - And more...

### Playwright Configuration

Configure test browsers, timeouts, and reporters in `playwright.config.ts`:

```typescript
// Example: Run tests in headless mode with screenshot on failure
{
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
}
```

### ESLint & Code Quality

- Strict TypeScript linting enabled
- Naming conventions enforced (camelCase, PascalCase, UPPER_CASE)
- Pre-commit hooks automatically fix violations
- See [rules.md](rules.md) for detailed rules

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode

```bash
npm run test:headed
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Tests with Interactive UI

```bash
npm run test:ui
```

### View Test Reports

```bash
npm run test:report
```

### Type Check

```bash
npm run type-check
```

## 🔍 Code Quality

### Linting

```bash
# Check for linting errors
npm run lint

# Automatically fix linting issues
npm run lint:fix
```

### Code Formatting

```bash
# Check formatting
npm run format:check

# Format code
npm run format
```

### Pre-commit Checks

Automatically runs on every commit:
- ✅ ESLint validation
- ✅ Prettier formatting
- ✅ Type checking

To bypass (not recommended):
```bash
git commit --no-verify
```

## 🐳 Docker Usage

### Build Docker Image

```bash
docker build -t playwright-framework:latest .
```

### Run Tests in Docker

```bash
docker run --rm playwright-framework:latest npm test
```

### Run with Custom Environment

```bash
docker run --rm \
  -e BASE_URL=http://staging.example.com \
  -e BROWSER=firefox \
  playwright-framework:latest npm test
```

## 🔐 Environment Variables

Create `.env.local` based on `.env` template:

```env
# Application
NODE_ENV=development
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:3001

# Browser
BROWSER=chromium
HEADLESS=true
SLOW_MO=0

# Timeouts (in milliseconds)
TEST_TIMEOUT=30000
EXPECT_TIMEOUT=5000

# Reporting
REPORT_DIR=./playwright-report
ALLURE_REPORT_DIR=./allure-report

# Logging
LOG_LEVEL=info
```

All environment variables are type-safe in TypeScript. Access them with:

```typescript
const baseUrl = process.env.BASE_URL; // Full type support
```

## 📊 Reporting

### Playwright Report

```bash
npm run test:report
```

### Allure Report (if configured)

```bash
npm run test  # Tests must run first
allure generate --clean -o allure-report
allure open
```

## 🤝 Contributing

### Code Standards

1. **Follow ESLint Rules**: See [rules.md](rules.md)
2. **Use Page Object Model**: Maintain organized test structure
3. **Type Everything**: Avoid `any` types
4. **Write Descriptive Tests**: Clear test names and comments
5. **Keep Tests Independent**: No test dependency
6. **Use Environment Variables**: Don't hardcode URLs or credentials

### Creating a New Page Object

```typescript
// src/pages/LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.page.isVisible('[data-testid="user-profile"]');
  }
}
```

### Creating a Test

```typescript
// src/tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully', async () => {
    await loginPage.login('user@example.com', 'password123');
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });
});
```

## 📝 Git Workflow

```bash
# Create a feature branch
git checkout -b feature/new-feature

# Make changes and commit (pre-commit hooks run automatically)
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request on GitHub
```

## 🐛 Troubleshooting

### Issue: Pre-commit hooks not running

```bash
# Reinstall Husky
npx husky install
chmod +x .husky/pre-commit
```

### Issue: ESLint errors after commit

```bash
npm run lint:fix
git add .
git commit --amend --no-edit
```

### Issue: Tests timing out

Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60000, // 60 seconds
```

### Issue: Port already in use

```bash
# Find and kill process on port
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [ESLint Rules](./rules.md)
- [Allure Report](https://docs.qameta.io/allure)

## 📄 License

ISC License - see LICENSE file for details

## 👥 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new GitHub issue with detailed description
3. Contact the QA Team

---

**Happy Testing! 🚀**
