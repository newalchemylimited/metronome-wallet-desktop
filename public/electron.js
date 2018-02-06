const path = require('path')
const { app } = require('electron')
const isDev = require('electron-is-dev');

if (isDev) {
  app.on('ready', function () {
    require('electron-debug')({ enabled: true })

    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require('electron-devtools-installer')

    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err))
  })
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const { createWindow } = require(path.join(__dirname, './main/mainWindow.js'))

createWindow()

const { initMainWorker } = require(path.join(__dirname, './main/mainWorker.js'))

app.on('ready', function () {
  initMainWorker()
})