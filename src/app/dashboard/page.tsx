'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import apiService from '@/services/api.service';
import { UserDashboard, RankingEntry } from '@/types';
import { 
  Sword, 
  LogOut, 
  Crown, 
  Zap, 
  Trophy, 
  Target, 
  Settings,
  Book,
  Star,
  MapPin,
  CheckCircle2,
  Clock
} from 'lucide-react';

// Cores para as posições do ranking
const rankingColors = ['#ffc61a', '#c0c0c0', '#cd7f32', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<UserDashboard | null>(null);
  const [globalRanking, setGlobalRanking] = useState<RankingEntry[]>([]);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);
  const [isLoadingRanking, setIsLoadingRanking] = useState(true);

  // Carregar dados do dashboard
  useEffect(() => {
    const fetchDashboard = async () => {
      if (!isAuthenticated) return;
      
      try {
        const response = await apiService.get<UserDashboard>('/users/me/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
      } finally {
        setIsLoadingDashboard(false);
      }
    };

    if (!isLoading && isAuthenticated) {
      fetchDashboard();
    }
  }, [isAuthenticated, isLoading]);

  // Carregar ranking separadamente (pode falhar sem quebrar o dashboard)
  useEffect(() => {
    const fetchRanking = async () => {
      if (!isAuthenticated) return;
      
      try {
        const response = await apiService.get<{ content: RankingEntry[] }>('/ranking?page=0&size=5');
        setGlobalRanking(response.data.content || []);
      } catch (error) {
        console.error('Erro ao carregar ranking:', error);
        // Ranking pode falhar por falta de permissão, não quebra o dashboard
      } finally {
        setIsLoadingRanking(false);
      }
    };

    if (!isLoading && isAuthenticated) {
      fetchRanking();
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/entrar');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-particles">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground">Carregando sua aventura...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Dados do dashboard (com fallback para valores padrão)
  const currentLevel = dashboardData?.current_level ?? 1;
  const currentXP = dashboardData?.current_xp ?? 0;
  const nextLevelXP = dashboardData?.next_level_xp ?? 100;
  const rankingPosition = dashboardData?.ranking_position ?? 0;
  const totalQuests = dashboardData?.total_quests ?? 0;
  const username = dashboardData?.username ?? user.username;
  
  const xpPercentage = nextLevelXP > 0 ? (currentXP / nextLevelXP) * 100 : 0;

  // Missões Diárias
  const dailyMissions = [
    { 
      icon: Book, 
      title: 'Completar 1 aula', 
      xpReward: 50, 
      current: 0, 
      total: 1,
      progress: 0,
      iconBg: '#ff00ff'
    },
    { 
      icon: Target, 
      title: 'Acertar 10 questões', 
      xpReward: 100, 
      current: 7, 
      total: 10,
      progress: 70,
      iconBg: '#ff00ff'
    },
    { 
      icon: Clock, 
      title: 'Estudar por 30 min', 
      xpReward: 75, 
      current: 18, 
      total: 30,
      progress: 60,
      iconBg: '#ff00ff'
    },
  ];



  return (
    <div className="min-h-screen" style={{ background: '#0a0118' }}>
      {/* Header */}
      <header className="border-b backdrop-blur-md sticky top-0 z-50" style={{ borderColor: '#1f1333', backgroundColor: 'rgba(10, 1, 24, 0.8)' }}>
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Sword className="w-6 h-6" style={{ color: '#ff00ff', filter: 'drop-shadow(0 0 8px rgba(255, 0, 255, 0.6))', imageRendering: 'pixelated' }} />
              <h1 className="font-pixel text-base sm:text-lg" style={{ color: '#ff00ff' }}>
                GamifiedPlatform
              </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Ranking Position */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: '#1a0f2e' }}>
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#ffc61a', imageRendering: 'pixelated' }} />
                <span className="font-pixel font-bold text-sm sm:text-base" style={{ color: '#ffc61a' }}>#{rankingPosition}</span>
              </div>

              {/* Current XP */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: '#1a0f2e' }}>
                <Star className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#00ff88', imageRendering: 'pixelated' }} />
                <span className="font-pixel font-bold text-sm sm:text-base" style={{ color: '#00ff88' }}>
                  {currentXP.toLocaleString()} XP
                </span>
              </div>

              {/* User Avatar */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: '#1a0f2e' }}>
                {dashboardData?.avatar_url ? (
                  <img 
                    src={dashboardData.avatar_url} 
                    alt={username}
                    className="w-8 h-8 rounded-sm object-cover"
                    style={{ imageRendering: 'pixelated' }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ 
                    background: 'linear-gradient(135deg, #ff00ff 0%, #00ff88 100%)',
                    imageRendering: 'pixelated'
                  }}>
                    <span className="text-white font-pixel font-bold text-xs">{username.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <div className="hidden md:block">
                  <p className="text-xs font-pixel font-medium text-white">{username}</p>
                  <p className="text-xs font-pixel" style={{ color: '#a855f7' }}>Nível {currentLevel}</p>
                </div>
              </div>

              {/* Settings & Logout */}
              <button 
                onClick={() => router.push('/configuracoes')}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-400" style={{ imageRendering: 'pixelated' }} />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-400" style={{ imageRendering: 'pixelated' }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl mb-2 text-white">
            Bem-vindo de volta, <span style={{ color: '#ff00ff' }}>{username}</span>!
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Continue sua jornada e conquiste novos conhecimentos.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {/* Level Card */}
          <div className="p-4 sm:p-6 rounded-lg border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#a855f720' }}>
                <Crown className="w-5 h-5" style={{ color: '#a855f7', imageRendering: 'pixelated' }} />
              </div>
              <div>
                <p className="font-pixel text-xs text-gray-400">Nível</p>
                <p className="font-pixel text-2xl font-bold text-white">{currentLevel}</p>
              </div>
            </div>
            <div className="w-full bg-gray-800 rounded-sm h-2 mb-1">
              <div 
                className="h-full rounded-sm transition-all duration-500"
                style={{ 
                  width: `${xpPercentage}%`,
                  background: 'linear-gradient(90deg, #ff00ff 0%, #00ff88 100%)'
                }}
              />
            </div>
            <p className="text-xs text-gray-400">{currentXP}/{nextLevelXP} XP</p>
          </div>

          {/* XP Card */}
          <div className="p-4 sm:p-6 rounded-lg border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#00ff8820' }}>
                <Zap className="w-5 h-5" style={{ color: '#00ff88', imageRendering: 'pixelated' }} />
              </div>
              <div>
                <p className="font-pixel text-xs text-gray-400">XP Atual</p>
                <p className="font-pixel text-2xl font-bold text-white">{currentXP.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Ranking Card */}
          <div className="p-4 sm:p-6 rounded-lg border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#3b82f620' }}>
                <Trophy className="w-5 h-5" style={{ color: '#3b82f6', imageRendering: 'pixelated' }} />
              </div>
              <div>
                <p className="font-pixel text-xs text-gray-400">Ranking</p>
                <p className="font-pixel text-2xl font-bold text-white">#{rankingPosition}</p>
              </div>
            </div>
          </div>

          {/* Quests Card */}
          <div className="p-4 sm:p-6 rounded-lg border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#00ff8820' }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: '#00ff88', imageRendering: 'pixelated' }} />
              </div>
              <div>
                <p className="font-pixel text-xs text-gray-400">Quests</p>
                <p className="font-pixel text-2xl font-bold text-white">{totalQuests}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Missions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Missions */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6" style={{ color: '#ff00ff' }} />
                  <h3 className="font-pixel text-xl text-white">Missões Diárias</h3>
                </div>
                <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#ff6b4a20', color: '#ff6b4a' }}>
                  Reinicia em 12h
                </span>
              </div>

              <div className="space-y-4">
                {dailyMissions.map((mission, index) => {
                  const Icon = mission.icon;
                  return (
                    <div key={index} className="p-4 rounded-lg border" style={{ backgroundColor: '#0f0820', borderColor: '#2d1b4e' }}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${mission.iconBg}20` }}>
                          <Icon className="w-6 h-6" style={{ color: mission.iconBg }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-white">{mission.title}</h4>
                            <span className="text-sm font-medium whitespace-nowrap ml-2" style={{ color: '#ffc61a' }}>
                              +{mission.xpReward} XP
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-800 rounded-full h-2">
                              <div 
                                className="h-full rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${mission.progress}%`,
                                  background: mission.progress === 100 ? '#00ff88' : 'linear-gradient(90deg, #ff00ff 0%, #00ff88 100%)'
                                }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                              {mission.current}/{mission.total}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Suas Trilhas */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" style={{ color: '#ff00ff' }} />
                  <h3 className="font-pixel text-xl text-white">Suas Trilhas</h3>
                </div>
                <button className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#ff00ff' }}>
                  Ver todas →
                </button>
              </div>
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">Nenhuma trilha em andamento</p>
              </div>
            </div>
          </div>

          {/* Right Column - Ranking & Achievements */}
          <div className="space-y-6">
            {/* Global Ranking */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6" style={{ color: '#ffc61a' }} />
                <h3 className="font-pixel text-xl text-white">Ranking Global</h3>
              </div>

              <div className="space-y-3">
                {isLoadingRanking ? (
                  <div className="text-center py-4 text-gray-400">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm">Carregando ranking...</p>
                  </div>
                ) : globalRanking.length > 0 ? (
                  globalRanking.map((player, index) => (
                    <div 
                      key={player.user_id} 
                      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors ${player.is_me ? 'bg-primary/10 border border-primary/30' : ''}`}
                      style={{
                        borderBottom: index < globalRanking.length - 1 && !player.is_me ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                      }}
                    >
                      <span className="text-xl font-bold w-6" style={{ color: rankingColors[index] || '#a855f7' }}>
                        {player.position}
                      </span>
                      {player.avatar_url ? (
                        <img 
                          src={player.avatar_url} 
                          alt={player.username}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: rankingColors[index] || '#a855f7' }}>
                          <span className="text-white font-bold text-xs">{player.username[0].toUpperCase()}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {player.character_name || player.username}
                          {player.is_me && <span className="text-primary ml-2 text-xs">(você)</span>}
                        </p>
                        <p className="text-xs text-gray-400">{player.xp.toLocaleString()} XP • {player.level_title}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-400">
                    <p className="text-sm">Nenhum jogador no ranking</p>
                  </div>
                )}
              </div>
            </div>

            {/* Conquistas */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#1a0f2e', borderColor: '#2d1b4e' }}>
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6" style={{ color: '#ffc61a' }} />
                <h3 className="font-pixel text-xl text-white">Conquistas</h3>
              </div>
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">Em breve...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
