<?php
	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once "../minegocio/proveedores/class/classProveedores.php";
	require_once "../minegocio/modelos/inicioModel.php";
	require_once "../minegocio/estados/class/classEstados.php";
	require_once "../minegocio/municipios/class/classMunicipios.php";
	require_once "../minegocio/giros/class/classGiros.php";

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

		case 'selectEstados';
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$classEstados = new classEstados();
				$response = $classEstados->getselectEstados($param);
			} else {
				$response->val = $validacionesDatosIngreso->result;
				$response->mensaje = $validacionesDatosIngreso->mensaje;
			}
			break;

		case 'selectMinicipio';
			$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

			if ($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;

				$classMunicipios = new classMunicipios();
				$response = $classMunicipios->getselectMunicipios($param);
			} else {
				$response->val = $validacionesDatosIngreso->result;
				$response->mensaje = $validacionesDatosIngreso->mensaje;
			}
			break;

		case 'selectGiros';
			$classGiros = new classGiros();
			$response = $classGiros->buscarGiros();
			break;

		case 'altaProveedor':
			//echo $token.' - '.$_SESSION['tokenVal'];
			//if($token == $_SESSION['tokenVal']) {
				$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

				if ($validacionesDatosIngreso->result == 0) {
					$param = $validacionesDatosIngreso->paramValidado;

					$response = $classProveedor->altaProveedor($param);
				} else {
					$response->val = $validacionesDatosIngreso->result;
					$response->mensaje = $validacionesDatosIngreso->mensaje;
				}
			//}
			break;
		default:
			break;
	}

	echo json_encode($response);
?>