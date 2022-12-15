const path = require("path");
const { app, BrowserWindow } = require("electron");
const AutoLaunch = require("auto-launch");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // win.setMenuBarVisibility(false);
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../build/index.html"));
  } else {
    win.loadURL("http://localhost:3000");
  }
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
