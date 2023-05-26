const express = require('express')
const app = express()

const port = process.env.PORT || 3000


const path = require ("path")
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))

app.set('view engine', 'hbs');

const viewsDirectory = path.join (__dirname , '../temp/views')
app.set('views', viewsDirectory);

// to read partials : 
var hbs = require('hbs');
const partialsPath = path.join(__dirname , "../temp/partials")
hbs.registerPartials(partialsPath)


app.get ('/' , (req,res) => {
res.render('index' , {
    title : "HOME",
    desc : "This is the Home page"
})
})

app.get ('/service' , (req,res) => {
res.render('service' , {
    title : "SERVICE",
    desc : "This is the Service page"
})
})


app.get ('/team' , (req,res) => {
res.render('team' , {
    title : "TEAM",
    desc : "This is the Team page"
})
})

const geocode = require('./tools/geocode')
const forecast = require('./tools/forecast')

app.get('/weather',(req,res)=>{
if(!req.query.address){
    return res.send({
        error:'You must provide address'
    })
}
geocode(req.query.address,(error,data)=>{
    if(error){
        // shorthand property error:error
        return res.send({error})
    }
    forecast(data.latitude,data.longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location:req.query.address
        })
    })
})
})

/////////////////////////////////////////////////////////////////////////////

app.get('*' , (req , res)=> {
 res.send('404 Page Not Founded')
})

///////////////////////////////////////////////////////////////////////////


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////


