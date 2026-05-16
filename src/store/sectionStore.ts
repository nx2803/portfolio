import { atom } from 'nanostores';

export type ViewMode = 'portal' | 'detail';

// 현재 활성화된 섹션 ID (intro, techstack, trilogy, peecemaker, fortheteam, ufc, contact)
export const $activeSection = atom<string>('intro');
export const $viewMode = atom<ViewMode>('portal');

// 섹션 업데이트 헬퍼 함수
export function updateActiveSection(id: string) {
  if ($activeSection.get() !== id) {
    $activeSection.set(id);
  }
}

// 뷰 모드 업데이트 헬퍼 함수
export function updateViewMode(mode: ViewMode) {
  $viewMode.set(mode);
}
