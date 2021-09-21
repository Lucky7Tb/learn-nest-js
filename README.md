## Prerequisite

```bash
1. Mysql/MariaDb
2. Node Js version 12.6 or higher
```

## Installastion

```bash
1.	`npm install`
2.	Create DB and import from sql migration in `src/config/prisma/migration` 
3.	`cp .env.example .env` or just create a new `.env` file and copy paste from `.env.example`
4. 	run `npm run setup`
5.	Done
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

[MIT licensed](LICENSE).
