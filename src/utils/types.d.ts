import { type Url } from "next/dist/shared/lib/router/router";

type NavbarLink = {
  name: string;
  description: string;
  href: Url
}

type FooterLink = {
  name: string;
  href: Url;
}