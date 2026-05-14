import { atom } from 'nanostores';

export type Theme = 'light' | 'dark';

// 로컬 스토리지에서 테마 초기값 가져오기 (클라이언트 사이드 전용)
const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved) return saved;
    // 시스템 설정 확인 (선택 사항)
    // if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light'; // 기본값은 라이트(Off-White)
};

export const $theme = atom<Theme>(getInitialTheme());

export function toggleTheme() {
  const nextTheme = $theme.get() === 'light' ? 'dark' : 'light';
  $theme.set(nextTheme);
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', nextTheme);
  }
}
