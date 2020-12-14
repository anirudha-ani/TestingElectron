const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const ipc = electron.ipcMain
const ip = require('ip');
const { fork } = require('child_process')
const ps = fork(`${__dirname}/server.js`)

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    const port = 9990;
    const serverIp = `http://${ip.address()}:${port}`

    //Change this file name to your desired 
    const fileName = "photo.jpg"

    const linkForQRCode = `${serverIp}/${fileName}`

    win.loadFile('index.html')
    
    ipc.on('generate-qr', function (event) {
        event.sender.send('url-for-qr',`${linkForQRCode}`)
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
