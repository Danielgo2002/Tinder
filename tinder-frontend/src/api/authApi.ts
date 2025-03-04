import axios from "axios";
import { SignInData } from "../auth/signIn";
import { AuthData } from "../auth/signup";
import client from "./interseptors";

// const client = axios.create({ baseURL: "http://localhost:3000" });

// export const signUp = async (data: AuthData) => {
//   const res = await client.post("/auth/signUp", data, {

//   })

//   return res;
// };
// const client = axios.create({ baseURL: "http://localhost:3000" });

// export const signUp = async (data: AuthData) => {
//   try {
//     const res = await client.post("/auth/signUp", data);
//     const access_Token = res.data.access_Token;

//     localStorage.setItem("access_Token", access_Token);
//     const storedAccessToken = localStorage.getItem("access_Token");
//     console.log("access_Token", storedAccessToken);

//     return res;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export async function signUp(data: AuthData) {
  try {
    const formData = new FormData();
    // formData.append("signUpDto", JSON.stringify(data));
    // formData.append("file", data.f);

    const response = await client.post("/auth/signUp", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.access_Token && response.data.refresh_token) {
      localStorage.setItem("accessToken", response.data.access_Token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
    }
    console.log(data);
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

//  export const useLogin = () => {
//   const setUsername = useStore((state) => state.setUsername);
//   const setIsLogged = useStore((state) => state.setIsLogged);

//   return useQuery("login", fetchLogin, {
//     onSuccess: (response) => {
//       setIsLogged(true);
//       setUsername(response.data.username);

//     },
//     onSettled: () => {
//       setIsLogged(true);
//     },
//     onError: () => {
//       setIsLogged(false);
//     },
//   });
// };
