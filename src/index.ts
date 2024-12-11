#!/usr/bin/env node 

import CronTimeFormatter from "./formatter";

const commandArguments: string[] = process.argv.slice(2);
const argArray = commandArguments[0].split(" ");

if (argArray.length < 6) {
  throw new Error('Cron expression is invalid')
}

CronTimeFormatter.formatCronTime(argArray);
