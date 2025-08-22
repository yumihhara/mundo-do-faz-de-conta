document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('login-form');
  const loginMsg = document.getElementById('login-message');
  const logoutBtn = document.getElementById('logout-btn');
  const profileBtn = document.querySelector('.profile-button'); // botão com ícone do usuário

    // Evento de submit do formulário de login via ajax
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formLogin);

    fetch('backend/login.php', {
      method: 'POST',
      body: formData
    })
      .then(res => res.text())
      .then(msg => {
        loginMsg.textContent = msg;

        if (msg.includes("sucesso")) {
          loginMsg.style.color = 'green';
          setTimeout(() => window.location.reload(), 1000);
        } else {
          loginMsg.style.color = 'red';
        }
      });
  });

  // Verifica se o usuário está logado
  fetch('backend/verifica_login.php')
    .then(res => res.json())
    .then(data => {
      if (data.logado) {
        logoutBtn.classList.remove('hidden');
        profileBtn.classList.add('hidden');
        loginMsg.textContent = "Bem-vindo, " + data.nome + "!";
        loginMsg.style.color = "green";
      } else {
        logoutBtn.classList.add('hidden');
        profileBtn.classList.remove('hidden');
      }
    });

  // Faz logout
  logoutBtn.addEventListener('click', () => {
    fetch('backend/logout.php')
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        window.location.reload();
      });
  });
});
