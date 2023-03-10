<?php  
	class classModulos extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";
		private bool $permisos = false;
		function __construct()
		{}

		private function informacionModulos($param) {
			$response = new stdClass();

			$sql = <<<EOT
			SELECT *
			FROM 
				catalogo_categoria_grupos a, 
			catalogo_modulos b, 
			catalogo_categorias c, 
			catalogo_interfaz d
			WHERE 	
				a.id_catalogo_modulo_FK = b.id_catalogo_modulo_PK 
			AND a.id_catalogo_categoria_FK = c.id_catalogo_categoria_PK 
			AND a.id_catalogo_interfaz_FK = d.id_catalogo_interfaz_PK
			AND a.id_catalogo_categoria_FK = $param->id_categoria_PK
EOT;
			$query = parent::querySelect($sql);

			if($query === "error") {
				$this->val++;
				$this->mensaje .= "AL BUSCAR MODULOS <br>";
				$this->errorClass .= "informacionModulos() - classModulos//";
			} else {
				$i = 0;
				while ($row = $query->fetch_object()) {
					if($this->permisos == true) {
						$fil = '<input type="checkbox" id="inter'.$row->id_catalogo_interfaz_PK.'" name="'.$row->nombre_interfaz.'" value="'.$row->id_catalogo_interfaz_PK.'">';
					}

					$response->modulo[$i] = array("id_interfaz" => $row->id_catalogo_interfaz_PK, "nombre" => $row->nombre_interfaz, "descripcion" => $row->descripcion_interfaz, "icono" => $row->icono, "color" => $row->color, "checkbox" => $fil);
					$i++;
				}
			}

			$response->val = $this->val;
			$response->mensaje = $this->mensaje;
			$response->errorClass = $this->errorClass;

			return $response;
		}

		public function infoCategorias() {
			$response = new stdClass();

			$sql = <<<EOT
			SELECT 
				*
			FROM 
				catalogo_categorias
EOT;
			$query = parent::querySelect($sql);

			if($query === "error") {
				$this->val++;
				$this->mensaje .= "AL BUSCAR CATEGORIAS <br>";
				$this->errorClass .= "infoCategorias() - classModulos//";
			} else {
				$i = 0;
				while ($row = $query->fetch_object()) {
					$response->categorias[$i] = array("id_catalogo_categoria_PK" => $row->id_catalogo_categoria_PK, "nombre" => $row->nombre_categoria, "icono" => $row->iconoMaster, "color" => $row->color);
					$i++;
				}
			}

			$response->val = $this->val;
			$response->mensaje = $this->mensaje;
			$response->errorClass = $this->errorClass;
			$response->count = $i;

			return $response;
		}

		public function permisosModulos($param) {
			$this->permisos = true;
			$res = $this->informacionModulos($param);

			return $res;
		}

		public function verCategorias() {
			$res = $this->infoCategorias();

			return $res;
		}
	}
?>