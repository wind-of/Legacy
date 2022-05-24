const { FunctionParamsHandler, FunctionIdentifierHandler } = require("./helpers")
const { VariableTypes, TokenTypes, OPENING_BRACKETS_RE } = require("../common")

/*

{
"type": "VariableDeclarator",
"id": {
  "type": "ArrayPattern",
  "elements": [
    {
      "type": "Identifier",
      "name": "kek"
    },
    {
      "type": "Identifier",
      "name": "lol"
    }
  ]
},

{
  "type": "VariableDeclarator",
  "id": {
    "type": "ObjectPattern",
    "properties": [
      {
        "type": "Property",
        "key": {
          "type": "Identifier",
          "name": "k123"
        },
        "computed": false,
        "value": {
          "type": "Identifier",
          "name": "k123"
        },
        "kind": "init",
        "method": false,
        "shorthand": true
      },
      {
        "type": "Property",
        "key": {
          "type": "Identifier",
          "name": "k12412"
        },
        "computed": false,
        "value": {
          "type": "Identifier",
          "name": "k12412"
        },
        "kind": "init",
        "method": false,
        "shorthand": true
      }
    ]
  },
  
*/

function DestructurizationPattern(tokens, index) {
  const pattern = {}

  if(tokens[index].value === "[") {
    pattern.type = "ArrayPattern"
    index++
    if(tokens[index].type !== TokenTypes.Identifier) {
      throw new Error("Unexpected token " + tokens[index].value)
    }
    pattern.elements = []
    while(tokens[index] !== "]") {
      const element = tokens[index + 1].value !== "=" 
        ? { type: TokenTypes.Identifier, name: tokens[index].value }
        : { type: "AssignmentPattern", left: { type: TokenTypes.Identifier, name: tokens[index].value }, right: { TODO: tokens[index + 2] } }
      pattern.elements.push(element)
    }
  } else {
    pattern.type = "ObjectPattern"
    index++
  }
  return { pattern, index }
}



function VariableDeclaration(block_, tokens, index) {
  const block = {
    type: "VariableDeclaration",
    declarations: [],
    kind: tokens[index].value
  }
  index++
  if(tokens[index].type !== TokenTypes.Identifier) {
    if(!OPENING_BRACKETS_RE.test(tokens[index].value)) {
      throw new Error("Unexpected token " + tokens[index].value)
    }
    const declarator = {
      type: "VariableDeclarator",
    }
    const { pattern, index_ } = DestructurizationPattern(tokens, index)
    index = index_
    declarator.id = pattern

    block.declarations.push(declarator)
  }

  block_.body.push(block)
  return index
}

module.exports = {
  VariableDeclaration
}