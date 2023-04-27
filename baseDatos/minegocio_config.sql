/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MariaDB
 Source Server Version : 101002 (10.10.2-MariaDB)
 Source Host           : 127.0.0.1:3306
 Source Schema         : minegocio_config

 Target Server Type    : MariaDB
 Target Server Version : 101002 (10.10.2-MariaDB)
 File Encoding         : 65001

 Date: 27/04/2023 12:47:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  `nombrebd` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `clave_registro_letra` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `clave_registro_numeroS1` int(11) NULL DEFAULT NULL,
  `clave_registro_numeroS2` int(11) NULL DEFAULT NULL,
  `clave_registro_numeroS3` int(11) NULL DEFAULT NULL,
  `passwordBD` varbinary(300) NULL DEFAULT NULL,
  PRIMARY KEY (`id_tipo_negocio_PK`) USING BTREE,
  INDEX `usuarios`(`id_usuario_FK`) USING BTREE,
  CONSTRAINT `usuarios` FOREIGN KEY (`id_usuario_FK`) REFERENCES `usuarios` (`id_usuario_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of negocios_tipo
-- ----------------------------
INSERT INTO `negocios_tipo` VALUES (1, 2, 'CERVANTES VITE', 1, b'1', 'cervantesvite022123o', 'V', 456, 750, 89, 0x83DF5AFC8DE5F1B214C85248809B111E8CA76CDAC2AD863BF0924143EE04798C);

-- ----------------------------
-- Table structure for personas
-- ----------------------------
DROP TABLE IF EXISTS `personas`;
CREATE TABLE `personas`  (
  `id_persona_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `apellidos` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `telefono` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `correo` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `status_per` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_persona_PK`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personas
-- ----------------------------
INSERT INTO `personas` VALUES (2, 'EFRAIN', 'CERVANTES VITE', '7711169098', 'efraceve@gmail.com', b'1');

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `id_usuario_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_persona_FK` bigint(20) NOT NULL,
  `usuario` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `passwd` varbinary(300) NOT NULL,
  `status_usuario` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_usuario_PK`) USING BTREE,
  INDEX `persona`(`id_persona_FK`) USING BTREE,
  CONSTRAINT `persona` FOREIGN KEY (`id_persona_FK`) REFERENCES `personas` (`id_persona_PK`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES (2, 2, 'EFCE7709', 0xD004263EFA8ECCF5216CBEC4EE30B16B, b'1');

SET FOREIGN_KEY_CHECKS = 1;
