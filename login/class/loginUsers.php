<?php

	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	/*Saneo de datos*/
	require_once "../minegocio/validaciones/class/validacionesDatosIngreso.php";
	/*Fin Saneo de datos*/

	class Logear extends ConectarH
	{
		private $pass = PASSBD;

		function __construct()
		{}

		public function buscarUsuario($param)
		{
			$response = new stdClass();

			//Validar datos
			$validacionesDatosIngreso = new validacionesDatosIngreso($param);

			if($validacionesDatosIngreso->result == 0) {
				$param = $validacionesDatosIngreso->paramValidado;
				//Saneo de datos para Mysql
				$param = parent::escapeQuery($param);

				//Base de datos
				$bd = <<<EOT
				SELECT
					nombrebd,
					AES_DECRYPT(passwordBD,'$this->pass') AS passwordBD,
					nombre_negocio,
					tipo_negocio
				FROM
					negocios_tipo
				WHERE
					CONCAT_WS( '', clave_registro_letra, clave_registro_numeroS1, clave_registro_numeroS2, clave_registro_numeroS3 ) = "$param->claveEmpresa"
EOT;
				$queryBD = parent::querySelect($bd);

				if ($queryBD === "error") {
					$this->val++;
					$this->mensaje .= "AL SELECCIONAR LA EMPRESA <br>";
					$this->errorClass .= "buscarUsuario() - buscarUsuario";
				}

				$rowBD = $queryBD->fetch_object();

				if(isset($rowBD->nombrebd)) {
					$bdSel = $rowBD->nombrebd;
					$passBD = $rowBD->passwordBD;
					$nombre_negocio = $rowBD->nombre_negocio;
					$tipo_negocio = $rowBD->tipo_negocio;

					$user = <<<EOT
						SELECT
							*
						FROM
							$bdSel.personalnegocio a
							INNER JOIN $bdSel.usuariosnegocio b ON a.id_persona_negocio_PK = b.id_persona_negocio_FK
						WHERE
							(a.correo = '$param->usuario' OR a.telefono = '$param->usuario' OR b.usuario = '$param->usuario')
						AND AES_DECRYPT(b.passwd, '$passBD') = '$param->pass'
EOT;
		        	$query = parent::querySelect($user);
		        	$row = $query->fetch_object();

		        	if(isset($row->usuario) && $row->usuario != "") {
		        		if(!empty($_SESSION['id_persona_PK'])) {
							unset($_SESSION["usuario"]);
							unset($_SESSION["nombreUser"]);
							unset($_SESSION["id_persona_PK"]);
							unset($_SESSION["nombre_negocio"]);
							unset($_SESSION["id_usuario_negocio_PK"]);
							unset($_SESSION["baseDatos"]);
							unset($_SESSION["passwordBD"]);
							unset($_SESSION["tipo_negocio"]);
							unset($_SESSION["id_roles"]);
							session_destroy();
							ini_set("session.cookie_lifetime","0");
							ini_set("session.gc_maxlifetime","0");
		        		}
		        		/*Rol del Usuario*/
		        		$Srol = <<<EOT
		        		SELECT id_roles_FK FROM $bdSel.rolesnegocio WHERE id_usuario_negocio_FK = $row->id_usuario_negocio_PK
EOT;
						$Rquery = parent::querySelect($Srol);
						$Srow = $Rquery->fetch_object();

						$response->usuario       = $row->usuario;
						$response->id_persona_PK = $row->id_persona_negocio_PK;
						$response->nombre        = $row->nombre;
						$response->apellidos     = $row->apellidos;

						ini_set("session.cookie_lifetime","0");
						ini_set("session.gc_maxlifetime","0");


						parent::Autenticar();

						$_SESSION['usuario']       		   = $row->usuario;
						$_SESSION['nombreUser']    		   = $row->nombre.' '.$row->apellidos;
						$_SESSION['id_persona_PK'] 		   = $row->id_persona_negocio_PK;
						$_SESSION['nombre_negocio'] 	   = $nombre_negocio;
						$_SESSION['id_usuario_negocio_PK'] = $row->id_usuario_negocio_PK;
						$_SESSION["baseDatos"]			   = $bdSel;
						$_SESSION["passwordBD"]			   = $passBD;
						$_SESSION["tipo_negocio"]		   = $tipo_negocio;
						$_SESSION["id_roles"]		   	   = $Srow->id_roles_FK;

					} else {
						$response->usuario = 0;
						$response->mensaje = 'La Contraseña es diferente o no existe usuario';
					}
				} else{
					$response->usuario = 0;
					$response->mensaje = 'La Contraseña es diferente o no existe usuario';
				}
			} else {
				$response->usuario = 0;
				$response->mensaje = $validacionesDatosIngreso->mensaje;
			}

        	return $response;
		}
	}

	$row = new stdClass();
	$logear = new Logear();
	$rows = $logear->buscarUsuario((object)$_POST['Dat']);

	echo json_encode($rows);
?>