import apiService from './api.service';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  User,
} from '@/types';

class AuthService {
  /**
   * Registrar novo usuário
   */
  async register(data: RegisterRequest): Promise<User> {
    const response = await apiService.post<User>('/auth/register', data);
    return response.data;
  }

  /**
   * Login tradicional
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', data);
    const authData = response.data;
    
    // Salvar tokens
    apiService.setAuthData(authData);
    
    return authData;
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    const refreshToken = apiService.getRefreshToken();
    
    if (refreshToken) {
      try {
        await apiService.post('/auth/logout', { refreshToken });
      } catch (error) {
        console.error('Erro ao fazer logout no servidor:', error);
      }
    }
    
    // Limpar dados locais
    apiService.clearAuth();
  }

  /**
   * Refresh token
   */
  async refreshToken(refreshToken: string): Promise<string> {
    const response = await apiService.post<{ accessToken: string; tokenType: string; expiresIn: number }>(
      '/auth/refresh',
      { refreshToken }
    );
    
    const newAccessToken = response.data.accessToken;
    apiService.setAccessToken(newAccessToken);
    
    return newAccessToken;
  }

  /**
   * Verificar email
   */
  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiService.get<{ message: string }>(
      `/auth/verify-email?token=${token}`
    );
    return response.data;
  }

  /**
   * Reenviar email de verificação
   */
  async resendVerification(email: string): Promise<{ message: string }> {
    const response = await apiService.post<{ message: string }>(
      '/auth/resend-verification',
      { email }
    );
    return response.data;
  }

  /**
   * Solicitar reset de senha
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await apiService.post<{ message: string }>(
      '/auth/forgot-password',
      { email }
    );
    return response.data;
  }

  /**
   * Resetar senha
   */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiService.post<{ message: string }>(
      '/auth/reset-password',
      { token, newPassword }
    );
    return response.data;
  }

  /**
   * Verificar se usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!apiService.getAccessToken();
  }

  /**
   * Obter usuário armazenado
   */
  getCurrentUser(): User | null {
    return apiService.getStoredUser();
  }

  /**
   * URLs para OAuth2
   */
  getGoogleOAuthUrl(): string {
    return process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL || 'http://localhost:8080/oauth2/authorization/google';
  }

  getGithubOAuthUrl(): string {
    return process.env.NEXT_PUBLIC_GITHUB_OAUTH_URL || 'http://localhost:8080/oauth2/authorization/github';
  }
}

export const authService = new AuthService();
export default authService;
