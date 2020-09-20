const THEORETICAL_MAXIMUMS = {
  Array: null,
  Int8Array: 127, // Math.pow(2, 8 - 1) - 1
  Uint8Array: 255, // Math.pow(2, 8) - 1
  Uint8ClampedArray: 255, // Math.pow(2, 8) - 1
  Int16Array: 32767, // Math.pow(2, 16 - 1) - 1
  Uint16Array: 65535, // Math.pow(2, 16) - 1
  Int32Array: 2147483647, // Math.pow(2, 32 - 1) - 1
  Uint32Array: 4294967295, // Math.pow(2, 32) - 1
  Float32Array: 3.4e38, // 3.4 * Math.pow(10, 38)
  Float64Array: null,
  // skipping Float64Array because 1.8 * Math.pow(10, 308) returns Infinity
  // 'Float64Array': Infinity, // 1.8 * Math.pow(10, 308)
  BigInt64Array: 9223372036854776000, // Math.pow(2, 64 - 1) - 1
  BigUint64Array: 18446744073709552000, // Math.pow(2, 64) - 1
};

module.exports = function fastMax(
  numbers,
  { debug = false } = { debug: false }
) {
  if (debug)
    console.log("[fast-max] starting with numbers:", numbers.slice(0, 10));

  if (!numbers.length) {
    if (debug)
      console.error(
        "[fast-max] Instead of an array of numbers, you passed in",
        numbers
      );
    throw new Error("[fast-max] You didn't pass in an array of numbers");
  }
  if (numbers.length === 0)
    throw new Error("[fast-max] You passed in an empty array");

  let max = numbers[0];
  const length = numbers.length;

  if (debug) console.log("[fast-max] constructor:", numbers.constructor.name);

  let theoretical_max = THEORETICAL_MAXIMUMS[numbers.constructor.name];
  if (debug) console.log("[fast-max] theoretical maximunm is", theoretical_max);
  if (theoretical_max) {
    for (let i = 1; i < length; i++) {
      const value = numbers[i];
      if (value > max) {
        max = value;
        if (value === theoretical_max) {
          if (debug)
            console.log(
              "[fast-max] found maximum value of " +
                value +
                " at index " +
                i +
                " of " +
                length
            );
          break;
        }
      }
    }
  } else {
    for (let i = 1; i < length; i++) {
      const value = numbers[i];
      if (value > max) {
        max = value;
      }
    }
  }

  if (debug) console.log("[fast-max] returning", max);
  return max;
};
