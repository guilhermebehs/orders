const axios = require('axios')

async function  getWonDeals (){
 const resultados = 
  await  axios({
    url: 'https://nenhuma.pipedrive.com/api/v1/deals?api_token=9db3b884b9d5010af83f624e489e98854553b852&status=won',
    method: 'GET'
  })
  .then((res) =>{
      if(res.data && res.data.data && Array.isArray(res.data.data) === true)
        return res.data.data
      return []
  })

  return resultados
}

module.exports = {getWonDeals}



