const { TokenTypes, Error_ } = require("../common")
const { ObjectPattern, ArrayPattern } = require("../variables/patterns")
const { Parameter, RestElement } = require("./params/index")

function FunctionIdentifierHandler(tokens, isExpression) {
  if(tokens.current.notExists) {
    Error_({ value: "end of the string" })
  }
  if(tokens.current.type !== TokenTypes.Identifier) {
    if(isExpression) {
      return
    }
    Error_(tokens.current)
  }
  tokens.index++
  return { type: TokenTypes.Identifier, value: tokens.prev.value }
}

function FunctionParamsHandler(tokens) {
  if(tokens.current.value !== "(") {
    Error_(tokens.current)
  }
  tokens.index++
  if(tokens.current.notExists || tokens.current.type !== TokenTypes.Identifier && !["[", "{", ")", "..."].includes(tokens.current.value)) {
    Error_(tokens.current || { value: "end of the string" })
  }
  const params = []
  while(tokens.current.value !== ")") {
    if(tokens.current.value === "{") {
      params.push(ObjectPattern(tokens))
    }
    else if(tokens.current.value === "[") {
      params.push(ArrayPattern(tokens))
    }
    else if(tokens.current.type === TokenTypes.Identifier) {
      params.push(Parameter(tokens))
    }
    else if(tokens.current.value === "..." ) {
      params.push(RestElement(tokens))
    }
    if(tokens.current.value === ")") {
      break
    }
    if(tokens.current.value !== ",") {
      Error_(tokens.current)
    }
    tokens.index++
  }
  tokens.index++
  return params
}

function ReturnStatement(tokens) {

}

module.exports = {
  FunctionParamsHandler,
  FunctionIdentifierHandler,
  ReturnStatement
}