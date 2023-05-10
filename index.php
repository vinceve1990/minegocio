<?php
	require_once "configConexion/config.php";

	$url = !empty($_GET['url']) ? $_GET['url'] : 'inicio/inicio';
	$arrayUrl = explode('/', $url);

	$controlador = $arrayUrl[0];
	$metodo = $arrayUrl[0];
	$parametros = "";

	if(!empty($arrayUrl[1])) {
		if($arrayUrl[1] != "") {
			$metodo = $arrayUrl[1];
		}
	}

	if(!empty($arrayUrl[2])) {
		if($arrayUrl[2] != "") {
			for ($i=2; $i < count($arrayUrl); $i++) { 
				$parametros .= $arrayUrl[$i].',';
			}
			$parametros = trim($parametros, ',');
		}
	}

	require_once "librerias/autoLoad.php";

	require_once "librerias/load.php";

	require_once "validaciones/class/validacionTokenAcceso.php";

	$validacionTokenAcceso = new validacionTokenAcceso($controlador, $metodo);
    //if(!empty($_SESSION['id_persona_PK'])) {
    	$_SESSION['tokenVal'] = $validacionTokenAcceso->token;
    //}
	//var_dump($_SESSION['tokenVal']);
?>