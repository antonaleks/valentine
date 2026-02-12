import { useEffect, useState } from 'react'

interface Heart {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  opacity: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const newHearts: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
      size: 15 + Math.random() * 25,
      opacity: 0.3 + Math.random() * 0.4,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.x}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}
