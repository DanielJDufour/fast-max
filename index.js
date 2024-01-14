const getTheoreticalMax = require("typed-array-ranges/get-max");

function fastMax(
  numbers,
  { debug = false, no_data = undefined, theoretical_max = undefined } = {
    debug: false,
    no_data: undefined,
    theoretical_max: undefined
  }
) {
  if (debug) console.log("[fast-max] starting with numbers:", numbers.slice(0, 10));

  if (!numbers.length) {
    if (debug) console.error("[fast-max] Instead of an array of numbers, you passed in", numbers);
    throw new Error("[fast-max] You didn't pass in an array of numbers");
  }
  if (numbers.length === 0) throw new Error("[fast-max] You passed in an empty array");

  if (Array.isArray(no_data) === false) {
    if (typeof no_data === "number") {
      no_data = [no_data];
    } else {
      no_data = [];
    }
  }

  let max;
  const length = numbers.length;

  if (debug) console.log("[fast-max] constructor:", numbers.constructor.name);

  if (theoretical_max === undefined || theoretical_max === null)
    theoretical_max = getTheoreticalMax(numbers.constructor.name);
  if (debug) console.log("[fast-max] theoretical maximunm is", theoretical_max);

  for (let i = 0; i < length; i++) {
    const value = numbers[i];
    if (typeof value === "number" && value === value && no_data.indexOf(value) === -1) {
      if (typeof max === "undefined") {
        max = value;
      } else if (value > max) {
        max = value;
      }
      if (typeof theoretical_max === "number" && value >= theoretical_max) {
        if (debug) console.log("[fast-max] found maximum value of " + value + " at index " + i + " of " + length);
        max = value;
        break;
      }
    }
  }

  if (debug) console.log("[fast-max] returning", max);
  return max;
}

if (typeof module === "object") {
  module.exports = fastMax;
  module.exports.default = fastMax;
}

if (typeof self === "object") {
  self.fastMax = fastMax;
}

if (typeof window === "object") {
  window.fastMax = fastMax;
}
