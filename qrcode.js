const electron = require('electron')
const ipc = electron.ipcRenderer

var QRCode = require('qrcode')
var canvas = document.getElementById('canvas')



ipc.send('generate-qr')

ipc.on('url-for-qr', function(event, arg) {
  console.log(arg)
  QRCode.toCanvas(canvas, `${arg}`, function (error) {
    if (error) console.error(error)
    console.log('success!');
  })
})

