const { app, BrowserWindow, Menu } = require('electron')

let win

function createWindow() {
    win = new BrowserWindow({
        width: 1366,
        height: 768,
        minWidth: 700,
        minHeight: 350,
        title: 'Axiom Music',
        backgroundColor: '#1a202c',
        show: false,
        webPreferences: {
            devTools: false,
        },
    })

    win.loadURL('http://music.test')

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('closed', () => {
        win = null
    })

    let template = [
        {
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'forceReload'},
                {type: 'separator'},
                {role: 'toggleFullscreen'},
            ]
        },
        {
            role: 'window',
            submenu: [
                {role: 'minimize'},
                {role: 'close'},
            ],
        },
    ]

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                {role: 'about'},
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideOthers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'},
            ]
        })
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})