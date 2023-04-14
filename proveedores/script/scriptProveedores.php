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

			if(!empty($filAdd['id'])) {
				$fil .= " AND a.id_catalogo_proveedor_PK = '".$filAdd['id']."'";
			}

			if(!empty($filAdd['nombre_proveedor'])) {
				$fil .= " AND a.nombre LIKE '%".$filAdd['nombre_proveedor']."%'";
			}

			if(!empty($filAdd['status'])) {
				$fil .= " AND IF(a.status_proveedor = 0, 'DESACTIVADO', 'ACTIVO') LIKE '%".$filAdd['status']."%'";
			}

			$response = $classProveedor->informacionProveedores($fil);
			break;

		case 'activarProveedor':
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$response = $classProveedor->activarProveedores($param);
			} else {
				$response->val = $validacionesDatosIngreso->result;
				$response->mensaje = $validacionesDatosIngreso->mensaje;
			}
			
			break;

		case 'bajaProveedor':
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$response = $classProveedor->bajaProveedores($param);
			} else {
				$response->val = $validacionesDatosIngreso->result;
				$response->mensaje = $validacionesDatosIngreso->mensaje;
			}
			
			break;
		
		default:
			// code...
			break;
	}

	echo json_encode($response);
?>