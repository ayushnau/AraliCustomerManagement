import { DateTime } from "luxon";

export const API = `${import.meta.env.VITE_API_URL}/customers`;

export function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function fmtDate(iso) {
  return DateTime.fromISO(iso)
    .setZone("Asia/Kolkata")
    .toFormat("MMM dd");
}
