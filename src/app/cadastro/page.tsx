'use client';

import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Sword } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function CadastroPage() {
  const router = useRouter();
  const { register, loginWithGoogle, loginWithGithub } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isHoveringBack, setIsHoveringBack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validações
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      
      setSuccess(true);
      
      // Redireciona para login após 2 segundos
      setTimeout(() => {
        router.push('/entrar');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-particles">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      </div>

      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        onMouseEnter={() => setIsHoveringBack(true)}
        onMouseLeave={() => setIsHoveringBack(false)}
        className="absolute top-6 left-6 flex items-center gap-2 transition-colors z-20 cursor-pointer"
        style={{ color: isHoveringBack ? '#ff00ff' : 'rgba(255, 255, 255, 0.4)' }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Voltar</span>
      </button>

      {/* Signup Card */}
      <div className="card-fantasy p-8 md:p-12 w-full max-w-md mx-4 relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Sword className="w-8 h-8 text-primary" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 0, 255, 0.6))' }} />
              <div className="absolute inset-0 blur-xl bg-primary/40" />
            </div>
            <h1 className="font-pixel text-2xl">
              <span style={{ color: '#ff00ff', textShadow: '0 0 15px rgba(255, 0, 255, 0.5), 0 0 25px rgba(255, 0, 255, 0.3)' }}>Dark</span>
              <span style={{ color: '#00ff88', textShadow: '0 0 15px rgba(0, 255, 136, 0.5), 0 0 25px rgba(0, 255, 136, 0.3)' }}>Fantasy</span>
            </h1>
          </div>

          <h2 className="font-pixel text-xl mb-3 text-foreground" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)' }}>Criar Conta</h2>
          <p className="text-sm text-muted-foreground">
            Inicie sua jornada épica
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-md bg-card/50 border border-border hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(196,76,255,0.3)] hover:scale-[1.02] transition-all duration-300 relative z-20 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm font-medium">Continuar com Google</span>
          </button>

          <button
            type="button"
            onClick={loginWithGithub}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-md bg-card/50 border border-border hover:bg-secondary/20 hover:border-secondary/50 hover:shadow-[0_0_20px_rgba(0,255,170,0.3)] hover:scale-[1.02] transition-all duration-300 relative z-20 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-sm font-medium">Continuar com GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-card text-muted-foreground">
              OU CADASTRE-SE COM EMAIL
            </span>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error message */}
          {error && (
            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="p-3 rounded-md bg-green-500/10 border border-green-500/50 text-green-500 text-sm">
              Conta criada com sucesso! Verifique seu email para ativar sua conta. Redirecionando...
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2 text-foreground">
              Nome de Guerreiro
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Seu nome épico"
                className="w-full pl-10 pr-4 py-3 rounded-md bg-card/50 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
              Email
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="aventureiro@darkfantasy.com"
                className="w-full pl-10 pr-4 py-3 rounded-md bg-card/50 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-foreground">
              Senha
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-md bg-card/50 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-foreground">
              Confirmar Senha
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-md bg-card/50 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-pixel text-sm py-4 rounded-md transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative z-20"
            style={{
              backgroundColor: '#ff00ff',
              color: '#ffffff',
              boxShadow: '0 4px 20px rgba(255, 0, 255, 0.5)',
            }}
          >
            {isLoading ? 'Criando conta...' : 'Começar Aventura'}
          </button>
        </form>

        {/* Login link */}
        <div className="text-center mt-6 relative z-10">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <span
              onClick={() => router.push('/entrar')}
              className="font-medium transition-colors cursor-pointer relative z-10 hover:opacity-80"
              style={{ color: '#00ff88' }}
            >
              Entrar
            </span>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>
            Ao continuar, você concorda com os{' '}
            <button className="hover:underline" style={{ color: '#ff00ff' }}>
              Termos de Serviço
            </button>{' '}
            e{' '}
            <button className="hover:underline" style={{ color: '#ff00ff' }}>
              Política de Privacidade
            </button>
          </p>
        </div>
      </div>

    </div>
  );
}
