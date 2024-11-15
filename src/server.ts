
import app from "./app"
const Configs=require('./configs/configs')
import { passportAuthentication } from './passport/passortAuthentication';
const port=Number(Configs.port||3000)
import { connectDb } from '../src/configs/db'

passportAuthentication.initialise(app);
connectDb()
.then(()=>{
    console.log('mongo connected')
    app.listen(port,()=>{
        console.log(`server started on port ${port}`)
    })

})
.catch(()=>console.log('unconnected'))


