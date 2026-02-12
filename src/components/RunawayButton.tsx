import { useState, useRef, useCallback } from 'react'

const MESSAGES = [
  'Ой, не туда! 🙈',
  'Ты точно уверена? 🤔',
  'Подумай ещё раз! 💭',
  'Это не тот ответ... 🥺',
  'Нет — не вариант! ❌',
  'Попробуй другую кнопку 😉',
  'Я не позволю! 🚫',
]

export default function RunawayButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [message, setMessage] = useState('Нет')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const lastMoveTime = useRef(0)

  const moveButton = useCallback((clientX: number, clientY: number) => {
    const now = Date.now()
    if (now - lastMoveTime.current < 100) return
    lastMoveTime.current = now

    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2

    const deltaX = clientX - buttonCenterX
    const deltaY = clientY - buttonCenterY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance < 150) {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const maxX = viewportWidth - rect.width - 20
      const maxY = viewportHeight - rect.height - 20

      let newX = position.x + (deltaX > 0 ? -1 : 1) * (120 + Math.random() * 80)
      let newY = position.y + (deltaY > 0 ? -1 : 1) * (80 + Math.random() * 60)

      newX = Math.max(-rect.left + 20, Math.min(newX, maxX - rect.left))
      newY = Math.max(-rect.top + 20, Math.min(newY, maxY - rect.top))

      setPosition({ x: newX, y: newY })
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    }
  }, [position])

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
