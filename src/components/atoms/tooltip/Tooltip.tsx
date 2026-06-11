'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

export interface TooltipProps {
  content: string
  children: React.ReactNode
  className?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

const GAP = 8
const VIEWPORT_PADDING = 8

export function Tooltip({
  content,
  children,
  className,
  position = 'top',
  delay = 200,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const unmountTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current
    const tooltip = tooltipRef.current
    if (!trigger || !tooltip) return

    const triggerRect = trigger.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()

    let top = 0
    let left = 0

    switch (position) {
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        left = triggerRect.right + GAP
        break
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        left = triggerRect.left - tooltipRect.width - GAP
        break
      case 'top':
        top = triggerRect.top - tooltipRect.height - GAP
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        break
      case 'bottom':
        top = triggerRect.bottom + GAP
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        break
    }

    left = Math.max(
      VIEWPORT_PADDING,
      Math.min(left, window.innerWidth - tooltipRect.width - VIEWPORT_PADDING)
    )
    top = Math.max(
      VIEWPORT_PADDING,
      Math.min(top, window.innerHeight - tooltipRect.height - VIEWPORT_PADDING)
    )

    setCoords({ top, left })
  }, [position])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (unmountTimeoutRef.current) clearTimeout(unmountTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    updatePosition()
    requestAnimationFrame(() => {
      updatePosition()
      setIsVisible(true)
    })

    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isMounted, updatePosition])

  function handleMouseEnter() {
    timeoutRef.current = setTimeout(() => {
      setIsMounted(true)
    }, delay)
  }

  function handleMouseLeave() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsVisible(false)
    unmountTimeoutRef.current = setTimeout(() => {
      setIsMounted(false)
      setCoords(null)
    }, 150)
  }

  const arrowPositionClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-neutral-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-neutral-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-neutral-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-neutral-800',
  }

  return (
    <div
      ref={triggerRef}
      className={cn('inline-flex', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isMounted &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={tooltipRef}
            className={cn(
              'pointer-events-none fixed z-[500] w-max max-w-[280px] rounded-lg bg-neutral-800 px-3 py-2 text-[12px] font-medium leading-[18px] text-white shadow-lg transition-opacity duration-150',
              isVisible && coords ? 'opacity-100' : 'opacity-0'
            )}
            style={coords ? { top: coords.top, left: coords.left } : { top: 0, left: 0 }}
            role="tooltip"
          >
            {content}
            <span
              className={cn(
                'absolute size-0 border-4 border-transparent',
                arrowPositionClasses[position]
              )}
              aria-hidden
            />
          </div>,
          document.body
        )}
    </div>
  )
}
