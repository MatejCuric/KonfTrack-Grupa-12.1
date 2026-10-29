# 2. Analiza zahtjeva

**Cilj:** Iz odobrenog opsega projekta izvesti prepoznatljive, prioritetizirane i provjerljive zahtjeve. Zahtjevi se mogu mijenjati; pri završnoj predaji moraju odražavati dogovorenu aplikaciju. Izvori, odluke i poveznice u primjerima kolegija nastavni su scenariji, a ne projektni zapisi.

<details>
<summary><strong>Održavanje zahtjeva ažurnima</strong></summary>

Primjeri koriste temu projekta CrisisMap. Neki namjerno sadrže korisne nedostatke za raspravu. Izvori, odluke i poveznice na provjere u tim primjerima **nastavni su scenariji**, a ne zapisi rada stvarnog studentskog tima. Zamijenite ih zahtjevima i dokazima svojeg odobrenog projekta. Značajne promjene zabilježite u odjeljku 2.5.

</details>

## 2.1 Funkcijski zahtjevi

**Cilj:** Navesti što aplikacija mora omogućiti korisnicima, odakle pojedina mogućnost proizlazi i koji se opažljivi rezultat smatra prihvaćanjem.

| ID | Opis | Prioritet | Izvor | Kriteriji prihvaćanja |
| --- | --- | --- | --- | --- |
| F-001 | Korisnik se registrira i prijavljuje e-poštom ili ORCID-om; | Visok | Odobreni zadatak | Nakon uspješne prijave korisnik dobiva pristup radnjama za prijavljene; neprijavljeni ih ne može izvršiti. |
| F-002 | Korisnik uređuje profil (ime, ustanova, ORCID, ključne riječi ekspertize). | Srednji | Odobreni zadatak | Spremljeni podaci vide se pri ponovnom otvaranju profila. |
| F-003 | Javna stranica konferencije (poziv, teme, datumi, program nakon objave) dostupna je bez prijave. | Visok | Odobreni zadatak | Neprijavljeni korisnik vidi stranicu; objavljeni program vidljiv je, neobjavljeni nije. |
| F-004 | Isti korisnik može imati različite uloge na različitim konferencijama. | Visok | Odobreni zadatak | Korisnik je autor na konferenciji A, a recenzent na B, i vidi samo ovlasti pripadajuće svakoj. |
| F-005 | Administrator odobrava novu konferenciju i imenuje predsjednika programskog odbora. | Visok | Odobreni zadatak | Konferencija postaje aktivna tek nakon odobrenja; imenovani korisnik dobiva ovlasti predsjednika. |
| F-006 | Predsjednik unosi naziv, mjesto, datume, teme i rokove (predaja, recenzije, obavijesti, konačne verzije). | Visok | Odobreni zadatak | Uneseni podaci prikazuju se na javnoj stranici. |
| F-007 | Nakon isteka roka sustav onemogućuje odgovarajuće radnje;  | Visok | Odobreni zadatak | Radnja nakon roka je blokirana; |
| F-008 | Autor predaje rad: naslov, sažetak, ključne riječi, tema, koautori, autor za kontakt i anonimizirani PDF. | Visok | Odobreni zadatak | Rad s popunjenim obaveznim poljima i PDF-om dobiva status Predan. |
| F-009 | Sustav provjerava format i najveći broj stranica PDF-a te upozorava ako metapodaci sadrže imena autora. | Visok | Odobreni zadatak | Neispravan PDF je odbijen uz poruku; PDF s imenom u metapodacima daje upozorenje prije predaje. |
| F-010 | Za reference s DOI-jem sustav dohvaća metapodatke preko Crossrefa i upozorava na DOI koji nije pronađen. | Srednji | Odobreni zadatak | Postojeći DOI prikaže metapodatke; nepostojeći prikaže upozorenje i autor može ispraviti. |
| F-011 | Autor mijenja rad do roka predaje i može ga povući prije prihvaćanja. | Srednji | Odobreni zadatak | Izmjena i povlačenje rade u dopuštenom razdoblju, a izvan njega su onemogućeni. |
| F-012 | Autor na pregledu „Moji radovi“ vidi radove i njihova stanja (nacrt, predan, u recenziji, potrebna revizija, prihvaćen, odbijen, konačna verzija predana, uvršten u program). | Visok | Odobreni zadatak | Popis prikazuje trenutni status svakog rada, a status nije označen samo bojom. |
| F-013 | Predsjednik poziva recenzente e-poštom; pozvani korisnik prihvaća ili odbija poziv. | Visok | Odobreni zadatak | Prihvaćanjem korisnik postaje recenzent te konferencije; pozivnica ne sadrži podatke o autorima. |
| F-014 | Nakon roka predaje recenzent za naslov i sažetak bira: želim, ne želim recenzirati ili sukob interesa. | Visok | Odobreni zadatak | Odabir se sprema i koristi pri prijedlogu raspodjele. |
| F-015 | Sustav predlaže raspodjelu: najmanje tri recenzenta po radu, ravnomjerno opterećenje. | Visok | Odobreni zadatak | Svaki rad u prijedlogu ima ≥ 3 recenzenta, a opterećenja se međusobno ne razlikuju više od dogovorene granice. |
| F-016 | Sustav prepoznaje sukobe interesa: prijavljeni, ista ustanova, koautorstvo u zadnje tri godine. | Visok | Odobreni zadatak | Recenzent u sukobu nikad nije u prijedlogu raspodjele. |
| F-017 | Predsjednik ručno mijenja raspodjelu; nitko ne može recenzirati vlastiti rad. | Visok | Odobreni zadatak | Pokušaj dodjele vlastitog rada je blokiran uz poruku. |
| F-018 | Recenzent na „Moje recenzije“ vidi dodijeljene radove i rokove te predaje ocjenu (−3 do +3), stručnost (1 do 5), komentar autorima i povjerljivi komentar. | Visok | Odobreni zadatak | Recenzija se sprema; recenzent ne vidi identitet autora. |
| F-019 | Nakon predaje svih recenzija za rad, recenzenti vide međusobne recenzije i raspravljaju anonimno kao „Recenzent 1“, „Recenzent 2“... | Srednji | Odobreni zadatak | Rasprava se ne otvara prije predaje svih recenzija; imena se nigdje ne prikazuju. |
| F-020 | Sustav šalje podsjetnike 7 i 2 dana prije roka recenzije, označava kasne recenzije, a predsjednik može dodijeliti zamjenskog recenzenta. | Srednji | Odobreni zadatak | Podsjetnici stižu u zadano vrijeme; kasna recenzija je vidljivo označena. |
| F-021 | Predsjednik na pregledu „Odluke“ vidi prosječnu ocjenu, broj recenzija i oznaku znatnog neslaganja te bira Prihvaćen, Potrebna revizija ili Odbijen. | Visok | Odobreni zadatak | Tablica prikazuje sve navedene podatke; odabrana odluka mijenja status rada. |
| F-022 | Obavijesti o odlukama šalju se skupno prema predlošku, s odlukom i recenzijama, ali bez povjerljivih komentara. | Visok | Odobreni zadatak | Poslana poruka ne sadrži povjerljive komentare ni identitete recenzenata. |
| F-023 | Autor za rad s odlukom „potrebna revizija“ predaje novu verziju i dokument s odgovorima, a rad se vraća istim recenzentima. | Srednji | Odobreni zadatak | Nakon predaje rad je u recenziji kod istih recenzenata. |
| F-024 | Nakon prihvaćanja autor predaje neanonimiziranu konačnu verziju, potpisanu izjavu o autorskim pravima i ime izlagača. | Srednji | Odobreni zadatak | Rad prelazi u stanje Konačna verzija predana. |
| F-025 | Predsjednik slaže program (sekcije s temom, dvoranom, terminom i predsjedavajućim); sustav predlaže grupiranje i provjerava preklapanja izlagača te da predsjedavajući nije autor u svojoj sekciji. | Srednji | Odobreni zadatak | Sustav ne dopušta spremanje programa s preklapanjem ili sukobom predsjedavajućeg. |
| F-026 | Prijavljeni korisnik dodaje izlaganja u osobni raspored i izvozi ih u Google Calendar. | Nizak | Odobreni zadatak | Izvezeni događaji pojavljuju se u kalendaru s ispravnim vremenom. |
| F-027 | Sustav generira PDF zbornika sažetaka (sadržaj po sekcijama, kazalo autora); javan je kad ga organizator objavi. | Nizak | Odobreni zadatak | Generirani PDF sadrži sažetke prihvaćenih radova, sadržaj i kazalo. |
| F-028 | Administrator upravlja korisnicima i konferencijama, uređuje predloške e-pošte, vidi statistiku korištenja i deaktivira račune. | Srednji | Odobreni zadatak | Svaka navedena radnja dostupna je samo administratoru; deaktivirani korisnik se ne može prijaviti. |

<details>
<summary><strong>Izvori zahtjeva i kriteriji prihvaćanja</strong></summary>

Svaki zahtjev treba imati stabilan ID. **Izvor označava odakle zahtjev potječe**, primjerice iz odobrenog projektnog zadatka, zahtjeva dionika ili povratne informacije koja je promijenila zahtjev. Opišite opažljivo ponašanje umjesto naziva zaslona ili programskog okvira. U cijeloj dokumentaciji koristite istu ljestvicu prioriteta. Složenu korisničku interakciju objasnite u odgovarajućem obrascu uporabe umjesto kopiranja cijelog tijeka u ovu tablicu.

</details>


## 2.2 Nefunkcijski zahtjevi

**Cilj:** Odrediti važna svojstva kvalitete i uvjete rada odobrene aplikacije na način koji tim može razumno provjeriti.

| ID | Opis | Prioritet | Izvor | Način provjere |
| --- | --- | --- | --- | --- |
| NF-01 | [Konkretan zahtjev (npr. odziv, sigurnost, pristupačnost)] | Visok / Srednji / Nizak | [Sigurnost / Uputa / SLA] | [Mjerenje / Testni scenarij / Pregled] |
| NF-01 | Anonimnost dvostruko slijepe recenzije jamči se u UI-ju, nazivima preuzetih datoteka, e-pošti i API odgovorima. | Visok | Odobreni zadatak | Pregled API odgovora, naziva datoteka i poruka kao autor i kao recenzent; nigdje nema identiteta druge strane. |
| NF-02 | Aplikacija je web aplikacija prilagođena mobilnim uređajima. | Visok | Odobreni zadatak | Ručni pregled glavnih tokova na mobilnoj širini zaslona. |
| NF-03 | Rokovi se izražavaju u vremenskoj zoni koju odabere predsjednik, a korisniku se prikazuju i u lokalnom vremenu. | Visok | Odobreni zadatak | Testni scenarij s rokom u drugoj vremenskoj zoni. |
| NF-04 | Sustav podržava istodobni rad većeg broja korisnika, osobito pred istek roka za predaju. | Srednji | Odobreni zadatak | Test opterećenja prema broju koji tim dogovori. |
| NF-05 | Prava pristupa određuju se po konferenciji i ulozi; OAuth tokeni se ne prikazuju u UI-ju. | Visok | Odobreni zadatak | Testni scenariji pristupa s različitim ulogama; pregled UI-ja i odgovora. |
| NF-06 | Status rada i ostala stanja ne smiju biti označeni samo bojom. | Nizak | Projektni vodič (UI prototip) | Pregled sučelja. |


<details>
<summary><strong>Nefunkcijski zahtjevi za analizu</strong></summary>

Relevantna svojstva mogu se odnositi na uporabljivost, pristupačnost, sigurnost, performanse ili pouzdanost. Odaberite svojstva specifična za projekt i opišite kako ih je moguće provjeriti. Zahtjev navodi što se očekuje; stvarna opažanja i dokazi pripadaju rezultatima ispitivanja, a ne drugom stupcu s rezultatima u ovoj tablici.


</details>

## 2.3 Dionici i akteri

**Cilj:** Utvrditi uloge koje utječu na zahtjeve i razlikovati dionike od aktera koji komuniciraju s aplikacijom.

| ID uloge ili aktera | Odnos prema sustavu | Relevantni zahtjevi |
| A-01 | Javni posjetitelj: pregledava javnu stranicu i program | F-003 |
| A-02 | Autor / koautor: predaje i prati radove | F-008 do F-012, F-023, F-024 |
| A-03 | Recenzent: prihvaća pozive, iskazuje interes, recenzira, raspravlja | F-013, F-014, F-018, F-019 |
| A-04 | Predsjednik programskog odbora: postavlja konferenciju, raspodjeljuje, odlučuje, slaže program | F-006, F-007, F-015 do F-017, F-021, F-022, F-025 |
| A-05 | Administrator: odobrava konferencije, upravlja korisnicima i predlošcima | F-005, F-028 |
| A-06 | Vanjski sustavi: ORCID, Crossref, Google Calendar, servis za e-poštu | F-001, F-010, F-016, F-026 |

<details>
<summary><strong>Akteri i povezani zahtjevi</strong></summary>

</details>

---

## 2.4 Ograničenja i pretpostavke

**Cilj:** Zabilježiti projektno specifične granice i pretpostavke koje utječu na zahtjeve ili oblikovanje, zajedno s njihovim izvorom i praktičnom posljedicom. Ovo je njihovo mjerodavno mjesto u dokumentaciji.

| ID | Tip | Opis ograničenja ili pretpostavke | Izvor | Inženjerska posljedica / Provjera |
| C-01 | Ograničenje | Prijava je isključivo e-poštom ili ORCID-om uz OAuth 2.0 tokene. | Odobreni zadatak | Autorizaciju projektirati oko vanjskog pružatelja identiteta (issue #8, #9). |
| C-02 | Ograničenje | Rješenje je responzivna web aplikacija. | Odobreni zadatak | Bez nativne mobilne aplikacije. |
| C-03 | Ograničenje | Za ORCID, Crossref, Google Calendar i e-poštu potrebni su vanjski servisi. | Odobreni zadatak | Integraciju izolirati u zasebne module radi lakšeg testiranja. |
| C-04 | Ograničenje | Backend je Express aplikacija, a baza PostgreSQL. | Odluka tima (issue #6, #7) | Arhitekturu i model podataka graditi na tome. |
| AS-01 | Pretpostavka | Zadatak je nejasan oko povlačenja: uređivanje do roka predaje, povlačenje do prihvaćanja. | Procjena tima | Potvrditi s asistentom. |
| AS-02 | Pretpostavka | ORCID daje dovoljno podataka o ustanovi i koautorstvu za provjeru sukoba. | Procjena tima | Provjeriti u istraživanju (issue #8) i nadomjestiti ručnim unosom ako ne. |
| AS-03 | Pretpostavka | Zadatak ne navodi broj istodobnih korisnika; tim bira realnu brojku za test. | Procjena tima | Dogovoriti broj i zapisati ga u NF-04. |
| AS-04 | Pretpostavka | Format PDF-a i najveći broj stranica zadaje predsjednik konferencije. | Procjena tima | Prikazati ih jasno pri predaji. |

<details>
<summary><strong>Ograničenja nasuprot pretpostavkama</strong></summary>

Ograničenje je uvjet koji tim mora poštovati; pretpostavka je uvjet na koji se tim oslanja i koji treba ponovno provjeravati.

</details>

---

## 2.5 Značajne promjene zahtjeva

**Cilj:** Sačuvati razlog promjena koje mijenjaju dogovoreni opseg, prioritet ili kriterije prihvaćanja, uz istodobno održavanje prethodnih zahtjeva ažurnima.

| Datum | ID zahtjeva | Promjena i razlog | Dogovoreno s / dokaz |
| --- | --- | --- | --- |
|  |  |  |  |

<details>
<summary><strong>Primjer značajne promjene</strong></summary>

**Primjer scenarija — odluka tijekom pregleda CrisisMapa:**

| Datum | ID zahtjeva | Promjena i razlog | Dogovoreno s / dokaz |
| --- | --- | --- | --- |
| [Datum pregleda] | F-004, NF-01 | Dodati ručni odabir lokacije kada korisnik odbije geolokaciju preglednika; bez toga građanin ne može podnijeti prijavu kriznog događaja s lokacijom. | [Poveznica na stvarnu bilješku pregleda ili zadatak tima] |

**Razlog promjene:** Zapis navodi zahvaćene stavke i objašnjava razlog iz perspektive korisnika, a zatim upućuje na dokaz odluke.  Nakon stvarne odluke ažurirajte trenutačne zahtjeve; stilska izmjena teksta ne zahtijeva zapis u dnevniku promjena. Trenutačni red zadataka držite u alatu za praćenje zadataka.

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

---

>**Završna provjera:** Zahtjevi su aktualni, provjerljivi i povezani. Svaki važan zahtjev moguće je pratiti od njegova opisa i ponašanja preko mjesta realizacije u sustavu do odgovarajućeg ispitivanja ili druge provjere. Poveznice koriste stvarne identifikatore i nazive iz projektne dokumentacije.

