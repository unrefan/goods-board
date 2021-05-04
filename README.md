# Goods board

### Requirements
- node v14

### Installation
1. Install dependencies
```bash
yarn install
```
2. Copy `.env` - `cp .env.example .env`
3. Generate app key - `node app_key.js`
4. Set up all necessary env variables.
5. Migrate database - `npx prisma migrate`

Done 🚀. Now you can run the app. 
```bash
node src/index.js
```
### API documentation (swagger)
check ui `<APP_HOST>:<APP_PORT>/docs/api`
or
run `yarn swagger:generate` to generate `swagger.json` file

#### To seed database with local user execute
```bash
npx prisma db seed --preview-feature
```