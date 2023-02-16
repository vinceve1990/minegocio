<?php
	class classRegistroUsuarios extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";
		private $pass = PASSBD;

		public function RegistrarUsuario($param, $sqlConnect = "")
		{

			$response = new stdClass();

			$param->sexo = 0;
			$param->rol = 1;
			$param->rolText = 'admin';

			$classCrearUsuario = new classCrearUsuario();

			parent::queryBegin();
			//Registrar la persona principal de la empresa//
			//Persona
			$insP = <<<EOT
			INSERT INTO personas(nombre, apellidos, telefono, correo) VALUES('$param->nombre', '$param->apellidos', '$param->telefono', '$param->email')
EOT;
			$idP = parent::queryInsert($insP);

			if ($idP === "error") {
				$this->val++;
				$this->mensaje .= "AL DAR DE ALTA <br>";
				$this->errorClass .= "RegistrarUsuario() - Personas";
			}

			$param->id_persona = $idP;

			$param->user = $classCrearUsuario->CreaUsuario($param);

			//Usuario
			$insU = <<<EOT
			INSERT INTO usuarios(id_persona_FK, usuario, passwd) VALUES($param->id_persona, '$param->user', AES_ENCRYPT('$param->pass', '$this->pass'))
EOT;
			$idU = parent::queryInsert($insU);

			if ($idU === "error") {
				$this->val++;
				$this->mensaje .= "AL DAR DE ALTA <br>";
				$this->errorClass .= "RegistrarUsuario() - Usuario";
			}

			$param->id_usuario = $idU;

			//Negocio
			$passBD = "**".$param->nombreBD."##";

			$insN = <<<EOT
			INSERT INTO negocios_tipo (id_usuario_FK, nombre_negocio, tipo_negocio, nombrebd, clave_registro_letra, clave_registro_numeroS1, clave_registro_numeroS2, clave_registro_numeroS3, passwordBD) VALUES($param->id_usuario, '$param->nombreComercial', $param->giroComercial, '$param->nombreBD', '$param->letra', '$param->numS1', '$param->numS2', '$param->numS3', AES_ENCRYPT('$passBD', '$this->pass'))
EOT;
			$idN = parent::queryInsert($insN);

			if ($idN === "error") {
				$this->val++;
				$this->mensaje .= "AL DAR DE ALTA <br>";
				$this->errorClass .= "RegistrarUsuario() - Negocio";
			}

			$param->passBD = $passBD;

			$param->id_tipo_negocio = $idN;

			if($this->val == 0) {
				parent::queryCommit();
			} else {
				parent::queryRollback();
			}

			$response->val = $this->val;
			$response->mensaje = $this->mensaje;
			$response->errorClass = $this->errorClass;
			$response->parametros = $param;

			return $response;
		}

		public function VerificarUsuario($param, $sqlConnect = "")
		{
			$user = '';
			if(isset($param->usuario)) {
				$user = "OR b.usuario = '$param->usuario'";
			}

			$sql = <<<EOT
				SELECT
					COUNT( id_persona_PK ) AS existe
				FROM
					personas a
					INNER JOIN usuarios b ON a.id_persona_PK = b.id_persona_FK
				WHERE (a.telefono = '$param->telefono' OR a.correo = '$param->email' $user)
				AND b.status_usuario = 1

EOT;

	        $query = parent::querySelect($sql);

	        $row = $query->fetch_object()->existe;

	        return $row;
		}

		public function crearClaveRegistro() {
			$existe = 0;
			$clave = array();

			do {
				$DesdeLetra = "A";

				$HastaLetra = "Z";

				$letra = strtoupper(chr(rand(ord($DesdeLetra), ord($HastaLetra))));
				$numS1 = str_pad(mt_rand(0, 999), 3, "0", STR_PAD_LEFT);
				$numS2 = str_pad(mt_rand(0, 999), 3, "0", STR_PAD_LEFT);
				$numS3 = str_pad(mt_rand(0, 99), 2, "0", STR_PAD_LEFT);

				$clave = [$letra, $numS1, $numS2, $numS3];

				$sql = <<<EOT
				SELECT
					COUNT( id_tipo_negocio_PK ) AS existe
				FROM
					negocios_tipo
				WHERE clave_registro_letra = '$letra'
				AND clave_registro_numeroS1 = '$numS1'
				AND clave_registro_numeroS2 = '$numS2'
				AND clave_registro_numeroS3 = '$numS3'
EOT;
				$query = parent::querySelect($sql);

	        	$existe = $query->fetch_object()->existe;

			} while ($existe != 0);

			return $clave;
		}
	}
?>