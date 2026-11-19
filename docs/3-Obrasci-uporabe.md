# 3. Obrasci uporabe

**Cilj:** Prikazati glavne interakcije između aktera aplikacije i sustava. Opišite kako akter ostvaruje cilj i što se događa kada važan korak ne uspije. Interakcije temeljite na odobrenim zahtjevima i ažurirajte ih kako se aplikacija razvija.

## 3.1 Dijagram obrazaca uporabe

**Cilj:** Prikazati granicu sustava, relevantne aktere i njihove glavne ciljeve u **preglednom UML dijagramu obrazaca uporabe**. Ako je za razumijevanje pojedinog dijela sustava potrebno prikazati više detalja, taj dio izdvojite u dodatni usmjereni dijagram. Dodatni dijagrami trebaju produbiti dio preglednog modela, a ne stvarati nepovezane ili duplicirane prikaze istog sustava.

![Dijagram obrazaca uporabe sustava KonfTrack](./assets/diagrams/3-1-KonfTrack.svg)

**Slika 3.1. Dijagram obrazaca uporabe sustava KonfTrack**

**PlantUML izvor:** [izvor](./puml/3-1-KonfTrack.puml)

**Provjera dijagrama:** Prikažite prepoznate uloge koje **komuniciraju s aplikacijom**, a ne dionike koji s njom nemaju interakciju. Svaki glavni korisnički cilj mora imati pridruženog aktera; uključeni obrazac uporabe može se dosegnuti preko drugog obrasca uporabe bez vlastite izravne veze s akterom. `<<include>>` i `<<extend>>` koristite samo kada odnos odgovara stvarnom ponašanju.

<details>
<summary><strong>Opis dijagrama</strong></summary>

**Opis — KonfTrack:**

Dijagram prikazuje cijeli životni ciklus rada na konferenciji, od predaje i recenzije do odluke, programa i zbornika. Sudjeluju javni posjetitelj, korisnik aplikacije, autor/koautor, recenzent, predsjednik programskog odbora i administrator, a uz njih i četiri vanjska sustava kao sekundarni akteri:
- **ORCID** sudjeluje u obrascu „Registracija ili prijava”, gdje provodi autentikaciju, i u obrascu „Provjera sukoba interesa”, gdje daje podatke o koautorstvu.
- **Crossref** sudjeluje u predaji rada i dohvaća metapodatke referenci s DOI oznakom.
- **Google Calendar** prima izvezeni osobni raspored.
- **e-pošta** služi za registraciju, pozive i obavijesti.

Također definiramo dionika **Baza podataka** koja sudjeluje u obrascima vezanim za pregled dostupnih podataka (u dijagramu je predstavljen kao sekundarni akter).

Budući da projekt ovisi o tim sustavima, ta se ovisnost prikazuje i u dijagramu obrazaca uporabe. Tehnički detalji integracije pripadaju arhitekturnoj dokumentaciji.

**Odabir aktera i ciljeva:**

Granica sustava pokazuje što platforma nudi. Akteri su uloge, a ne osobe: isti korisnik može na jednoj konferenciji biti autor, a na drugoj recenzent, zato sve uloge nasljeđuju korisnika aplikacije. Svaki akter ima vlastite ciljeve:
- **autor** predaje rad i prati njegovo stanje
- **recenzent** ocjenjuje radove
- **predsjednik programskog odbora** vodi recenziju i slaže program
- **administrator** održava platformu

Automatske radnje sustava, poput prijedloga raspodjele i podsjetnika, nemaju aktera koji ih pokreće, pa nisu prikazane kao zasebni obrasci uporabe. Dijagram treba usporediti s odobrenim funkcijskim zahtjevima (F-001 do F-030) i akterima.

</details>

## 3.2 Specifikacije obrazaca uporabe

**Cilj:** Za svaki obrazac uporabe iz dijagrama objasniti cilj aktera, uobičajenu interakciju s aplikacijom i važne alternative. Jednostavne obrasce uporabe opišite kratko; proširite one kod kojih alternative, vanjske ovisnosti ili posljedice zahtijevaju dodatno objašnjenje.

**Za svaki obrazac uporabe koristite jednu okomitu tablicu.** Navedite samo onoliko pojedinosti koliko interakcija zahtijeva; neprimjenjivu alternativu izostavite umjesto da je popunjavate samo radi forme.


**Opća pravila:** Isti korisnik može imati različite uloge na različitim konferencijama, a ovlasti se određuju zasebno za svaku konferenciju. Nakon isteka roka sustav onemogućuje odgovarajuće radnje (predaja, recenzije, obavijesti, konačne verzije). Zbornik je dostupan samo prijavljenim korisnicima. Sustav sam predlaže raspodjelu recenzenata.

**UC-01: Pregled javne stranice konferencije.**

| Polje | Opis |
| --- | --- |
| Primarni akter | Javni posjetitelj (A-01) |
| ID zahtjeva | F-003|
| Preduvjeti, ako postoje | Konferencija je aktivna (F-015). |
| Glavni tijek | 1. Posjetitelj otvara javnu stranicu konferencije.<br>2. Sustav prikazuje poziv na predaju radova, teme i važne datume.<br>3. Ako je program objavljen, sustav ga prikazuje.|
| Alternativni ili neuspješni tijekovi, ako postoje | **3a — Program nije objavljen:** sustav ga ne prikazuje. |
| Rezultat | Posjetitelj vidi javne podatke konferencije bez prijave. |

**UC-02: Registracija ili prijava.**

| Polje | Opis |
| --- | --- |
| Primarni akter | Javni posjetitelj (A-01); sekundarni akter: ORCID (A-06), e-pošta(A-006) |
| ID zahtjeva | F-001 |
| Preduvjeti, ako postoje | Nema. |
| Glavni tijek | 1. Posjetitelj odabire registraciju ili prijavu.<br>2. Posjetitelj bira način: adresa e-pošte ili ORCID račun.<br>3. Sustav provodi autorizaciju OAuth 2.0 protokolom (tokeni).<br>4. Sustav prijavljuje korisnika i otvara mu radnje za prijavljene. |
| Alternativni ili neuspješni tijekovi, ako postoje | **2a — Adresa e-pošte već postoji:** sustav objašnjava zašto se registracija ne može nastaviti.|
| Rezultat | Korisnik je prijavljen i može izvršavati radnje za prijavljene; neprijavljeni ih ne može izvršiti. |

**UC-03: Uređivanje profila.**

| Polje | Opis |
| --- | --- |
| Primarni akter | Prijavljeni korisnik (Autor/Koautor, Recenzent, Predsjednik programskog odbora, Administrator; A-02 do A-05) |
| ID zahtjeva | F-002 |
| Preduvjeti, ako postoje | Korisnik je prijavljen. |
| Glavni tijek | 1. Korisnik otvara profil.<br>2. Korisnik uređuje ime i prezime, ustanovu, ORCID identifikator i ključne riječi ekspertize.<br>3. Sustav sprema promjene. |
| Alternativni ili neuspješni tijekovi, ako postoje | Nema. |
| Rezultat | Spremljeni podaci vide se pri ponovnom otvaranju profila. |

**UC-04: Predaja i promjena rada.**

| Polje | Opis |
| --- | --- |
| Primarni akter | Autor/koautor (A-02); sekundarni akteri: Crossref (A-06), e-pošta (A-06) |
| ID zahtjeva | F-008, F-010, F-011 (izmjena rada); uključuje UC-16 za F-009 |
| Preduvjeti, ako postoje | Autor je prijavljen i rok predaje radova nije istekao. |
| Glavni tijek | 1. Autor unosi naslov, sažetak, ključne riječi i temu rada.<br>2. Autor dodaje koautore odabirom postojećih korisnika ili unosom imena i adrese e-pošte; koautorima koji nisu registrirani sustav šalje poziv e-poštom.<br>3. Autor određuje autora za kontakt.<br>4. Autor prilaže anonimizirani rukopis u PDF formatu.<br>5. Sustav provjerava PDF (UC-16).<br>6. Za reference s DOI oznakom sustav dohvaća metapodatke putem Crossrefa.<br>7. Autor potvrđuje predaju, a sustav sprema rad sa statusom Predan. |
| Alternativni ili neuspješni tijekovi, ako postoje | **1a — Rad je već predan:** autor otvara rad na pregledu „Moji radovi” i mijenja podatke ili zamjenjuje PDF; sustav ponovno provodi korake 5 i 6, a rad ostaje u statusu Predan.<br>**5a — PDF nije prošao provjeru:** postupa se prema UC-16.<br>**6a — DOI nije pronađen:** sustav označava referencu upozorenjem, a autor je može ispraviti. |
| Rezultat | Rad je spremljen ili izmijenjen sa statusom Predan, s provjerenim PDF-om i označenim referencama čiji DOI nije pronađen. |

**UC-05: Povlačenje rada.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Autor/koautor (A-02) |
| ID zahtjeva | F-011 (povlačenje rada) |
| Preduvjeti, ako postoje | Autor je prijavljen.|
| Glavni tijek | 1. Autor na pregledu „Moji radovi” odabire rad.<br>2. Autor odabire povlačenje i potvrđuje ga.<br>3. Sustav evidentira povlačenje i rad više ne sudjeluje u recenziji. |
| Alternativni ili neuspješni tijekovi, ako postoje | **2a — Rad je već prihvaćen:** sustav onemogućuje povlačenje. |
| Rezultat | Povučeni rad ne ulazi u recenziju ni u program konferencije. |

**UC-06: Predaja revizije.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Autor/koautor (A-02) |
| ID zahtjeva | F-023 |
| Preduvjeti, ako postoje | Rad ima status Potrebna revizija. |
| Glavni tijek | 1. Autor na pregledu „Moji radovi” odabire rad.<br>2. Autor prilaže novu anonimiziranu verziju rada i dokument s odgovorima recenzentima.<br>3. Sustav sprema dokumente i vraća rad u stanje U recenziji, kod istih recenzenata. |
| Alternativni ili neuspješni tijekovi, ako postoje | **2a — Nedostaje dokument s odgovorima recenzentima:** sustav ne prihvaća predaju i obavještava autora. |
| Rezultat | Revidirani rad vraćen je na recenziranje kod istih recenzenata. |

**UC-07: Odgovor na poziv u programski odbor.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Recenzent (A-03) |
| ID zahtjeva | F-013 |
| Preduvjeti, ako postoje | Predsjednik programskog odbora poslao je pozivnicu (UC-20). Korisnik je prijavljen. |
| Glavni tijek | 1. Korisnik otvara pozivnicu.<br>2. Korisnik prihvaća poziv.<br>3. Sustav mu dodjeljuje ulogu recenzenta na toj konferenciji. |
| Alternativni ili neuspješni tijekovi, ako postoje | **2a — Korisnik odbija poziv:** sustav ne dodjeljuje ulogu recenzenta. |
| Rezultat | Prihvaćanjem poziva korisnik postaje recenzent te konferencije. |

**UC-08: Iskazivanje interesa za radove.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Recenzent (A-03) |
| ID zahtjeva | F-014 |
| Preduvjeti, ako postoje | Recenzent je prihvatio poziv u programski odbor (UC-07), a rok predaje radova je istekao. |
| Glavni tijek | 1. Recenzent otvara popis predanih radova.<br>2. Sustav prikazuje naslove i sažetke bez podataka o autorima.<br>3. Recenzent za svaki rad odabire: želim recenzirati, mogu recenzirati, ne želim recenzirati ili sukob interesa.<br>4. Sustav sprema odabire. |
| Rezultat | Odabiri su spremljeni i koriste se pri raspodjeli radova (UC-11). |

**UC-09: Rasprava s recenzentima.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Recenzent (A-03) |
| ID zahtjeva | F-019 |
| Preduvjeti, ako postoje | Radu je dodijeljeno najmanje tri recenzenta (UC-11) i sve recenzije za taj rad su predane (UC-32). |
| Glavni tijek | 1. Recenzent otvara raspravu rada.<br>2. Sustav prikazuje recenzije ostalih recenzenata tog rada.<br>3. Recenzent piše komentare u raspravi; sudionici su prikazani kao „Recenzent 1”, „Recenzent 2” itd. |
| Rezultat | Recenzenti raspravljaju o radu bez otkrivanja vlastitih identiteta; autori raspravu ne vide. |


**UC-10: Definiranje konferencije.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Predsjednik programskog odbora (A-04) |
| ID zahtjeva | F-006, F-029|
| Preduvjeti, ako postoje | Administrator je odobrio konferenciju i imenovao predsjednika (UC-14). |
| Glavni tijek | 1. Predsjednik unosi naziv, mjesto, datume održavanja, vremenska zonu i teme.<br>2. Predsjednik određuje rokove: predaja radova, recenzije, obavijest autorima, predaja konačnih verzija.<br>3. Sustav sprema podatke i prikazuje ih na javnoj stranici konferencije. |
| Alternativni ili neuspješni tijekovi, ako postoje | **1a — Nedostaju obavezni podaci:** sustav ne sprema nepotpune podatke.<br>**2a — Predsjednik produljuje rok (F-029):** sustav ažurira rok i obavještava sve zahvaćene korisnike.|
| Rezultat | Podaci i rokovi konferencije spremljeni su i javno vidljivi. |

**UC-11: Uređivanje raspodjele radova recenzentima.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Predsjednik programskog odbora (A-04) |
| ID zahtjeva |F-017, F-030|
| Preduvjeti, ako postoje | Rok predaje radova je istekao, recenzenti su iskazali interes (UC-08) i sustav je predložio raspodjelu radova recenzentima. |
| Glavni tijek | 1. Predsjednik otvara prijedlog raspodjele koji je izradio sustav (najmanje tri recenzenta po radu, ravnomjerno opterećenje).<br>2. Sustav provjerava sukobe interesa (UC-17).<br>3. Predsjednik po potrebi ručno mijenja dodjele.<br>4. Predsjednik potvrđuje raspodjelu. |
| Alternativni ili neuspješni tijekovi, ako postoje |**3a — Recenzent je autor rada:** sustav blokira dodjelu uz poruku.<br>**3b — Recenzija kasni ili je utvrđen sukob interesa:** predsjednik dodjeljuje zamjenskog recenzenta (UC-18).<br>**4a — Rad ima manje od tri recenzenta:** sustav upozorava predsjednika i ne dopušta potvrdu raspodjele; predsjednik može dodijeliti zamjenskog recenzenta (UC-18) i ponovno potvrđuje raspodjelu.|
| Rezultat | Svaki rad ima najmanje tri recenzenta, bez sukoba interesa i bez recenziranja vlastitog rada. |

**UC-12: Odluke o radovima.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Predsjednik programskog odbora (A-04) |
| ID zahtjeva | F-021 |
| Preduvjeti, ako postoje | Predsjednik je otvorio pregled „Odluke” (UC-25) i za rad o kojem odlučuje predane su sve recenzije (UC-32). |
| Glavni tijek | 1. Predsjednik odabire rad.<br>2. Predsjednik bira odluku: prihvaćen, potrebna revizija ili odbijen.<br>3. Sustav sprema odluku i ažurira stanje rada. |
| Rezultat | Odluka je spremljena, a stanje rada ažurirano. |

**UC-13: Slaganje programa konferencije.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Predsjednik programskog odbora (A-04) |
| ID zahtjeva | F-025; uključuje UC-26 |
| Preduvjeti, ako postoje | Postoje radovi u stanju Konačna verzija predana. |
| Glavni tijek | 1. Predsjednik otvara slaganje programa.<br>2. Sustav predlaže grupiranje radova u sekcije prema temi i ključnim riječima.<br>3. Predsjednik određuje temu, dvoranu, termin i predsjedavajućeg svake sekcije.<br>4. Sustav provjerava raspored (UC-26).<br>5. Predsjednik sprema program, a uvršteni radovi prelaze u stanje Uvršten u program. |
| Alternativni ili neuspješni tijekovi, ako postoje | **4a — Provjera programa nije prošla:** postupa se prema UC-26. |
| Rezultat | Program je spremljen bez preklapanja izlagača i sukoba predsjedavajućeg. |

**UC-14: Odobravanje konferencije.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Administrator (A-05) |
| ID zahtjeva | F-015; uključuje UC-30 |
| Preduvjeti, ako postoje | Administrator je prijavljen i postoji konferencija koja čeka odobrenje. |
| Glavni tijek | 1. Administrator otvara konferenciju koja čeka odobrenje.<br>2. Administrator pregledava podatke i odobrava konferenciju.<br>3. Administrator imenuje predsjednika programskog odbora (UC-30).<br>4. Sustav aktivira konferenciju. |
| Alternativni ili neuspješni tijekovi, ako postoje | **2a — Administrator odbija konferenciju:** konferencija ostaje neaktivna. |
| Rezultat | Konferencija je aktivna tek nakon odobrenja i ima imenovanog predsjednika programskog odbora. |

**UC-15: Obavijest o odluci.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Predsjednik programskog odbora (A-04); sekundarni akter: e-pošta (A-06) |
| ID zahtjeva | F-022 |
| Preduvjeti, ako postoje | Odluke o radovima su donesene (UC-12). |
| Glavni tijek | 1. Predsjednik jednom radnjom pokreće slanje obavijesti svim autorima.<br>2. Sustav za svaki rad popunjava predložak poruke odlukom i recenzijama, bez povjerljivih komentara i identiteta recenzenata.<br>3. Sustav šalje obavijesti e-poštom. |
| Rezultat | Autori su obaviješteni o odluci i recenzijama. |

**UC-16: Provjera PDF-a** *(uključen u UC-04).*
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Autor/koautor (A-02) |
| ID zahtjeva | F-009 |
| Preduvjeti, ako postoje | Autor je priložio PDF tijekom predaje rada (UC-04). |
| Glavni tijek | 1. Sustav provjerava format PDF-a i najveći dopušteni broj stranica.<br>2. Sustav provjerava sadrže li metapodaci imena autora.<br>3. Ako su uvjeti zadovoljeni, sustav dopušta nastavak predaje. |
| Alternativni ili neuspješni tijekovi, ako postoje | **1a — Format ili broj stranica nisu valjani:** sustav odbija PDF.<br>**2a — Metapodaci sadrže imena autora:** sustav upozorava autora prije predaje. |
| Rezultat | Neispravan PDF je odbijen, a PDF s imenom u metapodacima daje upozorenje. |

**UC-17: Provjera sukoba interesa** *(uključen u UC-11).*
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Predsjednik programskog odbora (A-04); sekundarni akter: ORCID (A-06) |
| ID zahtjeva | F-016 |
| Preduvjeti, ako postoje | Postoji prijedlog raspodjele radova (UC-11). |
| Glavni tijek | 1. Sustav uzima sukobe interesa koje su recenzenti sami prijavili (UC-08).<br>2. Sustav iz ORCID-a dohvaća podatke o ustanovama i koautorstvima.<br>3. Sustav utvrđuje sukob ako recenzent radi na istoj ustanovi kao neki od autora ili je s nekim od autora bio koautor u posljednje tri godine.<br>4. Recenzenti u sukobu isključuju se iz dodjele tog rada. |
| Alternativni ili neuspješni tijekovi, ako postoje | **2a — ORCID ne daje dovoljno podataka:** sustav se oslanja na sukobe koje je recenzent sam prijavio i na ustanovu iz profila. |
| Rezultat | Recenzent u sukobu interesa nije u recenziranju tog rada. |

**UC-18: Dodjela zamjenskog recenzenta** *(proširuje UC-11).*
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Predsjednik programskog odbora (A-04) |
| ID zahtjeva | F-020 |
| Preduvjeti, ako postoje | Recenzija je označena kao zakašnjela ili je za dodijeljenog recenzenta naknadno utvrđen sukob interesa. |
| Glavni tijek | 1. Predsjednik otvara rad.<br>2. Predsjednik odabire zamjenskog recenzenta.<br>3. Sustav provjerava sukob interesa i je li odabrani korisnik autor rada.<br>4. Sustav dodjeljuje rad zamjenskom recenzentu. |
| Alternativni ili neuspješni tijekovi, ako postoje | **3a — Zamjenski recenzent je u sukobu interesa ili je autor rada:** sustav blokira dodjelu i prikazuje razlog. |
| Rezultat | Rad je dodijeljen zamjenskom recenzentu koji može dovršiti recenziju. |

**UC-19: Upravljanje osobnim rasporedom.**

| Polje | Opis |
| --- | --- |
| Primarni akter | Prijavljeni korisnik (A-02 do A-05); sekundarni akter: Google Calendar (A-06) |
| ID zahtjeva | F-026 |
| Preduvjeti, ako postoje | Korisnik je prijavljen i program konferencije je objavljen. |
| Glavni tijek | 1. Korisnik otvara objavljeni program.<br>2. Korisnik odabire izlaganja i dodaje ih u osobni raspored.<br>3. Sustav sprema raspored.<br>4. Korisnik odabire izvoz rasporeda u Google Calendar.<br>5. Sustav izvozi odabrana izlaganja u kalendar. |
| Alternativni ili neuspješni tijekovi, ako postoje | **1a — Program nije objavljen:** izlaganja se ne mogu dodati u raspored.|
| Rezultat | Raspored je spremljen u aplikaciji; izvezeni događaji pojavljuju se u kalendaru s ispravnim vremenom. |

**UC-20: Pozivanje recenzenata.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Predsjednik programskog odbora (A-04); sekundarni akter: e-pošta (A-06) |
| ID zahtjeva | F-013 |
| Preduvjeti, ako postoje | Konferencija je aktivna (UC-14) i njezini podaci su definirani (UC-10). |
| Glavni tijek | 1. Predsjednik unosi adrese e-pošte korisnika koje želi pozvati u programski odbor.<br>2. Predsjednik šalje pozivnice.<br>3. Sustav šalje pozivnice e-poštom. |
| Rezultat | Pozvani korisnici primili su pozivnice i mogu na njih odgovoriti (UC-07). |

**UC-21: Pregled „Moji radovi”.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Autor/koautor (A-02); dionik: Baza podataka (D-01) |
| ID zahtjeva | F-012 |
| Preduvjeti, ako postoje | Autor je prijavljen.|
| Glavni tijek | 1. Autor otvara pregled „Moji radovi”.<br>2. Sustav dohvaća radove autora iz baze podataka.<br>3. Sustav prikazuje radove i njihova stanja (nacrt, predan, u recenziji, potrebna revizija, prihvaćen, odbijen, konačna verzija predana, uvršten u program); stanje nije označeno samo bojom. |
| Rezultat | Autor vidi aktualna stanja svih svojih radova. |

**UC-22: Pregled zbornika sažetaka.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Korisnik aplikacije (A-02 do A-05) |
| ID zahtjeva | F-027 |
| Preduvjeti, ako postoje | Korisnik je prijavljen i sustav je generirao zbornik iz prihvaćenih radova. |
| Glavni tijek | 1. Korisnik otvara zbornik sažetaka konferencije.<br>2. Sustav prikazuje PDF sa sažecima prihvaćenih radova, sadržajem po sekcijama i kazalom autora. |
| Alternativni ili neuspješni tijekovi, ako postoje | **1a — Zbornik još nije generiran:** zbornik se ne prikazuje. |
| Rezultat | Prijavljeni korisnik vidi zbornik sažetaka; javni posjetitelj mu nema pristup. |


**UC-23: Predaja neanonimizirane konačne verzije.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Autor/koautor (A-02) |
| ID zahtjeva | F-024 |
| Preduvjeti, ako postoje | Rad je prihvaćen i rok za predaju konačnih verzija nije istekao. |
| Glavni tijek | 1. Autor na pregledu „Moji radovi” odabire prihvaćeni rad.<br>2. Autor prilaže neanonimiziranu konačnu verziju rada i potpisanu izjavu o autorskim pravima.<br>3. Autor navodi tko će rad izlagati.<br>4. Sustav sprema podatke i postavlja stanje Konačna verzija predana. |
| Alternativni ili neuspješni tijekovi, ako postoje | **2a — Nedostaje izjava o autorskim pravima ili tko izlaže:** sustav ne prihvaća predaju.|
| Rezultat | Konačna verzija spremljena je sa statusom Konačna verzija predana i može se uvrstiti u program. |
 
**UC-24: Pregled „Statistika”.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Predsjednik programskog odbora (A-04); dionik: Baza podataka (D-01) |
| ID zahtjeva | F-004 |
| Preduvjeti, ako postoje | Predsjednik je prijavljen. |
| Glavni tijek | 1. Predsjednik otvara pregled „Statistika”.<br>2. Sustav dohvaća podatke konferencije iz baze podataka.<br>3. Sustav prikazuje broj predanih radova po temama, udio prihvaćenih radova, prosječno trajanje recenzije i opterećenje pojedinih recenzenata.<br>4. Predsjednik po potrebi izvozi podatke u CSV formatu.|
| Rezultat | Predsjednik vidi statistiku konferencije i može je izvesti. |

**UC-25: Pregled „Odluke”.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Predsjednik programskog odbora (A-04); dionik: Baza podataka (D-01) |
| ID zahtjeva | F-021 |
| Preduvjeti, ako postoje | Postoje radovi u recenziji. |
| Glavni tijek | 1. Predsjednik otvara pregled „Odluke”.<br>2. Sustav dohvaća radove i recenzije iz baze podataka<br>3. Sustav prikazuje tablicu radova s prosječnom ocjenom, brojem pristiglih recenzija i oznakom znatnog neslaganja ocjena recenzenata. |
| Rezultat | Predsjednik ima na jednom mjestu podatke potrebne za odluke. |

 
**UC-26: Provjera konflikata rasporeda** *(uključen u UC-13).*
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Predsjednik programskog odbora (A-04) |
| ID zahtjeva | F-025 |
| Preduvjeti, ako postoje | Predsjednik je rasporedio radove u sekcije (UC-13). |
| Glavni tijek | 1. Sustav provjerava da nijedan izlagač nema dva izlaganja u isto vrijeme.<br>2. Sustav provjerava da predsjedavajući sekcije nije autor nekog od radova u toj sekciji. |
| Alternativni ili neuspješni tijekovi, ako postoje | **1a — Izlagač ima dva izlaganja u isto vrijeme:** sustav ne dopušta spremanje programa i prikazuje razlog.<br>**2a — Predsjedavajući je autor rada u svojoj sekciji:** sustav ne dopušta spremanje programa i prikazuje razlog |
| Rezultat | Program se može spremiti samo bez preklapanja izlagača i sukoba predsjedavajućeg. |

**UC-27: Deaktivacija korisničkog računa.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Administrator (A-05) |
| ID zahtjeva | F-007 |
| Preduvjeti, ako postoje | Administrator je prijavljen i utvrđena je zlouporaba korisničkog računa. |
| Glavni tijek | 1. Administrator otvara popis korisnika i odabire korisnika.<br>2. Administrator deaktivira korisnički račun i potvrđuje radnju.<br>3. Sustav deaktivira račun i odjavljuje korisnika. |
| Rezultat | Deaktivirani korisnik se više ne može prijaviti u sustav. |

**UC-28: Uređivanje predložaka e-pošte.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Administrator (A-05) |
| ID zahtjeva | F-028 |
| Preduvjeti, ako postoje | Administrator je prijavljen. |
| Glavni tijek | 1. Administrator otvara popis predložaka poruka e-pošte.<br>2. Administrator uređuje tekst predloška.<br>3. Sustav sprema predložak. |
| Rezultat | Nove poruke sustava šalju se prema izmijenjenom predlošku. |

**UC-29: Pregled statistike korištenja.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Administrator (A-05); dionik: Baza podataka(D-01) |
| ID zahtjeva | F-005 |
| Preduvjeti, ako postoje | Administrator je prijavljen. |
| Glavni tijek | 1. Administrator otvara statistiku korištenja sustava.<br>2. Sustav dohvaća podatke o korištenju iz baze podataka.<br>3. Sustav prikazuje podatke o korištenju platforme. |
| Rezultat | Administrator vidi statistiku korištenja sustava. |

**UC-30: Imenovanje predsjednika** *(uključen u UC-14).*
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Administrator (A-05)|
| ID zahtjeva | F-015 |
| Preduvjeti, ako postoje | Administrator odobrava konferenciju (UC-14). |
| Glavni tijek | 1. Administrator odabire registriranog korisnika.<br>2. Sustav tom korisniku dodjeljuje ulogu predsjednika programskog odbora za tu konferenciju. |
| Rezultat | Imenovani korisnik ima ovlasti predsjednika programskog odbora samo na toj konferenciji. |

**UC-31: Pregled „Moje recenzije”.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Recenzent (A-03); dionik: Baza podataka(D-01) |
| ID zahtjeva | F-018 |
| Preduvjeti, ako postoje | Recenzentu su dodijeljeni radovi (UC-11). |
| Glavni tijek | 1. Recenzent otvara pregled „Moje recenzije”.<br>2. Sustav dohvaća dodijeljene radove i rokove iz baze podataka.<br>3. Sustav prikazuje dodijeljene radove i rokove, bez imena autora; recenzije koje kasne posebno su označene. |
| Rezultat | Recenzent ima pregled svojih obveza i rokova. |

**UC-32: Predaja ocjene.**
 
| Polje | Opis |
| --- | --- |
| Primarni akter | Recenzent (A-03) |
| ID zahtjeva | F-018, F-020 (podsjetnici i oznaka kasnih recenzija) |
| Preduvjeti, ako postoje | Recenzentu je dodijeljen rad i rok za recenziju nije istekao. |
| Glavni tijek | 1. Sustav šalje recenzentu podsjetnike e-poštom 7 i 2 dana prije roka i vidljivo označava recenzije koje kasne.<br>2. Recenzent na pregledu „Moje recenzije” odabire rad i preuzima anonimizirani rukopis.<br>3. Recenzent upisuje ocjenu (od −3 do +3), procjenu vlastite stručnosti (od 1 do 5), komentar za autore i povjerljivi komentar za programski odbor.<br>4. Sustav sprema recenziju. |
| Rezultat | Recenzija je spremljena; identitet autora ostaje skriven recenzentu, a identitet recenzenta autoru. |

 



## 3.3 Provjera dosljednosti obrazaca uporabe

**Cilj:** Provjeriti međusobnu usklađenost obrazaca uporabe, aktera, zahtjeva i ispitnih slučajeva. Cjelovito mapiranje održava se isključivo u **[matrici sljedivosti zahtjeva](2-Analiza-zahtjeva.md#26-sljedivost-zahtjeva)**.

| Provjera | Pitanje za tim |
| --- | --- |
| Zahtjev | Je li svaki važan obrazac uporabe povezan s postojećim zahtjevom? Da. |
| Akter | Odgovara li akter naveden ovdje prethodno utvrđenoj ulozi i dopuštenoj interakciji? Da. |
| Aplikacija | Može li tim demonstrirati opisani glavni rezultat i važnu alternativu ili je opis jasno označen kao trenutačno oblikovanje? Da.|

---

Povezivanje zahtjev → obrazac uporabe → ispitivanje održavajte **samo jednom, u [tablici sljedivosti zahtjeva](./2-Analiza-zahtjeva.md)**. Ovdje nemojte održavati drugu projektnu tablicu mapiranja ni stupac sa statusom implementacije. Ako važan zahtjev nema interakciju s ljudskim akterom, objasnite gdje se obrađuje umjesto izmišljanja aktera.

<details>
<summary><strong>Provjera pokrivenosti zahtjeva</strong></summary>

### Pokrivenost funkcijskih zahtjeva obrascima uporabe

| Broj obrasca uporabe | Naziv obrasca uporabe | Obuhvaćeni funkcijski zahtjevi |
| --- | --- | --- |
| UC-01 | Pregled javne stranice konferencije | F-003: Javna stranica konferencije bez prijave |
| UC-02 | Registracija ili prijava | F-001: Registracija i prijava e-poštom ili ORCID-om |
| UC-03 | Uređivanje profila | F-002: Uređivanje profila |
| UC-04 | Predaja i promjena rada | F-008: Predaja rada; F-010: Metapodaci referenci preko Crossrefa; F-011: Izmjena rada do roka predaje |
| UC-05 | Povlačenje rada | F-011: Povlačenje rada prije prihvaćanja |
| UC-06 | Predaja revizije | F-023: Predaja revizije |
| UC-07 | Odgovor na poziv u programski odbor | F-013: Prihvaćanje ili odbijanje poziva (strana primatelja) |
| UC-08 | Iskazivanje interesa za radove | F-014: Iskazivanje interesa za radove |
| UC-09 | Rasprava s recenzentima | F-019: Anonimna rasprava recenzenata |
| UC-10 | Definiranje konferencije | F-006: Podaci, vremenska zona i rokovi konferencije; F-029: Produljenje roka |
| UC-11 | Uređivanje raspodjele radova recenzentima | F-017: Ručna izmjena raspodjele, F-030: Minimalno 3 recenzenta po radu |
| UC-12 | Odluke o radovima | F-021: Odabir odluke o radu |
| UC-13 | Slaganje programa konferencije | F-025: Slaganje programa konferencije |
| UC-14 | Odobravanje konferencije | F-015: Odobravanje nove konferencije |
| UC-15 | Obavijest o odluci | F-022: Skupne obavijesti o odlukama |
| UC-16 | Provjera PDF-a | F-009: Provjera formata, broja stranica i metapodataka PDF-a |
| UC-17 | Provjera sukoba interesa | F-016: Prepoznavanje sukoba interesa |
| UC-18 | Dodjela zamjenskog recenzenta | F-020: Dodjela zamjenskog recenzenta |
| UC-19 | Upravljanje osobnim rasporedom | F-026: Osobni raspored i izvoz u Google Calendar |
| UC-20 | Pozivanje recenzenata | F-013: Pozivanje recenzenata (strana pošiljatelja) |
| UC-21 | Pregled „Moji radovi” | F-012: Pregled „Moji radovi” |
| UC-22 | Pregled zbornika sažetaka | F-027: Zbornik sažetaka (samo za prijavljene korisnike) |
| UC-23 | Predaja neanonimizirane konačne verzije | F-024: Predaja konačne verzije |
| UC-24 | Pregled „Statistika” | F-004: Statistika konferencije i izvoz u CSV |
| UC-25 | Pregled „Odluke” | F-021: Pregled „Odluke” |
| UC-26 | Provjera konflikata rasporeda | F-025: Provjera preklapanja izlagača i sukoba predsjedavajućeg |
| UC-27 | Deaktivacija korisničkog računa | F-007: Deaktivacija računa u slučaju zlouporabe |
| UC-28 | Uređivanje predložaka e-pošte | F-028: Uređivanje predložaka e-pošte |
| UC-29 | Pregled statistike korištenja | F-005: Statistika korištenja sustava |
| UC-30 | Imenovanje predsjednika | F-015: Imenovanje predsjednika programskog odbora |
| UC-31 | Pregled „Moje recenzije” | F-018: Pregled dodijeljenih radova i rokova |
| UC-32 | Predaja ocjene | F-018: Predaja recenzije; F-020: Podsjetnici i oznaka kasnih recenzija |

Svi funkcijski zahtjevi od F-001 do F-030 pokriveni su barem jednim obrascem uporabe.
 
**Zahtjevi i pravila bez zasebnog obrasca:**Pravila o ulogama po konferenciji i o onemogućavanju radnji nakon isteka roka proizlaze iz zadatka i opisana su kao opća pravila na početku odjeljka 3.2. Automatske radnje sustava nemaju aktera koji ih pokreće, pa su opisane unutar obrazaca kojih se tiču: podsjetnici recenzentima (F-020) kao korak 1 glavnog tijeka u UC-32, generiranje zbornika (F-027) kao preduvjet UC-22, a prijedlog raspodjele radova s najmanje tri recenzenta po radu (F-030) kao preduvjet i korak 1 u UC-11.

**Problemi pokrivenosti koje treba riješiti:**

- **Prijedlog raspodjele bez zahtjeva:** 

</details>

**Završna provjera:** Dijagram, specifikacije obrazaca uporabe i matrica sljedivosti međusobno su usklađeni. Svaki važan obrazac uporabe povezan je s postojećim zahtjevom, akteri odgovaraju stvarnim ulogama u aplikaciji, a opisani glavni i alternativni tijekovi odgovaraju ponašanju koje sustav stvarno podržava.