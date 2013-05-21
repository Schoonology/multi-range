//
// Flattens an Array of Arrays and other content into a single-depth Array.
//
function flatten(arr) {
  if (!Array.isArray(arr)) {
    return arr
  }

  return arr.reduce(function (all, piece) {
    return all.concat(flatten(piece))
  }, [])
}

//
// Returns an Array of Integers from **from** to **to**, inclusive.
//
function range(from, to) {
  var arr = []

  if (from > to) {
    for (; from >= to; from--) {
      arr.push(from)
    }
  } else {
    for (; from <= to; from ++) {
      arr.push(from)
    }
  }

  return arr
}

//
// Returns an Array of Integers based on the content of **str**.
//
function parseRange(str) {
  var numbers = str.split('-')

  numbers = numbers.map(function (num) {
    return parseInt(num, 10)
  })

  if (numbers.length > 1) {
    numbers = numbers.reduce(function (prev, curr) {
      return range(prev, curr)
    })
  }

  return flatten(numbers)
}

//
// Returns an Array of Integers based on the content of **str**.
//
function parseMultiRange(str) {
  return flatten(str.split(',').map(parseRange))
}

module.exports = parseMultiRange
