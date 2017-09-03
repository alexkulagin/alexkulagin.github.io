<?php
	if ($_SERVER['REQUEST_METHOD'] == 'GET')
	{
		if (!empty($_GET['id'])) {
			$result = file_get_contents('./data/'.$_GET['id'].'.json');
		} else {
			$result = file_get_contents('./data/c.json');
		}

		echo $result;
	}
?>