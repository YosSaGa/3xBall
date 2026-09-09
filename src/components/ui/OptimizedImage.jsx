import { useState, useRef, useEffect } from 'react';
import { ImageOff, RefreshCw, Palette } from 'lucide-react';

/**
 * OptimizedImage
 * Studio-grade responsive image component with:
 * - Skeleton loading with subtle shimmer and aspect ratio preservation (Zero CLS)
 * - Native lazy loading (loading="lazy", decoding="async") with priority override
 * - Progressive loading / Low Quality Image Placeholder (LQIP) support
 * - Elegant studio error fallback with retry capability
 * - Smooth fade-in transitions
 */
export default function OptimizedImage({
  src,
  srcSet,
  sizes,
  alt = '',
  priority = false,
  lowResSrc,
  aspectRatio,
  className = '',
  containerClassName = '',
  style,
  containerStyle,
  objectFit = 'cover',
  onClick,
  showSkeleton = true,
  fallbackText = 'ไม่สามารถโหลดรูปภาพได้',
  ...rest
}) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [retryKey, setRetryKey] = useState(0);
  const imgRef = useRef(null);

  // Sync state during render when src changes
  if (prevSrc !== src) {
    setPrevSrc(src);
    setStatus('loading');
  }

  // Check if image is already cached in browser on mount or when src changes
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setStatus('loaded');
      } else if (imgRef.current.naturalWidth === 0 && imgRef.current.src) {
        setStatus('error');
      }
    }
  }, [src, retryKey]);

  const handleLoad = () => {
    setStatus('loaded');
  };

  const handleError = () => {
    setStatus('error');
  };

  const handleRetry = (e) => {
    e.stopPropagation();
    setStatus('loading');
    setRetryKey((prev) => prev + 1);
  };

  const computedContainerStyle = {
    ...(aspectRatio ? { aspectRatio } : {}),
    ...containerStyle,
  };

  const isLoaded = status === 'loaded';
  const isError = status === 'error';

  return (
    <div
      className={`relative overflow-hidden bg-[#0A0C16] ${containerClassName}`}
      style={computedContainerStyle}
      onClick={onClick}
    >
      {/* 1. SKELETON SHIMMER PLACEHOLDER */}
      {showSkeleton && !isError && (
        <div
          className={`absolute inset-0 bg-[#0E1224] transition-opacity duration-500 z-10 ${
            isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          {/* Subtle animated shimmer beam */}
          <div className="absolute inset-0 -translate-x-full animate-studio-shimmer bg-gradient-to-r from-transparent via-white/[0.07] to-transparent pointer-events-none" />

          {/* Center Artistic Icon Indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/20 select-none">
            <Palette className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse text-indigo-400/30" />
            <span className="text-[10px] font-display font-medium tracking-widest uppercase text-white/30">
              Loading
            </span>
          </div>
        </div>
      )}

      {/* 2. PROGRESSIVE LOW-RES PLACEHOLDER (LQIP) */}
      {lowResSrc && !isError && (
        <img
          src={lowResSrc}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-${objectFit} blur-md scale-105 transition-opacity duration-700 pointer-events-none ${
            isLoaded ? 'opacity-0' : 'opacity-80'
          }`}
        />
      )}

      {/* 3. PRIMARY IMAGE */}
      {!isError && (
        <img
          key={retryKey}
          ref={imgRef}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-${objectFit} transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={style}
          {...rest}
        />
      )}

      {/* 4. ERROR FALLBACK STATE */}
      {isError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#0F1222] border border-red-500/20 text-slate-300 text-center gap-2.5 z-20">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 shadow-inner">
            <ImageOff className="w-5 h-5 text-indigo-400/80" />
          </div>

          <div className="space-y-0.5 max-w-[200px]">
            <p className="text-xs font-display font-semibold text-slate-200">
              {fallbackText}
            </p>
            <p className="text-[10px] text-slate-500 truncate">
              {alt || 'Image source'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 active:bg-white/20 text-[11px] font-display font-semibold text-indigo-300 hover:text-white border border-white/10 transition-colors cursor-pointer touch-manipulation"
          >
            <RefreshCw className="w-3 h-3" />
            <span>ลองใหม่อีกครั้ง (Retry)</span>
          </button>
        </div>
      )}
    </div>
  );
}
