# 1. Opseg projekta

**Cilj:** Objasniti odobreni projektni zadatak vlastitim riječima tima. Čitatelj treba razumjeti problem, ciljane korisnike, cilj projekta i njegove granice bez prethodnog čitanja detaljnih zahtjeva.

## 1.1 Problem i cilj projekta

**Cilj:** Jasno razgraničiti problem koji se rješava od predloženog rješenja i stvarne koristi za korisnika.

Organizacija znanstvene konferencije danas je razbacana po raznim alatima: mailovima, Excel tablicama i različitim web aplikacijama za predaju radova. Zbog toga je teško zadržati anonimnost dvostruko slijepe recenzije. Recenzenti se najčešće dodjeljuju ručno, a sukobi interesa ne provjeravaju se sustavno. Rokovi, podsjetnici i statusi radova prate se na ruke, pa se lako dogodi da nešto promakne, recenzenti zabroavljaju rokove, autori tjednima ne znaju u kojoj je fazi rad, a program se često danima ručno slaže.

KonfTrack je web sustav koji na jednom mjestu vodi cijelu konferenciju: od objave poziva i predaje rada, preko recenzije, odluke i revizije, do programa i zbornika sažetaka. Sustav korisnika vodi korak po korak kroz svaku fazu, a svaka uloga vidi samo ono što joj treba.

Očekujemo da će KonfTrack:
    - smanjiti ručni posao predsjedniku programskog odbora (automatski prijedlog recenzenata, skupne obavijesti, podsjetnici)
    - povećati pravednost recenzije (automatska provjera sukoba interesa: ista ustanova, koautorstvo u zadnje tri godine) i bolje čuvati anonimnost
    - povećati transparentnost za autore, koji na jednom mjestu vide status rada i rokove
    - olakšati iskustvo svim sudionicima konferencije.

Navedene koristi su očekivane, a ne izmjerene.

<details>
<summary><strong>Očekivane koristi i potkrepljujući dokazi</strong></summary>

</details>

## 1.2 Ciljani korisnici i dionici

**Cilj:** Utvrditi osobe, uloge i organizacije čije potrebe i interesi određuju projektni zadatak.

| Skupina korisnika ili dionika | Potreba ili interes relevantan za ovaj projekt |
|---|---|
| Javni posjetitelj | Nije potrebna prijava, pregledava javne konferencije, pozive, teme, rokove i objavljeni program |
| Autor | Predaje i uređuje rad do roka; upravlja koautorima, kontakt-autorom i verzijama; provjera PDF-a i DOI-ja; anonimnost; praćenje statusa i rokova; predaje reviziju ili konačnu verziju |
| Recenzent | Prihvaća/odbija poziv; iskazuje interes i sukobe interesa; recenzira dodijeljene radove; sudjeluje u anonimnoj raspravi; prati rokove (jasno naglašeni uz podsjetnike) |
| Predsjednik programskog odbora | Upravlja konferencijom i rokovima; poziva recenzente; potvrđuje raspodjelu; donosi odluke; slaže program; pregledava statistiku i generira zbornik |
| Administrator | Odobrava nove konferencije; imenuje predsjednika programskog odbora; upravlja korisnicima i konferencijama; uređuje predloške e-pošte; pregledava statistiku korištenja; deaktivira račune |

-PRIMJER(osoba) : Pojedinac koji na jednoj konferenciji ima ulogu autora dok je na drugoj recenzent. Obe uloge prikazane različito ovisno o zadaoj konferenciji. Ali ako unutar jedne konferencije osoba ima dvije uloge oba dvije titule će imati dodjeljeno od jednom.

<details>
<summary><strong>Korisnici, dionici i neobavezna persona</strong></summary>

</details>

## 1.3 Granice projekta

**Cilj:** Jasno definirati granice sustava — što je obuhvaćeno odobrenim zadatkom, što je svjesno izostavljeno ili odgođeno te o kojim vanjskim uslugama sustav izravno ovisi.

**Uključeno:** 
**Izvan opsega ili odgođeno:** 
**Vanjske ovisnosti:** 


<details>
<summary><strong>Primjer početne granice projekta</strong></summary>

**Primjer — CrisisMap:**  
**Uključeno:** Podnošenje prijave kriznog događaja s lokacijom i pregled prijava na karti.  
**Isključeno:** Automatsko angažiranje hitnih službi; prikaz prijave ne odobrava niti pokreće službenu intervenciju.  
**Vanjska ovisnost:** Pružatelj kartografskih usluga omogućuje prikaz karte; aplikacija ostaje odgovorna za vlastite podatke o prijavama.

Ovo je konkretna granica jer razdvaja prikaz informacija od službenog odgovora hitnih službi i određuje koji sustav osigurava kartu. Izuzeće i ovisnost dio su **nastavnog scenarija**, a ne tvrdnja o tome što objavljena aplikacija stvarno implementira; te činjenice određuju odobreni opseg i stvarna aplikacija tima.

**Drugi primjer korisne granice:** U prvoj implementaciji usredotočite se na koordinaciju odgovora na poplavu. Navedite vrste događaja ili korisnika koje pokriva odobreni projekt umjesto obećavanja svih mogućih kriznih procesa. Predviđanje pomoću umjetne inteligencije ili obuku u virtualnoj stvarnosti navedite kao budući rad samo ako predstavljaju smislen sljedeći korak, a ne kao pretpostavljene funkcionalnosti prve inačice.

Tvrdnja poput „modularna arhitektura omogućuje brzo postavljanje u novim regijama” zahtijeva stvarno projektno uporište. Ovdje nemojte obećavati prilagodljivost samo zato što zvuči kao poželjna korist projekta.

Ovaj pregled zadržite na razini opsega: navedite glavnu mogućnost i njezinu granicu bez popisivanja svakog zahtjeva ili projektne pojedinosti. Ono što je stvarno dovršeno i ono što je ostalo nedovršeno navedite u završnim rezultatima, a ne u ovom početnom opisu.

</details>

## 1.4 Postojeći pristupi i opravdanost projekta

**Cilj:** Objasniti kako korisnici trenutačno rješavaju problem i koja preostala potreba opravdava odobreni projekt.

Organizatori konferencija danas često koriste razlučite sustave za praćenje konferecija koji također pokrivaju dosta značajki(predaja radova, recenzije...). KonfTrack se razlikuje po tome što je izgrađen tako da se sukobi interesa automatski prepoznaju iz ORCID podataka(ista ustanova, koautorstvo kroz zadnje tri godine), anonimnost se čuva kroz sve korake. Također pojedinac može imati jedan račun gdje će se uloge određivati po konferenciji.

<details>
<summary><strong>Postojeći pristupi i opravdanost projekta</strong></summary>

**Primjer — CrisisMap:** „Nakon teškog vremenskog događaja građanin će možda morati provjeriti izvor meteoroloških upozorenja i zaseban izvor lokalnih prijava. Predloženi prikaz na karti u CrisisMapu objedinjuje prijave kriznih događaja relevantne za odabranu lokaciju. Aplikacija ne zamjenjuje službena upozorenja ni hitne službe.” Time se objašnjava potreba i namjeravana granica projekta bez tvrdnje da su svi postojeći kanali neučinkoviti. Prva je rečenica **primjer korisničkog scenarija**, a ne izmjeren nalaz o stvarnim korisnicima. Ako tim navodi konkretnu službu upozoravanja ili konkurentski proizvod, treba navesti izvor. Pregled konkurencije i snimke zaslona nisu obavezni.

Ako je postojeće rješenje stvarno utjecalo na projekt, usporedite samo relevantnu funkcionalnost, primjerice jasnoću karte ili potrebnu integraciju. Izbjegavajte unaprijed zadani broj proizvoda ili tablicu kriterija koji nisu povezani s odobrenim zadatkom.

</details>

---

>**Završna provjera:** Opis problema, cilj projekta, korisnici i dionici, granice opsega te postojeći pristupi međusobno su usklađeni. Navedene koristi ne predstavljaju neprovjerene tvrdnje, a uključene i izostavljene funkcionalnosti odgovaraju odobrenom projektnom zadatku.
