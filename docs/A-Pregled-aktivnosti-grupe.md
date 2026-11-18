# A. Pregled aktivnosti grupe

**Cilj:** Prikazati kako je tim organizirao projekt, raspodijelio rad, reagirao na važne probleme i pridonio rezultatu. Zapisi trebaju opisivati ishode, a ne samo navoditi da je sastanak održan ili da se o nekoj temi raspravljalo.

## A.1 Evidencija sastanaka

**Cilj:** Voditi kratak zapis projektnih sastanaka i tjedne koordinacije: tko je sudjelovao, što je odlučeno i koja je radnja uslijedila. Raspravu koja nije dovela do odluke zabilježite samo ako je važno pitanje ostalo otvoreno.

MĆ - Matej Ćurić	
AJ - Antonio Jović
PP - Patrik Paradžik
NMR - Nina Mare Rogulj 
MČ - Martina Čulina
NT - Nea Trumbić
ST - Stella Tomeljak
 																								

| Datum i sudionici | Glavna tema | Donesena odluka ili zadatak | Poveznica na zadatak ili rezultat, ako postoji |
|---|---|---|---|
| 22. 10. 2026.; MĆ, AJ, PP, NMR, NT, ST, MČ | Početni sastanak: podjela zadataka i plan prvih koraka | Do 29. 10. 2026. izraditi grubu početnu stranicu, README, stranicu s routanjem i osnovnu dokumentaciju. MĆ: routanje i autentifikacija te README; AJ: osnovna Express aplikacija i lokalno pokretanje; PP: osnovna korisnička stranica i frontend struktura; NMR: početni model baze (PostgreSQL); MČ: arhitektura sustava; NT: opis glavnih slučajeva uporabe; ST: osnovna projektna dokumentacija i ova evidencija. | #1, #2, #3, #4, #5, #6, #7, #8 |
| 29.10.2026. ; MĆ, AJ, PP, NMR, NT, ST, MČ | Obavezni labos: provjera napisanog i konzulacija s profesorom; napravljen plan za dalje| Do 12.11.2026 Implementirati osnovne funkcionalnosti aplikacije. MĆ: autentifikacija korisnika putem vanjskog pružatelja identiteta ; MČ: osnovna struktura za pregled i unos recenzija te obrazac za predaju znanstvenog rada, s PP ; NT: pregled konferencija kojima upravlja predsjednik programskog odbora ; AJ: privremeno spremanje predanih radova i pregled „Moji radovi”, s PP ; PP: osnovne korisničke stranice i frontend struktura, dinamički prikaz konferencija na početnoj stranici , stranica s detaljima pojedine konferencije, sa ST, te sudjelovanje na #20 i #21; ST: stranica s detaljima pojedine konferencije, s PP ; NMR: dohvat i obrada podataka o konferencijama. | #9, #10, #17, #18, #19, #20, #21, #22, #23 |


Za svaki relevantan sastanak ili zapis tjedne koordinacije upišite jedan sažet redak. Dodijeljeni zadatak treba imati odgovornu osobu; za neriješeno pitanje treba navesti tko će ga dalje obraditi. Sam naslov sastanka ne pokazuje što se promijenilo. U ovu evidenciju nemojte kopirati cijeli popis issuea ni prijepis razgovora.

<!--  NAPRAVI
**Ishod i odgovornost:** Zapisi jasno definiraju tko je odgovoran za koji dio posla i koji je provjerljivi rezultat dogovoren. npr Rečenica „Raspravljali smo o obradi lokacije” prikrila bi je li se itko obvezao na promjenu. Ovi redci navode odluku ili otvorenu radnju, odgovornu osobu i rezultat koji se može pregledati.-->

<details>
<summary><strong>Primjer evidencije sastanaka (CrisisMap)</strong></summary>

</details>

## A.2 Plan rada

**Cilj:** Prikazati planirani redoslijed rada i odgovornosti u timu. Prikažite projektne tjedne ili druga kratka razdoblja koja tim koristi, uključujući pripremu za formalne provjere.

**Trenutačni plan:** [Poveznica na GitHub Projects ploču, Gantogram ili održavanu tablicu u nastavku. Navesti osobu zaduženu za ažurnost plana. Odaberite jedan glavni prikaz i navedite tko ga održava ažurnim.]

| Razdoblje/Tjedan | Glavni planirani rad | Odgovorni članovi | Poveznica na zadatke |
| --- | --- | --- | --- |
| Projektni tjedan 3 | Gruba početna stranica, README, stranica s routanjem, osnovna dokumentacija | MĆ, AJ, PP, NMR, NT, ST | Zadaci #1, #2, #3, #4, #5, #6, #7, #8 |
| Projektni tjedni 3 i 4 | Osnovne funkcionalnosti: autentifikacija, prikaz konferencija i detalji konferencije, obrazac za predaju rada, "Moji radovi", pregled za predsjednika, struktura za recenzije | MĆ, MČ, NT, AJ, PP, ST, NMR | Zadaci #9, #10, #17, #18, #19, #20, #21, #22, #23 |

Ako koristite tablicu, plan vodite na korisnoj tjednoj razini i ažurirajte ga kada se prioriteti promijene. Kratice članova tima definirajte  u A.1 i ovdje ih primjenjujte dosljedno; ako dva člana imaju iste inicijale, proširite kraticu. Plan nije dokaz da je planirani rad dovršen (to dokazuje kod i dokumentacija).

<details>
<summary><strong>Primjer plana rada</strong></summary>

</details>

## A.3 Aktivnosti i doprinosi članova

**Cilj:** Prikazati koji su članovi radili na važnim projektnim aktivnostima i približan trud koji prijavljuju. Uz implementaciju uključite oblikovanje, dokumentaciju, integraciju, ispitivanje i postavljanje.

| Aktivnost ili rezultat | Član | Prijavljeni sati | Reprezentativni rezultat ili poveznica |
| --- | --- | --- | --- |
|  |  |  |  |

Koristite aktivnosti specifične za projekt umjesto obaveznog retka za svako poglavlje dokumentacije ili svaki UML dijagram. Tim treba dosljedno bilježiti sate i izbjegavati dvostruko brojanje zajedničkog rada; reprezentativni rezultat objašnjava što je prijavljeni trud proizveo. Sati su samoprijavljena procjena uloženog rada, a ne mjera kvalitete niti zamjena za pregled koda i artefakata.

<details>
<summary><strong>Primjer aktivnosti i rezultata rada</strong></summary>

**Primjer — CrisisMap:** Tablica razlikuje implementaciju, integraciju i dokumentaciju te svaku aktivnost povezuje s rezultatom.

| Aktivnost ili rezultat | Član | Prijavljeni sati | Reprezentativni rezultat ili poveznica |
| --- | --- | --- | --- |
| Ručni unos položaja na karti | AK | 8 | Zadatak #21; promjena klijentskog dijela. |
| Provjera valjanosti i trajna pohrana prijave | LM | 10 | Zadatak #23; promjena pozadinskog sustava i ispitivanje. |
| Integracija klijenta i API-ja te javno postavljanje | EP | 7 | Zadatak #25; konfiguracija u `render.yaml` i `dist/` |
| Obrazac uporabe za podnošenje prijave i provjera odbijenog dopuštenja | NK | 5 | Završene izmjene UC-002 i ispitivanje ST-03. |

**Trud i rezultat:** Završni stupac omogućuje raspravu o doprinosu bez tretiranja velikog broja sati kao dokaza isporuke. Tim može prijaviti stvarno dugotrajan, još neriješen problem integracije kao obavljen rad i iskreno opisati njegov ishod.

</details>

## A.4 Pregled promjena u repozitoriju

**Cilj:** Prikazati kada su promjene napravljene u repozitoriju i tko ih je napravio, uz napomenu da sam broj zapisa promjena ne mjeri kvalitetu doprinosa.

**Prikaz aktivnosti repozitorija:** [Ugradite ili povežite GitHubov prikaz `Contributors` i generirani graf za projektni repozitorij; navedite razdoblje koje obuhvaća.]

Graf može pokazati kada su zapisi promjena napravljeni i tko ih je napravio, ali ne prikazuje sav rad na oblikovanju, ispitivanju, integraciji, pregledu ili dokumentaciji. Ako postoji uočljiv nesklad s tablicom aktivnosti, kratko ga objasnite; nemojte iz grafa izvoditi broj sati. Generirani prikaz neka bude vezan uz stvarni repozitorij umjesto da se ručno crta drugi graf.

## A.5 Ključni inženjerski izazovi i rješenja

**Cilj:** Dokumentirati stvarne tehničke i organizacijske prepreke s kojima se tim suočio, poduzete korektivne inženjerske korake te konačni ishod. Odaberite konkretne izazove umjesto općenite pohvale timskog rada.

| Izazov | Poduzeta radnja | Ishod ili preostalo ograničenje |
| --- | --- | --- |
|  |  |  |

<details>
<summary><strong>Rješavanje nesklada formata lokacije</strong></summary>

**Primjer — CrisisMap:**

| Izazov | Poduzeta radnja | Ishod ili preostalo ograničenje |
| --- | --- | --- |
| Odabrani položaj na karti prikazivao se u klijentu, ali podnesena prijava nije zadržavala koordinate. | AK i EP usporedile su zahtjev preglednika s poljima lokacije koje očekuje API; AK je uskladila format zahtjeva, a LM je dodao provjeru valjanosti lokacije. | Nova prijava u ovom se scenariju može dohvatiti sa spremljenim položajem; tim povezuje odgovarajuću promjenu integracije i provjeru. |

**Problem, odgovor i ishod:** Svaki se dio može provjeriti u projektu. Rečenica poput „imali smo poteškoće s integracijom i riješili ih timskim radom” ne bi čitatelju rekla što nije radilo ni kako je rješenje promijenjeno.

</details>

---

>**Završna provjera:** Sastanci navode smislene ishode i odgovorne osobe; plan odražava namjeravani rad; tablica uloženog rada i generirani prikaz repozitorija odnose na ovaj vidljivi projekt; konkretni izazovi povezani su s radnjama i njihovim rezultatima. 