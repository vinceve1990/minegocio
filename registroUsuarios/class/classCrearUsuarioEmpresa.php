<?php
	class classCrearUsuarioEmpresa extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";
		private $pass;

		function RegistrarUsuarioEmpresa($param, $sqlConnect = "") {
			$this->BD = $param->nombreBD;
			$this->pass = $param->passBD;

			$responce = new stdClass();

			$classCrearUsuario = new classCrearUsuario();
			$classValidacionesPersonas = new classValidacionesPersonas();

			if(empty($param->curp)) {
				$param->curp = '';
			}

			$param->nuevo = 'NUEVO';
			$param->id_usuarioN = 0;

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

			//$param->id_personaN = $this->sqlConnect->insert_id;

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
			$rol = parent::queryInsert($insR);

			if ($rol === "error") {
				$this->val++;
				$this->mensaje .= "AL DAR DE ALTA <br>";
				$this->errorClass .= "guardarUsuario() - rolesnegocio//";
			}

			//negocios_tipo

			$insN = <<<EOT
			INSERT INTO negocios_tipo(id_usuario_FK, nombre_negocio, tipo_negocio) VALUES($param->id_usuarioN, '$param->nombreComercial', $param->giroComercial)
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

			$responce->val = $this->val;
			$responce->mensaje = $this->mensaje;
			$responce->errorClass = $this->errorClass;
			$responce->id_usuarioN = $param->id_usuarioN;

			return $responce;
		}
	}
?>