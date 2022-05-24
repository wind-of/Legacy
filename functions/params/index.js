const { TokenTypes, Error_ } = require("../../common")

function paramHandler(tokens) {
  const left = tokens.next
  tokens.index++
  if(tokens.next.type !== TokenTypes.Punctuator) {
    Error_(tokens.next)
  }
  return tokens.next.value === "=" ? AssignmentPattern(tokens, left) : left
}
function AssignmentPattern(tokens, left) {
  return {value: "Assignment"}
}
function ObjectPattern(tokens) {
  return {value: "Object"}
}
function ArrayPattern(tokens) {
  return {value: "Array"}
}

module.exports = {
  AssignmentPattern, ObjectPattern, ArrayPattern, paramHandler
}