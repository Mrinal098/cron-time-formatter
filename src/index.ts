#!/usr/bin/env node 

import CronTimeFormatter from "./formatter";

const commandArguments: string[] = process.argv.slice(2);
const argArray = commandArguments[0]?.split(" ");

if (!argArray) {
  console.error("Please pass Cron expression");
  process.exit();
}

if (argArray.length < 6) {
  console.error("Cron expression is invalid");
  process.exit();
}

CronTimeFormatter.formatCronTime(argArray);
