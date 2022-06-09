const SPACE_RE = /\s/
const PARENTHESES_RE = /\(|\)/
const IDENTIFIER_RE = /^[a-z_$#][a-z_$#0-9]*$/i
const NUMBER_RE = /^(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))$/
const OPENING_BRACKETS_RE = /\[|\{/

const UNDEFINED = "undefined"
const NULL = "null"
const TRUE = "true"
const FALSE = "false"

const BitwiseAssignmentOperators = new Set(["&=", "|=", "<<=", ">>=", ">>>=", "^="])
const LogicalAssignmentOperators = new Set(["&&=", "||=", "??="])
const AssignmentOperators = new Set(["=", "+=", "-=", "/=", "%=", "*=", "**="])

const assignmentOperators = new Set([...BitwiseAssignmentOperators, ...LogicalAssignmentOperators, ...AssignmentOperators])
const arithmeticOperators = new Set(["+", "-", "/", "*", "%"])
const bitwiseOperators = new Set(["~", "|", "~", "&", ">>", ">>>", "<<", "^"])
const logicalOperators = new Set([">", "<", "<=", ">=", "==", "!=", "===", "!==", "&&", "||", "!", "?", "??"])
const specialPunctuators = new Set(["(", ")", "[", "]", "{", "}", ":", ";", ".", "...", ",", "=", "=>", "++", "--", "**"])

const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
const punctuators = new Set([...arithmeticOperators, ...bitwiseOperators, ...specialPunctuators, ...assignmentOperators, ...logicalOperators])
const Keywords = new Set(["break", "case", "catch", "continue", "debugger", "default", "delete", "do", "else", "finally", "for", "function", "if", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "class", "const", "enum", "export", "extends", "import", "super", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", NULL, TRUE, FALSE, UNDEFINED])

const TokenTypes = ["Punctuator", "Numeric", "Identifier", "Keyword", "String", "Literal"].reduce((a, c) => (a[c] = c, a), {})
const NodeTypes = ["Identifier", "Literal"].reduce((a, c) => (a[c] = c, a), {})
const StatementTypes = ["ExpressionStatement"].reduce((a, c) => (a[c] = c, a), {})
const VariableTypes = new Set(["const", "let", "var"])

const UnaryOperators = new Set(["++", "--", "+", "-", "!", "~", "typeof", "delete", "void"])
const BinaryOperators = new Set(["+", "-", "instanceof", "in", ...assignmentOperators, ...logicalOperators])
const TernaryOperators = new Set(["?"])

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
  Keywords,
  
  TokenTypes,
  NodeTypes,
  StatementTypes,
  VariableTypes,

  UnaryOperators,
  BinaryOperators,
  TernaryOperators,

  Token,
  Error_,

  isLiteral,
  handleLiteral
}