const fs = require("fs");
const test = require("flug");
const fastMax = require("./index");

test("bug", ({ eq }) => {
  eq(fastMax([255], { theoretical_max: 255 }), 255);
  eq(fastMax([75], { theoretical_max: 255 }), 75);
});

test("gettings maximum from a normal array", ({ eq }) => {
  const numbers = [920, 550, 340, 690, 550, 340, 840, 700, 550, 210, 540];
  const result = fastMax(numbers, { debug: false });
  eq(result, 920);
});

test("getting maximum from an array of image band values", ({ eq }) => {
  const numbers = Uint8Array.from(JSON.parse(fs.readFileSync("uint8-numbers.json", "utf-8")));
  console.log("loaded uint8 numbers of length:", numbers.length);
  const result = fastMax(numbers, { debug: false });
  eq(result, 255);
});

test("setting theoretical maximum", ({ eq }) => {
  const numbers = Array.from(Uint8Array.from(JSON.parse(fs.readFileSync("uint8-numbers.json", "utf-8"))));
  console.log("loaded uint8 numbers of length:", numbers.length);
  const result = fastMax(numbers, { debug: false, theoretical_max: 255 });
  eq(result, 255);
});

test("getting maximum from typed arrays", ({ eq }) => {
  [
    [Int8Array, 127],
    [Uint8Array, 255],
    [Int16Array, 32767],
    [Uint16Array, 65535]
  ].forEach(([array_type, expected_max]) => {
    const filename = array_type.name.replace("Array", "").toLowerCase() + "-numbers.json";
    const numbers = array_type.from(JSON.parse(fs.readFileSync(filename, "utf-8")));
    const result = fastMax(numbers, { debug: false });
    eq(result, expected_max);
  });
});

test("getting maximum from a very large untyped array", ({ eq }) => {
  const numbers = JSON.parse(fs.readFileSync("uint16-numbers.json", "utf-8")).map(n => Number(n));
  const result = fastMax(numbers, { debug: true });
  eq(result, 65535);
});

test("getting no maximum from normal arrays with all no data values", ({ eq }) => {
  const numbers = [99, 99, 99, 99];
  const result = fastMax(numbers, { no_data: 99 });
  eq(result, undefined);
});

test("getting maximum from normal arrays with some data values", ({ eq }) => {
  const numbers = [1, 99, 2, 99, 4, 99, 6, 99, -10];
  const result = fastMax(numbers, { no_data: 99 });
  eq(result, 6);
});

test("getting no maximum from typed arrays with all no data values", ({ eq }) => {
  const numbers = Uint8Array.from([99, 99, 99, 99]);
  const result = fastMax(numbers, { no_data: 99 });
  eq(result, undefined);
});

test("getting maximum from typed arrays with some data values", ({ eq }) => {
  const numbers = Int8Array.from([1, 99, 2, 99, 4, 99, 6, 99, -10]);
  const result = fastMax(numbers, { no_data: 99 });
  eq(result, 6);
});

test("multiple no data values", ({ eq }) => {
  const numbers = [99, 0, 7, 99, 5];
  const result = fastMax(numbers, { no_data: [7, 99] });
  eq(result, 5);
});

test("multiple no data and invalid values", ({ eq }) => {
  const numbers = [1, null, 99, 2, 99, undefined, 4, 99, 6, 99, -10, NaN];
  const result = fastMax(numbers, { no_data: [-10, 99] });
  eq(result, 6);
});
