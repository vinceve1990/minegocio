<?php
	class classMunicipios extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";

		function __construct()
		{}

		private function selectMunicipios($param)
		{
			$filCp = "";

			if ($param->cp > 0) {
				$filCp = " OR cp = $param->cp";
			}

			$sql = <<<EOT
			SELECT id_catalogo_municipios_PK, nombre_municipio FROM catalogo_municipios WHERE id_catalogo_estado_FK = $param->id_estado $filCp
EOT;
			$query = parent::querySelect($sql);

			$opt = "<option value='0'>SELECCIONE UN MUNICIPIO</option>";

			while ($row = $query->fetch_object()) {
				$opt .= "<option value='".$row->id_catalogo_municipios_PK."'>".$row->nombre_municipio."</option>";
			}

	        return $opt;
		}

		private function buscaEstado($param)
		{
			$sql = <<<EOT
			SELECT DISTINCT(id_catalogo_estado_FK) AS id_catalogo_estado FROM catalogo_municipios WHERE cp = $param->cp
EOT;
			$query = parent::querySelect($sql);

			$row = $query->fetch_object();

			$id_catalogo_estado = 0;

			if(isset($row->id_catalogo_estado)) {
				$id_catalogo_estado = $row->id_catalogo_estado;
			}

	        return $id_catalogo_estado;
		}

		public function getselectMunicipios($param)
		{
			$sel = $this->selectMunicipios($param);

			return $sel;
		}

		public function getbuscaEstado($param)
		{
			$sel = $this->buscaEstado($param);

			return $sel;
		}
	}
?>