<?php
	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once "../minegocio/modulos/class/classModulos.php";

	/*Saneo de datos*/
	require_once "../minegocio/validaciones/class/validacionesDatosIngreso.php";
	/*Fin Saneo de datos*/

	foreach ($_POST as $key => $value) {
	 	$$key = $value;
	}

	$classModulos = new classModulos();

	$classModulos->Autenticar();

	$response = new stdClass();

	switch ($accion) {
		case 'informacion':
			switch ($fil) {
				case 'permisos':
					/*Datos de Ingreso*/
					$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

					if ($validacionesDatosIngreso->result == 0) {
						$param = $validacionesDatosIngreso->paramValidado;

						$response = $classModulos->permisosModulos($param);
					} else {
						$responce->val = $validacionesDatosIngreso->result;
						$responce->mensaje = $validacionesDatosIngreso->mensaje;
					}
					
					break;
				
				default:
					// code...
					break;
			}
			break;

		case 'categorias':
			
			$response = $classModulos->verCategorias();
			break;

		case 'permisos';
			/*Datos de Ingreso*/
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$response = $classModulos->guardarPermisos($param);
			} else {
				$responce->val = $validacionesDatosIngreso->result;
				$responce->mensaje = $validacionesDatosIngreso->mensaje;
			}
			break;

		default:
			// code...
			break;
	}

	echo json_encode($response);
?>