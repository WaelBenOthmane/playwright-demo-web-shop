![Playwright Tests](https://github.com/WaelBenOthmane/playwright-demo-web-shop/actions/workflows/cicd.yml/badge.svg)

# OpenCart E2E Test Automation Framework

![Playwright Tests](https://github.com/WaelBenOthmane/playwright-demo-web-shop/actions/workflows/cicd.yml/badge.svg)

End-to-end test automation framework built with Playwright and TypeScript, testing a complete e-commerce user journey (OpenCart Demo), following the Page Object Model pattern with continuous integration.

## 🎯 Features Covered

- **Authentication**: valid/invalid login, error message handling
- **Product Search & Catalog**: search with/without results, navigating to a product page
- **Cart & Checkout**: adding to cart, updating quantity, full checkout flow through order confirmation

## 🛠️ Tech Stack

- [Playwright](https://playwright.dev/) + TypeScript
- Page Object Model (POM)
- Custom Playwright fixtures (reusable authentication)
- CI/CD with GitHub Actions

## 📐 Best Practices Applied

- Strict separation between business logic (Page Objects) and assertions (tests)
- Semantic locators (`getByRole`, `getByPlaceholder`) instead of fragile CSS/XPath selectors
- Web-first assertions (auto-retrying) to avoid flaky tests
- Custom fixtures to eliminate duplicated setup (authentication)
- Feature-based folder structure (`tests/e2e/<feature>/`)

## 🚀 Installation & Running Tests

\`\`\`bash
npm install
npx playwright install
npx playwright test
\`\`\`

View the HTML report:
\`\`\`bash
npx playwright show-report
\`\`\`

## 📂 Project Structure

\`\`\`
tests/e2e/       → test scenarios, organized by feature
pages/           → Page Objects
fixtures/        → test data and custom fixtures
\`\`\`

## 📝 About This Project

This project was built as a hands-on portfolio piece after completing the "Playwright E2E Test Automation with AI for Beginners" course, to practice and demonstrate Playwright best practices in a realistic, business-like setup.
