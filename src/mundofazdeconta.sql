create database mundodofazdeconta;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    nascimento DATE,
    cpf VARCHAR(14),
    cep VARCHAR(10),
    rua VARCHAR(100),
    numero VARCHAR(10),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(100),
    complemento VARCHAR(100)
);


