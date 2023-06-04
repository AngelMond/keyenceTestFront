import { apiGlobal } from '../apiGlobal';

export async function apiUpdateRow(obj) {
      try {
        const response = await apiGlobal(`/files/loadfile`, {
          method:"put",
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