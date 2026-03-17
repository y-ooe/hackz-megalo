# Backend Structure

Feature-based layout for collaborative development:

```text
src/
	app.ts
	index.ts
	config/
		passport.ts
	middlewares/
		logger.ts
	features/
		auth/
			auth.routes.ts
			github/
				github.routes.ts
				github.controller.ts
			otp/
				otp.routes.ts
				otp.controller.ts
```

## How To Extend

- Add new authentication methods under `src/features/auth/<provider>/`.
- Put route declarations in `*.routes.ts` and request logic in `*.controller.ts`.
- Register feature routes in `src/features/auth/auth.routes.ts`.
- Keep shared infrastructure in `src/config` and `src/middlewares`.
