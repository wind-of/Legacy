const fs = require("fs")

const code = 
`var p = 5;

function myFunc(...k) {
    var p = 9;

    function decl() {
        console.log(p);
    }
    var expr = function k() {
        console.log(p);
    };
    var cons = new Function('\tconsole.log(p);');

    decl();
    expr();
    cons();
}

myFunc();`

const { AST } = require("./ast")
const k = new AST(code).build().body

console.log(k)
fs.writeFileSync("kek.json", JSON.stringify(k))
