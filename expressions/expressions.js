const { Error_, TokenTypes } = require("../common")


module.exports = {
  HandleExpression,
  HandleValue,

  ThisExpression,
  MemberExpression,
  YieldExpression,
  AssignmentExpression,
  UpdateExpression
}


function HandleExpression(tokens) {
  // Expression
}

function HandleValue(tokens) {
  // Identifier or expression
}

function NewExpression(tokens) {

}

function ArrayExpression(tokens) {

}

function ObjectExpression(tokens) {

}

function MemberExpression(tokens, object) {
  const expression = {
    type: "MemberExpression",
    computed: false,
    object,
    property: null
  }
  tokens.index++
  if(tokens.prev === ".") {
    if(tokens.current.type !== TokenTypes.Identifier) {
      Error_(tokens.current)
    }
    expression.property = tokens.current
    tokens.index++
    return ["[", "."].includes(tokens.current.value) ? MemberExpression(tokens, expression) : expression
  }
  // TODO: Property accessors ([key])
}

function UpdateExpression(tokens, argument = null) {
  const expression = {
    type: "UpdateExpression",
    operator: tokens.current.value,
    prefix: !!argument
  }
  argument ??= HandleValue(tokens)
  if(!["MemberExpression", "Identifier"].includes(argument.type)) {
    Error_(`Invalid ${expression.prefix ? "right" : "left"}-hand side of an assignment`)
  }
  return expression
}

function FunctionExpression(tokens) {

}

function ClassExpression(tokens) {

}

function ThisExpression(tokens) {
  tokens.index++
  return { type: "ThisExpression" }
}

function YieldExpression(tokens) {
  const expression = {
    type: "YieldExpression",
    delegate: false,
    argument: null
  }
  tokens.index++
  if(tokens.current.value === "*") {
    expression.delegate = true
    tokens.index++
  }
  if(tokens.current.pos.line !== tokens.prev.pos.line) {
    return expression
  }
  let parentheses = false
  if(tokens.current.value === "(") {
    tokens.index++
    parentheses = true
  }
  expression.argument = HandleValue(tokens)
  if(parentheses && tokens.current !== ")") {
    Error_(tokens.current)
  }
  tokens.index++
  return expression
}

function SequenceExpression(tokens) {
  
}

function AssignmentExpression(tokens, left) {
  const expression = {
    type: "AssignmentExpression",
    operator: tokens.current.value,
    left,
    right: null
  }
  tokens.index++
  expression.right = HandleValue(tokens)
  return expression
}
