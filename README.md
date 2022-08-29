<p align="center"><img src="https://user-images.githubusercontent.com/7442937/184669530-e8e1ee85-891d-462a-9de2-a68a5ba12f14.svg" alt="Spelling Bee" /></p>

# Spelling Bee

A clone of [The New York Times Spelling Bee](https://www.nytimes.com/puzzles/spelling-bee) that I tried for fun.

![Screenshot 2022-08-28 at 8 56 34 PM](https://user-images.githubusercontent.com/7442937/187107966-183bb0c9-a6bb-40b8-8699-ff5418b593c1.png)


It's just like the old Spelling Bee with a few tweaks:

1. You can start over at any time
2. The cursor can be moved anywhere in the textbox
3. The words are completely random (and kinda hard too if I'm being honest)
4. Minor style changes
5. It was made by `ME` (probably the biggest difference)

Give it a try and tell me what you think!
[Spelling Bee](https://calm-crepe-f49431.netlify.app)

Add an `.env` file with:

```sh
# Prisma
DATABASE_URL=some_db_connection_string
```

Update Prisma schema file with your desired provider

```sh
datasource db {
    provider = "cockroachdb"
    url      = env("DATABASE_URL")
}
```

Run the app locally

```sh
yarn
yarn prisma db push
yarn dev
```

This app was made with the [Create T3 App Template](https://create.t3.gg/) which includes

- [Next-Auth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io) (using @next version? [see v10 docs here](https://alpha.trpc.io))
