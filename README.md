# Company Website with Blog

A modern, multilingual (Indonesian & English) company website built with Next.js 15, featuring a complete blog CRUD system and SEO-optimized articles.

## Features

- ✨ **Multilingual Support**: Full Indonesian and English translations using next-intl
- 📝 **Blog CRUD**: Complete Create, Read, Update, Delete functionality for blog posts
- 🔒 **Admin Authentication**: Secure login system for blog management
- 🎨 **Modern UI**: Tailwind CSS for beautiful, responsive design
- 🚀 **SEO Optimized**: 5 pre-written SEO-friendly blog articles
- ⚡ **Next.js 15**: Latest App Router with TypeScript
- 🌐 **Company Pages**: Home, About, Blog, and Contact pages

## Pre-loaded Blog Articles

The website comes with 5 SEO-optimized articles:

1. **Digital Transformation: The Future of Business in 2024**
2. **Leveraging AI and Machine Learning for Business Growth**
3. **Cybersecurity Best Practices for Modern Businesses**
4. **Cloud Computing: Benefits and Migration Strategies**
5. **Transformasi Digital** (Indonesian version)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

The default language is Indonesian. Access English version at [http://localhost:3000/en](http://localhost:3000/en).

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
client/
├── src/
│   ├── app/
│   │   └── [locale]/           # Localized routes
│   │       ├── about/          # About page
│   │       ├── blog/           # Blog listing & CRUD
│   │       │   ├── [slug]/     # Blog post detail
│   │       │   ├── create/     # Create new post
│   │       │   └── edit/[slug] # Edit post
│   │       ├── contact/        # Contact page
│   │       ├── layout.tsx      # Root layout
│   │       └── page.tsx        # Home page
│   ├── components/
│   │   ├── Navigation.tsx      # Header navigation
│   │   └── Footer.tsx          # Footer component
│   ├── data/
│   │   └── blogPosts.ts        # Blog posts data
│   ├── i18n/
│   │   ├── request.ts          # i18n config
│   │   └── routing.ts          # i18n routing
│   └── middleware.ts           # i18n middleware
├── messages/
│   ├── en.json                 # English translations
│   └── id.json                 # Indonesian translations
└── package.json
```

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Linting**: ESLint

## Available Pages

- `/` - Home page (Indonesian by default)
- `/en` - Home page (English)
- `/about` - About us
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog post
- `/blog/create` - Create new blog post (requires login)
- `/blog/edit/[slug]` - Edit existing blog post (requires login)
- `/contact` - Contact information
- `/admin/login` - Admin login page

## Admin Access

### Login Credentials (Demo)
- **Username**: `admin`
- **Password**: `admin123`

### Admin Features
Once logged in, administrators can:
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- See admin controls in the navigation bar

### How to Login
1. Click "Admin Login" button in the navigation
2. Enter credentials above
3. After successful login, you'll be redirected to the blog page
4. Create/Edit buttons will be visible for logged-in admins

**Note**: This is a demo authentication system using localStorage. In production, implement proper backend authentication with JWT, sessions, or OAuth.

## Language Switching

The website supports seamless language switching between Indonesian (ID) and English (EN). Use the language switcher in the navigation bar.

## Blog CRUD Operations

### Create
Navigate to `/blog/create` to create a new blog post.

### Read
View all posts at `/blog` or individual posts at `/blog/[slug]`.

### Update
Edit posts using the Edit button on individual blog posts or navigate to `/blog/edit/[slug]`.

### Delete
Delete posts using the Delete button on individual blog posts.

**Note**: CRUD operations are currently demo implementations. In production, these would be connected to a database or CMS.

## SEO Features

- Semantic HTML structure
- Meta tags ready for customization
- Clean URL structure
- Structured blog content
- Optimized for search engines

## Customization

### Adding New Translations

Edit the translation files:
- `messages/en.json` for English
- `messages/id.json` for Indonesian

### Adding New Blog Posts

Edit `src/data/blogPosts.ts` to add new blog posts or connect to a CMS/database.

### Styling

Tailwind CSS classes can be customized in:
- `tailwind.config.ts` - Tailwind configuration
- `src/app/globals.css` - Global styles

## License

This project is open source and available for educational purposes.

## Support

For questions or issues, please contact: info@company.com
