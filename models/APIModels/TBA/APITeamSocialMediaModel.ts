export interface APITeamSocialMedia {
  type:
    | "youtube"
    | "cdphotothread"
    | "imgur"
    | "facebook-profile"
    | "youtube-channel"
    | "twitter-profile"
    | "github-profile"
    | "instagram-profile"
    | "periscope-profile"
    | "gitlab-profile"
    | "grabcad"
    | "instagram-image"
    | "external-link"
    | "avatar";
  foreign_key: string;
  details?: Details;
  preferred?: boolean;
  direct_url?: string;
  view_url?: string;
}

export interface Details {
  [key: string]: string;
}
