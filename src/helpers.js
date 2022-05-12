const { PARENTHESES_RE, tokenTypes } = require("../common")

function FunctionIdentifierHandler(tree, tokens, index) {
  const nextToken = () => tokens[index + 1]
  if(!nextToken()) {
    throw "Unexpected end of the string"
  }
  if(nextToken().value === "*") {
    block.generator = true
    index++
  }
  if(nextToken().type !== tokenTypes.Identifier) {
    throw new Error("Unexpected token " + nextToken().value)
  }
  tree.id = { type: tokenTypes.Identifier, value: nextToken().value }
  
  return ++index
}

function FunctionParamsHandler(tree, tokens, index) {
  const nextToken = () => tokens[index + 1]
  if(nextToken().value !== "(") {
    throw new Error("Unexpected token " + nextToken().value)
  }
  index++
  let parCount = 1
  const params = []
  while(parCount !== 0) {
    if(PARENTHESES_RE.test(nextToken().value)) {
      parCount += ({")": -1, "(": 1})[nextToken().value]
      index++
      if(parCount === 0) {
        break
      }
    }
    if(nextToken().value === ",") {
      index++
    }
    if(nextToken().type === tokenTypes.Identifier) {
      params.push(nextToken())
      index++
      if(nextToken().type === tokenTypes.Identifier) {
        throw new Error("Unexpected token" + nextToken().value)
      }
    }
  }
  tree.params = params
  return index
}

module.exports = {
  FunctionParamsHandler,
  FunctionIdentifierHandler
}