// Environment variables type definitions
declare namespace NodeJS {
  interface ProcessEnv {
    // Application Environment
    NODE_ENV: 'development' | 'production' | 'test';

    // Base URL Configuration
    BASE_URL: string;
    API_BASE_URL: string;

    // Browser Configuration
    BROWSER: 'chromium' | 'firefox' | 'webkit';
    HEADLESS: string;
    SLOW_MO: string;

    // Test Configuration
    TEST_TIMEOUT: string;
    EXPECT_TIMEOUT: string;

    // Report Configuration
    REPORT_DIR: string;
    ALLURE_REPORT_DIR: string;

    // Logging
    LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';

    // Database (optional)
    DB_HOST?: string;
    DB_PORT?: string;
    DB_USER?: string;
    DB_PASSWORD?: string;
    DB_NAME?: string;

    // API Configuration (optional)
    API_KEY?: string;
    API_SECRET?: string;

    // Credentials (optional)
    USERNAME?: string;
    PASSWORD?: string;
  }
}
