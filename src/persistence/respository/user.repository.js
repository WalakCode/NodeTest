const db = require('../../config/db')

const createUser = async (user) => {
    try{
        const newUser = await db.query(`INSERT INTO public.users(email, pass,verify) VALUES ($1, $2,false)`,user)
        return user
    }catch(error){
        console.log(error)
        return null 
    }
}

const getUser = async(email)=>{
    try{
        const user = await db.query(`SELECT email FROM public.users WHERE email = $1`, email)
        return user
    }catch(error){
        console.log(error)
        return null
    }
}




module.exports = {
    createUser,
    getUser,
}