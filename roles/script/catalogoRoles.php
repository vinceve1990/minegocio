<?php 
	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once "../minegocio/roles/class/classRoles.php";

	require_once "../minegocio/validaciones/class/classValidacionesUsuario.php";
	require_once "../minegocio/validaciones/class/classValidacionesPersonas.php";
	require_once "../minegocio/modelos/inicioModel.php";

	/*Saneo de datos*/
	require_once "../minegocio/validaciones/class/validacionesDatosIngreso.php";
	/*Fin Saneo de datos*/

	foreach ($_POST as $key => $value) {
	 	$$key = $value;
	}
	
	$ConectarH = new ConectarH();
	$ConectarH->Autenticar();

	$classRoles = new classRoles();
	$response = new stdClass();

	switch ($accion) {
		case 'nuevoRol':
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$DatR);

			if ($validacionesDatosIngreso->result == 0) {
				$DatR = $validacionesDatosIngreso->paramValidado;

				//validacion de roles
				$existeRol = $classRoles->existeRol($DatR);

				if($existeRol == 0) {
					$response = $classRoles->RegistrarRol($DatR);
				} else {
					$response->mensaje = "EXISTE UN ROL CON ESE NOMBRE";
				}
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}
			break;
		case 'buscarRol':
			$response = $classRoles->selectRoles();
			break;
		case 'server':
			$fil = "";
			
			$response = $classRoles->verRoles($fil);
			break;
		case 'editarRol':
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$DatR);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$response = $classRoles->updateNomRol($param);
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}
			break;
		case 'eliminarRol':
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;
				$param->status = 0;

				$response = $classRoles->updateRol($param);
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}
			break;
		case 'activarRol':
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;
				$param->status = 1;

				$response = $classRoles->updateRol($param);
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}
			break;
	}

	echo json_encode($response);
?>