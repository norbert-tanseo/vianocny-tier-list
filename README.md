# Vianočný tier list

Jednostránková komunitná appka na zoradenie vianočných filmov a rozprávok podľa kategórií. Frontend je static-friendly a pripravený pre Cloudflare Pages; odovzdané tier listy sa ukladajú do Cloudflare D1 cez Pages Function.

## Lokálne spustenie

```bash
npm run dev
```

Lokálny preview sleduje zmeny v `src/`, po uložení automaticky rebuildne stránku a otvorený browser refreshne cez live reload. Adresa je `http://localhost:4173`.

Ak je stránka otvorená bez Cloudflare Functions, zobrazí sa demo komunitné skóre. Pre lokálnu D1 databázu sa dá použiť Cloudflare Wrangler a `schema.sql`.

Lokálny statický preview neobsluhuje `/api/*`; formulár návrhov a prihlásenie do admina fungujú pri Cloudflare Pages Functions (alebo cez `wrangler pages dev`).

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Functions: hlasovanie, návrhy a chránené admin API v `functions/api/`

Po vytvorení D1 databázy `vianocny-tier-list` spusti `schema.sql` a nastav binding `DB` na Pages projekte. GitHub integration potom automaticky deployne každý push na produkčnú vetvu.

## Admin a návrhy

Admin je dostupný priamo na `/admin`; verejná stránka naň neodkazuje. API vyžaduje Cloudflare Pages secret `ADMIN_PASSWORD` (aspoň 12 znakov) a existujúci D1 binding `DB`. Heslo nikdy nedávaj do `wrangler.toml` ani do Gitu. Nastav ho v Cloudflare **Workers & Pages → vianocny-tier-list → Settings → Variables and Secrets → Add → Encrypt**, potom spusti nové nasadenie. Alternatíva cez Wrangler: `npx wrangler pages secret put ADMIN_PASSWORD --project-name vianocny-tier-list`.

Prihlasovacia session používa podpísaný `HttpOnly`, `SameSite=Strict` cookie platný 12 hodín. Po piatich chybných pokusoch sa prihlasovanie z danej IP pozastaví na 15 minút. Verejné návrhy sú obmedzené na päť za hodinu z jednej IP; ukladá sa len hash IP a názov návrhu s kategóriou. Návrhy možno v admin rozhraní označiť ako vybavené. Nové tabuľky sa vytvoria pri prvom použití; sú aj v `schema.sql`.

## Metodológia

Každý návštevník zoradí všetky filmy v jednej kategórii do tierov S–D a môže hlas uložiť pod menom alebo prezývkou. Počet titulov v jednom tiere nie je obmedzený; dôležité je, aby každý titul skončil práve v jednom tiere. Komunitné skóre je vážený priemer: S = 5, A = 4, B = 3, C = 2, D = 1. Kategórie sú Animáky, Americké, Československé, Britské & európske a Kultové & netradičné.

