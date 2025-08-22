<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';
    $nascimento = $_POST['nascimento'] ?? '';
    $cpf = $_POST['cpf'] ?? '';
    $cep = $_POST['cep'] ?? '';
    $rua = $_POST['rua'] ?? '';
    $numero = $_POST['numero'] ?? '';
    $bairro = $_POST['bairro'] ?? '';
    $cidade = $_POST['cidade'] ?? '';
    $estado = $_POST['estado'] ?? '';
    $complemento = $_POST['complemento'] ?? '';

    // Criptografa a senha
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    // Prepara a SQL
    $stmt = $conexao->prepare("INSERT INTO usuarios 
        (nome, email, senha, nascimento, cpf, cep, rua, numero, bairro, cidade, estado, complemento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if ($stmt) {
        $stmt->bind_param("ssssssssssss", 
            $nome, $email, $senhaHash, $nascimento, $cpf, $cep, 
            $rua, $numero, $bairro, $cidade, $estado, $complemento
        );

        if ($stmt->execute()) {
            echo "Cadastro realizado com sucesso!";
        } else {
            echo "Erro ao cadastrar: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Erro na preparação da query: " . $conexao->error;
    }

    $conexao->close();
}
?>
