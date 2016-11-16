/**
 * Created by dminzat on 11/15/2016.
 */
var db = openDatabase('localDBForChromePassword', '1.0', 'Chrome password', 2 * 1024 * 1024);
db.transaction(function (tx) {
    /*tx.executeSql('drop TABLE PASSWORD_STORAGE', [], function (result) { /!*alert('ok')*!/
    }, function (tx, error) {
        var text = tx + " " + error;
        alert("drop " + text);
    });*/

    tx.executeSql('CREATE TABLE IF NOT EXISTS PASSWORD_STORAGE (PASSWORD_STORAGE_ID TEXT PRIMARY KEY,' +
        'PASSWORD_STORE TEXT NOT NULL, ACTIVE_PASSWORD INT NOT NULL)', [], function (result) { alert('ok created db')
    }, function (tx, error) {
        var text = tx + " " + error;
        alert("create " + text);
    });
});

var dbEmpty = true;

db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM PASSWORD_STORAGE', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
            var currentRow = results.rows.item(i);
            var passwordCurrent = currentRow.PASSWORD_STORE.trim();
            if (passwordCurrent && passwordCurrent != '') {
                dbEmpty = false;
            }
        }
    }, function (tx, error) {
        alert("get data from db first time!");
    });
});