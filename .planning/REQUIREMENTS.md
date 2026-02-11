# Requirements: Valentine Site for Fiancée

**Defined:** 2025-02-11
**Core Value:** Create a touching, personal and fun way to ask someone to be a valentine that brings a smile

## v1 Requirements

### Core Pages

- [ ] **PAGE-01**: Главная страница с вопросом "Будешь моей валентинкой?" (index)
- [ ] **PAGE-02**: Страница успеха с праздничным сообщением после нажатия "Да" (success)
- [ ] **PAGE-03**: React Router для навигации между страницами

### Interactive Elements

- [ ] **INTR-01**: Кнопка "Да" — стабильная, ведёт на страницу успеха
- [ ] **INTR-02**: Кнопка "Нет" — убегает от курсора мыши (hover/touch approach)
- [ ] **INTR-03**: Кнопка "Нет" — убегает от тача на мобильных (touch events)
- [ ] **INTR-04**: Кнопка "Нет" не выходит за границы viewport
- [ ] **INTR-05**: Шуточные сообщения при попытке поймать "Нет" (минимум 5 вариантов)
- [ ] **INTR-06**: Плавные CSS анимации движения кнопки (GPU-accelerated)

### Design & Styling

- [ ] **DSGN-01**: Fancy/minimalist дизайн в стиле Pinterest
- [ ] **DSGN-02**: Цветовая схема: розовые/красные/белые тона
- [ ] **DSGN-03**: Mobile-first responsive design (320px+)
- [ ] **DSGN-04**: Touch-friendly размеры кнопок (минимум 44x44px)
- [ ] **DSGN-05**: Decorative floating elements (hearts, sparkles)
- [ ] **DSGN-06**: Google Fonts с красивым шрифтом для заголовков

### Photos Integration

- [ ] **PHOTO-01**: Папка `public/photos/` для фотографий пары
- [ ] **PHOTO-02**: Placeholder на success странице для фото
- [ ] **PHOTO-03**: Оптимизированный размер фото (lazy loading)
- [ ] **PHOTO-04**: Инструкция для добавления фото (README.md)

### Technical Setup

- [ ] **TECH-01**: React 18+ с TypeScript
- [ ] **TECH-02**: Vite как build tool
- [ ] **TECH-03**: GitHub Actions workflow для CI/CD
- [ ] **TECH-04**: Деплой на GitHub Pages
- [ ] **TECH-05**: Hot reload для development
- [ ] **TECH-06**: Оптимизированный production build

### Performance

- [ ] **PERF-01**: First Contentful Paint < 1.5s на мобильных
- [ ] **PERF-02**: Bundle size < 200KB (gzipped)
- [ ] **PERF-03**: Images оптимизированы (WebP с fallback)
- [ ] **PERF-04**: CSS animations use transform/opacity only

## v2 Requirements

### Enhancements

- **ENH-01**: Background music с toggle on/off
- **ENH-02**: Confetti animation при нажатии "Да"
- **ENH-03**: Typewriter effect для текста вопроса
- **ENH-04**: Dark mode toggle
- **ENH-05**: Share button (copy link)

### Photo Gallery

- **GALL-01**: Карусель фотографий на success странице
- **GALL-02**: Lightbox для просмотра фото
- **GALL-03**: Caption под каждой фотографией

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend/Database | Статический сайт, не нужен |
| User authentication | Для одного конкретного человека |
| Analytics/Tracking | Privacy-first, не нужно |
| Social sharing buttons | Не соответствует интимности момента |
| Multi-language | Только русский язык |
| Complex animations (GSAP) | Перебор для этого проекта, CSS достаточно |
| Service Worker/PWA | Overkill для одноразового использования |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PAGE-01 | Phase 1 | Pending |
| PAGE-02 | Phase 1 | Pending |
| PAGE-03 | Phase 1 | Pending |
| INTR-01 | Phase 2 | Pending |
| INTR-02 | Phase 2 | Pending |
| INTR-03 | Phase 2 | Pending |
| INTR-04 | Phase 2 | Pending |
| INTR-05 | Phase 2 | Pending |
| INTR-06 | Phase 2 | Pending |
| DSGN-01 | Phase 3 | Pending |
| DSGN-02 | Phase 3 | Pending |
| DSGN-03 | Phase 3 | Pending |
| DSGN-04 | Phase 3 | Pending |
| DSGN-05 | Phase 3 | Pending |
| DSGN-06 | Phase 3 | Pending |
| PHOTO-01 | Phase 3 | Pending |
| PHOTO-02 | Phase 3 | Pending |
| PHOTO-03 | Phase 3 | Pending |
| PHOTO-04 | Phase 4 | Pending |
| TECH-01 | Phase 1 | Pending |
| TECH-02 | Phase 1 | Pending |
| TECH-03 | Phase 4 | Pending |
| TECH-04 | Phase 4 | Pending |
| TECH-05 | Phase 1 | Pending |
| TECH-06 | Phase 4 | Pending |
| PERF-01 | Phase 4 | Pending |
| PERF-02 | Phase 4 | Pending |
| PERF-03 | Phase 3 | Pending |
| PERF-04 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 24 total
- Mapped to phases: 24
- Unmapped: 0 ✓

**Phase Summary:**
| Phase | Name | Requirements Count |
|-------|------|-------------------|
| 1 | Foundation Setup | 6 |
| 2 | Interactive Mechanics | 7 |
| 3 | Visual Design & Photos | 10 |
| 4 | Deployment & Performance | 5 |

---
*Requirements defined: 2025-02-11*
*Last updated: 2025-02-11 after React stack decision*
