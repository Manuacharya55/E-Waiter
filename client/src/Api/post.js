import axios from "axios"

export const handlePostRequest = async (url,data,token) =>{
    try {
        const response = await axios.post(url,data,{
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