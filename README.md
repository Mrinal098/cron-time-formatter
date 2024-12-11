# Cron Time Formatter

This project provides a Node.js utility to parse and format cron expressions into a human-readable format. It validates the input and outputs the detailed breakdown of each field in the cron expression.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Error Handling](#error-handling)
- [Tests](#tests)
- [Development Notes](#development-notes)

---

## Requirements

- Node.js (v14 or higher)
- npm (or yarn)

The project is designed to run in a clean OSX/Linux environment. Ensure you have the required tools installed before proceeding.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

## Usage

The script is a command-line utility and can be run using Node.js.

### Run the Script

To execute the script, use the following command:

```bash
npm run build
npm run format "<cron-expression>"
```

### Example Cron Expression Format

A cron expression consists of 6 fields separated by spaces:

```
<minute> <hour> <day-of-month> <month> <day-of-week> <command>
```

Each field accepts:

- Numbers (e.g., `5`, `12`)
- Wildcards (`*`)
- Ranges (e.g., `1-5`)
- Lists (e.g., `1,2,3`)
- Steps (e.g., `*/2`)

---

## Example

### Input

```bash
npm run format "*/15 0 1,15 * 1-5 /usr/bin/find"
```

### Output

```
minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find
```

---

## Error Handling

The script validates the cron expression before processing. If the input is invalid, it throws an error with a descriptive message.

Example:

```bash
npm run format "*/15 0 * *"
```

Output:

```
Error: Cron expression is invalid
```

---

## Tests

This project includes automated tests to verify the functionality of the `CronTimeFormatter` class. The tests use the `vitest` framework.

### Running Tests

To execute the tests, run:

```bash
npm run test
```

### Test Cases

#### Test Case 1

Input:
```javascript
CronTimeFormatter.formatCronTime(["*/15", "0", "1,15", "*", "1-5", "/usr/bin/find"]);
```

Expected Output:
```javascript
{
  minute: [0, 15, 30, 45],
  hour: [0],
  dayOfMonth: [1, 15],
  month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  dayOfWeek: [1, 2, 3, 4, 5],
  command: "/usr/bin/find",
}
```

#### Test Case 2

Input:
```javascript
CronTimeFormatter.formatCronTime(["*/15", "2-22/4", "1,15", "*", "1-5", "/usr/bin/find"]);
```

Expected Output:
```javascript
{
  minute: [0, 15, 30, 45],
  hour: [2, 6, 10, 14, 18, 22],
  dayOfMonth: [1, 15],
  month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  dayOfWeek: [1, 2, 3, 4, 5],
  command: "/usr/bin/find",
}
```

---

## Development Notes

### Project Structure

- **index.ts**: Entry point for the utility.
- **formatter.ts**: Contains the `CronTimeFormatter` class with methods for parsing and formatting cron fields.
- **tests**: Includes test cases to verify script functionality.

### Key Features

- Parses each field of the cron expression.
- Supports wildcards, ranges, lists, and step values.
- Provides detailed, formatted output for easy understanding.

