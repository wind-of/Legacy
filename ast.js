const { isFunction } = require("util")
const { VariableTypes } = require("./common")
const { Tokenizer } = require("./tokenizer")

class AST {
  constructor(input) {
    this.body = []
    this.sourceType = "script"
    this.type = "Program"
    this.index = 0
    this.tokens = new Tokenizer(input).tokenize()
    Object.defineProperties(this.tokens, {
      current: {
        get: () => {
          return this.tokens[this.index]
        }
      },
      next: {
        get: () => {
          return this.tokens[this.index + 1]
        }
      }
    })
  }

  buildAST() {
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
      this.index++
    }
    while(tokens.current && tokens.current.value !== "}") {
      if(VariableTypes.has(tokens.current.value)) {
        block.body.push(this.VariableDeclaration())
      }
      if(tokens.current.value === "function") {
        block.body.push(this.FunctionDeclaration())
      }
      this.index++
    }
    return global ? block.body : block
  }

  VariableDeclaration() {
    return {}
  }
  FunctionDeclaration() {
    return {}
  }
}

module.exports = {
  AST
}