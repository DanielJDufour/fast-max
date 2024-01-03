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
const fastMax = require("fast-max"); // or import max from "fast-max";

const result = fastMax([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// result is 10
```

# getting maximum value of a typed array
```javascript
const fastMax = require("fast-max");

const pixel_values = Uint8Array.from([0, 128, 255, 34, ...]);
const result = fastMax(pixel_values);
// result is 255
```

# setting theoretical maximum
If you know that an array's values can't exceed a specific number,
you can set the theoretical_max.
```javascript
const fastMax = require("fast-max");

const numbers = [0, 9, 4, 2, 10, ...]);
const result = fastMax(numbers, { theoretical_max: 10 });
// result is 10
```

# no data value
If you want to ignore one or more specific values, you can set the no_data value.
```javascript
const fastMax = require("fast-max");

const numbers = [99, 0, 7, 99, 5, ...];
const result = fastMax(numbers, { no_data: 99 });
// result is 7

const result = fastMax(numbers, { no_data: [7, 99] });
// result is still 5
```

# performance tests
Here are test results comparing fast-max to two other popular libraries underscore and lodash.
Tests have been conducted by creating an array of ten million random numbers from zero to the maximum
theoretical value of the typed array.
| array type | library | average duration in milliseconds |
| ---------- | ------- | -------------------------------- |
| Int8Array | fast-max | **0.1** | 
| Int8Array | lodash | 21.1 | 
| Int8Array | underscore | 9.4 | 
| Uint8Array | fast-max | **0.1** | 
| Uint8Array | lodash | 20.8 | 
| Uint8Array | underscore | 9.4 | 
| Int16Array | fast-max | **0.9** | 
| Int16Array | lodash | 20.8 | 
| Int16Array | underscore | 9.3 | 
| Uint16Array | fast-max | **2.8** | 
| Uint16Array | lodash | 20.8 | 
| Uint16Array | underscore | 9.8 | 
| Int32Array | fast-max | **51.5** | 
| Int32Array | lodash | 21.6 | 
| Int32Array | underscore | 9.6 | 
| Uint32Array | fast-max | **114.3** | 
| Uint32Array | lodash | 23.4 | 
| Uint32Array | underscore | 13.3 | 
| BigInt64Array | fast-max | **53.1** | 
| BigInt64Array | lodash | 83.5 | 
| BigInt64Array | underscore | 64.8 | 
| BigUint64Array | fast-max | **50.9** | 
| BigUint64Array | lodash | 110.1 | 
| BigUint64Array | underscore | 98.5 | 
