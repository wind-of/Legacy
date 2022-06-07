/*
{
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
}
{
  "type": "AssignmentPattern",
  "left": {
    "type": "Identifier",
    "name": "lol"
  },
  "right": {
    "type": "Literal",
    "value": 123,
    "raw": "123"
  }
}
*/

function AssignmentPattern(tokens, left) {
  return {value: "Assignment"}
}
function ObjectPattern(tokens) {
  return {value: "Object"}
}
function ArrayPattern(tokens) {
  return {value: "Array"}
}

function DestructurizationPattern(tokens) {
  return tokens.current.value === "{" ? ObjectPattern(tokens) : ArrayPattern(tokens)
}
module.exports = {
  DestructurizationPattern, AssignmentPattern, ObjectPattern, ArrayPattern
}