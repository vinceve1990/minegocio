<?php
	class classEstados extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";

		function __construct()
		{}

		private function selectEstados($param)
		{
			$fil = "";
			$opt = "<option value='0'>SELECCIONE UN ESTADO</option>";

			if($param->cp > 0) {
				$classMunicipios = new classMunicipios();
				$id_estado = $classMunicipios->getbuscaEstado($param);

				if($id_estado > 0) {
					$fil = " AND id_catalogo_estado_PK = ".$id_estado;
					$opt = "";
				}
			}

			$sql = <<<EOT
			SELECT id_catalogo_estado_PK, nombre_estado FROM catalogo_estados WHERE 1 $fil
EOT;
			$query = parent::querySelect($sql);

			while ($row = $query->fetch_object()) {
				$opt .= "<option value='".$row->id_catalogo_estado_PK."'>".$row->nombre_estado."</option>";
			}

	        return $opt;
		}

		public function getselectEstados($param)
		{
			$sel = $this->selectEstados($param);

			return $sel;
		}
	}
?>