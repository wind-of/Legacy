const {
  NUMBER_RE,
  SPACE_RE,

  digits,
  punctuators,
  keywords,

  tokenTypes,
  UndefinedToken,
  LineEndToken
} = require("./common")
const { FunctionDeclaration } = require("./src/declarations")
const { Lexic } = require("./src/handlers")
const createToken = (value, type) => ({ type, value })
const getTokenType = (value) => !value ? tokenTypes.Undefined : punctuators.has(value) ? tokenTypes.Punctuator : keywords.has(value) ? tokenTypes.Keyword : tokenTypes.Identifier


function parseLine(input) {
  const tokens = []
  for(let i = 0; i < input.length; i++) {
    if(SPACE_RE.test(input[i])) continue
    let value = input[i]

    if(punctuators.has(value) && !NUMBER_RE.test(value + input[i + 1])) {
      const { v, index } = Lexic.punctuatorsHandler(value, i, input)
      i = index
      tokens.push(createToken(v, tokenTypes.Punctuator))
      continue
    }
    if(value === "\"") {
      i++
      while(input[i] && input[i] !== "\"") value += input[i++]
      if(input[i] === "\"") {
        value += "\""
        i++
      }
      tokens.push(createToken(value, tokenTypes.String))
      continue
    }
    if(digits.has(value) || value === ".") {
      const { v, index } = Lexic.numbersHandler(value, i, input)
      i = index
      let tokenType = tokenTypes.Numeric
      tokens.push(createToken(v, tokenType))
      continue
    }
    const { v, index } = Lexic.identifiersHandler(value, i, input)
    i = index
    let tokenType = getTokenType(v)
    if(tokenType === tokenTypes.Undefined) {
      continue
    }
    tokens.push(createToken(v, tokenType))
  }

  return tokens
}

function parseAST(input) {
  input = input.split("\n")
  const tokens = input.reduce((acc, line) => (acc.push(...parseLine(line)), acc.push(LineEndToken), acc), [])
  const AST = {
    type: "Program",
    body: [],
    sourceType: "script"
  }

  for(let i = 0; i < tokens.length; i++) {
    const { type, value } = tokens[i]
    if(type === tokenTypes.Keyword) { 
      if(value === "function") {
        const { index, block } = FunctionDeclaration(tokens, i)
        i = index
        AST.body.push(block)
      }
    }
  }

  AST.body.forEach((a) => console.log(a))

  return tokens
}

const k = parseAST(parseLine.toString())
console.log(k)
