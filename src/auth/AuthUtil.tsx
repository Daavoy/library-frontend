import axiosConfig from "../axios";

export interface AuthPayload {
    email: string,
    password: string,
}

export const login = async (formData: AuthPayload) => {
    console.log("FORM DATA: ", formData)
    axiosConfig.post("auth/login", formData).then(response => {
        const { data } = response;
        console.log("response", response, "data", data)
        localStorage.setItem("token", data.token)
    }).catch(error => {
        console.error(error);
    })
}

export const register = async (formData: AuthPayload) => {
    axiosConfig.post("auth/register", formData).then(response => {
        const { data } = response;
        console.log("Data ", data)
    }).catch(error => {
        console.error("Error creating user", error)
    })
}
