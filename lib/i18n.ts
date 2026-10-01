export const locales = ["da", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "da";

export const hasLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale);

export const localeNames: Record<Locale, string> = {
  da: "Dansk",
  en: "English",
};

/** TMDB `language` parameter for each UI locale. */
export const tmdbLanguage: Record<Locale, string> = {
  da: "da-DK",
  en: "en-US",
};

const da = {
  brand: "Filmkig",
  nav: {
    home: "Forside",
    watchlist: "Min liste",
    about: "Om Filmkig",
  },
  hero: {
    title: "Hvor kan jeg se det?",
    subtitle:
      "Søg på enhver film eller serie og se, hvor den kan streames, lejes eller købes — kun tjenester der virker i Danmark.",
    placeholder: "Søg fx \u201cDruk\u201d, \u201cBorgen\u201d eller \u201cDune\u201d\u2026",
  },
  search: {
    placeholder: "Søg efter film eller serie\u2026",
    ariaLabel: "Søg efter film eller serie",
    searching: "Søger\u2026",
    noResults: "Ingen resultater",
    noResultsHint: "Prøv et andet søgeord, eller tjek stavningen.",
    resultsFor: "Resultater for \u201c{q}\u201d",
    count: "{n} resultater",
    movie: "Film",
    tv: "Serie",
    popularNow: "Lige nu populært",
  },
  trending: {
    title: "Populært i Danmark",
    subtitle: "Det ser danskerne lige nu",
    movies: "Film",
    series: "Serier",
    seeAll: "Se alle",
  },
  services: {
    title: "Find efter tjeneste",
    subtitle: "Se hvad de største streamingtjenester i Danmark byder på",
    moviesOn: "Populære film på {name}",
    seriesOn: "Populære serier på {name}",
    notFound: "Tjenesten blev ikke fundet",
    poweredBy: "Viser de mest populære titler p.t.",
  },
  providers: {
    heading: "Hvor kan du se det?",
    subheading: "Tilgængelighed i Danmark",
    all: "Alle",
    flatrate: "Abonnement",
    ads: "Gratis m. reklamer",
    free: "Gratis",
    rent: "Lej",
    buy: "Køb",
    stream: "Stream",
    rentSection: "Lej",
    buySection: "Køb",
    freeSection: "Gratis",
    watchNow: "Se nu",
    unavailable: "Kan ikke ses lovligt i Danmark lige nu",
    unavailableHint:
      "Titlen er ikke på nogen dansk streamingtjeneste i øjeblikket. Gem den på din liste, og tjek igen senere — udbuddet ændrer sig hele tiden.",
    allOptions: "Alle muligheder på JustWatch",
    updatedDaily: "Tilgængelighed opdateres løbende",
    providerCount: "{n} tjenester",
    filterLabel: "Filtrer efter type",
  },
  detail: {
    movie: "Film",
    series: "Tv-serie",
    minRating: "{n} stemmer",
    runtime: "{n} min.",
    seasons: "{n} sæsoner",
    seasonOne: "1 sæson",
    episodes: "{n} afsnit",
    cast: "Medvirkende",
    overview: "Handling",
    moreLike: "Mere som dette",
    share: "Del",
    copied: "Link kopieret",
    addToList: "Gem på min liste",
    onList: "På min liste",
    originalTitle: "Original titel",
  },
  watchlist: {
    title: "Min liste",
    subtitle: "Film og serier du har gemt — gemmes kun i din browser",
    empty: "Din liste er tom",
    emptyHint: "Gem film og serier du vil se senere, så samler vi dem her.",
    browse: "Find noget at se",
    remove: "Fjern",
  },
  about: {
    title: "Om Filmkig",
    p1: "Filmkig er en gratis tjeneste, der viser hvor film og tv-serier lovligt kan ses i Danmark — stream, leje eller køb.",
    p2: "Filminformation og plakater kommer fra The Movie Database (TMDB). Streamingtilgængelighed leveres af JustWatch-data via TMDB og dækker udelukkende Danmark.",
    p3: "Filmkig hoster ikke selv indhold — vi linker til de officielle tjenester.",
  },
  errors: {
    notFoundTitle: "Siden findes ikke",
    notFoundHint: "Det du leder efter, findes ikke — eller er flyttet.",
    errorTitle: "Noget gik galt",
    errorHint: "Der opstod en fejl under indlæsningen. Prøv igen om et øjeblik.",
    tryAgain: "Prøv igen",
    backHome: "Til forsiden",
    apiMissing:
      "Demo-tilstand: Tilføj en TMDB API-nøgle for at se live data.",
  },
  footer: {
    tagline: "Find hvor du kan se film og serier lovligt i Danmark.",
    data: "Data fra",
    availability: "Streaminginfo via JustWatch",
    rights: "Filmkig viser kun lovlige danske kilder.",
  },
  theme: { light: "Lys", dark: "Mørk", toggle: "Skift tema" },
  lang: { label: "Sprog" },
};

const en: Dict = {
  brand: "Filmkig",
  nav: {
    home: "Home",
    watchlist: "My list",
    about: "About",
  },
  hero: {
    title: "Where can I watch it?",
    subtitle:
      "Search for any movie or series and see where it can be streamed, rented or bought — only services that work in Denmark.",
    placeholder: "Try \u201cDune\u201d, \u201cBorgen\u201d or \u201cThe Bear\u201d\u2026",
  },
  search: {
    placeholder: "Search for a movie or series\u2026",
    ariaLabel: "Search for a movie or series",
    searching: "Searching\u2026",
    noResults: "No results",
    noResultsHint: "Try a different title, or check the spelling.",
    resultsFor: "Results for \u201c{q}\u201d",
    count: "{n} results",
    movie: "Movie",
    tv: "Series",
    popularNow: "Popular right now",
  },
  trending: {
    title: "Trending in Denmark",
    subtitle: "What people are watching right now",
    movies: "Movies",
    series: "Series",
    seeAll: "See all",
  },
  services: {
    title: "Browse by service",
    subtitle: "See what the biggest streaming services in Denmark offer",
    moviesOn: "Popular movies on {name}",
    seriesOn: "Popular series on {name}",
    notFound: "Service not found",
    poweredBy: "Showing the most popular titles right now",
  },
  providers: {
    heading: "Where can you watch it?",
    subheading: "Availability in Denmark",
    all: "All",
    flatrate: "Subscription",
    ads: "Free with ads",
    free: "Free",
    rent: "Rent",
    buy: "Buy",
    stream: "Stream",
    rentSection: "Rent",
    buySection: "Buy",
    freeSection: "Free",
    watchNow: "Watch now",
    unavailable: "Not available legally in Denmark right now",
    unavailableHint:
      "This title isn\u2019t on any Danish streaming service at the moment. Save it to your list and check back later — availability changes all the time.",
    allOptions: "All options on JustWatch",
    updatedDaily: "Availability is updated regularly",
    providerCount: "{n} services",
    filterLabel: "Filter by type",
  },
  detail: {
    movie: "Movie",
    series: "TV series",
    minRating: "{n} votes",
    runtime: "{n} min",
    seasons: "{n} seasons",
    seasonOne: "1 season",
    episodes: "{n} episodes",
    cast: "Cast",
    overview: "Overview",
    moreLike: "More like this",
    share: "Share",
    copied: "Link copied",
    addToList: "Save to my list",
    onList: "On my list",
    originalTitle: "Original title",
  },
  watchlist: {
    title: "My list",
    subtitle: "Movies and series you have saved — stored in your browser only",
    empty: "Your list is empty",
    emptyHint: "Save movies and series you want to watch later, and we\u2019ll keep them here.",
    browse: "Find something to watch",
    remove: "Remove",
  },
  about: {
    title: "About Filmkig",
    p1: "Filmkig is a free service that shows where movies and TV series can be watched legally in Denmark — streaming, rental or purchase.",
    p2: "Movie information and posters come from The Movie Database (TMDB). Streaming availability is powered by JustWatch data via TMDB and covers Denmark only.",
    p3: "Filmkig does not host any content — we link to the official services.",
  },
  errors: {
    notFoundTitle: "Page not found",
    notFoundHint: "What you are looking for doesn\u2019t exist — or has moved.",
    errorTitle: "Something went wrong",
    errorHint: "An error occurred while loading. Please try again shortly.",
    tryAgain: "Try again",
    backHome: "Back to home",
    apiMissing: "Demo mode: add a TMDB API key to see live data.",
  },
  footer: {
    tagline: "Find where to watch movies and series legally in Denmark.",
    data: "Data from",
    availability: "Streaming info via JustWatch",
    rights: "Filmkig only shows legal Danish sources.",
  },
  theme: { light: "Light", dark: "Dark", toggle: "Toggle theme" },
  lang: { label: "Language" },
};

type Dict = typeof da;
export const dictionaries: Record<Locale, Dict> = { da, en };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}

/** Resolve a dotted key like "providers.flatrate" and interpolate {vars}. */
export function t(
  dict: Dict,
  key: string,
  vars?: Record<string, string | number>
): string {
  let value: unknown = dict;
  for (const part of key.split(".")) {
    value = (value as Record<string, unknown>)?.[part];
  }
  let str = typeof value === "string" ? value : key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}
