/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 100425 (10.4.25-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : minegocio_basedatos

 Target Server Type    : MySQL
 Target Server Version : 100425 (10.4.25-MariaDB)
 File Encoding         : 65001

 Date: 20/02/2023 22:43:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for catalogo_bancos
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_bancos`;
CREATE TABLE `catalogo_bancos`  (
  `id_catalogo_banco_PK` bigint NOT NULL,
  `nombre_banco` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_banco_PK`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_bancos
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_categoria_grupos
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_categoria_grupos`;
CREATE TABLE `catalogo_categoria_grupos`  (
  `id_catalogo_categoria_grupo_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_catalogo_categoria_FK` bigint NOT NULL,
  `id_catalogo_modulo_FK` bigint NOT NULL,
  `id_catalogo_interfaz_FK` bigint NOT NULL,
  PRIMARY KEY (`id_catalogo_categoria_grupo_PK`) USING BTREE,
  INDEX `categoria`(`id_catalogo_categoria_FK` ASC) USING BTREE,
  INDEX `modulo`(`id_catalogo_modulo_FK` ASC) USING BTREE,
  INDEX `interfaz`(`id_catalogo_interfaz_FK` ASC) USING BTREE,
  CONSTRAINT `categoria` FOREIGN KEY (`id_catalogo_categoria_FK`) REFERENCES `catalogo_categorias` (`id_catalogo_categoria_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `interfaz` FOREIGN KEY (`id_catalogo_interfaz_FK`) REFERENCES `catalogo_interfaz` (`id_catalogo_interfaz_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `modulo` FOREIGN KEY (`id_catalogo_modulo_FK`) REFERENCES `catalogo_modulos` (`id_catalogo_modulo_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Unión de los catálogos de vistas para el sistema web' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_categoria_grupos
-- ----------------------------
INSERT INTO `catalogo_categoria_grupos` VALUES (1, 1, 1, 1);
INSERT INTO `catalogo_categoria_grupos` VALUES (2, 1, 2, 3);
INSERT INTO `catalogo_categoria_grupos` VALUES (3, 1, 3, 5);

-- ----------------------------
-- Table structure for catalogo_categorias
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_categorias`;
CREATE TABLE `catalogo_categorias`  (
  `id_catalogo_categoria_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descripcion_cetegoria` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `color` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_catalogo_categoria_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Categorías del sistema web' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_categorias
-- ----------------------------
INSERT INTO `catalogo_categorias` VALUES (1, 'CATALOGOS', 'TODAS LOS MODULOS QUE SON PRINCIPALES PARA GUARDAR INFORMACION PRECISA DEL NEGOCIO', '00FFFF');

-- ----------------------------
-- Table structure for catalogo_estados
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_estados`;
CREATE TABLE `catalogo_estados`  (
  `id_catalogo_estado_PK` bigint NOT NULL,
  `nombre_estado` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_estado_PK`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_estados
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_familia
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_familia`;
CREATE TABLE `catalogo_familia`  (
  `id_catalogo_familia_PK` bigint NOT NULL,
  `nombre_familia` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descripcion_familia` varchar(350) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_familia_PK`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_familia
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_giro
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_giro`;
CREATE TABLE `catalogo_giro`  (
  `id_catalogo_giro_PK` bigint NOT NULL,
  `nombre_giro` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descripcion_giro` varchar(350) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_giro_PK`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_giro
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_insumos
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_insumos`;
CREATE TABLE `catalogo_insumos`  (
  `id_catalogo_insumos_PK` bigint NOT NULL,
  `id_catalogo_familia_FK` bigint NOT NULL,
  `id_catalogo_giro_FK` bigint NOT NULL,
  `categoria` bigint NOT NULL,
  `descripcion_insumo` varchar(350) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `desc_corta` varchar(350) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_insumos_PK`) USING BTREE,
  INDEX `familiasCat`(`id_catalogo_familia_FK` ASC) USING BTREE,
  INDEX `girosCat`(`id_catalogo_giro_FK` ASC) USING BTREE,
  CONSTRAINT `familiasCat` FOREIGN KEY (`id_catalogo_familia_FK`) REFERENCES `catalogo_familia` (`id_catalogo_familia_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `girosCat` FOREIGN KEY (`id_catalogo_giro_FK`) REFERENCES `catalogo_giro` (`id_catalogo_giro_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_insumos
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_insumos_precio
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_insumos_precio`;
CREATE TABLE `catalogo_insumos_precio`  (
  `id_catalogo_insumos_precio_PK` bigint NOT NULL,
  `id_catalogo_insumos_presentacion_FK` bigint NOT NULL,
  `precio_compra` double NOT NULL,
  `precio_venta` double NOT NULL,
  `precio_mayoreo` double NOT NULL,
  PRIMARY KEY (`id_catalogo_insumos_precio_PK`) USING BTREE,
  INDEX `preciosCat`(`id_catalogo_insumos_presentacion_FK` ASC) USING BTREE,
  CONSTRAINT `preciosCat` FOREIGN KEY (`id_catalogo_insumos_presentacion_FK`) REFERENCES `catalogo_insumos_presentacion` (`id_catalogo_insumos_presentacion_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_insumos_precio
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_insumos_presentacion
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_insumos_presentacion`;
CREATE TABLE `catalogo_insumos_presentacion`  (
  `id_catalogo_insumos_presentacion_PK` bigint NOT NULL,
  `id_catalogo_insumos_FK` bigint NOT NULL,
  `codigo_barras` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `codigo` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_unidad_medida_FK` bigint NOT NULL,
  `equivalencia` double NOT NULL,
  PRIMARY KEY (`id_catalogo_insumos_presentacion_PK`) USING BTREE,
  INDEX `insumosCat`(`id_catalogo_insumos_FK` ASC) USING BTREE,
  INDEX `presentacionCat`(`id_unidad_medida_FK` ASC) USING BTREE,
  CONSTRAINT `insumosCat` FOREIGN KEY (`id_catalogo_insumos_FK`) REFERENCES `catalogo_insumos` (`id_catalogo_insumos_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `presentacionCat` FOREIGN KEY (`id_unidad_medida_FK`) REFERENCES `unidades_medida` (`id_unidad_medida_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_insumos_presentacion
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_interfaz
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_interfaz`;
CREATE TABLE `catalogo_interfaz`  (
  `id_catalogo_interfaz_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre_interfaz` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'nombre completo de la interfaz',
  `descripción_interfaz` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Descripción de lo que hace la interfaz ',
  `icono` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_catalogo_interfaz_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Catálogo de interfaz creadas para el sistema web' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_interfaz
-- ----------------------------
INSERT INTO `catalogo_interfaz` VALUES (1, 'PROVEEDORES', 'ALTA, BAJA Y EDICION DE PROVEEDORES', 'fa-truck-field');
INSERT INTO `catalogo_interfaz` VALUES (2, 'PROVEEDORES', 'REPORTE DE PROVEEDORES', 'fa-truck-field');
INSERT INTO `catalogo_interfaz` VALUES (3, 'CLIENTES', 'ALTA, BAJA Y EDICION DE CLIENTES', NULL);
INSERT INTO `catalogo_interfaz` VALUES (4, 'CLIENTES', 'REPORTE DE CLIENTES', NULL);
INSERT INTO `catalogo_interfaz` VALUES (5, 'INSUMOS', 'ALTA, BAJA Y EDICION DE INSUMOS', NULL);
INSERT INTO `catalogo_interfaz` VALUES (6, 'INSUMOS', 'REPORTE DE INSUMOS', NULL);

-- ----------------------------
-- Table structure for catalogo_modulos
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_modulos`;
CREATE TABLE `catalogo_modulos`  (
  `id_catalogo_modulo_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre_modulo` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'nombre del modulo',
  `descripcion_modulo` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Describe el módulo y sus características ',
  PRIMARY KEY (`id_catalogo_modulo_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Nombre de los módulos que se van a tener en cada una de las actividades ' ROW_FORMAT = DYNAMIC;

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
  `id_catalogo_municipios_PK` bigint NOT NULL,
  `id_catalogo_estado_FK` bigint NOT NULL,
  `nombre_municipio` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_municipios_PK`) USING BTREE,
  INDEX `municipiosEstado`(`id_catalogo_estado_FK` ASC) USING BTREE,
  CONSTRAINT `municipiosEstado` FOREIGN KEY (`id_catalogo_estado_FK`) REFERENCES `catalogo_estados` (`id_catalogo_estado_PK`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_municipios
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_proveedor_contacto
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_proveedor_contacto`;
CREATE TABLE `catalogo_proveedor_contacto`  (
  `id_proveedor_contacto_PK` bigint NOT NULL,
  `id_catalogo_proveedor_FK` bigint NOT NULL,
  `nombre_contacto` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telefono` int NOT NULL,
  `ext_tel` int NOT NULL,
  `email_proveedor` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_proveedor_contacto_PK`) USING BTREE,
  INDEX `proveedorContacto`(`id_catalogo_proveedor_FK` ASC) USING BTREE,
  CONSTRAINT `proveedorContacto` FOREIGN KEY (`id_catalogo_proveedor_FK`) REFERENCES `catalogo_proveedores` (`id_catalogo_proveedor_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Catálogo de contactos interno del proveedor ' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_proveedor_contacto
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_proveedores
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_proveedores`;
CREATE TABLE `catalogo_proveedores`  (
  `id_catalogo_proveedor_PK` bigint NOT NULL,
  `nombre` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `rfc` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email_principal` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `calle` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_catalogo_estado_FK` bigint NOT NULL,
  `id_catalogo_municipios_FK` bigint NOT NULL,
  `cp` int NOT NULL,
  `telefono` int NOT NULL,
  `id_catalogo_giro_FK` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`id_catalogo_proveedor_PK`) USING BTREE,
  INDEX `estado`(`id_catalogo_estado_FK` ASC) USING BTREE,
  INDEX `municipios`(`id_catalogo_municipios_FK` ASC) USING BTREE,
  INDEX `giros`(`id_catalogo_giro_FK` ASC) USING BTREE,
  CONSTRAINT `estado` FOREIGN KEY (`id_catalogo_estado_FK`) REFERENCES `catalogo_estados` (`id_catalogo_estado_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `giros` FOREIGN KEY (`id_catalogo_giro_FK`) REFERENCES `catalogo_giro` (`id_catalogo_giro_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `municipios` FOREIGN KEY (`id_catalogo_municipios_FK`) REFERENCES `catalogo_municipios` (`id_catalogo_municipios_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_proveedores
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_proveedores_banco
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_proveedores_banco`;
CREATE TABLE `catalogo_proveedores_banco`  (
  `id_catalogo_proveedor_banco` bigint NOT NULL,
  `id_catalogo_proveedor_FK` bigint NOT NULL,
  `id_catalogo_banco_FK` bigint NOT NULL,
  `cuenta` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `clave_interbancaria` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `no_convenio` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `referencia` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_proveedor_banco`) USING BTREE,
  INDEX `proveedorBan`(`id_catalogo_banco_FK` ASC) USING BTREE,
  INDEX `proveedor`(`id_catalogo_proveedor_FK` ASC) USING BTREE,
  CONSTRAINT `proveedor` FOREIGN KEY (`id_catalogo_proveedor_FK`) REFERENCES `catalogo_proveedores` (`id_catalogo_proveedor_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `proveedorBan` FOREIGN KEY (`id_catalogo_banco_FK`) REFERENCES `catalogo_bancos` (`id_catalogo_banco_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Catálogo de bancos que tiene cada proveedor ' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_proveedores_banco
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_roles
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_roles`;
CREATE TABLE `catalogo_roles`  (
  `id_roles_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` bit(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id_roles_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_roles
-- ----------------------------
INSERT INTO `catalogo_roles` VALUES (1, 'admin', b'1');
INSERT INTO `catalogo_roles` VALUES (2, 'Presidente', b'1');
INSERT INTO `catalogo_roles` VALUES (3, 'Almacenista', b'1');
INSERT INTO `catalogo_roles` VALUES (4, 'Jefe De Area', b'1');
INSERT INTO `catalogo_roles` VALUES (5, 'Auxiliar Almacen', b'1');
INSERT INTO `catalogo_roles` VALUES (6, 'Coordinador', b'1');
INSERT INTO `catalogo_roles` VALUES (7, 'Abogado', b'1');
INSERT INTO `catalogo_roles` VALUES (8, 'Supervisor', b'1');

-- ----------------------------
-- Table structure for negocios_tipo
-- ----------------------------
DROP TABLE IF EXISTS `negocios_tipo`;
CREATE TABLE `negocios_tipo`  (
  `id_tipo_negocio_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_usuario_FK` bigint NOT NULL,
  `nombre_negocio` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tipo_negocio` int NOT NULL DEFAULT 0,
  `status_negocio` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_tipo_negocio_PK`) USING BTREE,
  INDEX `usuarios`(`id_usuario_FK` ASC) USING BTREE,
  CONSTRAINT `usuarios` FOREIGN KEY (`id_usuario_FK`) REFERENCES `usuariosnegocio` (`id_usuario_negocio_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of negocios_tipo
-- ----------------------------

-- ----------------------------
-- Table structure for personalnegocio
-- ----------------------------
DROP TABLE IF EXISTS `personalnegocio`;
CREATE TABLE `personalnegocio`  (
  `id_persona_negocio_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `apellidos` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sexo` int NULL DEFAULT 0 COMMENT '0=no aplica, 1=hombre, 2=mujer',
  `curp` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telefono` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `correo` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status_per` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_persona_negocio_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personalnegocio
-- ----------------------------

-- ----------------------------
-- Table structure for rolesnegocio
-- ----------------------------
DROP TABLE IF EXISTS `rolesnegocio`;
CREATE TABLE `rolesnegocio`  (
  `id_roles_negocio_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_usuario_negocio_FK` bigint NULL DEFAULT NULL,
  `id_roles_FK` bigint NULL DEFAULT NULL,
  `nombreRol` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'nombre del rol',
  `status_rol` bit(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id_roles_negocio_PK`) USING BTREE,
  INDEX `usuario`(`id_usuario_negocio_FK` ASC) USING BTREE,
  INDEX `idrol`(`id_roles_FK` ASC) USING BTREE,
  CONSTRAINT `idrol` FOREIGN KEY (`id_roles_FK`) REFERENCES `catalogo_roles` (`id_roles_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rolusuarios` FOREIGN KEY (`id_usuario_negocio_FK`) REFERENCES `usuariosnegocio` (`id_usuario_negocio_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rolesnegocio
-- ----------------------------

-- ----------------------------
-- Table structure for unidades_medida
-- ----------------------------
DROP TABLE IF EXISTS `unidades_medida`;
CREATE TABLE `unidades_medida`  (
  `id_unidad_medida_PK` bigint NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nomenclatura` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_unidad_medida_PK`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of unidades_medida
-- ----------------------------

-- ----------------------------
-- Table structure for usuariosnegocio
-- ----------------------------
DROP TABLE IF EXISTS `usuariosnegocio`;
CREATE TABLE `usuariosnegocio`  (
  `id_usuario_negocio_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_persona_negocio_FK` bigint NOT NULL,
  `usuario` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `passwd` varbinary(300) NOT NULL,
  `ruta_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status_usuario` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_usuario_negocio_PK`) USING BTREE,
  INDEX `persona`(`id_persona_negocio_FK` ASC) USING BTREE,
  CONSTRAINT `usuariosnegocio_ibfk_1` FOREIGN KEY (`id_persona_negocio_FK`) REFERENCES `personalnegocio` (`id_persona_negocio_PK`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuariosnegocio
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
