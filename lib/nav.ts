import type { SeasonId } from "./catalog";

export type NavLink = { label: string; href: string; note?: string; image?: string };
export type NavItem = { label: string; href: string; children?: NavLink[] };

const cdn = "https://cdn.shopify.com/s/files/1/0512/7523/5512";

/** Six top-level items, in order. Seasonal's label is swapped by date (see SEASON_LABELS). */
export const NAV: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Caramel Apples", href: "/shop/caramel-apples", note: "From $7.00", image: "/cutouts/i-like-apple-pie.webp" },
      {
        label: "Hand-Dipped Chocolates",
        href: "/shop/hand-dipped-chocolates",
        note: "Twists, rods, Oreos, boxes",
        image: `${cdn}/files/MountainMagicBites.png?v=1715798991`,
      },
      {
        label: "Strawberries",
        href: "/shop/chocolate-covered-strawberries",
        note: "Dipped to order",
        image: `${cdn}/files/ChocolateCoveredStrawberries.jpg?v=1770148059`,
      },
      {
        label: "Care Packages & Gift Baskets",
        href: "/shop/care-packages",
        note: "Shipping included",
        image: `${cdn}/files/HappyBirthdayCarePackage.jpg?v=1770069058`,
      },
      { label: "Seasonal", href: "/shop/seasonal", note: "seasonal" },
    ],
  },
  { label: "Caramel Apple Club", href: "/caramel-apple-club" },
  {
    label: "Gifting",
    href: "/gifting",
    children: [
      { label: "Corporate Gifting", href: "/gifting/corporate", note: "Logo chocolates & client gifts" },
      { label: "Care Packages", href: "/shop/care-packages", note: "Shipped, all-in-one" },
      { label: "Chocolate-Dipped Wine Bottles", href: "/gifting/wine-bottles", note: "Bring a bottle, $29.98" },
      { label: "Custom Photo Treats", href: "/gifting/custom-photo-treats", note: "Your photo on an Oreo" },
    ],
  },
  {
    label: "Experiences",
    href: "/experiences",
    children: [
      { label: "Private Parties", href: "/experiences/private-parties", note: "Junior Chocolatier, ages 6+" },
      { label: "Kids' Workshops", href: "/experiences/kids-workshops", note: "$25 a seat, ages 5+" },
    ],
  },
  { label: "Fundraising", href: "/fundraising" },
  { label: "Visit", href: "/visit" },
];

export const SECONDARY: NavLink[] = [
  { label: "Journal", href: "/journal" },
  { label: "Allergy Info", href: "/allergy-info" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SEASON_LABELS: Record<SeasonId, string> = {
  halloween: "Halloween",
  christmas: "Christmas",
  valentines: "Valentine's Day",
  spring: "Easter & Mother's Day",
  graduation: "Graduation",
  summer: "Summer Favorites",
};
