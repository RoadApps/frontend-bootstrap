<?php

$_POST['ipAddress'] = $_SERVER['REMOTE_ADDR'];
$_POST['referer'] = $_SERVER['HTTP_REFERER'];
$_POST['userAgent'] = $_SERVER['HTTP_USER_AGENT'];
$_POST['timestamp'] = date('Y-m-d H:i:s');

error_log(json_encode($_POST) ."\n", 3, 'cotacao.json');
mail('cesar@roadapps.net', 'Contato site', print_r($_POST, true));
mail('mauricio@roadapps.net', 'Contato site', print_r($_POST, true));

?>
