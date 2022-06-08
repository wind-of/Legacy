const { VariableTypes, TokenTypes, Error_, OPENING_BRACKETS_RE } = require("./common")
const { FunctionIdentifierHandler, FunctionParamsHandler } = require("./functions/index")
const { Tokenizer } = require("./tokenizer")
const { DestructurizationPattern } = require("./variables/patterns")
const { HandleExpression } = require("./expressions/expression")

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
      },
      prev: {
        get() {
          return this[this.index - 1]
        }
      },
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

  ClassDeclaration() {
    const tokens = this.tokens
  }
  FunctionDeclaration(options = { isExpression: false }) {
    const tokens = this.tokens
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
    block.body = this.BlockStatement(tokens).body
    tokens.index++

    return block
  }
  VariableDeclaration() {
    const tokens = this.tokens
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
    
    return block
  }
}

module.exports = {
  AST
}