const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Metodos HTTP: get, post, put editar, delete apagar

//Tipos de parametro
// Query params: (get) request.query (filtros, ordenação, paginação, ...) 
// Route params: resquest.params (put e delete) (identificar um recurso 
                                                //na alteração ou remoção)
// Body: (post e put) request.body (Dados para criação ou 
                                  //alteração de um registro)

//Mongo DB (Não-relacional)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store); //rota

routes.get('/search', SearchController.index);

module.exports = routes;
