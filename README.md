This project is a Next.js application integrated with Frames.js to create interactive posts (frames) on Warpcast. It includes functionality for creating and voting on Kramer contests.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/PrinceCarter/kramer-contest.git
cd kramer-contest
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Setting Up Environment Variables

Create a .env.local file in the root of your project and add the following:

```.env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Replace the value of NEXT_PUBLIC_API_BASE_URL with your actual API base URL when deploying to production.

## Project Structure

`app/page.tsx`: The main entry point of the application.
`components/Header.tsx`: The header component used across different frames.
`frames/`: Contains the frame handlers and logic for the Kramer contest and contest creation.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

To learn more about Next.js and Frames.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Frames.js Documentation](https://framesjs.org/) - learn about Frames.js features and API.
