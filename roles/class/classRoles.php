<?php  
	class classRoles extends ConectarH
	{
		private $val = 0;
		private $mensaje = '';
		private $errorClass = '';

		function __construct()
		{}

		public function existeRol($param)
		{
			$param = parent::escapeQuery($param);

			$sql = <<<EOT
			SELECT COUNT(nombre_rol) AS existe FROM catalogo_roles WHERE nombre_rol = '$param->nombreRol'
EOT;
			$query = parent::querySelect($sql);//$this->sqlConnect->query($sql);

			$row = $query->fetch_object()->existe;

	        return $row;
		}

		public function RegistrarRol($param)
		{
			
			$response = new stdClass();

			parent::queryBegin();

			$param = parent::escapeQuery($param);

			$sql = <<<EOT
			INSERT INTO catalogo_roles (nombre_rol) VALUES ('$param->nombreRol') 
EOT;
			$query = parent::queryInsert($sql);

			if ($query === "error") {
				$this->val++;
				$this->mensaje .= "AL DAR DE ALTA <br>";
				$this->errorClass .= "RegistrarRol() - catalogo_roles";
			}

			if($this->val == 0) {
				parent::queryCommit();
				$this->mensaje .= "ROL AGREGADO";
			} else {
				parent::queryRollback();
			}

			$response->val = $this->val;
			$response->mensaje = $this->mensaje;
			$response->errorClass = $this->errorClass;

			return $response;
		}

		public function updateRol($param) {
			$response = new stdClass();

			parent::queryBegin();

			$param = parent::escapeQuery($param);

			$upR = <<<EOT
			UPDATE catalogo_roles SET status = $param->status WHERE id_roles_PK = $param->id_roles_PK
EOT;
			$query = parent::queryUdate($upR);

			if ($query === "error") {
				$this->val++;
				$this->mensaje .= "AL ACTUALIZAR EL ROL <br>";
				$this->errorClass .= "updateRol() - catalogo_roles";
			}

			if($this->val == 0) {
				parent::queryCommit();
				$this->mensaje .= "ROL ACTUALIZADO";
			} else {
				parent::queryRollback();
			}

			$response->val = $this->val;
			$response->mensaje = $this->mensaje;
			$response->errorClass = $this->errorClass;

			return $response;
		}

		public function updateNomRol($param) {
			$response = new stdClass();

			parent::queryBegin();

			$param = parent::escapeQuery($param);

			$upR = <<<EOT
			UPDATE catalogo_roles SET nombre_rol = '$param->nombreRol' WHERE id_roles_PK = $param->id_roles_PK
EOT;
			$query = parent::queryUdate($upR);

			if ($query === "error") {
				$this->val++;
				$this->mensaje .= "AL ACTUALIZAR EL ROL <br>";
				$this->errorClass .= "updateNomRol() - catalogo_roles";
			}

			if($this->val == 0) {
				parent::queryCommit();
				$this->mensaje .= "ROL ACTUALIZADO";
			} else {
				parent::queryRollback();
			}

			$response->val = $this->val;
			$response->mensaje = $this->mensaje;
			$response->errorClass = $this->errorClass;

			return $response;
		}

		public function selectRoles()
		{

			$sql = <<<EOT
			SELECT id_roles_PK, nombre_rol FROM catalogo_roles
EOT;
			$query = parent::querySelect($sql);

			$opt = "<option value='0'>SELECCIONE UN ROL</option>";

			while ($row = $query->fetch_object()) {
				$opt .= "<option value='".$row->id_roles_PK."'>".$row->nombre_rol."</option>";
			}

	        return $opt;
		}

		public function verRoles($fil)
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
			SELECT COUNT(id_roles_PK) AS total FROM catalogo_roles
EOT;
			$querycount = parent::querySelect($sqlcount);

			$paramPag->count = $querycount->fetch_object()->total;

			$datPag = $inicioModel->paginacion($paramPag);

			$responce = new stdClass();

			$sql = <<<EOT
			SELECT
				id_roles_PK, nombre_rol, IF(STATUS = 1, 'Activo', 'Desactivado') AS estatus
			FROM
				catalogo_roles
			WHERE 1 $fil
			LIMIT $datPag->start , $datPag->limit
EOT;
        	$query = parent::querySelect($sql);

        	$responce->page = $datPag->page;
			$responce->total = $datPag->total_pages;
			$responce->records = $datPag->count;
        	$i = 0;

			while ($row = $query->fetch_object()) {
				$btn = "";

				$btn .= parent::button('Editar', 'editarRol', array('id_roles_PK' => $row->id_roles_PK), 'fa-solid fa-pencil', 'color: #735517 !important; font-size: 14px !important; font-weight:bold !important;', 'btnImpPDFLis', '', '');

				if($row->estatus == 'Activo') {
					$btn .= parent::button('Dar Baja', 'eliminarRol', array('id_roles_PK' => 'integer:'.$row->id_roles_PK), 'fa-solid fa-trash-can', 'color: #FF0000 !important; font-size: 14px !important; font-weight:bold !important;', 'btnImpPDFLis', '', '');
				} else {
					$btn .= parent::button('Dar Alta', 'activarRol', array('id_roles_PK' => 'integer:'.$row->id_roles_PK), 'fa-solid fa-circle-check', 'color: #35a405 !important; font-size: 14px !important; font-weight:bold !important;', 'btnImpPDFLis', '', '');
				}

				$responce->rows[$i]['id'] = $row->id_roles_PK;
			    $responce->rows[$i]['cell'] = array($row->id_roles_PK, $row->nombre_rol, $row->estatus, $btn);
			    $i++;
			}

			return $responce;
		}
	}
?>