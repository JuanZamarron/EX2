const request = require('request')

const q = function(search, callback) {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`
    request({ url: url, json: true }, function(error, response) {
        if (error){
            callback('Service unavailable.', undefined)
        }else if(response.statusCode == 404) { 
            callback(response.body.message, undefined)
          } else if(response.statusCode == 401) { 
            callback(response.body.message, undefined)
        }else {
            const data = response.body
            const id = {
                id: data.objectIDs[0]
            }
            callback(undefined, id)
        }
    })
}

const objectID = function(id, callback){
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    request({ url: url, json: true }, function(error, response){
        if(error) {
            callback('Service unavailable.', undefined)
          } else if(response.statusCode == 404) { 
            callback(response.body.message, undefined)
          } else if(response.statusCode == 401) { 
            callback(response.body.message, undefined)
          } else {
              const data = response.body
              const info = {
                artist : data.constituents[0].name,
                title: data.title,
                year: data.objectEndDate,
                technique: data.medium,
                metUrl: data.objectURL
              }
              callback(undefined, info)
          }
    })
}

module.exports = {
    q: q,
    objectID: objectID
}
