const convert = require('xml-js');


const convertjsonToXml = (jsonData)=>{

    const jsonStr = JSON.stringify(jsonData)
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const xmlData = 
    '<?xml version="1.0" encoding="utf-8"?> ' +
         convert.json2xml(jsonStr, options)

    return xmlData

}

module.exports = convertjsonToXml;

