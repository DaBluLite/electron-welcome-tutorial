const {app, BrowserWindow} = require('electron');
const { ipcMain } = require('electron');
const ipc = ipcMain;
const path = require('path');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
	      title: "Welcome Tutorial",
        backgroundColor: '#1E1E1E',
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.setBackgroundColor('#1E1E1E')
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});