import { type NavbarLink } from "~/utils/types";

// The list of OAuth providers currently supported
export const providers = {
  "discord": {
    name: "Discord",
    icons: ["/icons/discord-mark-blue.svg", "/icons/discord-mark-white.svg"],
    account: {
      name: "username",
      email: "email",
      emailVerified: "verified",
      image: "image_url"
    }
  },
  "google": {
    name: "Google",
    icons: ["/icons/google-g-logo.svg", "/icons/google-g-logo.svg"],
    account: {
      name: "name",
      email: "email",
      emailVerified: "email_verified",
      image: "picture"
    }
  },
  "github": {
    name: "GitHub",
    icons: ["/icons/github-mark.svg", "/icons/github-mark-white.svg"],
    account: {
      name: "login",
      email: "email",
      emailVerified: null, // GitHub does not currently send an email verified indicator
      image: "avatar_url"
    }
  },
  "zoom": {
    name: "Zoom",
    icons: ["/icons/app-icon_ZM_container-RGB.svg", "/icons/app-icon_ZM_container-RGB.svg"],
    account: {
      name: "display_name",
      email: "email",
      emailVerified: "verified", // Does not work for users who created a Zoom account via SSO, see https://devforum.zoom.us/t/how-to-determine-if-a-zoom-user-actually-owns-their-email-address/44430
      image: "pic_url" // Will not exist if the user does not have a profile picture
    }
  }
};

// The list of links in the navbar
export const links: NavbarLink[] = [
  {
    key: 0,
    name: "Problems",
    description: "The complete collection of problems available. Try one, if you so dare.",
    href: "/problems"
  },
  {
    key: 1,
    name: "Contests",
    description: "Looking to prove yourself in real-time? Look no further.",
    href: "/contests"
  },
  {
    key: 2,
    name: "Leaderboards",
    description: "View the best of the best. Don't expect to see your name on it though.",
    href: "/leaderboards"
  },
  {
    key: 3,
    name: "Blog",
    description: "A look into the minds of the creators. A vauable journey, or so I'm told.",
    href: "/blog"
  }
];