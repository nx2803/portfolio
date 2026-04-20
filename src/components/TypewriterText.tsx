import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  speed?: number;
}

export default function TypewriterText({ text, className = '', style, delay = 0, speed = 30 }: TypewriterTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // 뷰포트 진입 시에만 타이핑 시작
  useEffect(() => {
    if (!isInView) return;

    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    setDisplayedLength(0);
    setIsCompleted(false);

    const startTimeout = setTimeout(() => {
      const type = () => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayedLength(currentIndex);
          timeout = setTimeout(type, speed);
        } else {
          setIsCompleted(true);
        }
      };
      type();
    }, delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [isInView, text, delay, speed]);

  return (
    <div ref={ref} className={`${className} w-full`} style={style}>
      {/* relative wrapper: block으로 변경하여 너비 확보 안정화 */}
      <div className="relative w-full break-keep">
        {/* 공간 확보용 - 항상 full text 높이/너비 유지 */}
        <div className="invisible whitespace-pre-wrap">{text}</div>
        {/* 실제 타이핑 텍스트 - absolute로 위에 덮음 */}
        <div className="absolute inset-0 whitespace-pre-wrap">
          {text.substring(0, displayedLength)}
          {!isCompleted && (
            <span className="inline-block w-0.5 h-[0.85em] bg-green-400 ml-px align-middle animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
