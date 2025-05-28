import axios from "axios"

export const handlePatchRequest = async (url,id,data,token) =>{
    try {
        const response = await axios.patch(`${url}${id}`,data,{
            headers:{
                "Content-Type":"application/json",
                "auth-token":token
            }
        })

        return response.data
    } catch (error) {
        return error
    }
}