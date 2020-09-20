# fast-max
:fire: The Quickest Way to get the Maximum Value of an Array of Numbers (Typed or Untyped)

# install
```
npm install fast-max
```

# why is it so much faster?
This library excels with typed arrays.  It takes into account the theoretical maximum of a typed array.
For example, if you have a  Uint8Array, it's not possible for a maximum value to be greater than 255,
so if we encounter a 255 in the array, we can stop searching for the maximum value.

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

# performance tests
Here are test results comparing fast-max to two other popular libraries underscore and lodash.
Tests have been conducted by creating an array of ten million random numbers from zero to the maximum
theoretical value of the typed array.
| array type | library | average duration in milliseconds |
| ---------- | ------- | -------------------------------- |
| Int8Array | fast-max | **0.1** | 
| Int8Array | lodash | 21.1 | 
| Int8Array | underscore | 13.1 | 
| Uint8Array | fast-max | **0.1** | 
| Uint8Array | lodash | 22 | 
| Uint8Array | underscore | 14.7 | 
| Int16Array | fast-max | **0.6** | 
| Int16Array | lodash | 20.9 | 
| Int16Array | underscore | 13 | 
| Uint16Array | fast-max | **0.9** | 
| Uint16Array | lodash | 20.8 | 
| Uint16Array | underscore | 15.5 | 
| Int32Array | fast-max | **14.1** | 
| Int32Array | lodash | 23.3 | 
| Int32Array | underscore | 14.2 | 
| Uint32Array | fast-max | **54.2** | 
| Uint32Array | lodash | 107.3 | 
| Uint32Array | underscore | 57 | 
| BigInt64Array | fast-max | **219** | 
| BigInt64Array | lodash | 246.9 | 
| BigInt64Array | underscore | 241.6 | 
| BigUint64Array | fast-max | **236.3** | 
| BigUint64Array | lodash | 239.4 | 
| BigUint64Array | underscore | 243.9 | 
