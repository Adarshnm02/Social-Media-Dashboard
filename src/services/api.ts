import apiClient from "./apiClient";

class APIService {
    async get<T>(endpoint: string): Promise<T> {
      const response = await apiClient.get<T>(endpoint);
      return response.data;
    }
  
    async post<T>(endpoint: string, data: unknown): Promise<T> {
      const response = await apiClient.post<T>(endpoint, data);
      return response.data;
    }
  }
  
  export default new APIService();