/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 100424 (10.4.24-MariaDB)
 Source Host           : 127.0.0.1:3306
 Source Schema         : minegocio_config

 Target Server Type    : MySQL
 Target Server Version : 100424 (10.4.24-MariaDB)
 File Encoding         : 65001

 Date: 15/10/2022 09:25:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for catalogo_roles
-- ----------------------------
DROP TABLE IF EXISTS `catalogo_roles`;
CREATE TABLE `catalogo_roles`  (
  `id_roles_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` bit(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id_roles_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalogo_roles
-- ----------------------------
INSERT INTO `catalogo_roles` VALUES (1, 'Admin', b'1');
INSERT INTO `catalogo_roles` VALUES (2, 'Presidente', b'1');
INSERT INTO `catalogo_roles` VALUES (3, 'Almacenista', b'1');

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
  CONSTRAINT `usuarios` FOREIGN KEY (`id_usuario_FK`) REFERENCES `usuarios` (`id_usuario_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of negocios_tipo
-- ----------------------------
INSERT INTO `negocios_tipo` VALUES (1, 1, 'FARMACIAS LITE', 2, b'1');

-- ----------------------------
-- Table structure for personalnegocio
-- ----------------------------
DROP TABLE IF EXISTS `personalnegocio`;
CREATE TABLE `personalnegocio`  (
  `id_persona_negocio_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_tipo_negocio_FK` bigint NULL DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `apellidos` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sexo` int NULL DEFAULT 0 COMMENT '0=no aplica, 1=hombre, 2=mujer',
  `curp` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telefono` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `correo` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status_per` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_persona_negocio_PK`) USING BTREE,
  INDEX `personanegocio`(`id_tipo_negocio_FK` ASC) USING BTREE,
  CONSTRAINT `personanegocio` FOREIGN KEY (`id_tipo_negocio_FK`) REFERENCES `negocios_tipo` (`id_tipo_negocio_PK`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of personalnegocio
-- ----------------------------
INSERT INTO `personalnegocio` VALUES (1, 1, 'EFRAIN', 'CERVANTES VITE', 1, 'CEVE900711HHGRTF06', '7711169098', 'efraceve@gmail.com', b'1');
INSERT INTO `personalnegocio` VALUES (2, 1, 'CITLALLI', 'CERVANTES RAMIREZ', 2, 'CEVE900711HHGRTF00', '7711169099', 'vin_ceve1990@hotmail.com', b'0');

-- ----------------------------
-- Table structure for personas
-- ----------------------------
DROP TABLE IF EXISTS `personas`;
CREATE TABLE `personas`  (
  `id_persona_PK` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `apellidos` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telefono` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `correo` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status_per` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_persona_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of personas
-- ----------------------------
INSERT INTO `personas` VALUES (1, 'EFRAIN', 'CERVANTES VITE', '7711169098', 'efraceve@gmail.com', b'1');

-- ----------------------------
-- Table structure for rolesnegocio
-- ----------------------------
DROP TABLE IF EXISTS `rolesnegocio`;
CREATE TABLE `rolesnegocio`  (
  `id_roles_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_usuario_negocio_FK` bigint NULL DEFAULT NULL,
  `id_roles_FK` bigint NULL DEFAULT NULL,
  `nombreRol` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'nombre del rol',
  `status_rol` bit(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id_roles_PK`) USING BTREE,
  INDEX `usuario`(`id_usuario_negocio_FK` ASC) USING BTREE,
  INDEX `idrol`(`id_roles_FK` ASC) USING BTREE,
  CONSTRAINT `idrol` FOREIGN KEY (`id_roles_FK`) REFERENCES `catalogo_roles` (`id_roles_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rolusuarios` FOREIGN KEY (`id_usuario_negocio_FK`) REFERENCES `usuariosnegocio` (`id_usuario_negocio_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of rolesnegocio
-- ----------------------------
INSERT INTO `rolesnegocio` VALUES (1, 1, 1, 'admin', b'1');
INSERT INTO `rolesnegocio` VALUES (2, 2, 2, 'Presidente', b'1');

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `id_usuario_PK` bigint NOT NULL AUTO_INCREMENT,
  `id_persona_FK` bigint NOT NULL,
  `usuario` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `passwd` varbinary(300) NOT NULL,
  `status_usuario` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_usuario_PK`) USING BTREE,
  INDEX `persona`(`id_persona_FK` ASC) USING BTREE,
  CONSTRAINT `persona` FOREIGN KEY (`id_persona_FK`) REFERENCES `personas` (`id_persona_PK`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES (1, 1, 'EFCE7709', 0xC398C5E8014DC15B2329547C6DC35044, b'1');

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuariosnegocio
-- ----------------------------
INSERT INTO `usuariosnegocio` VALUES (1, 1, 'EFCE7709', 0xC398C5E8014DC15B2329547C6DC35044, '/fotos/farmacom2/1.JPG', b'1');
INSERT INTO `usuariosnegocio` VALUES (2, 2, 'CICE7709', 0xD02C5539607349B9C4BB7E54E5AD20C1, '/fotos/farmacom2/2.JPG', b'0');

SET FOREIGN_KEY_CHECKS = 1;
