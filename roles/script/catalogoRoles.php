<?php 
	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once "../minegocio/roles/class/classRoles.php";

	foreach ($_POST as $key => $value) {
	 	$$key = $value;
	}
	
	$ConectarH = new ConectarH();
	$ConectarH->Autenticar();

	$classRoles = new classRoles();
	$response = new stdClass();

	switch ($accion) {
		case 'nuevoRol':
			$DatR = (object)$DatR;
			//validacion de roles
			$existeRol = $classRoles->existeRol($DatR);

			if($existeRol == 0) {
				$response = $classRoles->RegistrarRol($DatR);
			} else {
				$response->mensaje = "EXISTE UN ROL CON ESE NOMBRE";
			}

			break;
		case 'buscarRol':
			$response = $classRoles->selectRoles();
			break;
	}

	echo json_encode($response);
?>