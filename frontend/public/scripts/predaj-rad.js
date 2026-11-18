// dio skripte napisan u frontendu
(function () {
  const podaci = JSON.parse(
    document.getElementById("podaci-konferencija").textContent,
  );
  const forma = document.getElementById("forma-rad");
  const konferencija = document.getElementById("konferencija");
  const tema = document.getElementById("tema");
  const lista = document.getElementById("pozvani-lista");
  const poruka = document.getElementById("greske-klijent");
  const MAX_BAJTOVA = 10 * 1024 * 1024;

  // Teme prema tome koja je konferencija odabrana (od strane korisnika)
  function osvjeziTeme(odabrana) {
    const odabranaKonferencija = podaci.find(function (x) {
      return String(x.id) === konferencija.value;
    });
    tema.innerHTML = "";
    tema.add(
      new Option(
        odabranaKonferencija
          ? "-- Odaberite temu --"
          : "-- Prvo odaberite konferenciju --",
        "",
      ),
    );
    if (odabranaKonferencija) {
      odabranaKonferencija.teme.forEach(function (temaObj) {
        tema.add(
          new Option(
            temaObj.naziv,
            temaObj.topic_id,
            false,
            String(temaObj.topic_id) === String(odabrana),
          ),
        );
      });
    }
  }
  konferencija.addEventListener("change", function () {
    osvjeziTeme("");
  });
  osvjeziTeme(tema.dataset.odabrano);

  // Dinamički redovi za pozvane koautore
  document
    .getElementById("dodaj-pozvanog")
    .addEventListener("click", function () {
      const prvi = lista.querySelector(".pozvani-red");
      const novi = prvi.cloneNode(true);
      novi.querySelectorAll("input").forEach(function (i) {
        i.value = "";
      });
      lista.appendChild(novi);
    });
  lista.addEventListener("click", function (e) {
    if (!e.target.classList.contains("ukloni-pozvanog")) return;
    const redovi = lista.querySelectorAll(".pozvani-red");
    if (redovi.length > 1) {
      e.target.closest(".pozvani-red").remove();
    } else {
      redovi[0].querySelectorAll("input").forEach(function (i) {
        i.value = "";
      });
    }
  });

  // Provjera na klijentskoj strani prije slanja forme
  forma.addEventListener("submit", function (e) {
    // Kod spremanja nacrta nije potrebno provjeravati sva polja,
    // ali tema mora biti odabrana zbog ograničenja u bazi
    if (e.submitter && e.submitter.value === "nacrt") {
      if (!tema.value) {
        e.preventDefault();

        poruka.textContent =
          "Za spremanje rada kao nacrta morate odabrati temu.";
        poruka.hidden = false;
        poruka.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    const greske = [];
    if (!document.getElementById("naslov").value.trim())
      greske.push("Naslov ne smije biti prazan.");
    if (!document.getElementById("sazetak").value.trim())
      greske.push("Sažetak ne smije biti prazan.");
    const pdf = document.getElementById("pdf").files[0];
    if (!pdf) greske.push("Odaberite PDF dokument.");
    else if (pdf.type !== "application/pdf")
      greske.push("Datoteka mora biti u PDF formatu.");
    else if (pdf.size > MAX_BAJTOVA)
      greske.push("PDF datoteka je prevelika (najviše 10 MB).");

    if (greske.length) {
      e.preventDefault();
      poruka.textContent = greske.join(" ");
      poruka.hidden = false;
      poruka.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
})();
