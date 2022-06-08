const { AssignmentPattern } = require("../../variables/patterns")
const { TokenTypes, Error_ } = require("../../common")

function Parameter(tokens) {
  const left = tokens.current
  tokens.index++
  if(tokens.current.type !== TokenTypes.Punctuator) {
    Error_(tokens.current)
  }
  return tokens.current.value === "=" ? AssignmentPattern(tokens, left) : left
}
function RestElement(tokens) {
  tokens.index++
  if(tokens.current.type !== TokenTypes.Identifier) {
    Error_(tokens.current)
  }
  tokens.index++
  return { type: "RestElement", argument: { type: "Identifier", name: tokens.prev.value  } }
}

module.exports = {
  Parameter,
  RestElement
}