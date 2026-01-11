'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import apiService from '@/services/api.service';
import { Sword } from 'lucide-react';

export default function OAuth2RedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processando autenticação...');

  useEffect(() => {
    const processOAuth2Callback = () => {
      try {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          setMessage(`Erro na autenticação: ${error}`);
          setTimeout(() => router.push('/entrar'), 3000);
          return;
        }

        if (!accessToken || !refreshToken) {
          setStatus('error');
          setMessage('Tokens não encontrados na resposta');
          setTimeout(() => router.push('/entrar'), 3000);
          return;
        }

        // Salvar tokens
        apiService.setAccessToken(accessToken);
        apiService.setRefreshToken(refreshToken);

        // Buscar dados do usuário
        apiService.get('/users/me')
          .then((response) => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('user', JSON.stringify(response.data));
            }
            
            setStatus('success');
            setMessage('Login realizado com sucesso!');
            
            setTimeout(() => {
              router.push('/dashboard');
            }, 1500);
          })
          .catch((err) => {
            console.error('Erro ao buscar usuário:', err);
            setStatus('success');
            setMessage('Login realizado! Redirecionando...');
            setTimeout(() => router.push('/dashboard'), 1500);
          });

      } catch (err) {
        console.error('Erro ao processar OAuth2:', err);
        setStatus('error');
        setMessage('Erro ao processar autenticação');
        setTimeout(() => router.push('/entrar'), 3000);
      }
    };

    processOAuth2Callback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-particles">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      </div>

      {/* Content */}
      <div className="card-fantasy p-8 md:p-12 w-full max-w-md mx-4 relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative">
            <Sword 
              className={`w-12 h-12 ${
                status === 'processing' ? 'text-primary animate-pulse' :
                status === 'success' ? 'text-green-500' :
                'text-red-500'
              }`}
              style={{ 
                filter: status === 'processing' 
                  ? 'drop-shadow(0 0 8px rgba(255, 0, 255, 0.6))' 
                  : status === 'success'
                  ? 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.6))'
                  : 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))'
              }} 
            />
            <div 
              className={`absolute inset-0 blur-xl ${
                status === 'processing' ? 'bg-primary/40' :
                status === 'success' ? 'bg-green-500/40' :
                'bg-red-500/40'
              }`}
            />
          </div>
          <h1 className="font-pixel text-2xl">
            <span style={{ color: '#ff00ff', textShadow: '0 0 15px rgba(255, 0, 255, 0.5), 0 0 25px rgba(255, 0, 255, 0.3)' }}>Dark</span>
            <span style={{ color: '#00ff88', textShadow: '0 0 15px rgba(0, 255, 136, 0.5), 0 0 25px rgba(0, 255, 136, 0.3)' }}>Fantasy</span>
          </h1>
        </div>

        <div className="space-y-4">
          {status === 'processing' && (
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {status === 'success' && (
            <div className="text-green-500 text-5xl">✓</div>
          )}

          {status === 'error' && (
            <div className="text-red-500 text-5xl">✗</div>
          )}

          <p className="text-foreground font-medium">{message}</p>

          {status === 'processing' && (
            <p className="text-muted-foreground text-sm">Por favor, aguarde...</p>
          )}
        </div>
      </div>
    </div>
  );
}
