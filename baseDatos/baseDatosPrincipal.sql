/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MariaDB
 Source Server Version : 101002 (10.10.2-MariaDB)
 Source Host           : 127.0.0.1:3306
 Source Schema         : cervantesvite022123o

 Target Server Type    : MariaDB
 Target Server Version : 101002 (10.10.2-MariaDB)
 File Encoding         : 65001

 Date: 23/03/2023 15:03:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for catalogo_bancos
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_bancos`;
CREATE TABLE `catalogo_bancos`  (
  `id_catalogo_banco_PK` bigint(20) NOT NULL,
  `nombre_banco` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_banco_PK`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_bancos
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_categoria_grupos
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_categoria_grupos`;
CREATE TABLE `catalogo_categoria_grupos`  (
  `id_catalogo_categoria_grupo_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_catalogo_categoria_FK` bigint(20) NOT NULL,
  `id_catalogo_modulo_FK` bigint(20) NOT NULL,
  `id_catalogo_interfaz_FK` bigint(20) NOT NULL,
  PRIMARY KEY (`id_catalogo_categoria_grupo_PK`) USING BTREE,
  INDEX `categoria`(`id_catalogo_categoria_FK`) USING BTREE,
  INDEX `modulo`(`id_catalogo_modulo_FK`) USING BTREE,
  INDEX `interfaz`(`id_catalogo_interfaz_FK`) USING BTREE,
  CONSTRAINT `categoria` FOREIGN KEY (`id_catalogo_categoria_FK`) REFERENCES `catalogo_categorias` (`id_catalogo_categoria_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `interfaz` FOREIGN KEY (`id_catalogo_interfaz_FK`) REFERENCES `catalogo_interfaz` (`id_catalogo_interfaz_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `modulo` FOREIGN KEY (`id_catalogo_modulo_FK`) REFERENCES `catalogo_modulos` (`id_catalogo_modulo_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Unión de los catálogos de vistas para el sistema web' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_categoria_grupos
-- ----------------------------
INSERT INTO `catalogo_categoria_grupos` VALUES (1, 1, 1, 1);
INSERT INTO `catalogo_categoria_grupos` VALUES (2, 1, 2, 3);
INSERT INTO `catalogo_categoria_grupos` VALUES (3, 1, 3, 5);
INSERT INTO `catalogo_categoria_grupos` VALUES (4, 2, 1, 2);
INSERT INTO `catalogo_categoria_grupos` VALUES (5, 2, 3, 6);
INSERT INTO `catalogo_categoria_grupos` VALUES (6, 2, 2, 4);

-- ----------------------------
-- Table structure for catalogo_categorias
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_categorias`;
CREATE TABLE `catalogo_categorias`  (
  `id_catalogo_categoria_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `descripcion_cetegoria` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `color` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `iconoMaster` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_categoria_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Categorías del sistema web' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_categorias
-- ----------------------------
INSERT INTO `catalogo_categorias` VALUES (1, 'CATALOGOS', 'TODAS LOS MODULOS QUE SON PRINCIPALES PARA GUARDAR INFORMACION PRECISA DEL NEGOCIO', '00FFFF', 'fa-file-invoice');
INSERT INTO `catalogo_categorias` VALUES (2, 'REPORTES', 'REPORTES', '17a633', 'fa-chart-pie');
INSERT INTO `catalogo_categorias` VALUES (3, 'PERFILES', 'PERFILES', '00FFFF', 'fa-microchip');
INSERT INTO `catalogo_categorias` VALUES (4, 'CONFIGURACIÓN', 'CONFIGURACIÓN', '17a633', 'fa-microchip');
INSERT INTO `catalogo_categorias` VALUES (5, 'OPERACIÓN', 'OPERACIÓN', '00FFFF', 'fa-microchip');

-- ----------------------------
-- Table structure for catalogo_estados
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_estados`;
CREATE TABLE `catalogo_estados`  (
  `id_catalogo_estado_PK` bigint(20) NOT NULL,
  `nombre_estado` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_estado_PK`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_estados
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_familia
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_familia`;
CREATE TABLE `catalogo_familia`  (
  `id_catalogo_familia_PK` bigint(20) NOT NULL,
  `nombre_familia` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `descripcion_familia` varchar(350) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_familia_PK`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_familia
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_giro
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_giro`;
CREATE TABLE `catalogo_giro`  (
  `id_catalogo_giro_PK` bigint(20) NOT NULL,
  `nombre_giro` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `descripcion_giro` varchar(350) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_giro_PK`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_giro
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_insumos
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_insumos`;
CREATE TABLE `catalogo_insumos`  (
  `id_catalogo_insumos_PK` bigint(20) NOT NULL,
  `id_catalogo_familia_FK` bigint(20) NOT NULL,
  `id_catalogo_giro_FK` bigint(20) NOT NULL,
  `categoria` bigint(20) NOT NULL,
  `descripcion_insumo` varchar(350) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `desc_corta` varchar(350) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_insumos_PK`) USING BTREE,
  INDEX `familiasCat`(`id_catalogo_familia_FK`) USING BTREE,
  INDEX `girosCat`(`id_catalogo_giro_FK`) USING BTREE,
  CONSTRAINT `familiasCat` FOREIGN KEY (`id_catalogo_familia_FK`) REFERENCES `catalogo_familia` (`id_catalogo_familia_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `girosCat` FOREIGN KEY (`id_catalogo_giro_FK`) REFERENCES `catalogo_giro` (`id_catalogo_giro_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_insumos
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_insumos_precio
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_insumos_precio`;
CREATE TABLE `catalogo_insumos_precio`  (
  `id_catalogo_insumos_precio_PK` bigint(20) NOT NULL,
  `id_catalogo_insumos_presentacion_FK` bigint(20) NOT NULL,
  `precio_compra` double NOT NULL,
  `precio_venta` double NOT NULL,
  `precio_mayoreo` double NOT NULL,
  PRIMARY KEY (`id_catalogo_insumos_precio_PK`) USING BTREE,
  INDEX `preciosCat`(`id_catalogo_insumos_presentacion_FK`) USING BTREE,
  CONSTRAINT `preciosCat` FOREIGN KEY (`id_catalogo_insumos_presentacion_FK`) REFERENCES `catalogo_insumos_presentacion` (`id_catalogo_insumos_presentacion_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_insumos_precio
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_insumos_presentacion
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_insumos_presentacion`;
CREATE TABLE `catalogo_insumos_presentacion`  (
  `id_catalogo_insumos_presentacion_PK` bigint(20) NOT NULL,
  `id_catalogo_insumos_FK` bigint(20) NOT NULL,
  `codigo_barras` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `codigo` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `id_unidad_medida_FK` bigint(20) NOT NULL,
  `equivalencia` double NOT NULL,
  PRIMARY KEY (`id_catalogo_insumos_presentacion_PK`) USING BTREE,
  INDEX `insumosCat`(`id_catalogo_insumos_FK`) USING BTREE,
  INDEX `presentacionCat`(`id_unidad_medida_FK`) USING BTREE,
  CONSTRAINT `insumosCat` FOREIGN KEY (`id_catalogo_insumos_FK`) REFERENCES `catalogo_insumos` (`id_catalogo_insumos_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `presentacionCat` FOREIGN KEY (`id_unidad_medida_FK`) REFERENCES `unidades_medida` (`id_unidad_medida_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_insumos_presentacion
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_interfaz
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_interfaz`;
CREATE TABLE `catalogo_interfaz`  (
  `id_catalogo_interfaz_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_interfaz` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'nombre completo de la interfaz',
  `descripcion_interfaz` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'Descripción de lo que hace la interfaz ',
  `icono` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_catalogo_interfaz_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Catálogo de interfaz creadas para el sistema web' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_interfaz
-- ----------------------------
INSERT INTO `catalogo_interfaz` VALUES (1, 'PROVEEDORES', 'ALTA, BAJA Y EDICION DE PROVEEDORES', 'fa-truck-field');
INSERT INTO `catalogo_interfaz` VALUES (2, 'PROVEEDORES', 'REPORTE DE PROVEEDORES', 'fa-truck-fast');
INSERT INTO `catalogo_interfaz` VALUES (3, 'CLIENTES', 'ALTA, BAJA Y EDICION DE CLIENTES', 'fa-users');
INSERT INTO `catalogo_interfaz` VALUES (4, 'CLIENTES', 'REPORTE DE CLIENTES', 'fa-clipboard-user');
INSERT INTO `catalogo_interfaz` VALUES (5, 'INSUMOS', 'ALTA, BAJA Y EDICION DE INSUMOS', NULL);
INSERT INTO `catalogo_interfaz` VALUES (6, 'INSUMOS', 'REPORTE DE INSUMOS', NULL);

-- ----------------------------
-- Table structure for catalogo_modulos
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_modulos`;
CREATE TABLE `catalogo_modulos`  (
  `id_catalogo_modulo_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_modulo` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'nombre del modulo',
  `descripcion_modulo` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'Describe el módulo y sus características ',
  PRIMARY KEY (`id_catalogo_modulo_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Nombre de los módulos que se van a tener en cada una de las actividades ' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_modulos
-- ----------------------------
INSERT INTO `catalogo_modulos` VALUES (1, 'PROVEEDORES', 'ALTA, BAJA, EDICION Y REPORTE DE PROVEEDORES');
INSERT INTO `catalogo_modulos` VALUES (2, 'CLIENTES', 'ALTA, BAJA, EDICION Y REPORTE DE CLIENTES');
INSERT INTO `catalogo_modulos` VALUES (3, 'INSUMOS', 'ALTA, BAJA, EDICION Y REPORTE DE INSUMOS');

-- ----------------------------
-- Table structure for catalogo_municipios
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_municipios`;
CREATE TABLE `catalogo_municipios`  (
  `id_catalogo_municipios_PK` bigint(20) NOT NULL,
  `id_catalogo_estado_FK` bigint(20) NOT NULL,
  `nombre_municipio` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_municipios_PK`) USING BTREE,
  INDEX `municipiosEstado`(`id_catalogo_estado_FK`) USING BTREE,
  CONSTRAINT `municipiosEstado` FOREIGN KEY (`id_catalogo_estado_FK`) REFERENCES `catalogo_estados` (`id_catalogo_estado_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_municipios
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_proveedor_contacto
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_proveedor_contacto`;
CREATE TABLE `catalogo_proveedor_contacto`  (
  `id_proveedor_contacto_PK` bigint(20) NOT NULL,
  `id_catalogo_proveedor_FK` bigint(20) NOT NULL,
  `nombre_contacto` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `telefono` int(11) NOT NULL,
  `ext_tel` int(11) NOT NULL,
  `email_proveedor` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_proveedor_contacto_PK`) USING BTREE,
  INDEX `proveedorContacto`(`id_catalogo_proveedor_FK`) USING BTREE,
  CONSTRAINT `proveedorContacto` FOREIGN KEY (`id_catalogo_proveedor_FK`) REFERENCES `catalogo_proveedores` (`id_catalogo_proveedor_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Catálogo de contactos interno del proveedor ' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_proveedor_contacto
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_proveedores
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_proveedores`;
CREATE TABLE `catalogo_proveedores`  (
  `id_catalogo_proveedor_PK` bigint(20) NOT NULL,
  `nombre` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `rfc` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email_principal` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `calle` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `id_catalogo_estado_FK` bigint(20) NOT NULL,
  `id_catalogo_municipios_FK` bigint(20) NOT NULL,
  `cp` int(11) NOT NULL,
  `telefono` int(11) NOT NULL,
  `id_catalogo_giro_FK` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id_catalogo_proveedor_PK`) USING BTREE,
  INDEX `estado`(`id_catalogo_estado_FK`) USING BTREE,
  INDEX `municipios`(`id_catalogo_municipios_FK`) USING BTREE,
  INDEX `giros`(`id_catalogo_giro_FK`) USING BTREE,
  CONSTRAINT `estado` FOREIGN KEY (`id_catalogo_estado_FK`) REFERENCES `catalogo_estados` (`id_catalogo_estado_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `giros` FOREIGN KEY (`id_catalogo_giro_FK`) REFERENCES `catalogo_giro` (`id_catalogo_giro_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `municipios` FOREIGN KEY (`id_catalogo_municipios_FK`) REFERENCES `catalogo_municipios` (`id_catalogo_municipios_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_proveedores
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_proveedores_banco
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_proveedores_banco`;
CREATE TABLE `catalogo_proveedores_banco`  (
  `id_catalogo_proveedor_banco` bigint(20) NOT NULL,
  `id_catalogo_proveedor_FK` bigint(20) NOT NULL,
  `id_catalogo_banco_FK` bigint(20) NOT NULL,
  `cuenta` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `clave_interbancaria` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `no_convenio` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `referencia` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_proveedor_banco`) USING BTREE,
  INDEX `proveedorBan`(`id_catalogo_banco_FK`) USING BTREE,
  INDEX `proveedor`(`id_catalogo_proveedor_FK`) USING BTREE,
  CONSTRAINT `proveedor` FOREIGN KEY (`id_catalogo_proveedor_FK`) REFERENCES `catalogo_proveedores` (`id_catalogo_proveedor_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `proveedorBan` FOREIGN KEY (`id_catalogo_banco_FK`) REFERENCES `catalogo_bancos` (`id_catalogo_banco_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Catálogo de bancos que tiene cada proveedor ' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_proveedores_banco
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_roles
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_roles`;
CREATE TABLE `catalogo_roles`  (
  `id_roles_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `status` bit(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id_roles_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_roles
-- ----------------------------
INSERT INTO `catalogo_roles` VALUES (1, 'admin', b'1');
INSERT INTO `catalogo_roles` VALUES (2, 'Presidente', b'1');
INSERT INTO `catalogo_roles` VALUES (3, 'Almacenista', b'1');
INSERT INTO `catalogo_roles` VALUES (4, 'Jefe De Area', b'0');
INSERT INTO `catalogo_roles` VALUES (5, 'Auxiliar Almacen', b'1');
INSERT INTO `catalogo_roles` VALUES (6, 'Coordinador', b'1');
INSERT INTO `catalogo_roles` VALUES (7, 'Abogado', b'1');
INSERT INTO `catalogo_roles` VALUES (8, 'Supervisor', b'1');
INSERT INTO `catalogo_roles` VALUES (9, 'Programador', b'1');
INSERT INTO `catalogo_roles` VALUES (10, 'Programador JR', b'1');
INSERT INTO `catalogo_roles` VALUES (11, 'Programador SR', b'1');
INSERT INTO `catalogo_roles` VALUES (12, 'Analista', b'1');
INSERT INTO `catalogo_roles` VALUES (13, 'Analista B', b'1');
INSERT INTO `catalogo_roles` VALUES (14, 'Analista C', b'1');
INSERT INTO `catalogo_roles` VALUES (15, 'Jefe Almacen JR', b'1');
INSERT INTO `catalogo_roles` VALUES (16, 'Analista X', b'1');
INSERT INTO `catalogo_roles` VALUES (17, 'Cargador', b'1');
INSERT INTO `catalogo_roles` VALUES (18, 'Analista Y', b'0');
INSERT INTO `catalogo_roles` VALUES (19, 'dddd', b'1');

-- ----------------------------
-- Table structure for catalogo_roles_permisos_interfaz
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_roles_permisos_interfaz`;
CREATE TABLE `catalogo_roles_permisos_interfaz`  (
  `id_cat_rol_permiso_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_roles_FK` bigint(20) NOT NULL,
  `id_catalogo_interfaz_FK` bigint(20) NOT NULL,
  `status` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_cat_rol_permiso_PK`) USING BTREE,
  INDEX `FK_roles`(`id_roles_FK`) USING BTREE,
  INDEX `FK_interfaz`(`id_catalogo_interfaz_FK`) USING BTREE,
  CONSTRAINT `FK_interfaz` FOREIGN KEY (`id_catalogo_interfaz_FK`) REFERENCES `catalogo_interfaz` (`id_catalogo_interfaz_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_roles` FOREIGN KEY (`id_roles_FK`) REFERENCES `catalogo_roles` (`id_roles_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Las interfaces que puede utilizar el rol' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_roles_permisos_interfaz
-- ----------------------------
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (9, 1, 1, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (10, 1, 3, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (11, 1, 5, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (12, 1, 6, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (13, 1, 4, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (14, 1, 2, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (15, 2, 5, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (16, 2, 1, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (17, 2, 6, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (18, 13, 1, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (19, 13, 5, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (20, 13, 4, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (21, 13, 6, b'1');

-- ----------------------------
-- Table structure for negocios_tipo
-- ----------------------------
DROP TABLE IF EXISTS `negocios_tipo`;
CREATE TABLE `negocios_tipo`  (
  `id_tipo_negocio_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_usuario_FK` bigint(20) NOT NULL,
  `nombre_negocio` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `tipo_negocio` int(11) NOT NULL DEFAULT 0,
  `status_negocio` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_tipo_negocio_PK`) USING BTREE,
  INDEX `usuarios`(`id_usuario_FK`) USING BTREE,
  CONSTRAINT `usuarios` FOREIGN KEY (`id_usuario_FK`) REFERENCES `usuariosnegocio` (`id_usuario_negocio_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of negocios_tipo
-- ----------------------------
INSERT INTO `negocios_tipo` VALUES (1, 1, 'CERVANTES VITE', 1, b'1');
INSERT INTO `negocios_tipo` VALUES (2, 2, 'nomComer', 1, b'1');
INSERT INTO `negocios_tipo` VALUES (3, 3, 'nomComer', 1, b'1');

-- ----------------------------
-- Table structure for personalnegocio
-- ----------------------------
DROP TABLE IF EXISTS `personalnegocio`;
CREATE TABLE `personalnegocio`  (
  `id_persona_negocio_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `apellidos` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `sexo` int(11) NULL DEFAULT 0 COMMENT '0=no aplica, 1=hombre, 2=mujer',
  `curp` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `telefono` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `correo` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `status_per` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_persona_negocio_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personalnegocio
-- ----------------------------
INSERT INTO `personalnegocio` VALUES (1, 'EFRAIN', 'CERVANTES VITE', 1, 'CEVE900711HHGRTF06', '7711169098', 'efraceve@gmail.com', b'1');
INSERT INTO `personalnegocio` VALUES (2, 'OSCAR', 'CERVANTES VITE', 1, 'CEVO890206HHGRTF00', '7711169090', 'HELSING90@GMAIL.COM', b'1');
INSERT INTO `personalnegocio` VALUES (3, 'URIEL', 'CERVANTES VITE', 1, 'CEVU971231HHGRTF00', '7711169092', 'uri@gmail.com', b'1');

-- ----------------------------
-- Table structure for rolesnegocio
-- ----------------------------
DROP TABLE IF EXISTS `rolesnegocio`;
CREATE TABLE `rolesnegocio`  (
  `id_roles_negocio_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_usuario_negocio_FK` bigint(20) NULL DEFAULT NULL,
  `id_roles_FK` bigint(20) NULL DEFAULT NULL,
  `nombreRol` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'nombre del rol',
  `status_rol` bit(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id_roles_negocio_PK`) USING BTREE,
  INDEX `usuario`(`id_usuario_negocio_FK`) USING BTREE,
  INDEX `idrol`(`id_roles_FK`) USING BTREE,
  CONSTRAINT `idrol` FOREIGN KEY (`id_roles_FK`) REFERENCES `catalogo_roles` (`id_roles_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rolusuarios` FOREIGN KEY (`id_usuario_negocio_FK`) REFERENCES `usuariosnegocio` (`id_usuario_negocio_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rolesnegocio
-- ----------------------------
INSERT INTO `rolesnegocio` VALUES (1, 1, 1, 'admin', b'1');
INSERT INTO `rolesnegocio` VALUES (2, 2, 3, 'Almacenista', b'1');
INSERT INTO `rolesnegocio` VALUES (3, 3, 17, 'Cargador', b'1');

-- ----------------------------
-- Table structure for unidades_medida
-- ----------------------------
DROP TABLE IF EXISTS `unidades_medida`;
CREATE TABLE `unidades_medida`  (
  `id_unidad_medida_PK` bigint(20) NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nomenclatura` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_unidad_medida_PK`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of unidades_medida
-- ----------------------------

-- ----------------------------
-- Table structure for usuariosnegocio
-- ----------------------------
DROP TABLE IF EXISTS `usuariosnegocio`;
CREATE TABLE `usuariosnegocio`  (
  `id_usuario_negocio_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_persona_negocio_FK` bigint(20) NOT NULL,
  `usuario` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `passwd` varbinary(300) NOT NULL,
  `ruta_img` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `status_usuario` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_usuario_negocio_PK`) USING BTREE,
  INDEX `persona`(`id_persona_negocio_FK`) USING BTREE,
  CONSTRAINT `usuariosnegocio_ibfk_1` FOREIGN KEY (`id_persona_negocio_FK`) REFERENCES `personalnegocio` (`id_persona_negocio_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuariosnegocio
-- ----------------------------
INSERT INTO `usuariosnegocio` VALUES (1, 1, 'EFCE7709', 0xA53708D2885B507B6E9AF8C31E8131C0, '/fotos/farmacom2/1.PNG', b'1');
INSERT INTO `usuariosnegocio` VALUES (2, 2, 'OSCE7709', 0x9C86AF35C0526315FBD4CE499585BA6F, '/fotos/farmacom2/2.JPG', b'1');
INSERT INTO `usuariosnegocio` VALUES (3, 3, 'URCE7709', 0x00419B92828134110439113104CFBA75, NULL, b'1');

SET FOREIGN_KEY_CHECKS = 1;
