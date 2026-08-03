tabelas
CREATE TABLE `convidado` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `nome_completo` varchar(191) NOT NULL,
 `email` varchar(191) NOT NULL,
 `telefone` varchar(191) NOT NULL,
 `check_in` tinyint(1) NOT NULL DEFAULT 0,
 `horario_checkin` datetime(3) DEFAULT NULL,
 `criado_em` datetime(3) NOT NULL DEFAULT current_timestamp(3),
 `mesaId` int(11) DEFAULT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `Convidado_email_key` (`email`),
 UNIQUE KEY `Convidado_telefone_key` (`telefone`),
 KEY `Convidado_mesaId_fkey` (`mesaId`),
 CONSTRAINT `Convidado_mesaId_fkey` FOREIGN KEY (`mesaId`) REFERENCES `mesa` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE `mesa` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `numero` int(11) NOT NULL,
 `capacidade` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `Mesa_numero_key` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE `usuario` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `nome` varchar(191) NOT NULL,
 `CPF` varchar(191) NOT NULL,
 `email` varchar(191) NOT NULL,
 `senha` varchar(191) NOT NULL,
 `cargo` enum('ADMIN','CERIMONIALISTA') NOT NULL,
 `criado_em` datetime(3) NOT NULL DEFAULT current_timestamp(3),
 PRIMARY KEY (`id`),
 UNIQUE KEY `Usuario_CPF_key` (`CPF`),
 UNIQUE KEY `Usuario_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci