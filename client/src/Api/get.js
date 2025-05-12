import axios from "axios"

const handleGetRequest = async() =>{
    try {
        const response = await axios.get(URL,{
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