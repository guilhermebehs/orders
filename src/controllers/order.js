const {getAllOrders,insertOrder} = require('../services/bling'); 
const {getWonDeals} = require('../services/pipedrive');
const convertjsonToXml = require('../utils/jsonToXml');
const Order = require('../infra/db/mongoDb/models/order');
const moment = require('moment')


const getAll = async function (){

    const orders = await Order.aggregate([
                        {
                          "$group":
                           {
                            "_id":{'data':'$data'}, 
                            "soma": {"$sum":'$totalvenda'} 
                           }
                         },
                        {
                         "$project" : {
                           _id : 0,
                           data: '$_id.data',
                           valorTotal: "$soma" 
                         }
                       }
                    ])
    
        return orders
}

const importFromPipedriveToBling = async function (){

     const wonDeals = await getWonDeals()

     Promise.all(wonDeals.map(async(deal)=>{
          
          let order = convertjsonToXml({
               pedido:{
                    data: moment(deal.won_time !== null ? deal.won_time : deal.add_time).format('DD/MM/YYYY'), 
                    vendedor: deal.owner_name, 
                    cliente: {nome: deal.person_id.name},
                    itens:[{
                        item:
                           {
                            codigo:1,
                            descricao: "meu produto",
                            qtde: deal.value,
                            vlr_unit: 5.000,
                           }
                    }] 
                    }})
          order = order.replaceAll('\"', "'");
       
          await insertOrder(order)

     }))
           
}

const sync = async function (){

     await importFromPipedriveToBling()
     const orders = await getAllOrders();
     Promise.all(orders.map(async(order)=>{
          const numero = order.pedido.numero;
          const totalvenda = Number(order.pedido.totalvenda);
          const data = moment(order.pedido.data).format('DD/MM/YYYY');
          const cliente = order.pedido.cliente;
          const itens = order.pedido.itens;
          const orderExists = await Order.findOne({numero}).then((order)=>order)

          if(!orderExists){
            const newOrder = new Order({numero,totalvenda, totalvenda, data, cliente, itens});
            await newOrder.save().then()
          }

     }))
}


module.exports = {sync, getAll}