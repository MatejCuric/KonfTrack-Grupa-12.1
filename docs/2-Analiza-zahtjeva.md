# 2. Analiza zahtjeva

<details>
<summary><strong>Održavanje zahtjeva ažurnima</strong></summary>

Zahtjevi su izvedeni iz projektnog zadatka. Ako se tijekom razvoja zahtjev promijeni, doda ili ukloni, ažuriramo tablicu i bilježimo značajne promjene u odjeljku 2.5.

</details>

## 2.1 Funkcijski zahtjevi

| ID | Opis | Prioritet | Izvor | Kriteriji prihvaćanja |
| --- | --- | --- | --- | --- |
| F-001 | Korisnik se registrira i prijavljuje e-poštom ili ORCID-om. | Visok | Odobreni zadatak | Nakon uspješne prijave korisnik dobiva pristup radnjama za prijavljene; neprijavljeni ih ne može izvršiti. |
| F-002 | Korisnik uređuje profil (ime, ustanova, ORCID, ključne riječi ekspertize). | Srednji | Odobreni zadatak | Spremljeni podaci vide se pri ponovnom otvaranju profila. |
| F-003 | Javna stranica konferencije (poziv, teme, datumi, program nakon objave) dostupna je bez prijave. | Visok | Odobreni zadatak | Neprijavljeni korisnik vidi stranicu; objavljeni program vidljiv je, neobjavljeni nije. |
| F-004 | Predsjednik programskog odbora na pregledu „Statistika“ vidi broj predanih radova po temama, udio prihvaćenih radova, prosječno trajanje recenzije i opterećenje pojedinih recenzenata te može izvesti podatke u CSV formatu. | Srednji | Odobreni zadatak | Pregled prikazuje sva četiri pokazatelja; izvezeni CSV sadrži iste podatke kao pregled; ostale uloge nemaju pristup pregledu. |
| F-005 | Administrator vidi statistiku korištenja. | Nizak | Odobreni zadatak | Statistika je dostupna samo administratoru i prikazuje podatke o korištenju sustava. |
| F-006 | Predsjednik unosi naziv, mjesto, datume, odabire vremensku zonu, teme, maksimalan broj stranica i rokove (predaja, recenzije, obavijesti, konačne verzije). | Visok | Odobreni zadatak | Uneseni podaci prikazuju se na javnoj stranici. |
| F-007 | Administrator deaktivira korisnički račun u slučaju zlouporabe. | Visok | Odobreni zadatak | Dostupno samo administratoru; deaktivirani korisnik se ne može prijaviti. |
| F-008 | Autor predaje rad: naslov, sažetak, ključne riječi, tema, koautori, autor za kontakt i anonimizirani PDF. | Visok | Odobreni zadatak | Rad s popunjenim obaveznim poljima i PDF-om dobiva status "Predan". |
| F-009 | Sustav provjerava format i najveći broj stranica PDF-a te upozorava ako metapodaci sadrže imena autora. | Visok | Odobreni zadatak | Neispravan PDF je odbijen uz poruku; PDF s imenom u metapodacima daje upozorenje prije predaje. |
| F-010 | Za reference s DOI-jem sustav dohvaća metapodatke preko Crossrefa i upozorava na DOI koji nije pronađen. | Srednji | Odobreni zadatak | Postojeći DOI prikaže metapodatke; nepostojeći prikaže upozorenje i autor može ispraviti. |
| F-011 | Autor mijenja rad do roka predaje i može ga povući prije prihvaćanja. | Srednji | Odobreni zadatak | Izmjena i povlačenje rade u dopuštenom razdoblju, a izvan njega su onemogućeni. |
| F-012 | Autor na pregledu „Moji radovi“ vidi radove i njihova stanja (nacrt, predan, u recenziji, potrebna revizija, prihvaćen, odbijen, konačna verzija predana, uvršten u program). | Visok | Odobreni zadatak | Popis prikazuje trenutni status svakog rada, a status nije označen samo bojom. |
| F-013 | Predsjednik poziva recenzente e-poštom; pozvani korisnik prihvaća ili odbija poziv. | Visok | Odobreni zadatak | Pozvani korisnik prima e-poštu s mogućnošću prihvaćanja ili odbijanja; prihvaćanjem postaje recenzent te konferencije. |
| F-014 | Nakon roka predaje recenzent za naslov i sažetak bira: želim, mogu, ne želim recenzirati ili sukob interesa. | Visok | Odobreni zadatak | Odabir se sprema i koristi pri prijedlogu raspodjele. |
| F-015 | Administrator odobrava novu konferenciju i imenuje njezina predsjednika programskog odbora. | Visok | Odobreni zadatak | Konferencija postaje aktivna tek nakon odobrenja; imenovani korisnik dobiva ovlasti predsjednika; radnja je dostupna samo administratoru. |
| F-016 | Sustav prepoznaje sukobe interesa: prijavljeni, ista ustanova, koautorstvo u zadnje tri godine, prema podacima dohvaćenim iz ORCID-a. | Visok | Odobreni zadatak | Recenzent u sukobu nikad nije u prijedlogu raspodjele. |
| F-017 | Predsjednik ručno mijenja raspodjelu radova recenzentima. | Visok | Odobreni zadatak | Ručna izmjena raspodjele se sprema; sustav blokira dodjelu vlastitog rada uz poruku. |
| F-018 | Recenzent na „Moje recenzije“ vidi dodijeljene radove i rokove te predaje ocjenu (−3 do +3), stručnost (1 do 5), komentar autorima i povjerljivi komentar. | Visok | Odobreni zadatak | Recenzija se sprema; recenzent ne vidi identitet autora; povjerljivi komentar vidi samo programski odbor. |
| F-019 | Nakon predaje svih recenzija za rad, recenzenti vide međusobne recenzije i raspravljaju anonimno kao „Recenzent 1“, „Recenzent 2“... | Srednji | Odobreni zadatak | Rasprava se ne otvara prije predaje svih recenzija; imena se nigdje ne prikazuju. |
| F-020 | Sustav šalje podsjetnike 7 i 2 dana prije roka recenzije, označava kasne recenzije, a predsjednik može dodijeliti zamjenskog recenzenta. | Srednji | Odobreni zadatak | Podsjetnici stižu u zadano vrijeme; kasna recenzija je vidljivo označena. |
| F-021 | Predsjednik na pregledu „Odluke“ vidi prosječnu ocjenu, broj recenzija i oznaku znatnog neslaganja te bira Prihvaćen, Potrebna revizija ili Odbijen. | Visok | Odobreni zadatak | Tablica prikazuje sve navedene podatke; odabrana odluka mijenja status rada. |
| F-022 | Predsjednik programskog odbora skupno šalje autorima obavijesti o odlukama prema predlošku e-pošte. Poruka sadrži odluku i komentare recenzenata namijenjene autorima, ali ne sadrži povjerljive komentare ni identitete recenzenata. | Visok | Odobreni zadatak | Poslana poruka ne sadrži povjerljive komentare ni identitete recenzenata. |
| F-023 | Autor za rad s odlukom „potrebna revizija“ predaje novu verziju i dokument s odgovorima, a rad se vraća istim recenzentima. | Srednji | Odobreni zadatak | Nakon predaje rad je u recenziji kod istih recenzenata. |
| F-024 | Nakon prihvaćanja autor predaje neanonimiziranu konačnu verziju, potpisanu izjavu o autorskim pravima i ime izlagača. | Srednji | Odobreni zadatak | Rad prelazi u stanje Konačna verzija predana. |
| F-025 | Predsjednik slaže program (sekcije s temom, dvoranom, terminom i predsjedavajućim); sustav predlaže grupiranje i provjerava preklapanja izlagača te da predsjedavajući nije autor u svojoj sekciji. | Srednji | Odobreni zadatak | Sustav ne dopušta spremanje programa s preklapanjem ili sukobom predsjedavajućeg. |
| F-026 | Prijavljeni korisnik dodaje izlaganja u osobni raspored i izvozi ih u Google Calendar. | Nizak | Odobreni zadatak | Izvezeni događaji pojavljuju se u kalendaru s ispravnim vremenom. |
| F-027 | Sustav iz prihvaćenih radova generira zbornik sažetaka u PDF formatu (sadržaj po sekcijama, kazalo autora). | Nizak | Odobreni zadatak | Generirani PDF sadrži sažetke prihvaćenih radova, sadržaj i kazalo autora; dostupan samo prijavljenim korisnicima. |
| F-028 | Administrator uređuje predloške e-pošte. | Srednji | Odobreni zadatak | Izmijenjeni predložak se sprema; sljedeće poruke koje sustav šalje koriste novi predložak; ostale uloge ne mogu uređivati predloške. |
| F-029 | Predsjednik programskog odbora može produljiti pojedini rok. | Srednji | Odobreni zadatak | Dostupno samo predsjedniku; sustav šalje obavijest zahvaćenim korisnicima. |
| F-030 | Sustav predlaže raspodjelu radova recenzentima tako da svaki rad ima najmanje tri recenzenta, da je opterećenje recenzenata ravnomjerno i da se poštuju sukobi interesa. | Visok | Odobreni zadatak | Svaki rad u prijedlogu ima najmanje tri recenzenta; razlika u broju dodijeljenih radova među recenzentima je minimalna; nijedan recenzent nije u sukobu interesa s radom niti recenzira vlastiti rad. |

<details>
<summary><strong>Izvori zahtjeva i kriteriji prihvaćanja</strong></summary>

Svaki zahtjev treba imati stabilan ID. Izvor svih zahtjeva je odobreni projektni zadatak; ako se zahtjev kasnije doda ili promijeni zbog povratne informacije, izvor se u tablici ažurira. Zahtjevi opisuju ponašanje sustava, a ne izgled zaslona ni tehnologiju. Kriteriji prihvaćanja navode što se mora moći provjeriti da bi zahtjev bio ispunjen. Prioriteti su na ljestvici **Visok / Srednji / Nizak**, a koristi se ista ljestvica u cijeloj dokumentaciji. Složenije tijekove (npr. recenzija ili izrada programa) opisujemo u obrascima uporabe, a ne u ovoj tablici.

</details>


## 2.2 Nefunkcijski zahtjevi

| ID | Opis | Prioritet | Izvor | Način provjere |
| --- | --- | --- | --- | --- |
| NF-01 | Anonimnost dvostruko slijepe recenzije jamči se u UI-ju, nazivima preuzetih datoteka, e-pošti i API odgovorima. | Visok | Odobreni zadatak | Pregled API odgovora, naziva datoteka i poruka kao autor i kao recenzent; nigdje nema identiteta druge strane. |
| NF-02 | Aplikacija je web aplikacija prilagođena mobilnim uređajima. | Visok | Odobreni zadatak | Ručni pregled glavnih tokova na mobilnoj širini zaslona. |
| NF-03 | Rokovi se izražavaju u vremenskoj zoni koju odabere predsjednik, a korisniku se prikazuju i u lokalnom vremenu. | Visok | Odobreni zadatak | Testni scenarij s rokom u drugoj vremenskoj zoni. |
| NF-04 | Sustav podržava istodobni rad većeg broja korisnika, osobito pred istek roka za predaju. | Srednji | Odobreni zadatak; brojka: odluka tima | Test opterećenja (50 istodobnih korisnika uz odziv do 2s). |
| NF-05 | Isti korisnički račun može istodobno sudjelovati na više konferencija s različitom ulogom na svakoj, a na svakoj vidi samo ono što ta uloga dopušta | Visok | Odobreni zadatak; dio o prikazu prema ulozi: odluka tima | Testni scenarij: korisnik je autor na jednoj, a recenzent na drugoj konferenciji i na svakoj vidi samo ono što ta uloga dopušta. |
| NF-06 | Autorizacija se provodi putem OAuth 2.0 tokena koji se ne prikazuju u sučelju. | Visok | Sigurnost podataka | Pregled sučelja i API odgovora; tokeni nisu vidljivi korisniku; zaštita podataka. |
| NF-07 | Povjerljivi komentar recenzenta vidljiv je samo programskom odboru, a nikad autorima ni drugim recenzentima. | Visok | Odobreni zadatak | Testni scenarij: povjerljivi komentar se ne pojavljuje u sučelju, e-pošti ni API odgovorima autora i recenzenata. |
| NF-08 | Nedostupnost vanjskog servisa (ORCID, Crossref, Google Calendar) ne onemogućuje rad ostatka sustava, a korisnik dobiva razumljivu poruku. | Visok | Odluka | Testni scenarij: servis je isključen ili vraća grešku; ostale funkcije rade i prikazuje se poruka. |
| NF-09 | Zbornik sažetaka generira se u PDF formatu, a izvoz statistike u CSV formatu. | Srednji | Odobreni zadatak | Testni scenarij: servis je isključen ili vraća grešku; ostale funkcije rade i prikazuje se poruka. |



## 2.3 Dionici i akteri

| ID uloge ili aktera | Odnos prema sustavu | Relevantni zahtjevi |
|---|---|---|
| A-01 | Javni posjetitelj | F-003: javna stranica konferencije |
| A-02 | Autor | F-001: Registracija i prijava; F-002: Uređivanje profila; F-008: Predaja rada; F-009: Provjera formata PDF-a; F-010: Provjera referenci s DOI-jem; F-011: Izmjena i povlačenje rada; F-012: Pregled „Moji radovi“; F-022: Primanje obavijesti o odluci; F-023: Predaja revizije; F-024: Predaja konačne verzije; F-026: Osobni raspored i izvoz u Google Calendar; F-027: Pregled zbornika sažetaka; F-029: Primanje obavijesti o produljenju roka. |
| A-03 | Recenzent | F-001: Registracija i prijava; F-002: Uređivanje profila; F-013: Prihvaćanje ili odbijanje poziva; F-014: Iskazivanje interesa i sukoba interesa; F-018: Predaja recenzije („Moje recenzije“); F-019: Anonimna rasprava o radu; F-020: Primanje podsjetnika; F-026: Osobni raspored i izvoz u Google Calendar; F-027: Pregled zbornika sažetaka; F-029: Primanje obavijesti o produljenju roka. |
| A-04 | Predsjednik programskog odbora | F-001: Registracija i prijava; F-002: Uređivanje profila; F-004: Pregled „Statistika“ i izvoz u CSV; F-006: Unos podataka o konferenciji i rokova; F-013: Pozivanje recenzenata; F-016: Uvid u sukobe interesa pri raspodjeli; F-017: Ručna izmjena raspodjele; F-020: Dodjela zamjenskog recenzenta; F-021: Pregled „Odluke“ i donošenje odluka; F-022: Skupno slanje obavijesti o odlukama; F-025: Slaganje programa; F-026: Osobni raspored i izvoz u Google Calendar; F-027: Pregled zbornika sažetaka; F-029: Produljenje roka; F-030: Prijedlog raspodjele radova recenzentima. |
| A-05 | Administrator | F-001: Registracija i prijava; F-002: Uređivanje profila; F-005: Statistika korištenja sustava; F-007: Deaktivacija korisničkog računa; F-015: Odobravanje konferencije i imenovanje predsjednika; F-027: Pregled zbornika sažetaka; F-028: Uređivanje predložaka e-pošte. |
| A-06 | Vanjski sustavi: ORCID, Crossref, Google Calendar, servis za e-poštu | F-001: Prijava putem ORCID-a; F-010: Dohvat metapodataka (Crossref); F-013: Slanje poziva e-poštom; F-016: Podaci o ustanovi i koautorstvu (ORCID); F-020: Slanje podsjetnika e-poštom; F-022: Slanje obavijesti o odlukama; F-026: Izvoz u Google Calendar; F-029: Slanje obavijesti o produljenju roka. |
| D-01 | Baza podataka (PostgreSQL na platformi Neon) | F-004: Pregled „Statistika“ i izvoz u CSV; F-005: Statistika korištenja sustava; F-012: Pregled „Moji radovi“; F-018: Pregled „Moje recenzije“; F-021: Pregled „Odluke“. |

---

## 2.4 Ograničenja i pretpostavke

| ID | Tip | Opis ograničenja ili pretpostavke | Izvor | Inženjerska posljedica / Provjera |
|---|---|---|---|---|
| C-01 | Ograničenje | Registracija i prijava su e-poštom ili ORCID-om, a autorizacija unutar aplikacije provodi se OAuth 2.0 protokolom s tokenima. | Odobreni zadatak | Autorizaciju projektirati na tokenima; ORCID prijavu povezati s istim korisničkim računom (issue #8, #9). |
| C-02 | Ograničenje | Rješenje je responzivna web aplikacija. | Odobreni zadatak | Bez nativne mobilne aplikacije. |
| C-03 | Ograničenje | Sustav ovisi o vanjskim servisima ORCID, Crossref, Google Calendar te servisu za slanje e-pošte. | Odobreni zadatak | Integracije izolirati u zasebne module radi lakšeg testiranja. |
| C-04 | Ograničenje | Backend je Express aplikacija, a baza PostgreSQL. | Odluka tima (issue #6, #7) | Arhitekturu i model podataka graditi na tome. |
| C-05 | Ograničenje | Baza PostgreSQL hostana je na servisu Neon. | Odluka tima | Veza na bazu ovisi o dostupnosti Neona; pristupne podatke čuvati izvan repozitorija. |
| AS-01 | Pretpostavka | Zadatak na dva mjesta različito određuje povlačenje (do isteka roka, odnosno do prihvaćanja); pretpostavljamo da se izmjena dopušta do roka predaje, a povlačenje do prihvaćanja. | Procjena tima | Potvrditi s asistentom. |
| AS-02 | Pretpostavka | ORCID daje dovoljno podataka o ustanovi i koautorstvu za provjeru sukoba interesa. | Procjena tima | Provjeriti u istraživanju ORCID API-ja i nadomjestiti ručnim unosom ako ne. |
| AS-03 | Odluka | Zadatak ne navodi broj istodobnih korisnika; tim je za test odabrao 50 istodobnih korisnika uz odziv do 2 s. | Procjena tima | Zapisano u NF-04. |
| AS-04 | Pretpostavka | Zadatak ne kaže tko određuje najveći dopušteni broj stranica PDF-a; pretpostavljamo da ga predsjednik programskog odbora zadaje pri postavljanju konferencije. | Procjena tima | Prikazati ograničenje jasno pri predaji. |

Ograničenje je uvjet koji tim mora poštovati; pretpostavka je uvjet na koji se tim oslanja i koji treba ponovno provjeravati.

---

## 2.5 Značajne promjene zahtjeva


| Datum | ID zahtjeva | Promjena i razlog | Dogovoreno s / dokaz |
| --- | --- | --- | --- |
| – | – | Za sada nema značajnih promjena zahtjeva. | – |

<details>
<summary><strong>Primjer značajne promjene</strong></summary>

</details>

---

## 2.6 Sljedivost zahtjeva

**Cilj:** Osigurati dvosmjernu sljedivost — povezati zahtjeve s opisanim ponašanjem, dijelovima sustava koji ih ostvaruju te ispitivanjem ili drugom provjerom. 

| ID zahtjeva | Obrazac uporabe / modul | Arhitekturna realizacija | Ispitivanje ili provjera |
| --- | --- | --- | --- |
| F-001 | UC-02 Registracija ili prijava | Frontend: `register.ejs`, `login.ejs`, `orcid-complete-registration.ejs`; rute `/register`, `/verify-email`, `/login`, `/logout`, `/auth/orcid`, `/auth/orcid/callback`, `/auth/orcid/complete-registration` (`konftrack.controller.js`); `auth.service.js` (`registerUser`, `verifyEmail`, `loginUser`, `findOrcidUser`, `createOrcidUser`); `orcid.service.js` (OAuth 2.0); `email.service.js` (`sendVerificationEmail`, Brevo); `auth.middleware.js` (`loadCurrentUser`, `requireAuth`); `user.model.js` | *na čekanju* |
| F-002 | UC-03 Uređivanje profila | *na čekanju* | *na čekanju* |
| F-003 | UC-01 Pregled javne stranice konferencije | Frontend: `home.ejs`, `konferencija.ejs`; rute `GET /`, `GET /konferencije/:id`; `conference.service.js` (`dohvatiSveKonferencije`, `dohvatiKonferencijuPoId`); `conference.model.js` (`dohvatiTemeKonferencije`). Prikaz programa još nije implementiran | *na čekanju* |
| F-004 | UC-24 Pregled „Statistika" | *na čekanju* | *na čekanju* |
| F-005 | UC-29 Pregled statistike korištenja | Djelomično: `statistika.ejs`, ruta `GET /statistika` zaštićena s `requireAdmin` (`auth.middleware.js`); brojke su zasad fiksne u predlošku i ne dohvaćaju se iz baze | *na čekanju* |
| F-006 | UC-10 Definiranje konferencije | *na čekanju* | *na čekanju* |
| F-007 | UC-27 Deaktivacija korisničkog računa | Djelomično: `auth.service.loginUser` i `auth.middleware.loadCurrentUser` odbijaju korisnika s `aktivan = false`; gumb „Deaktiviraj" u `admin.ejs` (`GET /admin`, `requireAdmin`) još nije povezan s pozadinskom radnjom | *na čekanju* |
| F-008 | UC-04 Predaja i promjena rada | Frontend: `predaj-rad.ejs`, `predaj-rad.js`; rute `GET /predaj-rad`, `POST /spremi-rad` (`requireAuth`, `primanjePdf` — multer); `paper.service.js` (`validacijaRada`, `spremiRad`); `paper.model.js` (`spremiRad` — tablice `paper`, `paper_author`, `paper_version`); `conference.service.dohvatiOtvoreneKonferencije` | *na čekanju* |
| F-009 | UC-16 Provjera PDF-a | Djelomično: `primanjePdf` u `konftrack.controller.js` (najviše 10 MB) i `paper.service.validacijaRada` (PDF je obavezan); provjera broja stranica i metapodataka nije implementirana | *na čekanju* |
| F-010 | UC-04 Predaja i promjena rada | *na čekanju* | *na čekanju* |
| F-011 | UC-04 Predaja i promjena rada; UC-05 Povlačenje rada | *na čekanju* | *na čekanju* |
| F-012 | UC-21 Pregled „Moji radovi" | `moji-radovi.ejs`; ruta `GET /moji-radovi`; `paper.service.dohvatiRadoveKorisnika`; `paper.model.dohvatiRadoveKorisnika` | *na čekanju* |
| F-013 | UC-07 Odgovor na poziv u programski odbor; UC-20 Pozivanje recenzenata | *na čekanju* | *na čekanju* |
| F-014 | UC-08 Iskazivanje interesa za radove | *na čekanju* | *na čekanju* |
| F-015 | UC-14 Odobravanje konferencije; UC-30 Imenovanje predsjednika | *na čekanju* | *na čekanju* |
| F-016 | UC-17 Provjera sukoba interesa | *na čekanju* | *na čekanju* |
| F-017 | UC-11 Uređivanje raspodjele radova recenzentima | *na čekanju* | *na čekanju* |
| F-018 | UC-31 Pregled „Moje recenzije"; UC-32 Predaja ocjene | Djelomično: `moje-recenzije.ejs`, ruta `GET /moje-recenzije` (`requireAuth`); stranica zasad prikazuje fiksne podatke, a predaja ocjene nije implementirana | *na čekanju* |
| F-019 | UC-09 Rasprava s recenzentima | *na čekanju* | *na čekanju* |
| F-020 | UC-18 Dodjela zamjenskog recenzenta; UC-32 Predaja ocjene | *na čekanju* | *na čekanju* |
| F-021 | UC-12 Odluke o radovima; UC-25 Pregled „Odluke" | *na čekanju* | *na čekanju* |
| F-022 | UC-15 Obavijest o odluci | *na čekanju* | *na čekanju* |
| F-023 | UC-06 Predaja revizije | *na čekanju* | *na čekanju* |
| F-024 | UC-23 Predaja neanonimizirane konačne verzije | *na čekanju* | *na čekanju* |
| F-025 | UC-13 Slaganje programa konferencije; UC-26 Provjera konflikata rasporeda | *na čekanju* | *na čekanju* |
| F-026 | UC-19 Upravljanje osobnim rasporedom | *na čekanju* | *na čekanju* |
| F-027 | UC-22 Pregled zbornika sažetaka | *na čekanju* | *na čekanju* |
| F-028 | UC-28 Uređivanje predložaka e-pošte | *na čekanju* | *na čekanju* |
| F-029 | UC-10 Definiranje konferencije | *na čekanju* | *na čekanju* |
| F-030 | UC-11 Uređivanje raspodjele radova recenzentima; UC-17 Provjera sukoba interesa | *na čekanju* | *na čekanju* |

---

## 2.7 Pregled zahtjeva

| Kontrolna točka | Povratna informacija ili nalaz | Odluka o zahtjevu ili opsegu |
| --- | --- | --- |
| Iteracija 1 (19.11.2026.) | Asistent je zatražio da se baza podataka uključi među dionike. | Baza podataka (PostgreSQL na platformi Neon) dodana je u tablicu aktera i dionika kao D-01, uz povezane zahtjeve F-004, F-005, F-012, F-018 i F-021. |
| Iteracija 1 (19.11.2026.) | Asistent je zatražio da se nadopuni definicija gotovosti (DoD) te popuni dokumentacija za Sprint | Definirana je definicija gotovosti; rezultat Sprinta je inkrement koji zadovoljava DoD. |
| Iteracija 1 (19.11.2026) | Demosica je zatražila dodavanje vizualne ploče | Vizualna ploča dodana te dodani svi zadaci. |
| Iteracija 1 (19.11.2026.) | Asistent je zatražio proširenje funkcijskih zahtjeva. | F-030 je dodan (Sustav predlaže raspodjelu radova recenzentima tako da svaki rad ima najmanje tri recenzenta, da je opterećenje recenzenata ravnomjerno i da se poštuju sukobi interesa). |
| Demo 2  | [Povratna informacija] | [Odluka; vidi odjeljak 2.5] |
| Završni pregled | [Povratna informacija] | [Odluka; vidi odjeljak 2.5] |
