const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/3724554b5018a3ef7d667ea2c6dcd337/'+ encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)+'?'+'units=si'
    request({url,json:true},(error,{body})=>{
      if(error){
callback('unable to connect service',undefined)

      }
      else if(body.error){ 
          callback('unable to find location try another search',undefined)


      }
      else{
          const data=body
          const summary=data.hourly.summary
          const temperature=
          ` It is currently ${data.currently.temperature}°c outside.`
          const rain=` There is ${data.currently.precipIntensity}% chance of rain`
            const forecast= summary+ temperature+rain
          callback(undefined, {
              forecast
            
          })
      }

    })

}

module.exports=forecast