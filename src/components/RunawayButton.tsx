import { useState, useRef, useCallback, useEffect } from 'react'

const MESSAGES = [
  'Ой, не туда! 🙈',
  'Ты точно уверена? 🤔',
  'Подумай ещё раз! 💭',
  'Это не тот ответ... 🥺',
  'Нет — не вариант! ❌',
  'Попробуй другую кнопку 😉',
  'Я не позволю! 🚫',
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

  const constrainPosition = useCallback((x: number, y: number): { x: number; y: number } => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    // Получаем размеры кнопки
    const buttonWidth = 280 // Фиксированная ширина из CSS
    const buttonHeight = 64 // Примерная высота
    
    const padding = 20 // Отступ от края экрана
    
    // Максимальные смещения относительно начальной позиции
    const maxX = viewportWidth - buttonWidth - padding
    const maxY = viewportHeight - buttonHeight - padding
    const minX = padding
    const minY = padding
    
    // Ограничиваем позицию
    return {
      x: Math.max(minX - (initialRectRef.current?.left || 0), Math.min(x, maxX - (initialRectRef.current?.left || 0))),
      y: Math.max(minY - (initialRectRef.current?.top || 0), Math.min(y, maxY - (initialRectRef.current?.top || 0)))
    }
  }, [])

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
      // Вычисляем направление убегания (противоположное курсору)
      let dirX = buttonCenterX - clientX
      let dirY = buttonCenterY - clientY
      
      // Нормализуем
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY)
      if (dirLength > 0) {
        dirX /= dirLength
        dirY /= dirLength
      }
      
      // Добавляем случайность
      const angle = (Math.random() - 0.5) * 1.0 // ±30 градусов
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const newDirX = dirX * cos - dirY * sin
      const newDirY = dirX * sin + dirY * cos
      
      // Новая позиция
      let newX = position.x + newDirX * ESCAPE_DISTANCE
      let newY = position.y + newDirY * ESCAPE_DISTANCE
      
      // Ограничиваем границами экрана
      const constrained = constrainPosition(newX, newY)
      
      setPosition(constrained)
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    }
  }, [position, constrainPosition])

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
