-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: cervantesvite022123o
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.25-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `catalogo_bancos`
--

DROP TABLE IF EXISTS `catalogo_bancos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_bancos` (
  `id_catalogo_banco_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_banco` varchar(100) NOT NULL,
  PRIMARY KEY (`id_catalogo_banco_PK`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_bancos`
--

LOCK TABLES `catalogo_bancos` WRITE;
/*!40000 ALTER TABLE `catalogo_bancos` DISABLE KEYS */;
INSERT INTO `catalogo_bancos` VALUES (4,'Banco Nacional de México (Banamex)'),(5,'Banco Santander México'),(6,'BBVA México'),(7,'Banco Azteca'),(8,'Scotiabank México'),(9,'HSBC México'),(10,'Banco Inbursa'),(11,'Citibanamex'),(12,'Banco Interacciones'),(13,'Banco del Bajío'),(14,'Banco Afirme'),(15,'Banco Compartamos'),(16,'Banco Ve por Más (Bx+)'),(17,'Banorte');
/*!40000 ALTER TABLE `catalogo_bancos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_categoria_grupos`
--

DROP TABLE IF EXISTS `catalogo_categoria_grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_categoria_grupos` (
  `id_catalogo_categoria_grupo_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_catalogo_categoria_FK` bigint(20) NOT NULL,
  `id_catalogo_modulo_FK` bigint(20) NOT NULL,
  `id_catalogo_interfaz_FK` bigint(20) NOT NULL,
  PRIMARY KEY (`id_catalogo_categoria_grupo_PK`) USING BTREE,
  KEY `categoria` (`id_catalogo_categoria_FK`) USING BTREE,
  KEY `modulo` (`id_catalogo_modulo_FK`) USING BTREE,
  KEY `interfaz` (`id_catalogo_interfaz_FK`) USING BTREE,
  CONSTRAINT `categoria` FOREIGN KEY (`id_catalogo_categoria_FK`) REFERENCES `catalogo_categorias` (`id_catalogo_categoria_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `interfaz` FOREIGN KEY (`id_catalogo_interfaz_FK`) REFERENCES `catalogo_interfaz` (`id_catalogo_interfaz_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `modulo` FOREIGN KEY (`id_catalogo_modulo_FK`) REFERENCES `catalogo_modulos` (`id_catalogo_modulo_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Unión de los catálogos de vistas para el sistema web';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_categoria_grupos`
--

LOCK TABLES `catalogo_categoria_grupos` WRITE;
/*!40000 ALTER TABLE `catalogo_categoria_grupos` DISABLE KEYS */;
INSERT INTO `catalogo_categoria_grupos` VALUES (1,1,1,1),(2,1,2,3),(3,1,3,5),(4,2,1,2),(5,2,3,6),(6,2,2,4);
/*!40000 ALTER TABLE `catalogo_categoria_grupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_categorias`
--

DROP TABLE IF EXISTS `catalogo_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_categorias` (
  `id_catalogo_categoria_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) NOT NULL,
  `descripcion_cetegoria` varchar(500) NOT NULL,
  `color` varchar(10) DEFAULT NULL,
  `iconoMaster` varchar(50) NOT NULL,
  PRIMARY KEY (`id_catalogo_categoria_PK`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Categorías del sistema web';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_categorias`
--

LOCK TABLES `catalogo_categorias` WRITE;
/*!40000 ALTER TABLE `catalogo_categorias` DISABLE KEYS */;
INSERT INTO `catalogo_categorias` VALUES (1,'CATALOGOS','TODAS LOS MODULOS QUE SON PRINCIPALES PARA GUARDAR INFORMACION PRECISA DEL NEGOCIO','00FFFF','fa-file-invoice'),(2,'REPORTES','REPORTES','17a633','fa-chart-pie'),(3,'PERFILES','PERFILES','00FFFF','fa-microchip'),(4,'CONFIGURACIÓN','CONFIGURACIÓN','17a633','fa-microchip'),(5,'OPERACIÓN','OPERACIÓN','00FFFF','fa-microchip');
/*!40000 ALTER TABLE `catalogo_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_estados`
--

DROP TABLE IF EXISTS `catalogo_estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_estados` (
  `id_catalogo_estado_PK` bigint(20) NOT NULL,
  `nombre_estado` varchar(150) NOT NULL,
  PRIMARY KEY (`id_catalogo_estado_PK`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_estados`
--

LOCK TABLES `catalogo_estados` WRITE;
/*!40000 ALTER TABLE `catalogo_estados` DISABLE KEYS */;
INSERT INTO `catalogo_estados` VALUES (1,'HIDALGO'),(2,'AGUASCALIENTES'),(3,'BAJA CALIFORNIA'),(4,'BAJA CALIFORNIA SUR'),(5,'CAMPECHE'),(6,'COAHUILA DE ZARAGOZA'),(7,'COLIMA'),(8,'CHIAPAS'),(9,'CHIHUAHUA'),(10,'DISTRITO FEDERAL'),(11,'DURANGO'),(12,'GUANAJUATO'),(13,'GUERRERO'),(14,'JALISCO'),(15,'MEXICO'),(16,'MICHOACAN DE OCAMPO'),(17,'MORELOS'),(18,'NAYARIT'),(19,'NUEVO LEÓN'),(20,'OAXACA'),(21,'PUEBLA'),(22,'QUERÉTARO'),(23,'QUINTANA ROO'),(24,'SAN LUIS POTOSI'),(25,'SINALOA'),(26,'SONORA'),(27,'TABASCO'),(28,'TAMAULIPAS'),(29,'VERACRUZ DE IGNACIO DE LA LLAVE'),(30,'YUCATÁN'),(31,'ZACATECAS');
/*!40000 ALTER TABLE `catalogo_estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_giro`
--

DROP TABLE IF EXISTS `catalogo_giro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_giro` (
  `id_catalogo_giro_PK` bigint(20) NOT NULL,
  `nombre_giro` varchar(150) NOT NULL,
  `descripcion_giro` varchar(350) NOT NULL,
  PRIMARY KEY (`id_catalogo_giro_PK`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_giro`
--

LOCK TABLES `catalogo_giro` WRITE;
/*!40000 ALTER TABLE `catalogo_giro` DISABLE KEYS */;
INSERT INTO `catalogo_giro` VALUES (1,'BEBIDAS GASEOSAS','BEBIDAS GASEOSAS, REFRESCOS');
/*!40000 ALTER TABLE `catalogo_giro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_insumos`
--

DROP TABLE IF EXISTS `catalogo_insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_insumos` (
  `id_catalogo_insumos_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_catalogo_insumos_categoria_FK` bigint(20) NOT NULL,
  `id_catalogo_giro_FK` bigint(20) NOT NULL,
  `descripcion_insumo` varchar(300) NOT NULL,
  PRIMARY KEY (`id_catalogo_insumos_PK`),
  KEY `categoria_insumos` (`id_catalogo_insumos_categoria_FK`),
  KEY `catalogo_insumos_FK` (`id_catalogo_giro_FK`),
  CONSTRAINT `catalogo_insumos_FK` FOREIGN KEY (`id_catalogo_giro_FK`) REFERENCES `catalogo_giro` (`id_catalogo_giro_PK`),
  CONSTRAINT `categoria_insumos` FOREIGN KEY (`id_catalogo_insumos_categoria_FK`) REFERENCES `catalogo_insumos_categorias` (`id_catalogo_insumos_categoria_PK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_insumos`
--

LOCK TABLES `catalogo_insumos` WRITE;
/*!40000 ALTER TABLE `catalogo_insumos` DISABLE KEYS */;
/*!40000 ALTER TABLE `catalogo_insumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_insumos_categorias`
--

DROP TABLE IF EXISTS `catalogo_insumos_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_insumos_categorias` (
  `id_catalogo_insumos_categoria_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) NOT NULL,
  PRIMARY KEY (`id_catalogo_insumos_categoria_PK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_insumos_categorias`
--

LOCK TABLES `catalogo_insumos_categorias` WRITE;
/*!40000 ALTER TABLE `catalogo_insumos_categorias` DISABLE KEYS */;
/*!40000 ALTER TABLE `catalogo_insumos_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_insumos_presentacion`
--

DROP TABLE IF EXISTS `catalogo_insumos_presentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_insumos_presentacion` (
  `id_catalogo_insumos_presentacion_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_catalogo_insumos_FK` bigint(20) NOT NULL,
  `codigo` varchar(50) DEFAULT NULL,
  `codigo_barras` varchar(25) DEFAULT NULL,
  `descripcion_presentacion` varchar(200) DEFAULT NULL,
  `id_unidad_medida_FK` bigint(20) NOT NULL,
  `tipo_ganancia` int(11) NOT NULL DEFAULT 0 COMMENT '0=porcentaje, 1=monto',
  `importe_ganancia` double DEFAULT NULL,
  `precio_compra` double NOT NULL,
  `precio_venta` double DEFAULT NULL,
  `calculo_automatico` int(11) NOT NULL DEFAULT 0,
  `precio_mayoreo` double DEFAULT NULL,
  `cantidad_mayoreo` double DEFAULT NULL,
  PRIMARY KEY (`id_catalogo_insumos_presentacion_PK`),
  KEY `catalogo_insumos_presentacion_FK` (`id_catalogo_insumos_FK`),
  KEY `catalogo_insumos_presentacion_FK_1` (`id_unidad_medida_FK`),
  CONSTRAINT `catalogo_insumos_presentacion_FK` FOREIGN KEY (`id_catalogo_insumos_FK`) REFERENCES `catalogo_insumos` (`id_catalogo_insumos_PK`),
  CONSTRAINT `catalogo_insumos_presentacion_FK_1` FOREIGN KEY (`id_unidad_medida_FK`) REFERENCES `unidades_medida` (`id_unidad_medida_PK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_insumos_presentacion`
--

LOCK TABLES `catalogo_insumos_presentacion` WRITE;
/*!40000 ALTER TABLE `catalogo_insumos_presentacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `catalogo_insumos_presentacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_interfaz`
--

DROP TABLE IF EXISTS `catalogo_interfaz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_interfaz` (
  `id_catalogo_interfaz_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_interfaz` varchar(100) NOT NULL COMMENT 'nombre completo de la interfaz',
  `descripcion_interfaz` varchar(500) NOT NULL COMMENT 'Descripción de lo que hace la interfaz ',
  `icono` varchar(50) DEFAULT NULL,
  `url_interfaz` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_catalogo_interfaz_PK`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Catálogo de interfaz creadas para el sistema web';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_interfaz`
--

LOCK TABLES `catalogo_interfaz` WRITE;
/*!40000 ALTER TABLE `catalogo_interfaz` DISABLE KEYS */;
INSERT INTO `catalogo_interfaz` VALUES (1,'PROVEEDORES','ALTA, BAJA Y EDICION DE PROVEEDORES','fa-truck-field','/paneles/dashboards/proveedores'),(2,'PROVEEDORES','REPORTE DE PROVEEDORES','fa-truck-fast',NULL),(3,'CLIENTES','ALTA, BAJA Y EDICION DE CLIENTES','fa-users',NULL),(4,'CLIENTES','REPORTE DE CLIENTES','fa-clipboard-user',NULL),(5,'PRODUCTOS','ALTA, BAJA Y EDICION DE PRODUCTOS',NULL,'/paneles/dashboards/insumos'),(6,'PRODUCTOS','REPORTE DE PRODUCTOS',NULL,NULL);
/*!40000 ALTER TABLE `catalogo_interfaz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_modulos`
--

DROP TABLE IF EXISTS `catalogo_modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_modulos` (
  `id_catalogo_modulo_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_modulo` varchar(100) NOT NULL COMMENT 'nombre del modulo',
  `descripcion_modulo` varchar(500) NOT NULL COMMENT 'Describe el módulo y sus características ',
  PRIMARY KEY (`id_catalogo_modulo_PK`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Nombre de los módulos que se van a tener en cada una de las actividades ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_modulos`
--

LOCK TABLES `catalogo_modulos` WRITE;
/*!40000 ALTER TABLE `catalogo_modulos` DISABLE KEYS */;
INSERT INTO `catalogo_modulos` VALUES (1,'PROVEEDORES','ALTA, BAJA, EDICION Y REPORTE DE PROVEEDORES'),(2,'CLIENTES','ALTA, BAJA, EDICION Y REPORTE DE CLIENTES'),(3,'PRODUCTOS','ALTA, BAJA, EDICION Y REPORTE DE PRODUCTOS');
/*!40000 ALTER TABLE `catalogo_modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_municipios`
--

DROP TABLE IF EXISTS `catalogo_municipios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_municipios` (
  `id_catalogo_municipios_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_catalogo_estado_FK` bigint(20) NOT NULL,
  `nombre_municipio` varchar(150) NOT NULL,
  `claveMunicipio` varchar(5) NOT NULL,
  `cp` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_catalogo_municipios_PK`) USING BTREE,
  KEY `municipiosEstado` (`id_catalogo_estado_FK`) USING BTREE,
  CONSTRAINT `municipiosEstado` FOREIGN KEY (`id_catalogo_estado_FK`) REFERENCES `catalogo_estados` (`id_catalogo_estado_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_municipios`
--

LOCK TABLES `catalogo_municipios` WRITE;
/*!40000 ALTER TABLE `catalogo_municipios` DISABLE KEYS */;
INSERT INTO `catalogo_municipios` VALUES (3,1,'Pachuca de Soto','48',42001),(4,1,'Pachuca de Soto','48',42091),(5,1,'Mineral del Chico','38',42001),(6,1,'Mineral del Monte','39',42131),(7,1,'Ajacuba','5',42951),(8,1,'San Agustín Tlaxiaca','52',42001),(9,1,'Mineral de la Reforma','51',42001),(10,1,'Mineral de la Reforma','51',42091),(11,1,'Zapotlán de Juárez','82',42091),(12,1,'Jacala de Ledezma','31',42202),(13,1,'Pisaflores','49',42281),(14,1,'Pacula','47',42202),(15,1,'La Misión','40',42202),(16,1,'Chapulhuacán','18',42281),(17,1,'Ixmiquilpan','30',42301),(18,1,'Zimapán','84',42331),(19,1,'Nicolás Flores','43',42301),(20,1,'Cardonal','15',42301),(21,1,'Tasquillo','58',42301),(22,1,'Alfajayucan','6',42301),(23,1,'Huichapan','29',42401),(24,1,'Tecozautla','59',42301),(25,1,'Nopala de Villagrán','44',42401),(26,1,'Actopan','3',42501),(27,1,'Santiago de Anaya','55',42501),(28,1,'San Salvador','54',42501),(29,1,'Francisco I. Madero','23',42731),(30,1,'El Arenal','9',42501),(31,1,'Mixquiahuala de Juárez','41',42701),(32,1,'Progreso de Obregón','50',42731),(33,1,'Chilcuautla','19',42731),(34,1,'Tezontepec de Aldama','67',42701),(35,1,'Tlahuelilpan','70',42781),(36,1,'Tula de Allende','76',42801),(37,1,'Tula de Allende','76',42841),(38,1,'Tepeji del Río de Ocampo','63',42851),(39,1,'Chapantongo','17',42801),(40,1,'Tepetitlán','64',42801),(41,1,'Tetepango','65',42951),(42,1,'Tlaxcoapan','74',42951),(43,1,'Atitalaquia','10',42951),(44,1,'Atotonilco de Tula','13',42951),(45,1,'Huejutla de Reyes','28',43007),(46,1,'San Felipe Orizatlán','46',43007),(47,1,'Jaltocán','32',43007),(48,1,'Huautla','25',43007),(49,1,'Atlapexco','11',43007),(50,1,'Huazalingo','26',43007),(51,1,'Yahualica','80',43007),(52,1,'Xochiatipan','78',43007),(53,1,'Molango de Escamilla','42',43207),(54,1,'Tepehuacán de Guerrero','62',43007),(55,1,'Lolotla','34',43207),(56,1,'Tlanchinol','73',43007),(57,1,'Tlahuiltepa','71',43207),(58,1,'Juárez Hidalgo','33',43207),(59,1,'Zacualtipán de Ángeles','81',43207),(60,1,'Calnali','14',43007),(61,1,'Xochicoatlán','79',43207),(62,1,'Tianguistengo','68',43207),(63,1,'Atotonilco el Grande','12',43303),(64,1,'Eloxochitlán','20',43207),(65,1,'Metztitlán','37',43207),(66,1,'San Agustín Metzquititlán','36',43207),(67,1,'Metepec','35',43601),(68,1,'Huehuetla','27',43601),(69,1,'San Bartolo Tutotepec','53',43601),(70,1,'Agua Blanca de Iturbide','4',43601),(71,1,'Tenango de Doria','60',43601),(72,1,'Huasca de Ocampo','24',42001),(73,1,'Acatlán','1',43601),(74,1,'Omitlán de Juárez','45',42001),(75,1,'Epazoyucan','22',42001),(76,1,'Tulancingo de Bravo','77',43601),(77,1,'Acaxochitlán','2',43601),(78,1,'Cuautepec de Hinojosa','16',43741),(79,1,'Santiago Tulantepec de Lugo Guerrero','56',43601),(80,1,'Singuilucan','57',43601),(81,1,'Tizayuca','69',43801),(82,1,'Zempoala','83',43992),(83,1,'Zempoala','83',42091),(84,1,'Tolcayuca','75',43801),(85,1,'Villa de Tezontepec','66',43801),(86,1,'Apan','8',43901),(87,1,'Tlanalapa','72',43992),(88,1,'Almoloya','7',43901),(89,1,'Emiliano Zapata','21',43992),(90,1,'Tepeapulco','61',43992),(91,2,'Aguascalientes','1',20001),(92,2,'Aguascalientes','1',20293),(93,2,'San Francisco de los Romo','11',20671),(94,2,'Aguascalientes','1',20999),(95,2,'Aguascalientes','1',20921),(96,2,'El Llano','10',20999),(97,2,'San Francisco de los Romo','11',20999),(98,2,'San Francisco de los Romo','11',20001),(99,2,'Rincón de Romos','7',20401),(100,2,'Rincón de Romos','7',20671),(101,2,'Cosío','4',20401),(102,2,'San José de Gracia','8',20671),(103,2,'Tepezalá','9',20401),(104,2,'Tepezalá','9',20671),(105,2,'Pabellón de Arteaga','6',20671),(106,2,'Asientos','2',20999),(107,2,'Asientos','2',20401),(108,2,'Asientos','2',20671),(109,2,'Calvillo','3',20801),(110,2,'Jesús María','5',20921),(111,2,'Jesús María','5',20671),(112,2,'Jesús María','5',20999),(113,3,'Mexicali','2',21101),(114,3,'Mexicali','2',21105),(115,3,'Mexicali','2',21392),(116,3,'Tecate','3',21401),(117,3,'Mexicali','2',21724),(118,3,'Mexicali','2',21901),(119,3,'San Felipe','7',21851),(120,3,'Tijuana','4',22001),(121,3,'Tijuana','4',22101),(122,3,'Playas de Rosarito','5',22701),(123,3,'Ensenada','1',22801),(124,3,'Ensenada','1',22901),(125,3,'San Quintín','6',22901),(126,3,'San Quintín','6',22923),(127,3,'San Quintín','6',22935),(128,3,'San Quintín','6',23941),(129,4,'La Paz','3',23001),(130,4,'La Paz','3',23202),(131,4,'La Paz','3',23601),(132,4,'La Paz','3',23231),(133,4,'La Paz','3',23301),(134,4,'La Paz','3',23331),(135,4,'La Paz','3',23401),(136,4,'Los Cabos','8',23401),(137,4,'Los Cabos','8',23452),(138,4,'Los Cabos','8',23502),(139,4,'Los Cabos','8',23331),(140,4,'Comondú','1',23601),(141,4,'Comondú','1',23702),(142,4,'Comondú','1',23711),(143,4,'Comondú','1',23741),(144,4,'Loreto','9',23881),(145,4,'Mulegé','2',23901),(146,4,'Mulegé','2',23925),(147,4,'Mulegé','2',23932),(148,4,'Mulegé','2',23941),(149,4,'Mulegé','2',23953),(150,5,'Campeche','2',24003),(151,5,'Carmen','3',24101),(152,5,'Palizada','7',86784),(153,5,'Carmen','3',24401),(154,5,'Carmen','3',24351),(155,5,'Candelaria','11',24331),(156,5,'Escárcega','9',24351),(157,5,'Champotón','4',24401),(158,5,'Champotón','4',24351),(159,5,'Seybaplaya','12',24001),(160,5,'Seybaplaya','12',24401),(161,5,'Campeche','2',24001),(162,5,'Campeche','2',24571),(163,5,'Hopelchén','6',24001),(164,5,'Calakmul','10',24351),(165,5,'Tenabo','8',24801),(166,5,'Hecelchakán','5',24801),(167,5,'Calkiní','1',24901),(168,5,'Dzitbalché','13',24901);
/*!40000 ALTER TABLE `catalogo_municipios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_proveedor_contacto`
--

DROP TABLE IF EXISTS `catalogo_proveedor_contacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_proveedor_contacto` (
  `id_proveedor_contacto_PK` bigint(20) NOT NULL,
  `id_catalogo_proveedor_FK` bigint(20) NOT NULL,
  `nombre_contacto` varchar(250) NOT NULL,
  `telefono` int(11) NOT NULL,
  `ext_tel` int(11) NOT NULL,
  `email_proveedor` varchar(250) NOT NULL,
  PRIMARY KEY (`id_proveedor_contacto_PK`) USING BTREE,
  KEY `proveedorContacto` (`id_catalogo_proveedor_FK`) USING BTREE,
  CONSTRAINT `proveedorContacto` FOREIGN KEY (`id_catalogo_proveedor_FK`) REFERENCES `catalogo_proveedores` (`id_catalogo_proveedor_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Catálogo de contactos interno del proveedor ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_proveedor_contacto`
--

LOCK TABLES `catalogo_proveedor_contacto` WRITE;
/*!40000 ALTER TABLE `catalogo_proveedor_contacto` DISABLE KEYS */;
/*!40000 ALTER TABLE `catalogo_proveedor_contacto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_proveedores`
--

DROP TABLE IF EXISTS `catalogo_proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_proveedores` (
  `id_catalogo_proveedor_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `rfc` varchar(15) NOT NULL DEFAULT 'Sin RFC',
  `email_principal` varchar(500) NOT NULL DEFAULT 'Sin Email',
  `calle` varchar(500) NOT NULL,
  `id_catalogo_estado_FK` bigint(20) NOT NULL,
  `id_catalogo_municipios_FK` bigint(20) NOT NULL,
  `cp` int(11) NOT NULL,
  `telefono` varchar(10) NOT NULL DEFAULT '',
  `id_catalogo_giro_FK` bigint(20) NOT NULL,
  `status_proveedor` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id_catalogo_proveedor_PK`) USING BTREE,
  KEY `estado` (`id_catalogo_estado_FK`) USING BTREE,
  KEY `municipios` (`id_catalogo_municipios_FK`) USING BTREE,
  KEY `giros` (`id_catalogo_giro_FK`) USING BTREE,
  CONSTRAINT `estado` FOREIGN KEY (`id_catalogo_estado_FK`) REFERENCES `catalogo_estados` (`id_catalogo_estado_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `giros` FOREIGN KEY (`id_catalogo_giro_FK`) REFERENCES `catalogo_giro` (`id_catalogo_giro_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `municipios` FOREIGN KEY (`id_catalogo_municipios_FK`) REFERENCES `catalogo_municipios` (`id_catalogo_municipios_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_proveedores`
--

LOCK TABLES `catalogo_proveedores` WRITE;
/*!40000 ALTER TABLE `catalogo_proveedores` DISABLE KEYS */;
INSERT INTO `catalogo_proveedores` VALUES (1,'INDUSTRIA MEXICANA DE COCA-COLA','IHD050718UN4','servicenter@rica.com.mx','Camino a Pozos Téllez km 1.5 ',1,3,42186,'7717741373',1,'\0'),(2,'PEPSI','Sin RFC','Sin Email','Carretera Ciudad Zahui Kilómetro 8.5',1,3,42039,'7717188012',1,''),(3,'SERVICIOS HOME DEPOT, S.A. DE C.V.','SHD940509I58','Sin Email','Ricardo Margain Zozaya',1,26,66267,'',1,''),(4,'EFRACEVE S.A.','CEVE900711R16','vin_ceve1990@hotmail.com','nevado de teytepec no.125',1,4,42088,'7711169098',1,''),(5,'EFRACEVE S.A. DE C.V.','CEVE900711R15','vin_ceve1990@hotmail.com','nevado de teytepec no.125',1,3,42088,'7711169098',1,''),(6,'EFRACEVE S.A. DE C.V.','CEVE900711R20','vin_ceve1990@hotmail.com','nevado de teytepec no.125',3,115,42088,'7711169098',1,''),(7,'EFRACEVE S.A. DE C.V.','CEVE900711R25','vin_ceve1990@hotmail.com','nevado de teytepec no.125',4,136,42088,'7711169098',1,''),(8,'EFRACEVE S.A. DE C.V.','CEVE900711R40','vin_ceve1990@hotmail.com','nevado de teytepec no.125',5,164,42088,'7711169098',1,''),(9,'EFRACEVE S.A. DE C.V.','CEVE900711R45','vin_ceve1990@hotmail.com','nevado de teytepec no.125',3,126,42088,'7711169098',1,''),(10,'EFRACEVE S.A. DE C.V.','CEVE900711R50','vin_ceve1990@hotmail.com','nevado de teytepec no.125',5,168,42088,'7711169098',1,''),(11,'EFRACEVE S.A. DE C.V.','CEVE900711R55','vin_ceve1990@hotmail.com','nevado de teytepec no.125',3,122,42088,'7711169098',1,'');
/*!40000 ALTER TABLE `catalogo_proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_proveedores_banco`
--

DROP TABLE IF EXISTS `catalogo_proveedores_banco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_proveedores_banco` (
  `id_catalogo_proveedor_banco` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_catalogo_proveedor_FK` bigint(20) NOT NULL,
  `id_catalogo_banco_FK` bigint(20) NOT NULL,
  `cuenta` varchar(50) NOT NULL,
  `clave_interbancaria` varchar(25) NOT NULL,
  `no_convenio` varchar(25) NOT NULL,
  `referencia` varchar(25) NOT NULL,
  PRIMARY KEY (`id_catalogo_proveedor_banco`) USING BTREE,
  KEY `proveedorBan` (`id_catalogo_banco_FK`) USING BTREE,
  KEY `proveedor` (`id_catalogo_proveedor_FK`) USING BTREE,
  CONSTRAINT `proveedor` FOREIGN KEY (`id_catalogo_proveedor_FK`) REFERENCES `catalogo_proveedores` (`id_catalogo_proveedor_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `proveedorBan` FOREIGN KEY (`id_catalogo_banco_FK`) REFERENCES `catalogo_bancos` (`id_catalogo_banco_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Catálogo de bancos que tiene cada proveedor ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_proveedores_banco`
--

LOCK TABLES `catalogo_proveedores_banco` WRITE;
/*!40000 ALTER TABLE `catalogo_proveedores_banco` DISABLE KEYS */;
/*!40000 ALTER TABLE `catalogo_proveedores_banco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_roles`
--

DROP TABLE IF EXISTS `catalogo_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_roles` (
  `id_roles_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(255) DEFAULT NULL,
  `status` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id_roles_PK`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_roles`
--

LOCK TABLES `catalogo_roles` WRITE;
/*!40000 ALTER TABLE `catalogo_roles` DISABLE KEYS */;
INSERT INTO `catalogo_roles` VALUES (1,'admin',''),(2,'Presidente',''),(3,'Almacenista',''),(4,'Jefe De Area','\0'),(5,'Auxiliar Almacen',''),(6,'Coordinador',''),(7,'Abogado',''),(8,'Supervisor',''),(9,'Programador',''),(10,'Programador JR',''),(11,'Programador SR',''),(12,'Analista',''),(13,'Analista B',''),(14,'Analista C',''),(15,'Jefe Almacen JR',''),(16,'Analista X',''),(17,'Cargador',''),(18,'Analista Y','\0'),(19,'dddd','');
/*!40000 ALTER TABLE `catalogo_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_roles_permisos_interfaz`
--

DROP TABLE IF EXISTS `catalogo_roles_permisos_interfaz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogo_roles_permisos_interfaz` (
  `id_cat_rol_permiso_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_roles_FK` bigint(20) NOT NULL,
  `id_catalogo_interfaz_FK` bigint(20) NOT NULL,
  `status` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_cat_rol_permiso_PK`) USING BTREE,
  KEY `FK_roles` (`id_roles_FK`) USING BTREE,
  KEY `FK_interfaz` (`id_catalogo_interfaz_FK`) USING BTREE,
  CONSTRAINT `FK_interfaz` FOREIGN KEY (`id_catalogo_interfaz_FK`) REFERENCES `catalogo_interfaz` (`id_catalogo_interfaz_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_roles` FOREIGN KEY (`id_roles_FK`) REFERENCES `catalogo_roles` (`id_roles_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='Las interfaces que puede utilizar el rol';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_roles_permisos_interfaz`
--

LOCK TABLES `catalogo_roles_permisos_interfaz` WRITE;
/*!40000 ALTER TABLE `catalogo_roles_permisos_interfaz` DISABLE KEYS */;
INSERT INTO `catalogo_roles_permisos_interfaz` VALUES (9,1,1,''),(10,1,3,''),(11,1,5,''),(12,1,6,''),(13,1,4,''),(14,1,2,''),(15,2,5,''),(16,2,1,''),(17,2,6,''),(18,13,1,''),(19,13,5,''),(20,13,4,''),(21,13,6,''),(22,3,1,''),(23,3,2,'');
/*!40000 ALTER TABLE `catalogo_roles_permisos_interfaz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `categoriasactivos`
--

DROP TABLE IF EXISTS `categoriasactivos`;
/*!50001 DROP VIEW IF EXISTS `categoriasactivos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `categoriasactivos` AS SELECT 
 1 AS `id_catalogo_categoria_grupo_PK`,
 1 AS `id_catalogo_categoria_FK`,
 1 AS `id_catalogo_modulo_FK`,
 1 AS `id_catalogo_interfaz_FK`,
 1 AS `id_roles_FK`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `interfacesactivos`
--

DROP TABLE IF EXISTS `interfacesactivos`;
/*!50001 DROP VIEW IF EXISTS `interfacesactivos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `interfacesactivos` AS SELECT 
 1 AS `id_catalogo_interfaz_PK`,
 1 AS `nombre_interfaz`,
 1 AS `descripcion_interfaz`,
 1 AS `icono`,
 1 AS `url_interfaz`,
 1 AS `id_roles_FK`,
 1 AS `id_catalogo_categoria_FK`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `negocios_tipo`
--

DROP TABLE IF EXISTS `negocios_tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `negocios_tipo` (
  `id_tipo_negocio_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_usuario_FK` bigint(20) NOT NULL,
  `nombre_negocio` varchar(150) NOT NULL,
  `tipo_negocio` int(11) NOT NULL DEFAULT 0,
  `status_negocio` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_tipo_negocio_PK`) USING BTREE,
  KEY `usuarios` (`id_usuario_FK`) USING BTREE,
  CONSTRAINT `usuarios` FOREIGN KEY (`id_usuario_FK`) REFERENCES `usuariosnegocio` (`id_usuario_negocio_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `negocios_tipo`
--

LOCK TABLES `negocios_tipo` WRITE;
/*!40000 ALTER TABLE `negocios_tipo` DISABLE KEYS */;
INSERT INTO `negocios_tipo` VALUES (1,1,'CERVANTES VITE',1,''),(2,2,'nomComer',1,''),(3,3,'nomComer',1,'');
/*!40000 ALTER TABLE `negocios_tipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personalnegocio`
--

DROP TABLE IF EXISTS `personalnegocio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personalnegocio` (
  `id_persona_negocio_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `sexo` int(11) DEFAULT 0 COMMENT '0=no aplica, 1=hombre, 2=mujer',
  `curp` varchar(20) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `status_per` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_persona_negocio_PK`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personalnegocio`
--

LOCK TABLES `personalnegocio` WRITE;
/*!40000 ALTER TABLE `personalnegocio` DISABLE KEYS */;
INSERT INTO `personalnegocio` VALUES (1,'EFRAIN','CERVANTES VITE',1,'CEVE900711HHGRTF06','7711169098','efraceve@gmail.com',''),(2,'OSCAR','CERVANTES VITE',1,'CEVO890206HHGRTF00','7711169090','HELSING90@GMAIL.COM',''),(3,'URIEL','CERVANTES VITE',1,'CEVU971231HHGRTF00','7711169092','uri@gmail.com','');
/*!40000 ALTER TABLE `personalnegocio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolesnegocio`
--

DROP TABLE IF EXISTS `rolesnegocio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolesnegocio` (
  `id_roles_negocio_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_usuario_negocio_FK` bigint(20) DEFAULT NULL,
  `id_roles_FK` bigint(20) DEFAULT NULL,
  `nombreRol` varchar(150) DEFAULT NULL COMMENT 'nombre del rol',
  `status_rol` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id_roles_negocio_PK`) USING BTREE,
  KEY `usuario` (`id_usuario_negocio_FK`) USING BTREE,
  KEY `idrol` (`id_roles_FK`) USING BTREE,
  CONSTRAINT `idrol` FOREIGN KEY (`id_roles_FK`) REFERENCES `catalogo_roles` (`id_roles_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rolusuarios` FOREIGN KEY (`id_usuario_negocio_FK`) REFERENCES `usuariosnegocio` (`id_usuario_negocio_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolesnegocio`
--

LOCK TABLES `rolesnegocio` WRITE;
/*!40000 ALTER TABLE `rolesnegocio` DISABLE KEYS */;
INSERT INTO `rolesnegocio` VALUES (1,1,1,'admin',''),(2,2,3,'Almacenista',''),(3,3,17,'Cargador','');
/*!40000 ALTER TABLE `rolesnegocio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades_medida`
--

DROP TABLE IF EXISTS `unidades_medida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidades_medida` (
  `id_unidad_medida_PK` bigint(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `nomenclatura` varchar(50) NOT NULL,
  PRIMARY KEY (`id_unidad_medida_PK`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades_medida`
--

LOCK TABLES `unidades_medida` WRITE;
/*!40000 ALTER TABLE `unidades_medida` DISABLE KEYS */;
INSERT INTO `unidades_medida` VALUES (1,'PIEZA','PZA');
/*!40000 ALTER TABLE `unidades_medida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariosnegocio`
--

DROP TABLE IF EXISTS `usuariosnegocio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuariosnegocio` (
  `id_usuario_negocio_PK` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_persona_negocio_FK` bigint(20) NOT NULL,
  `usuario` varchar(150) NOT NULL,
  `passwd` varbinary(300) NOT NULL,
  `ruta_img` varchar(255) DEFAULT NULL,
  `status_usuario` bit(1) NOT NULL DEFAULT b'1' COMMENT '0=inactivo; 1=Activo',
  PRIMARY KEY (`id_usuario_negocio_PK`) USING BTREE,
  KEY `persona` (`id_persona_negocio_FK`) USING BTREE,
  CONSTRAINT `usuariosnegocio_ibfk_1` FOREIGN KEY (`id_persona_negocio_FK`) REFERENCES `personalnegocio` (`id_persona_negocio_PK`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariosnegocio`
--

LOCK TABLES `usuariosnegocio` WRITE;
/*!40000 ALTER TABLE `usuariosnegocio` DISABLE KEYS */;
INSERT INTO `usuariosnegocio` VALUES (1,1,'EFCE7709','�7҈[P{n��\��1�','/fotos/farmacom2/1.PNG',''),(2,2,'OSCE7709','���5�Rc�\�\�I���o','/fotos/farmacom2/2.JPG',''),(3,3,'URCE7709','\0A����491Ϻu',NULL,'');
/*!40000 ALTER TABLE `usuariosnegocio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cervantesvite022123o'
--

--
-- Final view structure for view `categoriasactivos`
--

/*!50001 DROP VIEW IF EXISTS `categoriasactivos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `categoriasactivos` AS select `a`.`id_catalogo_categoria_grupo_PK` AS `id_catalogo_categoria_grupo_PK`,`a`.`id_catalogo_categoria_FK` AS `id_catalogo_categoria_FK`,`a`.`id_catalogo_modulo_FK` AS `id_catalogo_modulo_FK`,`a`.`id_catalogo_interfaz_FK` AS `id_catalogo_interfaz_FK`,`b`.`id_roles_FK` AS `id_roles_FK` from (`catalogo_categoria_grupos` `a` join `catalogo_roles_permisos_interfaz` `b`) where `b`.`id_catalogo_interfaz_FK` = `a`.`id_catalogo_interfaz_FK` group by `a`.`id_catalogo_categoria_FK`,`b`.`id_roles_FK` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `interfacesactivos`
--

/*!50001 DROP VIEW IF EXISTS `interfacesactivos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `interfacesactivos` AS select `a`.`id_catalogo_interfaz_PK` AS `id_catalogo_interfaz_PK`,`a`.`nombre_interfaz` AS `nombre_interfaz`,`a`.`descripcion_interfaz` AS `descripcion_interfaz`,`a`.`icono` AS `icono`,`a`.`url_interfaz` AS `url_interfaz`,`b`.`id_roles_FK` AS `id_roles_FK`,`c`.`id_catalogo_categoria_FK` AS `id_catalogo_categoria_FK` from ((`catalogo_interfaz` `a` join `catalogo_roles_permisos_interfaz` `b`) join `catalogo_categoria_grupos` `c`) where `a`.`id_catalogo_interfaz_PK` = `b`.`id_catalogo_interfaz_FK` and `a`.`id_catalogo_interfaz_PK` = `c`.`id_catalogo_interfaz_FK` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-17 10:31:55
