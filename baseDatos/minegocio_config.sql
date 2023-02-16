/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 100425 (10.4.25-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : minegocio_config

 Target Server Type    : MySQL
 Target Server Version : 100425 (10.4.25-MariaDB)
 File Encoding         : 65001

 Date: 28/01/2023 18:12:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  `nombrebd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `clave_registro_letra` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `clave_registro_numeroS1` int NULL DEFAULT NULL,
  `clave_registro_numeroS2` int NULL DEFAULT NULL,
  `clave_registro_numeroS3` int NULL DEFAULT NULL,
  `passwordBD` varbinary(300) NULL DEFAULT NULL,
  PRIMARY KEY (`id_tipo_negocio_PK`) USING BTREE,
  INDEX `usuarios`(`id_usuario_FK` ASC) USING BTREE,
  CONSTRAINT `usuarios` FOREIGN KEY (`id_usuario_FK`) REFERENCES `usuarios` (`id_usuario_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of negocios_tipo
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of personas
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuarios
-- ----------------------------

-- ----------------------------
-- Procedure structure for crear_registro_usuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `crear_registro_usuario`;
delimiter ;;
CREATE PROCEDURE `crear_registro_usuario`(idtiponegocioPK INT, nombreBD VARCHAR(255))
BEGIN
	
	SET @idPers:=(SELECT id_persona_PK FROM personas, usuarios, negocios_tipo WHERE id_usuario_FK = id_usuario_PK AND id_persona_FK = id_persona_PK AND id_tipo_negocio_PK = idtiponegocioPK);
	
	#minegocio_basedatos.personalnegocio
	INSERT INTO nombreBD.personalnegocio(nombre, apellidos, telefono, correo, status_per) SELECT nombre, apellidos, telefono, correo, status_per FROM personas WHERE id_persona_PK = @idPers;
	
	#minegocio_basedatos.usuariosnegocio
	
	#minegocio_basedatos.negocios_tipo
	#minegocio_basedatos.rolesnegocio solo el 1 = Admin
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
