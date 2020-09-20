const fs = require("fs");
const test = require("ava");
const max = require("./index");

test("gettings maximum from a normal array", (t) => {
  const numbers = [920, 550, 340, 690, 550, 340, 840, 700, 550, 210, 540];
  const result = max(numbers, { debug: false });
  t.is(result, 920);
});

test("getting maximum from an array of image band values", (t) => {
  const numbers = Uint8Array.from(
    JSON.parse(fs.readFileSync("uint8-numbers.json", "utf-8"))
  );
  console.log("loaded uint8 numbers of length:", numbers.length);
  const result = max(numbers, { debug: true });
  t.is(result, 255);
});

test("getting maximum from typed arrays", (t) => {
  [
    [Int8Array, 127],
    [Uint8Array, 255],
    [Int16Array, 32767],
    [Uint16Array, 65535],
  ].forEach(([array_type, expected_max]) => {
    const filename =
      array_type.name.replace("Array", "").toLowerCase() + "-numbers.json";
    const numbers = array_type.from(
      JSON.parse(fs.readFileSync(filename, "utf-8"))
    );
    const result = max(numbers, { debug: true });
    t.is(result, expected_max);
  });
});
