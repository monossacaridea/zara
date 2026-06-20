<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>README · ZARA (clone)</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background: #f7f5f2;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            justify-content: center;
            padding: 3rem 1rem;
            color: #1e1e1e;
            line-height: 1.6;
        }
        .readme {
            max-width: 820px;
            width: 100%;
            background: #ffffff;
            padding: 2.5rem 3rem;
            border-radius: 20px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }
        h1 {
            font-size: 2rem;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 0.2rem;
        }
        .sub {
            font-size: 1rem;
            color: #5e5e5e;
            border-bottom: 1px solid #eae7e4;
            padding-bottom: 1.2rem;
            margin-bottom: 1.8rem;
        }
        h2 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 0.5rem;
        }
        p, li {
            color: #2c2c2c;
        }
        ul {
            padding-left: 1.4rem;
            margin: 0.5rem 0 1rem 0;
        }
        li {
            margin-bottom: 0.25rem;
        }
        .tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 0.8rem 0 1.2rem 0;
        }
        .tech span {
            background: #f0edea;
            padding: 0.2rem 0.9rem;
            border-radius: 30px;
            font-size: 0.8rem;
        }
        hr {
            border: none;
            border-top: 1px solid #eae7e4;
            margin: 2rem 0 1.2rem 0;
        }
        .footer {
            font-size: 0.9rem;
            color: #6b6b6b;
        }
        a {
            color: #1e1e1e;
            text-decoration: none;
            border-bottom: 1px solid #d0cdca;
        }
        a:hover {
            border-bottom-color: #1e1e1e;
        }
        pre {
            background: #f3f1ef;
            padding: 0.6rem 1rem;
            border-radius: 10px;
            font-size: 0.85rem;
            overflow-x: auto;
            margin: 0.5rem 0 1rem 0;
        }
        @media (max-width: 600px) {
            .readme { padding: 1.5rem; }
            h1 { font-size: 1.6rem; }
        }
    </style>
</head>
<body>
    <div class="readme">

        <h1>zara</h1>
        <div class="sub">Clone da interface de e-commerce da ZARA</div>

        <p>
            Projeto front-end que reproduz a experiência visual e funcional de uma loja de moda,
            inspirado na identidade da ZARA. O fluxo completo de compra foi simulado, incluindo
            navegação, busca, carrinho, checkout e área do usuário.
        </p>

        <h2>Funcionalidades</h2>
        <ul>
            <li><strong>Página inicial</strong> — vitrine com destaques e promoções.</li>
            <li><strong>Busca e categorias</strong> — navegação por seções (Mulher, Homem, Crianças).</li>
            <li><strong>Carrinho</strong> — resumo dos itens com total atualizado.</li>
            <li><strong>Checkout</strong> — simulação de pagamento com múltiplas opções.</li>
            <li><strong>Confirmação</strong> — tela de pedido finalizado.</li>
            <li><strong>Login e Conta</strong> — autenticação e visualização de dados do usuário.</li>
            <li><strong>Menu lateral</strong> — acesso rápido a todas as seções.</li>
        </ul>

        <h2>Tecnologias utilizadas</h2>
        <div class="tech">
            <span>HTML5</span>
            <span>CSS3</span>
            <span>JavaScript</span>
            <span>Google Fonts</span>
        </div>

        <h2>Como executar</h2>
        <p>
            Clone o repositório e abra o arquivo <code>index.html</code> no navegador.
            Não requer instalação de dependências.
        </p>
        <pre>
git clone https://github.com/monossacaridea/zara.git
cd zara
open index.html
        </pre>

        <hr />

        <div class="footer">
            Projeto finalizado · <a href="https://github.com/monossacaridea/zara" target="_blank">github.com/monossacaridea/zara</a>
        </div>

    </div>
</body>
</html>
