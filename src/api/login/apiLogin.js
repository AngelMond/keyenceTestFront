import { apiGlobal } from '../apiGlobal';

export async function apiLogin(obj) {
    console.log("API login")
      try {
        const response = await apiGlobal(`/users/login`, {
          method:"post",
          data:obj,
        })
        return response.data;
      } catch (error) {
        const failed = {
            error,
            serverMessage: 'Server not available',
            isServerAvailable: false,
        }
        return failed;
      }
}