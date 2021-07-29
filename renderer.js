// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//const remote = require('electron').remote;
const { ipcRenderer, remote } = require('electron');
const ipc = ipcRenderer;
const { exec } = require('child_process');

const win = remote.getCurrentWindow(); /* Note this is different to the
html global `window` variable */

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
    setTimeout(function() {
        document.getElementById('firstText').classList.remove('hidden');
    }, 1500);
    setTimeout(function() {
        document.getElementById('firstText').classList.add('center-text-1-phase-2');
        document.getElementById('secondText').classList.add('center-text-2-phase-2');
        document.getElementById('introBtn').classList.add('intro-btn-phase-2');
        setTimeout(function() {
            document.getElementById("introBtn").disabled = false;
            document.getElementById('introBtn').classList.add('intro-btn-phase-3');
            document.getElementById('titlebar').classList.remove('titlebar-hidden');
        }, 1500);
    }, 3000);
};
// here I have created a sample welcome screen with some really basic animations. To remove it, just remove
//the setTimeout codes above, remove the classes that need to be removed and add those that have to be added

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}

function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    document.getElementById('introBtn').addEventListener("click", event => {
        win.close();
    });

    document.getElementById('file-menu').addEventListener("click", event => {
      function hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
      }
        document.getElementById('app-menu').innerHTML = `<div class="button">Open<div class="shortcut">Ctrl + O</div></div>
        <div class="separator"></div>
        <div class="button">Save<div class="shortcut">Ctrl + S</div></div>`;

        if (!hasClass(document.getElementById('app-menu'), 'hidden-appmenu')) {
          document.getElementById('app-menu').classList.add('hidden-appmenu');
        } else {
          document.getElementById('app-menu').classList.remove('hidden-appmenu');
        }
    });
    document.getElementById('edit-menu').addEventListener("click", event => {
      function hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
      }
      //code to identify a specific class into an element
        document.getElementById('app-menu').innerHTML = `
        <div class="button" id="copyBtn">Copy<div class="shortcut">Ctrl + C</div></div>
        <div class="button" id="cutBtn">Cut<div class="shortcut">Ctrl + X</div></div>
        <div class="button" id="pasteBtn">Paste<div class="shortcut">Ctrl + V</div></div>
        `;
        //you can add more menu items if you want. For a button, use class="button" and for a separator,
        //use class="separator". to add a shortcut hint to a button, add a <div> element inside
        //the button, next to the button text with class="shortcut" and the shortcut, e.g: Ctrl + F
        document.getElementById('copyBtn').addEventListener("click", function() {
          console.log('action 1');
        });
        document.getElementById('cutBtn').addEventListener("click", function() {
          console.log('action 2');
        });
        document.getElementById('pasteBtn').addEventListener("click", function() {
          console.log('action 3');
        });
        //these are some test event listeners for the buttons of the edit menu.
        //you can create your own or comment out the whole file menus section
        if (!hasClass(document.getElementById('app-menu'), 'hidden-appmenu')) {
          document.getElementById('app-menu').classList.add('hidden-appmenu');
        } else {
          document.getElementById('app-menu').classList.remove('hidden-appmenu');
        }
    });

    document.getElementById('main').addEventListener("click", function() {
      function hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
      }
      if (!hasClass(document.getElementById('app-menu'), 'hidden-appmenu')) {
        document.getElementById('app-menu').classList.add('hidden-appmenu');
      }
    })

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}
