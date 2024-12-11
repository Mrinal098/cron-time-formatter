# Cron Time Formatter

`cron-time-formatter` is a CLI tool to parse and format cron expressions into a human-readable format. It also breaks down the cron expression into its components (minute, hour, day of month, month, day of week) and prints them in a structured manner.

## Installation

Install the package globally to use it as a command-line tool:

```bash
npm install -g cron-time-formatter
```

## Usage

Run the `cron-time-formatter` command with a valid cron expression:

```bash
cron-time-formatter "*/15 0 1,15 * 1-5 /usr/bin/find"
```

### Example Output

For the input:

```bash
cron-time-formatter "*/15 0 1,15 * 1-5 /usr/bin/find"
```

The output will be:

```
minute         0 15 30 45
hour           0
day of month   1 15
month          1 2 3 4 5 6 7 8 9 10 11 12
day of week    1 2 3 4 5
command        /usr/bin/find
```

## Features

- Parses standard cron expressions.
- Validates the cron expression for correctness.
- Outputs each field of the cron expression in a human-readable format.

## Cron Expression Format

A cron expression consists of five fields, followed by a command:

```
<minute> <hour> <day-of-month> <month> <day-of-week> <command>
```

### Field Ranges

| Field         | Allowed Values         |
|---------------|------------------------|
| Minute        | 0-59                  |
| Hour          | 0-23                  |
| Day of Month  | 1-31                  |
| Month         | 1-12                  |
| Day of Week   | 1-7                   |

### Special Characters

- `*` - Matches all possible values.
- `,` - Specifies a list of values.
- `-` - Specifies a range of values.
- `/` - Specifies step values.

## Development

If you want to contribute or run the tool locally during development:

1. Clone the repository:

   ```bash
   git clone https://github.com/Mrinal098/cron-time-formatter.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Run the CLI:

   ```bash
   npm run format "*/15 0 1,15 * 1-5 /usr/bin/find"
   ```

## Testing

Run tests using [Vitest](https://vitest.dev/):

```bash
npm run test
```

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).


