import axiosConfig from "../axios";

export interface LoginPayload {
    email: string,
    password: string,
}

export const login = async (formData: LoginPayload) => {
    console.log("FORM DATA: ", formData)
    axiosConfig.post("auth/login", formData).then(response => {
        const { data } = response;
        console.log("response", response, "data", data)
        localStorage.setItem("token", data.token)
    }).catch(error => {
        console.error(error);
    })
}
