const { Tokenizer } = require("./tokenizer")
const { BlockStatement } = require("./statements/statements")

const UndefinedToken = { type: null, value: null, notExists: true }

class AST {
  constructor(input) {
    this.body = []
    this.sourceType = "script"
    this.type = "Program"
    this.tokens = Object.create(new Tokenizer(input).tokenize(), {
      index: { value: 0, writable: true },
      current: {
        get() {
          return this[this.index] || UndefinedToken
        }
      },
      next: {
        get() {
          return this[this.index + 1] || UndefinedToken
        }
      },
      prev: {
        get() {
          return this[this.index - 1] || UndefinedToken
        }
      },
    })
  }

  build() {
    this.body = BlockStatement(this.tokens, { global: true })
    return this
  }
}

module.exports = {
  AST
}