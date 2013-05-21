/*global describe:true, it:true, before:true, after:true, beforeEach:true, afterEach:true */
var range = require('../')
  , expect = require('chai').expect

function test(input, output) {
  it(JSON.stringify(input) + ' => ' + JSON.stringify(output), function () {
    expect(range(input)).to.deep.equal(output)
  })
}

describe('multi-range', function () {
  test('42', [42])
  test('20-22', [20, 21, 22])
  test('10-11,30-31', [10, 11, 30, 31])
  test('1,2-3,6-8', [1,2,3,6,7,8])
  test('5-1', [5,4,3,2,1])
})
