const { AssignmentPattern } = require("../../variables/patterns")
const { TokenTypes, Error_ } = require("../../common")

function Parameter(tokens) {
  const left = tokens.next
  tokens.index++
  if(tokens.next.type !== TokenTypes.Punctuator) {
    Error_(tokens.next)
  }
  return tokens.next.value === "=" ? AssignmentPattern(tokens, left) : left
}

module.exports = {
  Parameter
}