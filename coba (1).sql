-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Okt 2020 pada 21.38
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coba`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `table_company`
--

CREATE TABLE `table_company` (
  `id_company` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `company_name` varchar(20) NOT NULL,
  `scope` text NOT NULL,
  `city` varchar(20) NOT NULL,
  `company_description` text NOT NULL,
  `instagram` varchar(20) NOT NULL,
  `position` varchar(20) NOT NULL,
  `linkedID` varchar(20) NOT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `table_company`
--

INSERT INTO `table_company` (`id_company`, `id_user`, `company_name`, `scope`, `city`, `company_description`, `instagram`, `position`, `linkedID`, `image`) VALUES
(16, 58, 'coba', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdgh', 'gh', 'image-1601674235488-5e8854efa6292.jpeg'),
(17, 58, 'qwe', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdg', 'gh', 'image-1602492858596-WhatsApp Image 2020-09-22 at 12.13.54.jpeg'),
(18, 58, 'qwe', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdg', 'gh', 'image-1602493151452-WhatsApp Image 2020-09-22 at 12.13.54.jpeg'),
(19, 58, 'qwe', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdg', 'gh', 'image-1602493284631-WhatsApp Image 2020-09-22 at 12.13.54.jpeg'),
(20, 58, 'qwe', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdg', 'gh', 'image-1602494581932-WhatsApp Image 2020-09-22 at 12.13.54.jpeg'),
(22, 58, 'qwe', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdg', 'gh', 'image-1602497425834-WhatsApp Image 2020-09-22 at 12.13.54.jpeg'),
(23, 58, 'qwe', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdg', 'gh', 'image-1602497901497-WhatsApp Image 2020-09-22 at 12.13.54.jpeg'),
(24, 58, 'coba3', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdg', 'gh', 'image-1602600594270-WhatsApp Image 2020-09-22 at 12.13.54.jpeg'),
(25, 58, 'coba3', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdg', 'gh', 'image-1602600677184-WhatsApp Image 2020-09-22 at 12.13.54.jpeg'),
(26, 58, 'coba3', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdg', 'gh', 'image-1602600725834-WhatsApp Image 2020-09-22 at 12.13.54.jpeg'),
(27, 58, 'coba3', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdg', 'gh', 'image-1602600812887-WhatsApp Image 2020-09-22 at 12.13.54.jpeg'),
(28, 58, 'coba3', 'fszdffg', 'dfg', 'dfg', 'dfdgdh', 'fdg', 'gh', 'image-1602691047572-WhatsApp Image 2020-09-22 at 12.13.54.jpeg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `table_experience`
--

CREATE TABLE `table_experience` (
  `id_experience` int(11) NOT NULL,
  `id_worker` int(11) NOT NULL,
  `position` varchar(20) NOT NULL,
  `company_name` varchar(20) NOT NULL,
  `description_work` text NOT NULL,
  `date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `table_experience`
--

INSERT INTO `table_experience` (`id_experience`, `id_worker`, `position`, `company_name`, `description_work`, `date`) VALUES
(8, 30, 'a', 'b', 'd', 'coba'),
(11, 30, 'a', 'b', 'd', 'c');

-- --------------------------------------------------------

--
-- Struktur dari tabel `table_portofolio`
--

CREATE TABLE `table_portofolio` (
  `id_portofolio` int(11) NOT NULL,
  `id_worker` int(11) NOT NULL,
  `name_aplication` varchar(20) NOT NULL,
  `link_repository` text NOT NULL,
  `type_repository` varchar(20) NOT NULL,
  `type_portofolio` varchar(20) NOT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `table_portofolio`
--

INSERT INTO `table_portofolio` (`id_portofolio`, `id_worker`, `name_aplication`, `link_repository`, `type_repository`, `type_portofolio`, `image`) VALUES
(4, 28, 'a', 'b', 'c', 'd', 'e'),
(5, 29, 'a', 'b', 'c', 'd', ''),
(6, 29, 'a', 'b', 'c', 'd', ''),
(7, 29, 'a', 'b', 'c', 'd', ''),
(8, 29, 'aaa', 'bb', 'cc', 'dd', 'image-1601664533064-bg03.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `table_project`
--

CREATE TABLE `table_project` (
  `id_project` int(11) NOT NULL,
  `id_company` int(11) NOT NULL,
  `name_project` varchar(100) NOT NULL,
  `description_project` text NOT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `table_project`
--

INSERT INTO `table_project` (`id_project`, `id_company`, `name_project`, `description_project`, `image`) VALUES
(5, 16, 'aaa', 'baa', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `table_projectman`
--

CREATE TABLE `table_projectman` (
  `order_worker` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `id_worker` int(11) NOT NULL,
  `message` text NOT NULL,
  `price` int(11) NOT NULL,
  `project_job` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `table_projectman`
--

INSERT INTO `table_projectman` (`order_worker`, `id_project`, `id_worker`, `message`, `price`, `project_job`) VALUES
(4, 5, 30, '', 0, ''),
(5, 5, 30, 'aaaa', 2334, 'aaaaaa'),
(6, 5, 29, 'aaaa', 2334, 'aaaaaa');

-- --------------------------------------------------------

--
-- Struktur dari tabel `table_skill`
--

CREATE TABLE `table_skill` (
  `id_skill` int(11) NOT NULL,
  `id_worker` int(11) NOT NULL,
  `skill` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `table_skill`
--

INSERT INTO `table_skill` (`id_skill`, `id_worker`, `skill`) VALUES
(19, 18, 'R'),
(20, 18, 'py'),
(21, 30, 'php'),
(22, 30, 'R'),
(24, 30, 'php');

-- --------------------------------------------------------

--
-- Struktur dari tabel `table_user`
--

CREATE TABLE `table_user` (
  `id_user` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` text NOT NULL,
  `number_phone` int(11) NOT NULL,
  `user_role` int(1) NOT NULL,
  `user_status` int(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `table_user`
--

INSERT INTO `table_user` (`id_user`, `name`, `email`, `password`, `number_phone`, `user_role`, `user_status`, `created_at`, `update_at`) VALUES
(56, 'aa', 'bbii', 'cc', 45, 0, 0, '2020-09-28 06:52:35', '2020-09-28 06:52:35'),
(57, 'd', 'demail', 'dpw', 4, 0, 0, '2020-09-28 06:52:35', '2020-09-28 06:52:35'),
(58, 'dion1', 'dion1@gmail.com', '$2a$10$.Zi1x5zZoZboX/W33V1.W.YkTx0PD051nnUpV9X5qveHssen2THj2', 4, 1, 0, '2020-09-28 07:20:00', '2020-09-28 07:20:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `table_worker`
--

CREATE TABLE `table_worker` (
  `id_worker` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `jobdesk` varchar(20) NOT NULL,
  `domicile` varchar(20) NOT NULL,
  `workplace` varchar(20) NOT NULL,
  `description_personal` text NOT NULL,
  `job_status` varchar(20) NOT NULL,
  `instagram` varchar(20) NOT NULL,
  `github` varchar(20) NOT NULL,
  `gitlab` varchar(20) NOT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `table_worker`
--

INSERT INTO `table_worker` (`id_worker`, `id_user`, `jobdesk`, `domicile`, `workplace`, `description_personal`, `job_status`, `instagram`, `github`, `gitlab`, `image`) VALUES
(18, 57, 'd', 'ddomicili', 'dplace', 'ddes', 'dstatus', 'dig', 'dgithub', 'dgitlab', NULL),
(19, 57, 'd', 'ddomicili', 'dplace', 'ddes', 'dstatus', 'dig', 'dgithub', 'dgitlab', ''),
(23, 58, 'd', 'ddomicili', 'dplace', 'ddes', 'dstatus', 'dig', 'dgithub', 'dgitlab', ''),
(24, 58, 'd', 'ddomicili', 'dplace', 'ddes', 'dstatus', 'dig', 'dgithub', 'dgitlab', ''),
(25, 58, 'd', 'ddomicili', 'dplace', 'ddes', 'dstatus', 'dig', 'dgithub', 'dgitlab', ''),
(26, 58, 'd', 'ddomicili', 'dplace', 'ddes', 'dstatus', 'dig', 'dgithub', 'dgitlab', ''),
(27, 58, 'd', 'ddomicili', 'dplace', 'ddes', 'dstatus', 'dig', 'dgithub', 'dgitlab', ''),
(28, 58, 'd', 'ddomicili', 'dplace', 'ddes', 'dstatus', 'dig', 'dgithub', 'dgitlab', 'image-1601320087489-WhatsApp Image 2020-09-22 at 12.13.54.jpeg'),
(29, 58, 'e', 'ddomicili', 'dplace', 'ddes', 'dstatus', 'dig', 'dgithub', 'dgitlab', 'image-1601629613967-B4E3B105-052B-448A-BC70-F93A32360D0D.jpeg'),
(30, 58, 'aa', 'bb', 'cc', 'hh', 'dd', 'ee', 'ff', 'gg', 'image-1601486151769-bg03.png');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `table_company`
--
ALTER TABLE `table_company`
  ADD PRIMARY KEY (`id_company`),
  ADD KEY `usertocompany` (`id_user`);

--
-- Indeks untuk tabel `table_experience`
--
ALTER TABLE `table_experience`
  ADD PRIMARY KEY (`id_experience`),
  ADD KEY `workertoexperience` (`id_worker`);

--
-- Indeks untuk tabel `table_portofolio`
--
ALTER TABLE `table_portofolio`
  ADD PRIMARY KEY (`id_portofolio`),
  ADD KEY `workertoportofolio` (`id_worker`);

--
-- Indeks untuk tabel `table_project`
--
ALTER TABLE `table_project`
  ADD PRIMARY KEY (`id_project`),
  ADD KEY `companytoproject` (`id_company`);

--
-- Indeks untuk tabel `table_projectman`
--
ALTER TABLE `table_projectman`
  ADD PRIMARY KEY (`order_worker`),
  ADD KEY `projecttoprojectman` (`id_project`),
  ADD KEY `workertoprojectman` (`id_worker`);

--
-- Indeks untuk tabel `table_skill`
--
ALTER TABLE `table_skill`
  ADD PRIMARY KEY (`id_skill`),
  ADD KEY `workertoskill` (`id_worker`);

--
-- Indeks untuk tabel `table_user`
--
ALTER TABLE `table_user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `table_worker`
--
ALTER TABLE `table_worker`
  ADD PRIMARY KEY (`id_worker`),
  ADD KEY `usertoworker` (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `table_company`
--
ALTER TABLE `table_company`
  MODIFY `id_company` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT untuk tabel `table_experience`
--
ALTER TABLE `table_experience`
  MODIFY `id_experience` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `table_portofolio`
--
ALTER TABLE `table_portofolio`
  MODIFY `id_portofolio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `table_project`
--
ALTER TABLE `table_project`
  MODIFY `id_project` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `table_projectman`
--
ALTER TABLE `table_projectman`
  MODIFY `order_worker` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `table_skill`
--
ALTER TABLE `table_skill`
  MODIFY `id_skill` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `table_user`
--
ALTER TABLE `table_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT untuk tabel `table_worker`
--
ALTER TABLE `table_worker`
  MODIFY `id_worker` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `table_company`
--
ALTER TABLE `table_company`
  ADD CONSTRAINT `usertocompany` FOREIGN KEY (`id_user`) REFERENCES `table_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `table_experience`
--
ALTER TABLE `table_experience`
  ADD CONSTRAINT `workertoexperience` FOREIGN KEY (`id_worker`) REFERENCES `table_worker` (`id_worker`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `table_portofolio`
--
ALTER TABLE `table_portofolio`
  ADD CONSTRAINT `workertoportofolio` FOREIGN KEY (`id_worker`) REFERENCES `table_worker` (`id_worker`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `table_project`
--
ALTER TABLE `table_project`
  ADD CONSTRAINT `companytoproject` FOREIGN KEY (`id_company`) REFERENCES `table_company` (`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `table_projectman`
--
ALTER TABLE `table_projectman`
  ADD CONSTRAINT `projecttoprojectman` FOREIGN KEY (`id_project`) REFERENCES `table_project` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `workertoprojectman` FOREIGN KEY (`id_worker`) REFERENCES `table_worker` (`id_worker`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `table_skill`
--
ALTER TABLE `table_skill`
  ADD CONSTRAINT `workertoskill` FOREIGN KEY (`id_worker`) REFERENCES `table_worker` (`id_worker`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `table_worker`
--
ALTER TABLE `table_worker`
  ADD CONSTRAINT `usertoworker` FOREIGN KEY (`id_user`) REFERENCES `table_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
