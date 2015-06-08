var request = require("request");
var jar = request.jar();

var cookie = request.cookie('JSESSIONID=E5E639D825B74E8C4B7E2ED02363C91A');
jar.add(cookie);

var path = 'http://ugrs.zju.edu.cn/kyxl/daoshi_getXmdsList.action?q=';

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'nodejs',
    port: 3306
});
conn.connect();

for (var id = 000000; id <= 009999; id++) {
    fetch(NumToString(id, 6));
}

function fetch(id) {
    var url = path + id;
    request({
        uri: url,
        method: "GET",
        jar: jar
    }, function(error, response, body) {
        var json = JSON.parse(body);
        if (body !== '[]') {
            for (var i = 0; i <= 9; i++) {
                if ((typeof(json[i]) !== 'undefined') && (json[i].jgh != 1138100002)) {
                    console.log('Insert:' + json[i].jgh);
                    conn.query('INSERT INTO `teacher`(`jgh`, `xm`, `xw`, `xy`, `id`, `email`, `xb`, `lxfs`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [json[i].jgh, json[i].xm, json[i].xw, json[i].xy, json[i].id, json[i].email, json[i].xb, json[i].lxfs], function(err) {
                        if (err) {
                            console.log("A wild error appeared!", err);
                        }
                    });
                }
            }
        } else {
            console.log('Not exist:' + id)
        }
    })
}

function NumToString(num, len) {
    var numlen = num.toString().length; //得到num的长度
    var strChar = '0'; //空缺位填充字符
    var str = num;
    for (var i = 0; i < len - numlen; i++) {
        str = strChar + str;
    }
    return str;
}