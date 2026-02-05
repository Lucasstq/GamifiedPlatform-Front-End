// User types
export type AuthProvider = 'LOCAL' | 'GOOGLE' | 'GITHUB' | 'local' | 'google' | 'github';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatarUrl?: string;
  avatar_url?: string; // snake_case do backend
  authProvider?: AuthProvider;
  auth_provider?: AuthProvider; // snake_case do backend
  active: boolean;
  emailVerified: boolean;
  email_verified?: boolean; // snake_case do backend
  createdAt: string;
  created_at?: string; // snake_case do backend
  updatedAt: string;
  updated_at?: string; // snake_case do backend
}

export interface UserProfile extends User {
  totalXp: number;
  currentLevel: number;
  completedMissions: number;
  defeatedBosses: number;
  earnedBadges: number;
  rankingPosition?: number;
}

export interface UserDashboard {
  username: string;
  avatar_url: string | null;
  current_level: number;
  current_xp: number;
  next_level_xp: number;
  ranking_position: number;
  total_quests: number;
}

// Auth types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

// Level types
export interface Level {
  id: number;
  orderLevel: number;
  title: string;
  description: string;
  requiredXp: number;
  createdAt: string;
  updatedAt: string;
}

// Mission types
export type MissionDifficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type MissionType = 'CODING' | 'QUIZ' | 'PROJECT' | 'CHALLENGE';

export interface Mission {
  id: number;
  title: string;
  description: string;
  difficulty: MissionDifficulty;
  xpReward: number;
  levelId: number;
  type: MissionType;
  createdAt: string;
  updatedAt: string;
}

export type UserMissionStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface UserMission {
  id: number;
  userId: number;
  missionId: number;
  status: UserMissionStatus;
  startedAt: string;
  completedAt?: string;
  earnedXp: number;
}

export interface StartMissionRequest {
  userId: number;
  missionId: number;
}

// Boss types
export type BossDifficulty = 'MEDIUM' | 'HARD' | 'LEGENDARY';
export type UserBossStatus = 'IN_PROGRESS' | 'DEFEATED' | 'FAILED';

export interface Boss {
  id: number;
  name: string;
  description: string;
  levelId: number;
  requiredXp: number;
  xpReward: number;
  difficulty: BossDifficulty;
  createdAt: string;
  updatedAt: string;
}

export interface UserBoss {
  id: number;
  userId: number;
  bossId: number;
  status: UserBossStatus;
  startedAt: string;
  defeatedAt?: string;
  attempts: number;
}

export interface StartBossRequest {
  userId: number;
}

export interface SubmitBossSolutionRequest {
  userId: number;
  userBossId: number;
  solution: string;
}

// Badge types
export interface Badge {
  id: number;
  name: string;
  description: string;
  iconUrl?: string;
  createdAt: string;
}

export interface UserBadge {
  id: number;
  userId: number;
  badgeId: number;
  earnedAt: string;
}

// Grimoire types
export interface Grimoire {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  levelId: number;
  createdAt: string;
  updatedAt: string;
}

// Notification types
export type NotificationType = 'LEVEL_UP' | 'MISSION_COMPLETE' | 'BOSS_DEFEATED' | 'BADGE_EARNED' | 'INFO';

export interface Notification {
  id: number;
  userId: number;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
}

// Ranking types (snake_case para corresponder ao backend)
export interface RankingEntry {
  position: number;
  user_id: number;
  username: string;
  avatar_url?: string;
  character_name: string;
  level: number;
  xp: number;
  level_name: string;
  level_title: string;
  is_me: boolean;
}

// Pagination types
export interface PageRequest {
  page?: number;
  size?: number;
  sort?: string;
}

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// API Error types
export interface ApiError {
  message: string;
  status: number;
  timestamp?: string;
  path?: string;
}
