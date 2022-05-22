const fs = require("fs")
const code = fs.readFileSync("./code").toString()

const { AST } = require("./ast")
// console.log(new AST(AST.toString()).tokens)
console.log(new AST(code).buildAST().body)

// fs.writeFileSync("kek.json", JSON.stringify(k))
