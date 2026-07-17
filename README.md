<p align="center">
  <img src="./public/logo.webp" alt="Tech Bazaar logo" width="96" />
</p>

<h1 align="center">Tech Bazaar</h1>

<p align="center"><strong>Discover products. Sell with control. Buy securely with Stripe.</strong></p>

<p align="center">A modern role-based marketplace built for confident shopping, controlled selling, and secure payments.</p>

<p align="center">
  <a href="https://tech-bazar-client.vercel.app/">Live Site</a> |
  <a href="https://github.com/Khalid-Sifullah-Siam/tech-Bazaar-client">Client Repository</a> |
  <a href="https://github.com/Khalid-Sifullah-Siam/tech-Bazaar-server">Server Repository</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-111111?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-database-47a248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Stripe-payments-635bff?logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-111111?logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p align="center">
  <a href="#key-features">Features</a> ·
  <a href="#user-roles">Roles</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#screenshots">Screenshots</a>
</p>

<hr />

## Why Tech Bazaar?

<table>
  <tr>
    <td width="33%"><strong>For buyers</strong><br />Discover approved products, pay securely with Stripe, and keep every purchase in one place.</td>
    <td width="33%"><strong>For sellers</strong><br />Manage products, track performance, upgrade plans, and grow with marketplace tools.</td>
    <td width="33%"><strong>For admins</strong><br />Moderate products, manage account access, control roles, and monitor platform activity.</td>
  </tr>
</table>

## Overview

Tech Bazaar brings the complete marketplace workflow into one responsive application:

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
||||||||||||||||||||||| public/
||||||||   |||||||||||||||||||||||| images/                         # Project screenshots
||||||||||||||||||||||| src/
||||||||   ||||||||||||||||||||||| app/                            # Pages, layouts, loading, error, and not-found states
||||||||   ||||||||   |||||||||||||||||||||||| api/
||||||||   ||||||||       ||||||||||||||||||||||| auth/[...all]/           # Better Auth handler
||||||||   ||||||||       |||||||||||||||||||||||| marketplace/[...path]/   # Marketplace API routes
||||||||   ||||||||||||||||||||||| components/                     # Reusable UI and dashboard components
||||||||   ||||||||||||||||||||||| lib/                            # Auth, Stripe, database, and marketplace helpers
||||||||   |||||||||||||||||||||||| proxy.js                        # Authentication and role-based route protection
||||||||||||||||||||||| package.json
|||||||||||||||||||||||| README.md
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

Screenshots are stored in [public/images](./public/images). Each image is shown at full width with a consistent height and listed in serial order.

<div align="center">
  <p><strong>Photo 01</strong></p>
  <img src="./public/images/Screenshot%20%28477%29.png" alt="Tech Bazaar screenshot 01" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 02</strong></p>
  <img src="./public/images/Screenshot%20%28478%29.png" alt="Tech Bazaar screenshot 02" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 03</strong></p>
  <img src="./public/images/Screenshot%20%28479%29.png" alt="Tech Bazaar screenshot 03" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 04</strong></p>
  <img src="./public/images/Screenshot%20%28480%29.png" alt="Tech Bazaar screenshot 04" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 05</strong></p>
  <img src="./public/images/Screenshot%20%28481%29.png" alt="Tech Bazaar screenshot 05" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 06</strong></p>
  <img src="./public/images/Screenshot%20%28482%29.png" alt="Tech Bazaar screenshot 06" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 07</strong></p>
  <img src="./public/images/Screenshot%20%28483%29.png" alt="Tech Bazaar screenshot 07" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 08</strong></p>
  <img src="./public/images/Screenshot%20%28484%29.png" alt="Tech Bazaar screenshot 08" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 09</strong></p>
  <img src="./public/images/Screenshot%20%28485%29.png" alt="Tech Bazaar screenshot 09" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 10</strong></p>
  <img src="./public/images/Screenshot%20%28486%29.png" alt="Tech Bazaar screenshot 10" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 11</strong></p>
  <img src="./public/images/Screenshot%20%28487%29.png" alt="Tech Bazaar screenshot 11" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 12</strong></p>
  <img src="./public/images/Screenshot%20%28488%29.png" alt="Tech Bazaar screenshot 12" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 13</strong></p>
  <img src="./public/images/Screenshot%20%28489%29.png" alt="Tech Bazaar screenshot 13" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 14</strong></p>
  <img src="./public/images/Screenshot%20%28490%29.png" alt="Tech Bazaar screenshot 14" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 15</strong></p>
  <img src="./public/images/Screenshot%20%28491%29.png" alt="Tech Bazaar screenshot 15" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 16</strong></p>
  <img src="./public/images/Screenshot%20%28492%29.png" alt="Tech Bazaar screenshot 16" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 17</strong></p>
  <img src="./public/images/Screenshot%20%28493%29.png" alt="Tech Bazaar screenshot 17" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 18</strong></p>
  <img src="./public/images/Screenshot%20%28494%29.png" alt="Tech Bazaar screenshot 18" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 19</strong></p>
  <img src="./public/images/Screenshot%20%28495%29.png" alt="Tech Bazaar screenshot 19" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 20</strong></p>
  <img src="./public/images/Screenshot%20%28496%29.png" alt="Tech Bazaar screenshot 20" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 21</strong></p>
  <img src="./public/images/Screenshot%20%28497%29.png" alt="Tech Bazaar screenshot 21" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 22</strong></p>
  <img src="./public/images/Screenshot%20%28498%29.png" alt="Tech Bazaar screenshot 22" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 23</strong></p>
  <img src="./public/images/Screenshot%20%28499%29.png" alt="Tech Bazaar screenshot 23" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 24</strong></p>
  <img src="./public/images/Screenshot%20%28500%29.png" alt="Tech Bazaar screenshot 24" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 25</strong></p>
  <img src="./public/images/Screenshot%20%28501%29.png" alt="Tech Bazaar screenshot 25" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 26</strong></p>
  <img src="./public/images/Screenshot%20%28502%29.png" alt="Tech Bazaar screenshot 26" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 27</strong></p>
  <img src="./public/images/Screenshot%20%28503%29.png" alt="Tech Bazaar screenshot 27" width="100%" height="420" />
</div>

<div align="center">
  <p><strong>Photo 28</strong></p>
  <img src="./public/images/Screenshot%20%28504%29.png" alt="Tech Bazaar screenshot 28" width="100%" height="420" />
</div>

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
