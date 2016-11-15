/**
 * Created by dminzat on 11/15/2016.
 */
/*self.close();
window.close();
var customWindow = window.open('', '_blank', '');
customWindow.close();*/

var db = openDatabase('localDBForChromePassword', '1.0', 'Chrome password', 2 * 1024 * 1024);
db.transaction(function (tx) {//
    /*tx.executeSql('drop TABLE PASSWORD_STORAGE', [], function (result) { /!*alert('ok')*!/ },function (tx, error) {
        var text = tx + " " + error;
        alert("drop " + text);});*/

    tx.executeSql('CREATE TABLE IF NOT EXISTS PASSWORD_STORAGE (PASSWORD_STORAGE_ID TEXT PRIMARY KEY,' +
        'PASSWORD_STORE TEXT NOT NULL)', [], function (result) { /*alert('ok')*/ },function (tx, error) {
        var text = tx + " " + error;
        alert("create " + text);});
});

db.transaction(function (tx) {//WHERE PASSWORD_STORAGE_ID IS NOT NULL AND CURRENT_PASSWORD = 1
    tx.executeSql('SELECT * FROM PASSWORD_STORAGE', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++){
            alert("PASSWORD_STORAGE_ID - " + results.rows.item(i).PASSWORD_STORAGE_ID );
            alert("PASSWORD_STORE - " + results.rows.item(i).PASSWORD_STORE );
        }

    }, null);
});

function getDate(){
    var d = new Date();
    return addNull(d.getHours()) + ":" + addNull(d.getMinutes()) + ":" + d.getSeconds()
    + " " + addNull(d.getDate()) + "." + addNull(d.getMonth() + 1) + "." +  d.getFullYear();
}

function addNull(number) {
    if(number < 10 && number >= 0){
        return "0" + number;
    }
    return number;
}

$(document).ready(function () {

    if (typeof(Storage) === "undefined") {
        alert("Sorry, your browser does not support Web Storage...");
    }

    //local storage
    localStorage.setItem("currentLanguage", "RU");

    localStorage.setItem("wLanguageRU", "Язык");
    localStorage.setItem("wLanguageEN", "Language");
    localStorage.setItem("currentLanguage", "RU");
    localStorage.setItem("currentLanguage", "RU");
    localStorage.setItem("currentLanguage", "RU");

    //variables
    var addOrModifyPassword = $("#addOrModifyPassword");
    var resetBtn = $("#resetBtn");
    var oldPassword = $("#oldPassword");
    var newPassword = $("#newPassword");
    var confirmNewPassword = $("#confirmNewPassword");

    var langRU = $("#langRU");
    var langEN = $("#langEN");

    var successP = $("#successP");

    //default for elaments
    successP.css("display", "none");
    successP.fadeOut();
    defineLanguage();

    langRU.click(function () {
        localStorage.setItem("currentLanguage", "RU");
    });

    langEN.click(function () {
        localStorage.setItem("currentLanguage", "EN");
    });

    function defineLanguage() {
        var lsCurrentLanguage = localStorage.getItem("currentLanguage");
        if(lsCurrentLanguage){
            if(lsCurrentLanguage == 'RU'){
                langRU.css("border", "2px solid blue");
            }else{
                langEN.css("border", "2px solid blue");
            }
        }
    }

    addOrModifyPassword.prop('disabled', true);

    function changeTextFields() {
        if(!oldPassword.val() || !newPassword.val() || !confirmNewPassword.val()){
            addOrModifyPassword.prop('disabled', true);
        }else{
            addOrModifyPassword.prop('disabled', false);
        }
    }

    function emptyFields() {
        oldPassword.val("");
        newPassword.val("");
        confirmNewPassword.val("");
    }

    function textFieldValidation(currentTextField) {
        if(!currentTextField.val()){
            alert("Old password is empty");
            addOrModifyPassword.prop('disabled', true);
            currentTextField.css("border", "5px solid red");
            return;
        }else{
            currentTextField.css("border", "1px solid green");
        }
    }

    resetBtn.click(function () {
        addOrModifyPassword.prop('disabled', true);
        emptyFields();
        oldPassword.css("border", "5px solid red");
        newPassword.css("border", "5px solid red");
        confirmNewPassword.css("border", "5px solid red");
    });

    oldPassword.keypress(changeTextFields);
    newPassword.keypress(changeTextFields);
    confirmNewPassword.keypress(changeTextFields);

    oldPassword.keydown(changeTextFields);
    newPassword.keydown(changeTextFields);
    confirmNewPassword.keydown(changeTextFields);

    addOrModifyPassword.click(function () {
        textFieldValidation(oldPassword);
        textFieldValidation(newPassword);
        textFieldValidation(confirmNewPassword);

        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO PASSWORD_STORAGE (PASSWORD_STORAGE_ID, PASSWORD_STORE) ' +
                'VALUES (?, ?)', [getDate(), newPassword.val()], function (result) { alert('ok added') },
                function (tx, error) {
                    var text = tx + " " + error;
                    alert("insert" + text);
                });
        });

        emptyFields();
        successP.css("display", "block");
        successP.fadeIn(5000);
        successP.fadeOut(5000);
    });



    // Check browser support
    /*if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem("lastname", "Smith");
        // Retrieve
        document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }*/





});