import { apiGlobal } from '../apiGlobal';

export async function apiAddFile (obj) {
    //console.log("API loadfile")
      try {
        const response = await apiGlobal(`/files/loadfile`, {
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