import axios from "axios"

export const handlePatchRequest = async (id,url,data,token) =>{
    console.log(`${url}${id}`)
    console.log(token)
    try {
        const response = await axios.patch(`${url}${id}`,data,{
            headers:{
                "Content-Type":"application/json",
                "auth-token":token
            }
        })

        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}