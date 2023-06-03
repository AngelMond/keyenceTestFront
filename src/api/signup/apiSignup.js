import { apiGlobal } from '../apiGlobal';

export async function apiSignup(obj) {
    console.log("API signup")
      try {
        const response = await apiGlobal(`/users/signup`, {
          method:"post",
          data:obj
        })
        return response;
      } catch (error) {
        const failed = {
            error,
            serverMessage: 'Server not available',
            isServerAvailable: false,
        }
        return failed;
      }
}