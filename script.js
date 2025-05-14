document.addEventListener("DOMContentLoaded", function () {
    // Elementos do DOM
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    const carouselBanner = document.getElementById('carouselBanner');
    const produtosContainer = document.getElementById("produtos-container");
    const verMaisBtn = document.getElementById("ver-mais");
    const verMaisContainer = document.getElementById("ver-mais-container");
    const botoesFiltrar = document.querySelectorAll('.btn-outline-laranja[data-categoria-filtro]');
    const scrollCategoriasContainer = document.getElementById('scroll-categorias');
    const carrinhoContador = document.getElementById('carrinho-contador');
    const cepInputFrete = document.getElementById('cep-frete');
    const whatsappLinkFrete = document.getElementById('link-whatsapp-frete');
    const numeroWhatsApp = '5522997551955';
    const searchButton = document.querySelector('.btn-nav[aria-label="Buscar produtos"]');
    const downToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const navbarCollapse = document.getElementById('navbarNav');
    const modalFreteElement = document.getElementById('modalFrete');

    const formContato = document.getElementById('form-contato');

    // Verificação de elementos essenciais
    if (!produtosContainer || !verMaisBtn || !verMaisContainer || !cepInputFrete || !whatsappLinkFrete || !carrinhoContador) {
        console.error("Elementos essenciais não encontrados no DOM");
        return;
    }

    // Variáveis de estado
    let produtos = [];
    let produtosVisiveisInicial = 4;
    let produtosVisiveis = produtosVisiveisInicial;
    let isDragging = false;
    let startX;
    let scrollLeft;
    const aosDuration = '1000';
    const aosEasing = 'ease-in-out';
    const carouselInterval = 5000;
    let currentFilter = 'todos';


    // Dados dos produtos
    const produtosData = [
        {
            id: 1,
            nome: "Bolsa de Macramê 'LUANA'",
            descricao: "Elegante bolsa de macramê, feita à mão com barbante. Um acessório único para adicionar um toque artesanal e sofisticado ao seu visual.",
            preco: 130.00,
            categoria: "bolsas",
            imagem: "assets/images/produtos/bolsas/bolsaLuana.jpg",
            detalhes: "Altura: 33cm\nLargura: 30cm\nAlça de coro: 60cm\nAlça de macramê: 43cm\nCores disponíveis: Personalizável (informa a cor no pedido)\nMaterial: Barbante"
        },
        {
            id: 2,
            nome: "Bolsa de Macramê 'LIZA'",
            descricao: "Linda bolsa de macramê em barbante, com detalhes em franja e alça longa para usar a tiracolo. ",
            preco: 55.00,
            categoria: "bolsas",
            imagem: "assets/images/produtos/bolsas/bolsaLiza.jpg",
            detalhes: "Altura: 17.5cm\nLargura: 14cm\nAlça de macramê: 122cm\nCores disponíveis: Personalizável (informa a cor no pedido)\nMaterial: Barbante"
        },
        {
            id: 3,
            nome: "Bolsa de Macramê 'NALA'",
            descricao: "Charmosa bolsa de macramê em barbante, com detalhes em franja e alça longa elegante. Uma peça artesanal que une praticidade e estilo.",
            preco: 55.00,
            categoria: "bolsas",
            imagem: "assets/images/produtos/bolsas/bolsaNala.jpg",
            detalhes: "Altura: 13cm\nLargura: 18.5cm\nAlça de macramê: 97cm\nCores disponíveis: Personalizável (informa a cor no pedido)\nMaterial: Barbante"
        },
        {
            id: 4,
            nome: "Bolsa de Macramê 'CLARISSE'",
            descricao: "Elegante bolsa de macramê, feita à mão com barbante e charmosas alças redondas de madeira.",
            preco: 70.00,
            categoria: "bolsas",
            imagem: "assets/images/produtos/bolsas/bolsaClarisse.jpg",
            detalhes: "Altura: 29cm\nLargura: 22.5cm\nCores disponíveis: Personalizável (informa a cor no pedido)\nMaterial: Barbante"
        },
        {
            id: 5,
            nome: "Bolsa de Macramê 'KARLA'",
            descricao: "Bolsa de macramê com franjas, feita à mão em barbante. Estilo boho e espaçosa.",
            preco: 140.00,
            categoria: "bolsas",
            imagem: "assets/images/produtos/bolsas/bolsaKarla.jpg",
            detalhes: "Altura: 39cm (com as franjas)\nLargura: 34cm\nAlça de macramê: 101cm\nCores disponíveis: Personalizável (informa a cor no pedido)\nMaterial: Barbante"
        },
        {
            id: 6,
            nome: "Bolsa de Macramê 'BRUNA'",
            descricao: "Bolsa de macramê com porta-moedas. Charmosa e prática.",
            preco: 140.00,
            categoria: "bolsas",
            imagem: "assets/images/produtos/bolsas/bolsaBruna.jpg",
            detalhes: "Altura: 30cm\nLargura: 35cm\nAlça de couro: 58cm\nPorta Moedas: 10.5 x 11cm\nCores disponíveis: Personalizável (informa a cor no pedido)\nMaterial: Barbante"
        },
        {
            id: 7,
            nome: "Bolsa de Macramê 'ELOÁ'",
            descricao: "Bolsa de macramê com design artesanal texturizado. Uma peça única e elegante.",
            preco: 90.00,
            categoria: "bolsas",
            imagem: "assets/images/produtos/bolsas/bolsaEloa.jpg",
            detalhes: "Altura: 27cm\nLargura: 26cm\nAlça de couro: 38cm\nCores disponíveis: Personalizável (informa a cor no pedido)\nMaterial: Barbante"
        },
        {
            id: 8,
            nome: "Bolsa de Macramê 'RUTH'",
            descricao: "Bolsa de macramê charmosa e estilosa, feita à mão com fio de malha e alça trançada.",
            preco: 70.00,
            categoria: "bolsas",
            imagem: "assets/images/produtos/bolsas/bolsaRuth.jpg",
            detalhes: "Altura: 20cm\nLargura: 22cm\nCores disponíveis: Personalizável (informa a cor no pedido)\nMaterial: Fio de malha"
        },
        {
            id: 9,
            nome: "Bolsa de Macramê 'SANDRA'",
            descricao: "Bolsa de macramê charmosa e estilosa, feita à mão com fio de malha e alça trançada.",
            preco: 70.00,
            categoria: "bolsas",
            imagem: "assets/images/produtos/bolsas/bolsaSandra.jpg",
            detalhes: "Altura: 25cm\nLargura: 22cm\nCores disponíveis: Personalizável (informa a cor no pedido)\nMaterial: Fio de malha"
        },
                {
            id: 10,
            nome: "Painél Allegra",
            descricao: "Painel de macramê charmoso e estiloso. Agrega beleza e aconchego à decoração.",
            preco: 130.00,
            categoria: "paineis",
            imagem: "assets/images/produtos/paineis/painelAllegra2.JPG",
            detalhes: "Altura: 54cm\nLargura: 37,5cm\nAlça para suporte: 33cm\nCores disponíveis: Personalizável (informa a cor no pedido)\nMaterial: Barbante e madeira"
        },
    ];


    // Inicializar o carrossel
    if (carouselBanner) {
        const carousel = new bootstrap.Carousel(carouselBanner, {
            interval: carouselInterval,
            ride: 'carousel',
            wrap: true,
            pause: 'hover'
        });

        document.querySelectorAll('.carousel-item img').forEach(img => {
            const imgElement = new Image();
            imgElement.src = img.src;
        });
    }

    // Configurar busca
    function configurarBusca() {
        const searchModal = document.createElement('div');
        searchModal.classList.add('modal', 'fade');
        searchModal.id = 'searchModal';
        searchModal.setAttribute('tabindex', '-1');
        searchModal.setAttribute('aria-hidden', 'true');
        searchModal.innerHTML = `
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Pesquisar Produtos</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="input-group mb-3">
                  <input type="text" id="searchInput" class="form-control" placeholder="Digite o nome ou categoria...">
                  <button class="btn btn-laranja" type="button" id="searchButton">
                    <i class="bi bi-search"></i>
                  </button>
                </div>
                <div id="searchResults" class="mt-3"></div>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(searchModal);

        // Event listeners para busca
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchButton');
        const searchResults = document.getElementById('searchResults');
        const modalSearch = new bootstrap.Modal(document.getElementById('searchModal'));
        const navbar = document.getElementById('navbar');
        const navbarZIndexOriginal = window.getComputedStyle(navbar).zIndex;

        // Event listener para abrir o modal de detalhes ao clicar no resultado da busca
        searchResults.addEventListener('click', function (e) {
            const clickedElement = e.target.closest('[data-produto-id]');
            if (clickedElement) {
                const produtoId = clickedElement.getAttribute('data-produto-id');

                const navbar = document.getElementById('navbar');

                if (navbar) {
                    navbar.classList.add('navbar-modal-aberto-novo');
                    navbar.style.zIndex = '1049';
                }

                // Força a remoção de possíveis efeitos colaterais visuais
                document.body.classList.remove('modal-open');
                document.body.style.paddingRight = '';

                abrirModalDetalhes(produtoId);

                const modalSearch = bootstrap.Modal.getInstance(document.getElementById('searchModal'));
                if (modalSearch) {
                    setTimeout(() => {
                        modalSearch.hide();
                    }, 100);
                }
            }
        });

        // Escuta o fechamento do modal de detalhes para limpar a navbar e body
        const modalDetalhes = document.getElementById('detalhesProdutoModal');

        if (modalDetalhes) {
            modalDetalhes.addEventListener('hidden.bs.modal', function () {
                const navbar = document.getElementById('navbar');
                if (navbar) {
                    navbar.classList.remove('navbar-modal-aberto-novo');
                    navbar.style.zIndex = '';
                }
                document.body.style.paddingRight = '';
            });
        }

        function performSearch() {
            const term = searchInput.value.toLowerCase().trim();
            searchResults.innerHTML = '';

            if (term === '') {
                searchResults.innerHTML = '<p class="text-muted text-center">Digite um termo para pesquisar</p>';
                return;
            }

            const results = produtosData.filter(produto =>
                produto.nome.toLowerCase().includes(term) ||
                produto.categoria.toLowerCase().includes(term) ||
                produto.descricao.toLowerCase().includes(term)
            );

            if (results.length === 0) {
                searchResults.innerHTML = `
                <div class="text-center py-3">
                <i class="bi bi-search" style="font-size: 2rem;"></i>
                <h5 class="mt-2">Nenhum produto encontrado</h5>
                <p class="text-muted">Tente usar termos diferentes</p>
            </div>
            `;
            } else {
                results.forEach(produto => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('d-flex', 'align-items-center', 'mb-3', 'p-2', 'border-bottom', 'cursor-pointer'); // Adicionada classe 'cursor-pointer'
                    productElement.setAttribute('data-produto-id', produto.id); // Adicionado atributo data-produto-id
                    productElement.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" width="60" height="60" class="rounded me-3">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${produto.nome}</h6>
                    <small class="text-muted">${produto.categoria}</small>
                    <div class="d-flex justify-content-between align-items-center mt-1">
                        <strong class="text-laranja">R$ ${produto.preco.toFixed(2)}</strong>
                        <button class="btn btn-sm btn-laranja btn-comprar-search" data-produto-id="${produto.id}">
                            <i class="bi bi-cart-plus"></i>
                        </button>
                    </div>
                </div>
                `;
                    searchResults.appendChild(productElement);
                });
            }
        }

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') performSearch();
        });

        // Abre o modal ao clicar no ícone de busca da navbar
        const openSearchModalButton = document.getElementById('openSearchModal');
        if (openSearchModalButton) {
            openSearchModalButton.addEventListener('click', function () {
                modalSearch.show();
                searchInput.focus();
            });
        }

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-comprar-search') || e.target.closest('.btn-comprar-search')) {
                const btn = e.target.classList.contains('btn-comprar-search') ? e.target : e.target.closest('.btn-comprar-search');
                const produtoId = btn.getAttribute('data-produto-id');
                adicionarAoCarrinho(produtoId);

                btn.innerHTML = '<i class="bi bi-check"></i>';
                btn.classList.add('disabled');
                setTimeout(() => {
                    modalSearch.hide();
                }, 500);
            }
        });

        modalSearch._element.addEventListener('show.bs.modal', function () {
            navbar.style.zIndex = '1000';
        });

        modalSearch._element.addEventListener('hidden.bs.modal', function () {
            navbar.style.zIndex = navbarZIndexOriginal; // Restaura o z-index original
        });
    }

//   document.addEventListener("DOMContentLoaded", function() {
//     configurarFormContato();
// });

// function configurarFormContato() {
//     const formContato = document.getElementById('form-contato');
//     if (!formContato) return;

//     formContato.addEventListener('submit', function (e) {
//         e.preventDefault();

//         const form = e.target;
//         const submitBtn = form.querySelector('button[type="submit"]');
//         const btnText = submitBtn.querySelector('#btn-text');
//         const btnLoading = submitBtn.querySelector('#btn-loading');

//         // Mostra o spinner
//         btnText.classList.add('d-none');
//         btnLoading.classList.remove('d-none');

//         // Aguarda um tempo antes de enviar (simulando "loading")
//         setTimeout(() => {
//             const formAction = "https://formsubmit.co/bonanartesanato@gmail.com";

//             fetch(formAction, {
//                 method: 'POST',
//                 body: new FormData(form),
//                 headers: {
//                     'Accept': 'application/json'
//                 }
//             })
//                 .then(response => {
//                     if (response.ok) {
//                         window.location.href = "obrigado.html"; // Página de obrigado
//                     } else {
//                         throw new Error('Erro ao enviar');
//                     }
//                 })
//                 .catch(error => {
//                     alert('Ocorreu um erro. Você pode nos enviar um WhatsApp diretamente!');
//                     console.error('Error:', error);
//                 })
//                 .finally(() => {
//                     btnText.classList.remove('d-none');
//                     btnLoading.classList.add('d-none');
//                 });
//         }, 1500);  // Simula o atraso antes de enviar
//     });
// }


    // Manipulação do z-index da navbar para o modal de frete
    if (modalFreteElement && navbar) {
        const navbarZIndexOriginal = window.getComputedStyle(navbar).zIndex;

        modalFreteElement.addEventListener('show.bs.modal', function () {
            navbar.classList.add('navbar-modal-aberto');
            navbar.style.zIndex = '1030';
        });

        modalFreteElement.addEventListener('hidden.bs.modal', function () {
            navbar.classList.remove('navbar-modal-aberto');
            navbar.style.zIndex = navbarZIndexOriginal;
        });
    }


    // Renderizar produtos
    function renderizarProdutos() {
        if (!produtosContainer) return;

        produtosContainer.innerHTML = produtosData.map((produto, index) => `
                <div class="produto-card ${produto.categoria}"
                    data-aos="fade-up" data-aos-duration="${aosDuration}"
                    data-aos-easing="${aosEasing}" data-aos-delay="${(index % 4) * 100}">
                    <div class="card h-100">
                        <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}" loading="lazy">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text text-muted">${produto.descricao.substring(0, 60)}...</p>
                            <div class="mt-auto">
                                <p class="fw-bold text-laranja">R$ ${produto.preco.toFixed(2)}</p>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-laranja flex-grow-1 btn-comprar"
                                            data-produto-id="${produto.id}">
                                        <i class="bi bi-cart-plus"></i> Comprar
                                    </button>
                                    <button class="btn btn-outline-laranja btn-detalhes"
                                            data-produto-id="${produto.id}">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

        produtos = Array.from(document.querySelectorAll('.produto-card'));
        atualizarVisibilidade();
    }

    // Função para fechar navbar mobile
    function fecharNavbarMobile() {
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
            new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
        }
    }



    const rotatingText = document.getElementById("rotating-text");
    const content = [
        `<i class="bi bi-truck"></i> Entregamos para todo Brasil - <a href="#" class="text-white fw-bold" data-bs-toggle="modal" data-bs-target="#modalFrete">Calcular frete</a>`,
        '"A beleza da simplicidade em cada detalhe."'
    ];

    let currentIndex = 0;
    let autoRotateInterval;
    let isPaused = false;
    const prevTextBtn = document.getElementById('prev-text');
    const nextTextBtn = document.getElementById('next-text');



    function updateRotatingText() {
        if (rotatingText) {
            rotatingText.classList.add("fade-out");
            setTimeout(() => {
                rotatingText.innerHTML = content[currentIndex];
                rotatingText.classList.remove("fade-out");
            }, 500);
        }
    }

    function nextContent() {
        currentIndex = (currentIndex + 1) % content.length;
        updateRotatingText();
    }


    function prevContent() {
        currentIndex = (currentIndex - 1 + content.length) % content.length;
        updateRotatingText();
    }


    function startAutoRotate() {
        updateRotatingText(); // Exibe a primeira mensagem imediatamente
        autoRotateInterval = setInterval(() => {
            if (!isPaused) {
                nextContent();
            }
        }, 3000);
    }


    function pauseAutoRotate() {
        clearInterval(autoRotateInterval);
    }


    // Inicia a rotação automática
    startAutoRotate();


    // Event listeners para as setas
    if (prevTextBtn) {
        prevTextBtn.addEventListener('click', () => {
            pauseAutoRotate();
            prevContent();
            startAutoRotate();
        });
    }

    if (nextTextBtn) {
        nextTextBtn.addEventListener('click', () => {
            pauseAutoRotate();
            nextContent();
            startAutoRotate();
        });
    }


    function rolarParaProdutosEFiltrar(categoria) {
        fecharNavbarMobile();

        const produtosSection = document.getElementById('produtos');
        if (produtosSection) {
            produtosSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            setTimeout(() => {
                filtrarProdutos(categoria);
                produtosSection.style.transition = 'box-shadow 0.5s ease';
                produtosSection.style.boxShadow = '0 0 0 3px rgba(252, 140, 73, 0.5)';
                setTimeout(() => {
                    produtosSection.style.boxShadow = 'none';
                }, 1000);
            }, 300);
        }
    }

    // Modal de detalhes do produto
    function abrirModalDetalhes(produtoId) {
        const produto = produtosData.find(p => p.id == produtoId);
        if (!produto) return;

        const modalImg = document.getElementById('modalProdutoImagem');
        const modalNome = document.getElementById('modalProdutoNome');
        const modalDesc = document.getElementById('modalProdutoDescricao');
        const modalPreco = document.getElementById('modalProdutoPreco');
        const btnComprarModal = document.querySelector('.btn-comprar-modal');
        const navbar = document.getElementById('navbar');
        const navbarZIndexOriginal = window.getComputedStyle(navbar).zIndex;

        if (modalImg && modalNome && modalDesc && modalPreco && btnComprarModal && navbar) {
            modalImg.src = produto.imagem;
            modalImg.alt = produto.nome;
            modalNome.textContent = produto.nome;
            modalDesc.innerHTML = `
                    ${produto.descricao}<br><br>
                     <small class="text-muted">${produto.detalhes.replace(/\n/g, '<br>')}</small>
                `;
            modalPreco.textContent = `R$ ${produto.preco.toFixed(2)}`;

            // Configura o botão de comprar do modal
            btnComprarModal.setAttribute('data-produto-id', produto.id);
            btnComprarModal.innerHTML = '<i class="bi bi-cart-plus"></i> Adicionar ao Carrinho';
            btnComprarModal.classList.remove('disabled');

            const modalDetalhes = new bootstrap.Modal(document.getElementById('detalhesProdutoModal'));

            // Adiciona a classe para escurecer a navbar ao mostrar o modal
            modalDetalhes._element.addEventListener('show.bs.modal', function () {
                navbar.classList.add('navbar-modal-aberto');
                navbar.style.zIndex = '1049';
            });

            // Remove a classe ao esconder o modal
            modalDetalhes._element.addEventListener('hidden.bs.modal', function () {
                navbar.classList.remove('navbar-modal-aberto');
                navbar.style.zIndex = navbarZIndexOriginal;
            });

            modalDetalhes.show();
        }
    }
    // Função para atualizar visibilidade dos produtos
    function atualizarVisibilidade(categoriaFiltro = 'todos') {
        if (!produtosContainer) return;

        // Atualiza o filtro atual
        currentFilter = categoriaFiltro;

        // Filtra os produtos baseado na categoria
        const produtosFiltrados = produtosData.filter(produto =>
            categoriaFiltro === 'todos' || produto.categoria === categoriaFiltro
        );

        // Limpa o container
        produtosContainer.innerHTML = '';

        // Renderiza apenas os produtos visíveis
        produtosFiltrados.slice(0, produtosVisiveis).forEach((produto, index) => {
            produtosContainer.innerHTML += `
                    <div class="produto-card ${produto.categoria}"
                        data-aos="fade-up" data-aos-duration="${aosDuration}"
                        data-aos-easing="${aosEasing}" data-aos-delay="${(index % 4) * 100}">
                        <div class="card h-100">
                            <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}" loading="lazy">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${produto.nome}</h5>
                                <p class="card-text text-muted">${produto.descricao.substring(0, 60)}...</p>
                                <div class="mt-auto">
                                    <p class="fw-bold text-laranja">R$ ${produto.preco.toFixed(2)}</p>
                                    <div class="d-flex gap-2">
                                        <button class="btn btn-laranja flex-grow-1 btn-comprar"
                                                data-produto-id="${produto.id}">
                                            <i class="bi bi-cart-plus"></i> Comprar
                                        </button>
                                        <button class="btn btn-outline-laranja btn-detalhes"
                                                data-produto-id="${produto.id}">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        });

        // Atualiza a lista de produtos no DOM
        produtos = Array.from(document.querySelectorAll('.produto-card'));

        // Mostra/oculta o botão "Ver mais"
        if (verMaisContainer) {
            verMaisContainer.style.display = produtosVisiveis < produtosFiltrados.length ? "block" : "none";
        }

        // Reinicia as animações
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    // Função para filtrar produtos
    function filtrarProdutos(categoria) {
        produtosVisiveis = produtosVisiveisInicial;
        atualizarVisibilidade(categoria);

        botoesFiltrar.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-categoria-filtro') === categoria) {
                btn.classList.add('active');
            } else if (categoria === 'todos' && btn.getAttribute('data-categoria-filtro') === 'todos') {
                btn.classList.add('active');
            }
        });
    }

    // Configurar arraste horizontal para categorias
    if (scrollCategoriasContainer) {
        scrollCategoriasContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            scrollCategoriasContainer.classList.add('active');
            startX = e.pageX - scrollCategoriasContainer.offsetLeft;
            scrollLeft = scrollCategoriasContainer.scrollLeft;
        });

        scrollCategoriasContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            scrollCategoriasContainer.classList.remove('active');
        });

        scrollCategoriasContainer.addEventListener('mouseup', () => {
            isDragging = false;
            scrollCategoriasContainer.classList.remove('active');
        });

        scrollCategoriasContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - scrollCategoriasContainer.offsetLeft;
            const walk = (x - startX) * 1;
            scrollCategoriasContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // Adicionar ao carrinho
    function adicionarAoCarrinho(produtoId) {
        const produto = produtosData.find(p => p.id == produtoId);
        if (!produto) return;

        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const itemExistente = carrinho.find(item => item.id == produtoId);

        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({
                ...produto,
                quantidade: 1
            });
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarContadorCarrinho();

        // Feedback visual
        const btn = document.querySelector(`.btn-comprar[data-produto-id="${produtoId}"]`);
        if (btn) {
            btn.innerHTML = '<i class="bi bi-check"></i> Adicionado';
            btn.classList.add('disabled');
            setTimeout(() => {
                btn.innerHTML = '<i class="bi bi-cart-plus"></i> Comprar';
                btn.classList.remove('disabled');
            }, 2000);
        }
    }

    // Atualiza contador no ícone do carrinho
    function atualizarContadorCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);

        if (carrinhoContador) {
            carrinhoContador.textContent = totalItens > 0 ? totalItens : '';
            carrinhoContador.style.display = totalItens > 0 ? 'block' : 'none';
        }
    }

    // Event Listeners Genéricos
    document.addEventListener('click', function (e) {
        // Botão de detalhes
        if (e.target.classList.contains('btn-detalhes') || e.target.closest('.btn-detalhes')) {
            const btn = e.target.classList.contains('btn-detalhes') ? e.target : e.target.closest('.btn-detalhes');
            const produtoId = btn.getAttribute('data-produto-id');
            abrirModalDetalhes(produtoId);
        }

        // Botão de comprar (tanto na lista quanto no modal)
        if (e.target.classList.contains('btn-comprar') || e.target.closest('.btn-comprar') ||
            e.target.classList.contains('btn-comprar-modal') || e.target.closest('.btn-comprar-modal')) {

            const btn = e.target.classList.contains('btn-comprar') || e.target.classList.contains('btn-comprar-modal')
                ? e.target
                : e.target.closest('.btn-comprar') || e.target.closest('.btn-comprar-modal');

            const produtoId = btn.getAttribute('data-produto-id');
            adicionarAoCarrinho(produtoId);

            // Feedback visual específico para o modal
            if (btn.classList.contains('btn-comprar-modal')) {
                btn.innerHTML = '<i class="bi bi-check"></i> Adicionado';
                btn.classList.add('disabled');
                setTimeout(() => {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('detalhesProdutoModal'));
                    modal.hide();
                }, 1500);
            }
        }
    });

    // Botão Ver Mais
    if (verMaisBtn) {
        verMaisBtn.addEventListener("click", function () {
            const produtosFiltrados = produtosData.filter(produto =>
                currentFilter === 'todos' || produto.categoria === currentFilter
            );

            // Aumenta o número de produtos visíveis
            produtosVisiveis += 4;

            // Não ultrapassa o total de produtos
            if (produtosVisiveis > produtosFiltrados.length) {
                produtosVisiveis = produtosFiltrados.length;
            }

            atualizarVisibilidade(currentFilter);
        });
    }


    // Categorias na navbar
    document.querySelectorAll('.navbar-nav .dropdown-item').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const categoria = this.getAttribute('data-categoria');
            rolarParaProdutosEFiltrar(categoria);
        });
    });

    // Cards de categoria
    document.querySelectorAll('.categoria-card').forEach(card => {
        card.addEventListener('click', function () {
            const categoria = this.id.replace('categoria-', '');
            rolarParaProdutosEFiltrar(categoria);
        });
    });

    // Botões de filtro
    botoesFiltrar.forEach(button => {
        button.addEventListener('click', function () {
            const categoria = this.getAttribute('data-categoria-filtro');
            filtrarProdutos(categoria);
        });
    });

    // Fechar navbar ao clicar em links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', fecharNavbarMobile);
    });

    // Ativar links na navbar conforme scroll
    function ativarLinkNaNavbar() {
        if (!navbar) return;

        let scrollY = window.scrollY;
        const activationOffset = window.innerHeight / 3;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - (navbar.offsetHeight || 0) - activationOffset;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight + activationOffset * 2) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });

        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }


    // Event Listener para o link de WhatsApp no modal de frete
    if (whatsappLinkFrete) {
        whatsappLinkFrete.addEventListener('click', function (event) {
            event.preventDefault();
            const cep = cepInputFrete.value.trim();
            if (cep) {
                const mensagem = `Olá! Gostaria de saber o valor do frete para o CEP: ${cep}`;
                const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
                window.open(linkWhatsApp, '_blank');
            } else {
                alert('Por favor, digite seu CEP.');
            }
        });
    }

    // Inicialização
    configurarBusca();
    renderizarProdutos();
    window.addEventListener('scroll', ativarLinkNaNavbar);
    ativarLinkNaNavbar();
    atualizarContadorCarrinho();

    // Controle da faixa de frete
    window.addEventListener('scroll', function () {
        const body = document.body;
        body.classList.toggle('scrolled', window.scrollY > 10);
    });


    // Máscara para o CEP
    if (cepInputFrete) {
        cepInputFrete.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            e.target.value = value;
        });
    }
});

// Função para scroll horizontal das categorias
function scrollCategorias(direction) {
    const container = document.getElementById('scroll-categorias');
    if (container) {
        const scrollAmount = container.offsetWidth * 0.8;
        container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
}
