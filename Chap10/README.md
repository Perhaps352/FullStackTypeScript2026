# Chap10 – PostgreSQL + Prisma

1. Käynnistä tietokanta:
   `docker run --name chap10-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=chap10db -p 5434:5432 -d postgres:18`
2. `npm install`
3. Kopioi `.env.example` tiedostoksi `.env`
4. `npx prisma migrate dev --name init` ja sen jälkeen `npx prisma generate`
5. `npm run dev` (palvelin portissa 8000)

PowerShell-esimerkki:
```
Invoke-RestMethod -Method Post -Uri "http://localhost:8000/api/v1/users" `
  -ContentType "application/json" `
  -Body (@{ username = "alice"; email = "alice@example.com" } | ConvertTo-Json)
```
