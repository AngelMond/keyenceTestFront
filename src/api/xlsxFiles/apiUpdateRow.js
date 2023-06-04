import { apiGlobal } from '../apiGlobal';

export async function apiUpdateRow() {
      try {
        const response = await apiGlobal(`/files/loadfile`, {
          method:"put",
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