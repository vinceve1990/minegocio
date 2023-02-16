<?php  
	//Load
	$controladorFile = "controladores/".$controlador.".php";
	//echo "string=> ".$controladorFile.' -> '.$metodo;
	if (file_exists($controladorFile)) {
		require_once($controladorFile);

		$control = new $controlador();
		
		if(method_exists($controlador, $metodo)) {
			//echo $metodo.'->'.$parametros;exit();
			$control->{$metodo}($parametros);
		} else {
			//echo "string=> ".$controlador.' -> '.$metodo;
			require_once("controladores/errores.php");	
		}
	} else {
		//echo "string=> ".$controlador.' -> '.$metodo;
		require_once("controladores/errores.php");
	}
?>