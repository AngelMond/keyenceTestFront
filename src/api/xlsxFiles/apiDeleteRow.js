import { apiGlobal } from '../apiGlobal';

export async function apiDeleteRow(obj) {
      try {
        const response = await apiGlobal(`/files/loadfile`, {
          method:"delete",
          data: obj,
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