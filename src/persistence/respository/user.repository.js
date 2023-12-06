const db = require('../../config/db')

const createUser = async (user) => {
    try{
        const newUser = await db.query(`INSERT INTO public.users(email, pass,verify) VALUES ($1, $2,false)`,user)
        const id = await db.query('SELECT id FROM public.users where email = $1',[user[0]])
        console.log(id,'sadfad')
        return id
    }catch(error){
        console.log(error)
        return null 
    }
}

const findUser = async (id) =>{
    try{
        const verify = await db.query(`SELECT verify FROM public.users where id = $1`,[id])
        return verify.rows
    }catch(error){
        console.log(error)
        return null
    }
}

const verifyUser = async (status,id) =>{
    try{
        const status = await db.query(`UPDATE public.users SET verify = $1 WHERE id = $2`,[status,id])
        return status
    }catch(error){
        console.log(error)
        return null
    }
}

module.exports = {
    createUser,
    findUser,
    verifyUser
}