
function BlockStatement(tokens, index) {
  const nextToken = () => tokens[index + 1]
  const block = {
    type: "BlockStatement",
    body: []
  }
  if(nextToken().value !== "{") {
    throw new Error("Unexpected token " + nextToken().value)
  }

  return { block, index }
}

module.exports = {
  BlockStatement
}