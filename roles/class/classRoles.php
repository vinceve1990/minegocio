<?php  
	class classRoles extends ConectarH
	{
		private $sqlConnect;
		private $val = 0;
		private $mensaje = '';
		private $errorClass = '';

		function __construct()
		{}

		public function existeRol($param, $sqlConnect = "")
		{
			$this->sqlConnect = parent::conexionInterna($sqlConnect);

			$sql = <<<EOT
			SELECT COUNT(nombre_rol) AS existe FROM catalogo_roles WHERE nombre_rol = '$param->nombreRol'
EOT;
			$query = $this->sqlConnect->query($sql);

			$row = $query->fetch_object()->existe;

	        return $row;
		}

		public function RegistrarRol($param, $sqlConnect = "")
		{
			$this->sqlConnect = parent::conexionInterna($sqlConnect);
			
			$response = new stdClass();

			$this->sqlConnect->query("BEGIN");

			$sql = <<<EOT
			INSERT INTO catalogo_roles (nombre_rol) VALUES ('$param->nombreRol') 
EOT;
			$query = $this->sqlConnect->query($sql);

			if ($this->sqlConnect->affected_rows < 0) {
				$this->val++;
				$this->mensaje .= "AL DAR DE ALTA <br>";
				$this->errorClass .= "RegistrarRol() - catalogo_roles";
			}

			if($this->val == 0) {
				$this->sqlConnect->query("COMMIT");
				$this->mensaje .= "ROL AGREGADO";
			} else {
				$this->sqlConnect->query("ROLLBACK");
			}

			$response->val = $this->val;
			$response->mensaje = $this->mensaje;
			$response->errorClass = $this->errorClass;

			return $response;
		}

		public function selectRoles($sqlConnect = "")
		{
			$this->sqlConnect = parent::conexionInterna($sqlConnect);

			$sql = <<<EOT
			SELECT id_roles_PK, nombre_rol FROM catalogo_roles
EOT;
			$query = $this->sqlConnect->query($sql);

			$opt = "<option value='0'>SELECCIONE UN ROL</option>";

			while ($row = $query->fetch_object()) {
				$opt .= "<option value='".$row->id_roles_PK."'>".$row->nombre_rol."</option>";
			}

	        return $opt;
		}
	}
?>