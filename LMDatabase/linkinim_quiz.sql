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
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdCorso` int NOT NULL,
  `Domanda` varchar(250) DEFAULT NULL,
  `RispostaCorretta` varchar(250) DEFAULT NULL,
  `RispostaErrata1` varchar(250) DEFAULT NULL,
  `RispostaErrata2` varchar(250) DEFAULT NULL,
  `RispostaErrata3` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `IdCorso_idx` (`IdCorso`),
  CONSTRAINT `Quiz.IdCorso` FOREIGN KEY (`IdCorso`) REFERENCES `corsi` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (1,5,'Lorem Ipsum','Corretta','Errata1','Errata2','Errata3'),(2,9,'Curabitur id','Corretta','Errata1','Errata2','Errata3'),(3,4,'Nulla egestas erat sit amet pellentesque dignissim.','Corretta','Errata1','Errata2','Errata3'),(4,8,'Aliquam in augue quis ligula porta posuere.','Corretta','Errata1','Errata2','Errata3'),(5,2,'Integer urna quam, porttitor nec nunc eu, ultricies ultricies ipsum.','Corretta','Errata1','Errata2','Errata3'),(6,5,'Lorem ipsum dolor sit amet, consectetur adipiscing elit.','Corretta','Errata1','Errata2','Errata3'),(7,10,'Duis sed ligula vel nisl euismod mollis nec quis sapien.','Corretta','Errata1','Errata2','Errata3'),(8,1,'Integer quis vulputate massa, eget placerat ex.','Corretta','Errata1','Errata2','Errata3'),(9,6,'Fusce leo tellus, maximus nec metus eget, facilisis accumsan sem. Aliquam.','Corretta','Errata1','Errata2','Errata3'),(10,7,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae.','Corretta','Errata1','Errata2','Errata3');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-01 11:36:02
