import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import {
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ApiError,
} from '@/types';

class ApiService {
  private api: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - adiciona token
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - trata erros e refresh token
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Se erro 401 e não é retry
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Se já está refreshing, adiciona à fila
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return this.api(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = this.getRefreshToken();
            
            if (!refreshToken) {
              throw new Error('No refresh token');
            }

            // Refresh token
            const { data } = await axios.post<RefreshTokenResponse>(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
              { refreshToken }
            );

            this.setAccessToken(data.accessToken);
            
            // Processa fila de requisições que falharam
            this.processQueue(null);
            
            // Retry requisição original
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            }
            return this.api(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError);
            this.clearAuth();
            
            // Redireciona para login
            if (typeof window !== 'undefined') {
              window.location.href = '/entrar';
            }
            
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private processQueue(error: unknown) {
    this.failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve();
      }
    });

    this.failedQueue = [];
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Resposta com erro do servidor
      const data = error.response.data as any;
      return {
        message: data.message || 'Erro no servidor',
        status: error.response.status,
        timestamp: data.timestamp,
        path: data.path,
      };
    } else if (error.request) {
      // Requisição foi feita mas sem resposta
      return {
        message: 'Sem resposta do servidor',
        status: 0,
      };
    } else {
      // Erro ao configurar requisição
      return {
        message: error.message || 'Erro desconhecido',
        status: 0,
      };
    }
  }

  // Token management
  public getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  public setAccessToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', token);
  }

  public getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  }

  public setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('refreshToken', token);
  }

  public setAuthData(authResponse: AuthResponse): void {
    this.setAccessToken(authResponse.accessToken);
    this.setRefreshToken(authResponse.refreshToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(authResponse.user));
    }
  }

  public clearAuth(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  public getStoredUser(): any {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    if (!userStr || userStr === 'undefined' || userStr === 'null') return null;
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('user'); // Remove invalid data
      return null;
    }
  }

  // Getter para a instância do axios
  public getInstance(): AxiosInstance {
    return this.api;
  }

  // Métodos HTTP
  public get<T = any>(url: string, config = {}) {
    return this.api.get<T>(url, config);
  }

  public post<T = any>(url: string, data?: any, config = {}) {
    return this.api.post<T>(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config = {}) {
    return this.api.put<T>(url, data, config);
  }

  public patch<T = any>(url: string, data?: any, config = {}) {
    return this.api.patch<T>(url, data, config);
  }

  public delete<T = any>(url: string, config = {}) {
    return this.api.delete<T>(url, config);
  }
}

// Export singleton
export const apiService = new ApiService();
export default apiService;
