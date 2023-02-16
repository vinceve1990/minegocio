<?php
	/*Saneo de datos*/
	require_once "../minegocio/validaciones/class/validacionesDatosIngreso.php";

	foreach ($_POST as $key => $value) {
	 	$$key = $value;
	}

	$Dat = (object)$Dat;

	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once '../minegocio/PHPMailer/class.phpmailer.php';
	require '../minegocio/login/class/correoEnvio.php';

	$param = new stdClass();
	$response = new stdClass();

	$correoEnvio = new correoEnvio();

	//validacion de cuentas
	$existeCuenta = $correoEnvio->VerificarCorreo($Dat);

	if($existeCuenta == 1) {
		$response = $correoEnvio->enviarCorreo($Dat);
	} else {
		$response->mensaje = "EL CORREO NO ESTA REGISTRADO";
	}

	echo json_encode($response);
?>