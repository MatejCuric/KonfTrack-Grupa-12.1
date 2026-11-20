# Sprint 1

**Trajanje:** 22. 10. 2026. – 20. 11. 2026.
**Tim:** KonfTrack-Grupa-12.1
- **Plan na ploči:** [GitHub Projects](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/projects)

## Cilj sprinta
Postaviti osnovu projekta (repozitorij, dokumentacija, arhitektura, baza) i implementirati osnovne funkcionalnosti aplikacije: prijavu korisnika, prikaz konferencija i predaju znanstvenog rada.

## Zadaci u sprintu

| Issue | Zadatak | Nositelj | Status |
|-------|---------|----------|--------|
| #1 | Dogovoriti tijek i pravila rada na repozitoriju | tim | Gotovo |
| #2 | Urediti početnu stranicu dokumentacije i glavni README | MĆ | Gotovo |
| #3 | Izraditi osnovnu projektnu dokumentaciju | ST | Gotovo |
| #4 | Izraditi opis glavnih slučajeva uporabe | NT | Gotovo |
| #5 | Definirati arhitekturu sustava | MČ | Gotovo |
| #6 | Postaviti osnovu Express aplikacije i lokalno pokretanje | AJ | Gotovo |
| #7 | Izraditi početni model baze podataka u PostgreSQL-u | NMR | Gotovo |
| #8 | Istražiti i isprobati autentifikaciju putem vanjskog pružatelja identiteta | MĆ | Gotovo |
| #9 | Implementirati autentifikaciju korisnika putem vanjskog pružatelja identiteta | MĆ | Gotovo |
| #10 | Izraditi osnovne korisničke stranice i frontend strukturu aplikacije | PP | Gotovo |
| #17 | Implementirati dohvat i obradu podataka o konferencijama | NMR | Gotovo |
| #18 | Implementirati dinamički prikaz konferencija na početnoj stranici | PP | Gotovo |
| #19 | Implementirati stranicu s detaljima pojedine konferencije | PP, ST | Gotovo |
| #20 | Implementirati obrazac za predaju znanstvenog rada | MČ, PP | Gotovo |
| #21 | Implementirati privremeno spremanje predanih radova i pregled „Moji radovi” | NMR, AJ | Gotovo |
| #22 | Implementirati pregled konferencija kojima upravlja predsjednik programskog odbora | NT | U tijeku |
| #23 | Implementirati osnovnu strukturu za pregled i unos recenzija | MČ, ST | U tijeku |

## Definicija dovršenosti (DoD)
Zadatak je gotov kad su ispunjeni svi uvjeti:

- Promjene su pregledane i spojene u granu `dev` putem pull requesta. Grana `dev` spaja se u `main` prije predaje projekta. Dokumentacija se može izravno ažurirati na grani `main` nakon povlačenja najnovijih promjena.
- Funkcija je ručno isprobana i radi prema kriterijima prihvaćanja iz pripadajućeg issuea.
- Dokumentacija i konfiguracija su ažurirane (`docs`, `db/database.sql`, `backend/.env.example` ako se mijenjaju).
- Ako promjena utječe na pokretanje ili rad aplikacije, provjereno je da aplikacija radi u odgovarajućem okruženju, uključujući deployment ako je primjenjivo.

## Rizici i napomene
- #22 i #23 su niskog prioriteta i nisu gotovi, pa prelaze u sljedeći sprint ako se ne dovrše do 20. 11.
- Postavljanje aplikacije na Render i baze podataka na Neon uspješno je odrađeno, iako zadatak nije bio evidentiran kao zaseban GitHub issue.

## Rezultati sprinta
- Postavljena je osnovna struktura aplikacije i projektna dokumentacija.
- Izrađen je početni model baze podataka i uspostavljena je veza s bazom podataka na Neonu.
- Implementirane su osnovne funkcionalnosti prijave korisnika, prikaza konferencija i predaje radova.
- Aplikacija je postavljena na Render.
- Zadaci #22 i #23 ostali su nedovršeni te se prenose u sljedeći sprint.

## Sastanci i dogovori
Evidencija sastanaka vodi se u [A.1 Evidencija sastanaka](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/blob/main/docs/A-Pregled-aktivnosti-grupe.md#a1-evidencija-sastanaka).
