const db = require('../../config/db')

const createUser = async (data) => {
    try{
        await db.query(`INSERT INTO public.users(email, pass,verify) VALUES ($1, $2,false)`,data)
        return data
    }catch(error){
        console.log(error)
        return null 
    }
}

const getUser = async(data)=>{
    try{
        const user = await db.query(`SELECT email, id FROM public.users WHERE email = $1`, data)
        return user
    }catch(error){
        console.log(error)
        return null
    }
}

const insertCode = async(data)=>{
    try{
        await db.query(`INSERT INTO public.verifycode(user_code,code,datecreated) VALUES ($1,$2,NOW())`,data)
    }catch(error){
        console.log(error)
        return null
    }

}

const getCode = async(data)=>{
    try{
        const codeData = await db.query(`SELECT code,datecreated FROM public.verifycode WHERE user_code = $1`,data)
        return codeData
    }catch(error){
        console.log(error)
        return null
    }
}



module.exports = {
    createUser,
    getUser,
    insertCode,
    getCode
}