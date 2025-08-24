import { AppState, Category, Completion, Event, Task, UserProfile } from '@/store/types';
import { todayUTC } from '@/utils/date';

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

const defaultMe: UserProfile = { id: 'me', name: 'You', emoji: '🧠' };
const defaultFriend: UserProfile = { id: 'friend', name: 'Alex', emoji: '🧗' };

const initial: AppState = {
  me: defaultMe,
  pair: {
    code: 'JOIN123',
    userA: defaultMe,
    userB: defaultFriend
  },
  tasks: [
    { id: randomId(), title: 'Gym', category: 'Fitness', deadlineHour: 23, penaltyCents: 100 },
    { id: randomId(), title: 'Read 20 pages', category: 'Study', deadlineHour: 22, penaltyCents: 100 }
  ],
  completions: [],
  events: []
};

let state = initial;

export function getState(): AppState {
  return state;
}

export function setMe(name: string, emoji: string) {
  if (!state.me) state.me = { id: 'me', name, emoji };
  else state.me = { ...state.me, name, emoji };
}

export function generatePair(): string {
  const code = randomId().toUpperCase();
  state.pair = {
    code,
    userA: state.me || defaultMe
  };
  return code;
}

export function joinPair(code: string) {
  // In mock mode, any code works and pairs with Alex
  state.pair = {
    code,
    userA: state.me || defaultMe,
    userB: defaultFriend
  };
}

export function addTask(title: string, category: Category, deadlineHour: number, penaltyCents: number) {
  const t: Task = {
    id: randomId(),
    title,
    category,
    deadlineHour,
    penaltyCents
  };
  state.tasks = [t, ...state.tasks];
}

export function completeTask(taskId: string, pomodoroMinutes?: number) {
  const date = todayUTC();
  const entry: Completion = {
    taskId,
    userId: state.me?.id || 'me',
    date,
    pomodoroMinutes
  };
  const exists = state.completions.find(c => c.taskId === taskId && c.userId === entry.userId && c.date === date);
  if (!exists) {
    state.completions = [entry, ...state.completions];
  }
}

export function computeBalanceCents(): number {
  const today = todayUTC();
  let cents = 0;
  for (const t of state.tasks) {
    const done = state.completions.find(c => c.taskId === t.id && c.userId === (state.me?.id || 'me') && c.date === today);
    if (done) cents += t.penaltyCents;
  }
  return cents;
}

export function settleWeek() {
  state.events = [];
  state.completions = [];
}

export function parseQuickTask(input: string): { title: string; category: Category; hour: number } {
  const lower = input.toLowerCase().trim();
  let category: Category = 'Habit';
  if (/(gym|run|workout|lift)/.test(lower)) category = 'Fitness';
  else if (/(study|read|revise|notes)/.test(lower)) category = 'Study';
  else if (/(work|email|write|code)/.test(lower)) category = 'Work';

  let hour = 23;
  const m = lower.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/);
  if (m) {
    let h = parseInt(m[1], 10);
    const ampm = (m[3] || '').toLowerCase();
    if (ampm === 'pm' && h < 12) h += 12;
    if (ampm === 'am' && h === 12) h = 0;
    if (h >= 0 && h <= 23) hour = h;
  }

  // Title is input without time/am/pm words
  const title = lower.replace(/\b\d{1,2}(?::\d{2})?\s*(am|pm)?\b/, '').trim() || 'New Task';
  return { title: title.replace(/\s+/g, ' ').replace(/^\w/, c => c.toUpperCase()), category, hour };
}
