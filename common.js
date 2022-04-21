const SPACE_RE = /\s/g
const PARENTHESES_RE = /\(|\)/

const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
const punctuators = new Set(["+", "-", "/", "*", "|", "&", "%", "**", "(", ")", "{", "}", ">", "<", ">>>", ">>", "<<", "^", "."])
const identifiers = new Set(["cos", "sin", "tg", "ctg", "arccos", "arcsin", "arctg", "arcctg", "abs", "sqrt", "exp", "ln", "round", "floor"])
const keywords = new Set(["while", "for", "if", "function", "const", "let"])

const tokenTypes = ["Punctuator", "Numeric", "Identifier", "Keyword", "Undefined"].reduce((a, c) => (a[c] = c, a), {})
const UndefinedToken = { value: "", type: tokenTypes.Undefined }

module.exports = {
  SPACE_RE,
  PARENTHESES_RE,

  digits,
  punctuators,
  identifiers,
  keywords,
  
  tokenTypes,
  UndefinedToken
}