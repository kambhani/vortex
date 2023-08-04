import type * as TYPES from "~/utils/types";

// The list of OAuth providers currently supported
export const providers: {[id: string]: TYPES.Provider} = {
  discord: {
    name: "Discord",
    icons: ["/icons/discord-mark-blue.svg", "/icons/discord-mark-white.svg"],
    account: {
      name: "username",
      email: "email",
      emailVerified: "verified",
      image: "image_url",
    },
  },
  google: {
    name: "Google",
    icons: ["/icons/google-g-logo.svg", "/icons/google-g-logo.svg"],
    account: {
      name: "name",
      email: "email",
      emailVerified: "email_verified",
      image: "picture",
    },
  },
  github: {
    name: "GitHub",
    icons: ["/icons/github-mark.svg", "/icons/github-mark-white.svg"],
    account: {
      name: "login",
      email: "email",
      emailVerified: null, // GitHub does not currently send an email verified indicator
      image: "avatar_url",
    },
  },
  zoom: {
    name: "Zoom",
    icons: [
      "/icons/app-icon_ZM_container-RGB.svg",
      "/icons/app-icon_ZM_container-RGB.svg",
    ],
    account: {
      name: "display_name",
      email: "email",
      emailVerified: "verified", // Does not work for users who created a Zoom account via SSO, see https://devforum.zoom.us/t/how-to-determine-if-a-zoom-user-actually-owns-their-email-address/44430
      image: "pic_url", // Will not exist if the user does not have a profile picture
    },
  },
};

// The list of links in the navbar
export const navbarLinks: TYPES.NavbarLink[] = [
  {
    name: "Problems",
    description:
      "The complete collection of problems available. Try one, if you so dare.",
    href: "/problems",
  },
  {
    name: "Contests",
    description: "Looking to prove yourself in real-time? Look no further.",
    href: "/contests",
  },
  {
    name: "Leaderboards",
    description:
      "View the best of the best. Don't expect to see your name on it though.",
    href: "/leaderboards",
  },
  {
    name: "Blog",
    description:
      "A look into the minds of the creators. A vauable journey, or so I'm told.",
    href: "/blog",
  },
];

// The list of links in the footer
export const footerLinks: TYPES.FooterLink[] = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Terms of Service",
    href: "/terms",
  },
  {
    name: "Privacy Policy",
    href: "/privacy",
  },
  {
    name: "Feedback",
    href: "/feedback",
  },
];

// The default text to display when creating a new problem
export const defaultProblemText = `# Your Problem Title Here

## Statement
This is where you describe your coding problem. The editor supports markdown, so you can **bold**, *italicize*, and ~~strikethrough~~ text. [Links](https://www.example.com) and \`inline code support\` are also offered. In case you dare go bolder, we also support the following:

- Lists
    1. Both unordered,
    2. And ordered
- Pretty neat, right!

> Block quotes, for that extra pizzazz

<!-- Comments like this that wont show up -->

\`\`\`
Code blocks
\`\`\`

Images, as shown below


![image](/favicon.ico)

Math mode (via KaTeX LaTeX), both inline (like $x^2$), and block, like
$$
\\int_1^{e}{\\frac{1}{x}}\\,dx
$$

Sanitized HTML, so your <script>alert("XSS");</script> attacks will go nowhere.

## Input
This is where you would describe the format of the expected input and output. The use of
\`\`\`
code blocks
\`\`\`
to detail these is encouraged.`;

// The list of languages that Vortex supports
export const languages = [
  {
    displayName: "C++",
    judge0Id: 54,
    monacoName: "cpp",
  },
  {
    displayName: "Java",
    judge0Id: 62,
    monacoName: "java",
  }
]

// The conversion from judge0 submission status code to status description
export const judge0StatusCode = [
  "In Queue",
  "Processing",
  "Accepted",
  "Wrong Answer",
  "Time Limit Exceeded",
  "Compilation Error",
  "Runtime Error (SIGSEGV)",
  "Runtime Error (SIGXFSZ)",
  "Runtime Error (SIGFPE)",
  "Runtime Error (SIGABRT)",
  "Runtime Error (NZEC)",
  "Runtime Error (Other)",
  "Internal Error",
  "Exec Format Error"
]
