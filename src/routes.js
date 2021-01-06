const {Router} = require('express')
const {sync,getAll} = require('./controllers/order');

const routes = Router()

routes.get('/health', (req,res)=>{
    res.json('LINKAPI')
})

routes.get('/syncOrders', async(req,res)=>{
   await sync()
   res.json('Done')
})

routes.get('/orders', async(req,res)=>{
      const orders = await getAll()
      res.json(orders)
})



module.exports = routes
