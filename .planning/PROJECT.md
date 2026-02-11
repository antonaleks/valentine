# Valentine Site for Fiancée

## What This Is

Интерактивный сайт-валентинка для невесты с весёлой механикой "неуловимой" кнопки. Главная страница задаёт вопрос "Будешь моей валентинкой?" с двумя вариантами ответа. При попытке нажать "Нет" кнопка убегает от курсора и показывает шуточные сообщения. Сайт стилизован в fancy/minimalist дизайне вдохновлённом Pinterest. Включает папку для фотографий пары (пока пустую, для будущего наполнения).

## Core Value

Создать трогательный, персональный и весёлый способ сделать предложение быть валентинкой, которое вызовет улыбку и запомнится.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Главная страница с вопросом "Будешь моей валентинкой?"
- [ ] Кнопка "Да" — ведёт к странице успеха/празднования
- [ ] Кнопка "Нет" — интерактивная, убегает от курсора/тапа
- [ ] Шуточные сообщения при попытке нажать "Нет" ("Ой, не туда!", "Ты точно уверена?", и т.д.)
- [ ] Fancy/minimalist дизайн в стиле Pinterest
- [ ] Полная мобильная адаптация (touch-friendly)
- [ ] Папка `photos/` для фотографий пары (структура готова, контент позже)
- [ ] Размещение на GitHub Pages

### Out of Scope

- Бэкенд или база данных — статический сайт только
- Сложные анимации требующие heavy libraries — keep it lightweight
- Фактическое наполнение фотографиями — подготовить структуру, но контент добавит пользователь
- Многостраничность beyond success page — single interaction flow
- Accessibility beyond basic — focused on the specific playful use case

## Context

- **Целевая аудитория:** Невеста (один конкретный человек)
- **Платформа размещения:** GitHub Pages (требует статический HTML/CSS/JS)
- **Устройства:** В первую очередь мобильные (адаптация must-have)
- **Вдохновение:** Pinterest fancy/minimalist Valentine designs
- **Интерактивность:** "Runaway button" pattern — популярный мем для валентинок

## Constraints

- **Tech stack:** React 18+, TypeScript (optional), CSS3/Styled Components, Vite (build tool)
- **Deployment:** GitHub Pages через GitHub Actions CI/CD
- **Build:** Автоматическая сборка при push в main
- **Performance:** Оптимизированный bundle для мобильных
- **Design:** Fancy/minimalist aesthetic, розовые/красные/белые тона
- **Interaction:** Touch-friendly (мобильный тач не hover)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React + Vite | Удобство правок, hot reload, компонентная структура | — Pending |
| GitHub Actions CI/CD | Автоматический деплой при изменениях | — Pending |
| Отдельная папка для фото | Пользователь добавит фото сам позже | — Pending |
| Single-page flow | Простота и фокус на главной интеракции | — Pending |

---
*Last updated: 2025-02-11 after initialization*
