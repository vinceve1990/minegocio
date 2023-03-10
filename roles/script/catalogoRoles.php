<?php 
	require_once "../minegocio/configConexion/conexion.php";
	require_once "../minegocio/configConexion/config.php";
	require_once "../minegocio/roles/class/classRoles.php";

	require_once "../minegocio/validaciones/class/classValidacionesUsuario.php";
	require_once "../minegocio/validaciones/class/classValidacionesPersonas.php";
	require_once "../minegocio/modelos/inicioModel.php";

	/*Saneo de datos*/
	require_once "../minegocio/validaciones/class/validacionesDatosIngreso.php";
	/*Fin Saneo de datos*/

	foreach ($_POST as $key => $value) {
	 	$$key = $value;
	}
	
	$ConectarH = new ConectarH();
	$ConectarH->Autenticar();

	$classRoles = new classRoles();
	$response = new stdClass();

	switch ($accion) {
		case 'nuevoRol':
			$DatR = (object)$DatR;
			//validacion de roles
			$existeRol = $classRoles->existeRol($DatR);

			if($existeRol == 0) {
				$response = $classRoles->RegistrarRol($DatR);
			} else {
				$response->mensaje = "EXISTE UN ROL CON ESE NOMBRE";
			}

			break;
		case 'buscarRol':
			$response = $classRoles->selectRoles();
			break;
		case 'server':
			$fil = "";
			
			$response = $classRoles->verRoles($fil);
			break;
	}

	/*CREATE TABLE `catalogo_roles_permisos_interfaz` (
	`id_cat_rol_permiso_PK` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`id_roles_FK` BIGINT(20) NOT NULL,
	`id_catalogo_interfaz_FK` BIGINT(20) NOT NULL,
	`status` BIT(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
	PRIMARY KEY (`id_cat_rol_permiso_PK`) USING BTREE,
	INDEX `FK_roles` (`id_roles_FK`) USING BTREE,
	INDEX `FK_interfaz` (`id_catalogo_interfaz_FK`) USING BTREE,
	CONSTRAINT `FK_interfaz` FOREIGN KEY (`id_catalogo_interfaz_FK`) REFERENCES `cervantesvite022123o`.`catalogo_interfaz` (`id_catalogo_interfaz_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_roles` FOREIGN KEY (`id_roles_FK`) REFERENCES `cervantesvite022123o`.`catalogo_roles` (`id_roles_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COMMENT='Las interfaces que puede utilizar el rol'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
*/

	echo json_encode($response);
?>