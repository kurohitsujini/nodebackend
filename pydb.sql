-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-07-2023 a las 21:19:31
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

DROP TABLE IF EXISTS `empleados`;
CREATE TABLE IF NOT EXISTS `empleados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `name`, `department`) VALUES
(1, 'Admon', 'Personal'),
(2, 'TI', 'DEVS'),
(3, 'RRHH', 'NOMINA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

DROP TABLE IF EXISTS `persona`;
CREATE TABLE IF NOT EXISTS `persona` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(200) NOT NULL,
  `points` int NOT NULL,
  `position` int NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `empleados_id` int DEFAULT NULL,
  `image` longtext,
  PRIMARY KEY (`id`),
  KEY `empleados_id` (`empleados_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `fullname`, `points`, `position`, `active`, `empleados_id`, `image`) VALUES
(1, 'Josue A. Sanchez G.', 265, 2, 1, 1, 'http://localhost:4000/uploads/surface-CIrJuUI75hg-unsplash.jpg'),
(2, 'Esther sanchez', 195, 4, 1, 1, 'http://localhost:4000/uploads/thuyen-ngo-0zHKlhLMjfs-unsplash.jpg'),
(13, 'Diego sanchez', 196, 3, 1, 2, 'http://localhost:4000/uploads/great-cocktails-rKQ5BkPXuik-unsplash.jpg'),
(14, 'Bianka L. Cruz Mendez', 266, 1, 1, 3, 'http://localhost:4000/uploads/surface-CIrJuUI75hg-unsplash.jpg'),
(15, 'Maritza Mendez', 176, 5, 1, 2, 'http://localhost:4000/uploads/sarah-dorweiler-QeVmJxZOv3k-unsplash.jpg'),
(16, 'testing 10 updated', 175, 6, 0, 3, 'http://localhost:4000/uploads/mikhail-volkov-0Lq19lUCo2E-unsplash.jpg'),
(19, 'prueba', 10, 9, 0, 3, 'http://localhost:4000/uploads/toa-heftiba-FV3GConVSss-unsplash.jpg'),
(20, 'testing 10 updated', 5, 9, 0, 3, 'http://localhost:4000/uploads/jeremy-stewardson-aN5_O3ObkRk-unsplash.jpg'),
(21, 'testing 11', 10, 8, 0, 3, 'http://localhost:4000/uploads/yevhenii-ometsynskyi-s4S2yHey9RU-unsplash.jpg'),
(22, 'testing 11', 11, 7, 0, 1, 'http://localhost:4000/uploads/kseniia-lobko--JlAoHNbwlM-unsplash.jpg'),
(23, 'adan', 2, 9, 0, 3, 'http://localhost:4000/uploads/klara-kulikova-PMAsd72YFJ0-unsplash.jpg'),
(24, '250123', 1, 10, 0, 3, 'http://localhost:4000/uploads/surface-CIrJuUI75hg-unsplash.jpg'),
(25, 'adan', 258, 1, 0, 2, 'http://localhost:4000/uploads/1.jpg');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `fk_empleados_id` FOREIGN KEY (`empleados_id`) REFERENCES `empleados` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
