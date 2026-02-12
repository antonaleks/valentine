import { useState, useRef, useCallback, useEffect } from 'react'

const MESSAGES = [
  'Ой! 🙈',
  'Не-а! ❌',
  'Нет! 🚫',
  'Упс! 😅',
  'Мимо! 👋',
  'Промах! 🎯',
  'Ты уверена? 🤔',
]

const TRIGGER_DISTANCE = 180
const ESCAPE_DISTANCE = 200

export default function RunawayButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [message, setMessage] = useState('Нет')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const initialRectRef = useRef<DOMRect | null>(null)
  const lastMoveTime = useRef(0)

  // Сохраняем начальную позицию кнопки при монтировании
  useEffect(() => {
    if (buttonRef.current && !initialRectRef.current) {
      initialRectRef.current = buttonRef.current.getBoundingClientRect()
    }
  }, [])

  const getBoundaries = useCallback(() => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    const buttonWidth = 280
    const buttonHeight = 64
    const padding = 20
    
    return {
      maxX: viewportWidth - buttonWidth - padding,
      maxY: viewportHeight - buttonHeight - padding,
      minX: padding,
      minY: padding,
      centerX: viewportWidth / 2,
      centerY: viewportHeight / 2,
    }
  }, [])

  const constrainPosition = useCallback((x: number, y: number): { x: number; y: number; wasConstrained: boolean } => {
    const bounds = getBoundaries()
    const initialLeft = initialRectRef.current?.left || 0
    const initialTop = initialRectRef.current?.top || 0
    
    const absoluteX = initialLeft + x
    const absoluteY = initialTop + y
    
    let newX = x
    let newY = y
    let wasConstrained = false
    
    // Проверяем, упирается ли кнопка в границу
    if (absoluteX <= bounds.minX || absoluteX >= bounds.maxX) {
      wasConstrained = true
    }
    if (absoluteY <= bounds.minY || absoluteY >= bounds.maxY) {
      wasConstrained = true
    }
    
    // Ограничиваем позицию
    const maxOffsetX = bounds.maxX - initialLeft
    const minOffsetX = bounds.minX - initialLeft
    const maxOffsetY = bounds.maxY - initialTop
    const minOffsetY = bounds.minY - initialTop
    
    newX = Math.max(minOffsetX, Math.min(newX, maxOffsetX))
    newY = Math.max(minOffsetY, Math.min(newY, maxOffsetY))
    
    return { x: newX, y: newY, wasConstrained }
  }, [getBoundaries])

  const moveButton = useCallback((clientX: number, clientY: number) => {
    const now = Date.now()
    if (now - lastMoveTime.current < 60) return
    lastMoveTime.current = now

    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2

    const deltaX = clientX - buttonCenterX
    const deltaY = clientY - buttonCenterY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance < TRIGGER_DISTANCE) {
      let dirX = buttonCenterX - clientX
      let dirY = buttonCenterY - clientY
      
      // Нормализуем
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY)
      if (dirLength > 0) {
        dirX /= dirLength
        dirY /= dirLength
      }
      
      // Пробуем уйти в выбранном направлении
      let newX = position.x + dirX * ESCAPE_DISTANCE
      let newY = position.y + dirY * ESCAPE_DISTANCE
      
      const constrained = constrainPosition(newX, newY)
      
      // Если уперлись в стену, отпрыгиваем назад (в сторону центра)
      if (constrained.wasConstrained) {
        const bounds = getBoundaries()
        const initialLeft = initialRectRef.current?.left || 0
        const initialTop = initialRectRef.current?.top || 0
        
        // Вычисляем направление к центру экрана
        const currentAbsoluteX = initialLeft + position.x
        const currentAbsoluteY = initialTop + position.y
        
        const toCenterX = bounds.centerX - currentAbsoluteX
        const toCenterY = bounds.centerY - currentAbsoluteY
        
        // Нормализуем вектор к центру
        const centerLength = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY)
        let centerDirX = centerLength > 0 ? toCenterX / centerLength : 0
        let centerDirY = centerLength > 0 ? toCenterY / centerLength : 0
        
        // Добавляем случайность ±45 градусов
        const angle = (Math.random() - 0.5) * Math.PI * 0.5
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const finalDirX = centerDirX * cos - centerDirY * sin
        const finalDirY = centerDirX * sin + centerDirY * cos
        
        // Отпрыгиваем назад с увеличенной дистанцией
        newX = position.x + finalDirX * ESCAPE_DISTANCE * 1.2
        newY = position.y + finalDirY * ESCAPE_DISTANCE * 1.2
        
        const bounced = constrainPosition(newX, newY)
        setPosition({ x: bounced.x, y: bounced.y })
      } else {
        setPosition({ x: constrained.x, y: constrained.y })
      }
      
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    }
  }, [position, constrainPosition, getBoundaries])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    moveButton(e.clientX, e.clientY)
  }, [moveButton])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    moveButton(touch.clientX, touch.clientY)
  }, [moveButton])

  const handleClick = useCallback(() => {
    setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
  }, [])

  return (
    <button
      ref={buttonRef}
      className="btn btn-no"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
    >
      {message}
    </button>
  )
}
