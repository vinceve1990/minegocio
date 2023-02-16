<?php
	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once "../minegocio/configConexion/configBaseDatos/configBaseDatos.php";
	require_once '../minegocio/registroUsuarios/class/classCrearUsuario.php';
	require_once '../minegocio/registroUsuarios/class/classCrearUsuarioEmpresa.php';
	require '../minegocio/registroUsuarios/class/classRegistroUsuarios.php';
	require '../minegocio/validaciones/class/classValidacionesPersonas.php';

	/*Saneo de datos*/
	require_once "../minegocio/validaciones/class/validacionesDatosIngreso.php";
	/*Fin Saneo de datos*/

	foreach ($_POST as $key => $value) {
	 	$$key = $value;
	}

	$param = new stdClass();
	$response = new stdClass();
	$resultado = new stdClass();

	$Dat = (object)$Dat;
	//Validar datos
	$validacionesDatosIngreso = new validacionesDatosIngreso($Dat);

	if ($validacionesDatosIngreso->result == 0) {
		$param = $validacionesDatosIngreso->paramValidado;
		$classRegistroUsuarios = new classRegistroUsuarios();

		switch ($accion) {
			case 'registro':
				$configBaseDatos = new configBaseDatos();

				//validacion de cuentas
				$existeCuenta = $classRegistroUsuarios->VerificarUsuario($param);

				if($existeCuenta == 0) {
					//Crear BD Empresa
					$nombreBD = $configBaseDatos->nombreBD($param);

					$resConfBD = $configBaseDatos->scriptBaseDatos($nombreBD);

					$response->val = $resConfBD->val;
					$response->mensaje = $resConfBD->mensaje;
					$response->errorClass = $resConfBD->errorClass;

					if($response->val == 0) {
						$Aclave = array();

						$Aclave = $classRegistroUsuarios->crearClaveRegistro();
						$param->letra = $Aclave[0];
						$param->numS1 = $Aclave[1];
						$param->numS2 = $Aclave[2];
						$param->numS3 = $Aclave[3];
						$param->nombreBD = $nombreBD;

						$response = $classRegistroUsuarios->RegistrarUsuario($param);

						if($response->val == 0) {
							/*Registrar en el nuevo BD unica para iniciar*/
							$classPerfil = new classCrearUsuarioEmpresa();

							//Registrar en personal de la empresa creada//
							$result = $classPerfil->RegistrarUsuarioEmpresa($param);
							$response->val += $result->val;
							$response->mensaje .= $result->mensaje;
							$response->errorClass .= $result->errorClass;
						}
					}
				} else {
					$response->mensaje = "EXISTE UNA CUENTA CON EL CORREO O TELEFONO INGRESADOS";
				}

				break;
		}
	} else {
		$response->val = $validacionesDatosIngreso->result;
		$response->mensaje = $validacionesDatosIngreso->mensaje;
	}

	$resultado->val = $response->val;
	$resultado->mensaje = $response->mensaje;
	$resultado->errorClass = $response->errorClass;

	echo json_encode($resultado);
?>