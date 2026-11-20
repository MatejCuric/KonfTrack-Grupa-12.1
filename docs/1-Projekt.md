# 1. Opseg projekta

## 1.1 Problem i cilj projekta
Znanstvene konferencije svake godine okupljaju stotine istraživača, a organizatori moraju objaviti poziv na radove, prikupiti rukopise, rasporediti ih recenzentima, pratiti rokove te od prihvaćenih radova složiti program. Taj je posao raspršen po raznim alatima: e-mailovima, Excel tablicama i različitim web aplikacijama za predaju radova. 

Posebno je teško zadržati anonimnost dvostruko slijepe recenzije, u kojoj autor ne zna tko mu recenzira rad, a recenzent ne zna čiji rad ocjenjuje. Ručno je teško zadržati takvu anonimnost i istodobno izbjeći sukob interesa. 

Rokovi, podsjetnici i statusi radova prate se ručno pa se lako dogodi da nešto promakne: recenzenti zaboravljaju rokove, autori tjednima ne znaju u kojoj je fazi rad, a program se danima ručno slaže.

KonfTrack je web sustav koji na jednom mjestu vodi cijelu konferenciju: od objave poziva i predaje rada, preko recenzije, odluke i revizije, do programa i zbornika sažetaka. Sustav vodi korisnike korak po korak kroz svaku fazu, a svaka uloga vidi samo ono što joj je potrebno.

<details>
<summary><strong>Očekivane koristi i potkrepljujući dokazi</strong></summary>

Očekujemo da će KonfTrack:

- smanjiti ručni posao predsjednika programskog odbora (automatski prijedlog recenzenata, skupne obavijesti, podsjetnici)
- povećati pravednost recenzije automatskom provjerom sukoba interesa (ista ustanova, koautorstvo u zadnje tri godine)
- jamčiti anonimnost dvostruko slijepe recenzije u svim dijelovima sustava, uključujući nazive datoteka, e-mail obavijesti i odgovore API-ja
- povećati transparentnost: autori na jednom mjestu vide status rada i rokove, a recenzenti svoje obveze i rokove
- ubrzati izradu programa i zbornika sažetaka, koji se dijelom generiraju automatski

Navedene koristi su očekivane, a ne izmjerene.

</details>

## 1.2 Ciljani korisnici i dionici

| Skupina korisnika ili dionika | Potreba ili interes relevantan za ovaj projekt |
|---|---|
| Javni posjetitelj | Nije potrebna prijava; pregledava javne konferencije, pozive, teme, rokove, objavljeni program i zbornik sažetaka|
| Autor | Predaje i uređuje rad do roka; upravlja koautorima; provjera PDF-a i DOI-ja; anonimnost rada; praćenje statusa i rokova; predaje reviziju ili konačnu verziju; odgovor recenzentima pri reviziji; predaja potpisane izjave o autorskim pravima; određuje izlagače; povlačenje rada |
| Recenzent | Prihvaća/odbija poziv; iskazuje interes i sukobe interesa; recenzira dodijeljene radove; sudjeluje u anonimnoj raspravi; prati rokove i prima podsjetnike |
| Predsjednik programskog odbora | Upravlja konferencijom i rokovima; poziva recenzente; potvrđuje raspodjelu; donosi odluke; slaže program; produljuje rokove; šalje obavijesti autorima; određuje zamjenske recenzente; pregledava statistiku i generira zbornik |
| Administrator | Odobrava nove konferencije; imenuje predsjednika programskog odbora; upravlja korisnicima i konferencijama; uređuje predloške e-pošte; pregledava statistiku korištenja; deaktivira račune |

**Primjer (osoba):** Pojedinac koji na jednoj konferenciji ima ulogu autora, a na drugoj recenzenta. Sustav mu prikazuje samo onu ulogu koja vrijedi za odabranu konferenciju. Ako ista osoba unutar jedne konferencije ima obje uloge, dobiva ih istodobno, ali joj je zabranjeno recenzirat vlastiti rad.


</details>

## 1.3 Granice projekta

**Uključeno:** Cijeli životni ciklus rada na konferenciji: predaja rada, anonimna dvostruko slijepa recenzija s automatskom provjerom sukoba interesa, odluka programskog odbora, revizija i konačna verzija, slaganje programa te generiranje zbornika sažetaka.

**Izvan opsega ili odgođeno:** Sustav se razvija kao projektni prototip i nije namijenjen za stvarnu konferenciju; upravljanje prostorom i logistikom konferencije (kapaciteti, raspored i rezervacija dvorana, tehnička oprema), u zadatku spomenuta organizacija dvorane od strane predsjednika. Odgođeno modeliranje ponašanja i arhitekture, ispitivanje komponenti i sustava, potpuna fonkcionalnost sustave te demonstracija i isporuka.

**Vanjske ovisnosti:**

- ORCID (prijava, dohvat ustanove i koautorstva za prepoznavanje sukoba interesa)
- OAuth 2.0 (autorizacija unutar aplikacije)
- Crossref (provjera DOI oznaka referenci)
- Google Calendar (izvoz osobnog rasporeda)
- Neon (hosting PostgreSQL baza podataka)


## 1.4 Postojeći pristupi i opravdanost projekta

<details>
<summary><strong>Postojeći pristupi i opravdanost projekta</strong></summary>

Organizatori manjih konferencija danas često sve vode e-poštom i tablicama, a neki koriste i zasebne sustave za predaju radova i recenzije. Takav pristup zahtijeva dosta ručnog posla: sukobe interesa treba provjeravati ručno, a anonimnost recenzije ovisi o pažnji organizatora. KonfTrack ostaje potreban jer ta dva zahtjeva rješava sustavno: sukobi interesa prepoznaju se automatski iz ORCID podataka (ista ustanova, koautorstvo u zadnje tri godine), a anonimnost se čuva u svim dijelovima sustava. Uz to jedan korisnički račun služi za više konferencija, s različitom ulogom na svakoj.

</details>
