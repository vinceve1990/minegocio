<?php
	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once "../minegocio/validaciones/class/classValidacionesUsuario.php";
	require_once '../minegocio/registroUsuarios/class/classCrearUsuario.php';
	require '../minegocio/perfil/class/classPerfil.php';

	/*Saneo de datos*/
	require_once "../minegocio/validaciones/class/validacionesDatosIngreso.php";
	/*Fin Saneo de datos*/

	$classPerfil = new classPerfil();
	$responce = new stdClass();

	$classPerfil->Autenticar();

	switch ($_POST['accion']) {
		case 'informacion':
			$responce = $classPerfil->infoUsuario();
			break;

		case 'actualizar':
			//Validar datos
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$_POST['Dat']);
			//echo "<pre>";
			//print_r($validacionesDatosIngreso);
			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$responce = $classPerfil->actualizarUsuario($param);
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}
			break;

		default:
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$_POST['Dat']);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$responce = $classPerfil->guardarUsuario($param);
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}
			break;
	}

	echo json_encode($responce);
?>