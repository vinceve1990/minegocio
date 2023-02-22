<?php
	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once '../minegocio/perfil/class/classSubirFoto.php';

	$id_usuarioNew = "";

	foreach ($_POST as $key => $value) {
	 	$$key = $value;
	}

	$classSubirFoto = new classSubirFoto();

	$classSubirFoto->Autenticar();

	$param = new stdClass();
	$responce = new stdClass();

	$param->nombre_archivo   = $_FILES[0]['name'];
	$param->tipo_archivo     = $_FILES[0]['type'];
	$param->archivo_temporal = $_FILES[0]['tmp_name'];

	$extension1 = pathinfo($param->nombre_archivo, PATHINFO_EXTENSION);
    $param->extension = strtoupper($extension1);
    $param->permitidos = array('JPEG', 'JPG', 'PNG', 'TIF', 'GIF');

    if($id_usuarioNew != "" && isset($id_usuarioNew) && $id_usuarioNew > 0) {
    	$param->id_usuario = $id_usuarioNew;
    } else {
    	$param->id_usuario = $_SESSION['id_usuario_negocio_PK'];
    }

	if(isset($param->id_usuario)) {
		$responce = $classSubirFoto->subirFoto($param);
	} else {
		$responce->mensaje = "Inicie Sesion";
	}

	echo json_encode($responce);
?>