import { apiGlobal } from '../apiGlobal';

export async function apiDeleteRow() {
      try {
        const response = await apiGlobal(`/files/loadfile`, {
          method:"delete",
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