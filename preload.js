require('./board_event/index')
const path = require('path')
const fs = require('fs')
const filePath = path.join(__dirname,'./text_saver/text.txt')
const {ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('openFile', (event, arg) => {
    const element = window.document.getElementById('myTextarea')
    fs.readFile(arg, 'utf-8', function (err, data) {
      element.value = data.toString()
    });
  })
  const element = document.getElementById('myTextarea')
  fs.readFile(filePath, 'utf-8', function (err, data) {
    element.value = data.toString()
  });
})