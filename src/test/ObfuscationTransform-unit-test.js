const {
  ITransform,
  getCorrectTransform,
  TruncateTransform,
  HashTransform,
} = require("../../build/main/classes/ObfuscationTransform");

var assert = require('assert');




describe('Obfuscation transforms', function () {
  describe('Hash', function () {
    it('should correctly hash the provided value', function () {
      let t = new HashTransform();
      let newVal = t.apply("Austin");
      console.log(newVal)
      assert.equal(newVal, "54c3265daedcd4e9f97fe63e102c3307")
    });
  });
  describe('Truncate', function () {
    it('should correctly truncate the provided value', function () {
      let t = new TruncateTransform({numChars:5});
      let newVal = t.apply("Austin");
      console.log(newVal)
      assert.equal(newVal, "Austi")
    });
  });
});