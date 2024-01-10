import { APITeamSocialMedia } from "../models/APIModels/APITeamSocialMediaModel";
import { SocialProfile } from "../models/EmbedModels/TeamEmbedModel";

export function getSocialMediaProfile(
  profile: APITeamSocialMedia
): SocialProfile {
  let service, url;

  switch (profile.type) {
    // TODO -- account for other platforms
    case "youtube":
      service = "YouTube";
      url = `https://www.youtube.com/${profile.foreign_key}`;
      break;
    case "cdphotothread":
      service = "CD Photo Thread";
      break;
    case "imgur":
      service = "Imgur";
      break;
    case "facebook-profile":
      service = "Facebook";
      url = `https://www.facebook.com/${profile.foreign_key}`;
      break;
    case "youtube-channel":
      service = "YouTube Channel";
      url = `https://www.youtube.com/${profile.foreign_key}`;
      break;
    case "twitter-profile":
      service = "X/Twitter";
      url = `https://www.twitter.com/${profile.foreign_key}`;
      break;
    case "github-profile":
      service = "GitHub";
      url = `https://www.github.com/${profile.foreign_key}`;
      break;
    case "instagram-profile":
      service = "Instagram";
      url = `https://www.instagram.com/${profile.foreign_key}`;
      break;
    case "periscope-profile":
      service = "Periscope";
      break;
    case "gitlab-profile":
      service = "GitLab";
      url = `https://www.gitlab.com/${profile.foreign_key}`;
      break;
    case "grabcad":
      service = "GrabCAD";
      url = `https://www.grabcad.com/${profile.foreign_key}`;
      break;
    case "instagram-image":
      service = "Instagram Image";
      break;
    case "external-link":
      service = "External";
      url = profile.direct_url;
      break;
    case "avatar":
      service = "Avatar";
      break;
    default:
      service = "NA";
  }

  return { service, url, id: profile.foreign_key };
}
