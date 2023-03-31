<?php  
	class classModulos extends ConectarH
	{
		private int $val = 0;
		private String $mensaje = "";
		private String $errorClass = "";
		private bool $permisos = false;

		function __construct() {}

		private function informacionModulos($param, $ids_fil = "") {
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
			$ids_fil
EOT;
			$query = parent::querySelect($sql);

			if($query === "error") {
				$this->val++;
				$this->mensaje .= "AL BUSCAR MODULOS <br>";
				$this->errorClass .= "informacionModulos() - classModulos//";
			} else {
				$i = 0;
				while ($row = $query->fetch_object()) {
					$fil = "";
					if($this->permisos == true) {
						/*Checar cual ya tiene permisos*/
						$dat = $this->verActivosInterfaces($row->id_catalogo_interfaz_PK, $param->id_rol_PK);
						$check = "";
						if($dat->status == 1) {
							$check = "checked";
						}

						$fil = '<input type="checkbox" id="inter'.$row->id_catalogo_interfaz_PK.'" name="'.$row->nombre_interfaz.'" value="'.$row->id_catalogo_interfaz_PK.'" '.$check.'>';
					}

					$response->modulo[$i] = array("id_interfaz" => $row->id_catalogo_interfaz_PK, "nombre" => $row->nombre_interfaz, "descripcion" => $row->descripcion_interfaz, "icono" => $row->icono, "color" => $row->color, "urlInterfaz" => $row->url_interfaz, "checkbox" => $fil);
					$i++;
				}
			}

			$response->val = $this->val;
			$response->mensaje = $this->mensaje;
			$response->errorClass = $this->errorClass;

			return $response;
		}

		private function infoCategoriasPermisos($id_roles) {
			$response = new stdClass();

			$sql = <<<EOT
			SELECT 
				*
			FROM 
				categoriasactivos
			WHERE id_roles_FK = $id_roles
EOT;
			$query = parent::querySelect($sql);

			if($query === "error") {
				$this->val++;
				$this->mensaje .= "AL BUSCAR CATEGORIAS PERMITIDAS <br>";
				$this->errorClass .= "infoCategorias() - classModulos//";
			} else {
				$i = 0;
				while ($row = $query->fetch_object()) {
					$response->categorias[$i] = $row->id_catalogo_categoria_FK;
					$i++;
				}
			}

			$response->val = $this->val;
			$response->mensaje = $this->mensaje;
			$response->errorClass = $this->errorClass;
			$response->count = $i;

			return $response;
		}

		private function infoModulosPermisos($id_roles, $id_catalogo_categoria_FK) {
			$response = new stdClass();

			$sql = <<<EOT
			SELECT 
				*
			FROM 
				interfacesactivos
			WHERE 
				id_roles_FK = $id_roles
			AND id_catalogo_categoria_FK = $id_catalogo_categoria_FK
EOT;
			$query = parent::querySelect($sql);

			if($query === "error") {
				$this->val++;
				$this->mensaje .= "AL BUSCAR MODULOS PERMITIDAS <br>";
				$this->errorClass .= "infoCategorias() - classModulos//";
			} else {
				$i = 0;
				while ($row = $query->fetch_object()) {
					$response->modulos[$i] = $row->id_catalogo_interfaz_PK;
					$i++;
				}
			}

			$response->val = $this->val;
			$response->mensaje = $this->mensaje;
			$response->errorClass = $this->errorClass;
			$response->count = $i;

			return $response;
		}

		private function infoCategorias($fil = "") {
			$response = new stdClass();

			$sql = <<<EOT
			SELECT 
				*
			FROM 
				catalogo_categorias
			WHERE 1 $fil
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

		private function insertPermisos($param)
		{
			$response = new stdClass();

			//Saneo de datos para Mysql
			$param = parent::escapeQuery($param);

			parent::queryBegin();

			/*Checar si existe el registro*/
			$dat = $this->verActivosInterfaces($param->id_interfaz_PK, $param->id_rol);

			if($dat->id_cat_rol_permiso_PK > 0) {
				$updPI = <<<EOT
				UPDATE catalogo_roles_permisos_interfaz SET status = $param->status WHERE id_cat_rol_permiso_PK = $dat->id_cat_rol_permiso_PK
EOT;
				$query = parent::queryUdate($updPI);

				if($query === "error") {
					$this->val++;
					$this->mensaje .= "AL ACTUALIZAR EL PERMISO <br>";
					$this->errorClass .= "insertPermisos() - classModulos//";
				}
			} else {
				$insPI = <<<EOT
				INSERT INTO catalogo_roles_permisos_interfaz(id_roles_FK, id_catalogo_interfaz_FK) VALUES($param->id_rol, $param->id_interfaz_PK)
EOT;
				$query = parent::queryInsert($insPI);

				if($query === "error") {
					$this->val++;
					$this->mensaje .= "AL INSERTAR EL PERMISO <br>";
					$this->errorClass .= "insertPermisos() - classModulos//";
				}
			}

			if($this->val == 0) {
				parent::queryCommit();
			} else {
				parent::queryRollback();
			}

			$response->val = $this->val;
			$response->mensaje = $this->mensaje;
			$response->errorClass = $this->errorClass;			

			return $response;
		}

		private function verActivosInterfaces($id_catalogo_interfaz_PK, $id_rol_PK)
		{
			$datos = new stdClass();

			$sql = <<<EOT
			SELECT id_cat_rol_permiso_PK, status FROM catalogo_roles_permisos_interfaz WHERE id_roles_FK = $id_rol_PK AND id_catalogo_interfaz_FK = $id_catalogo_interfaz_PK
EOT;
			$res = parent::querySelect($sql);

			if($res === "error") {
				$this->val++;
				$this->mensaje .= "AL BUSCAR PERMISO <br>";
				$this->errorClass .= "insertPermisos() - classModulos//";
			}else {
				$datos->id_cat_rol_permiso_PK = 0;
				$datos->status = 0;
				$row = $res->fetch_object();

				if(isset($row->id_cat_rol_permiso_PK)) {
					$datos->id_cat_rol_permiso_PK = $row->id_cat_rol_permiso_PK;
					$datos->status = $row->status;
				}
			}

			return $datos;
		}

		public function verModulos($param) {
			$this->permisos = true;
			$res = $this->informacionModulos($param);

			return $res;
		}

		public function verModulosPermisos($param) {
			$this->permisos = false;

			$ids_fil = "";

			$permiso = $this->infoModulosPermisos($_SESSION['id_roles'], $param->id_categoria_PK);

			$ids = implode(",", $permiso->modulos);

			$ids_fil = " AND id_catalogo_interfaz_PK IN ($ids)";

			$res = $this->informacionModulos($param, $ids_fil);

			return $res;
		}

		public function verCategorias() {
			$res = $this->infoCategorias();

			return $res;
		}

		public function verCategoriasPermisos()
		{
			$ids_fil = "";

			$ids = 0;

			$permiso = $this->infoCategoriasPermisos($_SESSION['id_roles']);
			if(isset($permiso->categorias)) {
				$ids = implode(",", $permiso->categorias);
			}

			$ids_fil = " AND id_catalogo_categoria_PK IN ($ids)";

			$res = $this->infoCategorias($ids_fil);

			return $res;
		}

		public function guardarPermisos($param)
		{
			$res = $this->insertPermisos($param);

			return $res;
		}
	}
?>