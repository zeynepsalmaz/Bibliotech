
# Bibliotech Frontend

A modern, production-ready React (Next.js) frontend for the Bibliotech project.

## Features
- Next.js (App Router, TypeScript)
- Tailwind CSS (v4)
- shadcn/ui component library
- React Query for data fetching
- Framer Motion for animations
- Clean, minimal, responsive design
- SEO & accessibility best practices

## Project Structure
```
frontend/
	src/
		app/           # Next.js pages/routes
		components/    # Reusable UI components
		hooks/         # Custom React hooks
		lib/           # Utilities, API clients
	public/          # Static assets
	...
```

## Setup
1. **Install dependencies:**
	 ```sh
	 npm install
	 ```
2. **Run the development server:**
	 ```sh
	 npm run dev
	 ```
	 App runs at [http://localhost:3000](http://localhost:3000)

3. **Build for production:**
	 ```sh
	 npm run build
	 npm start
	 ```

## API Integration
- Backend must be running at `http://localhost:8000`.
- All API calls are made to this backend.

## Lighthouse & Accessibility
- Semantic HTML, meta tags, ARIA labels
- Responsive, mobile-first layout
- Optimized for performance and SEO

## Customization
- Edit `src/components/`, `src/hooks/`, `src/lib/` for your needs.
- Add shadcn/ui components with:
	```sh
	npx shadcn@latest add button card modal
	```

---

© 2025 Bibliotech. Built with Next.js, Tailwind CSS, and shadcn/ui.
