import { mkdirSync, writeFileSync } from "node:fs";
const palettes = {
  laranja: ["#ECAA66", "#FFF0D7", "#FAE5D9", "#CC8546"],
  preto: ["#3C3945", "#585460", "#E5E5F1", "#252430"],
  siames: ["#E9D5BC", "#51454C", "#E3EEDD", "#51454C"],
  branco: ["#FFFBF3", "#EFE7DB", "#F6E4ED", "#E1D8CD"],
  frajola: ["#44454C", "#FFFAEE", "#DFEBE8", "#2E3038"],
  cinza: ["#9C9FAB", "#D5D6DE", "#E8E1EF", "#737787"],
  escaminha: ["#4B3D3B", "#DC9A65", "#F3E6CE", "#C88A58"],
  rajado: ["#B09C87", "#E6D5BC", "#E7ECDA", "#685951"],
};
mkdirSync("public/images/cats", { recursive: true });
function catSvg([fur, accent, bg, stripe], coat, cozy = false) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 620">
  <defs><pattern id="grain" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".65" fill="#53404A" opacity=".045"/></pattern></defs>
  <rect width="600" height="620" fill="${bg}"/><rect width="600" height="620" fill="url(#grain)"/>
  <path d="M-40 470Q100 385 220 465T640 440V650H-40Z" fill="#FFFCF4" opacity=".65"/>
  <circle cx="475" cy="116" r="62" fill="#FFFCF4" opacity=".7"/>
  <g fill="none" stroke="#fffaf5" stroke-width="5" stroke-linecap="round" opacity=".8"><path d="m92 133 8-22 7 22 22 7-22 7-7 22-8-22-22-7Z"/><path d="m482 345 5-15 5 15 15 5-15 5-5 15-5-15-15-5Z"/></g>
  ${cozy ? '<rect x="45" y="60" width="175" height="220" rx="85" fill="#FFF9F0" opacity=".6"/><path d="M132 64V280M48 165H218" stroke="#E9D5C5" stroke-width="7"/>' : ""}
  <ellipse cx="302" cy="550" rx="177" ry="27" fill="#6B4B4C" opacity=".1"/>
  <g transform="${cozy ? "translate(22 40) scale(.91)" : "translate(0 0)"}">
  <path d="M390 512C511 523 505 370 462 383C428 393 483 465 404 465" fill="none" stroke="${fur}" stroke-width="43" stroke-linecap="round"/>
  <path d="M188 495C173 414 196 336 255 310L342 309C406 348 429 424 404 510Q300 552 188 495" fill="${fur}"/>
  <ellipse cx="299" cy="440" rx="65" ry="86" fill="${accent}" opacity="${coat === "siames" ? ".25" : ".75"}"/>
  <path d="M187 246 165 100Q220 102 259 160L354 155Q397 109 445 103L426 256" fill="${fur}" stroke="${fur}" stroke-width="14" stroke-linejoin="round"/>
  <path d="m184 127 19 94 44-48Z" fill="#DCA5A4"/><path d="m426 128-53 42 38 43Z" fill="#DCA5A4"/>
  <path d="M177 246C175 178 230 153 301 153S430 180 430 246C433 310 385 354 305 353S174 316 177 246" fill="${fur}"/>
  ${coat === "siames" ? `<ellipse cx="304" cy="267" rx="88" ry="76" fill="${accent}"/>` : ""}
  ${coat === "frajola" ? `<path d="M304 202C291 264 246 281 254 320Q303 362 351 320C357 283 321 251 304 202" fill="${accent}"/>` : ""}
  ${coat === "escaminha" ? `<path d="M341 159Q425 176 428 246L377 284Q333 250 341 159" fill="${accent}"/>` : ""}
  ${["laranja", "rajado", "cinza"].includes(coat) ? `<g fill="none" stroke="${stripe}" stroke-width="12" stroke-linecap="round"><path d="m273 165 10 36m23-39v33m24-30-9 36M182 255l33 9m-32 17 27 2m215-30-29 9m25 21-22 1"/></g>` : ""}
  <g fill="${coat === "preto" || coat === "siames" ? "#E1D995" : "#45443B"}"><ellipse cx="250" cy="254" rx="17" ry="21"/><ellipse cx="355" cy="254" rx="17" ry="21"/></g>
  <g fill="#29242A"><ellipse cx="252" cy="254" rx="7" ry="15"/><ellipse cx="353" cy="254" rx="7" ry="15"/></g>
  <g fill="#FFFFFF"><circle cx="256" cy="248" r="4"/><circle cx="357" cy="248" r="4"/></g>
  <ellipse cx="230" cy="286" rx="22" ry="10" fill="#F0A0A7" opacity=".5"/><ellipse cx="379" cy="286" rx="22" ry="10" fill="#F0A0A7" opacity=".5"/>
  <path d="M291 286Q303 279 316 286L304 297Z" fill="#CB828B"/>
  <path d="M304 296v10m0-1q-13 12-24 0m24 0q13 12 24 0" fill="none" stroke="${coat === "preto" ? "#D5CCD0" : "#65504E"}" stroke-width="3" stroke-linecap="round"/>
  <g stroke="${coat === "preto" ? "#A49AA7" : "#7C6460"}" stroke-width="2.5" opacity=".65" stroke-linecap="round"><path d="m216 293-70-9m69 22-68 11m244-24 72-9m-73 22 70 11"/></g>
  <path d="M239 454v76m119-76v76" fill="none" stroke="${stripe}" stroke-width="4" opacity=".4"/>
  <ellipse cx="234" cy="532" rx="46" ry="24" fill="${fur}"/><ellipse cx="362" cy="532" rx="46" ry="24" fill="${fur}"/>
  <path d="M242 348Q300 369 362 347" stroke="#A52F65" stroke-width="13" fill="none"/><path d="m301 363-12 13 14 17 13-17Z" fill="#F5CD83"/>
  </g>${cozy ? '<path d="M93 538Q287 486 484 539L470 598H112Z" fill="#C597B3"/><path d="M118 563H459" stroke="#E6BDCE" stroke-width="4" stroke-dasharray="10 12"/>' : ""}
  </svg>`;
}
for (const [coat, palette] of Object.entries(palettes)) {
  writeFileSync(`public/images/cats/${coat}.svg`, catSvg(palette, coat));
  writeFileSync(
    `public/images/cats/${coat}-cozy.svg`,
    catSvg(palette, coat, true),
  );
}
writeFileSync(
  "public/images/cats/placeholder.svg",
  catSvg(palettes.cinza, "cinza"),
);
writeFileSync(
  "public/favicon.svg",
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="20" fill="#F7AFCB"/><path d="M15 32V13l15 10h5l14-10v22c0 23-34 23-34-3" fill="#A52F65"/><g fill="#fff"><ellipse cx="25" cy="35" rx="2" ry="3"/><ellipse cx="40" cy="35" rx="2" ry="3"/><path d="m30 41 3 4 3-4Z"/></g></svg>',
);
console.log("17 ilustrações locais e favicon criados.");
