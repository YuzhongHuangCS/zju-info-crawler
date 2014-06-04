// Dependencies
var fs = require('fs');
var http = require('http');

var map = 'http://www.idi.zju.edu.cn/joinsdi/sdilod/portal?action=getUploadData'

var options = {
    host: 'www.idi.zju.edu.cn',
    port: 80,
    path: '/joinsdi/sdilod/portal?action=getUploadData',
    method: 'GET'
};

var req = http.get(options, function(res) {
    var jsonData = "";
    res.on('data', function(chunk) {
        jsonData += chunk;
    });
    res.on('end', function() {
        var json = JSON.parse(jsonData);
        for (i = 0; i < json.length; i++) {
            downloadApply(json, i);
        };
    });
});


function downloadApply(json, i) {
    //console.log(i, json[i].name);
    var filename = 'apply/' + json[i].name + '-' + json[i].num + '-JoinSDI.' + json[i].apply.split('.')[1];
    var path = '/joinsdi/sdilod/portal?action=getApply&uploadID=' + json[i].uploadID;

    var options = {
        host: 'www.idi.zju.edu.cn',
        port: 80,
        path: path
    };

    var file = fs.createWriteStream(filename);
    http.get(options, function(res) {
        res.on('data', function(data) {
            //console.log(data);
            file.write(data);
        }).on('end', function() {
            file.end();
            console.log(i, json[i].name, filename);
        });
    });
}