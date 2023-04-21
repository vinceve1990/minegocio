<?php
	class classEstados extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";
		
		function __construct()
		{}

		private function selectEstados()
		{
			$sql = <<<EOT
			SELECT id_catalogo_estado_PK, nombre_estado FROM catalogo_estados
EOT;
			$query = parent::querySelect($sql);

			$opt = "<option value='0'>SELECCIONE UN ESTADO</option>";

			while ($row = $query->fetch_object()) {
				$opt .= "<option value='".$row->id_catalogo_estado_PK."'>".$row->nombre_estado."</option>";
			}

	        return $opt;
		}

		public function getselectEstados()
		{
			$sel = $this->selectEstados();

			return $sel;
		}
	}
?>