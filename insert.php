<?php
	$conn = mysql_connect('localhost', 'qngwns', 'MKQrM8Vn');

	if (!$conn){
		die(mysql_error());
	}

	mysql_select_db("qngwns", $conn);
	mysql_query('set character set "utf8"');
	mysql_query('set names "utf8"');

	$sql = 'SELECT xh, xm FROM node  ORDER BY xh DESC LIMIT 200';
	$result = mysql_query($sql, $conn);

	while($row = mysql_fetch_assoc($result)){
		do{
			$rand = rand (100, 199);
		} while(($rand == 107) || ($rand == 102));

		$sql = 'INSERT INTO `voter`(`id`, `name`, `password`, `choice1`, `choice2`, `choice3`, `total`) VALUES ($row['xh'], $row['xm'], , $rand, 107, 102, 3)';
		mysql_query($sql, $conn);
		if(mysql_insert_id() != 0){
			$sql = 'UPDATE `qizhen_vote` SET `total` = total + 1 WHERE `id` = 102';
			mysql_query($sql, $conn);
			$sql = 'UPDATE `qizhen_vote` SET `total` = total + 1 WHERE `id` = 107';
			mysql_query($sql, $conn);
			$sql = 'UPDATE `qizhen_vote` SET `total` = total + 1 WHERE `id` = ' . $rand;
			mysql_query($sql, $conn);
		}
	};
?>