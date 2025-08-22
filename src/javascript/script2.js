document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.querySelector('.sidebar-close');

    let cartItems = [];
    let totalAmount = 0;

    // Evento para abrir o carrinho
    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Evento para fechar o carrinho
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // Adiciona item ao carrinho
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.card .card--title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.price')[index].textContent
                        .replace('R$', '')
                        .replace('.', '')
                        .replace(',', '.')
                ),
                quantity: 1,
            };

            const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.length);
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">R$${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"></i></button>
            `;

            cartItemsList.appendChild(cartItem);
        });

        // Botões de remover item
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.currentTarget.dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removedItem = cartItems.splice(index, 1)[0];
        totalAmount -= removedItem.price * removedItem.quantity;
        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `R$${totalAmount.toFixed(2).replace('.', ',')}`;
        }
    });

// Cadastro
document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.querySelector('.profile-button');
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('user-modal');
    const closeBtn = document.getElementById('close-modal');
    const goToRegister = document.getElementById('go-to-register');
    const goToLogin = document.getElementById('go-to-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
  
    profileBtn.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      modal.classList.remove('hidden');
    });
  
    closeBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      modal.classList.add('hidden');
    });
  
    goToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
      document.getElementById('modal-title').textContent = 'Cadastro';
    });
  
    goToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
      document.getElementById('modal-title').textContent = 'Login';
    });
  
    document.getElementById('cep').addEventListener('blur', async (e) => {
      const cep = e.target.value.replace(/\D/g, '');
      if (cep.length !== 8) return;
  
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
  
      if (!data.erro) {
        document.getElementById('rua').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
        document.getElementById('address-fields').classList.remove('hidden');
      }
    });

        // Busca de Brinquedos
        const inputBusca = document.getElementById('input-busca');
        const botaoBusca = document.getElementById('botao-busca');
        const todasSessoes = document.querySelectorAll('.card--list');

        function filtrarBrinquedos() {
            const termo = inputBusca.value.toLowerCase().trim();
            let algumResultadoEncontrado = false;

            // Remove mensagem anterior se existir
            const mensagemAnterior = document.querySelector('.nenhum-resultado');
            if (mensagemAnterior) mensagemAnterior.remove();

            //seção de brinquedos
            todasSessoes.forEach(secao => {
                const cards = secao.querySelectorAll('.card');
                let algumResultadoNaSecao = false;

                // Para cada card na seção
                cards.forEach(card => {
                    const titulo = card.querySelector('.card--title').textContent.toLowerCase();
                    
                    if (titulo.includes(termo) || termo === '') {
                        card.classList.remove('escondido');
                        algumResultadoNaSecao = true;
                        algumResultadoEncontrado = true;
                    } else {
                        card.classList.add('escondido');
                    }
                });

                // Mostra/oculta o título da seção
                const tituloSecao = secao.previousElementSibling;
                if (tituloSecao && tituloSecao.classList.contains('section-heading')) {
                    tituloSecao.style.display = algumResultadoNaSecao ? 'block' : 'none';
                }
            });

            // Mensagem se não encontrar nada
                if (!algumResultadoEncontrado && termo !== '') {
                    const mensagem = document.createElement('div');
                    mensagem.className = 'nenhum-resultado';
                    mensagem.textContent = 'Nenhum brinquedo encontrado com "' + termo + '"';
                    document.querySelector('section').appendChild(mensagem);
                }
            }

        // Eventos
        inputBusca.addEventListener('input', filtrarBrinquedos);
        botaoBusca.addEventListener('click', (e) => {
            e.preventDefault();
            filtrarBrinquedos();
        });
});