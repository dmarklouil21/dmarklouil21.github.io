function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
document.getElementsByClassName("tab-button")[0].click();

function toggleDiscussion(id, element) {
    var content = document.getElementById(id);
    var parentLi = element.parentElement;
    var isOpen = content.style.display === "block";
    content.style.display = isOpen ? "none" : "block";
    parentLi.classList.toggle("open", !isOpen);
}

function encrypt(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            let shiftAmount = shift % 26;
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + shiftAmount) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + shiftAmount) % 26) + 97);
            }
        }
        result += char;
    }
    return result;
}

function decrypt(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            let shiftAmount = shift % 26;
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 - shiftAmount + 26) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 - shiftAmount + 26) % 26) + 97);
            }
        }
        result += char;
    }
    return result;
}

function processText(action) {
    let text = document.getElementById("text").value;
    let shift = parseInt(document.getElementById("shift").value);
    let validation = text == '' && isNaN(shift) ? false : text == '' ? false : isNaN(shift) ? false : true;

    let output = action === 'encrypt' ? encrypt(text, shift) : decrypt(text, shift);
    showModal(output, shift, validation, action);
}

function showModal(text, shift, valid, action) {
    let modal = document.getElementById("modal");
    let modalText = document.getElementById("modal-text");
    
    modalText.innerText = '';
    modal.style.display = "block";

    let textAction = action === 'encrypt' ? 'Encrypting' : 'Decrypting';

    let lines = [
        textAction,
        '. ',
        '. ',
        '. \n',
        'Directory of C:\\Users\\MY PC\\.vscode\\extensions\\ms-python.python-2025.2.0-win32-x64\\python_files\\lib\\jedilsp\\jedi\\third_party\\typeshed\\stdlib\\3\\http\\n\\n',
        '08/03/2025  02:44 pm    <DIR>          .\n',
        '08/03/2025  02:44 pm    <DIR>          ..\n',
        '08/03/2025  02:44 pm             6,034 client.pyi\n',
        '08/03/2025  02:44 pm             4,991 cookiejar.pyi\n',
        '08/03/2025  02:44 pm             1,364 cookies.pyi\n',
        '08/03/2025  02:44 pm             3,036 server.pyi\n',
        '08/03/2025  02:44 pm             1,940 __init__.pyi\n',
        '               5 File(s)         17,365 bytes\n\n',
        'Directory of C:\\Users\\MY PC\\.vscode\\extensions\\ms-python.python-2025.2.0-win32-x64\\python_files\\lib\\jedilsp\\jedi\\third_party\\typeshed\\stdlib\\3\\http\\n\\n',
        '08/03/2025  02:44 pm    <DIR>          .\n',
        '08/03/2025  02:44 pm    <DIR>          ..\n',
        '08/03/2025  02:44 pm             6,034 client.pyi\n',
        '08/03/2025  02:44 pm             4,991 cookiejar.pyi\n',
        '08/03/2025  02:44 pm             1,364 cookies.pyi\n',
        '08/03/2025  02:44 pm             3,036 server.pyi\n',
        '08/03/2025  02:44 pm             1,940 __init__.pyi\n',
        '               5 File(s)         17,365 bytes\n\n',
        'Directory of C:\\Users\\MY PC\\.vscode\\extensions\\ms-python.python-2025.2.0-win32-x64\\python_files\\lib\\jedilsp\\jedi\\third_party\\typeshed\\stdlib\\3\\http\\n\\n',
        '08/03/2025  02:44 pm    <DIR>          .\n',
        '08/03/2025  02:44 pm    <DIR>          ..\n',
        '08/03/2025  02:44 pm             6,034 client.pyi\n',
        '08/03/2025  02:44 pm             4,991 cookiejar.pyi\n',
        '08/03/2025  02:44 pm             1,364 cookies.pyi\n',
        '08/03/2025  02:44 pm             3,036 server.pyi\n',
        '08/03/2025  02:44 pm             1,940 __init__.pyi\n',
        '               5 File(s)         17,365 bytes\n\n'
    ];

    let i = 0;
    function printNextLine() {
        if (i < lines.length) {
            if (i < 4) {
                modalText.innerText += lines[i]; // Add each line gradually
                i++;
                setTimeout(printNextLine, 1000); // Delay each line for a typing effect
            }
            else {
                if (!valid) {
                    textAction = action === 'encrypt' ? 'Encryption' : 'Decryption';
                    setTimeout(() => {
                        modalText.innerText += textAction + ' failed!\n';
                        if (text == '' && isNaN(shift))
                            modalText.innerText += 'Text and shift value was not provided\n';
                        else if (text == '')
                            modalText.innerText += 'Text was not provided\n';
                        else if (isNaN(shift))
                            modalText.innerText += 'Shift value was not provided\n';
                        modalText.innerText += 'Press (esc) key to close the window ...\n';
                    }, 1000);

                    document.addEventListener("keydown", closeOnEsc);
                    return;
                }
                else {
                    modalText.innerText += lines[i]; // Add each line gradually

                    modal.scrollTop = modal.scrollHeight;
                    i++;
                    setTimeout(printNextLine, 100); // Delay each line for a typing effect
                }
            }
        } else {
            let textAction2 = action === 'encrypt' ? 'Encrypted' : 'Decrypted';
            setTimeout(() => {
                modalText.innerText += textAction + ' complete!\n';
                modalText.innerText += textAction2 + ' text: ' + text + '\n';
                modalText.innerText += 'Press (esc) key to close the window ...\n';
            }, 1000);

            document.addEventListener("keydown", closeOnEsc);
        }
    }

    function closeOnEsc(event) {
        if (event.keyCode === 27) { // 27 is the keycode for Esc
            modal.style.display = "none";
            document.removeEventListener("keydown", closeOnEsc); // Remove event listener after closing
        }
    }

    printNextLine();
}

const videos = [
    "https://www.youtube.com/embed/9chKCUQ8_VQ?si=I802S_IbtLagV2M3",
    "https://www.youtube.com/embed/Hh6C3fNH1dM?si=89_wipH7OwabUoXD", // Replace with other video links
    "https://www.youtube.com/embed/9u6sovgxiH4?si=LyrLe7M7D1aL699D"
];

let currentVideoIndex = 0;

function changeVideo(direction) {
    currentVideoIndex += direction;

    // Wrap around if the index exceeds the array bounds
    if (currentVideoIndex < 0) {
        currentVideoIndex = videos.length - 1;
    } else if (currentVideoIndex >= videos.length) {
        currentVideoIndex = 0;
    }

    // Update the iframe's src to the new video
    document.getElementById("video-frame").src = videos[currentVideoIndex];
}
