/*global describe:true, it:true, before:true, after:true, beforeEach:true, afterEach:true */
var range = require('../')
  , expect = require('chai').expect

function test(str, arr) {
  it(JSON.stringify(str) + ' => ' + JSON.stringify(arr), function () {
    expect(range(str)).to.deep.equal(arr)
  })

  it(JSON.stringify(arr) + ' => ' + JSON.stringify(str), function () {
    expect(range.compile(arr)).to.deep.equal(str)
  })
}

describe('multi-range', function () {
  test('42', [42])
  test('20-22', [20, 21, 22])
  test('10-11,30-31', [10, 11, 30, 31])
  test('1,3-4,6-8', [1,3,4,6,7,8])
  test('5-1', [5,4,3,2,1])
  test('1,3,5,7,9', [1,3,5,7,9])
})
