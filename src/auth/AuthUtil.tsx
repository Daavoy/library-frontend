import axiosInstance from "../axios";

export interface AuthPayload {
    email: string,
    password: string,
}

export const login = async (formData: AuthPayload) => {
    console.log("FORM DATA: ", formData)
    axiosInstance.post("auth/login", formData).then(response => {
        const { data } = response;
        console.log("response", response, "data", data)
        localStorage.setItem("accessToken", data.token)
    }).catch(error => {
        console.error(error);
    })
}

export const register = async (formData: AuthPayload) => {
    axiosInstance.post("auth/register", formData).then(response => {
        const { data } = response;
        console.log("Data ", data)
    }).catch(error => {
        console.error("Error creating user", error)
    })
}
