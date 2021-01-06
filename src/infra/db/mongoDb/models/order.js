const connection = require('../connection');

const Order = connection.model('order', 
{ 
  numero: String,
  totalvenda: Number,
  data: String,
  cliente: Object,
  itens: Array
})

module.exports = Order;