document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const status = document.getElementById('cadastro-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch('backend/cadastro.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.text())
    .then(data => {
      status.textContent = data;
      status.style.color = 'green';
      form.reset();
    })
    .catch(error => {
      status.textContent = 'Erro ao cadastrar.';
      status.style.color = 'red';
      console.error('Erro:', error);
    });
  });
});
