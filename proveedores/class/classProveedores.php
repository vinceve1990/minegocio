<?php
	class classProveedor extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";

		function __construct()
		{}

		public function informacionProveedores($fil)
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
			SELECT COUNT(a.id_catalogo_proveedor_PK) AS total FROM catalogo_proveedores a WHERE 1 $fil
EOT;
			$querycount = parent::querySelect($sqlcount);

			$paramPag->count = $querycount->fetch_object()->total;

			$datPag = $inicioModel->paginacion($paramPag);

			$responce = new stdClass();

			$sql = <<<EOT
			SELECT
				a.*, b.nombre_estado, c.nombre_municipio, d.nombre_giro, IF(a.status_proveedor = 1, 'ACTIVO', 'DESACTIVADO') AS tipoestado, b.id_catalogo_estado_PK, c.id_catalogo_municipios_PK, d.id_catalogo_giro_PK
			FROM
				catalogo_proveedores a, catalogo_estados b, catalogo_municipios c, catalogo_giro d
			WHERE
				a.id_catalogo_estado_FK = b.id_catalogo_estado_PK
			AND a.id_catalogo_municipios_FK = c.id_catalogo_municipios_PK
			AND a.id_catalogo_giro_FK = d.id_catalogo_giro_PK
			$fil
			ORDER BY a.id_catalogo_proveedor_PK ASC
			LIMIT $datPag->start , $datPag->limit
EOT;
        	$query = parent::querySelect($sql);

        	$i = 0;

			while ($row = $query->fetch_object()) {
				$telefono = "(".substr($row->telefono,0,3).")"." ".substr($row->telefono,5,3)."-".substr($row->telefono,6,4);

			    $responce->rows[$i] = array($row->id_catalogo_proveedor_PK, $row->nombre, $row->rfc, $telefono, $row->email_principal, $row->nombre_estado, $row->cp, $row->status_proveedor, $row->tipoestado, $row->nombre_municipio, $row->calle, $row->nombre_giro, $row->id_catalogo_estado_PK, $row->id_catalogo_municipios_PK, $row->id_catalogo_giro_PK, $row->telefono);
			    $i++;
			}

			$responce->page = $datPag->page;
			$responce->total = $datPag->total_pages;
			$responce->records = $datPag->count;
			$responce->registros = $i;

			return $responce;
		}

		public function activarProveedores($param)
		{
			$responce = new stdClass();

			parent::queryBegin();

			parent::escapeQuery($param);

			$upP = <<<EOT
			UPDATE catalogo_proveedores SET status_proveedor = 1 WHERE id_catalogo_proveedor_PK = $param->id_proveedor
EOT;
			$resUP = parent::queryUdate($upP);

			if ($resUP === "error") {
				$this->val++;
				$this->mensaje .= "AL ACTIVAR PROVEEDOR <br>";
				$this->errorClass .= "activarProveedores() - classProveedor//";
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

		public function bajaProveedores($param)
		{
			$responce = new stdClass();

			parent::queryBegin();

			parent::escapeQuery($param);

			$upP = <<<EOT
			UPDATE catalogo_proveedores SET status_proveedor = 0 WHERE id_catalogo_proveedor_PK = $param->id_proveedor
EOT;
			$resUP = parent::queryUdate($upP);

			if ($resUP === "error") {
				$this->val++;
				$this->mensaje .= "AL DAR DE BAJA PROVEEDOR <br>";
				$this->errorClass .= "bajaProveedores() - classProveedor//";
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

		public function altaProveedor($param) {
			$responce = new stdClass();

			parent::queryBegin();

			parent::escapeQuery($param);

			$sql = <<<EOT
			INSERT INTO catalogo_proveedores(nombre, rfc, email_principal, calle, id_catalogo_estado_FK, id_catalogo_municipios_FK, cp, telefono, id_catalogo_giro_FK) VALUES('$param->nombreProveedor', '$param->rfc', '$param->email', '$param->calle', $param->selectEstado, $param->selectMunicipio, $param->cp, $param->telefonoProveedor, $param->selectGiro)
EOT;
			$resIn = parent::queryInsert($sql);

			if ($resIn === "error") {
				$this->val++;
				$this->mensaje .= "AL DAR DE ALTA AL PROVEEDOR <br>";
				$this->errorClass .= "altaProveedor() - classProveedor//";
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
	}
?>