# Bazaar

> Discover products. Sell with control. Buy securely with Stripe.

Bazaar is a modern role-based technology marketplace for buyers, sellers, and administrators. Buyers can discover approved products and complete secure Stripe checkouts, sellers can manage their catalog and plans, and admins can moderate the marketplace from a dedicated dashboard.

<p>
  <a href="https://tech-bazar-client.vercel.app/">Live Site</a> ·
  <a href="https://github.com/Khalid-Sifullah-Siam/tech-Bazaar-client">Client Repository</a> ·
  <a href="https://github.com/Khalid-Sifullah-Siam/tech-Bazaar-server">Server Repository</a>
</p>

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-149eca?logo=react) ![MongoDB](https://img.shields.io/badge/MongoDB-database-47a248?logo=mongodb) ![Stripe](https://img.shields.io/badge/Stripe-payments-635bff?logo=stripe) ![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

## Overview

Bazaar brings the complete marketplace workflow into one responsive application:

- Browse approved products with search, filters, sorting, and pagination.
- View product details, choose quantity, and pay through Stripe Checkout.
- Give sellers product, sales, revenue, and plan management tools.
- Give admins moderation, user management, statistics, and payment monitoring controls.
- Protect user accounts with Better Auth, role-based access, and account status controls.

## Key Features

| Area | Features |
| --- | --- |
| Authentication | Better Auth email authentication, role-based access, protected routes, profile updates, and logout |
| Product discovery | Product grid, details pages, search, category filters, price sorting, popularity sorting, and pagination |
| Checkout | Stripe product checkout, quantity selection, payment confirmation, and payment records |
| Buyer dashboard | Purchases, transactions, profile management, and account history |
| Seller dashboard | Product create/edit/delete, image upload, review status, sales statistics, revenue, and plan history |
| Admin dashboard | Statistics, role changes, block/unblock, suspend/unsuspend, product moderation, deletion confirmation, and payment monitoring |
| Experience | Responsive layout, mobile navigation, HeroUI components, Framer Motion transitions, and toast feedback |

## User Roles

| Role | Capabilities |
| --- | --- |
| Buyer | Browse approved products, view details, buy products, manage profile, and review purchases and payments |
| Seller | Add products, upload images, edit submitted products, track status, view sales, and upgrade seller plans |
| Admin | Manage buyer and seller accounts, change roles, control account status, approve/reject products, delete products, and monitor payments |

## Buyer Flow

1. Browse approved products.
2. Search, filter, sort, or paginate the catalog.
3. Open a product details page and select quantity.
4. Continue to Stripe Checkout.
5. Return to the success page after payment.
6. Review purchased products and payment history from the dashboard.

## Seller Flow

1. Create a seller account.
2. Add a product with image, price, stock, category, and description.
3. Wait for admin review while the product remains pending.
4. Edit or delete owned products when needed.
5. Track approved products, units sold, revenue, and plan history.
6. Upgrade to a paid seller plan through Stripe.

## Admin Controls

Admins can manage the marketplace from protected admin routes:

- Change a buyer to seller or a seller to buyer.
- Block, unblock, suspend, and unsuspend accounts.
- Approve or reject submitted products at any time.
- Delete products only after an explicit confirmation dialog.
- View marketplace statistics and all payment records.

## Tech Stack

| Category | Tools |
| --- | --- |
| Frontend | Next.js App Router, React, Tailwind CSS, HeroUI, Framer Motion |
| Marketplace API | Next.js route handlers with MongoDB and Stripe integrations |
| Companion server | Node.js, Express.js, CORS, MongoDB |
| Database | MongoDB |
| Authentication | Better Auth with MongoDB adapter |
| Payments | Stripe Checkout |
| Image upload | ImgBB |
| Notifications | React Hot Toast |
| Deployment | Vercel |

## Project Structure

```text
bazaar-client/
├── public/
│   └── images/                         # Project screenshots
├── src/
│   ├── app/                            # Pages, layouts, loading, error, and not-found states
│   │   └── api/
│   │       ├── auth/[...all]/           # Better Auth handler
│   │       └── marketplace/[...path]/   # Marketplace API routes
│   ├── components/                     # Reusable UI and dashboard components
│   ├── lib/                            # Auth, Stripe, database, and marketplace helpers
│   └── proxy.js                        # Authentication and role-based route protection
├── package.json
└── README.md
```

The companion server is available at [tech-Bazaar-server](https://github.com/Khalid-Sifullah-Siam/tech-Bazaar-server). The current client contains the active marketplace route handlers; the Express server remains the companion server project for the ecosystem.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- Git
- A MongoDB database
- A Stripe account and secret key
- An ImgBB API key
- Better Auth secret

### Client Setup

```bash
git clone https://github.com/Khalid-Sifullah-Siam/tech-Bazaar-client.git
cd tech-Bazaar-client
npm install
```

Create a `.env.local` file. Use your own values and never commit this file:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
IMGBB_API_KEY=your_imgbb_api_key
```

Start the client:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Companion Server Setup

```bash
git clone https://github.com/Khalid-Sifullah-Siam/tech-Bazaar-server.git
cd tech-Bazaar-server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

The server currently starts with Node.js:

```bash
node index.js
```

The health endpoint is available at [http://localhost:5000](http://localhost:5000).

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create the production build |
| `npm run start` | Start the production server |
| `npm run lint` | Check linting issues |

## Screenshots

Screenshots are stored in [`public/images`](./public/images). They are listed in serial order below.

| Photo 01 | Photo 02 | Photo 03 | Photo 04 |
| --- | --- | --- | --- |
| ![Photo 01](./public/images/Screenshot%20%28477%29.png) | ![Photo 02](./public/images/Screenshot%20%28478%29.png) | ![Photo 03](./public/images/Screenshot%20%28479%29.png) | ![Photo 04](./public/images/Screenshot%20%28480%29.png) |

| Photo 05 | Photo 06 | Photo 07 | Photo 08 |
| --- | --- | --- | --- |
| ![Photo 05](./public/images/Screenshot%20%28481%29.png) | ![Photo 06](./public/images/Screenshot%20%28482%29.png) | ![Photo 07](./public/images/Screenshot%20%28483%29.png) | ![Photo 08](./public/images/Screenshot%20%28484%29.png) |

| Photo 09 | Photo 10 | Photo 11 | Photo 12 |
| --- | --- | --- | --- |
| ![Photo 09](./public/images/Screenshot%20%28485%29.png) | ![Photo 10](./public/images/Screenshot%20%28486%29.png) | ![Photo 11](./public/images/Screenshot%20%28487%29.png) | ![Photo 12](./public/images/Screenshot%20%28488%29.png) |

| Photo 13 | Photo 14 | Photo 15 | Photo 16 |
| --- | --- | --- | --- |
| ![Photo 13](./public/images/Screenshot%20%28489%29.png) | ![Photo 14](./public/images/Screenshot%20%28490%29.png) | ![Photo 15](./public/images/Screenshot%20%28491%29.png) | ![Photo 16](./public/images/Screenshot%20%28492%29.png) |

| Photo 17 | Photo 18 | Photo 19 | Photo 20 |
| --- | --- | --- | --- |
| ![Photo 17](./public/images/Screenshot%20%28493%29.png) | ![Photo 18](./public/images/Screenshot%20%28494%29.png) | ![Photo 19](./public/images/Screenshot%20%28495%29.png) | ![Photo 20](./public/images/Screenshot%20%28496%29.png) |

| Photo 21 | Photo 22 | Photo 23 | Photo 24 |
| --- | --- | --- | --- |
| ![Photo 21](./public/images/Screenshot%20%28497%29.png) | ![Photo 22](./public/images/Screenshot%20%28498%29.png) | ![Photo 23](./public/images/Screenshot%20%28499%29.png) | ![Photo 24](./public/images/Screenshot%20%28500%29.png) |

| Photo 25 | Photo 26 | Photo 27 | Photo 28 |
| --- | --- | --- | --- |
| ![Photo 25](./public/images/Screenshot%20%28501%29.png) | ![Photo 26](./public/images/Screenshot%20%28502%29.png) | ![Photo 27](./public/images/Screenshot%20%28503%29.png) | ![Photo 28](./public/images/Screenshot%20%28504%29.png) |

## Security Notes

- Never commit `.env`, `.env.local`, API keys, database credentials, or Stripe secrets.
- Use separate development and production credentials.
- Configure production environment variables in Vercel rather than hardcoding them.
- Rotate any secret that has been exposed publicly.

## Deployment

The client is deployed on Vercel. Add the required environment variables to the Vercel project, then deploy with:

```bash
npx vercel --prod
```

## License

This project is maintained as a marketplace portfolio project. Add a license here if you plan to distribute or reuse the code publicly.
