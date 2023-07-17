import { type Url } from "next/dist/shared/lib/router/router";

type NavbarLink = {
  key: number;
  name: String;
  description: String;
  href: Url
}