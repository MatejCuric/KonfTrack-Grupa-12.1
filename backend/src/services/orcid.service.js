const crypto = require("crypto");

// Generira URL na koji preusmjerava korisnika radi ORCID prijave
function createAuthorizationUrl(state) {
  const url = new URL(process.env.ORCID_AUTHORIZATION_URL);

  url.searchParams.set("client_id", process.env.ORCID_CLIENT_ID);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "/authenticate");
  url.searchParams.set("redirect_uri", process.env.ORCID_REDIRECT_URI);
  url.searchParams.set("state", state);

  return url.toString();
}

// Generira slučajnu vrijednost koja se koristi za OAuth state provjeru
function generateState() {
  return crypto.randomBytes(32).toString("hex");
}

// Razmjenjuje autorizacijski kod za ORCID pristupni token
async function exchangeCodeForToken(code) {
  const body = new URLSearchParams({
    client_id: process.env.ORCID_CLIENT_ID,
    client_secret: process.env.ORCID_CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.ORCID_REDIRECT_URI,
  });

  const response = await fetch(process.env.ORCID_TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error("ORCID nije prihvatio autorizacijski kod.");
  }

  return response.json();
}

// Dohvaća javno dostupno ime i prezime s ORCID profila
async function getPublicProfile(orcid, accessToken) {
  const url = `${process.env.ORCID_API_URL}/v3.0/${orcid}/person`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.orcid+json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Nije moguće dohvatiti ORCID profil.");
  }

  const data = await response.json();

  return {
    ime: data.name?.["given-names"]?.value || null,
    prezime: data.name?.["family-name"]?.value || null,
  };
}

module.exports = {
  createAuthorizationUrl,
  generateState,
  exchangeCodeForToken,
  getPublicProfile,
};
