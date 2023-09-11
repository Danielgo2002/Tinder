import { SignInData } from "../auth/signIn";
import { AuthData } from "../auth/signup";
import client from "./interseptors";



export async function signUp(data: AuthData) {
  try {
    

    const response = await client.post("/auth/signUp", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.access_Token && response.data.refresh_token) {
      localStorage.setItem("accessToken", response.data.access_Token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
    }
    return response;
  } catch (error) {
    throw error;
  }
}
export async function signIn(data: SignInData) {
  try {
    const response = await client.post("/auth/signIn", data);
    if (response.data.access_Token && response.data.refresh_token) {
      localStorage.setItem("accessToken", response.data.access_Token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
    }
    return response;
  } catch (error) {
    throw error;
  }
}

