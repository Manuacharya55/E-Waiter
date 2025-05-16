import axios from "axios"

export const handleDeleteRequest = async(URL,token) =>{
    try {
        const response = await axios.delete(URL,{
            headers : {
                "Content-Type" : "application/json",
                "auth-token" : token
            }
        })

        return response.data
    } catch (error) {
        return error
    }
}