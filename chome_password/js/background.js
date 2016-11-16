chrome.windows.onCreated.addListener(function (window) {
    if (!localStorage.getItem("setPassword")) {
        var res = null;

        if (!dbEmpty) {
            var correctPassword = false;
            do {
                alert("Not correct password - " + res);
                res = prompt("Message");
                db.transaction(function (tx) {//WHERE PASSWORD_STORAGE_ID IS NOT NULL AND CURRENT_PASSWORD = 1
                    tx.executeSql('SELECT * FROM PASSWORD_STORAGE WHERE PASSWORD_STORE = ? AND ACTIVE_PASSWORD = ?', [res, 1], function (tx, results) {
                        var len = results.rows.length, i;
                        for (i = 0; i < len; i++) {
                            if (results.rows.item(i).PASSWORD_STORAGE_ID && results.rows.item(i).PASSWORD_STORE) {
                                correctPassword = true;
                            }
                        }

                    }, null);
                });
            } while (!correctPassword);
            localStorage.setItem("setPassword", correctPassword);
        }
    }
});

chrome.windows.onRemoved.addListener(function (window) {
    localStorage.removeItem("setPassword");
});