import axios from "axios"

export const handlePatchRequest = async (url,id,data,token) =>{
console.log(`${url}${id}`)
console.log(url,data)
    try {
        const response = await axios.patch(`${url}${id}`,data,{
            headers:{
                "Content-Type":"application/json",
                "auth-token":token
            }
        })

        console.log(data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}