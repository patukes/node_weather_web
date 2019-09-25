const request = require('request')
const geocode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+  encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicGF0dWtlcyIsImEiOiJjanp4ZG1xanUwMHdnM2dwZDgwM3kzYjdzIn0.ehA2iJdIqfM-9fN26DZVqA&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location service',undefined)
        }
        else if(!body.features.length){
            callback('unable to find location try another search',undefined)
    
        }
        else{
            const data=body.features[0]
            const latitude=data.center[0]
            const longtitude=data.center[1]
            const location=data.place_name
            callback(undefined,
                {latitude,
                    longtitude,
                    location,
    
    
            })
        }
    
    
    })
    
    }
    module.exports=geocode
    