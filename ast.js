const { VariableTypes, TokenTypes, Error_, OPENING_BRACKETS_RE } = require("./common")
const { FunctionIdentifierHandler, FunctionParamsHandler } = require("./functions/index")
const { Tokenizer } = require("./tokenizer")
const { ArrayPattern } = require("./variables/patterns")

class AST {
  constructor(input) {
    this.body = []
    this.sourceType = "script"
    this.type = "Program"
    this.tokens = Object.create(new Tokenizer(input).tokenize(), {
      index: { value: 0, writable: true },
      current: {
        get() {
          return this[this.index]
        }
      },
      next: {
        get() {
          return this[this.index + 1]
        }
      }
    })
  }

  build() {
    this.body = this.BlockStatement({ global: true })
    return this
  }

  BlockStatement({ global = false }) {
    const tokens = this.tokens
    const block = {
      type: "BlockStatement",
      body: []
    }
    if(!global) {
      if(tokens.current.value !== "{") {
        throw new SyntaxError("Unexpected token " + tokens.current.value)
      }
      tokens.index++
    }
    while(tokens.current && tokens.current.value !== "}") {
      if(VariableTypes.has(tokens.current.value)) {
        block.body.push(this.VariableDeclaration())
      }
      if(tokens.current.value === "function") {
        block.body.push(this.FunctionDeclaration())
      }
      tokens.index++
    }
    return global ? block.body : block
  }

  FunctionDeclaration(options = { isExpression: false }) {
    const tokens = this.tokens
    const block = {
      type: "FunctionDeclaration",
      generator: false,
      expression: Boolean(options.isExpression),
      async: false,
      body: []
    }
    if(tokens.next.value === "*") {
      block.generator = true
      tokens.index++
    }

    block.id = FunctionIdentifierHandler(tokens, Boolean(options.isExpression))
    tokens.index++
    block.params = FunctionParamsHandler(tokens)
    tokens.index++
    block.body = this.BlockStatement(tokens).body
    tokens.index++

    return block
  }
  VariableDeclaration() {
    const tokens = this.tokens
    const block = {
      type: "VariableDeclaration",
      declarations: [],
      kind: tokens.current
    }
    
    while(true) {
      const declarator = {
        type: "VariableDeclarator",
        init: null
      }
      if(tokens.next.type !== TokenTypes.Identifier && !OPENING_BRACKETS_RE.test(tokens.next.value)) {
        Error_(tokens.next)
      }
      if(tokens.next.type === TokenTypes.Identifier) {
        declarator.id = tokens.next
      } else if(tokens.next.value === "[") {
        declarator.id = ObjectPattern(tokens)
      } else {
        declarator.id = ArrayPattern(tokens)
      }
      tokens.index++
      if(tokens.next.value === "=") {
        tokens.index++
        block.init = handleExpression(tokens)
        tokens.index++
      }
      block.declarations.push(declarator)
      if(tokens.next.value !== ",") {
        break
      }
    }
    
    return block
  }
}

module.exports = {
  AST
}