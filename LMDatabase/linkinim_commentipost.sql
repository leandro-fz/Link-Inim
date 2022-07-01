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
-- Table structure for table `commentipost`
--

DROP TABLE IF EXISTS `commentipost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentipost` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdUtente` int NOT NULL,
  `Testo` varchar(240) NOT NULL,
  `Datetime` datetime NOT NULL,
  `IdPost` int NOT NULL,
  `IdCommento` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `Iddipendente_idx` (`IdUtente`),
  KEY `IdPost_idx` (`IdPost`),
  KEY `IdCommento_idx` (`IdCommento`),
  CONSTRAINT `CommentiPost.IdCommento` FOREIGN KEY (`IdCommento`) REFERENCES `commentipost` (`Id`),
  CONSTRAINT `CommentiPost.IdPost` FOREIGN KEY (`IdPost`) REFERENCES `post` (`Id`),
  CONSTRAINT `CommentiPost.IdUtente` FOREIGN KEY (`IdUtente`) REFERENCES `utenti` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentipost`
--

LOCK TABLES `commentipost` WRITE;
/*!40000 ALTER TABLE `commentipost` DISABLE KEYS */;
INSERT INTO `commentipost` VALUES (1,101,'Curabitur id.','2022-06-30 00:00:00',1,NULL),(2,8,'Aliquam in augue quis ligula porta posuere.','2022-06-30 00:00:00',6,NULL),(3,15,'Integer urna quam, porttitor nec nunc eu, ultricies ultricies ipsum.','2022-06-30 00:00:00',2,NULL),(4,45,'Etiam id placerat lorem, viverra tempor turpis. Curabitur id.','2022-06-30 00:00:00',8,NULL),(5,89,'Lorem ipsum dolor sit amet, consectetur adipiscing elit.','2022-06-30 00:00:00',1,NULL),(6,12,'Duis sed ligula vel nisl euismod mollis nec quis sapien.','2022-06-30 00:00:00',7,NULL),(7,40,'Nulla egestas erat sit amet pellentesque dignissim.','2022-06-30 00:00:00',5,NULL),(8,30,'Integer quis vulputate massa, eget placerat ex.','2022-06-30 00:00:00',4,NULL),(9,29,'Fusce leo tellus, maximus nec metus eget, facilisis accumsan sem. Aliquam.','2022-06-30 00:00:00',9,NULL),(10,76,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae.','2022-06-30 00:00:00',10,NULL);
/*!40000 ALTER TABLE `commentipost` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-01 11:36:01
