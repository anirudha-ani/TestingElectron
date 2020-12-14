const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const ipc = electron.ipcMain
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
    
    ipc.on('generate-qr', function (event) {
        event.sender.send('url-for-qr','Mamma mia')
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
