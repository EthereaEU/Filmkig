export type MediaType = "movie" | "tv";

export interface TitleCardData {
  id: number;
  type: MediaType;
  title: string;
  year: string | null;
  posterPath: string | null;
  backdropPath: string | null;
  rating: number | null;
}

export interface Provider {
  id: number;
  name: string;
  logoPath: string | null;
}

/** How a title can be watched on a provider. */
export type OfferKind = "flatrate" | "ads" | "free" | "rent" | "buy";

export interface Offer {
  kind: OfferKind;
  provider: Provider;
}

export interface Availability {
  /** Deep link to the title on JustWatch/TMDB watch page (DK). */
  link: string | null;
  offers: Offer[];
}

export interface CastMember {
  name: string;
  character: string | null;
  profilePath: string | null;
}

export interface TitleDetails extends TitleCardData {
  originalTitle: string | null;
  tagline: string | null;
  overview: string | null;
  genres: string[];
  runtimeMinutes: number | null;
  seasons: number | null;
  episodes: number | null;
  voteCount: number | null;
  cast: CastMember[];
  availability: Availability;
}

export interface SearchSuggestion extends TitleCardData {}

export interface ProviderInfo extends Provider {
  displayPriority: number;
}
