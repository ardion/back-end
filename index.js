const bodyParser = require('body-parser')
const express=require('express')
const app=express()
const db=require('./helper/db')

const registerRouter=require('./routers/register')
const companyRouter=require('./routers/company')
const workerRouter=require('./routers/worker')
const experienceRouter=require('./routers/experience')
const portofolioRouter=require('./routers/portofolio')
const projectRouter=require('./routers/project')
const projectmanRouter=require('./routers/projectman')
const getprojectRouter=require('./routers/getproject')
const skillRouter=require('./routers/skill')


app.use(bodyParser.urlencoded({extended:false}))
app.use('/regis',registerRouter)
app.use('/company',companyRouter)
app.use('/worker',workerRouter)
app.use('/experience',experienceRouter)
app.use('/portofolio',portofolioRouter)
app.use('/projectman',projectmanRouter)
app.use('/project',projectRouter)
app.use('/getproject',getprojectRouter)
app.use('/skill',skillRouter)

app.get('/',(request,response)=>{
response.send('Android 1 Backend')

})



    app.listen(8080,()=>{
        console.log('App Listen on Port 8080!')
        
        })