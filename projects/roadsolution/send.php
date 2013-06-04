<?php

if (isset($_POST['email'])) {
	$subscription = array_merge(
		array(
			'timestamp' => date('r'),
			'remoteAddr' => $_SERVER['REMOTE_ADDR']), 
		$_POST
	);
	error_log(json_encode($subscription) .",\n", 3, 'subscriptions.json');
}

?>