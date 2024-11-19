# TodoMVC Automation Test with Playwright

## Overview
This project contains an automated UI test written in Playwright for interacting with the TodoMVC web application. The test script navigates to the app, verifies the page title and URL, adds and verifies TODO items, marks items as completed, and deletes items, capturing screenshots throughout.

## Project Structure
- **Challenge1.spec.js**: The main test script containing all test steps with detailed assertions and actions.
- **playwright.config.js**: The Playwright configuration file, specifying browser settings, test reporters, and other configurations.
- **screenshots/**: A directory where test screenshots are saved after each test step for better test tracking.
- **test-results**: A folder which has captured the video and stored it as video.webm

## Prerequisites
- Node.js (version 14 or higher)
- Playwright installed globally or locally in your project
- Allure command-line tool for generating test reports (optional)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/todomvc-playwright-tests.git
    cd todomvc-playwright-tests
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Install Playwright browsers:
    ```bash
    npx playwright install
    ```

## Running the Test
To run the test script, use the following command:
```bash
npx playwright test tests/Challenge1.spec.js
npx playwright show-report
allure generate allure-results -o allure-report --clean 
allure open allure-report
