'use strict'

request = require('request')
mysql = require('mysql')

jar = request.jar()
jar.add(request.cookie('JSESSIONID=843A3967ABF7F139527E6BBECC80F8BD'))

conn = mysql.createConnection
	host: 'localhost'
	user: 'nodejs'
	password: 'nodejs'
	database: 'nodejs'
	port: 3306
conn.connect()

path = 'http://ugrs.zju.edu.cn/kyxl/daoshi_getXmdsList.action?q='

leftJustified = (str, width, fill)->
	return Array(width - str.length + 1).join(fill) + str

fetch = (id)->
	console.log('Fetch: ', id)
	req = request
		uri: path + id
		method: 'GET'
		jar: jar
	, (error, response, body)->
		for teacher in JSON.parse(body)
			console.log('Insert:', teacher.jgh)
			conn.query 'INSERT INTO `teacher` VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [teacher.jgh, teacher.xm, teacher.xw, teacher.xy, teacher.id, teacher.email, teacher.xb, teacher.lxfs], (error)->
				console.log('Error:', error) if error

for id in [0..9999]
	fetch(leftJustified(String(id), 6, '0'))
