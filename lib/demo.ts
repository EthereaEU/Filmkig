import type { Locale } from "./i18n";
import type {
  Availability,
  Offer,
  Provider,
  ProviderInfo,
  TitleCardData,
  TitleDetails,
} from "./types";

/**
 * Demo dataset used when no TMDB API key is configured.
 * Ids are fictional (1000+) and only used internally - the UI works fully
 * offline so the site can be evaluated without credentials.
 */

export const demoProviders: ProviderInfo[] = [
  { id: 8, name: "Netflix", logoPath: null, displayPriority: 1 },
  { id: 76, name: "Viaplay", logoPath: null, displayPriority: 2 },
  { id: 383, name: "TV 2 Play", logoPath: null, displayPriority: 3 },
  { id: 337, name: "Disney+", logoPath: null, displayPriority: 4 },
  { id: 1899, name: "Max", logoPath: null, displayPriority: 5 },
  { id: 119, name: "Prime Video", logoPath: null, displayPriority: 6 },
  { id: 350, name: "Apple TV+", logoPath: null, displayPriority: 7 },
  { id: 1773, name: "SkyShowtime", logoPath: null, displayPriority: 8 },
  { id: 11, name: "MUBI", logoPath: null, displayPriority: 9 },
  { id: 305, name: "Filmstriben", logoPath: null, displayPriority: 10 },
  { id: 35, name: "Rakuten TV", logoPath: null, displayPriority: 11 },
  { id: 452, name: "SF Anytime", logoPath: null, displayPriority: 12 },
];

const providerById = new Map<number, Provider>(
  demoProviders.map((p) => [p.id, { id: p.id, name: p.name, logoPath: p.logoPath }])
);

interface DemoTitle {
  id: number;
  type: "movie" | "tv";
  danish: boolean;
  title: string;
  originalTitle: string;
  year: string;
  rating: number;
  voteCount: number;
  genres: { da: string[]; en: string[] };
  runtimeMinutes?: number;
  seasons?: number;
  episodes?: number;
  overviewDa: string;
  overviewEn: string;
  cast: string[];
  offers: Array<{ kind: Offer["kind"]; providerId: number }>;
}

export const demoTitles: DemoTitle[] = [
  {
    id: 1001,
    type: "movie",
    danish: true,
    title: "Druk",
    originalTitle: "Druk",
    year: "2020",
    rating: 7.7,
    voteCount: 3800,
    genres: { da: ["Drama", "Komedie"], en: ["Drama", "Comedy"] },
    runtimeMinutes: 117,
    overviewDa:
      "Fire gymnasielærere tester en teori om, at et konstant let promille-niveau gør livet bedre. Eksperimentet udvikler sig hurtigt i en uforudsigelig retning.",
    overviewEn:
      "Four high school teachers test a theory that maintaining a constant level of alcohol improves their lives. The experiment quickly takes an unpredictable turn.",
    cast: ["Mads Mikkelsen", "Thomas Bo Larsen", "Magnus Millang"],
    offers: [
      { kind: "flatrate", providerId: 76 },
      { kind: "free", providerId: 305 },
      { kind: "rent", providerId: 452 },
      { kind: "rent", providerId: 35 },
      { kind: "buy", providerId: 452 },
    ],
  },
  {
    id: 1002,
    type: "tv",
    danish: true,
    title: "Borgen",
    originalTitle: "Borgen",
    year: "2010",
    rating: 8.5,
    voteCount: 1200,
    genres: { da: ["Drama"], en: ["Drama"] },
    seasons: 4,
    episodes: 38,
    overviewDa:
      "Birgitte Nyborg bliver Danmarks første kvindelige statsminister og må balancere magt, medier og familieliv i og omkring Christiansborg.",
    overviewEn:
      "Birgitte Nyborg becomes Denmark's first female prime minister and must balance power, media and family life in and around Christiansborg.",
    cast: ["Sidse Babett Knudsen", "Birgitte Hjort Sørensen", "Pilou Asbæk"],
    offers: [{ kind: "flatrate", providerId: 8 }],
  },
  {
    id: 1003,
    type: "tv",
    danish: true,
    title: "Forbrydelsen",
    originalTitle: "Forbrydelsen",
    year: "2007",
    rating: 8.4,
    voteCount: 900,
    genres: { da: ["Krimi", "Drama", "Mysterium"], en: ["Crime", "Drama", "Mystery"] },
    seasons: 3,
    episodes: 40,
    overviewDa:
      "Kriminalassistent Sarah Lund efterforsker drabet på en ung kvinde i København - en sag, der trækker tråde ind i politik og familieliv.",
    overviewEn:
      "Detective Sarah Lund investigates the murder of a young woman in Copenhagen - a case that reaches into politics and family life.",
    cast: ["Sofie Gråbøl", "Søren Malling", "Lars Mikkelsen"],
    offers: [
      { kind: "flatrate", providerId: 76 },
      { kind: "buy", providerId: 452 },
    ],
  },
  {
    id: 1004,
    type: "movie",
    danish: false,
    title: "Dune: Part Two",
    originalTitle: "Dune: Part Two",
    year: "2024",
    rating: 8.2,
    voteCount: 6200,
    genres: { da: ["Sci-fi", "Eventyr"], en: ["Sci-Fi", "Adventure"] },
    runtimeMinutes: 166,
    overviewDa:
      "Paul Atreides forener sig med fremenene og søger hævn over de sammensvorne, der ødelagde hans familie.",
    overviewEn:
      "Paul Atreides unites with the Fremen and seeks revenge against the conspirators who destroyed his family.",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    offers: [
      { kind: "flatrate", providerId: 1899 },
      { kind: "rent", providerId: 35 },
      { kind: "rent", providerId: 452 },
      { kind: "buy", providerId: 119 },
    ],
  },
  {
    id: 1005,
    type: "movie",
    danish: false,
    title: "Oppenheimer",
    originalTitle: "Oppenheimer",
    year: "2023",
    rating: 8.1,
    voteCount: 9500,
    genres: { da: ["Drama", "Historie", "Thriller"], en: ["Drama", "History", "Thriller"] },
    runtimeMinutes: 180,
    overviewDa:
      "Historien om J. Robert Oppenheimer og udviklingen af atombomben under Anden Verdenskrig.",
    overviewEn:
      "The story of J. Robert Oppenheimer and the development of the atomic bomb during World War II.",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    offers: [
      { kind: "flatrate", providerId: 1773 },
      { kind: "rent", providerId: 452 },
      { kind: "buy", providerId: 119 },
    ],
  },
  {
    id: 1006,
    type: "tv",
    danish: false,
    title: "The Bear",
    originalTitle: "The Bear",
    year: "2022",
    rating: 8.5,
    voteCount: 4300,
    genres: { da: ["Drama", "Komedie"], en: ["Drama", "Comedy"] },
    seasons: 3,
    episodes: 28,
    overviewDa:
      "En ung Michelin-kok vender hjem til Chicago for at drive familiens kaotiske sandwichbar.",
    overviewEn:
      "A young fine-dining chef returns to Chicago to run his family's chaotic sandwich shop.",
    cast: ["Jeremy Allen White", "Ayo Edebiri", "Ebon Moss-Bachrach"],
    offers: [{ kind: "flatrate", providerId: 337 }],
  },
  {
    id: 1007,
    type: "tv",
    danish: false,
    title: "Andor",
    originalTitle: "Andor",
    year: "2022",
    rating: 8.5,
    voteCount: 3100,
    genres: { da: ["Sci-fi", "Action", "Drama"], en: ["Sci-Fi", "Action", "Drama"] },
    seasons: 2,
    episodes: 24,
    overviewDa:
      "Cassian Andors vej fra tøvende outsider til dedikeret rebel i årene op til Rogue One.",
    overviewEn:
      "Cassian Andor's path from hesitant outsider to dedicated rebel in the years leading up to Rogue One.",
    cast: ["Diego Luna", "Stellan Skarsgård", "Genevieve O'Reilly"],
    offers: [{ kind: "flatrate", providerId: 337 }],
  },
  {
    id: 1008,
    type: "tv",
    danish: false,
    title: "Severance",
    originalTitle: "Severance",
    year: "2022",
    rating: 8.4,
    voteCount: 2800,
    genres: { da: ["Drama", "Mysterium", "Sci-fi"], en: ["Drama", "Mystery", "Sci-Fi"] },
    seasons: 2,
    episodes: 19,
    overviewDa:
      "Medarbejdere hos Lumon Industries får deres hukommelse kirurgisk delt mellem arbejde og privatliv.",
    overviewEn:
      "Lumon Industries employees undergo a procedure that surgically divides their memories between work and personal life.",
    cast: ["Adam Scott", "Britt Lower", "Patricia Arquette"],
    offers: [{ kind: "flatrate", providerId: 350 }],
  },
  {
    id: 1009,
    type: "movie",
    danish: true,
    title: "Jagten",
    originalTitle: "Jagten",
    year: "2012",
    rating: 8.1,
    voteCount: 2400,
    genres: { da: ["Drama"], en: ["Drama"] },
    runtimeMinutes: 115,
    overviewDa:
      "En pædagog i en lille by bliver fejlagtigt beskyldt for overgreb, og hele lokalsamfundet vender sig mod ham.",
    overviewEn:
      "A kindergarten teacher in a small town is wrongly accused of abuse, and the entire community turns against him.",
    cast: ["Mads Mikkelsen", "Thomas Bo Larsen", "Annika Wedderkopp"],
    offers: [
      { kind: "flatrate", providerId: 383 },
      { kind: "free", providerId: 305 },
      { kind: "rent", providerId: 452 },
      { kind: "buy", providerId: 452 },
    ],
  },
  {
    id: 1010,
    type: "tv",
    danish: false,
    title: "The Last of Us",
    originalTitle: "The Last of Us",
    year: "2023",
    rating: 8.6,
    voteCount: 8900,
    genres: { da: ["Drama", "Action", "Sci-fi"], en: ["Drama", "Action", "Sci-Fi"] },
    seasons: 2,
    episodes: 16,
    overviewDa:
      "Tyve år efter en global pandemi skal den hårdføre Joel eskortere teenagepigen Ellie tværs over et ødelagt Amerika.",
    overviewEn:
      "Twenty years after a global pandemic, hardened survivor Joel must escort teenage girl Ellie across a devastated America.",
    cast: ["Pedro Pascal", "Bella Ramsey", "Anna Torv"],
    offers: [
      { kind: "flatrate", providerId: 1899 },
      { kind: "buy", providerId: 119 },
    ],
  },
  {
    id: 1011,
    type: "movie",
    danish: true,
    title: "Blinkende lygter",
    originalTitle: "Blinkende lygter",
    year: "2000",
    rating: 7.7,
    voteCount: 1500,
    genres: { da: ["Komedie", "Krimi", "Drama"], en: ["Comedy", "Crime", "Drama"] },
    runtimeMinutes: 109,
    overviewDa:
      "Fire småkriminelle gemmer sig i et nedlagt hus på Fyn og forsøger at starte et nyt liv som restauratører.",
    overviewEn:
      "Four petty criminals hide out in a derelict house on Funen and try to start a new life as restaurateurs.",
    cast: ["Søren Pilmark", "Mads Mikkelsen", "Ulrich Thomsen"],
    offers: [
      { kind: "flatrate", providerId: 76 },
      { kind: "free", providerId: 305 },
      { kind: "rent", providerId: 452 },
    ],
  },
  {
    id: 1012,
    type: "tv",
    danish: true,
    title: "Badehotellet",
    originalTitle: "Badehotellet",
    year: "2013",
    rating: 7.3,
    voteCount: 800,
    genres: { da: ["Drama", "Komedie"], en: ["Drama", "Comedy"] },
    seasons: 10,
    episodes: 66,
    overviewDa:
      "Sommerlivet på et badehotel i Nordjylland i slutningen af 1920'erne, hvor gæster og ansatte flettes sammen i kærlighed og intriger.",
    overviewEn:
      "Summer life at a seaside hotel in northern Jutland in the late 1920s, where guests and staff become entangled in love and intrigue.",
    cast: ["Amalie Dollerup", "Lars Ranthe", "Anne Louise Hassing"],
    offers: [
      { kind: "flatrate", providerId: 383 },
      { kind: "buy", providerId: 452 },
    ],
  },
  {
    id: 1013,
    type: "tv",
    danish: false,
    title: "Shōgun",
    originalTitle: "Shōgun",
    year: "2024",
    rating: 8.6,
    voteCount: 3600,
    genres: { da: ["Drama", "Historie", "Krig"], en: ["Drama", "History", "War"] },
    seasons: 1,
    episodes: 10,
    overviewDa:
      "En engelsk søfarer strandes i Japan i 1600-tallet og drages ind i lord Toranagas politiske spil.",
    overviewEn:
      "An English sailor is shipwrecked in 17th-century Japan and drawn into Lord Toranaga's political games.",
    cast: ["Hiroyuki Sanada", "Cosmo Jarvis", "Anna Sawai"],
    offers: [{ kind: "flatrate", providerId: 337 }],
  },
  {
    id: 1014,
    type: "tv",
    danish: true,
    title: "Broen",
    originalTitle: "Bron/Broen",
    year: "2011",
    rating: 8.6,
    voteCount: 1300,
    genres: { da: ["Krimi", "Mysterium", "Drama"], en: ["Crime", "Mystery", "Drama"] },
    seasons: 4,
    episodes: 38,
    overviewDa:
      "Et lig findes præcis på grænsen på Øresundsbroen, og danske Saga Norén og svenske Martin Rohde må samarbejde om efterforskningen.",
    overviewEn:
      "A body is found exactly on the border on the Øresund Bridge, forcing Danish Saga Norén and Swedish Martin Rohde to work together.",
    cast: ["Sofia Helin", "Kim Bodnia", "Thure Lindhardt"],
    offers: [
      { kind: "flatrate", providerId: 8 },
      { kind: "flatrate", providerId: 76 },
      { kind: "free", providerId: 305 },
    ],
  },
  {
    id: 1015,
    type: "movie",
    danish: true,
    title: "Riget: Exodus",
    originalTitle: "Riget Exodus",
    year: "2022",
    rating: 7.4,
    voteCount: 400,
    genres: { da: ["Drama", "Gyser", "Komedie"], en: ["Drama", "Horror", "Comedy"] },
    runtimeMinutes: 240,
    overviewDa:
      "Lars von Trier vender tilbage til Rigshospitalet, hvor søvngængeren Karen søger svar i hospitalets mørke gange.",
    overviewEn:
      "Lars von Trier returns to Rigshospitalet, where sleepwalker Karen seeks answers in the hospital's dark corridors.",
    cast: ["Bodil Jørgensen", "Ghita Nørby", "Nicolas Bro"],
    offers: [
      { kind: "free", providerId: 305 },
      { kind: "rent", providerId: 452 },
      { kind: "buy", providerId: 452 },
    ],
  },
];

function toCard(t: DemoTitle): TitleCardData {
  return {
    id: t.id,
    type: t.type,
    title: t.title,
    year: t.year,
    posterPath: null,
    backdropPath: null,
    rating: t.rating,
  };
}

export function demoSearch(query: string): TitleCardData[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return demoTitles
    .filter(
      (t) =>
        t.danish &&
        (t.title.toLowerCase().includes(q) ||
          t.originalTitle.toLowerCase().includes(q))
    )
    .map(toCard);
}

export function demoTrending(type: "movie" | "tv", limit = 10): TitleCardData[] {
  return demoTitles
    .filter((t) => t.danish && t.type === type)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
    .map(toCard);
}

export function demoByProvider(providerId: number, type: "movie" | "tv") {
  return demoTitles
    .filter(
      (t) =>
        t.danish &&
        t.type === type &&
        t.offers.some((o) => o.providerId === providerId)
    )
    .sort((a, b) => b.rating - a.rating)
    .map(toCard);
}

export function demoProvider(providerId: number): ProviderInfo | null {
  return demoProviders.find((p) => p.id === providerId) ?? null;
}

export function demoTitle(
  type: "movie" | "tv",
  id: number,
  locale: Locale
): TitleDetails | null {
  const t = demoTitles.find((d) => d.id === id && d.type === type);
  if (!t) return null;

  const offers: Offer[] = t.offers
    .map((o) => {
      const provider = providerById.get(o.providerId);
      return provider ? { kind: o.kind, provider } : null;
    })
    .filter((o): o is Offer => o !== null);

  const availability: Availability = {
    link: "https://www.justwatch.com/dk",
    offers,
  };

  return {
    ...toCard(t),
    originalTitle: t.originalTitle,
    tagline: null,
    overview: locale === "da" ? t.overviewDa : t.overviewEn,
    genres: locale === "da" ? t.genres.da : t.genres.en,
    runtimeMinutes: t.runtimeMinutes ?? null,
    seasons: t.seasons ?? null,
    episodes: t.episodes ?? null,
    voteCount: t.voteCount,
    cast: t.cast.map((name) => ({
      name,
      character: null,
      profilePath: null,
    })),
    availability,
  };
}

export function demoRecommendations(id: number): TitleCardData[] {
  const current = demoTitles.find((t) => t.id === id);
  if (!current) return [];
  return demoTitles
    .filter((t) => t.danish && t.id !== id && t.type === current.type)
    .slice(0, 6)
    .map(toCard);
}
