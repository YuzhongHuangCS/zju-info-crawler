var request = require('request');
var fs = require('fs');

var map = 'http://www.idi.zju.edu.cn/joinsdi/sdilod/portal?action=getUploadData';

request({
    url: map,
    method: "GET"
}, function(error, response, body) {
    var json = JSON.parse(body);

    for(i = 0; i < json.length; i++){
        downloadApply(json, i);
    };
})

function downloadApply(json, i){
    console.log(i, json[i].name);
    var filename = 'apply/' + json[i].name + '-' + json[i].num + '.' + json[i].apply.split('.')[1];
    var url = 'http://www.idi.zju.edu.cn/joinsdi/sdilod/portal?action=getAvatar&uploadID=' + json[i].uploadID;


    request({
        url: url,
        method: "GET"
    }, function(error, response, body) {
        fs.writeFile(filename, body);
    })
    //request(url).pipe(fs.createWriteStream(filename));
}