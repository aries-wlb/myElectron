const fs = require('fs')
const path = require('path')

let writing = false
const filePath = path.join(__dirname,'..','./text_saver/text.txt')

function handleKeyPress(event) {
  // 你可以把处理按键按下事件的代码放在这里。
  if (event.ctrlKey && event.keyCode === 83) {
    if(writing)return
    writing = true
    const ta = document.getElementById('myTextarea')
    fs.writeFile(filePath, ta.value ,(err) => {
      writing = false
      if (err) {
        return console.log(err)
      }
    })
  }
}

window.addEventListener('keydown', handleKeyPress, true);