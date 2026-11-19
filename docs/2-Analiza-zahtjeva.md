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
| F-004 | Predsjednik programskog odbora na pregledu „Statistika" vidi broj predanih radova po temama, udio prihvaćenih radova, prosječno trajanje recenzije i opterećenje pojedinih recenzenata te može izvesti podatke u CSV formatu. | Srednji | Odobreni zadatak | Pregled prikazuje sva četiri pokazatelja; izvezeni CSV sadrži iste podatke kao pregled; ostale uloge nemaju pristup pregledu. |
| F-005 | Administrator vidi statistiku korištenja. | Nizak | Odobreni zadatak | Statistika je dostupna samo administratoru i prikazuje podatke o korištenju sustava. |
| F-006 | Predsjednik unosi naziv, mjesto, datume, odabire vremensku zonu, teme i rokove (predaja, recenzije, obavijesti, konačne verzije). | Visok | Odobreni zadatak | Uneseni podaci prikazuju se na javnoj stranici. |
| F-007 | Administrator deaktivira korisnički račun u slučaju zlouporabe. | Visok | Odobreni zadatak | Dostupno samo administratoru; deaktivirani korisnik se ne može prijaviti. |
| F-008 | Autor predaje rad: naslov, sažetak, ključne riječi, tema, koautori, autor za kontakt i anonimizirani PDF. | Visok | Odobreni zadatak | Rad s popunjenim obaveznim poljima i PDF-om dobiva status Predan. |
| F-009 | Sustav provjerava format i najveći broj stranica PDF-a te upozorava ako metapodaci sadrže imena autora. | Visok | Odobreni zadatak | Neispravan PDF je odbijen uz poruku; PDF s imenom u metapodacima daje upozorenje prije predaje. |
| F-010 | Za reference s DOI-jem sustav dohvaća metapodatke preko Crossrefa i upozorava na DOI koji nije pronađen. | Srednji | Odobreni zadatak | Postojeći DOI prikaže metapodatke; nepostojeći prikaže upozorenje i autor može ispraviti. |
| F-011 | Autor mijenja rad do roka predaje i može ga povući prije prihvaćanja. | Srednji | Odobreni zadatak | Izmjena i povlačenje rade u dopuštenom razdoblju, a izvan njega su onemogućeni. |
| F-012 | Autor na pregledu „Moji radovi“ vidi radove i njihova stanja (nacrt, predan, u recenziji, potrebna revizija, prihvaćen, odbijen, konačna verzija predana, uvršten u program). | Visok | Odobreni zadatak | Popis prikazuje trenutni status svakog rada, a status nije označen samo bojom. |
| F-013 | Predsjednik poziva recenzente e-poštom; pozvani korisnik prihvaća ili odbija poziv. | Visok | Odobreni zadatak | Pozvani korisnik prima e-poštu s mogućnošću prihvaćanja ili odbijanja; prihvaćanjem postaje recenzent te konferencije. |
| F-014 | Nakon roka predaje recenzent za naslov i sažetak bira: želim, mogu, ne želim recenzirati ili sukob interesa. | Visok | Odobreni zadatak | Odabir se sprema i koristi pri prijedlogu raspodjele. |
| F-015 | Administrator odobrava novu konferenciju i imenuje njezina predsjednika programskog odbora. | Visok | Odobreni zadatak | Konferencija postaje aktivna tek nakon odobrenja; imenovani korisnik dobiva ovlasti predsjednika; radnja je dostupna samo administratoru. |
| F-016 | Sustav prepoznaje sukobe interesa: prijavljeni, ista ustanova, koautorstvo u zadnje tri godine, prema podacima dohvaćenim iz ORCID-a. | Visok | Odobreni zadatak | Recenzent u sukobu nikad nije u prijedlogu raspodjele. |
| F-017 | Predsjednik ručno mijenja raspodjelu radova recenzentima. | Visok | Odobreni zadatak | Ručna izmjena raspodjele se sprema; sustav blokira dodjelu vlastitog rada uz poruku. |
| F-018 | Recenzent na „Moje recenzije“ vidi dodijeljene radove i rokove te predaje ocjenu (−3 do +3), stručnost (1 do 5), komentar autorima i povjerljivi komentar. | Visok | Odobreni zadatak | Recenzija se sprema; recenzent ne vidi identitet autora. |
| F-019 | Nakon predaje svih recenzija za rad, recenzenti vide međusobne recenzije i raspravljaju anonimno kao „Recenzent 1“, „Recenzent 2“... | Srednji | Odobreni zadatak | Rasprava se ne otvara prije predaje svih recenzija; imena se nigdje ne prikazuju. |
| F-020 | Sustav šalje podsjetnike 7 i 2 dana prije roka recenzije, označava kasne recenzije, a predsjednik može dodijeliti zamjenskog recenzenta. | Srednji | Odobreni zadatak | Podsjetnici stižu u zadano vrijeme; kasna recenzija je vidljivo označena. |
| F-021 | Predsjednik na pregledu „Odluke“ vidi prosječnu ocjenu, broj recenzija i oznaku znatnog neslaganja te bira Prihvaćen, Potrebna revizija ili Odbijen. | Visok | Odobreni zadatak | Tablica prikazuje sve navedene podatke; odabrana odluka mijenja status rada. |
| F-022 | Predsjednik obavijesti o odlukama šalje skupno prema predlošku autoru, s odlukom i recenzijama, ali bez povjerljivih komentara. | Visok | Odobreni zadatak | Poslana poruka ne sadrži povjerljive komentare ni identitete recenzenata. |
| F-023 | Autor za rad s odlukom „potrebna revizija“ predaje novu verziju i dokument s odgovorima, a rad se vraća istim recenzentima. | Srednji | Odobreni zadatak | Nakon predaje rad je u recenziji kod istih recenzenata. |
| F-024 | Nakon prihvaćanja autor predaje neanonimiziranu konačnu verziju, potpisanu izjavu o autorskim pravima i ime izlagača. | Srednji | Odobreni zadatak | Rad prelazi u stanje Konačna verzija predana. |
| F-025 | Predsjednik slaže program (sekcije s temom, dvoranom, terminom i predsjedavajućim); sustav predlaže grupiranje i provjerava preklapanja izlagača te da predsjedavajući nije autor u svojoj sekciji. | Srednji | Odobreni zadatak | Sustav ne dopušta spremanje programa s preklapanjem ili sukobom predsjedavajućeg. |
| F-026 | Prijavljeni korisnik dodaje izlaganja u osobni raspored i izvozi ih u Google Calendar. | Nizak | Odobreni zadatak | Izvezeni događaji pojavljuju se u kalendaru s ispravnim vremenom. |
| F-027 | Sustav iz prihvaćenih radova generira zbornika sažetaka u PDF formatu (sadržaj po sekcijama, kazalo autora). | Nizak | Odobreni zadatak | Generirani PDF sadrži sažetke prihvaćenih radova, sadržaj i kazalo autora; dostupan samo prijavljenim korisnicima. |
| F-028 | Administrator uređuje predloške e-pošte. | Srednji | Odobreni zadatak | Izmijenjeni predložak se sprema; sljedeće poruke koje sustav šalje koriste novi predložak; ostale uloge ne mogu uređivati predloške. |
| F-029 | Predsjednik programskog odbora može produljiti pojedini rok. | Srednji | Odobreni zadatak | Dostupno samo predsjedniku; sustav šalje obavijest zahvaćenim korisnicima. |

<details>
<summary><strong>Izvori zahtjeva i kriteriji prihvaćanja</strong></summary>

Svaki zahtjev treba imati stabilan ID. Izvor svih zahtjeva je odobreni projektni zadatak; ako se zahtjev kasnije doda ili promijeni zbog povratne informacije, izvor se u tablici ažurira. Zahtjevi opisuju ponašanje sustava, a ne izgled zaslona ni tehnologiju. Kriteriji prihvaćanja navode što se mora moći provjeriti da bi zahtjev bio ispunjen. Prioriteti su na ljestvici **Visok / Srednji / Nizak**, a koristi se ista ljestvica u cijeloj dokumentaciji. Složenije tijekove (npr. recenzija ili izrada programa) opisujemo u obrascima uporabe, a ne u ovoj tablici.

</details>


## 2.2 Nefunkcijski zahtjevi

<details>
<summary><strong>Nefunkcijski zahtjevi za analizu</strong></summary>

| ID | Opis | Prioritet | Izvor | Način provjere |
| --- | --- | --- | --- | --- |
| NF-01 | Anonimnost dvostruko slijepe recenzije jamči se u UI-ju, nazivima preuzetih datoteka, e-pošti i API odgovorima. | Visok | Odobreni zadatak | Pregled API odgovora, naziva datoteka i poruka kao autor i kao recenzent; nigdje nema identiteta druge strane. |
| NF-02 | Aplikacija je web aplikacija prilagođena mobilnim uređajima. | Visok | Odobreni zadatak | Ručni pregled glavnih tokova na mobilnoj širini zaslona. |
| NF-03 | Rokovi se izražavaju u vremenskoj zoni koju odabere predsjednik, a korisniku se prikazuju i u lokalnom vremenu. | Visok | Odobreni zadatak | Testni scenarij s rokom u drugoj vremenskoj zoni. |
| NF-04 | Sustav podržava istodobni rad većeg broja korisnika, osobito pred istek roka za predaju. | Srednji | Odobreni zadatak; broj odluka tima | Test opterećenja (50 istodobnih korisnika uz odziv do 2s). |
| NF-05 | Sustav ne dopušta da netko recenzira vlastiti rad. | Visok | Odobreni zadatak | Testni scenariji osoba ima ulogu autor i recenzenta je li moguće vlastito recenziranje. |
| NF-06 | Isti korisnički račun može istodobno sudjelovati na više konferencija s različitom ulogom na svakoj. | Visok | Odobreni zadatak | Testni scenarij: korisnik je autor na jednoj, a recenzent na drugoj konferenciji i na svakoj vidi samo ono što ta uloga dopušta. |
| NF-07 | Autorizacija se provodi putem OAuth 2.0 tokena koji se ne prikazuju u sučelju. | Visok | Odobreni zadatak | Pregled sučelja i API odgovora; tokeni nisu vidljivi korisniku. |
| NF-08 | Povjerljivi komentar recenzenta vidljiv je samo programskom odboru, a nikad autorima ni drugim recenzentima. | Visok | Odobreni zadatak | Testni scenarij: povjerljivi komentar se ne pojavljuje u sučelju, e-pošti ni API odgovorima autora i recenzenata. |
| NF-09 | Sustav se integrira s vanjskim servisima ORCID (prijava i podaci o ustanovi i koautorstvu), Crossref (provjera DOI-ja), Google Calendar (izvoz rasporeda). | Visok | Odobreni zadatak | Testni scenariji s ispravnim odgovorom svakog servisa. |
| NF-10 | Zbornik sažetaka generira se u PDF formatu, a izvoz statistike u CSV formatu. | Srednji | Odobreni zadatak | Datoteke se otvaraju u standardnim čitačima (PDF, CSV). |

</details>

## 2.3 Dionici i akteri

<details>
<summary><strong>Akteri i povezani zahtjevi</strong></summary>

| ID uloge ili aktera | Odnos prema sustavu | Relevantni zahtjevi |
|---|---|---|
| A-01 | Javni posjetitelj: pregledava javnu stranicu i objavljeni program | F-003 |
| A-02 | Autor: registrira se, predaje i prati radove, predaje reviziju i konačnu verziju | F-001, F-002, F-008 do F-012, F-022, F-023, F-024 |
| A-03 | Recenzent: prihvaća pozive, iskazuje interes i sukobe interesa, recenzira, raspravlja, prima podsjetnike | F-001, F-002, F-013, F-014, F-018 do F-020 |
| A-04 | Predsjednik programskog odbora: postavlja konferenciju i rokove, poziva recenzente, raspodjeljuje radove, odlučuje, slaže program, pregledava statistiku | F-004, F-006, F-013, F-017, F-020 do F-022, F-025, F-029 |
| A-05 | Administrator: odobrava konferencije, upravlja korisnicima, deaktivira račune, uređuje predloške e-pošte, pregledava statistiku korištenja | F-005, F-007, F-015, F-028 |
| A-06 | Vanjski sustavi: ORCID, Crossref, Google Calendar, servis za e-poštu | F-001, F-010, F-013, F-016, F-022, F-026 |

</details>

---

## 2.4 Ograničenja i pretpostavke

<details>
<summary><strong>Ograničenja nasuprot pretpostavkama</strong></summary>

| ID | Tip | Opis ograničenja ili pretpostavke | Izvor | Inženjerska posljedica / Provjera |
|---|---|---|---|---|
| C-01 | Ograničenje | Registracija i prijava su e-poštom ili ORCID-om, a autorizacija unutar aplikacije provodi se OAuth 2.0 protokolom s tokenima. | Odobreni zadatak | Autorizaciju projektirati na tokenima; ORCID prijavu povezati s istim korisničkim računom (issue #8, #9). |
| C-02 | Ograničenje | Rješenje je responzivna web aplikacija. | Odobreni zadatak | Bez nativne mobilne aplikacije. |
| C-03 | Ograničenje | Sustav ovisi o vanjskim servisima ORCID, Crossref, Google Calendar i e-poštu potrebni su vanjski servisi. | Odobreni zadatak | Integracije izolirati u zasebne module radi lakšeg testiranja. |
| C-04 | Ograničenje | Backend je Express aplikacija, a baza PostgreSQL. | Odluka tima (issue #6, #7) | Arhitekturu i model podataka graditi na tome. |
| C-05 | Ograničenje | Baza PostgreSQL hostana je na servisu Neon. | Odluka tima | Veza na bazu ovisi o dostupnosti Neona; pristupne podatke čuvati izvan repozitorija. |
| AS-01 | Pretpostavka | Zadatak na dva mjesta različito određuje povlačenje (do isteka roka, odnosno do prihvaćanja); pretpostavljamo da se izmjena dopušta do roka predaje, a povlačenje do prihvaćanja. | Procjena tima | Potvrditi s asistentom. |
| AS-02 | Pretpostavka | ORCID daje dovoljno podataka o ustanovi i koautorstvu za provjeru sukoba interesa. | Procjena tima | Provjeriti u istraživanju ORCID API-ja i nadomjestiti ručnim unosom ako ne. |
| AS-03 | Pretpostavka | Zadatak ne navodi broj istodobnih korisnika; tim je za test odabrao 50 istodobnih korisnika uz odziv do 2 s. | Procjena tima | Zapisano u NF-04. |
| AS-04 | Pretpostavka | Format PDF-a i najveći broj stranica zadaje predsjednik konferencije. | Procjena tima | Prikazati ih jasno pri predaji. |

Ograničenje je uvjet koji tim mora poštovati; pretpostavka je uvjet na koji se tim oslanja i koji treba ponovno provjeravati.

</details>

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
| F-001 | [UC-001] | [Komponenta, modul ili drugo mjesto realizacije] | [ST-01, CT-01 ili druga provjera] |
|  |  |  |  |

<details>
<summary><strong>Sljedivost zahtjeva do obrazaca uporabe i ispitivanja</strong></summary>

**Primjer — poveznice zahtjeva CrisisMapa:**

| ID zahtjeva | Obrazac uporabe / ponašanje | Arhitekturna realizacija | Ispitivanje / provjera |
| --- | --- | --- | --- |
| F-004 | UC-002 Podnošenje prijave kriznog događaja | Web-klijent; API za prijave; usluga za prijave | ST-01 Valjano podnošenje prijave; ST-02 Nedostaje obavezna lokacija; ST-03 Dopuštenje geolokacije odbijeno |
| F-005 | Odabir primatelja obavijesti | Proces za obavijesti | CT-06 Primatelji obavijesti; potpuna dostava obavijesti nije pokrivena ovom provjerom |

**Pokrivenost i dokazi:** CT-06 provjerava odabir primatelja za F-005, ali sam po sebi ne dokazuje da je obavijest stvarno dostavljena; ako projekt zahtijeva potpunu dostavu od početka do kraja, za taj dio treba postojati zasebna provjera. Svaki redak pokazuje gdje je zahtjev opisan kao ponašanje, gdje je ostvaren u sustavu i gdje se nalazi dokaz njegove provjere. Zahtjev ne mora imati zaseban obrazac uporabe ako ne opisuje korisničku interakciju; tada navedite relevantno ponašanje, arhitekturni element ili drugi prikladan način realizacije. U svojem projektu koristite stvarne nazive komponenata, modula i provjera iz dokumentacije i implementacije. Nedostajuću poveznicu ostavite praznom ili označite kao *na čekanju* uz kratak razlog. Stvarni rezultati ispitivanja bilježe se uz ispitne slučajeve; ova tablica pokazuje gdje ih pronaći.

</details>

---

## 2.7 Pregled zahtjeva

**Cilj:** Zabilježiti važne povratne informacije o zahtjevima i odluke koje iz njih proizlaze na dvije formalne kontrolne točke projekta, u 7. i 14. tjednu.

| Kontrolna točka | Povratna informacija ili nalaz | Odluka o zahtjevu ili opsegu |
| --- | --- | --- |
| Iteracija 1 | [Povratna informacija] | [Odluka; vidi odjeljak 2.5] |
| Demo 2  | [Povratna informacija] | [Odluka; vidi odjeljak 2.5] |
| Završni pregled | [Povratna informacija] | [Odluka; vidi odjeljak 2.5] |

<details>
<summary><strong>Odluke o zahtjevima nakon pregleda</strong></summary>

**Primjer scenarija — pregled zahtjeva CrisisMapa:**

| Kontrolna točka | Povratna informacija ili nalaz | Odluka o zahtjevu ili opsegu |
| --- | --- | --- |
| Iteracija 1 | Demonstracija pokazuje da odbijanje pristupa lokaciji preglednika onemogućuje podnošenje prijave. | Dogovoriti ručni odabir lokacije; ažurirati F-004 i primjer NF-01 te razlog zabilježiti u odjeljku 2.5. |

**Odluka povezana s povratnom informacijom:** Zapis povezuje opaženo ponašanje s konkretnom promjenom zahtjeva i izbjegava zapisnik cijelog sastanka. Zapišite samo stvarne povratne informacije i odluke za kontrolne točke. Konzultacije u nekom drugom tjednu ne stvaraju dodatnu obaveznu predaju.

</details>

