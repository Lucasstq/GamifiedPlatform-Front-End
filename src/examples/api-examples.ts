// Exemplos práticos de como consumir a API

import apiService from '@/services/api.service';
import authService from '@/services/auth.service';

// ============================================
// 1. AUTENTICAÇÃO
// ============================================

// Registro de novo usuário
export async function exemploRegistro() {
  try {
    const user = await authService.register({
      username: 'novoguerreiro',
      email: 'guerreiro@darkfantasy.com',
      password: 'SenhaForte123!',
    });
    console.log('Usuário criado:', user);
    return user;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Login
export async function exemploLogin() {
  try {
    const authData = await authService.login({
      username: 'novoguerreiro',
      password: 'SenhaForte123!',
    });
    console.log('Login bem-sucedido:', authData.user);
    console.log('Token:', authData.accessToken);
    return authData;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Logout
export async function exemploLogout() {
  try {
    await authService.logout();
    console.log('Logout realizado');
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// ============================================
// 2. PERFIL DO USUÁRIO
// ============================================

// Buscar perfil com estatísticas
export async function exemploBuscarPerfil(userId: number) {
  try {
    const response = await apiService.get(`/users/${userId}/profile`);
    const profile = response.data;
    
    console.log('Perfil:', {
      username: profile.username,
      nivel: profile.currentLevel,
      xp: profile.totalXp,
      missoes: profile.completedMissions,
      bosses: profile.defeatedBosses,
      badges: profile.earnedBadges,
      ranking: profile.rankingPosition,
    });
    
    return profile;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Atualizar perfil
export async function exemploAtualizarPerfil(userId: number) {
  try {
    const response = await apiService.put(`/users/${userId}`, {
      email: 'novoemail@darkfantasy.com',
      avatarUrl: 'https://example.com/avatar.jpg',
    });
    console.log('Perfil atualizado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// ============================================
// 3. NÍVEIS
// ============================================

// Listar todos os níveis
export async function exemploListarNiveis() {
  try {
    const response = await apiService.get('/levels?page=0&size=10');
    const niveis = response.data.content;
    
    niveis.forEach((nivel: any) => {
      console.log(`Nível ${nivel.orderLevel}: ${nivel.title} (${nivel.requiredXp} XP)`);
    });
    
    return niveis;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Buscar nível atual do usuário
export async function exemploNivelAtual(userId: number) {
  try {
    const response = await apiService.get(`/levels/user/${userId}`);
    const nivel = response.data;
    console.log('Nível atual:', nivel.title);
    return nivel;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// ============================================
// 4. MISSÕES
// ============================================

// Listar missões de um nível
export async function exemploMissoesPorNivel(levelId: number) {
  try {
    const response = await apiService.get(`/missions/level/${levelId}`);
    const missoes = response.data;
    
    missoes.forEach((missao: any) => {
      console.log(`📝 ${missao.title} - ${missao.difficulty} (${missao.xpReward} XP)`);
    });
    
    return missoes;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Iniciar uma missão
export async function exemploIniciarMissao(userId: number, missionId: number) {
  try {
    const response = await apiService.post('/user-missions/start', {
      userId,
      missionId,
    });
    
    const userMission = response.data;
    console.log('Missão iniciada:', userMission);
    return userMission;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Completar uma missão
export async function exemploCompletarMissao(userMissionId: number) {
  try {
    const response = await apiService.put(`/user-missions/${userMissionId}/complete`);
    const userMission = response.data;
    
    console.log('🎉 Missão completa!');
    console.log('XP ganho:', userMission.earnedXp);
    
    return userMission;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Listar missões do usuário
export async function exemploMissoesDoUsuario(userId: number) {
  try {
    const response = await apiService.get(`/user-missions/user/${userId}`);
    const missoes = response.data;
    
    missoes.forEach((um: any) => {
      console.log(`${um.status} - Missão #${um.missionId} (${um.earnedXp} XP)`);
    });
    
    return missoes;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// ============================================
// 5. BOSSES
// ============================================

// Listar bosses de um nível
export async function exemploBossesPorNivel(levelId: number) {
  try {
    const response = await apiService.get(`/bosses/level/${levelId}`);
    const bosses = response.data;
    
    bosses.forEach((boss: any) => {
      console.log(`👹 ${boss.name} - ${boss.difficulty} (${boss.xpReward} XP)`);
      console.log(`   Requer ${boss.requiredXp} XP para desbloquear`);
    });
    
    return bosses;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Iniciar luta contra boss
export async function exemploIniciarBoss(bossId: number, userId: number) {
  try {
    const response = await apiService.post(`/bosses/${bossId}/start`, {
      userId,
    });
    
    const userBoss = response.data;
    console.log('⚔️ Luta iniciada contra boss!');
    return userBoss;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Submeter solução do boss
export async function exemploSubmeterBoss(
  bossId: number, 
  userId: number, 
  userBossId: number, 
  solution: string
) {
  try {
    const response = await apiService.post(`/bosses/${bossId}/submit`, {
      userId,
      userBossId,
      solution,
    });
    
    const result = response.data;
    
    if (result.status === 'DEFEATED') {
      console.log('🎉 Boss derrotado!');
      console.log('XP ganho:', result.xpReward);
    } else {
      console.log('❌ Boss não foi derrotado. Tente novamente!');
    }
    
    return result;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// ============================================
// 6. BADGES
// ============================================

// Listar badges do usuário
export async function exemploBadgesDoUsuario(userId: number) {
  try {
    const response = await apiService.get(`/badges/user/${userId}`);
    const badges = response.data;
    
    console.log(`🏆 Total de badges: ${badges.length}`);
    badges.forEach((badge: any) => {
      console.log(`- ${badge.name}: ${badge.description}`);
    });
    
    return badges;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// ============================================
// 7. RANKING
// ============================================

// Buscar ranking global
export async function exemploRankingGlobal() {
  try {
    const response = await apiService.get('/api/ranking?page=0&size=20');
    const ranking = response.data.content;
    
    ranking.forEach((entry: any) => {
      const medal = entry.position === 1 ? '🥇' : 
                   entry.position === 2 ? '🥈' : 
                   entry.position === 3 ? '🥉' : '  ';
      console.log(`${medal} #${entry.position} - ${entry.username} (${entry.totalXp} XP)`);
    });
    
    return ranking;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Buscar minha posição no ranking
export async function exemploMinhaPosicao() {
  try {
    const response = await apiService.get('/api/ranking/me');
    const myPosition = response.data;
    
    console.log(`Você está na posição #${myPosition.position}`);
    console.log(`XP: ${myPosition.totalXp}`);
    console.log(`Nível: ${myPosition.currentLevel} - ${myPosition.levelTitle}`);
    
    return myPosition;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// ============================================
// 8. NOTIFICAÇÕES
// ============================================

// Listar notificações
export async function exemploNotificacoes() {
  try {
    const response = await apiService.get('/notifications?page=0&size=10');
    const notifications = response.data.content;
    
    notifications.forEach((notif: any) => {
      const icon = notif.type === 'LEVEL_UP' ? '✨' :
                   notif.type === 'MISSION_COMPLETE' ? '🎯' :
                   notif.type === 'BOSS_DEFEATED' ? '⚔️' :
                   notif.type === 'BADGE_EARNED' ? '🏆' : '📢';
      
      const status = notif.read ? '✓' : '●';
      console.log(`${status} ${icon} ${notif.message}`);
    });
    
    return notifications;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Contador de não lidas
export async function exemploContadorNaoLidas() {
  try {
    const response = await apiService.get('/notifications/unread/count');
    const count = response.data;
    console.log(`Você tem ${count} notificações não lidas`);
    return count;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// Marcar todas como lidas
export async function exemploMarcarTodasLidas() {
  try {
    await apiService.put('/notifications/read-all');
    console.log('Todas as notificações marcadas como lidas');
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// ============================================
// 9. GRIMÓRIOS
// ============================================

// Listar grimórios de um nível
export async function exemploGrimoriosPorNivel(levelId: number) {
  try {
    const response = await apiService.get(`/grimoires/level/${levelId}`);
    const grimorios = response.data;
    
    grimorios.forEach((grimorio: any) => {
      console.log(`📚 ${grimorio.title}`);
      console.log(`   ${grimorio.description}`);
      console.log(`   URL: ${grimorio.fileUrl}`);
    });
    
    return grimorios;
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

// ============================================
// EXEMPLO COMPLETO: FLUXO DE JOGO
// ============================================

export async function exemploFluxoCompleto() {
  try {
    console.log('=== INICIANDO JORNADA ===\n');
    
    // 1. Login
    console.log('1. Fazendo login...');
    const auth = await exemploLogin();
    if (!auth) return;
    
    const userId = auth.user.id;
    
    // 2. Buscar perfil
    console.log('\n2. Buscando perfil...');
    const profile = await exemploBuscarPerfil(userId);
    
    // 3. Ver nível atual
    console.log('\n3. Verificando nível atual...');
    await exemploNivelAtual(userId);
    
    // 4. Listar missões disponíveis
    console.log('\n4. Missões disponíveis...');
    const missoes = await exemploMissoesPorNivel(1);
    
    if (missoes && missoes.length > 0) {
      // 5. Iniciar primeira missão
      console.log('\n5. Iniciando primeira missão...');
      const userMission = await exemploIniciarMissao(userId, missoes[0].id);
      
      if (userMission) {
        // 6. Completar missão
        console.log('\n6. Completando missão...');
        await exemploCompletarMissao(userMission.id);
      }
    }
    
    // 7. Ver ranking
    console.log('\n7. Ranking global...');
    await exemploRankingGlobal();
    
    // 8. Minha posição
    console.log('\n8. Minha posição...');
    await exemploMinhaPosicao();
    
    // 9. Notificações
    console.log('\n9. Notificações...');
    await exemploNotificacoes();
    
    console.log('\n=== JORNADA CONCLUÍDA ===');
  } catch (error: any) {
    console.error('Erro no fluxo:', error.message);
  }
}
