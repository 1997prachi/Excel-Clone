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

app.whenReady().then(function() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    });
    win.loadFile('index.ejs').then(function() {
        win.maximize();
        win.show();


    });
});