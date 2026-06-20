/**
 * ============================================================
 * SCRIPT PRINCIPAL – ZARA (COM LOGS DE DEPURAÇÃO)
 * ============================================================
 */

(function() {
    'use strict';

    console.log('🔵 Script iniciado. Página:', window.location.pathname);

    // ============================================================
    // 1. CONFIGURAÇÕES
    // ============================================================
    const CART_KEY = 'zara_cart';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // ============================================================
    // 2. FUNÇÕES DO CARRINHO
    // ============================================================
    function getCart() {
        try {
            const data = localStorage.getItem(CART_KEY);
            console.log('📦 Carrinho atual:', data);
            return JSON.parse(data) || [];
        } catch (e) {
            console.error('❌ Erro ao ler carrinho:', e);
            return [];
        }
    }

    function saveCart(cart) {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            console.log('💾 Carrinho salvo:', cart);
        } catch (e) {
            console.error('❌ Erro ao salvar carrinho:', e);
        }
    }

    function addToCart(product) {
        console.log('🛒 Adicionando produto:', product);
        const cart = getCart();
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity += product.quantity || 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                ref: product.ref || '',
                color: product.color || '',
                size: product.size || '',
                price: product.price,
                image: product.image || '',
                quantity: product.quantity || 1
            });
        }
        saveCart(cart);
        updateCartBadge();
        return cart;
    }

    function removeFromCart(productId) {
        console.log('🗑️ Removendo produto:', productId);
        let cart = getCart();
        cart = cart.filter(item => item.id !== productId);
        saveCart(cart);
        updateCartBadge();
        renderCartPage(); // se estiver na página do carrinho
        return cart;
    }

    function updateQuantity(productId, delta) {
        console.log('🔄 Atualizando quantidade:', productId, delta);
        const cart = getCart();
        const item = cart.find(i => i.id === productId);
        if (!item) return;

        const newQty = item.quantity + delta;
        if (newQty <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQty;
            saveCart(cart);
            updateCartBadge();
            renderCartPage();
        }
    }

    function getCartCount() {
        const cart = getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    }

    function updateCartBadge() {
        const count = getCartCount();
        console.log('🏷️ Atualizando badge:', count);
        document.querySelectorAll('.cart-badge, .badge-cart').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'inline-block' : 'none';
        });
        const cartHeader = document.querySelector('.cart-header h2');
        if (cartHeader) {
            cartHeader.textContent = `CARRINHO (${count})`;
        }
    }

    // ============================================================
    // 3. PÁGINA DO PRODUTO
    // ============================================================
    function setupProductPage() {
        console.log('🛍️ Configurando página do produto');
        const sizeBtns = document.querySelectorAll('.size-btn');
        const addBtn = document.querySelector('.add-button');

        if (!addBtn) {
            console.warn('⚠️ Botão .add-button não encontrado');
            return;
        }

        console.log('✅ Botão .add-button encontrado');

        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });

        addBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Clique no botão ADICIONAR');

            const selectedSize = document.querySelector('.size-btn.selected');
            const size = selectedSize ? selectedSize.textContent.trim() : 'M';

            const nameEl = document.querySelector('.product-heading h2');
            const refEl = document.querySelector('.product-reference p');
            const priceEl = document.querySelector('.product-price h3');
            const imageEl = document.querySelector('.product-hero');

            const product = {
                id: generateId(),
                name: nameEl ? nameEl.textContent.trim() : 'Produto',
                ref: refEl ? refEl.textContent.trim() : '',
                size: size,
                price: priceEl ? parseFloat(priceEl.textContent.replace(/[^0-9,]/g, '').replace(',', '.')) : 0,
                image: imageEl ? imageEl.src : '',
                quantity: 1
            };

            console.log('📦 Produto montado:', product);

            if (!product.price) {
                const priceData = document.querySelector('[data-price]');
                if (priceData) {
                    product.price = parseFloat(priceData.getAttribute('data-price'));
                }
            }

            addToCart(product);
            alert('Produto adicionado ao carrinho!');
        });
    }

    // ============================================================
    // 4. PÁGINA DO CARRINHO
    // ============================================================
    function renderCartPage() {
        console.log('🛒 Renderizando página do carrinho');
        const container = document.querySelector('.cart-items');
        if (!container) {
            console.warn('⚠️ .cart-items não encontrado');
            return;
        }

        const cart = getCart();
        if (cart.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:40px 20px; color:#aaa;">
                    <p style="font-size:16px; font-weight:500; text-transform:uppercase; letter-spacing:1px;">Seu carrinho está vazio</p>
                    <p style="font-size:13px; margin-top:8px;">Continue comprando para adicionar itens.</p>
                </div>
            `;
            updateSummaryTotals(0);
            return;
        }

        let html = '';
        cart.forEach((item) => {
            const totalFormatted = formatPrice(item.price * item.quantity);
            html += `
                <article class="cart-item" data-id="${item.id}">
                    <div class="item-image">
                        <img src="${item.image || 'assets/placeholder.png'}" alt="${item.name}">
                    </div>
                    <div class="item-info">
                        <div class="item-header">
                            <h3>${item.name}</h3>
                            <button class="btn-remove" data-id="${item.id}">✕</button>
                        </div>
                        <p class="ref">${item.ref}</p>
                        <p class="attr">COR: ${item.color || '—'}</p>
                        <p class="attr">TAMANHO: ${item.size || '—'}</p>
                        <div class="item-actions">
                            <div class="qty-control">
                                <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
                                <span class="qty-number">${item.quantity}</span>
                                <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
                            </div>
                            <span class="item-price">${totalFormatted}</span>
                        </div>
                    </div>
                </article>
            `;
        });
        container.innerHTML = html;

        const total = getCartTotal();
        updateSummaryTotals(total);
        updateCartBadge();

        // Event listeners para remoção e quantidade
        container.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                removeFromCart(id);
            });
        });

        container.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const delta = parseInt(this.getAttribute('data-delta'), 10);
                updateQuantity(id, delta);
            });
        });
    }

    // ============================================================
    // 5. FUNÇÕES AUXILIARES
    // ============================================================
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }

    function formatPrice(value) {
        return 'R$ ' + value.toFixed(2).replace('.', ',');
    }

    function getCartTotal() {
        const cart = getCart();
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    function updateSummaryTotals(total) {
        const subtotalEl = document.querySelector('.summary-row span:last-child');
        const totalEl = document.querySelector('.summary-total span:last-child');
        if (subtotalEl) subtotalEl.textContent = formatPrice(total);
        if (totalEl) totalEl.textContent = formatPrice(total);
    }

    function navigateTo(page) {
        if (page && page !== currentPage) {
            window.location.href = page;
        }
    }

    // ============================================================
    // 6. INICIALIZAÇÃO
    // ============================================================
    function init() {
        console.log('🚀 Inicializando para página:', currentPage);

        // Atualizar badge
        updateCartBadge();

        // Inicializar com base na página
        switch (currentPage) {
            case 'pag-produto.html':
                setupProductPage();
                break;
            case 'pag-carrinho.html':
                renderCartPage();
                break;
            case 'pag-checkout.html':
                // setupCheckoutPage();
                break;
            case 'pag-busca.html':
                // setupSearchPage();
                break;
            case 'pag-menu.html':
                // setupMenuPage();
                break;
            case 'pag-conta.html':
                // setupContaPage();
                break;
            case 'pag-login.html':
                // setupLoginPage();
                break;
            default:
                console.log('ℹ️ Nenhuma configuração específica para esta página');
                break;
        }
    }

    // ============================================================
    // EXPOR FUNÇÕES GLOBAIS
    // ============================================================
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.getCart = getCart;
    window.saveCart = saveCart;
    window.formatPrice = formatPrice;
    window.navigateTo = navigateTo;

    // ============================================================
    // INICIAR
    // ============================================================
    document.addEventListener('DOMContentLoaded', init);
})();