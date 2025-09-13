

const API_URL = import.meta.env.VITE_API_BASE_URL + "/auth/";
export const login = async (formData: FormData) => {
    const response = await fetch(API_URL + "/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        },
    })
    if (!response.ok) {
        throw new Error("Login failed");
    }
    const data = await response.json()
    localStorage.setItem("token", data.token)
}
