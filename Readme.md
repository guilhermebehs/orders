* Sobre as rotas

    - "GET /health" : Valida o funcionamento/saúde da aplicação;

    - "GET /orders" : Retorna os pedidos agregados por data e valor total;

    - "GET /syncOrders" : Sincroniza Pipedrive com Bling e insere os dados no MongoDB;


* Sobre o MongoDB

    - Foi utilizado o servidor local para armazenar os pedidos;

    - A alteração do host pode ser feito em src/infra/db/mongoDb/connection.js
