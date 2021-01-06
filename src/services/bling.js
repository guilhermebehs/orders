const axios = require('axios')

async function  insertOrder (order){
 const resultados = 
  await  axios({
    url: 'https://bling.com.br/Api/v2/pedido/json/?apikey=d6d4c531caabe225b44ebd6524239be8308bbcbfe1f496b28c51148dab2109d08001a366&xml='+order,
    method: 'POST'
  })
  .then((res) =>{
      return res.data
  })
}


async function  getAllOrders (){
    const resultados = 
     await  axios({
       url: 'https://bling.com.br/Api/v2/pedidos/json/?apikey=d6d4c531caabe225b44ebd6524239be8308bbcbfe1f496b28c51148dab2109d08001a366',
       method: 'GET'
     })
     .then((res) =>{
         if(res.data && res.data && res.data.retorno && Array.isArray(res.data.retorno.pedidos))
             return res.data.retorno.pedidos
         return []
     })
     return resultados;
   }

module.exports = {insertOrder, getAllOrders}
