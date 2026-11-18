# KonfTrack

KonfTrack je web-aplikacija za upravljanje znanstvenim konferencijama koja omogućuje organizaciju konferencijskih događaja, prijavu znanstvenih radova, provedbu recenzijskog postupka i donošenje odluka o prihvaćanju radova.

**Projekt na kolegiju:** Ovu je aplikaciju razvio studentski tim u sklopu kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu (FER).

## Opis aplikacije

KonfTrack je namijenjen organizatorima znanstvenih konferencija, autorima znanstvenih radova i recenzentima koji sudjeluju u pripremi i provedbi konferencija. Aplikacija rješava problem upravljanja prijavama radova, recenzijama i odlukama putem e-pošte i tablica tako što te procese objedinjuje u jednom sustavu. Cilj je olakšati organizaciju konferencija, učiniti praćenje statusa radova preglednijim i podržati provedbu dvostruko slijepog recenzijskog postupka.

**Ključne funkcionalnosti**

- Pregled konferencija na koje je moguće prijaviti znanstveni rad.
- Prijava znanstvenih radova i praćenje njihovog statusa kroz recenzijski postupak.
- Dodjeljivanje recenzenata, pregled recenzija i donošenje odluka o prihvaćanju radova.

Za potpuni opseg, zahtjeve, oblikovanje i dokaze ispitivanja pogledajte [docs](docs/Home.md).

<a id="deployment"></a>
## Postavljanje (engl. deployment)

**Javno dostupna aplikacija:** https://konftrack.onrender.com

**Isprobajte:** Otvorite aplikaciju, na početnoj stranici vidljive su konferencije otvorene za predaju radova i konferencije kod kojih je rok za predaju radova istekao, ali se još nisu održale. Registrirajte korisnički račun putem e-mail adrese ili se prijavite putem ORCID-a. Nakon prijave moguće je pristupiti obrascu za predaju znanstvenog rada.

**Demonstracija:** Početna stranica s prikazom otvorenih i nadolazećih konferencija dostupna je svim korisnicima, dok je za ostale funkcionalnosti nužna prijava. Novi korisnički račun moguće je registrirati putem e-mail adrese, uz potvrdu e-mail adrese, ili se prijaviti putem ORCID-a.

**Ograničenja:** Aplikacija je postavljena na besplatnom Render hostingu te je namijenjena demonstraciji projekta. Vrijeme pokretanja aplikacije može biti dulje nakon razdoblja neaktivnosti. Za slanje e-mailova koristi se vanjska usluga, a pojedine funkcionalnosti ovise o dostupnosti konfiguriranih vanjskih servisa.

[Vodič za postavljanje i pokretanje](docs/6-Postavljanje-instalacija-i-konfiguracija.md) opisuje smještaj aplikacije (engl. hosting) koji tim stvarno koristi. Tim može koristiti Render ili drugu platformu koju ste dogovorili s asistentom/demonstratorom.

<a id="quick-start"></a>
## Brzi početak / instalacija

**Preduvjeti:** 
- Node.js (LTS verzija)
- npm (upravitelj paketa, dolazi uz Node.js)
- Web-preglednik za pristup aplikaciji

>**Napomena:** Navedeni preduvjeti odnose se na trenutnu fazu implementacije projekta te se mogu proširivati i mijenjati ovisno o daljnjem razvoju aplikacije i uvođenju novih funkcionalnosti.

```bash
git clone https://github.com/MatejCuric/KonfTrack-Grupa-12.1.git
cd KonfTrack-Grupa-12.1/backend
npm install
npm start
```

**Adresa:** http://127.0.0.1:10000
### Važno za lokalno pokretanje:
Aplikaciju je potrebno otvarati putem adrese `http://127.0.0.1:10000`, a ne putem `http://localhost:10000`. ORCID OAuth prijava u lokalnom okruženju koristi konfigurirani redirect URI, a `localhost` i `127.0.0.1` tretiraju se kao različite adrese. Ako se aplikacija otvori preko `localhost`, a OAuth tijek koristi `127.0.0.1`, može doći do problema s OAuth `state` vrijednošću i povratkom s ORCID-a.

**Konfiguracija:** Za lokalno pokretanje potrebno je definirati varijable okruženja prema datoteci [.env.example](./backend/.env.example). Datoteka sadrži popis potrebnih varijabli i primjer njihove konfiguracije. Potrebne vrijednosti dobivaju se iz konfiguracije korištenih vanjskih usluga, poput Neon baze podataka, ORCID autentifikacije i BREVO usluge za slanje e-pošte. Stvarne pristupne podatke i tajne ključeve potrebno je postaviti u lokalnu `.env` datoteku.

Nakon postavljanja varijabli okruženja pokrenite aplikaciju naredbom `npm start` te otvorite `http://127.0.0.1:10000` u web-pregledniku. Ako je konfiguracija ispravna, prikazat će se početna stranica aplikacije. Za detaljno postavljanje pogledajte [projektnu dokumentaciju](docs/Home.md).

## Tehnologije

| Tehnologija ili alat | Uloga u ovom projektu | Razlog uporabe ili važno ograničenje |
| --- | --- | --- |
| Node.js | Pokreće serverski dio aplikacije i izvršava backend kod. | Omogućuje razvoj cijelog backend dijela u JavaScriptu. |
| Express.js | Upravlja HTTP zahtjevima, rutama, sesijama i serverskom logikom aplikacije. | Omogućuje jednostavnu organizaciju backend ruta i middlewarea. |
| EJS | Generira HTML stranice na temelju podataka s poslužitelja. | Omogućuje povezivanje serverske logike s korisničkim sučeljem bez zasebnog frontend frameworka. |
| PostgreSQL | Pohranjuje podatke aplikacije, uključujući korisnike i podatke vezane uz konferencije i radove. | Relacijska baza omogućuje definiranje odnosa i ograničenja između podataka. |
| Neon | Hosting PostgreSQL baze podataka u oblaku. | Omogućuje pristup bazi iz deployane aplikacije bez lokalnog pokretanja PostgreSQL poslužitelja. |
| Brevo API | Šalje e-mail poruke korisnicima, primjerice poruke za potvrdu registracije. | Slanje e-mailova ovisi o dostupnosti vanjske usluge Brevo. |
| ORCID | Omogućuje prijavu korisnika putem ORCID računa. | Prijava ovisi o vanjskoj ORCID OAuth 2.0 usluzi. |
| Render | Hosting web aplikacije i njezino pokretanje na javnoj adresi. | Aplikacija ovisi o dostupnosti hosting usluge. |

<a id="team-members"></a>
## Članovi tima

| Član | Glavna uloga ili doprinos |
| --- | --- |
| Antonio Jović | Backend |
| Matej Ćurić | Backend, autentifikacija i deployment|
| Patrik Paradžik | Frontend |
| Nina Mare Rogulj | Izrada modela baze podataka, deployment baze na vanjski servis i povezivanje baze i backenda |
| Stella Tomeljak | Izlučivanje, analiza i dokumentacija funkcijskih i nefunkcijskih zahtjeva, te sudjelovanje u implementaciji stvarnih funkcionalnosti sustava |
| Nea Trumbić | Izrada i dokumentiranje obrazaca uporabe i pripadajućih dijagrama na osnovu zahtjeva aplikacije, te sudjelovanje u implementaciji |
| Martina Čulina | Izrada, analiza i dokumentiranje arhitekture sustava i pripadajućih dijagrama, te sudjelovanje u implementaciji|

Uloge se tijekom projekta mogu mijenjati. Repozitorij i dogovoreni alat za praćenje zadataka (engl. task tracker) služe kao dodatni dokazi timskog rada.

## Doprinos projektu

Zadaci i uočeni nedostaci evidentiraju se putem [GitHub Issues](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/issues), gdje članovi tima preuzimaju zadatke povezane sa svojim područjem odgovornosti. Promjene koda razvijaju se na zasebnim granama te se putem Pull Requestova predlažu za spajanje u odgovarajuću ciljnu granu (`dev` ili `main`), kako bi se mogle pregledati prije spajanja. Aktualni zadaci i nedostaci prate se putem GitHub Issues, a povijest promjena dostupna je u GitHub repozitoriju.

<a id="license"></a>

**Status licence:** Licenca nije definirana.

Dokumentacijski predložak kolegija sadrži otvorene obrazovne sadržaje (engl. Open Educational Resources, OER) i licenciran je licencom Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. Ta licenca **ne određuje automatski licencu studentske aplikacije**; tim treba jasno navesti licencu svojeg projekta u prethodnom retku i datoteci `LICENSE`, ako je primjenjivo.

Kod trećih strana, skupovi podataka, slike, ikone i drugi sadržaji zadržavaju vlastite licence i uvjete uporabe.

<a id="ai-usage"></a>
## Uporaba umjetne inteligencije [![AI Usage: Disclosed](https://img.shields.io/badge/AI%20Usage-Disclosed-blue.svg)](https://www.fer.unizg.hr/_download/repository/Policy%20on%20the%20appropriate%20use%20of%20artificial%20intelligence%20at%20the%20faculty%20of%20electrical%20engineering%20and%20computing%5B1%5D.pdf)

Ovaj projekt slijedi FER-ova [pravila o primjerenoj uporabi umjetne inteligencije](https://www.fer.unizg.hr/_download/repository/Policy%20on%20the%20appropriate%20use%20of%20artificial%20intelligence%20at%20the%20faculty%20of%20electrical%20engineering%20and%20computing%5B1%5D.pdf).

**Izjava:** Tijekom razvoja projekta korišteni su alati umjetne inteligencije, prvenstveno ChatGPT i Claude, kao pomoć pri razumijevanju projektnog zadatka, otklanjanju grešaka, oblikovanju i provjeri pojedinih dijelova implementacije te izradi i uređivanju dokumentacije. Generirani prijedlozi nisu automatski prihvaćani, već su ih članovi tima pregledavali, prilagođavali potrebama projekta i provjeravali u vlastitom razvojnom okruženju.

<a id="code-of-conduct-and-support"></a>
## Kodeks ponašanja i podrška [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

Od članova tima očekuje se pridržavanje **Kodeksa ponašanja studenata** Fakulteta elektrotehnike i računarstva Sveučilišta u Zagrebu, pravila timskog rada na kolegiju i [Etičkog kodeksa IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html). [Code of conduct](CODE_OF_CONDUCT.md)

---

Struktura dokumentacije prilagođena je predlošku kolegija Programsko inženjerstvo FER-a autora [Vlade Sruka](https://www.fer.unizg.hr/vlado.sruk), licenciranom pod [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Aplikaciju i njezin sadržaj izradio je gore navedeni studentski tim.
