const {
  ITransform,
  getCorrectTransform,
  TruncateTransform,
  HashTransform,
  ClearValueTransform,
  RandomizeDate,
  HidePhoneNumberTransform,
} = require("../../build/main/classes/ObfuscationTransform");
const handlers = require("../../build/main/handlers");
const CSVParser = require("../../build/main/classes/CSVParser");

var assert = require('assert');




describe('Obfuscation transforms', function () {
  describe('Hash', function () {
    it('should correctly hash the provided value', function () {
      let t = new HashTransform("test");
      let newVal = t.apply("Austin");
      console.log(newVal)
      assert.equal(newVal, "54c3265daedcd4e9f97fe63e102c3307")
    });
  });
  describe('Truncate', function () {
    it('should correctly truncate the provided value', function () {
      let t = new TruncateTransform("test",{numChars:5});
      let newVal = t.apply("Austin");
      assert.equal(newVal, "Austi")
    });
  });
  describe('Random Date', function () {
    it('should correctly randomize the provided date value', function () {
      let t = new RandomizeDate("test");
      let newVal = t.apply("12/03/25");
      assert.ok(newVal)
    });
  });
  describe('Phone Number Hide', function () {
    it('should correctly hide the specified parts of phone number', function () {
      let t = new HidePhoneNumberTransform("test", {leftNum:0,rightNum:7});
      let newVal = t.apply("(123)-456-7890");
      assert.equal(newVal, "(123)-XXX-XXXX")
    });
  });
  describe('Run Pipeline', async function() {
    it('should work lolz', async function() {
      let transforms = [
        new HashTransform("firstName").getTransform(),
        new TruncateTransform("firstName", {numChars:5}).getTransform(),
        new ClearValueTransform("email").getTransform(),
        new RandomizeDate("birthDate", {targetFormat:"YYYY-MM-DD"}).getTransform(),
        new HidePhoneNumberTransform("phone", {leftNum:0,rightNum:4}).getTransform()
      ]
      let srcFile = "csvs/1bfc621b866523557cecdd84385e8630";
      let destFile = "out/test.csv";

      await new CSVParser.CSVParser(srcFile).runTransformPipeline(transforms, destFile);
    })

  })
});