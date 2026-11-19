# Vianočný tier list

Jednostránková komunitná appka na zoradenie vianočných filmov a rozprávok podľa kategórií. Frontend je static-friendly a pripravený pre Cloudflare Pages; odovzdané tier listy sa ukladajú do Cloudflare D1 cez Pages Function.

## Lokálne spustenie

```bash
npm run build
npx serve dist
```

Ak je stránka otvorená bez Cloudflare Functions, zobrazí sa demo komunitné skóre. Pre lokálnu D1 databázu sa dá použiť Cloudflare Wrangler a `schema.sql`.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Functions endpoint: `functions/api/votes.js`

Po vytvorení D1 databázy `vianocny-tier-list` spusti `schema.sql` a nastav binding `DB` na Pages projekte. GitHub integration potom automaticky deployne každý push na produkčnú vetvu.

## Metodológia

Každý návštevník zoradí filmy v jednej kategórii do tierov S–D a môže hlas uložiť pod menom alebo prezývkou. Komunitné skóre je vážený priemer: S = 5, A = 4, B = 3, C = 2, D = 1. Kategórie sú Animáky, Americké, Československé a Ostatné.
