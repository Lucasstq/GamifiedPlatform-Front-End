'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import apiService from '@/services/api.service';
import { 
  ArrowLeft,
  User,
  Bell,
  Palette,
  Shield,
  LogOut,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Camera,
  X,
  Lock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

type SettingsTab = 'perfil' | 'notificacoes' | 'aparencia' | 'privacidade';

// Função auxiliar para obter o provedor de autenticação (suporta snake_case e camelCase)
const getAuthProvider = (user: any): string | null => {
  const provider = user?.authProvider || user?.auth_provider;
  return provider ? provider.toUpperCase() : null;
};

// Verifica se é um usuário OAuth2 (Google ou GitHub)
const isOAuthUser = (user: any): boolean => {
  const provider = getAuthProvider(user);
  return provider === 'GOOGLE' || provider === 'GITHUB';
};

export default function ConfiguracoesPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('perfil');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Modal de alteração de senha
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  
  // Form states
  const [profileData, setProfileData] = useState({
    characterName: '',
    bio: '',
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/entrar');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiService.get('/users/me/dashboard');
        if (response.data) {
          setProfileData({
            characterName: response.data.character_name || '',
            bio: '',
          });
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      await apiService.put(`/users/${user?.id}`, {
        character_name: profileData.characterName,
        bio: profileData.bio,
      });
      setSuccessMessage('Perfil atualizado com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      setErrorMessage(error.message || 'Erro ao salvar perfil');
    } finally {
      setIsSaving(false);
    }
  };

  const openPasswordModal = () => {
    setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setPasswordError('');
    setPasswordSuccess('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setPasswordError('');
    setPasswordSuccess('');
  };

  const validatePassword = (): string | null => {
    if (!passwordData.currentPassword) {
      return 'A senha atual é obrigatória';
    }
    if (!passwordData.newPassword) {
      return 'A nova senha é obrigatória';
    }
    if (passwordData.newPassword.length < 8) {
      return 'A nova senha deve ter pelo menos 8 caracteres';
    }
    if (!passwordData.confirmNewPassword) {
      return 'Confirme a nova senha';
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      return 'As senhas não coincidem';
    }
    if (passwordData.currentPassword === passwordData.newPassword) {
      return 'A nova senha deve ser diferente da senha atual';
    }
    return null;
  };

  const handleChangePassword = async () => {
    const validationError = validatePassword();
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    setIsChangingPassword(true);
    setPasswordError('');
    setPasswordSuccess('');

    try {
      await apiService.patch(`/users/${user?.id}/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmNewPassword: passwordData.confirmNewPassword,
      });
      setPasswordSuccess('Senha alterada com sucesso!');
      setTimeout(() => {
        closePasswordModal();
      }, 2000);
    } catch (error: any) {
      setPasswordError(error.message || 'Erro ao alterar senha. Verifique se a senha atual está correta.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteAccount = async () => {
    const userIsOAuth = isOAuthUser(user);
    
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.'
    );
    
    if (confirmed) {
      // Usuários OAuth2 não têm senha, apenas pedem confirmação digitando "EXCLUIR"
      if (userIsOAuth) {
        const confirmation = window.prompt('Digite "EXCLUIR" para confirmar:');
        if (confirmation === 'EXCLUIR') {
          try {
            await apiService.delete(`/users/${user?.id}`);
            await logout();
          } catch (error: any) {
            setErrorMessage(error.message || 'Erro ao excluir conta');
          }
        }
      } else {
        const password = window.prompt('Digite sua senha para confirmar:');
        if (password) {
          try {
            await apiService.delete(`/users/${user?.id}`, {
              data: { password }
            });
            await logout();
          } catch (error: any) {
            setErrorMessage(error.message || 'Erro ao excluir conta');
          }
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-particles">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    { id: 'perfil' as SettingsTab, label: 'Perfil', icon: User },
    { id: 'notificacoes' as SettingsTab, label: 'Notificações', icon: Bell },
    { id: 'aparencia' as SettingsTab, label: 'Aparência', icon: Palette },
    { id: 'privacidade' as SettingsTab, label: 'Privacidade', icon: Shield },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#0a0118' }}>
      {/* Modal de Alteração de Senha */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closePasswordModal}
          />
          
          {/* Modal */}
          <div 
            className="relative w-full max-w-md mx-4 p-6 rounded-xl border"
            style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#ff00ff20' }}>
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-pixel text-xl text-white">Alterar Senha</h2>
              </div>
              <button
                onClick={closePasswordModal}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Mensagens */}
            {passwordError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-500 text-sm">{passwordError}</p>
              </div>
            )}
            {passwordSuccess && (
              <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/50 flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-green-500 text-sm">{passwordSuccess}</p>
              </div>
            )}

            {/* Informações */}
            <div className="mb-6 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-gray-400 text-sm">
                <strong className="text-white">Requisitos da nova senha:</strong>
              </p>
              <ul className="text-gray-400 text-sm mt-2 space-y-1">
                <li className={passwordData.newPassword.length >= 8 ? 'text-green-500' : ''}>
                  • Mínimo de 8 caracteres
                </li>
                <li className={passwordData.newPassword && passwordData.currentPassword !== passwordData.newPassword ? 'text-green-500' : ''}>
                  • Diferente da senha atual
                </li>
                <li className={passwordData.newPassword && passwordData.confirmNewPassword && passwordData.newPassword === passwordData.confirmNewPassword ? 'text-green-500' : ''}>
                  • Confirmação deve coincidir
                </li>
              </ul>
            </div>

            {/* Campos */}
            <div className="space-y-4">
              {/* Senha Atual */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Senha atual <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Digite sua senha atual"
                    className="w-full px-4 py-3 pr-12 rounded-lg border bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    style={{ borderColor: '#2d1b4e' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Nova Senha */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nova senha <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-4 py-3 pr-12 rounded-lg border bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    style={{ borderColor: '#2d1b4e' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirmar Nova Senha */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar nova senha <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmNewPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                    placeholder="Repita a nova senha"
                    className="w-full px-4 py-3 pr-12 rounded-lg border bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    style={{ borderColor: '#2d1b4e' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={closePasswordModal}
                className="flex-1 px-4 py-3 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleChangePassword}
                disabled={isChangingPassword}
                className="flex-1 px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
                style={{ 
                  background: 'linear-gradient(135deg, #ff00ff 0%, #00ff88 100%)',
                  color: '#0a0118'
                }}
              >
                {isChangingPassword ? 'Alterando...' : 'Alterar Senha'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b backdrop-blur-md sticky top-0 z-50" style={{ borderColor: '#1f1333', backgroundColor: 'rgba(10, 1, 24, 0.95)' }}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
              <h1 className="font-pixel text-xl sm:text-2xl" style={{ color: '#ff00ff' }}>
                Configurações
              </h1>
            </div>
            
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
              style={{ 
                background: 'linear-gradient(135deg, #ff00ff 0%, #00ff88 100%)',
                color: '#0a0118'
              }}
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">{isSaving ? 'Salvando...' : 'Salvar'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Menu */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                      isActive 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    style={isActive ? { 
                      background: 'linear-gradient(135deg, #ff00ff 0%, #a855f7 100%)'
                    } : {}}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 border-t border-white/10 mt-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sair</span>
                </button>

                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all text-left"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="font-medium">Excluir conta</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Messages */}
            {successMessage && (
              <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-500">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500">
                {errorMessage}
              </div>
            )}

            {/* Perfil Tab */}
            {activeTab === 'perfil' && (
              <div className="space-y-8">
                <div className="p-6 rounded-xl border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
                  <h2 className="font-pixel text-xl text-white mb-6">Informações do Perfil</h2>
                  
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      {user.avatarUrl ? (
                        <img 
                          src={user.avatarUrl} 
                          alt={user.username}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <div 
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #ff00ff 0%, #00ff88 100%)' }}
                        >
                          <span className="text-white font-pixel font-bold text-2xl">
                            {user.username[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <button className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Alterar Avatar
                      </button>
                      <p className="text-xs text-gray-400 mt-2">JPG, PNG ou GIF. Max 2MB</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome do Personagem
                      </label>
                      <input
                        type="text"
                        value={profileData.characterName}
                        onChange={(e) => setProfileData({ ...profileData, characterName: e.target.value })}
                        placeholder="Seu nome de aventureiro"
                        className="w-full px-4 py-3 rounded-lg border bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                        style={{ borderColor: '#2d1b4e' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome de usuário
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                        <input
                          type="text"
                          value={user.username}
                          disabled
                          className="w-full pl-8 pr-4 py-3 rounded-lg border bg-white/5 text-gray-400 cursor-not-allowed"
                          style={{ borderColor: '#2d1b4e' }}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-3 rounded-lg border bg-white/5 text-gray-400 cursor-not-allowed"
                        style={{ borderColor: '#2d1b4e' }}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        placeholder="Conte um pouco sobre você..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
                        style={{ borderColor: '#2d1b4e' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Change Password Section - Apenas para usuários que logam com email/senha */}
                {!isOAuthUser(user) && (
                  <div className="p-6 rounded-xl border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-pixel text-xl text-white mb-2">Senha</h2>
                        <p className="text-gray-400 text-sm">
                          Altere sua senha para manter sua conta segura
                        </p>
                      </div>
                      <button
                        onClick={openPasswordModal}
                        className="px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors flex items-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        Alterar Senha
                      </button>
                    </div>
                  </div>
                )}

                {/* Aviso para usuários OAuth2 */}
                {isOAuthUser(user) && (
                  <div className="p-6 rounded-xl border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2d1b4e' }}>
                        {getAuthProvider(user) === 'GOOGLE' ? (
                          <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        )}
                      </div>
                      <div>
                        <h2 className="font-pixel text-xl text-white mb-2">Conta vinculada ao {getAuthProvider(user) === 'GOOGLE' ? 'Google' : 'GitHub'}</h2>
                        <p className="text-gray-400 text-sm">
                          Você está usando sua conta do {getAuthProvider(user) === 'GOOGLE' ? 'Google' : 'GitHub'} para fazer login. 
                          A senha é gerenciada pelo provedor.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notificações Tab */}
            {activeTab === 'notificacoes' && (
              <div className="p-6 rounded-xl border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
                <h2 className="font-pixel text-xl text-white mb-6">Notificações</h2>
                <div className="text-center py-12 text-gray-400">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Configurações de notificações em breve...</p>
                </div>
              </div>
            )}

            {/* Aparência Tab */}
            {activeTab === 'aparencia' && (
              <div className="p-6 rounded-xl border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
                <h2 className="font-pixel text-xl text-white mb-6">Aparência</h2>
                <div className="text-center py-12 text-gray-400">
                  <Palette className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Configurações de aparência em breve...</p>
                </div>
              </div>
            )}

            {/* Privacidade Tab */}
            {activeTab === 'privacidade' && (
              <div className="p-6 rounded-xl border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
                <h2 className="font-pixel text-xl text-white mb-6">Privacidade</h2>
                <div className="text-center py-12 text-gray-400">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Configurações de privacidade em breve...</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
