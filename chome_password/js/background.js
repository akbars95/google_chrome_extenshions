chrome.windows.onCreated.addListener(function (window) {
    lsSetPassword = localStorage.getItem("setPassword");
    lsPasswordStorage = localStorage.getItem("passwordStorage");

    /*$(document).ready(function () {
        $( "#dialog" ).dialog();
    });*/


    if (!lsPasswordStorage) {
        var count = 0;
        var password = null;
        do {
            var message = null;
            if (count > 0) {
                message = "You input not valid password, please try again, your attempt - " + count;
            } else {
                message = "You need set Password"
            }
            password = prompt(message);
            count++;
        }
        while (password == null || password.trim() == '');
        localStorage.setItem("passwordStorage", password);
    }

    count = 0;
    if (lsSetPassword == null || lsSetPassword.trim() == '') {
        var res = null;
        var correctPassword = false;
        do {
            res = prompt(count == 0 ? "Please input your password" : "You input not correct password, please try again");
            if (res == localStorage.getItem("passwordStorage")) {
                correctPassword = true;
            }
            count++;
        } while (!correctPassword);
        localStorage.setItem("setPassword", correctPassword);
    }
});

chrome.windows.onRemoved.addListener(function (window) {
    localStorage.removeItem("setPassword");
});