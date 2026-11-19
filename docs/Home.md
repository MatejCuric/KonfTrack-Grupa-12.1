# KonfTrack — Projektna dokumentacija

**Kolegij:** [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz), Fakultet elektrotehnike i računarstva Sveučilišta u Zagrebu  
**Akademska godina:** 2026./2027.  
**Tim:** Grupa-12.1  
**Nastavnik:** Vlado Sruk  
**Asistent / demonstrator:** Saša Kendjel - asistent / Helena Floreani - demonstrator

## Pregled projekta

KonfTrack je web-aplikacija za upravljanje znanstvenim konferencijama, namijenjena organizatorima konferencija, autorima znanstvenih radova i recenzentima. Aplikacija objedinjuje procese prijave znanstvenih radova, njihove dodjele recenzentima, provedbe recenzijskog postupka i donošenja odluka o prihvaćanju radova. Cilj je pojednostaviti organizaciju konferencija, olakšati praćenje statusa radova i podržati provedbu dvostruko slijepog recenzijskog postupka.

**Aplikacija i osnovno postavljanje:** [README repozitorija](../README.md#quick-start)  
**Javno dostupna aplikacija:** pogledajte [README – Postavljanje](../README.md#deployment)

## Članovi tima i uloge

Ažurirani popis članova, njihovih GitHub profila i glavnih uloga ili doprinosa nalazi se u [README-u repozitoriju](../README.md#team-members).

## Kazalo dokumentacije

| Stranica | Svrha |
| --- | --- |
| [1. Opseg projekta](1-Projekt.md) | Problem, cilj i granice projekta |
| [2. Analiza zahtjeva](2-Analiza-zahtjeva.md) | Zahtjevi, ograničenja i sljedivost |
| [3. Obrasci uporabe](3-Obrasci-uporabe.md) | Akteri i reprezentativne interakcije korisnika |
| [4. Arhitektura i oblikovanje](4-Arhitektura-i-oblikovanje.md) | Glavne odluke oblikovanja, struktura, podaci i ponašanje |
| [5. Ispitivanje](5-Ispitivanje.md) | Pristup ispitivanju, stvarni rezultati i poznati nedostaci |
| [6. Postavljanje, instalacija i konfiguracija](6-Postavljanje-instalacija-i-konfiguracija.md) | Lokalna instalacija, konfiguracija, javno postavljanje i administracija |
| [7. Zaključak i budući rad](7-Zakljucak-i-buduci-rad.md) | Zaključak i moguća daljnja poboljšanja |
| [A. Pregled aktivnosti grupe](A-Pregled-aktivnosti-grupe.md) | Aktivnosti tima, doprinosi i izazovi |

## Ključne točke projekta

| Kontrolna točka | Demonstracija | Video |
| --- | --- | --- |
| Iteracija 1 | [KonfTrack – javno dostupna aplikacija](https://konftrack.onrender.com) | [Poveznica na video Demo 1, ako je snimljen] |
| Završni pregled | [Poveznica na završnu inačicu projekta] | [Poveznica na video završne demonstracije, ako je snimljen] |

Dokumentacija se kontinuirano ažurira kako se aplikacija razvija.

## Organizacija projekta i razvojni proces

**Način rada:** 

Tim organizira razvoj pomoću GitHub Issues, u kojima se evidentiraju aktualni zadaci, problemi i potrebne dorade. Član tima zadužen za određeno područje preuzima odgovarajući Issue i radi na njegovu rješavanju. Ako tijekom rada naiđe na poteškoće, ostali članovi tima pomažu u pronalaženju rješenja, dok se opsežniji zadaci raspodjeljuju na više članova kako bi se mogli učinkovitije izvršiti. 

**Praćenje trenutačnih zadataka i nedostataka:** [GitHub Issues](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/issues)

## Pravila dokumentacije

Dokumentacija se sastoji od međusobno povezanih Markdown stranica. Obavezni UML dijagrami izrađuju se u PlantUML-u, uz PlantUML izvor u dokumentaciji sačuvajte i čitljivu sliku. Primjeri u ovom predlošku kolegija pokazuju kako nešto dokumentirati; nisu dio rezultata studentskog projekta.

<details>
<summary><strong>Izvori dijagrama i nastavni primjeri</strong></summary>

Nastavni primjeri pretpostavljaju React/Vite klijentski dio, Node.js poslužiteljski dio, PostgreSQL, smještaj aplikacije na Renderu i Selenium WebDriver (JavaScript). Vaš tehnološki skup može biti drukčiji; u dokumentaciji opišite ono što stvarno koristite.

Za obrazac uporabe podnošenja prijave kriznog događaja u CrisisMapu tim može čuvati UML izvor u `.puml` datoteci, prikazati odgovarajuću sliku na relevantnoj stranici dokumentacije te ažurirati oboje kada se interakcija promijeni. Koristite stvarni dijagram i stvarno postavljanje vlastitog projekta. Domena ili tehnologija prikazana u primjeru ne postaje zahtjev osim ako je dio odobrenog zadatka.

>Napomena o primjerima: Blokovi „Primjer — CrisisMap" nastavni su scenarij, a ne rezultat ičijeg projekta; ne prepisujte ih. U primjerima se koriste React, Node.js, PostgreSQL, Render i Selenium samo radi dosljednosti. Vaš stog može biti drukčiji (npr. Java/Spring); dokumentirajte ono što stvarno koristite.</details>

## Akademski integritet, ponašanje i licenciranje

README repozitorija sadrži projektnu [izjavu o uporabi umjetne inteligencije](../README.md#ai-usage), [informacije o kodeksu ponašanja i podršci](../README.md#code-of-conduct-and-support) te [status licence ili ponovne uporabe](../README.md#license). Pristupni podaci i druge tajne nikada se ne objavljuju u dokumentaciji niti dijele u običnim porukama.

## Izjava o uporabi umjetne inteligencije

<!-- UPUTA: Ovo je detaljan zapis uporabe umjetne inteligencije; README sadrži kratak sažetak i poveznicu na ovaj odjeljak. Unesite samo ono što se stvarno dogodilo i uklonite neupotrijebljene retke. Ako nije korišten nijedan alat generativne umjetne inteligencije, zamijenite cijeli odjeljak jednom rečenicom koja to jasno navodi. Svaki redak mora upućivati na stranicu, datoteku, zahtjev za uključivanje promjena (PR) ili zadatak. Nikada ne unosite pristupne podatke, osobne podatke ni tuđi zaštićeni sadržaj u alate umjetne inteligencije. -->

Kratak sažetak: [README – Uporaba umjetne inteligencije](../README.md#ai-usage). Ovaj odjeljak bilježi koji su alati korišteni, za koju dokumentaciju ili kod te kako je tim provjerio rezultat. Slijedi FER-ova [pravila o primjerenoj uporabi umjetne inteligencije](https://www.fer.unizg.hr/_download/repository/Policy%20on%20the%20appropriate%20use%20of%20artificial%20intelligence%20at%20the%20faculty%20of%20electrical%20engineering%20and%20computing%5B1%5D.pdf).

### Korišteni alati

| Alat | Inačica ili model | Koristio/la | Glavna svrha |
| --- | --- | --- | --- |
| ChatGPT | GPT-6 | Matej Ćurić | Pomoć pri razvoju koda, otklanjanju pogrešaka i izradi dokumentacije |
| ChatGPT | GPT-6 | Antonio Jović | Tumačenje različitih Node/Express middleware-a |
| Claude | Sonnet 5.5 | Nea Trumbić | Pomoć pri pisanju obrazaca uporabe i provjera povezanosti funkcijskih uvjeta s obrascima |

### Opseg doprinosa umjetne inteligencije

| Stranica, datoteka ili artefakt | Vrsta pomoći | Što je alat proizveo | Što je tim zadao i promijenio | Lokacija |
| --- | --- | --- | --- | --- |
| Autentifikacija i povezani kod | Pomoć pri implementaciji i otklanjanju pogrešaka | Prijedloge koda, objašnjenja i moguće načine rješavanja problema | Kod je prilagođen stvarnoj strukturi KonfTracka, zahtjevima projekta i postojećem kodu | [PR #26](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/pull/26) |
| Dokumentacija projekta | Izrada nacrta / preoblikovanje | Prijedloge teksta i strukture dokumentacije | Tekst je provjeren, prilagođen stvarnom stanju projekta i dopunjen podacima tima | [README](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/blob/main/README.md) |
| Postavljanje aplikacije | Pomoć pri otklanjanju pogrešaka | Objašnjenja konfiguracije i prijedloge za rješavanje problema | Postupci su provjereni na stvarno deployanoj aplikaciji | [README – Postavljanje](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/blob/main/README.md#postavljanje-engl-deployment) |
| Dokumentacija: obrasci uporabe | Pomoć pri definiranju obrazaca i otklanjanju sintaktičkih pogrešaka | Prijedloge strukture dokumentacije, usklađene s UML dijagramom obrazaca uporabe | Tekst dokumentacije je prilagođen projektu i provjerena je pokrivenost zahtjeva F-001 do F-030 | [3-Obrasci-uporabe](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/blob/main/docs/3-Obrasci-uporabe.md) |

Stranice i artefakti koji nisu navedeni iznad izrađeni su bez pomoći generativne umjetne inteligencije. 

### Provjera generiranog sadržaja

| Provjera | Kako je provedena | Dokaz |
| --- | --- | --- |
| Činjenična točnost | Prijedlozi i generirani tekst uspoređeni su sa stvarnim kodom, zahtjevima projekta i ponašanjem pokrenute aplikacije. | [Analiza zahtjeva](2-Analiza-zahtjeva.md), [Arhitektura i oblikovanje](4-Arhitektura-i-oblikovanje.md), [GitHub Issues](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/issues) i [PR za integraciju trenutačne inačice koda projekta](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/pull/37) |
| Nema tvrdnji o neostvarenim funkcionalnostima | Generirani sadržaj uspoređen je s trenutnim stanjem implementacije kako bi se osiguralo da se implementirane funkcionalnosti ne predstavljaju drugačije od stvarnog stanja, a planirane funkcionalnosti ne navode kao ostvarene. | [Analiza zahtjeva](2-Analiza-zahtjeva.md), [GitHub Issues](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/issues) |
| Dosljednost s drugim stranicama | Nazivi, zahtjevi, korisničke uloge, funkcionalnosti i opisi sustava uspoređeni su između povezanih stranica dokumentacije kako bi se izbjegle međusobne proturječnosti. | [Analiza zahtjeva](2-Analiza-zahtjeva.md), [Obrasci uporabe](3-Obrasci-uporabe.md), [Arhitektura i oblikovanje](4-Arhitektura-i-oblikovanje.md) |
| Izvori dijagrama | PlantUML izvori generirani ili dopunjeni pomoću umjetne inteligencije provjereni su prema stvarnoj arhitekturi i implementaciji sustava te su po potrebi ručno ispravljeni. | [PlantUML datoteka obrazaca uporabe](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/blob/main/docs/puml/3-1-KonfTrack.puml),[Slika dijagrama obrazaca uporabe](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/blob/main/docs/assets/diagrams/3-1-KonfTrack.svg), [PlantUML datoteka ER dijagrama](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/blob/main/docs/puml/4-2-konftrack-data-ERD.puml), [Slika ER dijagrama](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/blob/main/docs/assets/diagrams/4-2-konftrack-data-ERD.svg), [PlantUML datoteka dijagrama razreda](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/blob/main/docs/puml/4-3-konftrack-domain-CD.puml), [Slika dijagrama razreda](https://github.com/MatejCuric/KonfTrack-Grupa-12.1/blob/main/docs/assets/diagrams/4-3-konftrack-domain-CD.svg) |
| Povjerljivi sadržaj | Pri korištenju umjetne inteligencije, te pri dodavanju promjena na GitHub nisu uključivani pristupni podaci, tajne iz konfiguracije ni drugi povjerljivi podaci. Primjeri koda i konfiguracije prije slanja provjereni su kako bi se uklonile takve vrijednosti. | Pregled korištenih upita i materijala prije njihovog unosa, te prije dodavanja na GitHub |

### Pogreške pronađene u izlazu umjetne inteligencije

| Problem | Kako je pronađen | Rješenje |
| --- | --- | --- |
| U uputama za postavljanje `APP_BASE_URL` korišten je `http://localhost:10000` iako se aplikacija postavljala na Render. | Problem je uočen tijekom provjere deployane aplikacije i OAuth toka na Renderu. | Konfiguracija je prilagođena javnoj Render adresi aplikacije, a OAuth redirect URI usklađen je s deployanom aplikacijom. |
| U uputama za konfiguraciju ORCID aplikacije pogrešno je izjednačena važnost `Application URI` i OAuth `Redirect URI`. | Usporedbom ORCID konfiguracije sa stvarnim OAuth tijekom prijave i callback zahtjevom aplikacije. | Konfiguracija je razjašnjena tako da se OAuth `Redirect URI` registrira kao točna callback adresa deployane aplikacije. |
