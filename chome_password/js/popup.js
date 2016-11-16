/**
 * Created by dminzat on 11/15/2016.
 */

/*common functions*/
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

if (typeof(Storage) === "undefined") {
    alert("Sorry, your browser does not support Web Storage...");
}

//jQuery
$(document).ready(function () {
    //local storage
    /*localStorage.setItem("currentLanguage", "RU");

    localStorage.setItem("wLanguageRU", "Язык");
    localStorage.setItem("wLanguageEN", "Language");
    localStorage.setItem("currentLanguage", "RU");
    localStorage.setItem("currentLanguage", "RU");
    localStorage.setItem("currentLanguage", "RU");*/

    //variables
    var addOrModifyPassword = $("#addOrModifyPassword");
    var resetBtn = $("#resetBtn");
    var oldPassword = $("#oldPassword");
    var newPassword = $("#newPassword");
    var confirmNewPassword = $("#confirmNewPassword");

    var langRU = $("#langRU");
    var langEN = $("#langEN");

    var oldPasswordDiv = $("#oldPasswordDiv");

    var oldPasswordShow = false;
    if(dbEmpty){
        oldPasswordDiv.css('display', 'none');
        oldPasswordShow = false;
    }

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
        if((!dbEmpty && !oldPassword.val()) || !newPassword.val() || !confirmNewPassword.val()){
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
        // textFieldValidation(oldPassword, dbEmpty);
        textFieldValidation(newPassword);
        textFieldValidation(confirmNewPassword);

        var oldPasswordHad = false;

        var password_storage_id = null;

        if(!dbEmpty){
            db.transaction(function (tx) {//WHERE PASSWORD_STORAGE_ID IS NOT NULL AND CURRENT_PASSWORD = 1
                tx.executeSql('SELECT * FROM PASSWORD_STORAGE WHERE PASSWORD_STORE = ? AND ACTIVE_PASSWORD', [oldPassword.val()], function (tx, results) {
                    var len = results.rows.length, i;
                    for (i = 0; i < len; i++) {
                        var currentRow = results.rows.item(i);
                        alert(currentRow);
                        var passwordCurrent = currentRow.PASSWORD_STORE.trim();
                        if (passwordCurrent && passwordCurrent != '') {
                            oldPasswordHad = true;
                            password_storage_id = currentRow.PASSWORD_STORAGE_ID;
                        }
                    }
                }, function (tx, error) {
                    alert("Check old password" + tx + " " + error);
                });
            });
        }

        if((dbEmpty && newPassword.val() == confirmNewPassword.val()) || (oldPasswordHad && newPassword.val() == confirmNewPassword.val())){
            var newPasswordAdd = newPassword.val();
            db.transaction(function (tx) {
                tx.executeSql('UPDATE PASSWORD_STORAGE SET  WHERE PASSWORD_STORAGE_ID = ?', [getDate(), newPasswordAdd],
                    function (result) { alert('ok added - ' + newPasswordAdd); },
                    function (tx, error) {
                        var text = tx + " " + error;
                        alert("insert" + text);
                    });

                tx.executeSql('INSERT INTO PASSWORD_STORAGE (PASSWORD_STORAGE_ID, PASSWORD_STORE) VALUES (?, ?)', [getDate(), newPasswordAdd],
                    function (result) { alert('ok added - ' + newPasswordAdd); },
                    function (tx, error) {
                        var text = tx + " " + error;
                        alert("insert" + text);
                    });
            });

            emptyFields();
            successP.css("display", "block");
            successP.fadeIn(5000);
            successP.fadeOut(5000);
        }else{
            alert("Incorrect password!" + oldPasswordHad + " - " + newPassword.val() + " " + confirmNewPassword.val());
        }
    });
});