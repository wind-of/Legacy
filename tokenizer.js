const {
  NUMBER_RE,
  SPACE_RE,
  IDENTIFIER_RE,
  digits,
  punctuators,
  keywords,
  Token,
  TokenTypes,
  LineEndToken
} = require("./common")

class Tokenizer {
  constructor(input) {
    this.input = input
    this.value
    this.index = 0
    this.tokens = []
    this.lines = [0]
    this.line = 1
  }

  charIndex() {
    return this.index - this.lines[this.line - 1] + 2 - this.value.length
  }
  createToken(type) {
    this.tokens.push(
      Token(this.value, type, this.line, this.charIndex())
    )
  }
  tokenize() {
    const input = this.input
    this.value = input[this.index]
    for(; this.index < input.length; this.value = input[++this.index]) {
      if(this.value === "\n") {
        this.lines[this.line++] = this.index
        this.tokens.push(LineEndToken)
        continue
      }
      if(SPACE_RE.test(input[this.index])) {
        continue
      }
      if(punctuators.has(this.value) && !NUMBER_RE.test(this.value + input[this.index + 1])) { 
        this.punctuatorsHandler()
        this.createToken(TokenTypes.Punctuator)
        continue
      }
      if(this.value === "\"") {
        this.stringHandler()
        this.createToken(TokenTypes.String)
        continue
      }
      if(digits.has(this.value) || this.value === ".") {
        this.numbersHandler()
        this.createToken(TokenTypes.Numeric)
        continue
      }
      this.identifiersHandler()
      this.createToken(keywords.has(this.value) ? TokenTypes.Keyword : TokenTypes.Identifier)
    }
    return this.tokens
  }
  
  stringHandler() {
    this.index++
    while(this.input[this.index] && this.input[this.index] !== "\"") {
      this.value += this.input[this.index++]
    }
    if(this.input[this.index] === "\"") {
      this.value += "\""
      this.index++
    }
  }
  numbersHandler() {
    while(NUMBER_RE.test(this.value + this.input[this.index + 1])) {
      this.value += this.input[++this.index]
    }
  }
  identifiersHandler() {
    while(
      IDENTIFIER_RE.test(this.value + this.input[this.index + 1]) && 
      this.index + 1 < this.input.length
    ) {
      this.value += this.input[++this.index]
    }
  }
  punctuatorsHandler() {
    let value = this.value, i = this.index, input = this.input
    if(value === "." && input[i + 1] === "." && input[i + 2] === ".") {
      value = "..."
      i += 2
    }
    if(value === "+" && input[i + 1] === "+") {
      value = "++"
      i++
    }
    if(value === "-" && input[i + 1] === "--") {
      value = "--"
      i++
    }
    if(value === "*" && input[i + 1] === "*") {
      value = "**"
      i++
    }
    if(value === "=") {
      if(input[i + 1] === ">") {
        value = "=>"
        i++
      }
      if(input[i + 1] === "=") {
        value = "=="
        i++
        if(input[i + 1] === "=") {
          value = "==="
          i++
        }
      }
    }
    if(value === "<") {
      if(input[i + 1] === "<") {
        value = "<<"
        i++
      }
      if(input[i + 1] === "=") {
        value = "<="
        i++
      }
    }
    if(value === ">") {
      if(input[i + 1] === "=") {
        value = ">="
        i++
      }
      if(input[i + 1] === ">") {
        value = ">>"
        i++
        if(input[i + 1] === ">") {
          value = ">>>"
          i++
        }
      }
    }
    this.value = value
    this.index = i
  }
}

module.exports = {
  Tokenizer
}