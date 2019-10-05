const express=require('express')
const geocode=require('./utilis/geocode')
const forecast=require('./utilis/forecast')
const hbs=require('hbs')
const path =require('path')
const viewsPath=path.join(__dirname,'../templates/views')
const publicDirectory=path.join(__dirname,'../public')
const partialPath=path.join(__dirname,'../templates/partial')
hbs.registerPartials(partialPath)
const app=express()
const port=process.env.PORT || 4000
app.set('view engine','hbs')
app.set('views',viewsPath)
app.engine('hbs', require('hbs').__express);
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
res.render('index',{
    title:'Weather',
    name:'created by Ukeme'
})


})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'created by Ukeme'
    }) 
    
    })

app.get('/about',(req,res)=>{
        res.render('about',{
            title:'About page',
            name:'created by Ukeme'
        })
        
        })   
        app.get('',(req,res)=>{
res.render('index',{
    title:'Home page',
    name:'created by Ukeme'
})


})
app.get('/product',(req,res)=>{
    if(!req.query.search){
       return res.send({ error:
            "Error, you provide a search term"}
            
            ) }
    
    res.send({
        product:[]

        
    })
     
    })
app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!address){
        
        return res.send({ error:
            "Error, you must provide address"})
         }
    else{
        geocode(address,(error,{latitude,longtitude,location}={})=>{
            if(error){
                return res.send({
                    error})
                
            }
           else {
            forecast(longtitude,latitude,(error2,{forecast}={})=>{
                    if(error){
                        return res.send({ error2:
                            error})



                    }

                    return res.send({ 
                      forecast,
                      location,
                      address:address
                    })

                })

            }

        })
        
    
    }
    })


app.get('/help/*',(req,res)=>{
res.render('index',{
    title:'404',
    message:' help article not found',
    name:'created by Ukeme'
})


})

app.get('/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'unable to connect',
        name:'created by Ukeme'
    })
    
    
    })

app.listen(port,()=>{
    console.log('listening at port ' + port)
})


