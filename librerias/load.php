<?php
	//Load
	$controladorFile = "controladores/".$controlador.".php";
	if (file_exists($controladorFile)) {
		require_once($controladorFile);

		$control = new $controlador();

		if(method_exists($controlador, $metodo)) {
			$control->{$metodo}($parametros);
		} else {
			require_once("controladores/errores.php");
		}
	} else {
		require_once("controladores/errores.php");
	}
?>