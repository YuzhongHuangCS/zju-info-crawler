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

path = 'http://ugrs.zju.edu.cn/kyxl/student_getXmxsList.action?q='

fetch = (id)->
	console.log('Fetch: ', id)
	req = request
		uri: path + id
		method: 'GET'
		jar: jar
	, (error, response, body)->
		for student in JSON.parse(body)
			console.log('Insert:', student.xh)
			conn.query 'INSERT INTO `grade12` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [student.xh, student.xm, student.id, student.bjmc, student.xymc, student.sj, student.xybh, student.email, student.zymc], (error)->
				console.log('Error:', error) if error

for id in [312010000..312010999]
	fetch(String(id))
