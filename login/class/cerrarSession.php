<?php
	require_once "../minegocio/configConexion/conexion.php";

	$con = new ConectarH();
	$con->Autenticar();

	unset($_SESSION["usuario"]);
	unset($_SESSION["nombreUser"]);
	unset($_SESSION["id_persona_PK"]);
	session_destroy();
	ini_set("session.cookie_lifetime","0");
	ini_set("session.gc_maxlifetime","0");

	if (empty($_SESSION["id_persona_PK"])) {
		echo json_encode(1);
	}
?>