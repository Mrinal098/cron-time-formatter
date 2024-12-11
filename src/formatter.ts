class CronTimeFormatter {
  public formatCronTime(args: string[]): {
    minute: (string | number)[];
    hour: (string | number)[];
    dayOfMonth: (string | number)[];
    month: (string | number)[];
    dayOfWeek: (string | number)[];
    command: string
  } {
    const [minuteArg, hourArg, dayOfMonthArg, monthArg, dayOfWeekArg, command] =
      args;

    const formattedTime = {
      minute: this.parseField(minuteArg, 60),
      hour: this.parseField(hourArg, 24),
      dayOfMonth: this.parseField(dayOfMonthArg, 31, false),
      month: this.parseField(monthArg, 12, false),
      dayOfWeek: this.parseField(dayOfWeekArg, 7, false),
      command,
    };

    console.log(`${"minute".padEnd(14)}${formattedTime.minute.join(" ")}`);
    console.log(`${"hour".padEnd(14)}${formattedTime.hour.join(" ")}`);
    console.log(
      `${"day of month".padEnd(14)}${formattedTime.dayOfMonth.join(" ")}`
    );
    console.log(`${"month".padEnd(14)}${formattedTime.month.join(" ")}`);
    console.log(
      `${"day of week".padEnd(14)}${formattedTime.dayOfWeek.join(" ")}`
    );
    console.log(`${"command".padEnd(14)}${formattedTime.command}`);

    return formattedTime;
  }

  private parseField(
    field: string,
    maxLimit: number,
    isStartIndexZero = true
  ): (number | string)[] {
    const regexToCheckCommaSeparatedString = /^\d+(,\d+)*$/;
    const regexToCheckDashSeparatedString = /^\d+-\d+$/;
    const regexToCheckSlashSeparatedString = /^(\d+(-\d+)?|\*)\/\d+$/;
    const regexToCheckSingleNumber = /^\d+$/;

    if (field === "*") {
      return this.expandAsterisk(maxLimit, isStartIndexZero);
    } else if (regexToCheckSlashSeparatedString.test(field)) {
      return this.expandStep(
        field,
        maxLimit,
        regexToCheckSingleNumber,
        isStartIndexZero
      );
    } else if (regexToCheckSingleNumber.test(field)) {
      return this.expandSingleNumber(field, maxLimit, isStartIndexZero);
    } else if (regexToCheckCommaSeparatedString.test(field)) {
      return this.expandCommaSeparated(field, maxLimit, isStartIndexZero);
    } else if (regexToCheckDashSeparatedString.test(field)) {
      return this.expandRange(field, maxLimit, isStartIndexZero);
    }
    return [];
  }

  private expandAsterisk(
    maxLimit: number,
    isStartIndexZero: boolean
  ): number[] {
    return Array.from({ length: maxLimit }, (_, i) =>
      isStartIndexZero ? i : i + 1
    );
  }

  private expandStep(
    field: string,
    maxLimit: number,
    regexToCheckSingleNumber: RegExp,
    isStartIndexZero: boolean
  ): number[] {
    const [range, step] = field.split("/");
    if (
      parseInt(step) <= 0 ||
      (isStartIndexZero && parseInt(step) >= maxLimit) ||
      (!isStartIndexZero && parseInt(step) > maxLimit)
    ) {
      return [];
    }

    if (range.includes("-")) {
      const expandedRange = this.expandRange(range, maxLimit, isStartIndexZero);
      if (expandedRange.length) {
        let start = expandedRange[0];
        const end = expandedRange[expandedRange.length - 1];

        return Array.from(
          { length: Math.floor((end - expandedRange[0]) / parseInt(step) + 1) },
          (_, i) => {
            start = start + (i ? parseInt(step) : i);
            return start;
          }
        );
      }
    } else if (regexToCheckSingleNumber.test(range)) {
      let start = parseInt(range);
      return Array.from(
        {
          length: Math.floor((maxLimit - parseInt(range)) / parseInt(step) + 1),
        },
        (_, i) => {
          start = start + (i ? parseInt(step) : i);
          return start;
        }
      );
    } else if (range === "*") {
      return Array.from(
        { length: Math.ceil(maxLimit / parseInt(step)) },
        (_, i) => (isStartIndexZero ? i : i + 1) * parseInt(step)
      );
    }

    return [];
  }

  private expandSingleNumber(
    field: string,
    maxLimit: number,
    isStartIndexZero: boolean
  ): number[] {
    const num = parseInt(field);
    return isStartIndexZero && num >= 0 && num < maxLimit
      ? [num]
      : !isStartIndexZero && num > 0 && num <= maxLimit
      ? [num]
      : [];
  }

  private expandCommaSeparated(
    field: string,
    maxLimit: number,
    isStartIndexZero: boolean
  ): number[] {
    const fieldsArray = field.split(",");
    const expandedValues = fieldsArray.filter(
      (num) =>
        (isStartIndexZero && Number(num) >= 0 && Number(num) < maxLimit) ||
        (!isStartIndexZero && Number(num) > 0 && Number(num) <= maxLimit)
    ).map(Number);

    if (expandedValues.length !== fieldsArray.length) {
      return [];
    }
    return expandedValues;
  }

  private expandRange(
    field: string,
    maxLimit: number,
    isStartIndexZero: boolean
  ): number[] {
    const [start, end] = field.split("-");
    if (
      (isStartIndexZero &&
        Number(start) >= 0 &&
        Number(end) >= 0 &&
        Number(start) < maxLimit &&
        Number(end) < maxLimit &&
        Number(start) <= Number(end)) ||
      (!isStartIndexZero &&
        Number(start) > 0 &&
        Number(end) > 0 &&
        Number(start) <= maxLimit &&
        Number(end) <= maxLimit &&
        Number(start) <= Number(end))
    ) {
      return Array.from(
        { length: Number(end) - Number(start) + 1 },
        (_, i) => Number(start) + i
      );
    }
    return [];
  }
}

export default new CronTimeFormatter();