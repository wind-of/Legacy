const { NUMBER_RE, IDENTIFIER_RE } = require("../common")

function punctuatorsHandler(value, i, input) {
  if(value === "." && input[i + 1] === "." && input[i + 2] === ".") {
    value = "..."
    i += 2
  }
  if(value === "+" && input[i + 1] === "+") {
    value = "++"
    i++
  }
  if(value === "-" && input[i + 1] === "--") {
    value = "--"
    i++
  }
  if(value === "*" && input[i + 1] === "*") {
    value = "**"
    i++
  }
  if(value === "=") {
    if(input[i + 1] === ">") {
      value = "=>"
      i++
    }
    if(input[i + 1] === "=") {
      value = "=="
      i++
      if(input[i + 1] === "=") {
        value = "==="
        i++
      }
    }
  }
  if(value === "<") {
    if(input[i + 1] === "<") {
      value = "<<"
      i++
    }
    if(input[i + 1] === "=") {
      value = "<="
      i++
    }
  }
  if(value === ">") {
    if(input[i + 1] === "=") {
      value = ">="
      i++
    }
    if(input[i + 1] === ">") {
      value = ">>"
      i++
      if(input[i + 1] === ">") {
        value = ">>>"
        i++
      }
    }
  }
  return { v: value, index: i }
}
function numbersHandler(value, i, input) {
  while(NUMBER_RE.test(value + input[i + 1])) value += input[++i]
  return { v: value, index: i }
}
function identifiersHandler(value, i, input) {
  while(IDENTIFIER_RE.test(value + input[i + 1]) && i + 1 < input.length) value += input[++i]
  value = value.trim()
  return { v: value, index: i }
}

const Lexic = {
  punctuatorsHandler,
  numbersHandler,
  identifiersHandler
}

module.exports = {
  Lexic
}