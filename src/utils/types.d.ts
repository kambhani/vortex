import { type Url } from "next/dist/shared/lib/router/router";

type Provider = {
  name: string;
  icons: [string, string];
  account: {
    name: string;
    email: string;
    emailVerified: string | null;
    image: string;
  }
}

type NavbarLink = {
  name: string;
  description: string;
  href: Url;
};

type FooterLink = {
  name: string;
  href: Url;
};
