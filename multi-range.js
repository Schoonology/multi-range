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

//
// Returns a String range given a String range and the next adjacent value.
//
function addToRange(str, value) {
  var arr = str.split('-')
  if (arr.length === 1) {
    arr.push(value)
  } else {
    arr[arr.length - 1] = value
  }
  return arr.join('-')
}

//
// Returns a `range`-compatible Array of Strings, given an Array of Numbers.
//
function compileMultiRange(arr) {
  var retval = []

  retval = arr
    .map(Number)
    .reduce(function (arr, value, index) {
      arr[index] = {
        value: value,
        delta: arr[0] ? (value - arr[index - 1].value) : 0
      }

      return arr
    }, new Array(arr.length))
    .reduce(function (arr, curr) {
      var prev = arr[arr.length - 1]

      if (prev && (prev.delta === 0 || prev.delta === curr.delta) && Math.abs(curr.delta) === 1) {
        prev.value = addToRange(prev.value, curr.value)
        prev.delta = curr.delta
        return arr
      }

      curr.value = String(curr.value)
      curr.delta = 0
      arr.push(curr)
      return arr
    }, [])
    .map(function (obj) {
      return obj.value
    })

  return retval.join(',')
}

//
// Export `parseMultiRange`.
//
module.exports = parseMultiRange
module.exports.range = parseMultiRange
module.exports.compile = compileMultiRange
