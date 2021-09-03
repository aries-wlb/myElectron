const { app, BrowserWindow, Menu, MenuItem, dialog, ipcMain } = require('electron')
const path = require('path')
const isMac = process.platform === 'darwin'

const template = [
  {
    label: 'File',
    submenu: [
      new MenuItem({
        label: '打开文件',
        click: (menuItem, browserWindow, event) => {
          openFile().then(res => {
            if(res.canceled)return
            browserWindow.webContents.send('openFile', res.filePaths[0])
          })
          
        }
      }),
      isMac ? { role: 'close' } : { role: 'quit' },
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

async function openFile() {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
  })
  return result
}


try {
  require('electron-reloader')(module,{
    ignore: [
      'text_saver'
    ]
  });
} catch (_) {}

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  win.openDevTools();
  win.loadFile('index.html')  
}

app.whenReady().then(() => {
  createWindow()
})