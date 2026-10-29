# 3. Obrasci uporabe

**Cilj:** Prikazati glavne interakcije između aktera aplikacije i sustava. Opišite kako akter ostvaruje cilj i što se događa kada važan korak ne uspije. Interakcije temeljite na odobrenim zahtjevima i ažurirajte ih kako se aplikacija razvija.

## 3.1 Dijagram obrazaca uporabe

**Cilj:** Prikazati granicu sustava, relevantne aktere i njihove glavne ciljeve u **preglednom UML dijagramu obrazaca uporabe**. Ako je za razumijevanje pojedinog dijela sustava potrebno prikazati više detalja, taj dio izdvojite u dodatni usmjereni dijagram. Dodatni dijagrami trebaju produbiti dio preglednog modela, a ne stvarati nepovezane ili duplicirane prikaze istog sustava.

![Dijagram obrazaca uporabe sustava CrisisMap](./assets/diagrams/3-1-crisismap-system-UC.svg)

**Slika 3.1. Dijagram obrazaca uporabe sustava CrisisMap**

**PlantUML izvor:** [izvor](./puml/3-1-crisismap-system-UC.puml)

**Provjera dijagrama:** Prikažite prepoznate uloge koje **komuniciraju s aplikacijom**, a ne dionike koji s njom nemaju interakciju. Svaki glavni korisnički cilj mora imati pridruženog aktera; uključeni obrazac uporabe može se dosegnuti preko drugog obrasca uporabe bez vlastite izravne veze s akterom. `<<include>>` i `<<extend>>` koristite samo kada odnos odgovara stvarnom ponašanju.

<details>
<summary><strong>Primjer aktera i granica sustava</strong></summary>

**Opis primjera — CrisisMap:**

Dijagram prikazuje **ogledni scenarij** s građaninom, posjetiteljem i koordinatorom pomoći te vanjskim pružateljem identiteta. Pružatelj identiteta sudjeluje u obrascu uporabe „Prijava u sustav” kao sekundarni akter: korisnik pokreće prijavu u aplikaciji, a vanjski sustav provodi autentikaciju. Budući da projekt koristi vanjskog pružatelja identiteta, ta se ovisnost prikazuje i u dijagramu obrazaca uporabe; tehnički detalji integracije pripadaju arhitekturnoj dokumentaciji.

**Odabir aktera i ciljeva:** Granica pokazuje što aplikacija nudi, akteri imaju različite ciljeve, a nijedan akter ni obrazac uporabe ne tvrdi da ova studentska aplikacija angažira hitne službe. Dijagram usporedite s odobrenim funkcijskim zahtjevima i akterima.


**Pet pitanja za odabir sadržaja dijagrama** (ne pet dijagrama za predaju):

| Fokus | Pitanje |
| --- | --- |
| Cijeli sustav | Koji korisnički ciljevi najbolje objašnjavaju čemu ova aplikacija služi? |
| Ključne funkcionalnosti | Koje ciljeve treba detaljnije opisati ili, ako je potrebno, prikazati zasebnim usmjerenim dijagramom? |
| Korisničke uloge | Koji akteri mogu sudjelovati u pojedinom cilju i kako se njihove ovlasti razlikuju? |
| Ključni procesi | Koji cilj ima važne alternative koje treba opisati u obrascu uporabe? |
| Vanjske integracije | Sudjeluje li drugi sustav u obrascu uporabe kao **sekundarni akter**, primjerice odobreni pružatelj identiteta pri prijavi? |

Vanjski sustav može biti sekundarni akter obrasca uporabe kada sudjeluje u ostvarenju korisničkog cilja; tehničke veze opisuju se u arhitekturi. Nemojte stvarati dodatni obavezni dijagram obrazaca uporabe samo radi popisa integracija. Prenatrpan dijagram podijelite prema povezanim akterima ili ciljevima samo kada time postaje čitljiviji.

</details>

## 3.2 Specifikacije obrazaca uporabe

**Cilj:** Za svaki obrazac uporabe iz dijagrama objasniti cilj aktera, uobičajenu interakciju s aplikacijom i važne alternative. Jednostavne obrasce uporabe opišite kratko; proširite one kod kojih alternative, vanjske ovisnosti ili posljedice zahtijevaju dodatno objašnjenje.

**Za svaki obrazac uporabe koristite jednu okomitu tablicu.** Navedite samo onoliko pojedinosti koliko interakcija zahtijeva; neprimjenjivu alternativu izostavite umjesto da je popunjavate samo radi forme.

### UC-01: Registracija i prijava

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Javni posjetitelj (A-01); sekundarni akter: ORCID (A-06) |
| **Povezani zahtjevi** | F-001 |
| **Preduvjeti** | Korisnik nije prijavljen. |
| **Glavni uspješni tok** | 1. Korisnik odabire registraciju ili prijavu e-poštom ili ORCID-om.<br>2. Pri odabiru ORCID-a prijava se provodi preko ORCID-a.<br>3. Sustav registrira korisnika (pri prvoj prijavi) i prijavljuje ga. |
| **Alternativni tokovi / Iznimke** | **3a — Prijava nije uspjela:** korisnik ostaje neprijavljen i ne može izvršiti radnje za prijavljene. |
| **Posljedice (ishod)** | Korisnik dobiva pristup radnjama za prijavljene. |

### UC-02: Pregled javne stranice konferencije

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Javni posjetitelj (A-01) |
| **Povezani zahtjevi** | F-003 |
| **Preduvjeti** | Nema; prijava nije potrebna. |
| **Glavni uspješni tok** | 1. Posjetitelj otvara javnu stranicu konferencije.<br>2. Sustav prikazuje poziv, teme i datume.<br>3. Ako je program objavljen, sustav ga prikazuje. |
| **Alternativni tokovi / Iznimke** | **3a — Program nije objavljen:** sustav ga ne prikazuje. |
| **Posljedice (ishod)** | Neprijavljeni korisnik vidi stranicu; objavljeni program vidljiv je, neobjavljeni nije. |

### UC-03: Uređivanje profila

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Prijavljeni korisnik u ulozi A-02 do A-05 |
| **Povezani zahtjevi** | F-002 |
| **Preduvjeti** | Korisnik je prijavljen. |
| **Glavni uspješni tok** | 1. Korisnik otvara profil.<br>2. Mijenja ime, ustanovu, ORCID i ključne riječi ekspertize.<br>3. Sustav sprema promjene. |
| **Posljedice (ishod)** | Spremljeni podaci vide se pri ponovnom otvaranju profila. |

### UC-04: Odobravanje konferencije i imenovanje predsjednika

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Administrator (A-05) |
| **Povezani zahtjevi** | F-004, F-005 |
| **Preduvjeti** | Administrator je prijavljen; postoji nova konferencija. |
| **Glavni uspješni tok** | 1. Administrator odobrava novu konferenciju.<br>2. Imenuje korisnika predsjednikom programskog odbora.<br>3. Sustav aktivira konferenciju i imenovanom korisniku dodjeljuje ovlasti predsjednika. |
| **Posljedice (ishod)** | Konferencija postaje aktivna tek nakon odobrenja; imenovani korisnik ima ovlasti predsjednika na toj konferenciji. |### UC-02: Pregled javne stranice konferencije

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Javni posjetitelj (A-01) |
| **Povezani zahtjevi** | F-003 |
| **Preduvjeti** | Nema; prijava nije potrebna. |
| **Glavni uspješni tok** | 1. Posjetitelj otvara javnu stranicu konferencije.<br>2. Sustav prikazuje poziv, teme i datume.<br>3. Ako je program objavljen, sustav ga prikazuje. |
| **Alternativni tokovi / Iznimke** | **3a — Program nije objavljen:** sustav ga ne prikazuje. |
| **Posljedice (ishod)** | Neprijavljeni korisnik vidi stranicu; objavljeni program vidljiv je, neobjavljeni nije. |

### UC-03: Uređivanje profila

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Prijavljeni korisnik u ulozi A-02 do A-05 |
| **Povezani zahtjevi** | F-002 |
| **Preduvjeti** | Korisnik je prijavljen. |
| **Glavni uspješni tok** | 1. Korisnik otvara profil.<br>2. Mijenja ime, ustanovu, ORCID i ključne riječi ekspertize.<br>3. Sustav sprema promjene. |
| **Posljedice (ishod)** | Spremljeni podaci vide se pri ponovnom otvaranju profila. |

### UC-04: Odobravanje konferencije i imenovanje predsjednika

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Administrator (A-05) |
| **Povezani zahtjevi** | F-004, F-005 |
| **Preduvjeti** | Administrator je prijavljen; postoji nova konferencija. |
| **Glavni uspješni tok** | 1. Administrator odobrava novu konferenciju.<br>2. Imenuje korisnika predsjednikom programskog odbora.<br>3. Sustav aktivira konferenciju i imenovanom korisniku dodjeljuje ovlasti predsjednika. |
| **Posljedice (ishod)** | Konferencija postaje aktivna tek nakon odobrenja; imenovani korisnik ima ovlasti predsjednika na toj konferenciji. |

### UC-05: Postavljanje konferencije i rokova

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Predsjednik programskog odbora (A-04) |
| **Povezani zahtjevi** | F-006, F-007 |
| **Preduvjeti** | Predsjednik je prijavljen i imenovan za konferenciju. |
| **Glavni uspješni tok** | 1. Predsjednik unosi naziv, mjesto, datume i teme konferencije.<br>2. Unosi rokove: predaja, recenzije, obavijesti i konačne verzije.<br>3. Sustav sprema podatke i prikazuje ih na javnoj stranici. |
| **Posljedice (ishod)** | Uneseni podaci prikazuju se na javnoj stranici. Nakon isteka roka sustav onemogućuje odgovarajuće radnje (F-007). |

### UC-06: Predaja rada

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Autor / koautor (A-02) |
| **Povezani zahtjevi** | F-007, F-008, F-009 (UC-07), F-010 (UC-08) |
| **Preduvjeti** | Autor je prijavljen; rok predaje nije istekao. |
| **Glavni uspješni tok** | 1. Autor unosi naslov, sažetak, ključne riječi, temu, koautore i autora za kontakt.<br>2. Prilaže anonimizirani PDF.<br>3. Sustav provjerava PDF (UC-07), a za reference s DOI-jem i metapodatke (UC-08).<br>4. Sustav pohranjuje rad. |
| **Alternativni tokovi / Iznimke** | **3a — Nedostaje obavezno polje ili PDF:** rad ne dobiva status Predan.<br>**3b — PDF je neispravan (UC-07):** sustav ga odbija uz poruku.<br>**3c — Metapodaci PDF-a sadrže imena autora (UC-07):** sustav upozorava prije predaje.<br>**1a — Rok predaje je istekao:** sustav blokira predaju (F-007). |
| **Posljedice (ishod)** | Rad s popunjenim obaveznim poljima i PDF-om dobiva status Predan. |



<details>
<summary><strong>Primjeri specifikacija: Registracija i prijava kriznog događaja</strong></summary>

**Primjer — CrisisMap:**

**UC-001: Registracija računa.** Ovaj kratki primjer odnosi se na projekt čiji odobreni zadatak uključuje račune s adresom e-pošte i lozinkom.

| Polje | Opis |
| --- | --- |
| Primarni akter | Građanin (A-02 u primjeru) |
| ID zahtjeva | F-001 |
| Preduvjeti, ako postoje | Nema. |
| Glavni tijek | Građanin unosi adresu e-pošte; aplikacija šalje poveznicu za potvrdu; građanin potvrđuje račun. |
| Alternativni ili neuspješni tijekovi, ako postoje | Adresa e-pošte već postoji → aplikacija objašnjava zašto se registracija ne može nastaviti. |
| Rezultat | Račun je aktivan nakon potvrde. |

Ako odobreni zadatak umjesto toga koristi isključivo OAuth prijavu, zamijenite ovaj primjer odgovarajućim ponašanjem prijave; nemojte dodavati registraciju lokalnom lozinkom samo radi podudaranja s primjerom.

**UC-002: Podnošenje prijave kriznog događaja.** Ista polja mogu opisati dulji tijek u kojem odabir lokacije, provjera valjanosti i pohrana mogu ne uspjeti.

| Polje | Opis |
| --- | --- |
| Primarni akter | Građanin |
| ID zahtjeva | F-004 |
| Preduvjeti, ako postoje | Obrazac za prijavu dostupan je. Ako odobreni zadatak zahtijeva prijavu u sustav, građanin je prijavljen. |
| Glavni tijek | 1. Građanin otvara obrazac za prijavu; aplikacija prikazuje polja za vrstu kriznog događaja, razinu ozbiljnosti, opis i lokaciju.<br>2. Građanin unosi podatke i odabire lokaciju na karti ili drugim podržanim načinom.<br>3. Građanin podnosi obrazac; aplikacija provjerava obavezna polja i lokaciju.<br>4. Aplikacija pohranjuje prijavu i prikazuje potvrdu s referencom na nju. |
| Alternativni ili neuspješni tijekovi, ako postoje | **1a — Prijava u sustav nije uspjela:** Ako je prijava obavezna, a pružatelj identiteta je ne dovrši, prijava kriznog događaja ostaje nepodnesena i aplikacija objašnjava kako pokušati ponovno.<br>**2a — Odbijen pristup lokaciji:** Ako aplikacija nudi geolokaciju, ali je korisnik odbije, građanin ručno odabire lokaciju ako ta mogućnost postoji; tijek se nastavlja u koraku 3.<br>**3a — Nevaljana ili nedostajuća lokacija:** Aplikacija objašnjava problem, po mogućnosti zadržava unesene podatke i ne pohranjuje prijavu; građanin ispravlja lokaciju i ponavlja korak 3.<br>**3b — Pohrana nije uspjela:** Aplikacija prijavljuje neuspjeh i ne prikazuje lažnu potvrdu o podnošenju. |
| Rezultat | Aplikacija pohranjuje prijavu kriznog događaja i potvrđuje njezino podnošenje. |

**Odabir razine detalja:** Oba primjera koriste ista polja. UC-001 je kratak jer je glavna iznimka jasna; UC-002 zahtijeva numerirane korake i alternative jer oni mijenjaju ishod i mogu usmjeravati ispitivanje.Pri prilagodbi primjera koristite ID-ove zahtjeva i ponašanje vlastite aplikacije.

**UC-005: Moderiranje prijave kriznog događaja.** Ovaj primjer vrijedi samo za projekt u kojem odobreni opseg uključuje moderatorski pregled prijava.

| Polje | Opis |
| --- | --- |
| Primarni akter | Moderator (A-05 u primjeru) |
| ID zahtjeva | F-008 |
| Preduvjeti, ako postoje | Moderator je prijavljen i ima moderatorske ovlasti; postoji prijava koja čeka pregled. |
| Glavni tijek | 1. Moderator otvara prijavu koja čeka pregled.<br>2. Aplikacija prikazuje podatke prijave i dostupne moderatorske radnje.<br>3. Moderator odabire odobravanje ili odbijanje.<br>4. Aplikacija provjerava ovlasti, mijenja status prijave i prikazuje novi status. |
| Alternativni ili neuspješni tijekovi, ako postoje | **3a — Radnja nije potvrđena:** Moderator odustaje od promjene i prijava ostaje nepromijenjena.<br>**4a — Ovlasti nisu valjane:** Aplikacija odbija promjenu i status prijave ostaje nepromijenjen. |
| Rezultat | Prijava ima novi status ako je moderatorska radnja uspješno provedena; inače ostaje nepromijenjena. |
</details>

---

## 3.3 Provjera dosljednosti obrazaca uporabe

**Cilj:** Provjeriti međusobnu usklađenost obrazaca uporabe, aktera, zahtjeva i ispitnih slučajeva. Cjelovito mapiranje održava se isključivo u **[matrici sljedivosti zahtjeva](2-Analiza-zahtjeva.md#26-sljedivost-zahtjeva)**.

| Provjera | Pitanje za tim |
| --- | --- |
| Zahtjev | Je li svaki važan obrazac uporabe povezan s postojećim zahtjevom? |
| Akter | Odgovara li akter naveden ovdje prethodno utvrđenoj ulozi i dopuštenoj interakciji? |
| Aplikacija | Može li tim demonstrirati opisani glavni rezultat i važnu alternativu ili je opis jasno označen kao trenutačno oblikovanje? |

---

Povezivanje zahtjev → obrazac uporabe → ispitivanje održavajte **samo jednom, u [tablici sljedivosti zahtjeva](./2-Analiza-zahtjeva.md)**. Ovdje nemojte održavati drugu projektnu tablicu mapiranja ni stupac sa statusom implementacije. Ako važan zahtjev nema interakciju s ljudskim akterom, objasnite gdje se obrađuje umjesto izmišljanja aktera.

<details>
<summary><strong>Provjera pokrivenosti zahtjeva</strong></summary>

**Primjer — CrisisMap:** Tablica pokrivenosti obrazaca uporabe koju treba analizirati:

| Broj obrasca uporabe | Naziv obrasca uporabe | Obuhvaćeni funkcijski zahtjevi |
| --- | --- | --- |
| UC-001 | Registracija računa | F-001: Registracija računa putem e-pošte |
| UC-002 | Prijava kriznog događaja | F-022: Prijava i provjera kriznog događaja |
| UC-003 | Sustav upozorenja | F-045: Slanje upozorenja korisnicima i timovima |
| UC-004 | Koordinacija spašavanja | F-067: Koordinacija s hitnim službama |

---

**Problemi pokrivenosti koje treba riješiti:**

- **Pogrešan ID zahtjeva:** ova tablica povezuje UC-002 s F-022, dok se opis UC-002 u odjeljku 3.2 poziva na F-004, zahtjev za podnošenje prijave iz odjeljka 2.1.
- **Zahtjevi koji ne postoje:** F-022, F-045 i F-067 nisu definirani u oglednim zahtjevima u 2.1.
- **Obrasci uporabe bez opisa:** UC-003 i UC-004 nemaju opis u 3.2. UC-004 (koordinacija s hitnim službama) ujedno je mogućnost s vanjskim posljedicama koju opseg dopušta samo ako je uključena u odobreni zadatak.
- **Nesklad aktera:** primjer aktera u odjeljku 2.3 navodi da koordinator pomoći podnosi prijave (F-004), dok UC-002 kao primarnog aktera navodi građanina.

</details>

**Završna provjera:** Dijagram, specifikacije obrazaca uporabe i matrica sljedivosti međusobno su usklađeni. Svaki važan obrazac uporabe povezan je s postojećim zahtjevom, akteri odgovaraju stvarnim ulogama u aplikaciji, a opisani glavni i alternativni tijekovi odgovaraju ponašanju koje sustav stvarno podržava.