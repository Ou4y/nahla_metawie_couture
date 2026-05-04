# Nahla Couture - Engineering Inventory (Draft)

This file is a code-grounded extraction from the current repository. It is not polished documentation.

## 1. Project Structure Inventory

### Top-level items

| Item | Type | Purpose | Status |
|---|---|---|---|
| [.DS_Store](.DS_Store) | file | macOS metadata | Not app-relevant |
| [.env](.env) | file | Local environment overrides | Exists (values not shown) |
| [.env.example](.env.example) | file | Example env variables | Implemented |
| [.gitignore](.gitignore) | file | Git ignore rules | Implemented |
| [README.md](README.md) | file | Quick start + DB notes | Implemented |
| [app.js](app.js) | file | Express app setup, middleware, routes | Implemented |
| [server.js](server.js) | file | HTTP server entrypoint | Implemented |
| [package.json](package.json) | file | Scripts + dependencies | Implemented |
| [package-lock.json](package-lock.json) | file | Dependency lockfile | Implemented |
| [docker-compose.yml](docker-compose.yml) | file | MySQL + phpMyAdmin services | Implemented |
| [config/](config/) | folder | DB config + DB check | Implemented |
| [controllers/](controllers/) | folder | Request handlers | Implemented + some unused |
| [middleware/](middleware/) | folder | Auth, flash, error handling | Implemented |
| [models/](models/) | folder | DB model stubs | Placeholder |
| [routes/](routes/) | folder | Route definitions | Implemented |
| [services/](services/) | folder | Business logic layer | Partial/placeholder |
| [sql/](sql/) | folder | Schema + seed data | Implemented |
| [public/](public/) | folder | Static assets | Implemented |
| [views/](views/) | folder | EJS templates | Implemented + placeholders |
| [node_modules/](node_modules/) | folder | Installed packages | Generated |

### Placeholder or stub files identified by code

- [models/User.js](models/User.js), [models/Reservation.js](models/Reservation.js), [models/WebsiteContent.js](models/WebsiteContent.js), [models/NotificationLog.js](models/NotificationLog.js), [models/WorkingDay.js](models/WorkingDay.js), [models/WorkingHour.js](models/WorkingHour.js): methods return `null` or empty arrays.
- [services/statisticsService.js](services/statisticsService.js): returns hard-coded stats objects.
- [views/admin/schedule.ejs](views/admin/schedule.ejs), [views/admin/stats.ejs](views/admin/stats.ejs), [views/admin/content.ejs](views/admin/content.ejs), [views/gallery.ejs](views/gallery.ejs), [views/contact.ejs](views/contact.ejs): placeholder UI and static content.
- [public/js/main.js](public/js/main.js): placeholder JS file.

## 2. Route Inventory

### Public routes

| Method | Final path | Route file | Controller | Middleware | Purpose |
|---|---|---|---|---|---|
| GET | / | [routes/index.js](routes/index.js) | `publicController.home` | none | Render home page |
| GET | /about | [routes/index.js](routes/index.js) | `publicController.about` | none | Render about page |
| GET | /gallery | [routes/index.js](routes/index.js) | `publicController.gallery` | none | Render gallery page |
| GET | /contact | [routes/index.js](routes/index.js) | `publicController.contact` | none | Render contact page |

### Auth routes (base /auth)

| Method | Final path | Route file | Controller | Middleware | Purpose |
|---|---|---|---|---|---|
| GET | /auth/register | [routes/authRoutes.js](routes/authRoutes.js) | `authController.getRegister` | `requireGuest` | Render register page |
| POST | /auth/register | [routes/authRoutes.js](routes/authRoutes.js) | `authController.postRegister` | `requireGuest` | Create account |
| GET | /auth/login | [routes/authRoutes.js](routes/authRoutes.js) | `authController.getLogin` | `requireGuest` | Render login page |
| POST | /auth/login | [routes/authRoutes.js](routes/authRoutes.js) | `authController.postLogin` | `requireGuest` | Authenticate + create session |
| POST | /auth/logout | [routes/authRoutes.js](routes/authRoutes.js) | `authController.postLogout` | `requireAuth` | Destroy session |

### Reservation routes (base /reservations)

| Method | Final path | Route file | Controller | Middleware | Purpose |
|---|---|---|---|---|---|
| GET | /reservations/new | [routes/reservationRoutes.js](routes/reservationRoutes.js) | `reservationController.getNewReservation` | `requireAuth` | Render new reservation form |
| POST | /reservations | [routes/reservationRoutes.js](routes/reservationRoutes.js) | `reservationController.createReservation` | `requireAuth` | Create reservation |
| GET | /reservations/mine | [routes/reservationRoutes.js](routes/reservationRoutes.js) | `reservationController.listMyReservations` | `requireAuth` | List current user reservations |

### Admin routes (base /admin, guarded by requireAdmin)

| Method | Final path | Route file | Controller | Middleware | Purpose |
|---|---|---|---|---|---|
| GET | /admin/dashboard | [routes/adminRoutes.js](routes/adminRoutes.js) | `adminController.dashboard` | `requireAdmin` | Admin dashboard metrics |
| GET | /admin/users | [routes/adminRoutes.js](routes/adminRoutes.js) | `adminController.users` | `requireAdmin` | List users |
| GET | /admin/reservations | [routes/adminRoutes.js](routes/adminRoutes.js) | `adminController.reservations` | `requireAdmin` | List reservations |
| GET | /admin/schedule | [routes/adminRoutes.js](routes/adminRoutes.js) | `adminController.schedule` | `requireAdmin` | Schedule management (placeholder) |
| GET | /admin/content | [routes/adminRoutes.js](routes/adminRoutes.js) | `adminController.content` | `requireAdmin` | Content list |
| GET | /admin/stats | [routes/adminRoutes.js](routes/adminRoutes.js) | `adminController.stats` | `requireAdmin` | Detailed stats (placeholder) |

## 3. Controller Ownership Map

- [controllers/publicController.js](controllers/publicController.js)
  - Exports: `home`, `about`, `gallery`, `contact`
  - Owns: public pages
  - Routes: `/`, `/about`, `/gallery`, `/contact`

- [controllers/authController.js](controllers/authController.js)
  - Exports: `getRegister`, `postRegister`, `getLogin`, `postLogin`, `postLogout`
  - Owns: authentication and session lifecycle
  - Routes: `/auth/register`, `/auth/login`, `/auth/logout`

- [controllers/reservationController.js](controllers/reservationController.js)
  - Exports: `getNewReservation`, `createReservation`, `listMyReservations`
  - Owns: customer reservation flow
  - Routes: `/reservations/new`, `/reservations`, `/reservations/mine`

- [controllers/adminController.js](controllers/adminController.js)
  - Exports: `dashboard`, `users`, `reservations`, `schedule`, `content`, `stats`
  - Owns: admin portal views
  - Routes: `/admin/dashboard`, `/admin/users`, `/admin/reservations`, `/admin/schedule`, `/admin/content`, `/admin/stats`

- [controllers/contentController.js](controllers/contentController.js)
  - Exports: `listContent`, `updateContent`
  - Owns: content management actions
  - Routes: Not wired to any route

## 4. Middleware Map

| Middleware | Location | Purpose | Used in |
|---|---|---|---|
| `requireAuth` | [middleware/authMiddleware.js](middleware/authMiddleware.js) | Block access unless `req.session.user` exists | Reservation routes + `POST /auth/logout` |
| `requireGuest` | [middleware/authMiddleware.js](middleware/authMiddleware.js) | Block access if already authenticated | Register + login routes |
| `requireAdmin` | [middleware/authMiddleware.js](middleware/authMiddleware.js) | Block access unless `user.role === "admin"` | All admin routes |
| `attachCurrentUserToLocals` | [middleware/authMiddleware.js](middleware/authMiddleware.js) | Populate `res.locals` with user + flash | App-wide in [app.js](app.js) |
| `flash` | [middleware/flash.js](middleware/flash.js) | Adds `req.flash` stored in session | App-wide in [app.js](app.js) |
| `notFoundHandler` | [middleware/errorHandler.js](middleware/errorHandler.js) | Render 404 page | App-wide in [app.js](app.js) |
| `errorHandler` | [middleware/errorHandler.js](middleware/errorHandler.js) | Render error page | App-wide in [app.js](app.js) |

## 5. Model Inventory

| Model file | Table | Methods | Purpose | Status |
|---|---|---|---|---|
| [models/User.js](models/User.js) | `users` | `findById`, `findByEmail`, `findAll`, `create` | User CRUD | Stub (returns `null`/`[]`) |
| [models/Reservation.js](models/Reservation.js) | `reservations` | `create`, `findByUserId`, `findAll` | Reservation CRUD | Stub |
| [models/WebsiteContent.js](models/WebsiteContent.js) | `website_content` | `findAll`, `findBySlug`, `updateBulk` | CMS content | Stub |
| [models/NotificationLog.js](models/NotificationLog.js) | `notification_logs` | `create`, `findAll` | Log notifications | Stub |
| [models/WorkingDay.js](models/WorkingDay.js) | `working_days` | `findAll` | Availability days | Stub |
| [models/WorkingHour.js](models/WorkingHour.js) | `working_hours` | `findByDayId` | Availability hours | Stub |

## 6. Service Layer Inventory

| Service file | Purpose | Methods | Controllers using it | Status |
|---|---|---|---|---|
| [services/authService.js](services/authService.js) | Auth + user listing | `registerUser`, `loginUser`, `listUsers` | `authController`, `adminController.users` | Partial (depends on stub models) |
| [services/reservationService.js](services/reservationService.js) | Reservation creation/listing | `createReservation`, `listUserReservations`, `listAllReservations` | `reservationController`, `adminController.reservations` | Partial (depends on stub model) |
| [services/contentService.js](services/contentService.js) | CMS content access | `getAllContent`, `getContentBySlug`, `updateContent` | `adminController.content`, `contentController` | Partial (depends on stub model) |
| [services/notificationService.js](services/notificationService.js) | Notification logging | `logNotification` | Not used in controllers/routes | Placeholder |
| [services/statisticsService.js](services/statisticsService.js) | Dashboard analytics | `getDashboardStats`, `getDetailedStats` | `adminController.dashboard`, `adminController.stats` | Placeholder (static data) |

## 7. Database Schema Inventory

Schema file: [sql/schema.sql](sql/schema.sql)

### Tables and constraints

- **users**
  - PK: `id`
  - Fields: `email` (unique), `password_hash`, `role` (`admin|staff|client`, default `client`), `first_name`, `last_name`, `phone`, timestamps
  - Indexes: `uq_users_email`

- **working_days**
  - PK: `id`
  - Fields: `day_of_week` (unique), `is_active`, timestamps
  - Indexes: `uq_working_days_day`

- **working_hours**
  - PK: `id`
  - Fields: `working_day_id`, `start_time`, `end_time`, `is_active`, timestamps
  - Indexes: `uq_working_hours_slot`, `idx_working_hours_day`
  - FK: `working_day_id` -> `working_days.id` (ON DELETE CASCADE)

- **reservations**
  - PK: `id`
  - Fields: `user_id`, `reservation_type` (`basic_dress|bridal_dress`), `desired_date`, `start_time`, `end_time`, `status` (`pending|confirmed|cancelled`, default `pending`), `notes`, timestamps
  - Indexes: `uq_reservations_slot`, `idx_reservations_user`, `idx_reservations_date`
  - FK: `user_id` -> `users.id` (ON DELETE CASCADE)

- **website_content**
  - PK: `id`
  - Fields: `slug` (unique), `title`, `body`, `is_published`, timestamps
  - Indexes: `uq_website_content_slug`

- **notification_logs**
  - PK: `id`
  - Fields: `user_id` (nullable), `channel`, `status`, `message`, `created_at`
  - Indexes: `idx_notification_logs_user`
  - FK: `user_id` -> `users.id` (ON DELETE SET NULL)

### DB-level business rules enforced

- Reservation `reservation_type` and `status` are limited by `ENUM`.
- One reservation per time slot via `uq_reservations_slot`.
- One working-hour slot per day via `uq_working_hours_slot`.
- Unique email and unique content `slug`.
- Cascades: deleting a user deletes their reservations; deleting a working day deletes its hours; deleting a user nulls notification log `user_id`.

## 8. View / Page Inventory

| View file | Purpose | Access | Controller render | Completeness |
|---|---|---|---|---|
| [views/layout.ejs](views/layout.ejs) | Base layout wrapper | Shared | Layout include | Implemented |
| [views/partials/head.ejs](views/partials/head.ejs) | Head meta + CSS | Shared | Layout include | Implemented |
| [views/partials/navbar.ejs](views/partials/navbar.ejs) | Navigation + auth links | Shared | Layout include | Implemented |
| [views/partials/footer.ejs](views/partials/footer.ejs) | Footer | Shared | Layout include | Implemented |
| [views/partials/alerts.ejs](views/partials/alerts.ejs) | Flash message UI | Shared | Layout include | Implemented |
| [views/home.ejs](views/home.ejs) | Marketing home | Public | `publicController.home` | Implemented (static content) |
| [views/about.ejs](views/about.ejs) | About page | Public | `publicController.about` | Implemented (static content) |
| [views/gallery.ejs](views/gallery.ejs) | Gallery page | Public | `publicController.gallery` | Placeholder content |
| [views/contact.ejs](views/contact.ejs) | Contact page | Public | `publicController.contact` | Placeholder form (no action) |
| [views/auth/login.ejs](views/auth/login.ejs) | Login form | Guest-only | `authController.getLogin` | Implemented |
| [views/auth/register.ejs](views/auth/register.ejs) | Registration form | Guest-only | `authController.getRegister` | Implemented |
| [views/reservations/new.ejs](views/reservations/new.ejs) | Reservation form | Auth-only | `reservationController.getNewReservation` | Implemented (no availability logic) |
| [views/reservations/mine.ejs](views/reservations/mine.ejs) | User reservation list | Auth-only | `reservationController.listMyReservations` | Implemented |
| [views/admin/dashboard.ejs](views/admin/dashboard.ejs) | Admin KPIs | Admin-only | `adminController.dashboard` | Partial (stats are placeholders) |
| [views/admin/users.ejs](views/admin/users.ejs) | Users list | Admin-only | `adminController.users` | Partial (data depends on stub model) |
| [views/admin/reservations.ejs](views/admin/reservations.ejs) | Reservations list | Admin-only | `adminController.reservations` | Partial (data depends on stub model) |
| [views/admin/schedule.ejs](views/admin/schedule.ejs) | Schedule management | Admin-only | `adminController.schedule` | Placeholder |
| [views/admin/content.ejs](views/admin/content.ejs) | Content list | Admin-only | `adminController.content` | Placeholder (no edit UI) |
| [views/admin/stats.ejs](views/admin/stats.ejs) | Detailed stats | Admin-only | `adminController.stats` | Placeholder |
| [views/404.ejs](views/404.ejs) | 404 page | Public | `notFoundHandler` | Implemented |
| [views/error.ejs](views/error.ejs) | Error page | Public | `errorHandler` | Implemented |

## 9. Authentication and Authorization Inventory

- Auth routes: `/auth/register`, `/auth/login`, `/auth/logout` from [routes/authRoutes.js](routes/authRoutes.js).
- Session usage: `express-session` configured in [app.js](app.js); user stored in `req.session.user` in `postLogin`.
- Access control middleware: `requireAuth`, `requireGuest`, `requireAdmin` from [middleware/authMiddleware.js](middleware/authMiddleware.js).
- Role model: `users.role` enum (`admin|staff|client`) in [sql/schema.sql](sql/schema.sql). Only `admin` is enforced in code.
- Admin protection: `router.use(requireAdmin)` in [routes/adminRoutes.js](routes/adminRoutes.js) and admin nav link gating in [views/partials/navbar.ejs](views/partials/navbar.ejs).
- Missing or scaffolded:
  - `User` model methods are stubs, so register/login/list users are not implemented against the DB.
  - No server-side validation in controllers despite `express-validator` dependency.
  - Registration does not hash passwords in code (relies on stub model).
  - Sessions use the default in-memory store.

## 10. Reservation Flow Inventory

- Entry routes: GET `/reservations/new`, POST `/reservations`, GET `/reservations/mine`.
- Controller -> service -> model:
  - `createReservation` -> `reservationService.createReservation` -> `Reservation.create` (stub).
  - `listMyReservations` -> `reservationService.listUserReservations` -> `Reservation.findByUserId` (stub).
- Implemented rules:
  - App-level: none in controllers/services.
  - DB-level: unique time slot, enum validation in [sql/schema.sql](sql/schema.sql).
- Missing pieces:
  - No availability checks against working days/hours.
  - No conflict detection in service layer.
  - No validation of date/time ranges or business rules in code.
  - No admin confirmation or status updates.

## 11. Admin Feature Inventory

- Admin pages/routes: `/admin/dashboard`, `/admin/users`, `/admin/reservations`, `/admin/schedule`, `/admin/content`, `/admin/stats`.
- Implemented capabilities:
  - Dashboard cards render with placeholder stats data.
  - Users and reservations render if service returns data (currently stubbed).
- Scaffolded or not implemented:
  - Schedule management UI is placeholder.
  - Content listing exists, but no edit flow or routes for updates.
  - Detailed stats are placeholder.

## 12. Environment / Config Inventory

- Env variables: `PORT`, `SESSION_SECRET`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` from [app.js](app.js), [server.js](server.js), [config/db.js](config/db.js), [.env.example](.env.example).
- DB config: MySQL pool in [config/db.js](config/db.js), default `localhost:3307`.
- Session config: `express-session` with `resave: false`, `saveUninitialized: false` in [app.js](app.js).
- Docker services: MySQL 8 (port `3307:3306`) + phpMyAdmin (port `8080:80`) in [docker-compose.yml](docker-compose.yml).
- Local runtime assumption: Node app listens on `PORT` (default 3000).

## 13. Implementation Status Summary

- **Already implemented**
  - Routing structure and middleware wiring in [app.js](app.js) and [routes/](routes/).
  - EJS layout + core public/auth/reservation/admin views (UI structure).
  - Database schema and seed data in [sql/](sql/).
  - Basic session + flash plumbing.

- **Partially implemented**
  - Auth flow: controllers and service exist, but models are stubs.
  - Reservation flow: controllers and service exist, but models are stubs and validation is missing.
  - Admin dashboards and lists: view structure exists, but data is placeholder or dependent on stub models.

- **Placeholder only**
  - All models in [models/](models/).
  - Statistics data in [services/statisticsService.js](services/statisticsService.js).
  - Schedule/content/stats admin pages and gallery/contact content.
  - Front-end JS in [public/js/main.js](public/js/main.js).

- **Structurally prepared but not wired**
  - Content update via `contentController.updateContent` (no route).
  - Working days/hours models exist but are unused.
  - Notification logging service exists but is unused.
