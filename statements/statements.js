const { VariableTypes, TokenTypes, Error_, OPENING_BRACKETS_RE } = require("../common")
const { FunctionIdentifierHandler, FunctionParamsHandler } = require("../functions/functions")
const { DestructurizationPattern } = require("../variables/patterns")
const { HandleExpression } = require("../expressions/expressions")

function BlockStatement(tokens, options = { global: false, isFunctionBody: false }) {
  const block = {
    type: "BlockStatement",
    body: []
  }
  if(!options.global) {
    if(tokens.current.value !== "{") {
      throw new SyntaxError("Unexpected token " + tokens.current.value)
    }
    tokens.index++
  }
  while(tokens.current && tokens.current.value !== "}") {
    if(VariableTypes.has(tokens.current.value)) {
      block.body.push(VariableDeclaration(tokens))
      continue
    }
    if(tokens.current.value === "function") {
      block.body.push(FunctionDeclaration(tokens))
      continue
    }
    tokens.index++
  }
  return global ? block.body : block
}

function ExpressionStatement(tokens) {

}

function BreakStatement(tokens) {

}

function ReturnStatement(tokens) {

}

function ThrowStatement(tokens) {

}

function IfStatement(tokens) {

}

function TryStatement(tokens) {

}

function SwitchStatement(tokens) {

}

function ForStatement(tokens) {

}

function DoWhileStatement(tokens) {

}

function VariableDeclaration(tokens) {
  const block = {
    type: "VariableDeclaration",
    declarations: [],
    kind: tokens.current.value
  }
  
  tokens.index++
  while(true) {
    const declarator = {
      type: "VariableDeclarator",
      init: null
    }
    if(tokens.current.type !== TokenTypes.Identifier && !OPENING_BRACKETS_RE.test(tokens.current.value)) {
      Error_(tokens.current)
    }
    declarator.id = tokens.current.type === TokenTypes.Identifier ? tokens.current : DestructurizationPattern(tokens)
    tokens.index++
    if(tokens.current.value === "=") {
      tokens.index++
      block.init = HandleExpression(tokens)
      tokens.index++ // remove after HandleExpression is done
    }
    block.declarations.push(declarator)
    if(tokens.current.value !== ",") {
      break
    }
  }
  if(tokens.current.value === ";") tokens.index++
  
  return block
}

function FunctionDeclaration(tokens, options = { isExpression: false }) {
  const block = {
    type: "FunctionDeclaration",
    generator: false,
    expression: !!options.isExpression,
    async: false,
    body: []
  }
  if(tokens.next.value === "*") {
    block.generator = true
    tokens.index++
  }
  tokens.index++
  block.id = FunctionIdentifierHandler(tokens, !!options.isExpression)
  block.params = FunctionParamsHandler(tokens)
  block.body = BlockStatement(tokens).body
  tokens.index++

  return block
}

function ClassDeclaration(tokens) {
  
}

module.exports = {
  BlockStatement
}