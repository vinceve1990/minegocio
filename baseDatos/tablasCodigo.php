<?php 	
/*Codigo para crear todas las tablas*/
CREATE TABLE `catalogo_bancos` (
	`id_catalogo_banco_PK` BIGINT(20) NOT NULL,
	`nombre_banco` VARCHAR(100) NOT NULL COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id_catalogo_banco_PK`) USING BTREE
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_categorias` (
	`id_catalogo_categoria_PK` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`nombre_categoria` VARCHAR(100) NOT NULL COLLATE 'utf8mb3_general_ci',
	`descripcion_cetegoria` VARCHAR(500) NOT NULL COLLATE 'utf8mb3_general_ci',
	`color` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`iconoMaster` VARCHAR(50) NOT NULL COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id_catalogo_categoria_PK`) USING BTREE
)
COMMENT='Categorías del sistema web'
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=1;

CREATE TABLE `catalogo_categoria_grupos` (
	`id_catalogo_categoria_grupo_PK` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`id_catalogo_categoria_FK` BIGINT(20) NOT NULL,
	`id_catalogo_modulo_FK` BIGINT(20) NOT NULL,
	`id_catalogo_interfaz_FK` BIGINT(20) NOT NULL,
	PRIMARY KEY (`id_catalogo_categoria_grupo_PK`) USING BTREE,
	INDEX `categoria` (`id_catalogo_categoria_FK`) USING BTREE,
	INDEX `modulo` (`id_catalogo_modulo_FK`) USING BTREE,
	INDEX `interfaz` (`id_catalogo_interfaz_FK`) USING BTREE,
	CONSTRAINT `categoria` FOREIGN KEY (`id_catalogo_categoria_FK`) REFERENCES `catalogo_categorias` (`id_catalogo_categoria_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `interfaz` FOREIGN KEY (`id_catalogo_interfaz_FK`) REFERENCES `catalogo_interfaz` (`id_catalogo_interfaz_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `modulo` FOREIGN KEY (`id_catalogo_modulo_FK`) REFERENCES `catalogo_modulos` (`id_catalogo_modulo_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COMMENT='Unión de los catálogos de vistas para el sistema web'
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=1;

CREATE TABLE `catalogo_estados` (
	`id_catalogo_estado_PK` BIGINT(20) NOT NULL,
	`nombre_estado` VARCHAR(150) NOT NULL COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id_catalogo_estado_PK`) USING BTREE
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_familia` (
	`id_catalogo_familia_PK` BIGINT(20) NOT NULL,
	`nombre_familia` VARCHAR(150) NOT NULL COLLATE 'utf8mb3_general_ci',
	`descripcion_familia` VARCHAR(350) NOT NULL COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id_catalogo_familia_PK`) USING BTREE
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_giro` (
	`id_catalogo_giro_PK` BIGINT(20) NOT NULL,
	`nombre_giro` VARCHAR(150) NOT NULL COLLATE 'utf8mb3_general_ci',
	`descripcion_giro` VARCHAR(350) NOT NULL COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id_catalogo_giro_PK`) USING BTREE
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_insumos` (
	`id_catalogo_insumos_PK` BIGINT(20) NOT NULL,
	`id_catalogo_familia_FK` BIGINT(20) NOT NULL,
	`id_catalogo_giro_FK` BIGINT(20) NOT NULL,
	`categoria` BIGINT(20) NOT NULL,
	`descripcion_insumo` VARCHAR(350) NOT NULL COLLATE 'utf8mb3_general_ci',
	`desc_corta` VARCHAR(350) NOT NULL COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id_catalogo_insumos_PK`) USING BTREE,
	INDEX `familiasCat` (`id_catalogo_familia_FK`) USING BTREE,
	INDEX `girosCat` (`id_catalogo_giro_FK`) USING BTREE,
	CONSTRAINT `familiasCat` FOREIGN KEY (`id_catalogo_familia_FK`) REFERENCES `catalogo_familia` (`id_catalogo_familia_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `girosCat` FOREIGN KEY (`id_catalogo_giro_FK`) REFERENCES `catalogo_giro` (`id_catalogo_giro_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_insumos_precio` (
	`id_catalogo_insumos_precio_PK` BIGINT(20) NOT NULL,
	`id_catalogo_insumos_presentacion_FK` BIGINT(20) NOT NULL,
	`precio_compra` DOUBLE NOT NULL,
	`precio_venta` DOUBLE NOT NULL,
	`precio_mayoreo` DOUBLE NOT NULL,
	PRIMARY KEY (`id_catalogo_insumos_precio_PK`) USING BTREE,
	INDEX `preciosCat` (`id_catalogo_insumos_presentacion_FK`) USING BTREE,
	CONSTRAINT `preciosCat` FOREIGN KEY (`id_catalogo_insumos_presentacion_FK`) REFERENCES `catalogo_insumos_presentacion` (`id_catalogo_insumos_presentacion_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_insumos_presentacion` (
	`id_catalogo_insumos_presentacion_PK` BIGINT(20) NOT NULL,
	`id_catalogo_insumos_FK` BIGINT(20) NOT NULL,
	`codigo_barras` VARCHAR(25) NOT NULL COLLATE 'utf8mb3_general_ci',
	`codigo` VARCHAR(100) NOT NULL COLLATE 'utf8mb3_general_ci',
	`id_unidad_medida_FK` BIGINT(20) NOT NULL,
	`equivalencia` DOUBLE NOT NULL,
	PRIMARY KEY (`id_catalogo_insumos_presentacion_PK`) USING BTREE,
	INDEX `insumosCat` (`id_catalogo_insumos_FK`) USING BTREE,
	INDEX `presentacionCat` (`id_unidad_medida_FK`) USING BTREE,
	CONSTRAINT `insumosCat` FOREIGN KEY (`id_catalogo_insumos_FK`) REFERENCES `catalogo_insumos` (`id_catalogo_insumos_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `presentacionCat` FOREIGN KEY (`id_unidad_medida_FK`) REFERENCES `unidades_medida` (`id_unidad_medida_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_insumos_presentacion` (
	`id_catalogo_insumos_presentacion_PK` BIGINT(20) NOT NULL,
	`id_catalogo_insumos_FK` BIGINT(20) NOT NULL,
	`codigo_barras` VARCHAR(25) NOT NULL COLLATE 'utf8mb3_general_ci',
	`codigo` VARCHAR(100) NOT NULL COLLATE 'utf8mb3_general_ci',
	`id_unidad_medida_FK` BIGINT(20) NOT NULL,
	`equivalencia` DOUBLE NOT NULL,
	PRIMARY KEY (`id_catalogo_insumos_presentacion_PK`) USING BTREE,
	INDEX `insumosCat` (`id_catalogo_insumos_FK`) USING BTREE,
	INDEX `presentacionCat` (`id_unidad_medida_FK`) USING BTREE,
	CONSTRAINT `insumosCat` FOREIGN KEY (`id_catalogo_insumos_FK`) REFERENCES `catalogo_insumos` (`id_catalogo_insumos_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `presentacionCat` FOREIGN KEY (`id_unidad_medida_FK`) REFERENCES `unidades_medida` (`id_unidad_medida_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_modulos` (
	`id_catalogo_modulo_PK` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`nombre_modulo` VARCHAR(100) NOT NULL COMMENT 'nombre del modulo' COLLATE 'utf8mb3_general_ci',
	`descripcion_modulo` VARCHAR(500) NOT NULL COMMENT 'Describe el módulo y sus características ' COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id_catalogo_modulo_PK`) USING BTREE
)
COMMENT='Nombre de los módulos que se van a tener en cada una de las actividades '
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=4;

CREATE TABLE `catalogo_municipios` (
	`id_catalogo_municipios_PK` BIGINT(20) NOT NULL,
	`id_catalogo_estado_FK` BIGINT(20) NOT NULL,
	`nombre_municipio` VARCHAR(150) NOT NULL COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id_catalogo_municipios_PK`) USING BTREE,
	INDEX `municipiosEstado` (`id_catalogo_estado_FK`) USING BTREE,
	CONSTRAINT `municipiosEstado` FOREIGN KEY (`id_catalogo_estado_FK`) REFERENCES `catalogo_estados` (`id_catalogo_estado_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_proveedores` (
	`id_catalogo_proveedor_PK` BIGINT(20) NOT NULL,
	`nombre` VARCHAR(500) NOT NULL COLLATE 'utf8mb3_general_ci',
	`rfc` VARCHAR(15) NOT NULL COLLATE 'utf8mb3_general_ci',
	`email_principal` VARCHAR(500) NOT NULL COLLATE 'utf8mb3_general_ci',
	`calle` VARCHAR(500) NOT NULL COLLATE 'utf8mb3_general_ci',
	`id_catalogo_estado_FK` BIGINT(20) NOT NULL,
	`id_catalogo_municipios_FK` BIGINT(20) NOT NULL,
	`cp` INT(11) NOT NULL,
	`telefono` INT(11) NOT NULL,
	`id_catalogo_giro_FK` BIGINT(20) NULL DEFAULT NULL,
	PRIMARY KEY (`id_catalogo_proveedor_PK`) USING BTREE,
	INDEX `estado` (`id_catalogo_estado_FK`) USING BTREE,
	INDEX `municipios` (`id_catalogo_municipios_FK`) USING BTREE,
	INDEX `giros` (`id_catalogo_giro_FK`) USING BTREE,
	CONSTRAINT `estado` FOREIGN KEY (`id_catalogo_estado_FK`) REFERENCES `catalogo_estados` (`id_catalogo_estado_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `giros` FOREIGN KEY (`id_catalogo_giro_FK`) REFERENCES `catalogo_giro` (`id_catalogo_giro_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `municipios` FOREIGN KEY (`id_catalogo_municipios_FK`) REFERENCES `catalogo_municipios` (`id_catalogo_municipios_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_proveedores_banco` (
	`id_catalogo_proveedor_banco` BIGINT(20) NOT NULL,
	`id_catalogo_proveedor_FK` BIGINT(20) NOT NULL,
	`id_catalogo_banco_FK` BIGINT(20) NOT NULL,
	`cuenta` VARCHAR(50) NOT NULL COLLATE 'utf8mb3_general_ci',
	`clave_interbancaria` VARCHAR(25) NOT NULL COLLATE 'utf8mb3_general_ci',
	`no_convenio` VARCHAR(25) NOT NULL COLLATE 'utf8mb3_general_ci',
	`referencia` VARCHAR(25) NOT NULL COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id_catalogo_proveedor_banco`) USING BTREE,
	INDEX `proveedorBan` (`id_catalogo_banco_FK`) USING BTREE,
	INDEX `proveedor` (`id_catalogo_proveedor_FK`) USING BTREE,
	CONSTRAINT `proveedor` FOREIGN KEY (`id_catalogo_proveedor_FK`) REFERENCES `catalogo_proveedores` (`id_catalogo_proveedor_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `proveedorBan` FOREIGN KEY (`id_catalogo_banco_FK`) REFERENCES `catalogo_bancos` (`id_catalogo_banco_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COMMENT='Catálogo de bancos que tiene cada proveedor '
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_proveedores_banco` (
	`id_catalogo_proveedor_banco` BIGINT(20) NOT NULL,
	`id_catalogo_proveedor_FK` BIGINT(20) NOT NULL,
	`id_catalogo_banco_FK` BIGINT(20) NOT NULL,
	`cuenta` VARCHAR(50) NOT NULL COLLATE 'utf8mb3_general_ci',
	`clave_interbancaria` VARCHAR(25) NOT NULL COLLATE 'utf8mb3_general_ci',
	`no_convenio` VARCHAR(25) NOT NULL COLLATE 'utf8mb3_general_ci',
	`referencia` VARCHAR(25) NOT NULL COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id_catalogo_proveedor_banco`) USING BTREE,
	INDEX `proveedorBan` (`id_catalogo_banco_FK`) USING BTREE,
	INDEX `proveedor` (`id_catalogo_proveedor_FK`) USING BTREE,
	CONSTRAINT `proveedor` FOREIGN KEY (`id_catalogo_proveedor_FK`) REFERENCES `catalogo_proveedores` (`id_catalogo_proveedor_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `proveedorBan` FOREIGN KEY (`id_catalogo_banco_FK`) REFERENCES `catalogo_bancos` (`id_catalogo_banco_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COMMENT='Catálogo de bancos que tiene cada proveedor '
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `catalogo_roles` (
	`id_roles_PK` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`nombre_rol` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`status` BIT(1) NULL DEFAULT b'1',
	PRIMARY KEY (`id_roles_PK`) USING BTREE
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=15;

CREATE TABLE `catalogo_roles_permisos_interfaz` (
	`id_cat_rol_permiso_PK` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`id_roles_FK` BIGINT(20) NOT NULL,
	`id_catalogo_interfaz_FK` BIGINT(20) NOT NULL,
	`status` BIT(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
	PRIMARY KEY (`id_cat_rol_permiso_PK`) USING BTREE,
	INDEX `FK_roles` (`id_roles_FK`) USING BTREE,
	INDEX `FK_interfaz` (`id_catalogo_interfaz_FK`) USING BTREE,
	CONSTRAINT `FK_interfaz` FOREIGN KEY (`id_catalogo_interfaz_FK`) REFERENCES `catalogo_interfaz` (`id_catalogo_interfaz_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_roles` FOREIGN KEY (`id_roles_FK`) REFERENCES `catalogo_roles` (`id_roles_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COMMENT='Las interfaces que puede utilizar el rol'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=18;

CREATE TABLE `negocios_tipo` (
	`id_tipo_negocio_PK` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`id_usuario_FK` BIGINT(20) NOT NULL,
	`nombre_negocio` VARCHAR(150) NOT NULL COLLATE 'utf8mb3_general_ci',
	`tipo_negocio` INT(11) NOT NULL DEFAULT '0',
	`status_negocio` BIT(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
	PRIMARY KEY (`id_tipo_negocio_PK`) USING BTREE,
	INDEX `usuarios` (`id_usuario_FK`) USING BTREE,
	CONSTRAINT `usuarios` FOREIGN KEY (`id_usuario_FK`) REFERENCES `usuariosnegocio` (`id_usuario_negocio_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=3;

CREATE TABLE `personalnegocio` (
	`id_persona_negocio_PK` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(100) NOT NULL COLLATE 'utf8mb3_general_ci',
	`apellidos` VARCHAR(100) NOT NULL COLLATE 'utf8mb3_general_ci',
	`sexo` INT(11) NULL DEFAULT '0' COMMENT '0=no aplica, 1=hombre, 2=mujer',
	`curp` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`telefono` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`correo` VARCHAR(150) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`status_per` BIT(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
	PRIMARY KEY (`id_persona_negocio_PK`) USING BTREE
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=3;

CREATE TABLE `rolesnegocio` (
	`id_roles_negocio_PK` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`id_usuario_negocio_FK` BIGINT(20) NULL DEFAULT NULL,
	`id_roles_FK` BIGINT(20) NULL DEFAULT NULL,
	`nombreRol` VARCHAR(150) NULL DEFAULT NULL COMMENT 'nombre del rol' COLLATE 'utf8mb3_general_ci',
	`status_rol` BIT(1) NULL DEFAULT b'1',
	PRIMARY KEY (`id_roles_negocio_PK`) USING BTREE,
	INDEX `usuario` (`id_usuario_negocio_FK`) USING BTREE,
	INDEX `idrol` (`id_roles_FK`) USING BTREE,
	CONSTRAINT `idrol` FOREIGN KEY (`id_roles_FK`) REFERENCES `catalogo_roles` (`id_roles_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `rolusuarios` FOREIGN KEY (`id_usuario_negocio_FK`) REFERENCES `usuariosnegocio` (`id_usuario_negocio_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=3;

CREATE TABLE `unidades_medida` (
	`id_unidad_medida_PK` BIGINT(20) NOT NULL,
	`nombre` VARCHAR(50) NOT NULL COLLATE 'utf8mb3_general_ci',
	`nomenclatura` VARCHAR(50) NOT NULL COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id_unidad_medida_PK`) USING BTREE
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC;

CREATE TABLE `usuariosnegocio` (
	`id_usuario_negocio_PK` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`id_persona_negocio_FK` BIGINT(20) NOT NULL,
	`usuario` VARCHAR(150) NOT NULL COLLATE 'utf8mb3_general_ci',
	`passwd` VARBINARY(300) NOT NULL,
	`ruta_img` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`status_usuario` BIT(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
	PRIMARY KEY (`id_usuario_negocio_PK`) USING BTREE,
	INDEX `persona` (`id_persona_negocio_FK`) USING BTREE,
	CONSTRAINT `usuariosnegocio_ibfk_1` FOREIGN KEY (`id_persona_negocio_FK`) REFERENCES `personalnegocio` (`id_persona_negocio_PK`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=3;

?>