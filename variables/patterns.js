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

function AssignmentPattern(tokens, left) {
  return {value: "Assignment"}
}
function ObjectPattern(tokens) {
  return {value: "Object"}
}
function ArrayPattern(tokens) {
  return {value: "Array"}
}

module.exports = {
  AssignmentPattern, ObjectPattern, ArrayPattern
}