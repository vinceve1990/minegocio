<?php
	class classBancos extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";

		function __construct()
		{}

		private function selectBancos()
		{

			$sql = <<<EOT
			SELECT id_catalogo_banco_PK, nombre_banco FROM catalogo_bancos
EOT;
			$query = parent::querySelect($sql);

			$opt = "<option value='0'>SELECCIONE UN BANCO</option>";

			while ($row = $query->fetch_object()) {
				$opt .= "<option value='".$row->id_catalogo_banco_PK."'>".$row->nombre_banco."</option>";
			}

	        return $opt;
		}

		public function getselectBancos()
		{
			$sel = $this->selectBancos();

			return $sel;
		}
	}
?>