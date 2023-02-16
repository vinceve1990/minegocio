<?php
	class configBaseDatos extends ConectarH
	{
		//private $sqlConnect;
		//private $keyBD;
		//private $userBD;

		private $val = 0;
		private $mensaje = "";
		private $errorClass = "";
		function __construct()
		{}

		public function scriptBaseDatos($nombreBD){
			return $this->copyBaseDatos($nombreBD);
		}

		private function copyBaseDatos($nombreBD, $sqlConnect = ""){
			$responce = new stdClass();

			//$this->sqlConnect = parent::conexionInterna($sqlConnect, "SuperUser");

			parent::queryBegin("", "SuperUser");//$this->sqlConnect->query("BEGIN");

			$BD = <<<EOT
			CREATE DATABASE $nombreBD CHARACTER SET 'utf8' COLLATE 'utf8_general_ci'
EOT;

			$queryBD = parent::queryCreacion($BD, "", "SuperUser");//$this->sqlConnect->query($BD);

			if ($queryBD === "error") {
				$this->val++;
				$this->mensaje .= "AL CREAR LA BD ($nombreBD) <br>";
				$this->errorClass .= "copyBaseDatos() - BD";
			}

			$sql = <<<EOT
			SELECT TABLE_NAME FROM information_schema.`TABLES` WHERE TABLE_SCHEMA = 'minegocio_basedatos';
EOT;
			$query = parent::querySelect($sql, "", "SuperUser");//$this->sqlConnect->query($sql);

			//Crear la copia de tablas
    		while ($row = $query->fetch_object()) {
    			$copy = <<<EOT
    			CREATE TABLE $nombreBD.$row->TABLE_NAME LIKE minegocio_basedatos.$row->TABLE_NAME
EOT;
				$queryCp = parent::queryCreacion($copy, "", "SuperUser");//$this->sqlConnect->query($copy);

				if ($queryCp === "error") {
					$this->val++;
					$this->mensaje .= "AL CREAR LA TABLE ($row->TABLE_NAME) <br>";
					$this->errorClass .= "copyBaseDatos() - TABLE";
				}

				//Copiar Informacion
				$inf = <<<EOT
				INSERT INTO $nombreBD.$row->TABLE_NAME SELECT * FROM minegocio_basedatos.$row->TABLE_NAME
EOT;
				$queryInf = parent::queryInsert($inf, "", "SuperUser");//$this->sqlConnect->query($inf);

				if ($queryInf === "error") {
					$this->val++;
					$this->mensaje .= "AL PASAR LA INFORMACIÓN ($row->TABLE_NAME) <br>";
					$this->errorClass .= "copyBaseDatos() - INSERT - SELECT";
				}
			}

			//Keys FOREIGN
			$fk = <<<EOT
			SELECT * FROM information_schema.INNODB_SYS_FOREIGN WHERE ID LIKE "%minegocio_basedatos%";
EOT;
			$queryC = parent::querySelect($fk, "", "SuperUser");//$this->sqlConnect->query($fk);

			while ($rowC = $queryC->fetch_object()) {
				$nombre = explode('/', $rowC->ID);
				$tabla = explode('/', $rowC->FOR_NAME);
				$tablaRef = explode('/', $rowC->REF_NAME);

				$nombreFK = $nombre[1];
				$nombreTabla = $tabla[1];
				$nombreRef = $tablaRef[1];

				$FKCols = <<<EOT
				SELECT * FROM information_schema.INNODB_SYS_FOREIGN_COLS WHERE ID LIKE "%$rowC->ID%";
EOT;
				$queryCols = parent::querySelect($FKCols, "", "SuperUser");//$this->sqlConnect->query($FKCols);

				$rowCols = $queryCols->fetch_object();

				$alter = <<<EOT
				ALTER TABLE $nombreBD.$nombreTabla ADD CONSTRAINT $nombreFK FOREIGN KEY ($rowCols->FOR_COL_NAME) REFERENCES $nombreRef ($rowCols->REF_COL_NAME) ON DELETE NO ACTION ON UPDATE NO ACTION
EOT;
				$qAlter = parent::queryUdate($alter, "", "SuperUser");//$this->sqlConnect->query($alter);
				if ($qAlter === "error") {
					$this->val++;
					$this->mensaje .= "AL ALTERAR LA TABLA ($nombreTabla) <br>";
					$this->errorClass .= "copyBaseDatos() - ALTER";
				}
			}

			if($this->val == 0) {
				parent::queryCommit("", "SuperUser");//$this->sqlConnect->query("COMMIT");
			} else {
				parent::queryRollback("", "SuperUser");//$this->sqlConnect->query("ROLLBACK");
			}

			$responce->val = $this->val;
			$responce->mensaje = $this->mensaje;
			$responce->errorClass = $this->errorClass;

			return $responce;
		}

		public function nombreBD($param) {
			$existe = 0;

			$baseDatos = '';

			$anio = date('mdy');

			$DesdeLetra = "a";

			$HastaLetra = "z";

			do {
				$letraAleatoria = chr(rand(ord($DesdeLetra), ord($HastaLetra)));

				$baseDatos .= preg_replace('([^A-Za-z0-9])', '', str_replace(" ", "_", $param->nombreComercial));
				$baseDatos .= $anio;
				$baseDatos .= $letraAleatoria;

				$baseDatos = strtolower($baseDatos);

				$sql = <<<EOT
				SELECT COUNT(SCHEMA_NAME) AS existeBD FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$baseDatos'
EOT;
				$query = parent::querySelect($sql);

	        	$existe = $query->fetch_object()->existeBD;

			} while ($existe != 0);

			return strtolower($baseDatos);
		}
	}
?>