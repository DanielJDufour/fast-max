const getTheoreticalMax = require("typed-array-ranges/get-max");

module.exports = function fastMax(
  numbers,
  { debug = false, no_data = undefined, theoretical_max = undefined } = {
    debug: false,
    no_data: undefined,
    theoretical_max: undefined,
  }
) {
  if (debug) console.log("[fast-max] starting with numbers:", numbers.slice(0, 10));

  if (!numbers.length) {
    if (debug) console.error("[fast-max] Instead of an array of numbers, you passed in", numbers);
    throw new Error("[fast-max] You didn't pass in an array of numbers");
  }
  if (numbers.length === 0) throw new Error("[fast-max] You passed in an empty array");

  let max;
  const length = numbers.length;

  if (debug) console.log("[fast-max] constructor:", numbers.constructor.name);

  if (theoretical_max === undefined) theoretical_max = getTheoreticalMax(numbers.constructor.name);

  if (debug) console.log("[fast-max] theoretical maximunm is", theoretical_max);
  if (theoretical_max) {
    if (no_data !== undefined) {
      max = -Infinity;
      for (let i = 1; i < length; i++) {
        const value = numbers[i];
        if (value > max && value !== no_data) {
          max = value;
          if (value >= theoretical_max) {
            if (debug) console.log("[fast-max] found maximum value of " + value + " at index " + i + " of " + length);
            break;
          }
        }
      }
      if (max === -Infinity) max = undefined;
    } else {
      max = numbers[0];
      for (let i = 1; i < length; i++) {
        const value = numbers[i];
        if (value > max) {
          max = value;
          if (value >= theoretical_max) {
            if (debug) console.log("[fast-max] found maximum value of " + value + " at index " + i + " of " + length);
            break;
          }
        }
      }
    }
  } else {
    if (no_data !== undefined) {
      max = -Infinity;
      for (let i = 0; i < length; i++) {
        const value = numbers[i];
        if (value > max && value !== no_data) {
          max = value;
        }
      }
      if (max === -Infinity) max = undefined;
    } else {
      max = numbers[0];
      for (let i = 1; i < length; i++) {
        const value = numbers[i];
        if (value > max) {
          max = value;
        }
      }
    }
  }

  if (debug) console.log("[fast-max] returning", max);
  return max;
};
