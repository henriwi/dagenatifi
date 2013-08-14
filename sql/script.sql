-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Vert: localhost
-- Generert den: 22. Okt, 2012 01:16 AM
-- Tjenerversjon: 5.5.25
-- PHP-Versjon: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
DROP DATABASE IF EXISTS type;
CREATE DATABASE type;
USE type;

--
-- Database: `type`
--

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `school` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dataark for tabell `event`
--

INSERT INTO `event` (`id`, `school`, `name`, `date`) VALUES
(1, 'NTNU', 'Bedpres', '2013-08-01'),
(2, 'UiO', 'Dagen at IFI', '2013-07-20'),
(3, 'HiOA', 'Arbeidslivsdagen', '2013-09-03');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `participant`
--

CREATE TABLE `participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(8) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `points` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dataark for tabell `participant`
--

INSERT INTO `participant` (`id`, `name`, `phone`, `mail`, `points`, `event_id`) VALUES
(14, 'Hans Hansen', '12345678', 'hans.hansen@gmail.com', 66, 1),
(15, 'Per Persen', '66898974', 'per.persen@gmail.com', 300, 1),
(16, 'Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 105, 1),
(17, 'Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 1, 1),
(18, 'Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 2, 2),
(19, 'Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 3, 2),
(20, 'Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 4, 2),
(21, 'Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 5, 2),
(22, 'Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 6, 2),
(23, 'Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 7, 3),
(24, 'Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 8, 3),
(25, 'Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 9, 3),
(26, 'Olav Olavsen', '34545544', 'olav.olavsen@gmail.com', 10, 3);

--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `participant`
--
ALTER TABLE `participant`
  ADD CONSTRAINT `participant_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`);
