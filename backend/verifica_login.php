<?php
session_start();

$resposta = ['logado' => false];

if (isset($_SESSION['usuario_id'])) {
    $resposta['logado'] = true;
    $resposta['nome'] = $_SESSION['usuario_nome'];
}

echo json_encode($resposta);
?>
