// Roast satu baris untuk jam alarm yang berdering Sabtu pagi.
// Entri make.fun: u-carbon-forge-snooze-button-roast-14cbafc6.
// Keluaran selalu sama di setiap eksekusi: tanpa tanggal, tanpa acak,
// tanpa jaringan, tanpa masukan luar. Teks ditulis ke direktori keluaran
// grader bila tersedia; ke sebelah berkas ini hanya bila tidak ada
// direktori keluaran (jalankan lokal saja). Folder skrip tidak pernah
// ditulis bila ada direktori keluaran: sandbox grader me-mount repo
// read-only, jadi tulis ke sana akan throw dan menggagalkan run.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FRAGMENTS = [
  "My alarm clock rang at 6 AM on a Saturday like it had a 7 AM meeting",
  "—",
  "buddy, your only job today is watching me sleep until noon.",
];

const ROAST = FRAGMENTS.join(" ");

function resolveDestinations(): string[] {
  const graderDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  if (existsSync(graderDir)) {
    return [join(graderDir, "entry.txt")];
  }
  const folder = dirname(fileURLToPath(import.meta.url));
  return [join(folder, "entry.txt")];
}

function writeOne(path: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, ROAST, "utf8");
}

function publishEntry(): void {
  for (const path of resolveDestinations()) {
    writeOne(path);
  }
  process.stdout.write(ROAST + "\n");
}

publishEntry();
