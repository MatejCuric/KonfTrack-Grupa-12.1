-- ==============================================================================
-- Konftrack - SQL shema (PostgreSQL)
-- ==============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- Korisnici i područja stručnosti
-- ---------------------------------------------------------------------------
CREATE TABLE users (
    user_id         SERIAL PRIMARY KEY,
    ime             VARCHAR(100) NOT NULL,
    prezime         VARCHAR(100) NOT NULL,
    email           VARCHAR(255) UNIQUE,
    password_hash   VARCHAR(255),
    email_verified  BOOLEAN NOT NULL DEFAULT FALSE,
    ustanova        VARCHAR(255),
    orcid           VARCHAR(19) UNIQUE,
    jeAdmin         BOOLEAN NOT NULL DEFAULT FALSE,
    aktivan         BOOLEAN NOT NULL DEFAULT TRUE,
    email_verification_token_hash VARCHAR(255),
    email_verification_expires_at TIMESTAMP
    -- korisnik se prijavljuje emailom ili ORCID-om, barem jedno mora postojati
    CONSTRAINT chk_users_nacin_prijave CHECK (email IS NOT NULL OR orcid IS NOT NULL)
);

CREATE TABLE expertise (
    expertise_id    SERIAL PRIMARY KEY,
    naziv           VARCHAR(150) NOT NULL
);

CREATE TABLE user_expertise (
    user_id         INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    expertise_id    INT NOT NULL REFERENCES expertise(expertise_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, expertise_id)
);

-- ---------------------------------------------------------------------------
-- Konferencija, teme, uloge
-- ---------------------------------------------------------------------------
CREATE TABLE conference (
    conference_id   SERIAL PRIMARY KEY,
    predsjednik_id  INT NOT NULL REFERENCES users(user_id),
    naziv           VARCHAR(255) NOT NULL,
    mjesto          VARCHAR(255) NOT NULL,
    pocetak         DATE NOT NULL,
    zavrsetak       DATE NOT NULL,
    vremZona        VARCHAR(64) NOT NULL,
    maxStranica     INT CHECK (maxStranica > 0),
    odobrena        BOOLEAN NOT NULL DEFAULT FALSE,
    rokPredaja      TIMESTAMP,
    rokRecenzija    TIMESTAMP,
    rokObavijest    TIMESTAMP,
    rokKonacna      TIMESTAMP,
    CONSTRAINT chk_conference_datumi CHECK (zavrsetak >= pocetak)
);

CREATE TABLE topic (
    topic_id        SERIAL PRIMARY KEY,
    conference_id   INT NOT NULL REFERENCES conference(conference_id) ON DELETE CASCADE,
    naziv           VARCHAR(255) NOT NULL
);

CREATE TABLE user_conf (
    conference_id   INT NOT NULL REFERENCES conference(conference_id) ON DELETE CASCADE,
    user_id         INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    uloga           VARCHAR(50) NOT NULL,
    PRIMARY KEY (conference_id, user_id)
);

-- ---------------------------------------------------------------------------
-- Radovi
-- ---------------------------------------------------------------------------
CREATE TABLE paper (
    paper_id        SERIAL PRIMARY KEY,
    topic_id        INT NOT NULL REFERENCES topic(topic_id),
    naslov          VARCHAR(500) NOT NULL,
    sazetak         TEXT NOT NULL,
    kljucneRijeci   TEXT,
    stanje          VARCHAR(40) NOT NULL DEFAULT 'nacrt',
    datumPredaje    TIMESTAMP,
    odluka          VARCHAR(50),
    datumOdluke     TIMESTAMP,
    CONSTRAINT chk_paper_stanje CHECK (stanje IN (
        'nacrt', 'predan', 'u recenziji', 'potrebna revizija', 'prihvaćen',
        'odbijen', 'konačna verzija predana', 'uvršten u program', 'povučen'))
);

CREATE TABLE paper_author (
    paper_id        INT NOT NULL REFERENCES paper(paper_id) ON DELETE CASCADE,
    user_id         INT NOT NULL REFERENCES users(user_id),
    redniBroj       INT NOT NULL CHECK (redniBroj > 0),
    kontaktOsoba    BOOLEAN NOT NULL DEFAULT FALSE,
    izlagac         BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (paper_id, user_id),
    UNIQUE (paper_id, redniBroj)
);

CREATE TABLE paper_version (
    version_id            SERIAL PRIMARY KEY,
    paper_id              INT NOT NULL REFERENCES paper(paper_id) ON DELETE CASCADE,
    tip                   VARCHAR(30) NOT NULL,
    redniBrojRunde        INT NOT NULL CHECK (redniBrojRunde > 0),
    datoteka              VARCHAR(500),
    internNaziv           VARCHAR(255) NOT NULL,
    brojStranica          INT CHECK (brojStranica > 0),
    datum                 TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dokumentOdgovora      VARCHAR(500),
    izjavaAutorskaPrava   VARCHAR(500),
    upozorenjeMetapodaci  BOOLEAN NOT NULL DEFAULT FALSE,
    reference             TEXT,
    CONSTRAINT chk_paper_version_tip CHECK (tip IN ('prva', 'revidirana', 'konačna')),
    CONSTRAINT uq_paper_version UNIQUE (paper_id, tip, redniBrojRunde)
);

-- ---------------------------------------------------------------------------
-- Pozivnice
-- ---------------------------------------------------------------------------
CREATE TABLE invitation (
    invitation_id   SERIAL PRIMARY KEY,
    conference_id   INT NOT NULL REFERENCES conference(conference_id) ON DELETE CASCADE,
    paper_id        INT REFERENCES paper(paper_id) ON DELETE CASCADE,
    poslao_id       INT NOT NULL REFERENCES users(user_id),
    email           VARCHAR(255) NOT NULL,
    ime             VARCHAR(100),
    uloga           VARCHAR(50) NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'poslana',
    CONSTRAINT chk_invitation_status CHECK (status IN ('poslana', 'prihvaćena', 'odbijena'))
);

-- ---------------------------------------------------------------------------
-- Recenzije
-- ---------------------------------------------------------------------------
CREATE TABLE review_bid (
    paper_id        INT NOT NULL REFERENCES paper(paper_id) ON DELETE CASCADE,
    reviewer_id     INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    interes         VARCHAR(30) NOT NULL,
    PRIMARY KEY (paper_id, reviewer_id),
    CONSTRAINT chk_review_bid_interes CHECK (interes IN (
        'želim recenzirati', 'mogu recenzirati', 'ne želim recenzirati', 'sukob interesa'))
);

CREATE TABLE review_assignment (
    assignment_id               SERIAL PRIMARY KEY,
    paper_id                    INT NOT NULL REFERENCES paper(paper_id) ON DELETE CASCADE,
    reviewer_id                 INT NOT NULL REFERENCES users(user_id),
    zamijenjeni_assignment_id   INT UNIQUE REFERENCES review_assignment(assignment_id),
    status                      VARCHAR(30) NOT NULL,
    datumDodjele                TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    rok                         TIMESTAMP NOT NULL,
    redniBroj                   INT NOT NULL CHECK (redniBroj > 0),
    jeZamjena                   BOOLEAN NOT NULL DEFAULT FALSE,
    podsjetnik7Poslan           BOOLEAN NOT NULL DEFAULT FALSE,
    podsjetnik2Poslan           BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (paper_id, redniBroj),
    CONSTRAINT chk_assignment_zamjena CHECK (assignment_id IS DISTINCT FROM zamijenjeni_assignment_id)
);

CREATE TABLE review (
    review_id           SERIAL PRIMARY KEY,
    assignment_id       INT NOT NULL REFERENCES review_assignment(assignment_id) ON DELETE CASCADE,
    version_id          INT NOT NULL REFERENCES paper_version(version_id),
    ocjena              INT NOT NULL,
    strucnost           INT NOT NULL,
    komentarAutorima    TEXT,
    povjerljivKomentar  TEXT,
    datumPredaje        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_review_ocjena CHECK (ocjena BETWEEN -3 AND 3),
    CONSTRAINT chk_review_strucnost CHECK (strucnost BETWEEN 1 AND 5),
    UNIQUE (assignment_id, version_id)
);

CREATE TABLE discussion_message (
    message_id      SERIAL PRIMARY KEY,
    assignment_id   INT NOT NULL REFERENCES review_assignment(assignment_id) ON DELETE CASCADE,
    tekst           TEXT NOT NULL,
    vrijeme         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- Program konferencije
-- ---------------------------------------------------------------------------
-- Provjeru da predsjedavajući nije autor rada u svojoj sekciji treba provesti u aplikaciji (ili okidačem).
CREATE TABLE section (
    section_id          SERIAL PRIMARY KEY,
    conference_id       INT NOT NULL REFERENCES conference(conference_id) ON DELETE CASCADE,
    topic_id            INT NOT NULL REFERENCES topic(topic_id),
    predsjedavajuci_id  INT NOT NULL REFERENCES users(user_id),
    naziv               VARCHAR(255) NOT NULL,
    dvorana             VARCHAR(100) NOT NULL,
    pocetak             TIMESTAMP NOT NULL,
    kraj                TIMESTAMP NOT NULL,
    CONSTRAINT chk_section_vrijeme CHECK (kraj > pocetak)
);

CREATE TABLE presentation (
    presentation_id SERIAL PRIMARY KEY,
    paper_id        INT NOT NULL UNIQUE REFERENCES paper(paper_id) ON DELETE CASCADE,
    section_id      INT NOT NULL REFERENCES section(section_id) ON DELETE CASCADE,
    izlagac_id      INT NOT NULL REFERENCES users(user_id),
    redoslijed      INT NOT NULL CHECK (redoslijed > 0),
    pocetak         TIMESTAMP NOT NULL,
    kraj            TIMESTAMP NOT NULL,
    CONSTRAINT chk_presentation_vrijeme CHECK (kraj > pocetak),
    UNIQUE (section_id, redoslijed)
);

CREATE TABLE personal_schedule (
    user_id         INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    presentation_id INT NOT NULL REFERENCES presentation(presentation_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, presentation_id)
);

-- ---------------------------------------------------------------------------
-- Predlošci e-pošte
-- ---------------------------------------------------------------------------
CREATE TABLE email_template (
    template_id     SERIAL PRIMARY KEY,
    tip             VARCHAR(100) NOT NULL UNIQUE,
    predlozak       TEXT NOT NULL
);

-- ---------------------------------------------------------------------------
-- Indeksi na vanjskim ključevima koji nisu već pokriveni primarnim/unique ključem
-- ---------------------------------------------------------------------------
CREATE INDEX idx_conference_predsjednik   ON conference(predsjednik_id);
CREATE INDEX idx_topic_conference         ON topic(conference_id);
CREATE INDEX idx_user_conf_user           ON user_conf(user_id);
CREATE INDEX idx_invitation_conference    ON invitation(conference_id);
CREATE INDEX idx_invitation_paper         ON invitation(paper_id);
CREATE INDEX idx_invitation_poslao        ON invitation(poslao_id);
CREATE INDEX idx_paper_topic              ON paper(topic_id);
CREATE INDEX idx_paper_author_user        ON paper_author(user_id);
CREATE INDEX idx_review_bid_reviewer      ON review_bid(reviewer_id);
CREATE INDEX idx_assignment_reviewer      ON review_assignment(reviewer_id);
CREATE INDEX idx_review_version           ON review(version_id);
CREATE INDEX idx_discussion_assignment    ON discussion_message(assignment_id);
CREATE INDEX idx_section_conference       ON section(conference_id);
CREATE INDEX idx_section_topic            ON section(topic_id);
CREATE INDEX idx_section_chair            ON section(predsjedavajuci_id);
CREATE INDEX idx_presentation_izlagac     ON presentation(izlagac_id, pocetak);
CREATE INDEX idx_personal_schedule_pres   ON personal_schedule(presentation_id);

COMMIT;
