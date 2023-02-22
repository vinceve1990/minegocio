<?php
	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once "../minegocio/registroUsuarios/class/classCrearUsuario.php";
	require_once "../minegocio/perfil/class/classPerfil.php";
	require_once "../minegocio/personal/class/classPersonal.php";
	require_once "../minegocio/validaciones/class/classValidacionesUsuario.php";
	require_once "../minegocio/validaciones/class/classValidacionesPersonas.php";
	require_once "../minegocio/modelos/inicioModel.php";

	/*Saneo de datos*/
	require_once "../minegocio/validaciones/class/validacionesDatosIngreso.php";
	/*Fin Saneo de datos*/

	foreach ($_POST as $key => $value) {
	 	$$key = $value;
	}

	$classPersonal = new classPersonal();
	$classPerfil = new classPerfil();

	$classPersonal->Autenticar();

	$response = new stdClass();

	switch ($accion) {
		case 'server':
			if(!empty($_SESSION['id_persona_PK'])) {

				$fil = '';

				if(isset($id)) {
					$fil .= " AND id_persona_negocio_PK = ".$id;
				}

				if(isset($usuario)) {
					$fil .= " AND usuario LIKE '%".$usuario."%'";
				}

				if(isset($nombre)) {
					$fil .= " AND nombre LIKE '%".$nombre."%'";
				}

				if(isset($apellidos)) {
					$fil .= " AND apellidos LIKE '%".$apellidos."%'";
				}

				if(isset($telefono)) {
					$fil .= " AND telefono LIKE '%".$telefono."%'";
				}

				if(isset($email)) {
					$fil .= " AND correo LIKE '%".$email."%'";
				}

				if(isset($curp)) {
					$fil .= " AND curp LIKE '%".$curp."%'";
				}

				if(isset($sexo)) {
					$fil .= " AND IF(sexo = 1, 'Masculino', IF(sexo = 1,'Femenino','Indefinido')) LIKE '%".$sexo."%'";
				}

				if(isset($rol)) {
					$fil .= " AND nombreRol LIKE '%".$rol."%'";
				}

				if(isset($status)) {
					$fil .= " AND IF(status_per = 0, 'BAJA', 'ALTA') LIKE '%".$status."%'";
				}

				$response = $classPersonal->informacionPersonal($fil);
			} else {
				$response->mensaje = "INICIE SESION";
			}

			break;

		case 'Alta':

			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$response = $classPerfil->guardarUsuario($param);
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}
			break;

		case 'Edicion':
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$response = $classPerfil->actualizarUsuario($param);
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}

			break;

		case 'bajaPersonal':
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$response = $classPersonal->bajaPersonal($param);

				if($response->val == 0) {
					$response->mensaje = "BAJA EXITOSA";
				}
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}

			break;

		case 'activarPersonal':
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$response = $classPersonal->activarPersonal($param);

				if($response->val == 0) {
					$response->mensaje = "USUARIO ACTIVADO";
				}
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}

			break;

		case 'informacionPersona':
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$response = $classPersonal->informacionPersona($param);
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}

			break;
	}

	echo json_encode($response);
?>