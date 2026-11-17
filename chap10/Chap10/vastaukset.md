# Chapter 10 – Vastaukset

## 1. Mikä on Prisma Scheman tehtävä? Miten se liittyy PostgreSQL-tietokannan rakenteeseen?
Prisma Schema (`schema.prisma`) on tiedosto, jossa tietomalli määritellään yhdessä paikassa: mallit (taulut), kentät (sarakkeet), relaatiot ja rajoitteet. Sen perusteella Prisma generoi tietokannan rakenteen (migraatioiden SQL) ja TypeScript-clientin. Schema vastaa siis suoraan PostgreSQL:n rakennetta: `model User` on taulu, kentät ovat sarakkeita ja `@unique`, `@@index` ja `@relation` ovat vastaavia rajoitteita, indeksejä ja viiteavaimia.

## 2. Mihin Prisma Migratea tarvitaan? Miksi tietokannan migraatioiden hallinta on tärkeää ohjelmistokehityksessä?
Prisma Migrate vertaa schemaa tietokantaan ja luo muutoksista versioidut SQL-migraatiotiedostot, jotka se ajaa tietokantaan järjestyksessä. Migraatiot ovat tärkeitä, koska ne tallentavat tietokannan muutoshistorian gitiin. Näin jokaisen kehittäjän ja tuotantoympäristön tietokanta voidaan päivittää samaan tilaan toistettavasti ja turvallisesti ilman käsin tehtyjä muutoksia.

## 3. Mitä hyötyä Prisma Clientin tarjoamasta tyyppiturvallisuudesta on TypeScript-sovelluksessa?
Prisma Client generoidaan schemasta, joten editori tuntee kaikki mallit, kentät ja relaatiot ja tarjoaa automaattitäydennyksen. TypeScript huomaa virheet jo käännösvaiheessa, esimerkiksi väärän kentän nimen tai tyypin tai poistetun kentän käytön. Virheet löytyvät siis ennen ohjelman ajoa eikä vasta ajonaikana, kuten raa'assa SQL:ssä.

## Repositorio
Lisää tähän linkki omaan GitHub-repositorioosi.
