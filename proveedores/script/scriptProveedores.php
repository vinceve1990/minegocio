<?php
	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once "../minegocio/proveedores/class/classProveedores.php";
	require_once "../minegocio/modelos/inicioModel.php";

	/*Saneo de datos*/
	require_once "../minegocio/validaciones/class/validacionesDatosIngreso.php";
	/*Fin Saneo de datos*/

	foreach ($_POST as $key => $value) {
	 	$$key = $value;
	}

	$classProveedor = new classProveedor();

	$classProveedor->Autenticar();

	$response = new stdClass();

	switch ($accion) {
		case 'informacion':
			$fil = "";
			$response = $classProveedor->informacionProveedores($fil);
			break;
		
		default:
			// code...
			break;
	}

	echo json_encode($response);
?>