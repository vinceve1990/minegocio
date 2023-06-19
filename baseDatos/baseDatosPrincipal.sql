/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 100425 (10.4.25-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : cervantesvite022123o

 Target Server Type    : MySQL
 Target Server Version : 100425 (10.4.25-MariaDB)
 File Encoding         : 65001

 Date: 03/06/2023 03:01:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for catalogo_bancos
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_bancos`;
CREATE TABLE `catalogo_bancos`  (
  `id_catalogo_banco_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre_banco` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_banco_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Unión de los catálogos de vistas para el sistema web' ROW_FORMAT = DYNAMIC;

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
  `id_catalogo_categoria_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descripcion_cetegoria` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `color` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `iconoMaster` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_categoria_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Categorías del sistema web' ROW_FORMAT = DYNAMIC;

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
  `id_catalogo_estado_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_estado_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_estados
-- ----------------------------
INSERT INTO `catalogo_estados` VALUES (1, 'HIDALGO');
INSERT INTO `catalogo_estados` VALUES (2, 'AGUASCALIENTES');
INSERT INTO `catalogo_estados` VALUES (3, 'BAJA CALIFORNIA');
INSERT INTO `catalogo_estados` VALUES (4, 'BAJA CALIFORNIA SUR');
INSERT INTO `catalogo_estados` VALUES (5, 'CAMPECHE');
INSERT INTO `catalogo_estados` VALUES (6, 'COAHUILA DE ZARAGOZA');
INSERT INTO `catalogo_estados` VALUES (7, 'COLIMA');
INSERT INTO `catalogo_estados` VALUES (8, 'CHIAPAS');
INSERT INTO `catalogo_estados` VALUES (9, 'CHIHUAHUA');
INSERT INTO `catalogo_estados` VALUES (10, 'DISTRITO FEDERAL');
INSERT INTO `catalogo_estados` VALUES (11, 'DURANGO');
INSERT INTO `catalogo_estados` VALUES (12, 'GUANAJUATO');
INSERT INTO `catalogo_estados` VALUES (13, 'GUERRERO');
INSERT INTO `catalogo_estados` VALUES (14, 'JALISCO');
INSERT INTO `catalogo_estados` VALUES (15, 'MEXICO');
INSERT INTO `catalogo_estados` VALUES (16, 'MICHOACAN DE OCAMPO');
INSERT INTO `catalogo_estados` VALUES (17, 'MORELOS');
INSERT INTO `catalogo_estados` VALUES (18, 'NAYARIT');
INSERT INTO `catalogo_estados` VALUES (19, 'NUEVO LEÓN');
INSERT INTO `catalogo_estados` VALUES (20, 'OAXACA');
INSERT INTO `catalogo_estados` VALUES (21, 'PUEBLA');
INSERT INTO `catalogo_estados` VALUES (22, 'QUERÉTARO');
INSERT INTO `catalogo_estados` VALUES (23, 'QUINTANA ROO');
INSERT INTO `catalogo_estados` VALUES (24, 'SAN LUIS POTOSI');
INSERT INTO `catalogo_estados` VALUES (25, 'SINALOA');
INSERT INTO `catalogo_estados` VALUES (26, 'SONORA');
INSERT INTO `catalogo_estados` VALUES (27, 'TABASCO');
INSERT INTO `catalogo_estados` VALUES (28, 'TAMAULIPAS');
INSERT INTO `catalogo_estados` VALUES (29, 'VERACRUZ DE IGNACIO DE LA LLAVE');
INSERT INTO `catalogo_estados` VALUES (30, 'YUCATÁN');
INSERT INTO `catalogo_estados` VALUES (31, 'ZACATECAS');

-- ----------------------------
-- Table structure for catalogo_familia
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_familia`;
CREATE TABLE `catalogo_familia`  (
  `id_catalogo_familia_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre_familia` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descripcion_familia` varchar(350) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_familia_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_familia
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_giro
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_giro`;
CREATE TABLE `catalogo_giro`  (
  `id_catalogo_giro_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre_giro` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descripcion_giro` varchar(350) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_giro_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_giro
-- ----------------------------
INSERT INTO `catalogo_giro` VALUES (1, 'BEBIDAS GASEOSAS', 'BEBIDAS GASEOSAS, REFRESCOS');
INSERT INTO `catalogo_giro` VALUES (2, 'SUEROS', 'SUEROS');
INSERT INTO `catalogo_giro` VALUES (3, 'PAPELERIA', 'PAPELERIA');

-- ----------------------------
-- Table structure for catalogo_insumos
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_insumos`;
CREATE TABLE `catalogo_insumos`  (
  `id_catalogo_insumos_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_catalogo_familia_FK` bigint NOT NULL,
  `id_catalogo_giro_FK` bigint NOT NULL,
  `categoria` bigint NOT NULL,
  `descripcion_insumo` varchar(350) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `desc_corta` varchar(350) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_catalogo_insumos_PK`) USING BTREE,
  INDEX `familiasCat`(`id_catalogo_familia_FK` ASC) USING BTREE,
  INDEX `girosCat`(`id_catalogo_giro_FK` ASC) USING BTREE,
  CONSTRAINT `familiasCat` FOREIGN KEY (`id_catalogo_familia_FK`) REFERENCES `catalogo_familia` (`id_catalogo_familia_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `girosIns` FOREIGN KEY (`id_catalogo_giro_FK`) REFERENCES `catalogo_giro` (`id_catalogo_giro_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_insumos
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_insumos_precio
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_insumos_precio`;
CREATE TABLE `catalogo_insumos_precio`  (
  `id_catalogo_insumos_precio_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_catalogo_insumos_presentacion_FK` bigint NOT NULL,
  `precio_compra` double NOT NULL,
  `precio_venta` double NOT NULL,
  `precio_mayoreo` double NOT NULL,
  PRIMARY KEY (`id_catalogo_insumos_precio_PK`) USING BTREE,
  INDEX `preciosCat`(`id_catalogo_insumos_presentacion_FK` ASC) USING BTREE,
  CONSTRAINT `preciosCat` FOREIGN KEY (`id_catalogo_insumos_presentacion_FK`) REFERENCES `catalogo_insumos_presentacion` (`id_catalogo_insumos_presentacion_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_insumos_precio
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_insumos_presentacion
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_insumos_presentacion`;
CREATE TABLE `catalogo_insumos_presentacion`  (
  `id_catalogo_insumos_presentacion_PK` bigint NOT NULL AUTO_INCREMENT,
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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
  `descripcion_interfaz` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Descripción de lo que hace la interfaz ',
  `icono` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `url_interfaz` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_catalogo_interfaz_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Catálogo de interfaz creadas para el sistema web' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_interfaz
-- ----------------------------
INSERT INTO `catalogo_interfaz` VALUES (1, 'PROVEEDORES', 'ALTA, BAJA Y EDICION DE PROVEEDORES', 'fa-truck-field', '/paneles/dashboards/proveedores');
INSERT INTO `catalogo_interfaz` VALUES (2, 'PROVEEDORES', 'REPORTE DE PROVEEDORES', 'fa-truck-fast', NULL);
INSERT INTO `catalogo_interfaz` VALUES (3, 'CLIENTES', 'ALTA, BAJA Y EDICION DE CLIENTES', 'fa-users', NULL);
INSERT INTO `catalogo_interfaz` VALUES (4, 'CLIENTES', 'REPORTE DE CLIENTES', 'fa-clipboard-user', NULL);
INSERT INTO `catalogo_interfaz` VALUES (5, 'INSUMOS', 'ALTA, BAJA Y EDICION DE INSUMOS', NULL, NULL);
INSERT INTO `catalogo_interfaz` VALUES (6, 'INSUMOS', 'REPORTE DE INSUMOS', NULL, NULL);

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
  `id_catalogo_municipios_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_catalogo_estado_FK` bigint NOT NULL,
  `nombre_municipio` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `claveMunicipio` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cp` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_catalogo_municipios_PK`) USING BTREE,
  INDEX `municipiosEstado`(`id_catalogo_estado_FK` ASC) USING BTREE,
  CONSTRAINT `municipiosEstado` FOREIGN KEY (`id_catalogo_estado_FK`) REFERENCES `catalogo_estados` (`id_catalogo_estado_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 169 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_municipios
-- ----------------------------
INSERT INTO `catalogo_municipios` VALUES (3, 1, 'Pachuca de Soto', '48', 42001);
INSERT INTO `catalogo_municipios` VALUES (4, 1, 'Pachuca de Soto', '48', 42091);
INSERT INTO `catalogo_municipios` VALUES (5, 1, 'Mineral del Chico', '38', 42001);
INSERT INTO `catalogo_municipios` VALUES (6, 1, 'Mineral del Monte', '39', 42131);
INSERT INTO `catalogo_municipios` VALUES (7, 1, 'Ajacuba', '5', 42951);
INSERT INTO `catalogo_municipios` VALUES (8, 1, 'San Agustín Tlaxiaca', '52', 42001);
INSERT INTO `catalogo_municipios` VALUES (9, 1, 'Mineral de la Reforma', '51', 42001);
INSERT INTO `catalogo_municipios` VALUES (10, 1, 'Mineral de la Reforma', '51', 42091);
INSERT INTO `catalogo_municipios` VALUES (11, 1, 'Zapotlán de Juárez', '82', 42091);
INSERT INTO `catalogo_municipios` VALUES (12, 1, 'Jacala de Ledezma', '31', 42202);
INSERT INTO `catalogo_municipios` VALUES (13, 1, 'Pisaflores', '49', 42281);
INSERT INTO `catalogo_municipios` VALUES (14, 1, 'Pacula', '47', 42202);
INSERT INTO `catalogo_municipios` VALUES (15, 1, 'La Misión', '40', 42202);
INSERT INTO `catalogo_municipios` VALUES (16, 1, 'Chapulhuacán', '18', 42281);
INSERT INTO `catalogo_municipios` VALUES (17, 1, 'Ixmiquilpan', '30', 42301);
INSERT INTO `catalogo_municipios` VALUES (18, 1, 'Zimapán', '84', 42331);
INSERT INTO `catalogo_municipios` VALUES (19, 1, 'Nicolás Flores', '43', 42301);
INSERT INTO `catalogo_municipios` VALUES (20, 1, 'Cardonal', '15', 42301);
INSERT INTO `catalogo_municipios` VALUES (21, 1, 'Tasquillo', '58', 42301);
INSERT INTO `catalogo_municipios` VALUES (22, 1, 'Alfajayucan', '6', 42301);
INSERT INTO `catalogo_municipios` VALUES (23, 1, 'Huichapan', '29', 42401);
INSERT INTO `catalogo_municipios` VALUES (24, 1, 'Tecozautla', '59', 42301);
INSERT INTO `catalogo_municipios` VALUES (25, 1, 'Nopala de Villagrán', '44', 42401);
INSERT INTO `catalogo_municipios` VALUES (26, 1, 'Actopan', '3', 42501);
INSERT INTO `catalogo_municipios` VALUES (27, 1, 'Santiago de Anaya', '55', 42501);
INSERT INTO `catalogo_municipios` VALUES (28, 1, 'San Salvador', '54', 42501);
INSERT INTO `catalogo_municipios` VALUES (29, 1, 'Francisco I. Madero', '23', 42731);
INSERT INTO `catalogo_municipios` VALUES (30, 1, 'El Arenal', '9', 42501);
INSERT INTO `catalogo_municipios` VALUES (31, 1, 'Mixquiahuala de Juárez', '41', 42701);
INSERT INTO `catalogo_municipios` VALUES (32, 1, 'Progreso de Obregón', '50', 42731);
INSERT INTO `catalogo_municipios` VALUES (33, 1, 'Chilcuautla', '19', 42731);
INSERT INTO `catalogo_municipios` VALUES (34, 1, 'Tezontepec de Aldama', '67', 42701);
INSERT INTO `catalogo_municipios` VALUES (35, 1, 'Tlahuelilpan', '70', 42781);
INSERT INTO `catalogo_municipios` VALUES (36, 1, 'Tula de Allende', '76', 42801);
INSERT INTO `catalogo_municipios` VALUES (37, 1, 'Tula de Allende', '76', 42841);
INSERT INTO `catalogo_municipios` VALUES (38, 1, 'Tepeji del Río de Ocampo', '63', 42851);
INSERT INTO `catalogo_municipios` VALUES (39, 1, 'Chapantongo', '17', 42801);
INSERT INTO `catalogo_municipios` VALUES (40, 1, 'Tepetitlán', '64', 42801);
INSERT INTO `catalogo_municipios` VALUES (41, 1, 'Tetepango', '65', 42951);
INSERT INTO `catalogo_municipios` VALUES (42, 1, 'Tlaxcoapan', '74', 42951);
INSERT INTO `catalogo_municipios` VALUES (43, 1, 'Atitalaquia', '10', 42951);
INSERT INTO `catalogo_municipios` VALUES (44, 1, 'Atotonilco de Tula', '13', 42951);
INSERT INTO `catalogo_municipios` VALUES (45, 1, 'Huejutla de Reyes', '28', 43007);
INSERT INTO `catalogo_municipios` VALUES (46, 1, 'San Felipe Orizatlán', '46', 43007);
INSERT INTO `catalogo_municipios` VALUES (47, 1, 'Jaltocán', '32', 43007);
INSERT INTO `catalogo_municipios` VALUES (48, 1, 'Huautla', '25', 43007);
INSERT INTO `catalogo_municipios` VALUES (49, 1, 'Atlapexco', '11', 43007);
INSERT INTO `catalogo_municipios` VALUES (50, 1, 'Huazalingo', '26', 43007);
INSERT INTO `catalogo_municipios` VALUES (51, 1, 'Yahualica', '80', 43007);
INSERT INTO `catalogo_municipios` VALUES (52, 1, 'Xochiatipan', '78', 43007);
INSERT INTO `catalogo_municipios` VALUES (53, 1, 'Molango de Escamilla', '42', 43207);
INSERT INTO `catalogo_municipios` VALUES (54, 1, 'Tepehuacán de Guerrero', '62', 43007);
INSERT INTO `catalogo_municipios` VALUES (55, 1, 'Lolotla', '34', 43207);
INSERT INTO `catalogo_municipios` VALUES (56, 1, 'Tlanchinol', '73', 43007);
INSERT INTO `catalogo_municipios` VALUES (57, 1, 'Tlahuiltepa', '71', 43207);
INSERT INTO `catalogo_municipios` VALUES (58, 1, 'Juárez Hidalgo', '33', 43207);
INSERT INTO `catalogo_municipios` VALUES (59, 1, 'Zacualtipán de Ángeles', '81', 43207);
INSERT INTO `catalogo_municipios` VALUES (60, 1, 'Calnali', '14', 43007);
INSERT INTO `catalogo_municipios` VALUES (61, 1, 'Xochicoatlán', '79', 43207);
INSERT INTO `catalogo_municipios` VALUES (62, 1, 'Tianguistengo', '68', 43207);
INSERT INTO `catalogo_municipios` VALUES (63, 1, 'Atotonilco el Grande', '12', 43303);
INSERT INTO `catalogo_municipios` VALUES (64, 1, 'Eloxochitlán', '20', 43207);
INSERT INTO `catalogo_municipios` VALUES (65, 1, 'Metztitlán', '37', 43207);
INSERT INTO `catalogo_municipios` VALUES (66, 1, 'San Agustín Metzquititlán', '36', 43207);
INSERT INTO `catalogo_municipios` VALUES (67, 1, 'Metepec', '35', 43601);
INSERT INTO `catalogo_municipios` VALUES (68, 1, 'Huehuetla', '27', 43601);
INSERT INTO `catalogo_municipios` VALUES (69, 1, 'San Bartolo Tutotepec', '53', 43601);
INSERT INTO `catalogo_municipios` VALUES (70, 1, 'Agua Blanca de Iturbide', '4', 43601);
INSERT INTO `catalogo_municipios` VALUES (71, 1, 'Tenango de Doria', '60', 43601);
INSERT INTO `catalogo_municipios` VALUES (72, 1, 'Huasca de Ocampo', '24', 42001);
INSERT INTO `catalogo_municipios` VALUES (73, 1, 'Acatlán', '1', 43601);
INSERT INTO `catalogo_municipios` VALUES (74, 1, 'Omitlán de Juárez', '45', 42001);
INSERT INTO `catalogo_municipios` VALUES (75, 1, 'Epazoyucan', '22', 42001);
INSERT INTO `catalogo_municipios` VALUES (76, 1, 'Tulancingo de Bravo', '77', 43601);
INSERT INTO `catalogo_municipios` VALUES (77, 1, 'Acaxochitlán', '2', 43601);
INSERT INTO `catalogo_municipios` VALUES (78, 1, 'Cuautepec de Hinojosa', '16', 43741);
INSERT INTO `catalogo_municipios` VALUES (79, 1, 'Santiago Tulantepec de Lugo Guerrero', '56', 43601);
INSERT INTO `catalogo_municipios` VALUES (80, 1, 'Singuilucan', '57', 43601);
INSERT INTO `catalogo_municipios` VALUES (81, 1, 'Tizayuca', '69', 43801);
INSERT INTO `catalogo_municipios` VALUES (82, 1, 'Zempoala', '83', 43992);
INSERT INTO `catalogo_municipios` VALUES (83, 1, 'Zempoala', '83', 42091);
INSERT INTO `catalogo_municipios` VALUES (84, 1, 'Tolcayuca', '75', 43801);
INSERT INTO `catalogo_municipios` VALUES (85, 1, 'Villa de Tezontepec', '66', 43801);
INSERT INTO `catalogo_municipios` VALUES (86, 1, 'Apan', '8', 43901);
INSERT INTO `catalogo_municipios` VALUES (87, 1, 'Tlanalapa', '72', 43992);
INSERT INTO `catalogo_municipios` VALUES (88, 1, 'Almoloya', '7', 43901);
INSERT INTO `catalogo_municipios` VALUES (89, 1, 'Emiliano Zapata', '21', 43992);
INSERT INTO `catalogo_municipios` VALUES (90, 1, 'Tepeapulco', '61', 43992);
INSERT INTO `catalogo_municipios` VALUES (91, 2, 'Aguascalientes', '1', 20001);
INSERT INTO `catalogo_municipios` VALUES (92, 2, 'Aguascalientes', '1', 20293);
INSERT INTO `catalogo_municipios` VALUES (93, 2, 'San Francisco de los Romo', '11', 20671);
INSERT INTO `catalogo_municipios` VALUES (94, 2, 'Aguascalientes', '1', 20999);
INSERT INTO `catalogo_municipios` VALUES (95, 2, 'Aguascalientes', '1', 20921);
INSERT INTO `catalogo_municipios` VALUES (96, 2, 'El Llano', '10', 20999);
INSERT INTO `catalogo_municipios` VALUES (97, 2, 'San Francisco de los Romo', '11', 20999);
INSERT INTO `catalogo_municipios` VALUES (98, 2, 'San Francisco de los Romo', '11', 20001);
INSERT INTO `catalogo_municipios` VALUES (99, 2, 'Rincón de Romos', '7', 20401);
INSERT INTO `catalogo_municipios` VALUES (100, 2, 'Rincón de Romos', '7', 20671);
INSERT INTO `catalogo_municipios` VALUES (101, 2, 'Cosío', '4', 20401);
INSERT INTO `catalogo_municipios` VALUES (102, 2, 'San José de Gracia', '8', 20671);
INSERT INTO `catalogo_municipios` VALUES (103, 2, 'Tepezalá', '9', 20401);
INSERT INTO `catalogo_municipios` VALUES (104, 2, 'Tepezalá', '9', 20671);
INSERT INTO `catalogo_municipios` VALUES (105, 2, 'Pabellón de Arteaga', '6', 20671);
INSERT INTO `catalogo_municipios` VALUES (106, 2, 'Asientos', '2', 20999);
INSERT INTO `catalogo_municipios` VALUES (107, 2, 'Asientos', '2', 20401);
INSERT INTO `catalogo_municipios` VALUES (108, 2, 'Asientos', '2', 20671);
INSERT INTO `catalogo_municipios` VALUES (109, 2, 'Calvillo', '3', 20801);
INSERT INTO `catalogo_municipios` VALUES (110, 2, 'Jesús María', '5', 20921);
INSERT INTO `catalogo_municipios` VALUES (111, 2, 'Jesús María', '5', 20671);
INSERT INTO `catalogo_municipios` VALUES (112, 2, 'Jesús María', '5', 20999);
INSERT INTO `catalogo_municipios` VALUES (113, 3, 'Mexicali', '2', 21101);
INSERT INTO `catalogo_municipios` VALUES (114, 3, 'Mexicali', '2', 21105);
INSERT INTO `catalogo_municipios` VALUES (115, 3, 'Mexicali', '2', 21392);
INSERT INTO `catalogo_municipios` VALUES (116, 3, 'Tecate', '3', 21401);
INSERT INTO `catalogo_municipios` VALUES (117, 3, 'Mexicali', '2', 21724);
INSERT INTO `catalogo_municipios` VALUES (118, 3, 'Mexicali', '2', 21901);
INSERT INTO `catalogo_municipios` VALUES (119, 3, 'San Felipe', '7', 21851);
INSERT INTO `catalogo_municipios` VALUES (120, 3, 'Tijuana', '4', 22001);
INSERT INTO `catalogo_municipios` VALUES (121, 3, 'Tijuana', '4', 22101);
INSERT INTO `catalogo_municipios` VALUES (122, 3, 'Playas de Rosarito', '5', 22701);
INSERT INTO `catalogo_municipios` VALUES (123, 3, 'Ensenada', '1', 22801);
INSERT INTO `catalogo_municipios` VALUES (124, 3, 'Ensenada', '1', 22901);
INSERT INTO `catalogo_municipios` VALUES (125, 3, 'San Quintín', '6', 22901);
INSERT INTO `catalogo_municipios` VALUES (126, 3, 'San Quintín', '6', 22923);
INSERT INTO `catalogo_municipios` VALUES (127, 3, 'San Quintín', '6', 22935);
INSERT INTO `catalogo_municipios` VALUES (128, 3, 'San Quintín', '6', 23941);
INSERT INTO `catalogo_municipios` VALUES (129, 4, 'La Paz', '3', 23001);
INSERT INTO `catalogo_municipios` VALUES (130, 4, 'La Paz', '3', 23202);
INSERT INTO `catalogo_municipios` VALUES (131, 4, 'La Paz', '3', 23601);
INSERT INTO `catalogo_municipios` VALUES (132, 4, 'La Paz', '3', 23231);
INSERT INTO `catalogo_municipios` VALUES (133, 4, 'La Paz', '3', 23301);
INSERT INTO `catalogo_municipios` VALUES (134, 4, 'La Paz', '3', 23331);
INSERT INTO `catalogo_municipios` VALUES (135, 4, 'La Paz', '3', 23401);
INSERT INTO `catalogo_municipios` VALUES (136, 4, 'Los Cabos', '8', 23401);
INSERT INTO `catalogo_municipios` VALUES (137, 4, 'Los Cabos', '8', 23452);
INSERT INTO `catalogo_municipios` VALUES (138, 4, 'Los Cabos', '8', 23502);
INSERT INTO `catalogo_municipios` VALUES (139, 4, 'Los Cabos', '8', 23331);
INSERT INTO `catalogo_municipios` VALUES (140, 4, 'Comondú', '1', 23601);
INSERT INTO `catalogo_municipios` VALUES (141, 4, 'Comondú', '1', 23702);
INSERT INTO `catalogo_municipios` VALUES (142, 4, 'Comondú', '1', 23711);
INSERT INTO `catalogo_municipios` VALUES (143, 4, 'Comondú', '1', 23741);
INSERT INTO `catalogo_municipios` VALUES (144, 4, 'Loreto', '9', 23881);
INSERT INTO `catalogo_municipios` VALUES (145, 4, 'Mulegé', '2', 23901);
INSERT INTO `catalogo_municipios` VALUES (146, 4, 'Mulegé', '2', 23925);
INSERT INTO `catalogo_municipios` VALUES (147, 4, 'Mulegé', '2', 23932);
INSERT INTO `catalogo_municipios` VALUES (148, 4, 'Mulegé', '2', 23941);
INSERT INTO `catalogo_municipios` VALUES (149, 4, 'Mulegé', '2', 23953);
INSERT INTO `catalogo_municipios` VALUES (150, 5, 'Campeche', '2', 24003);
INSERT INTO `catalogo_municipios` VALUES (151, 5, 'Carmen', '3', 24101);
INSERT INTO `catalogo_municipios` VALUES (152, 5, 'Palizada', '7', 86784);
INSERT INTO `catalogo_municipios` VALUES (153, 5, 'Carmen', '3', 24401);
INSERT INTO `catalogo_municipios` VALUES (154, 5, 'Carmen', '3', 24351);
INSERT INTO `catalogo_municipios` VALUES (155, 5, 'Candelaria', '11', 24331);
INSERT INTO `catalogo_municipios` VALUES (156, 5, 'Escárcega', '9', 24351);
INSERT INTO `catalogo_municipios` VALUES (157, 5, 'Champotón', '4', 24401);
INSERT INTO `catalogo_municipios` VALUES (158, 5, 'Champotón', '4', 24351);
INSERT INTO `catalogo_municipios` VALUES (159, 5, 'Seybaplaya', '12', 24001);
INSERT INTO `catalogo_municipios` VALUES (160, 5, 'Seybaplaya', '12', 24401);
INSERT INTO `catalogo_municipios` VALUES (161, 5, 'Campeche', '2', 24001);
INSERT INTO `catalogo_municipios` VALUES (162, 5, 'Campeche', '2', 24571);
INSERT INTO `catalogo_municipios` VALUES (163, 5, 'Hopelchén', '6', 24001);
INSERT INTO `catalogo_municipios` VALUES (164, 5, 'Calakmul', '10', 24351);
INSERT INTO `catalogo_municipios` VALUES (165, 5, 'Tenabo', '8', 24801);
INSERT INTO `catalogo_municipios` VALUES (166, 5, 'Hecelchakán', '5', 24801);
INSERT INTO `catalogo_municipios` VALUES (167, 5, 'Calkiní', '1', 24901);
INSERT INTO `catalogo_municipios` VALUES (168, 5, 'Dzitbalché', '13', 24901);

-- ----------------------------
-- Table structure for catalogo_proveedor_contacto
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_proveedor_contacto`;
CREATE TABLE `catalogo_proveedor_contacto`  (
  `id_proveedor_contacto_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_catalogo_proveedor_FK` bigint NOT NULL,
  `nombre_contacto` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telefono` int NOT NULL,
  `ext_tel` int NOT NULL,
  `email_proveedor` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_proveedor_contacto_PK`) USING BTREE,
  INDEX `proveedorContacto`(`id_catalogo_proveedor_FK` ASC) USING BTREE,
  CONSTRAINT `proveedorContacto` FOREIGN KEY (`id_catalogo_proveedor_FK`) REFERENCES `catalogo_proveedores` (`id_catalogo_proveedor_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Catálogo de contactos interno del proveedor ' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_proveedor_contacto
-- ----------------------------

-- ----------------------------
-- Table structure for catalogo_proveedores
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_proveedores`;
CREATE TABLE `catalogo_proveedores`  (
  `id_catalogo_proveedor_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `rfc` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'Sin RFC',
  `email_principal` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'Sin Email',
  `calle` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_catalogo_estado_FK` bigint NOT NULL,
  `id_catalogo_municipios_FK` bigint NOT NULL,
  `cp` int NOT NULL,
  `telefono` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `id_catalogo_giro_FK` bigint NOT NULL,
  `status_proveedor` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id_catalogo_proveedor_PK`) USING BTREE,
  INDEX `estado`(`id_catalogo_estado_FK` ASC) USING BTREE,
  INDEX `municipios`(`id_catalogo_municipios_FK` ASC) USING BTREE,
  INDEX `giros`(`id_catalogo_giro_FK` ASC) USING BTREE,
  CONSTRAINT `estado` FOREIGN KEY (`id_catalogo_estado_FK`) REFERENCES `catalogo_estados` (`id_catalogo_estado_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `giros` FOREIGN KEY (`id_catalogo_giro_FK`) REFERENCES `catalogo_giro` (`id_catalogo_giro_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `municipios` FOREIGN KEY (`id_catalogo_municipios_FK`) REFERENCES `catalogo_municipios` (`id_catalogo_municipios_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catalogo_proveedores
-- ----------------------------
INSERT INTO `catalogo_proveedores` VALUES (1, 'INDUSTRIA MEXICANA DE COCA-COLA', 'IHD050718UN4', 'servicenter@rica.com.mx', 'Camino a Pozos Téllez km 1.5 ', 1, 3, 42186, '7717741373', 1, b'1');
INSERT INTO `catalogo_proveedores` VALUES (2, 'PEPSI', 'Sin RFC', 'Sin Email', 'Carretera Ciudad Zahui Kilómetro 8.5', 1, 3, 42039, '7717188012', 1, b'1');
INSERT INTO `catalogo_proveedores` VALUES (3, 'SERVICIOS HOME DEPOT, S.A. DE C.V.', 'SHD940509I58', 'Sin Email', 'Ricardo Margain Zozaya', 1, 26, 66267, '', 1, b'1');
INSERT INTO `catalogo_proveedores` VALUES (5, 'EFRAIN CEVE', 'CEVE900711R53', 'EFRACEVE@GMAIL.COM', 'NEVADO DE TEYTEPC  No.125', 2, 95, 42088, '7711169098', 2, b'1');
INSERT INTO `catalogo_proveedores` VALUES (6, 'KEREN RACK', 'RACK900711R55', 'vin_ceve1990@hotmail.com', 'NEVADO DE TEYTEPC  No.125', 2, 95, 42088, '7711169098', 2, b'1');
INSERT INTO `catalogo_proveedores` VALUES (7, 'KEREN RACK', 'RACK900711R55', 'efraceve@gmail.com', 'NEVADO DE TEYTEPC  No.125', 1, 4, 42088, '7711169098', 3, b'1');
INSERT INTO `catalogo_proveedores` VALUES (8, 'EFRAIN CEVE', 'CEVE900711R53', 'vin_ceve1990@hotmail.com', 'NEVADO DE TEYTEPC  No.125', 2, 94, 42088, '7711169098', 1, b'1');
INSERT INTO `catalogo_proveedores` VALUES (9, 'EFRAIN CEVE', 'CEVE900711R53', 'vin_ceve1990@hotmail.com', 'NEVADO DE TEYTEPC  No.125', 2, 92, 42088, '7711169098', 1, b'1');
INSERT INTO `catalogo_proveedores` VALUES (10, 'EFRAIN CEVE', 'CEVE900711R53', 'vin_ceve1990@hotmail.com', 'NEVADO DE TEYTEPC  No.125', 1, 4, 42088, '7711169098', 1, b'1');
INSERT INTO `catalogo_proveedores` VALUES (11, 'EFRAIN CEVE', 'CEVE900711R53', 'vin_ceve1990@hotmail.com', 'NEVADO DE TEYTEPC  No.125', 2, 91, 42088, '7711169098', 1, b'1');
INSERT INTO `catalogo_proveedores` VALUES (12, 'OSCAR CEVE', 'OEVE900711R53', 'adriana2610_amerik@hotmail.com', 'NEVADO DE TEYTEPC  No.125', 1, 3, 42088, '7711169098', 1, b'1');

-- ----------------------------
-- Table structure for catalogo_proveedores_banco
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_proveedores_banco`;
CREATE TABLE `catalogo_proveedores_banco`  (
  `id_catalogo_proveedor_banco` bigint NOT NULL AUTO_INCREMENT,
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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Catálogo de bancos que tiene cada proveedor ' ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `catalogo_roles` VALUES (9, 'Programador', b'1');
INSERT INTO `catalogo_roles` VALUES (10, 'Programador JR', b'1');
INSERT INTO `catalogo_roles` VALUES (11, 'Programador SR', b'1');
INSERT INTO `catalogo_roles` VALUES (12, 'Analista', b'1');
INSERT INTO `catalogo_roles` VALUES (13, 'Analista B', b'1');
INSERT INTO `catalogo_roles` VALUES (14, 'Analista C', b'1');
INSERT INTO `catalogo_roles` VALUES (15, 'Jefe Almacen JR', b'1');
INSERT INTO `catalogo_roles` VALUES (16, 'Analista X', b'1');
INSERT INTO `catalogo_roles` VALUES (17, 'Cargador', b'1');
INSERT INTO `catalogo_roles` VALUES (18, 'Analista Y', b'1');
INSERT INTO `catalogo_roles` VALUES (19, 'dddd', b'1');

-- ----------------------------
-- Table structure for catalogo_roles_permisos_interfaz
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_roles_permisos_interfaz`;
CREATE TABLE `catalogo_roles_permisos_interfaz`  (
  `id_cat_rol_permiso_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_roles_FK` bigint NOT NULL,
  `id_catalogo_interfaz_FK` bigint NOT NULL,
  `status` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_cat_rol_permiso_PK`) USING BTREE,
  INDEX `FK_roles`(`id_roles_FK` ASC) USING BTREE,
  INDEX `FK_interfaz`(`id_catalogo_interfaz_FK` ASC) USING BTREE,
  CONSTRAINT `FK_interfaz` FOREIGN KEY (`id_catalogo_interfaz_FK`) REFERENCES `catalogo_interfaz` (`id_catalogo_interfaz_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_roles` FOREIGN KEY (`id_roles_FK`) REFERENCES `catalogo_roles` (`id_roles_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Las interfaces que puede utilizar el rol' ROW_FORMAT = DYNAMIC;

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
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (22, 3, 1, b'1');
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (23, 3, 2, b'1');

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
  `id_persona_negocio_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `apellidos` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sexo` int NULL DEFAULT 0 COMMENT '0=no aplica, 1=hombre, 2=mujer',
  `curp` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telefono` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `correo` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status_per` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_persona_negocio_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
  `id_unidad_medida_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nomenclatura` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_unidad_medida_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
  CONSTRAINT `usuariosnegocio_ibfk_1` FOREIGN KEY (`id_persona_negocio_FK`) REFERENCES `personalnegocio` (`id_persona_negocio_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuariosnegocio
-- ----------------------------
INSERT INTO `usuariosnegocio` VALUES (1, 1, 'EFCE7709', 0xA53708D2885B507B6E9AF8C31E8131C0, '/fotos/farmacom2/1.PNG', b'1');
INSERT INTO `usuariosnegocio` VALUES (2, 2, 'OSCE7709', 0x9C86AF35C0526315FBD4CE499585BA6F, '/fotos/farmacom2/2.JPG', b'1');
INSERT INTO `usuariosnegocio` VALUES (3, 3, 'URCE7709', 0x00419B92828134110439113104CFBA75, NULL, b'1');

-- ----------------------------
-- View structure for categoriasactivos
-- ----------------------------
DROP VIEW IF EXISTS `categoriasactivos`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `categoriasactivos` AS SELECT a.*, b.id_roles_FK FROM catalogo_categoria_grupos a, catalogo_roles_permisos_interfaz b WHERE b.id_catalogo_interfaz_FK = a.id_catalogo_interfaz_FK GROUP BY a.id_catalogo_categoria_FK, b.id_roles_FK ; ;

-- ----------------------------
-- View structure for interfacesactivos
-- ----------------------------
DROP VIEW IF EXISTS `interfacesactivos`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `interfacesactivos` AS SELECT a.*, b.id_roles_FK, c.id_catalogo_categoria_FK FROM catalogo_interfaz a, catalogo_roles_permisos_interfaz b, catalogo_categoria_grupos c WHERE a.id_catalogo_interfaz_PK = b.id_catalogo_interfaz_FK AND a.id_catalogo_interfaz_PK = c.id_catalogo_interfaz_FK ; ;

SET FOREIGN_KEY_CHECKS = 1;
