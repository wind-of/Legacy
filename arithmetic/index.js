const {
  SPACE_RE,
  PARENTHESES_RE,

  digits,
  punctuators,
  identifiers,
  keywords,

  tokenTypes,
  UndefinedToken,
} = require("../common")
const { punctuatorsHandler } = require("./helpers")


const IDENTIFIER_RE = /^[a-z_$#][a-z_$#0-9]*$/i
const NUMBER_RE = /^(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))$/

const createToken = (value, type, pos) => ({ value, type, pos })
const getToken = (arr, i) => arr[i] || UndefinedToken
const getTokenType = (value) => punctuators.has(value) ? tokenTypes.Punctuator : keywords.has(value) ? tokenTypes.Keyword : tokenTypes.Identifier
const unexpectedTokenError = (v, p, m = "") => `UnexpectedToken: ${v} \n ${" ".repeat("UnexpectedToken".length + p)}^ \n ${m}`
const syntaxError = (v, p, m = "") => `SyntaxError: ${v} \n ${" ".repeat("UnexpectedToken".length + p)}^ \n ${m}`


function parse(input) {
  const tokens = []
  for(let i = 0; i < input.length; i++) {
    if(SPACE_RE.test(input[i])) continue
    let value = input[i]

    if(punctuators.has(value)) {
      const { v, index } = punctuatorsHandler(value, i, input)
      i = index
      tokens.push(createToken(v, tokenTypes.Punctuator, i))
      continue
    }
    if(digits.has(value) || value === ".") {
      while(NUMBER_RE.test(value + input[i + 1])) value += input[++i]
      tokens.push(createToken(value, tokenTypes.Numeric, i))
      continue
    }
    while(IDENTIFIER_RE.test(value + input[i + 1]) && i + 1 < input.length) value += input[++i]
    console.log(value)
    value = value.trim()
    let tokenType = getTokenType(value)
    if(tokenType === tokenTypes.Undefined) {
      throw unexpectedTokenError(input, i, "Expected keyword or identifier")
    } 
    tokens.push(createToken(value, tokenType, i))
  }

  console.log(tokens)

  let parentheses = 0
  for(let i = 0; i < tokens.length; i++) {
    const { type, value, pos } = tokens[i]
    const nextToken = getToken(tokens, i + 1)
    const prevToken = getToken(tokens, i - 1)
    
    if(value === "(") {
      parentheses++
      if(prevToken.type !== tokenTypes.Undefined && prevToken.type === tokenTypes.Numeric) {
        throw syntaxError(input, pos, "Expected operation sign or end of the string")
      }
    }
    if(value === ")" && parentheses-- === 0) {
      throw syntaxError(input, pos, "No opening parantheses")
    }
    if(value === "." && nextToken.type !== tokenTypes.Numeric) {
      throw syntaxError(input, nextToken.pos, "Expected number, instead got " + nextToken.value)
    }
    if(type === tokenTypes.Numeric && nextToken.type === tokenTypes.Numeric) {
      throw syntaxError(input, pos, "Expected operation sign between two numbers")
    }
    if(type === tokenTypes.Punctuator && nextToken.type === tokenTypes.Punctuator) {
      if(nextToken === ")") {
        throw syntaxError(input, pos + 1, "Expected number, identifier or end of the string")
      }
      if(!PARENTHESES_RE.test(value) && nextToken.value !== "(") {
        throw syntaxError(input, pos + 1, "Unexpected punctuator \"" + nextToken.value + "\"")
      }
    }
    // if(type === tokenTypes.Identifier && nextToken.value !== "(") {
    //   throw syntaxError(input, pos + 1)
    // }
  }
  if(parentheses) throw syntaxError(input, input.length)

  return tokens
}

parse("(123 + 45 - 12 ** 500) + 10 + 5 - 14.4 / 7 + arccos(0.05) | y - 10 % (7 + 15) ^ 10 - 15 >>> 1 + arctg()")

module.exports = {
  parse
}
