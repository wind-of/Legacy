module.exports = {
  punctuatorsHandler(value, i, input) {
    if(value === "*" && input[i + 1] === "*") {
      value = "**"
      i++
    }
    if(value === "<" && input[i + 1] === "<") {
      value = "<<"
      i++
    }
    if(value === ">" && input[i + 1] === ">") {
      value = ">>"
      i++
      if(input[i + 1] === ">") {
        value = ">>>"
        i++
      }
    }
    return { v: value, index: i }
  }
}