const { app, BrowserWindow } = require('electron')
const ejse = require('ejs-electron');

//function createWindow() {
// Create the browser window.

ejse.data({
    pageName: 'Excel-Clone',
    pageHeader: 'Excel-Clone',
    rows: 100,
    cols: 100,
})

 app.whenReady().then(function(){
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('index.ejs').then(function() {
        win.removeMenu();
        win.maximize();
        win.show();
        win.webContents.openDevTools();


    });
});