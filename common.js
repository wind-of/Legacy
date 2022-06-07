const SPACE_RE = /\s/
const PARENTHESES_RE = /\(|\)/
const IDENTIFIER_RE = /^[a-z_$#][a-z_$#0-9]*$/i
const NUMBER_RE = /^(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))$/
const OPENING_BRACKETS_RE = /\[|\{/

const UNDEFINED = "undefined"
const NULL = "null"
const TRUE = "true"
const FALSE = "false"

const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
const punctuators = new Set(["++", "+", "--", "-", "~", "/", "**", "*", "|", "&", "%", "(", ")", "{", "}", "[", "]", ">", "<", ">>>", ">>", "<<", "^", "=", "==", "===", "=>", "?", "!", "<=", ">=", ":", ";", "?", ".", "...", ","])
const keywords = new Set(["break", "case", "catch", "continue", "debugger", "default", "delete", "do", "else", "finally", "for", "function", "if", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "class", "const", "enum", "export", "extends", "import", "super", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "null", "true", "false"])

const TokenTypes = ["Punctuator", "Numeric", "Identifier", "Keyword", "String", "Literal"].reduce((a, c) => (a[c] = c, a), {})
const NodeTypes = ["Identifier", "Literal"].reduce((a, c) => (a[c] = c, a), {})
const StatementTypes = ["ExpressionStatement"].reduce((a, c) => (a[c] = c, a), {})
const VariableTypes = new Set(["const", "let", "var"])

const UnaryOperators = new Set(["++", "--", "+", "-", "!", "~", "typeof", "delete", "void"])

const isLiteral = (token) => [UNDEFINED, NULL, TRUE, FALSE].includes(token.value) || [TokenTypes.String, TokenTypes.Numeric].includes(token.type)
const handleLiteral = ({ value }) => {
  return value === UNDEFINED 
      ? { type: NodeTypes.Identifier, value } 
      : { type: NodeTypes.Literal, value: value === NULL ? "" : value, raw: String(value) }
}

const Token = (value, type, line, index) => ({ type, value, pos: { line, index } })
const Error_ = (token) => { throw new SyntaxError("Unexpected token " + token.value) }

module.exports = {
  SPACE_RE,
  PARENTHESES_RE,
  IDENTIFIER_RE, 
  NUMBER_RE,
  OPENING_BRACKETS_RE,

  digits,
  punctuators,
  keywords,
  
  TokenTypes,
  NodeTypes,
  StatementTypes,
  VariableTypes,
  UnaryOperators,

  Token,
  Error_,

  isLiteral,
  handleLiteral
}