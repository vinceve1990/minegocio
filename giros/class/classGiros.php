<?php
	class classGiros extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";

		function __construct() {}

		private function selectGiros($param) {
			$sql = <<<EOT
			SELECT * FROM catalogo_giro
EOT;
			$query = parent::querySelect($sql);
			$opt = "<option value='0'>SELECCIONE UN GIRO</option>";
			
			while ($row = $query->fetch_object()) {
				$sel = "";
				
				if($param->id_giroEdicion == $row->id_catalogo_giro_PK) {
					$sel = "selected";
				}

				$opt .= "<option value='".$row->id_catalogo_giro_PK."' $sel>".$row->nombre_giro."</option>";
			}

	        return $opt;
		}

		public function buscarGiros($param) {
			$bus = $this->selectGiros($param);

			return $bus;
		}
	}
?>