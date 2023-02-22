<?php
	class classPerfil extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";
		private $pass;

		function __construct()
		{}

		public function infoUsuario()
		{
			$responce = new stdClass();

			$id_persona_PK = $_SESSION['id_persona_PK'];

			$sql = <<<EOT
			SELECT
				id_persona_negocio_PK AS id_persona_PK, nombre, apellidos, telefono, correo, id_usuario_negocio_PK AS id_usuario_PK, usuario, tipo_negocio, curp, nombre_negocio, sexo, ruta_img
			FROM
				personalnegocio, usuariosnegocio, negocios_tipo
			WHERE
				id_persona_negocio_PK = id_persona_negocio_FK
			AND id_usuario_negocio_PK = id_usuario_FK
			AND id_persona_negocio_PK = $id_persona_PK
EOT;
			$query = parent::querySelect($sql);

			if($query === "error") {
	    		$this->val++;
				$this->mensaje = "EL NOMBRE DE USUARIO YA EXISTE, FAVOR DE ELEGIR OTRO";
				$this->errorClass = "";
			} else {
				$row = $query->fetch_object();

				$responce->nombre = $row->nombre;
				$responce->apellidos = $row->apellidos;
				$responce->telefono = $row->telefono;
				$responce->id_persona_PK = $row->id_persona_PK;
				$responce->correo = $row->correo;
				$responce->id_usuario_PK = $row->id_usuario_PK;
				$responce->usuario = $row->usuario;
				$responce->tipo_negocio = $row->tipo_negocio;
				$responce->curp = $row->curp;
				$responce->nombre_negocio = $row->nombre_negocio;
				$responce->sexo = $row->sexo;
				$responce->ruta_img = $row->ruta_img;
				$responce->error = 0;
			}

			$responce->val = $this->val;
			$responce->mensaje = $this->mensaje;
			$responce->errorClass = $this->errorClass;

			return $responce;
		}

		public function actualizarUsuario($param) {
			$responce = new stdClass();

			$classValidacionesUsuario = new classValidacionesUsuario();
			$param->nuevo = "";
			/*param = solo necesita es nombre de usuario ($param->usuario)*/
			if(isset($param->usuario)) {
				$userExiste = $classValidacionesUsuario->validaExisteUsuario($param);
			} else {
				$userExiste = 0;
			}

			if($userExiste > 0) {
				$this->val++;
				$this->mensaje = "EL NOMBRE DE USUARIO YA EXISTE, FAVOR DE ELEGIR OTRO";
				$this->errorClass = "";
			} else {
				if(empty($param->curp)) {
					$param->curp = '';
				}

				parent::queryBegin();

				//Actualizar personalnegocio
				$upPN = <<<EOT
				UPDATE personalnegocio SET nombre = '$param->nombre', apellidos = '$param->apellidos', curp = '$param->curp', telefono = '$param->telefono', correo = '$param->email', sexo = '$param->sexo' WHERE id_persona_negocio_PK = $param->id_persona_PK
EOT;
				$RupPN = parent::queryUdate($upPN);

				if ($RupPN === "error") {
					$this->val++;
					$this->mensaje .= "AL ACTUALIZAR <br>";
					$this->errorClass .= "actualizarUsuario() - personalnegocio//";
				}

				//Usuarios
				$Epass = '';
				$this->pass = $_SESSION["passwordBD"];

				if(isset($param->passwd) && $param->passwd != '') {
					$Epass = ", passwd = AES_ENCRYPT('$param->passwd', '$this->pass')";
				}

				if(isset($param->usuario)) {
					$upUN = <<<EOT
					UPDATE usuariosnegocio SET usuario = '$param->usuario' $Epass WHERE id_usuario_negocio_PK = $param->id_usuario_PK
EOT;
					$RupUN = parent::queryUdate($upUN);

					if ($RupUN === "error") {
						$this->val++;
						$this->mensaje .= "AL ACTUALIZAR <br>";
						$this->errorClass .= "actualizarUsuario() - usuariosnegocio//";
					}

					//Nombre Comerial
					$upNT = <<<EOT
					UPDATE negocios_tipo SET nombre_negocio = '$param->nombre_negocio' WHERE id_usuario_FK = $param->id_usuario_PK
	EOT;
					$RupNT = parent::queryUdate($upNT);

					if ($RupNT === "error") {
						$this->val++;
						$this->mensaje .= "AL ACTUALIZAR <br>";
						$this->errorClass .= "actualizarUsuario() - negocios_tipo//";
					}
				}

				if($this->val == 0) {
					parent::queryCommit();
				} else {
					parent::queryRollback();
				}
			}

			$responce->val = $this->val;
			$responce->mensaje = $this->mensaje;
			$responce->errorClass = $this->errorClass;

			return $responce;
		}

		public function guardarUsuario($param)
		{
			$this->pass = $_SESSION["passwordBD"];

			$responce = new stdClass();

			$classCrearUsuario = new classCrearUsuario();
			$classValidacionesPersonas = new classValidacionesPersonas();

			if(empty($param->curp)) {
				$param->curp = '';
			}

			/*if(empty($param->id_tipo_negocio)) {
				$param->id_tipo_negocio = $_SESSION['id_tipo_negocio_PK'];
			}*/

			$param->nuevo = 'NUEVO';
			$param->id_usuarioN = 0;

			//ANTES DE INICIAR VERIFICAR SI CURP, TELEFONO Y CORREO NO EXISTEN REGISTRADOS
			$existeCURP = $classValidacionesPersonas->curpValidar($param);
			$existeTel = $classValidacionesPersonas->telValidar($param);
			$existeCorreo = $classValidacionesPersonas->correoValidar($param);;

			if ($existeCURP == 0 && $existeTel == 0 && $existeCorreo == 0) {

				parent::queryBegin();
				//Registrar la persona principal de la empresa//
				//Persona
				if($param->sexo != 1 && $param->sexo != 2) {
					$param->sexo = 0;
				}

				$insP = <<<EOT
				INSERT INTO personalnegocio(nombre, apellidos, sexo, curp, telefono, correo) VALUES('$param->nombre', '$param->apellidos', '$param->sexo', '$param->curp', '$param->telefono', '$param->email')
EOT;
				$param->id_personaN = parent::queryInsert($insP);

				if ($param->id_personaN === "error") {
					$this->val++;
					$this->mensaje .= "AL DAR DE ALTA <br>";
					$this->errorClass .= "guardarUsuario() - personalnegocio//";
				}

				if(empty($param->user)) {
					if(empty($param->id_persona)) {
						$param->id_persona = $param->id_personaN;
					}

					$param->user = $classCrearUsuario->CreaUsuario($param);
					$responce->USERP = $param->user;
					//Checar user
					$classValidacionesUsuario = new classValidacionesUsuario();

					//variable usuario
					$param->usuario = $param->user;
					$existeUser = $classValidacionesUsuario->validaExisteUsuario($param);

					while($existeUser == 1) {
						$param->user = $classCrearUsuario->CreaUsuarioDif($param);

						$param->usuario = $param->user;
						$existeUser = $classValidacionesUsuario->validaExisteUsuario($param);

						if($existeUser == 0) {
							break;
						}
					}
					$responce->USERM = $param->user;

					if(empty($param->pass)) {
						$param->pass = $param->user;
					}
				}

				//Usuario
				$insU = <<<EOT
				INSERT INTO usuariosnegocio(id_persona_negocio_FK, usuario, passwd) VALUES($param->id_personaN, '$param->user', AES_ENCRYPT('$param->pass', '$this->pass'))
EOT;
				$param->id_usuarioN = parent::queryInsert($insU);

				if ($param->id_usuarioN === "error") {
					$this->val++;
					$this->mensaje .= "AL DAR DE ALTA <br>";
					$this->errorClass .= "guardarUsuario() - usuariosnegocio//";
				}

				//Rol Administrador

				if(empty($param->rol) && $param->rol == '') {
					$param->rol = 1;
					$param->rolText = 'admin';
				}

				$insR = <<<EOT
				INSERT INTO rolesnegocio (id_usuario_negocio_FK, id_roles_FK, nombreRol) VALUES ($param->id_usuarioN, $param->rol, '$param->rolText')
EOT;
				$param->rolesnegocioN = parent::queryInsert($insR);

				if ($param->rolesnegocioN === "error") {
					$this->val++;
					$this->mensaje .= "AL DAR DE ALTA <br>";
					$this->errorClass .= "guardarUsuario() - rolesnegocio//";
				}

				//negocios_tipo
				$nomComer = $_SESSION['nombre_negocio'];
				$tipo_negocio = $_SESSION["tipo_negocio"];
				$insN = <<<EOT
				INSERT INTO negocios_tipo(id_usuario_FK, nombre_negocio, tipo_negocio) VALUES($param->id_usuarioN, 'nomComer', $tipo_negocio)
EOT;
				$tipoNegocio = parent::queryInsert($insN);

				if ($tipoNegocio === "error") {
					$this->val++;
					$this->mensaje .= "AL DAR DE ALTA <br>";
					$this->errorClass .= "guardarUsuario() - Tipo Negocio//";
				}

				if($this->val == 0) {
					parent::queryCommit();
				} else {
					parent::queryRollback();
				}
			} else {
				$this->mensaje .= "YA EXISTE ".'<a style="color: red;">';

				$mensaje = "";

				if($existeCURP > 0){
					$mensaje .= 'CURP';
				}

				if($existeTel > 0){
					$mensaje .= $mensaje == "" ? "TELEFONO" : ", TELEFONO";
				}

				if($existeCorreo > 0){
					$mensaje .= $mensaje == "" ? "CORREO<a>" : " Y CORREO<a>";
				}

				$this->mensaje .= $mensaje.'</a>'." REGISTRADOS";

				$this->val++;
			}

			$responce->val = $this->val;
			$responce->mensaje = $this->mensaje;
			$responce->errorClass = $this->errorClass;
			$responce->id_usuarioN = $param->id_usuarioN;

			return $responce;
		}
	}
?>