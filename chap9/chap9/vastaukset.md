# Chapter 9 – Learning Express

## 1. Mikä Express on ja miten se liittyy Node.js:ään?

Express on Node.js:n päälle rakennettu kevyt web-sovelluskehys (framework). Se ei ole erillinen palvelin tai oma ajoympäristö, vaan koodikerros, joka käyttää Node.js:n omaa HTTP-palvelinta taustalla. Esimerkiksi `app.listen()` kutsuu sisäisesti Noden `createServer`- ja `listen`-funktioita.

Pelkällä Node.js:llä HTTP-palvelun tekeminen on kömpelöä, koska esimerkiksi otsakkeet, reitit ja pyynnön sisältö pitää käsitellä itse. Express tekee tämän helpommaksi tarjoamalla valmiin rajapinnan reittien määrittelyyn (`get`, `post` jne.), JSON-datan lukemiseen (`express.json()`), vastausten lähettämiseen (`res.send`, `res.json`) sekä laajan middleware-ekosysteemin. Express siis nopeuttaa ja selkeyttää Node-kehitystä, mutta toimii aina Noden päällä.

## 2. Mitä middleware tarkoittaa Expressissä? Mitä tehtäviä middleware voi hoitaa pyynnön käsittelyn aikana?

Middleware on funktio, joka sijoittuu pyynnön käsittelyputkeen (pipeline). Se saa käyttöönsä pyyntö- ja vastausolion (`req`, `res`) sekä `next`-funktion. Sitä voi ajatella eräänlaisena "sieppaajana": se voi tutkia pyyntöä, muokata sitä tai vastausta, ja joko lähettää vastauksen itse tai antaa ohjauksen seuraavalle middlewarelle kutsumalla `next()`. Jos `next()` jää kutsumatta eikä vastausta lähetetä, pyyntö jää roikkumaan.

Middlewaret suoritetaan siinä järjestyksessä, jossa ne on määritelty, joten järjestyksellä on väliä. Jos esimerkiksi app-tason middleware kutsuu `res.send`, pyyntö päättyy siihen eikä etene reiteille asti.

Middlewaren tehtäviä ovat esimerkiksi:

- pyyntöjen lokitus (logging)
- JSON-rungon jäsentäminen (`express.json()`), jolloin tiedot saa luettua `req.body`:sta
- autentikointi ja valtuutus
- pyynnön tai vastauksen muokkaus
- virheenkäsittely

Middlewarea on kolmea päätyyppiä: koko sovellukselle (`app.use`), reiteille (`Router`) ja virheenkäsittelyyn. Virheenkäsittelijän tunnistaa siitä, että sillä on neljä parametria (`err, req, res, next`). Lisäksi middlewarea voi ottaa käyttöön valmiina npm-paketteina.

## 3. Kuvaile omin sanoin, miten HTTP-pyyntö etenee Express-sovelluksessa asiakkaalta palvelimelle ja takaisin asiakkaalle.

1. Asiakas (esim. selain tai curl) lähettää HTTP-pyynnön palvelimelle, esimerkiksi `GET /api/v1/users/2`.
2. Node.js:n HTTP-palvelin vastaanottaa pyynnön ja välittää sen Expressille. Express luo pyynnöstä `Request`-olion (sisältää mm. parametrit, otsakkeet ja rungon) ja `Response`-olion (sisältää vastauksen, otsakkeet ja tilakoodin).
3. Pyyntö kulkee middlewarejen läpi niiden määrittelyjärjestyksessä. Esimerkiksi ensin lokitus-middleware kirjaa pyynnön ja kutsuu `next()`, sitten `express.json()` jäsentää JSON-rungon.
4. Kun app-tason middlewaret on käyty läpi, pyyntö ohjautuu reitittimelle (router), joka etsii pyyntöä vastaavan reitin HTTP-metodin ja polun perusteella (esim. `/api/v1/users/:id`). Reitin parametrit, kuten `:id`, ovat luettavissa `req.params`:sta.
5. Reitinkäsittelijä (route handler) suorittaa varsinaisen logiikan, esimerkiksi hakee käyttäjän taulukosta, ja lähettää vastauksen `res.send()`- tai `res.json()`-kutsulla. Tämä päättää pyynnön käsittelyn.
6. Jos jossain vaiheessa tapahtuu virhe, pyyntö siirtyy virheenkäsittely-middlewarelle, joka palauttaa esimerkiksi tilakoodin 500 ja virheilmoituksen.
7. Vastaus kulkee Noden HTTP-palvelimen kautta takaisin asiakkaalle, joka näyttää tuloksen (esim. selaimessa tekstin "User jon").
