-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: linkinim
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `utentispecializzazioni`
--

DROP TABLE IF EXISTS `utentispecializzazioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utentispecializzazioni` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdUtente` int NOT NULL,
  `IdSpecializzazione` int NOT NULL,
  `DataOttenimento` date DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `IdUtente_idx` (`IdUtente`),
  KEY `IdSpecializzazione_idx` (`IdSpecializzazione`),
  CONSTRAINT `UtentiSpecializzazioni.IdSpecializzazione` FOREIGN KEY (`IdSpecializzazione`) REFERENCES `specializzazioni` (`Id`),
  CONSTRAINT `UtentiSpecializzazioni.IdUtente` FOREIGN KEY (`IdUtente`) REFERENCES `utenti` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utentispecializzazioni`
--

LOCK TABLES `utentispecializzazioni` WRITE;
/*!40000 ALTER TABLE `utentispecializzazioni` DISABLE KEYS */;
INSERT INTO `utentispecializzazioni` VALUES (1,2,10,NULL),(2,2,11,NULL),(3,2,12,NULL),(4,3,14,NULL),(5,3,15,NULL),(6,4,15,NULL),(7,4,16,NULL),(8,5,1,NULL),(9,5,2,NULL),(10,6,8,NULL),(11,6,7,NULL),(12,7,14,NULL),(13,8,3,NULL),(14,8,4,NULL),(15,9,10,NULL),(16,10,10,NULL),(17,11,3,NULL),(18,12,4,NULL),(19,13,5,NULL),(20,14,6,NULL),(21,15,2,NULL),(22,15,13,NULL);
/*!40000 ALTER TABLE `utentispecializzazioni` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-01 11:35:58
