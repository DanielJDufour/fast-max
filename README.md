# fast-max
:fire: The Quickest Way to get the Maximum Value of an Array of Numbers (Typed or Untyped)

# install
```
npm install fast-max
```

# why is it so much faster?
This library excels with typed arrays.  It takes into account the theoretical maximum of a typed array.
For example, if you have a  Uint8Array, it's not possible for a maximum value to be greater than 255,
so if we encounter a 255 in the array, we can stop searching for a higher value.

# usage
# getting maximum value of a normal array
```javascript
const max = require("fast-max");

const result = max([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// result is 10
```

# getting maximum value of a typed array
```javascript
const max = require("fast-max");

const pixel_values = Uint8Array.from([0, 128, 255, 34, ...]);
const result = max(pixel_values);
// result is 255
```

# setting theoretical maximum
If you know that an array's values can't exceed a specific number,
you can set the theoretical_max.
```javascript
const max = require("fast-max");

const numbers = [0, 9, 4, 2, 10, ...]);
const result = max(numbers, { theoretical_max: 10 });
// result is 10
```

# no data value
If you want to ignore a specific value, you can set the no_data value.
```javascript
const max = require("fast-max");

const numbers = [99, 0, 7, 99, 5, ...]);
const result = max(numbers, { no_data: 99 });
// result is 7
```

# performance tests
Here are test results comparing fast-max to two other popular libraries underscore and lodash.
Tests have been conducted by creating an array of ten million random numbers from zero to the maximum
theoretical value of the typed array.
| array type | library | average duration in milliseconds |
| ---------- | ------- | -------------------------------- |
| Int8Array | fast-max | **< 1** |
| Int8Array | lodash | 21.2 |
| Int8Array | underscore | 12.4 |
| Uint8Array | fast-max | **0.1** |
| Uint8Array | lodash | 21 |
| Uint8Array | underscore | 12.7 |
| Int16Array | fast-max | **0.8** |
| Int16Array | lodash | 22 |
| Int16Array | underscore | 12.7 |
| Uint16Array | fast-max | **1.2** |
| Uint16Array | lodash | 20.7 |
| Uint16Array | underscore | 12.3 |
| Int32Array | fast-max | **14.1** |
| Int32Array | lodash | 23.3 |
| Int32Array | underscore | 14.2 |
| Uint32Array | fast-max | **13.5** |
| Uint32Array | lodash | 61.2 |
| Uint32Array | underscore | 14.4 |
| BigInt64Array | fast-max | **202.6** |
| BigInt64Array | lodash | 212.3 |
| BigInt64Array | underscore | 207.7 |
| BigUint64Array | fast-max | **195.5** |
| BigUint64Array | lodash | 208.8 |
| BigUint64Array | underscore | 204.1 |
