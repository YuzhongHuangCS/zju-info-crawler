var http = require("http");

var path = 'http://ugrs.zju.edu.cn/kyxl/student_getXmxsList.action?q=';

function fetch(url) {
    var req = http.get(url, function(result) {
        var body = '';

        result.on('data', function(chunk) {
            body += chunk;
        })

        result.on('end', function() {
            var json = JSON.parse(body);
            console.log(json);
        });
    });

    req.on('error', function(error) {
        console.log(error);
    })
}

var id = 312000000;
//for(count = 1; count++, id++; id < 312000050){
	//console.log(count, id);
fetch(path + '312000000');
//}