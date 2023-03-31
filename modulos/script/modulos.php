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

						$response = $classModulos->verModulos($param);
					} else {
						$responce->val = $validacionesDatosIngreso->result;
						$responce->mensaje = $validacionesDatosIngreso->mensaje;
					}

					break;
				case 'panelTrabajo':
					/*Datos de Ingreso*/
					$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

					if ($validacionesDatosIngreso->result == 0) {
						$param = $validacionesDatosIngreso->paramValidado;

						$response = $classModulos->verModulosPermisos($param);
					} else {
						$responce->val = $validacionesDatosIngreso->result;
						$responce->mensaje = $validacionesDatosIngreso->mensaje;
					}
					break;
				default:

					break;
			}
			break;

		case 'categorias':
			switch ($fil) {
				case 'panelTrabajo':
					$response = $classModulos->verCategoriasPermisos();
					break;
				default:
					$response = $classModulos->verCategorias();
					break;
			}
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