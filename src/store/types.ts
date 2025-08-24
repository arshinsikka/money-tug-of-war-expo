export type Category = 'Work' | 'Study' | 'Fitness' | 'Habit';

export type Task = {
  id: string;
  title: string;
  category: Category;
  deadlineHour: number;
  penaltyCents: number;
};

export type Completion = {
  taskId: string;
  userId: string;
  date: string; // YYYY-MM-DD UTC
  proofUrl?: string;
  pomodoroMinutes?: number;
};

export type Event = {
  id: string;
  date: string;
  fromUser?: string;
  toUser?: string;
  amountCents: number;
  reason: 'missed' | 'manual_settle';
  taskId?: string;
};

export type UserProfile = {
  id: string;
  name: string;
  emoji: string;
};

export type Pair = {
  code: string;
  userA: UserProfile;
  userB?: UserProfile;
};

export type AppState = {
  me?: UserProfile;
  pair?: Pair;
  tasks: Task[];
  completions: Completion[];
  events: Event[];
};
