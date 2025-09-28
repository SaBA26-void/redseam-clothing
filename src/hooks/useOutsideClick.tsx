import { useEffect, useRef, type RefObject } from 'react'

export default function useOutsideClick<T extends HTMLElement>(onOutsideClick: () => void): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onOutsideClick])

  return ref
}
