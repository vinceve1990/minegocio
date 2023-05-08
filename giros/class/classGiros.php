<?php
	class classGiros extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";

		function __construct() {}

		private function selectGiros() {
			$sql = <<<EOT
			SELECT * FROM catalogo_giro
EOT;
			$query = parent::querySelect($sql);
			$opt = "<option value='0'>SELECCIONE UN GIRO</option>";
			while ($row = $query->fetch_object()) {
				$opt .= "<option value='".$row->id_catalogo_giro_PK."'>".$row->nombre_giro."</option>";
			}

	        return $opt;
		}

		public function buscarGiros() {
			$bus = $this->selectGiros();

			return $bus;
		}
	}
?>