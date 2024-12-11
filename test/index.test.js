import { expect, test } from "vitest";
import CronTimeFormatter from '../dist/formatter';

test("Test 1", () => {
  expect(
    CronTimeFormatter.formatCronTime([
      "*/15",
      "0",
      "1,15",
      "*",
      "1-5",
      "/usr/bin/find",
    ])
  ).toStrictEqual({
    minute: [0, 15, 30, 45],
    hour: [0],
    dayOfMonth: [1, 15],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    dayOfWeek: [1, 2, 3, 4, 5],
    command: "/usr/bin/find",
  });
});

test("Test 2", () => {
  expect(
    CronTimeFormatter.formatCronTime([
      "*/15",
      "2-22/4",
      "1,15",
      "*",
      "1-5",
      "/usr/bin/find",
    ])
  ).toStrictEqual({
    minute: [0, 15, 30, 45],
    hour: [2, 6, 10, 14, 18, 22],
    dayOfMonth: [1, 15],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    dayOfWeek: [1, 2, 3, 4, 5],
    command: "/usr/bin/find",
  });
});
