# Неизвестные сокровища Индии

Лендинг для духовного тура в Индию (Ришикеш, Бадринатх, Вриндаван) — 27 апреля — 9 мая 2026.

## Технологии

- **Next.js 16** — React фреймворк с App Router
- **TypeScript 5** — типизация
- **Tailwind CSS 4** — стилизация
- **shadcn/ui** — UI компоненты
- **Framer Motion** — анимации
- **Prisma ORM** — работа с базой данных (SQLite)

## Структура проекта

```
my-project/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Главная страница лендинга
│   │   ├── layout.tsx        # Корневой layout с SEO
│   │   ├── globals.css       # Глобальные стили и CSS-переменные
│   │   └── api/
│   │       └── route.ts      # API routes
│   ├── components/
│   │   └── ui/               # shadcn/ui компоненты
│   │       ├── button.tsx    # Кнопка
│   │       ├── card.tsx      # Карточка
│   │       ├── dialog.tsx    # Модальное окно
│   │       ├── input.tsx     # Поле ввода
│   │       ├── label.tsx     # Метка
│   │       └── textarea.tsx  # Текстовое поле
│   ├── hooks/                # React хуки
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   └── lib/
│       ├── db.ts             # Prisma клиент
│       └── utils.ts          # Утилиты (cn и др.)
├── public/
│   ├── images/               # Изображения для сайта
│   │   ├── hero-bg.png       # Фоновое изображение
│   │   ├── elena.png         # Фото организатора
│   │   ├── rishikesh-new.jpg # Изображение Ришикеша
│   │   ├── badrinath-new.jpg # Изображение Бадринатха
│   │   ├── vrindavan-new.jpg # Изображение Вриндавана
│   │   ├── reviewer1.jpg     # Аватар отзыва 1
│   │   ├── reviewer2.jpg     # Аватар отзыва 2
│   │   ├── reviewer3.jpg     # Аватар отзыва 3
│   │   ├── reviewer4.jpg     # Аватар отзыва 4
│   │   ├── gallery-vrindavan-1.jpg  # Галерея Вриндаван
│   │   ├── gallery-vrindavan-2.jpg
│   │   ├── gallery-vrindavan-3.jpg
│   │   ├── gallery-vrindavan-4.jpg
│   │   ├── gallery-vrindavan-5.jpg
│   │   └── team/             # Фотографии команды
│   │       ├── tatiana.jpg
│   │       ├── vyacheslav.jpg
│   │       ├── vadim.jpg
│   │       └── alexey.jpg
│   └── robots.txt            # SEO robots файл
├── prisma/
│   └── schema.prisma         # Схема базы данных
├── db/
│   └── custom.db             # SQLite база данных
├── package.json              # Зависимости и скрипты
├── bun.lock                  # Lock-файл для bun
├── tsconfig.json             # Конфигурация TypeScript
├── next.config.ts            # Конфигурация Next.js
├── tailwind.config.ts        # Конфигурация Tailwind CSS
├── postcss.config.mjs        # Конфигурация PostCSS
├── components.json           # Конфигурация shadcn/ui
├── eslint.config.mjs         # Конфигурация ESLint
├── .gitignore                # Исключения для Git
└── README.md                 # Документация
```

## Требования

- Node.js 18+ 
- Bun (рекомендуется) или npm/yarn/pnpm

## Установка

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd my-project
```

### 2. Установка зависимостей

```bash
bun install
# или
npm install
```

### 3. Настройка базы данных

```bash
bun run db:push
# или
npx prisma db push
```

### 4. Запуск в режиме разработки

```bash
bun run dev
# или
npm run dev
```

Сайт будет доступен по адресу: `http://localhost:3000`

## Скрипты

| Команда | Описание |
|---------|----------|
| `bun run dev` | Запуск сервера разработки |
| `bun run build` | Сборка для продакшена |
| `bun run start` | Запуск продакшен-сервера |
| `bun run lint` | Проверка кода ESLint |
| `bun run db:push` | Применение схемы БД |

## Деплой

### Vercel (рекомендуется)

1. Подключите репозиторий к [Vercel](https://vercel.com)
2. Vercel автоматически определит Next.js и настроит сборку
3. Нажмите "Deploy"

### Другие платформы

Сборка для продакшена:

```bash
bun run build
```

Запуск продакшен-сервера:

```bash
bun run start
```

### Docker

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Установка зависимостей
FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Сборка
FROM base AS build
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Продакшен образ
FROM base AS release
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]
```

Сборка и запуск Docker:

```bash
docker build -t india-tour .
docker run -p 3000:3000 india-tour
```

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# База данных (SQLite используется по умолчанию)
DATABASE_URL="file:./dev.db"

# Если используется PostgreSQL
# DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

## Добавление изображений

1. Поместите изображения в папку `public/images/`
2. Для внешних изображений добавьте домен в `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'static.tildacdn.pub',
    },
  ],
}
```

## Кастомизация

### Изменение дат тура

Отредактируйте константу в `src/app/page.tsx`:

```typescript
const TOUR_START_DATE = new Date("2026-04-27T00:00:00");
```

### Изменение контента

- **Данные тура**: массив `aboutCards`
- **Направления**: массив `destinations`
- **Программа**: массив `programData`
- **Команда**: массив `teamMembers`
- **Отзывы**: массив `reviews`
- **Галерея**: массив `galleryImages`

### Изменение стилей

Цветовая схема определена в `src/app/globals.css` через CSS переменные:

```css
:root {
  --gold: #DAA520;
  --saffron: #FF9933;
  --deep-earth: #2D1810;
}
```

## Рекомендуемый .gitignore

```gitignore
# dependencies
node_modules/

# next.js
/.next/
/out/

# production
/build/

# env files
.env*

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# typescript
*.tsbuildinfo
next-env.d.ts

# misc
.DS_Store
*.pem

# Временные файлы
temp_*
upload/
examples/
```
## Лицензия

MIT
