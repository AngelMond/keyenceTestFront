import { apiGlobal } from '../apiGlobal';

export async function apiGetAllRegisters() {
      try {
        const response = await apiGlobal(`/files/loadfile`, {
          method:"get",
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