<?php
	class classPersonal extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";

		function __construct()
		{}

		public function informacionPersonal($fil)
		{
			/*Paginación*/
			$paramPag = new stdClass();
			$inicioModel = new inicioModel();

			$paramPag->page = $_POST['page'];
			$paramPag->limit = $_POST['rows'];
			$paramPag->sidx = $_POST['sidx'];
			$paramPag->sord = $_POST['sord'];
			$paramPag->count = 0;

			$sqlcount = <<<EOT
			SELECT COUNT(id_persona_negocio_PK) AS total FROM personalnegocio
EOT;
			$querycount = parent::querySelect($sqlcount);

			$paramPag->count = $querycount->fetch_object()->total;

			$datPag = $inicioModel->paginacion($paramPag);

			$responce = new stdClass();

			$sql = <<<EOT
			SELECT
				id_persona_negocio_PK,
				nombre,
				apellidos,
				telefono,
				correo,
				usuario,
				tipo_negocio,
				curp,
				nombre_negocio,
			IF
				(
					sexo = 1,
					'Masculino',
				IF
				( sexo = 1, 'Femenino', 'Indefinido' )) AS sexo,
				nombreRol AS rol,
				id_usuario_negocio_PK,
			IF
				( status_per = 0, 'BAJA', 'ALTA' ) AS statusPer
			FROM
				personalnegocio,
				usuariosnegocio,
				negocios_tipo,
				rolesnegocio
			WHERE
				personalnegocio.id_persona_negocio_PK = usuariosnegocio.id_persona_negocio_FK
				AND usuariosnegocio.id_usuario_negocio_PK = negocios_tipo.id_usuario_FK
				AND usuariosnegocio.id_usuario_negocio_PK = rolesnegocio.id_usuario_negocio_FK
			LIMIT $datPag->start , $datPag->limit
			$fil
EOT;
        	$query = parent::querySelect($sql);

        	$responce->page = $datPag->page;
			$responce->total = $datPag->total_pages;
			$responce->records = $datPag->count;
        	$i = 0;

			while ($row = $query->fetch_object()) {
				$btn = '';

				$btn .= parent::button('Editar', 'editarPersonal', array('id_persona_negocio_PK' => 'integer:'.$row->id_persona_negocio_PK, 'id_usuario_negocio_PK' => 'integer:'.$row->id_usuario_negocio_PK), 'fa-solid fa-user-pen', 'color: #735517 !important; font-size: 14px !important; font-weight:bold !important;', 'btnImpPDFLis', '', '');

				if($row->statusPer == 'ALTA') {
					$btn .= parent::button('Dar Baja', 'eliminarPersonal', array('id_persona_negocio_PK' => 'integer:'.$row->id_persona_negocio_PK, 'id_usuario_negocio_PK' => 'integer:'.$row->id_usuario_negocio_PK), 'fa-solid fa-user-xmark', 'color: #FF0000 !important; font-size: 14px !important; font-weight:bold !important;', 'btnImpPDFLis', '', '');
				} else {
					$btn .= parent::button('Dar Alta', 'activarPersonal', array('id_persona_negocio_PK' => 'integer:'.$row->id_persona_negocio_PK, 'id_usuario_negocio_PK' => 'integer:'.$row->id_usuario_negocio_PK), 'fa-solid fa-user-check', 'color: #35a405 !important; font-size: 14px !important; font-weight:bold !important;', 'btnImpPDFLis', '', '');
				}

				$responce->rows[$i]['id'] = $row->id_persona_negocio_PK;
			    $responce->rows[$i]['cell'] = array($row->id_persona_negocio_PK, $row->usuario, $row->nombre, $row->apellidos, $row->telefono, $row->correo, $row->curp, $row->sexo, $row->rol, $row->statusPer, $btn);
			    $i++;
			}

			return $responce;
		}

		public function bajaPersonal($param, $sqlConnect = "")
		{
			$responce = new stdClass();

			parent::queryBegin();

			$upU = <<<EOT
			UPDATE usuariosnegocio SET status_usuario = 0 WHERE id_usuario_negocio_PK = $param->id_usuario_negocio_PK
EOT;
			$resUS = parent::queryUdate($upU);

			if ($resUS === "error") {
				$this->val++;
				$this->mensaje .= "AL DAR DE BAJA <br>";
				$this->errorClass .= "bajaPersonal() - usuariosnegocio//";
			}

			$upP = <<<EOT
			UPDATE personalnegocio SET status_per = 0 WHERE id_persona_negocio_PK = $param->id_persona_negocio_PK
EOT;
			$resPN = parent::queryUdate($upP);

			if ($resPN === "error") {
				$this->val++;
				$this->mensaje .= "AL DAR DE BAJA <br>";
				$this->errorClass .= "bajaPersonal() - personalnegocio//";
			}

			if($this->val == 0) {
				parent::queryCommit();
			} else {
				parent::queryRollback();
			}

			$responce->val = $this->val;
			$responce->mensaje = $this->mensaje;
			$responce->errorClass = $this->errorClass;

			return $responce;
		}

		public function activarPersonal($param, $sqlConnect = "")
		{
			$responce = new stdClass();

			$this->sqlConnect = parent::conexionInterna($sqlConnect);

			$this->sqlConnect->query("BEGIN");

			$upU = <<<EOT
			UPDATE usuariosnegocio SET status_usuario = 1 WHERE id_usuario_negocio_PK = $param->id_usuario_negocio_PK
EOT;
			$this->sqlConnect->query($upU);

			if ($this->sqlConnect->affected_rows < 1) {
				$this->val++;
				$this->mensaje .= "AL ACTIVAR USUARIO <br>";
				$this->errorClass .= "activarPersonal() - usuariosnegocio//";
			}

			$upP = <<<EOT
			UPDATE personalnegocio SET status_per = 1 WHERE id_persona_negocio_PK = $param->id_persona_negocio_PK
EOT;
			$this->sqlConnect->query($upP);

			if ($this->sqlConnect->affected_rows < 1) {
				$this->val++;
				$this->mensaje .= "AL ACTIVAR PERSONA <br>";
				$this->errorClass .= "activarPersonal() - personalnegocio//";
			}

			if($this->val == 0) {
				$this->sqlConnect->query("COMMIT");
			} else {
				$this->sqlConnect->query("ROLLBACK");
			}

			$responce->val = $this->val;
			$responce->mensaje = $this->mensaje;
			$responce->errorClass = $this->errorClass;

			return $responce;
		}

		public function informacionPersona($param, $sqlConnect = "")
		{
			$responce = new stdClass();

			$this->sqlConnect = parent::conexionInterna($sqlConnect);

			$sql = <<<EOT
			SELECT
				a.nombre,
				a.apellidos,
				a.curp,
				a.sexo,
				a.telefono,
				a.correo,
				c.nombreRol
			FROM
				personalnegocio a, usuariosnegocio b, rolesnegocio c
			WHERE
				a.id_persona_negocio_PK = $param->id_persona_negocio_PK
			AND a.id_persona_negocio_PK = b.id_persona_negocio_FK
			AND b.id_usuario_negocio_PK = c.id_usuario_negocio_FK
EOT;
			$this->sqlConnect = parent::conexionInterna($sqlConnect);
        	$query = $this->sqlConnect->query($sql);

        	$row = $query->fetch_object();

        	if($row->nombre != "") {
        		$responce = $row;
        	} else {
        		$this->val++;
				$this->mensaje .= "NO EXISTE EL REGISTRO DE LA PERSONA REGISTRADA <br>";
				$this->errorClass .= "informacionPersona() - personalnegocio//";
        	}
			return $responce;
		}
	}
?>