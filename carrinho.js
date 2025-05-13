document.addEventListener("DOMContentLoaded", function () {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaCarrinho = document.getElementById('lista-carrinho');
    const carrinhoVazioDiv = document.getElementById('carrinho-vazio');
    const finalizarBtn = document.getElementById('finalizar-pedido');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const freteElement = document.getElementById('frete');
    const numeroWhatsApp = '5522997551955'; // Substitua pelo número da artesã

    document.getElementById('cep-input')?.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        e.target.value = value;
    });

    // Função para atualizar a exibição do carrinho
    function atualizarCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const listaCarrinhoBody = document.querySelector('#lista-carrinho .card-body');
        const carrinhoVazioDiv = document.getElementById('carrinho-vazio');
        const finalizarBtn = document.getElementById('finalizar-pedido');

        if (carrinho.length === 0) {
            // Esconde a lista de produtos
            listaCarrinhoBody.innerHTML = '';
            listaCarrinhoBody.style.display = 'none';

            // Mostra a mensagem de carrinho vazio
            carrinhoVazioDiv.style.display = 'block';

            // Desabilita o botão de finalizar
            finalizarBtn.disabled = true;

            // Atualiza totais
            atualizarTotal();
            return;
        }

        // Se houver produtos:
        carrinhoVazioDiv.style.display = 'none';
        listaCarrinhoBody.style.display = 'block';
        finalizarBtn.disabled = false;
        renderizarItensCarrinho();
        atualizarTotal();
        adicionarEventos();
    }

    // Função para renderizar os itens do carrinho na tela
    function renderizarItensCarrinho() {
        const listaCarrinhoBody = document.querySelector('#lista-carrinho .card-body');

        if (carrinho.length === 0) {
            listaCarrinhoBody.innerHTML = '';
            return;
        }

        listaCarrinhoBody.innerHTML = carrinho.map(item => `
            <div class="row align-items-center mb-3 produto-carrinho" data-id="${item.id}">
                <div class="col-md-3">
                    <img src="${item.imagem}" alt="${item.nome}" class="img-fluid rounded">
                </div>
                <div class="col-md-5">
                    <h6 class="mb-1">${item.nome}</h6>
                    <small class="text-muted">${item.descricao.substring(0, 50)}...</small>
                </div>
                <div class="col-md-2">
                    <input type="number" min="1" value="${item.quantidade}" class="form-control quantidade">
                </div>
                <div class="col-md-2 text-end">
                    <span class="preco">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                    <button class="btn btn-sm btn-outline-danger remover-item ms-2">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Função para atualizar os totais
    function atualizarTotal() {
        const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        totalElement.textContent = `R$ ${subtotal.toFixed(2)}`; // Inicialmente o total é igual ao subtotal
        freteElement.textContent = 'A calcular';
    }

    // Função para adicionar eventos aos elementos do carrinho
    function adicionarEventos() {
        document.querySelectorAll('.quantidade').forEach(input => {
            input.addEventListener('change', function () {
                const id = this.closest('.produto-carrinho').dataset.id;
                const item = carrinho.find(item => item.id == id);
                if (item) {
                    item.quantidade = parseInt(this.value);
                    localStorage.setItem('carrinho', JSON.stringify(carrinho));
                    atualizarCarrinho();
                }
            });
        });

        document.querySelectorAll('.remover-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = this.closest('.produto-carrinho').dataset.id;
                const index = carrinho.findIndex(item => item.id == id);
                if (index > -1) {
                    carrinho.splice(index, 1);
                    localStorage.setItem('carrinho', JSON.stringify(carrinho));
                    atualizarCarrinho();
                }
            });
        });
    }

    // Evento para finalizar pedido via WhatsApp
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', function () {
            const cep = document.getElementById('cep-input')?.value.trim() || '';

            let mensagem = `Olá, gostaria de finalizar meu pedido:\n\n${carrinho.map(item =>
                `- ${item.nome} (${item.quantidade}x): R$ ${(item.preco * item.quantidade).toFixed(2)}`
            ).join('\n')}\n\n`;

            // Adiciona o CEP se foi preenchido
            if (cep) {
                mensagem += `CEP: ${cep}\n`;
            }

            mensagem += `Subtotal: ${subtotalElement.textContent}\n`;
            mensagem += `Total: ${totalElement.textContent}`;

            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
        });
    }

    // Inicialização da página do carrinho
    atualizarCarrinho();
});