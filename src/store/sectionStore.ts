import { atom } from 'nanostores';

// 현재 활성화된 섹션 ID (intro, techstack, peecemaker, fortheteam, ufc)
export const $activeSection = atom<string>('intro');

// 섹션 업데이트 헬퍼 함수
export function updateActiveSection(id: string) {
  if ($activeSection.get() !== id) {
    $activeSection.set(id);
  }
}
