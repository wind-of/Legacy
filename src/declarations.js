const { BlockStatement } = require("./statements")
const { FunctionParamsHandler, FunctionIdentifierHandler } = require("./helpers")

function FunctionDeclaration(tokens, index) {
  const block = {
    type: "FunctionDeclaration",
    generator: false,
    expression: false,
    async: false,
    body: []
  }

  index = FunctionIdentifierHandler(block, tokens, index)
  index = FunctionParamsHandler(block, tokens, index)

  const { block: block_, index: index_ } = BlockStatement(tokens, index)
  block.body.push(block_)
  index = index_

  return { index, block }
}


module.exports = {
  FunctionDeclaration
}