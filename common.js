const SPACE_RE = /\s/g
const PARENTHESES_RE = /\(|\)/
const IDENTIFIER_RE = /^[a-z_$#][a-z_$#0-9]*$/i
const NUMBER_RE = /^(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))$/

const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
const punctuators = new Set(["++", "+", "--", "-", "/", "**", "*", "|", "&", "%", "(", ")", "{", "}", "[", "]", ">", "<", ">>>", ">>", "<<", "^", "=", "==", "===", "=>", "?", "<=", ">=", ":", ";", "?", ".", "...", ","])
const keywords = new Set(["const", "let", "arguments", "break", "case", "catch", "continue", "default", "delete", "do", "else", "eval", "finally", "for", "function", "if", "in", "instanceof", "new", "null", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "async", "await"])

const tokenTypes = ["Punctuator", "Numeric", "Identifier", "Keyword", "Undefined", "String", "NonTerminal"].reduce((a, c) => (a[c] = c, a), {})
const UndefinedToken = { type: tokenTypes.Undefined, value: "" }
const LineEndToken = { type: tokenTypes.NonTerminal, value: "" }

module.exports = {
  SPACE_RE,
  PARENTHESES_RE,
  IDENTIFIER_RE, 
  NUMBER_RE,

  digits,
  punctuators,
  keywords,
  
  tokenTypes,
  UndefinedToken,
  LineEndToken
}