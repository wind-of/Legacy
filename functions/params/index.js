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
function RestElement(tokens) {
  tokens.index++
  if(tokens.next.type !== TokenTypes.Identifier) {
    Error_(tokens.next)
  }
  tokens.index++
  return { type: "RestElement", argument: { type: "Identifier", name: tokens.current.value  } }
}

module.exports = {
  Parameter,
  RestElement
}