const { TokenTypes, Error_ } = require("../common")
const { ObjectPattern, ArrayPattern } = require("../variables/patterns")
const { Parameter } = require("./params/index")

function FunctionIdentifierHandler(tokens, isExpression) {
  if(!tokens.next) {
    Error_({ value: "end of the string" })
  }
  if(tokens.next.type !== TokenTypes.Identifier) {
    if(isExpression) {
      return null
    }
    Error_(tokens.next)
  }
  return { type: TokenTypes.Identifier, value: tokens.next.value }
}

function FunctionParamsHandler(tokens) {
  if(tokens.next.value !== "(") {
    Error_(tokens.next)
  }
  tokens.index++
  if(!tokens.next || tokens.next.type !== TokenTypes.Identifier && !["[", "{", ")"].includes(tokens.next.value)) {
    Error_(tokens.next || { value: "end of the string" })
  }
  const params = []
  while(tokens.next.value !== ")") {
    if(tokens.next.value === "{") {
      params.push(ObjectPattern(tokens))
    }
    else if(tokens.next.value === "[") {
      params.push(ArrayPattern(tokens))
    }
    else if(tokens.next.type === TokenTypes.Identifier) {
      params.push(Parameter(tokens))
    }
    if(tokens.next.value === ")") {
      break
    }
    if(tokens.next.value !== ",") {
      Error_(tokens.next)
    }
    tokens.index++
  }
  tokens.index++
  return params
}

module.exports = {
  FunctionParamsHandler,
  FunctionIdentifierHandler,
}