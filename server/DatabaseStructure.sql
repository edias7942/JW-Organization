-- Criação do Banco de Dados: Esse comando só deve ser executado uma única vez...
CREATE DATABASE JWCCC;

USE JWCCC;

-- Criação da Tabela de Designações: Esse comando só deve ser executado uma única vez
CREATE TABLE DESIGNACOES_2023(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    DIA INT(2),
    SEMANA INT(2),
    P_SEMANA INT(1),
    MES INT(1),
    LUGAR VARCHAR(50),
    HORARIO CHAR(8),
    DESIGNADO_1 VARCHAR(20),
    DESIGNADO_2 VARCHAR(20)
);

-- Criação da Tabela dos Locais do Carrinho: Esse comando só deve ser executado uma única vez
CREATE TABLE `locais_carrinho` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOME_LOCAL` varchar(30) DEFAULT NULL,
  `RUA` varchar(30) DEFAULT NULL,
  `N_RUA` int DEFAULT NULL,
  `COODERNADASY` varchar(20) DEFAULT NULL,
  `COORDENADASX` varchar(30) DEFAULT NULL,
  `DESCRICAO` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
);
