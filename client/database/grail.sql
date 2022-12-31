-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2022 at 03:37 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grail`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_app`
--

CREATE TABLE `tbl_app` (
  `id` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_email`
--

CREATE TABLE `tbl_email` (
  `email` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `password` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `code` varchar(1000) COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `tbl_email`
--

INSERT INTO `tbl_email` (`email`, `password`, `code`) VALUES
('upport@grailpad.io', 'U2FsdGVkX18KR4eI1QxqnFj10PSQed2Msx0oqTAY7aw=', 'U2FsdGVkX1+gFX5hro3i2M8sattnhuP6mVc3dPxqrdE='),
('support@grailpad.io', 'U2FsdGVkX1+AhM8tC9KcWbUi1RY8Ox12OxRT++elhUs=', 'U2FsdGVkX19p/+ScS07w/iSq3A+iZiPM5sW+kJnXZpg=');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ido`
--

CREATE TABLE `tbl_ido` (
  `id` int(255) NOT NULL,
  `email` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `projectName` varchar(40) COLLATE utf8_persian_ci NOT NULL,
  `projectStatus` int(1) NOT NULL,
  `isFundRaise` int(1) NOT NULL,
  `raise` varchar(100) COLLATE utf8_persian_ci DEFAULT NULL,
  `dox` int(1) NOT NULL,
  `purpose` int(1) NOT NULL,
  `otherPurpose` varchar(50) COLLATE utf8_persian_ci DEFAULT NULL,
  `migration` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `planning` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `description` varchar(200) COLLATE utf8_persian_ci NOT NULL,
  `site` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `telegram` varchar(300) COLLATE utf8_persian_ci NOT NULL,
  `twitter` varchar(300) COLLATE utf8_persian_ci NOT NULL,
  `medium` varchar(300) COLLATE utf8_persian_ci DEFAULT NULL,
  `discord` varchar(300) COLLATE utf8_persian_ci DEFAULT NULL,
  `github` varchar(300) COLLATE utf8_persian_ci DEFAULT NULL,
  `cover` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `logo` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `social` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `network` int(1) DEFAULT NULL,
  `token_price` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `summary` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `paper` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `video` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `name` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `ticker` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `contract` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `pool_size` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `hard_cap` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `soft_cap` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `omics` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `tbl_ido`
--

INSERT INTO `tbl_ido` (`id`, `email`, `projectName`, `projectStatus`, `isFundRaise`, `raise`, `dox`, `purpose`, `otherPurpose`, `migration`, `planning`, `description`, `site`, `telegram`, `twitter`, `medium`, `discord`, `github`, `cover`, `logo`, `social`, `network`, `token_price`, `summary`, `paper`, `video`, `name`, `ticker`, `contract`, `pool_size`, `hard_cap`, `soft_cap`, `omics`, `date`, `status`) VALUES
(1, 'support@grailpad.io', 'a', 1, 1, 's', 1, 1, NULL, 'a', 'a', 'aa', 'a', 'a', 'a', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'a', 'paper-1652758755784.pdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-16 19:30:00', 0),
(2, 'support@grailpad.io', 'a', 1, 1, 's', 1, 1, NULL, 'a', 'a', 'aa', 'a', 'a', 'a', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'a', 'paper-1652758794262.pdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-16 19:30:00', 0),
(3, 'support@grailpad.io', 'a', 1, 1, 's', 1, 1, NULL, 'a', 'a', 'aa', 'a', 'a', 'a', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'a', 'paper-1652758796186.pdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-16 19:30:00', 0),
(4, 'support@grailpad.io', 'last', 1, 1, 's', 1, 1, NULL, 'a', 'a', 'aa', 'a', 'a', 'a', NULL, NULL, NULL, NULL, 'bitcoin.png', NULL, NULL, NULL, 'a', 'paper-1652758798792.pdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-17 19:30:00', 0),
(5, 'support@grailpad.io', 'x', 1, 1, 'x', 1, 1, NULL, 'x', 'x', 'x', 'x', 'x', 'x', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'x', 'paper-1652762723509.pdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-17 04:45:23', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_token`
--

CREATE TABLE `tbl_token` (
  `balance` double NOT NULL,
  `network` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `stake` varchar(1000) COLLATE utf8_persian_ci DEFAULT '0',
  `locktime` varchar(1000) COLLATE utf8_persian_ci DEFAULT '0',
  `xgrail` varchar(1000) COLLATE utf8_persian_ci DEFAULT '0',
  `phase` varchar(1000) COLLATE utf8_persian_ci DEFAULT '0',
  `username` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `address` varchar(1000) COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transactions`
--

CREATE TABLE `tbl_transactions` (
  `title` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `hash` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `from_address` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `to_address` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `for_token` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `fee` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `time` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `status` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `username` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `address` varchar(1000) COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `email` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `password` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `sum_xgrail` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `sum_stake` varchar(1000) COLLATE utf8_persian_ci DEFAULT NULL,
  `phase` int(1) DEFAULT NULL,
  `status` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`email`, `password`, `sum_xgrail`, `sum_stake`, `phase`, `status`) VALUES
('pirzadeh_mahdi@yahoo.com', 'U2FsdGVkX193IEvhjBE4yF+adaFNduhtbGZR3anzgUk=', NULL, NULL, NULL, 0),
('support@grailpad.io', 'U2FsdGVkX1+AhM8tC9KcWbUi1RY8Ox12OxRT++elhUs=', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wallet`
--

CREATE TABLE `tbl_wallet` (
  `address` varchar(1000) COLLATE utf8_persian_ci NOT NULL,
  `username` varchar(1000) COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_ido`
--
ALTER TABLE `tbl_ido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `tbl_token`
--
ALTER TABLE `tbl_token`
  ADD KEY `username` (`username`),
  ADD KEY `address` (`address`);

--
-- Indexes for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  ADD KEY `username` (`username`),
  ADD KEY `address` (`address`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `tbl_wallet`
--
ALTER TABLE `tbl_wallet`
  ADD PRIMARY KEY (`address`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_ido`
--
ALTER TABLE `tbl_ido`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_ido`
--
ALTER TABLE `tbl_ido`
  ADD CONSTRAINT `tbl_ido_ibfk_1` FOREIGN KEY (`email`) REFERENCES `tbl_users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_token`
--
ALTER TABLE `tbl_token`
  ADD CONSTRAINT `tbl_token_ibfk_1` FOREIGN KEY (`username`) REFERENCES `tbl_users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_token_ibfk_2` FOREIGN KEY (`address`) REFERENCES `tbl_wallet` (`address`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  ADD CONSTRAINT `tbl_transactions_ibfk_1` FOREIGN KEY (`username`) REFERENCES `tbl_users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_transactions_ibfk_2` FOREIGN KEY (`address`) REFERENCES `tbl_wallet` (`address`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_wallet`
--
ALTER TABLE `tbl_wallet`
  ADD CONSTRAINT `tbl_wallet_ibfk_1` FOREIGN KEY (`username`) REFERENCES `tbl_users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
