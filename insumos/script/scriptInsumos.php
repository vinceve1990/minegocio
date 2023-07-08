<?php
	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once "../minegocio/insumos/class/classInsumos.php";
	require_once "../minegocio/modelos/inicioModel.php";
	require_once "../minegocio/giros/class/classGiros.php";
	require_once "../minegocio/validaciones/class/classValidacionesProveedores.php";

	/*Saneo de datos*/
	require_once "../minegocio/validaciones/class/validacionesDatosIngreso.php";
	/*Fin Saneo de datos*/

	foreach ($_POST as $key => $value) {
	 	$$key = $value;
	}

	$classInsumos = new classInsumos();

	$classInsumos->Autenticar();

	$response = new stdClass();

	switch ($accion) {
		case 'informacion':
			$fil = "";

			//codigo,codigo_barras,descripcion_insumo,nomenclatura,status
			/*if(!empty($filAdd['id'])) {
				$fil .= " AND a.id_catalogo_proveedor_PK = '".$filAdd['id']."'";
			}

			if(!empty($filAdd['nombre_proveedor'])) {
				$fil .= " AND a.nombre LIKE '%".$filAdd['nombre_proveedor']."%'";
			}

			if(!empty($filAdd['status'])) {
				$fil .= " AND IF(a.status_proveedor = 0, 'DESACTIVADO', 'ACTIVO') LIKE '%".$filAdd['status']."%'";
			}

			if(!empty($filAdd['rfc'])) {
				$fil .= " AND a.rfc LIKE '%".$filAdd['rfc']."%'";
			}

			if(!empty($filAdd['telefono'])) {
				$fil .= " AND a.telefono LIKE '%".$filAdd['telefono']."%'";
			}

			if(!empty($filAdd['email'])) {
				$fil .= " AND a.email_principal LIKE '%".$filAdd['email']."%'";
			}

			if($filAdd['id_catalogo_insumos_PK'] > 0) {
				$fil .= " AND a.id_catalogo_insumos_PK = ".$filAdd['id_catalogo_insumos_PK'];
			}

			if(!empty($filAdd['cp'])) {
				$fil .= " AND a.cp = ".$filAdd['cp'];
			}*/

			$response = $classInsumos->informacionInsumos($fil);
			break;

		/*case 'activarProveedor':
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
			$inicioModel = new inicioModel();

			$descToken = $inicioModel->descriptToken($token);

			if($descToken === $_SESSION['tokenVal']) {
				$validacionesDatosIngreso = new validacionesDatosIngreso((object)$Dat);

				if ($validacionesDatosIngreso->result == 0) {
					$param = $validacionesDatosIngreso->paramValidado;

					/*Validacion de RFC
					$classValidacionesProveedores = new classValidacionesProveedores($param);
					$valProveedor = $classValidacionesProveedores->validaRFC();
					/*#################
					if($valProveedor == 0) {
						$response = $classProveedor->altaProveedor($param);
					} else {
						$response->val = 1;
						$response->mensaje = "RFC YA EXISTE REGISTRADO";
					}
				} else {
					$response->val = $validacionesDatosIngreso->result;
					$response->mensaje = $validacionesDatosIngreso->mensaje;
				}
			}
			break;*/
		default:
			break;
	}

	echo json_encode($response);
?>