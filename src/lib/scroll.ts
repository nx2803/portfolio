import { atom } from 'nanostores';
import type Lenis from 'lenis';

/**
 * 앱 전역에서 공유하는 Lenis 인스턴스.
 * 내비게이션은 반드시 이 인스턴스를 통해 스크롤해야
 * 네이티브 smooth scroll과 Lenis 관성 스크롤이 서로 충돌하지 않는다.
 */
export const $lenis = atom<Lenis | null>(null);

export function setLenis(instance: Lenis | null) {
  $lenis.set(instance);
}

export function scrollToSection(id: string, offset = 0) {
  if (typeof document === 'undefined') return;

  const el = document.getElementById(id);
  if (!el) return;

  const lenis = $lenis.get();
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.2 });
    return;
  }

  // Lenis 초기화 이전(첫 프레임) 폴백
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
