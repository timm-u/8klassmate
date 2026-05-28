import React, { useMemo, useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, GraduationCap, Calculator, Shapes, BookOpen, Eye, EyeOff, Layers3, FileText } from "lucide-react";
import { motion } from "framer-motion";

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/,/g, ".")
    .replace(/\s+/g, "")
    .replace(/°/g, "")
    .replace(/cm²/g, "")
    .replace(/cm2/g, "")
    .replace(/cm/g, "")
    .replace(/€/g, "")
    .replace(/\*/g, "")
    .replace(/·/g, "")
    .replace(/²/g, "2")
    .replace(/³/g, "3");

const equalsAny = (value, answers) => {
  const n = normalize(value);
  return answers.some((a) => normalize(a) === n);
};

const SectionPill = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
    {children}
  </span>
);

function AngleLinesDiagram({ known = 65, label = "x" }) {
  return (
    <svg viewBox="0 0 420 210" className="w-full max-w-md rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <line x1="40" y1="155" x2="380" y2="155" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
      <line x1="210" y1="155" x2="315" y2="50" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
      <path d="M260 155 A50 50 0 0 0 245 120" fill="none" stroke="#2563eb" strokeWidth="4" />
      <text x="264" y="126" fontSize="22" fontWeight="700" fill="#2563eb">{known}°</text>
      <path d="M160 155 A50 50 0 0 1 245 120" fill="none" stroke="#f97316" strokeWidth="4" />
      <text x="156" y="118" fontSize="22" fontWeight="700" fill="#f97316">{label}</text>
      <circle cx="210" cy="155" r="5" fill="#0f172a" />
      <text x="122" y="185" fontSize="14" fill="#64748b">sirgnurk = 180°</text>
    </svg>
  );
}

function CircleAngleDiagram({ central = 120 }) {
  return (
    <svg viewBox="0 0 420 300" className="w-full max-w-md rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <circle cx="210" cy="150" r="105" fill="#f8fafc" stroke="#0f172a" strokeWidth="4" />
      <circle cx="210" cy="150" r="5" fill="#0f172a" />
      <circle cx="115" cy="195" r="5" fill="#0f172a" />
      <circle cx="305" cy="195" r="5" fill="#0f172a" />
      <circle cx="210" cy="45" r="5" fill="#0f172a" />
      <line x1="210" y1="150" x2="115" y2="195" stroke="#2563eb" strokeWidth="4" />
      <line x1="210" y1="150" x2="305" y2="195" stroke="#2563eb" strokeWidth="4" />
      <line x1="210" y1="45" x2="115" y2="195" stroke="#f97316" strokeWidth="4" />
      <line x1="210" y1="45" x2="305" y2="195" stroke="#f97316" strokeWidth="4" />
      <path d="M178 165 A36 36 0 0 1 242 165" fill="none" stroke="#2563eb" strokeWidth="4" />
      <text x="188" y="187" fontSize="21" fontWeight="700" fill="#2563eb">{central}°</text>
      <path d="M194 67 A28 28 0 0 1 226 67" fill="none" stroke="#f97316" strokeWidth="4" />
      <text x="224" y="75" fontSize="20" fontWeight="700" fill="#f97316">x</text>
      <text x="164" y="283" fontSize="14" fill="#64748b">piirdenurk = pool kesknurgast</text>
    </svg>
  );
}

function DiameterCircleDiagram() {
  return (
    <svg viewBox="0 0 420 300" className="w-full max-w-md rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <circle cx="210" cy="150" r="105" fill="#f8fafc" stroke="#0f172a" strokeWidth="4" />
      <circle cx="105" cy="150" r="5" fill="#0f172a" />
      <circle cx="315" cy="150" r="5" fill="#0f172a" />
      <circle cx="210" cy="45" r="5" fill="#0f172a" />
      <line x1="105" y1="150" x2="315" y2="150" stroke="#2563eb" strokeWidth="4" />
      <line x1="210" y1="45" x2="105" y2="150" stroke="#f97316" strokeWidth="4" />
      <line x1="210" y1="45" x2="315" y2="150" stroke="#f97316" strokeWidth="4" />
      <path d="M197 60 L210 73 L223 60" fill="none" stroke="#f97316" strokeWidth="4" />
      <text x="226" y="70" fontSize="22" fontWeight="700" fill="#f97316">x</text>
      <text x="168" y="176" fontSize="15" fill="#2563eb">diameeter</text>
      <text x="126" y="282" fontSize="14" fill="#64748b">diameetrile toetuv piirdenurk on 90°</text>
    </svg>
  );
}

function TrapezoidAreaDiagram({ top = 8, bottom = 14, height = 5, showHeight = true }) {
  return (
    <svg viewBox="0 0 480 300" className="w-full max-w-lg rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <polygon points="105,220 375,220 315,80 165,80" fill="#eef2ff" stroke="#0f172a" strokeWidth="4" strokeLinejoin="round" />
      {showHeight && <line x1="165" y1="80" x2="165" y2="220" stroke="#ef4444" strokeWidth="3" strokeDasharray="7 7" />}
      {showHeight && <path d="M165 205 L180 205 L180 220" fill="none" stroke="#ef4444" strokeWidth="3" />}
      <text x="225" y="65" fontSize="22" fontWeight="700" fill="#2563eb">{top} cm</text>
      <text x="222" y="252" fontSize="22" fontWeight="700" fill="#2563eb">{bottom} cm</text>
      {showHeight ? (
        <text x="178" y="155" fontSize="22" fontWeight="700" fill="#ef4444">{height} cm</text>
      ) : (
        <text x="178" y="155" fontSize="22" fontWeight="700" fill="#ef4444">h = ?</text>
      )}
      <text x="88" y="155" fontSize="17" fill="#64748b">haar</text>
      <text x="362" y="155" fontSize="17" fill="#64748b">haar</text>
    </svg>
  );
}

function TrapezoidAnglesDiagram({ angle = 70 }) {
  return (
    <svg viewBox="0 0 480 300" className="w-full max-w-lg rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <polygon points="95,220 385,220 315,80 165,80" fill="#f0fdf4" stroke="#0f172a" strokeWidth="4" strokeLinejoin="round" />
      <path d="M126 220 A31 31 0 0 0 109 193" fill="none" stroke="#2563eb" strokeWidth="4" />
      <text x="128" y="202" fontSize="22" fontWeight="700" fill="#2563eb">{angle}°</text>
      <path d="M176 80 A48 48 0 0 1 137 102" fill="none" stroke="#f97316" strokeWidth="4" />
      <text x="136" y="126" fontSize="24" fontWeight="700" fill="#f97316">x</text>
      <line x1="165" y1="80" x2="315" y2="80" stroke="#16a34a" strokeWidth="3" strokeDasharray="8 8" />
      <line x1="95" y1="220" x2="385" y2="220" stroke="#16a34a" strokeWidth="3" strokeDasharray="8 8" />
      <text x="180" y="275" fontSize="14" fill="#64748b">paralleelsete aluste samapoolsed nurgad: 180°</text>
    </svg>
  );
}

function SimilarTrianglesDiagram({ small = [4, 5, 6], largeKnown = 12 }) {
  return (
    <svg viewBox="0 0 560 310" className="w-full max-w-xl rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <polygon points="65,235 205,235 65,95" fill="#fff7ed" stroke="#0f172a" strokeWidth="4" strokeLinejoin="round" />
      <polygon points="310,235 520,235 310,25" fill="#ecfeff" stroke="#0f172a" strokeWidth="4" strokeLinejoin="round" />
      <text x="115" y="260" fontSize="21" fontWeight="700" fill="#f97316">{small[0]} cm</text>
      <text x="35" y="170" fontSize="21" fontWeight="700" fill="#f97316">{small[1]} cm</text>
      <text x="116" y="158" fontSize="21" fontWeight="700" fill="#f97316">{small[2]} cm</text>
      <text x="391" y="262" fontSize="21" fontWeight="700" fill="#0891b2">{largeKnown} cm</text>
      <text x="278" y="135" fontSize="21" fontWeight="700" fill="#0891b2">?</text>
      <text x="424" y="128" fontSize="21" fontWeight="700" fill="#0891b2">?</text>
      <text x="108" y="40" fontSize="16" fill="#64748b">väiksem kolmnurk</text>
      <text x="370" y="290" fontSize="16" fill="#64748b">sama kuju, suurem mõõt</text>
    </svg>
  );
}

const examSets = [
  {
    id: "exam1",
    name: "Proovieksam 1",
    subtitle: "Õppimiseks: põhireeglid ja lihtsamad arvud",
    questions: [
      { id: "e1_alg1", topic: "Algebra: üksliikmed", title: "Sarnaste liikmete koondamine", prompt: "Lihtsusta avaldis: 7x + 4x - 3x", answer: ["8x"], hint: "Kõigil liikmetel on sama täht x. Liida ainult kordajad: 7 + 4 - 3.", explanation: "7x, 4x ja -3x on sarnased liikmed, sest kõigil on sama täheosa x. Seega arvutame kordajad kokku: 7 + 4 - 3 = 8. Vastus on 8x." },
      { id: "e1_alg2", topic: "Algebra: üksliikmed", title: "Üksliikmete korrutamine", prompt: "Korruta ja lihtsusta: -2a² · 4a", answer: ["-8a3", "-8a^3", "-8a³"], hint: "Korruta arvud omavahel ja sama tähe astendajad liida: a² · a = a³.", explanation: "Kordajad: -2 · 4 = -8. Täheosa: a² · a = a³, sest sama alusega astmete korrutamisel astendajad liituvad. Vastus on -8a³." },
      { id: "e1_poly1", topic: "Algebra: hulkliikmed", title: "Sulgude avamine", prompt: "Ava sulud ja lihtsusta: 5(2x - 3) - 4x", answer: ["6x-15"], hint: "Korruta 5 mõlema sulus oleva liikmega, siis koonda x-liikmed.", explanation: "5(2x - 3) = 10x - 15. Siis 10x - 15 - 4x = 6x - 15. Vastus on 6x - 15." },
      { id: "e1_poly2", topic: "Algebra: hulkliikmed", title: "Hulkliikmete korrutamine", prompt: "Korruta: (x + 6)(x - 2)", answer: ["x2+4x-12", "x^2+4x-12", "x²+4x-12"], hint: "Korruta iga esimese sulu liige iga teise sulu liikmega.", explanation: "x·x = x², x·(-2) = -2x, 6·x = 6x, 6·(-2) = -12. Kokku x² - 2x + 6x - 12 = x² + 4x - 12." },
      { id: "e1_text1", topic: "Tekstülesanded", title: "Arvude leidmine", prompt: "Üks arv on teisest 9 võrra väiksem. Nende arvude summa on 45. Leia väiksem arv.", answer: ["18"], hint: "Olgu suurem arv x. Siis väiksem on x - 9. Võrrand: x + (x - 9) = 45.", explanation: "Võtame suurema arvu x-iks. Väiksem on x - 9. Võrrand x + (x - 9) = 45 annab 2x - 9 = 45, seega x = 27. Väiksem arv on 18." },
      { id: "e1_text2", topic: "Tekstülesanded", title: "Rahaülesanne", prompt: "Osteti 4 vihikut hinnaga 1,30 € ja 3 pastakat hinnaga 0,80 €. Kui palju maksti kokku?", answer: ["7.6", "7.60", "7,6", "7,60"], hint: "Leia vihikute koguhind ja pastakate koguhind eraldi, siis liida.", explanation: "Vihikud: 4 · 1,30 = 5,20 €. Pastakad: 3 · 0,80 = 2,40 €. Kokku 5,20 + 2,40 = 7,60 €." },
      { id: "e1_ang1", topic: "Nurgad", title: "Kõrvunurgad sirgel", prompt: "Joonisel on kaks kõrvunurka sirgel. Üks nurk on 65°. Leia x.", answer: ["115"], hint: "Sirgnurk on 180°. Kõrvunurgad sellel sirgel annavad kokku 180°.", explanation: "Kuna nurgad moodustavad sirgnurga, on nende summa 180°. Seega x = 180° - 65° = 115°.", diagram: <AngleLinesDiagram known={65} /> },
      { id: "e1_ang2", topic: "Nurgad ringis", title: "Kesknurk ja piirdenurk", prompt: "Ringis on kesknurk 120°. Leia samale kaarele toetuv piirdenurk x.", answer: ["60"], hint: "Piirdenurk on pool sama kaare kesknurgast.", explanation: "Kui kesknurk ja piirdenurk toetuvad samale kaarele, siis piirdenurk on kesknurgast kaks korda väiksem. x = 120° : 2 = 60°.", diagram: <CircleAngleDiagram central={120} /> },
      { id: "e1_trap1", topic: "Trapets", title: "Trapetsi pindala", prompt: "Trapetsi alused on 14 cm ja 8 cm, kõrgus 5 cm. Leia pindala.", answer: ["55"], hint: "Trapetsi pindala valem: S = ((a + b) · h) / 2.", explanation: "S = ((14 + 8) · 5) / 2 = 22 · 5 / 2 = 55 cm². Valem kasutab aluste keskmist pikkust ja kõrgust.", diagram: <TrapezoidAreaDiagram top={8} bottom={14} height={5} /> },
      { id: "e1_trap2", topic: "Trapets", title: "Trapetsi nurgad", prompt: "Trapetsi alused on paralleelsed. Sama haara alumine nurk on 70°. Leia ülemine nurk x.", answer: ["110"], hint: "Sama haara samapoolsed sisenurgad annavad kokku 180°.", explanation: "Trapetsi alused on paralleelsed. Sama haara juures olevad sisenurgad on kokku 180°. Seega x = 180° - 70° = 110°.", diagram: <TrapezoidAnglesDiagram angle={70} /> },
      { id: "e1_sim1", topic: "Sarnased kujundid", title: "Sarnasustegur", prompt: "Väiksema kolmnurga küljed on 4 cm, 5 cm ja 6 cm. Suurema vastav lühim külg on 12 cm. Leia suurema kolmnurga pikim külg.", answer: ["18"], hint: "Leia sarnasustegur: 12 : 4. Seejärel korruta väiksema kolmnurga pikim külg sama arvuga.", explanation: "Sarnasustegur on 12 : 4 = 3. Väiksema pikim külg on 6 cm, seega suurema pikim külg on 6 · 3 = 18 cm.", diagram: <SimilarTrianglesDiagram small={[4,5,6]} largeKnown={12} /> },
      { id: "e1_sys1", topic: "Võrrandisüsteemid", title: "Liitmisvõte", prompt: "Lahenda süsteem. Sisesta x väärtus: x + y = 15 ja x - y = 5", answer: ["10"], hint: "Liida võrrandid kokku. +y ja -y kaovad ära.", explanation: "Liidame võrrandid: (x + y) + (x - y) = 15 + 5. Saame 2x = 20, seega x = 10. Siis y = 5." },
    ],
  },
  {
    id: "exam2",
    name: "Proovieksam 2",
    subtitle: "Kontrolliks: samad teemad, uued arvud ja natuke rohkem mõtlemist",
    questions: [
      { id: "e2_alg1", topic: "Algebra: üksliikmed", title: "Sarnased ja mittesarnased liikmed", prompt: "Lihtsusta: 9a - 4b + 3a + 7b", answer: ["12a+3b", "12a + 3b"], hint: "a-liikmed pane kokku a-liikmetega ja b-liikmed b-liikmetega.", explanation: "9a + 3a = 12a ja -4b + 7b = 3b. Erinevaid tähti ei tohi omavahel kokku liita. Vastus on 12a + 3b." },
      { id: "e2_alg2", topic: "Algebra: üksliikmed", title: "Astmetega korrutamine", prompt: "Korruta ja lihtsusta: 3x²y · (-5xy³)", answer: ["-15x3y4", "-15x^3y^4", "-15x³y⁴"], hint: "Korruta arvud. Sama tähe astendajad liida: x²·x ja y·y³.", explanation: "3 · (-5) = -15. x² · x = x³ ja y · y³ = y⁴. Vastus on -15x³y⁴." },
      { id: "e2_poly1", topic: "Algebra: hulkliikmed", title: "Miinus sulgude ees", prompt: "Ava sulud ja lihtsusta: 4(3x - 2) - 2(x + 5)", answer: ["10x-18", "10x - 18"], hint: "Ava mõlemad sulud eraldi. Teise sulu ees olev -2 muudab mõlemat märki.", explanation: "4(3x - 2) = 12x - 8. -2(x + 5) = -2x - 10. Kokku 12x - 8 - 2x - 10 = 10x - 18." },
      { id: "e2_poly2", topic: "Algebra: hulkliikmed", title: "Ruutude vahe", prompt: "Korruta: (a - 7)(a + 7)", answer: ["a2-49", "a^2-49", "a²-49"], hint: "See on kuju (a - b)(a + b), mille tulemus on a² - b².", explanation: "Keskmised liikmed +7a ja -7a kaovad ära. Jääb a² - 49. Seda nimetatakse ruutude vahe valemiks." },
      { id: "e2_text1", topic: "Tekstülesanded", title: "Vanuseülesanne", prompt: "Mari on 3 aastat vanem kui Jüri. Kokku on nad 27-aastased. Kui vana on Jüri?", answer: ["12"], hint: "Olgu Jüri vanus x. Mari vanus on x + 3.", explanation: "Kui Jüri on x, siis Mari on x + 3. Võrrand x + (x + 3) = 27 annab 2x = 24 ja x = 12. Jüri on 12-aastane." },
      { id: "e2_text2", topic: "Tekstülesanded", title: "Kiiruse ja teepikkuse ülesanne", prompt: "Jalgrattur sõitis 2 tunniga 34 km. Teisel tunnil sõitis ta 4 km rohkem kui esimesel tunnil. Mitu km sõitis ta esimesel tunnil?", answer: ["15"], hint: "Olgu esimesel tunnil x km. Teisel tunnil on x + 4 km.", explanation: "x + (x + 4) = 34. Seega 2x + 4 = 34, 2x = 30 ja x = 15. Esimesel tunnil sõitis ta 15 km." },
      { id: "e2_ang1", topic: "Nurgad", title: "Kõrvunurgad", prompt: "Joonisel on kaks kõrvunurka sirgel. Üks nurk on 123°. Leia x.", answer: ["57"], hint: "Sirgnurk on 180°.", explanation: "Kõrvunurgad sirgel annavad kokku 180°. x = 180° - 123° = 57°.", diagram: <AngleLinesDiagram known={123} /> },
      { id: "e2_ang2", topic: "Nurgad ringis", title: "Kesknurgast piirdenurgaks", prompt: "Ringis on kesknurk 86°. Leia samale kaarele toetuv piirdenurk x.", answer: ["43"], hint: "Piirdenurk on kesknurgast pool.", explanation: "x = 86° : 2 = 43°. Sama kaare piirdenurk on alati pool kesknurgast.", diagram: <CircleAngleDiagram central={86} /> },
      { id: "e2_trap1", topic: "Trapets", title: "Trapetsi pindala", prompt: "Trapetsi alused on 18 cm ja 10 cm, kõrgus 6 cm. Leia pindala.", answer: ["84"], hint: "S = ((a + b) · h) / 2.", explanation: "S = ((18 + 10) · 6) / 2 = 28 · 6 / 2 = 84 cm²." , diagram: <TrapezoidAreaDiagram top={10} bottom={18} height={6} /> },
      { id: "e2_trap2", topic: "Trapets", title: "Trapetsi nurk", prompt: "Trapetsi sama haara alumine nurk on 48°. Leia sama haara ülemine nurk x.", answer: ["132"], hint: "Sama haara nurgad paralleelsete aluste vahel annavad kokku 180°.", explanation: "x = 180° - 48° = 132°. Trapetsi paralleelsed alused tekitavad sama haara juurde samapoolsed sisenurgad.", diagram: <TrapezoidAnglesDiagram angle={48} /> },
      { id: "e2_sim1", topic: "Sarnased kujundid", title: "Sarnasustegur", prompt: "Väiksema kolmnurga küljed on 5 cm, 7 cm ja 9 cm. Suurema vastav lühim külg on 15 cm. Leia suurema kolmnurga pikim külg.", answer: ["27"], hint: "Sarnasustegur on 15 : 5.", explanation: "15 : 5 = 3. Väiksema kolmnurga pikim külg on 9 cm, seega suurema pikim külg on 9 · 3 = 27 cm.", diagram: <SimilarTrianglesDiagram small={[5,7,9]} largeKnown={15} /> },
      { id: "e2_sys1", topic: "Võrrandisüsteemid", title: "Lahutamisvõte", prompt: "Lahenda süsteem. Sisesta x väärtus: 2x + y = 17 ja x + y = 11. NB! Siin on kasulik võrrandid lahutada, mitte liita.", answer: ["6"], hint: "Eesmärk on üks tundmatu ära kaotada. Kuna mõlemas võrrandis on +y, siis lahutamisel y - y = 0.", explanation: "Võrrandisüsteemis ei pea alati võrrandeid liitma. Valime tehte selle järgi, mis kaotab ühe tundmatu ära. Siin on mõlemas võrrandis +y, seega lahutame teise võrrandi esimesest: (2x + y) - (x + y) = 17 - 11. Vasakul jääb 2x - x + y - y = x. Paremal jääb 6. Seega x = 6. Kontrolliks: kui x = 6, siis x + y = 11 annab y = 5, ja 2x + y = 12 + 5 = 17." },
    ],
  },
  {
    id: "exam3",
    name: "Proovieksam 3",
    subtitle: "Kinnitamiseks: segatud ülesanded ja eksamile sarnasem tunne",
    questions: [
      { id: "e3_alg1", topic: "Algebra: üksliikmed", title: "Mitme tähega üksliikmed", prompt: "Lihtsusta: 6xy - 2xy + 5x - 3x", answer: ["4xy+2x", "4xy + 2x"], hint: "xy-liikmeid ja x-liikmeid ei tohi omavahel liita.", explanation: "6xy - 2xy = 4xy. 5x - 3x = 2x. Kuna xy ja x pole sarnased liikmed, jääb vastuseks 4xy + 2x." },
      { id: "e3_alg2", topic: "Algebra: üksliikmed", title: "Jagamine üksliikmetega", prompt: "Lihtsusta: 18a³b² : 6ab", answer: ["3a2b", "3a^2b", "3a²b"], hint: "Jaga kordajad ja lahuta sama tähe astendajad.", explanation: "18 : 6 = 3. a³ : a = a² ja b² : b = b. Vastus on 3a²b." },
      { id: "e3_poly1", topic: "Algebra: hulkliikmed", title: "Hulkliikme ruut", prompt: "Korruta: (x - 4)². NB! Ruut tähendab, et sama sulg korrutatakse iseendaga.", answer: ["x2-8x+16", "x^2-8x+16", "x²-8x+16"], hint: "(x - 4)² tähendab (x - 4)(x - 4), mitte (x - 4)(x + 4). Viimane oleks ruutude vahe.", explanation: "(x - 4)² tähendab, et avaldis (x - 4) korrutatakse iseendaga: (x - 4)(x - 4). Seega x·x = x², x·(-4) = -4x, (-4)·x = -4x ja (-4)·(-4) = 16. Kokku x² - 4x - 4x + 16 = x² - 8x + 16. Avaldis (x - 4)(x + 4) oleks hoopis ruutude vahe ja annaks x² - 16." },
      { id: "e3_poly2", topic: "Algebra: hulkliikmed", title: "Keerukam sulgude avamine", prompt: "Ava sulud ja lihtsusta: 3(2x + 5) - (x - 4)", answer: ["5x+19", "5x + 19"], hint: "Miinus sulgude ees muudab x - 4 kujuks -x + 4.", explanation: "3(2x + 5) = 6x + 15. -(x - 4) = -x + 4. Kokku 6x + 15 - x + 4 = 5x + 19." },
      { id: "e3_text1", topic: "Tekstülesanded", title: "Kahe ostu võrdlus", prompt: "Kaks pliiatsit ja üks vihik maksavad 4 €. Üks pliiats maksab 0,80 €. Kui palju maksab vihik?", answer: ["2.4", "2.40", "2,4", "2,40"], hint: "Kaks pliiatsit maksavad 2 · 0,80 €. Lahuta see 4 eurost.", explanation: "Kaks pliiatsit maksavad 2 · 0,80 = 1,60 €. Vihik maksab 4,00 - 1,60 = 2,40 €." },
      { id: "e3_text2", topic: "Tekstülesanded", title: "Võrrandiga tekstülesanne", prompt: "Arvust võeti ära 7 ja tulemus korrutati 3-ga. Saadi 24. Leia arv.", answer: ["15"], hint: "Kirjuta võrrand: 3(x - 7) = 24.", explanation: "Kui arv on x, siis pärast 7 lahutamist on x - 7. See korrutati 3-ga: 3(x - 7) = 24. Jagame 3-ga: x - 7 = 8, seega x = 15." },
      { id: "e3_ang1", topic: "Nurgad", title: "Kolmnurga nurk", prompt: "Kolmnurga kaks nurka on 72° ja 38°. Leia kolmas nurk.", answer: ["70"], hint: "Kolmnurga sisenurkade summa on 180°.", explanation: "Kolmas nurk = 180° - 72° - 38° = 70°. Iga kolmnurga sisenurgad annavad kokku 180°." },
      { id: "e3_ang2", topic: "Nurgad ringis", title: "Diameetrile toetuv nurk", prompt: "Kolmnurk on ringi sees ning üks külg on ringi diameeter. Leia selle külje vastasnurk x.", answer: ["90"], hint: "Diameetrile toetuv piirdenurk on alati täisnurk.", explanation: "Kui kolmnurga üks külg on ringi diameeter, siis selle külje vastasnurk on 90°. Seda nimetatakse Thalese teoreemiks.", diagram: <DiameterCircleDiagram /> },
      { id: "e3_trap1", topic: "Trapets", title: "Kõrguse leidmine pindalast", prompt: "Trapetsi pindala on 72 cm², alused on 10 cm ja 14 cm. Leia kõrgus.", answer: ["6"], hint: "Kasuta S = ((a + b) · h) / 2 ja asenda teadaolevad arvud.", explanation: "72 = ((10 + 14) · h) / 2 = 24h / 2 = 12h. Seega h = 72 : 12 = 6 cm.", diagram: <TrapezoidAreaDiagram top={10} bottom={14} height={6} showHeight={false} /> },
      { id: "e3_trap2", topic: "Trapets", title: "Võrdhaarse trapetsi nurgad", prompt: "Võrdhaarse trapetsi üks alumine nurk on 65°. Leia üks ülemine nurk.", answer: ["115"], hint: "Sama haara nurgad annavad kokku 180°. Võrdhaarses trapetsis on alusenurgad võrdsed.", explanation: "Ülemine nurk sama haara juures on 180° - 65° = 115°. Võrdhaarses trapetsis on teise ülemise nurga väärtus samuti 115°." , diagram: <TrapezoidAnglesDiagram angle={65} /> },
      { id: "e3_sim1", topic: "Sarnased kujundid", title: "Sarnasuskülje leidmine", prompt: "Väiksema kolmnurga küljed on 4 cm, 7 cm ja 10 cm. Suurema vastav lühim külg on 12 cm. Leia suurema kolmnurga keskmine külg.", answer: ["21"], hint: "Sarnasustegur = 12 : 4 = 3. Seejärel korruta väiksema kolmnurga keskmine külg sama arvuga.", explanation: "Sarnasustegur on 12 : 4 = 3. Väiksema kolmnurga keskmine külg on 7 cm, seega suurema keskmine külg on 7 · 3 = 21 cm.", diagram: <SimilarTrianglesDiagram small={[4,7,10]} largeKnown={12} /> },
      { id: "e3_sys1", topic: "Võrrandisüsteemid", title: "Perimeetriülesanne", prompt: "Ristküliku ümbermõõt on 40 cm. Pikkus on 4 cm võrra suurem laiusest. Leia ristküliku pikkus.", answer: ["12"], hint: "Olgu laius x. Siis pikkus on x + 4. Ümbermõõdu valem: 2(x + x + 4) = 40.", explanation: "2(x + x + 4) = 40 → 2(2x + 4) = 40 → 4x + 8 = 40 → 4x = 32 → x = 8. Laius on 8 cm ja ristküliku pikkus on 8 + 4 = 12 cm." },
    ],
  },
];

const topicTips = [
  { title: "Algebra", icon: Calculator, text: "Sarnaseid liikmeid tohib kokku panna ainult siis, kui täheosa on täpselt sama. Sulgude avamisel korrutab sulgude ees olev arv iga liikmega." },
  { title: "Nurgad ja ring", icon: Shapes, text: "Sirgnurk on 180°, kolmnurgas on 180°, nelinurgas 360°. Ringis on piirdenurk pool sama kaare kesknurgast." },
  { title: "Trapets ja sarnasus", icon: BookOpen, text: "Trapetsi pindala: aluste summa korda kõrgus ja jagatud kahega. Sarnastel kujunditel on sama kuju ning vastavad küljed samas suhtes." },
];

export default function App() {
  const [activeExamId, setActiveExamId] = useState(examSets[0].id);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [showHints, setShowHints] = useState({});
  const [showSolutions, setShowSolutions] = useState(false);
  const [mode, setMode] = useState("exam");

  const activeExam = examSets.find((exam) => exam.id === activeExamId) ?? examSets[0];
  const questions = activeExam.questions;

  const reset = () => {
    setAnswers({});
    setChecked({});
    setShowHints({});
    setShowSolutions(false);
  };

  const selectExam = (id) => {
    setActiveExamId(id);
    setAnswers({});
    setChecked({});
    setShowHints({});
    setShowSolutions(false);
  };

  const results = useMemo(() => {
    const checkedIds = Object.keys(checked).filter((id) => checked[id]);
    const correct = checkedIds.filter((id) => {
      const q = questions.find((item) => item.id === id);
      return q && equalsAny(answers[id], q.answer);
    }).length;
    return { checkedCount: checkedIds.length, correct, total: questions.length };
  }, [answers, checked, questions]);

  const checkOne = (id) => setChecked((prev) => ({ ...prev, [id]: true }));
  const checkAll = () => {
    const all = {};
    questions.forEach((q) => (all[q.id] = true));
    setChecked(all);
  };

  const percent = Math.round((results.correct / results.total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900">
      <header className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15">
                <GraduationCap className="h-4 w-4" /> 8. klassi matemaatika
              </div>
              <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">Proovieksamid</h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">Algebra</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">Tekstulesanded</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">Nurgad</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">Trapets</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">Sarnasus</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">Vorrandisusteemid</span>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-5 text-slate-900 shadow-lg lg:min-w-72">
              <div className="text-sm font-semibold text-slate-500">{activeExam.name}</div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-5xl font-black">{results.correct}</div>
                <div className="pb-2 text-lg font-bold text-slate-500">/ {results.total}</div>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-slate-950 transition-all" style={{ width: `${percent}%` }} />
              </div>
              <div className="mt-2 text-sm text-slate-500">Kontrollitud: {results.checkedCount} ülesannet</div>
            </div>
          </div>
        </motion.div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-3">
          {topicTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div key={tip.title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100"><Icon className="h-5 w-5" /></div>
                <h2 className="text-lg font-black">{tip.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tip.text}</p>
              </div>
            );
          })}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-700"><Layers3 className="h-4 w-4" /> Vali ülesannete ports</div>
          <div className="grid gap-3 md:grid-cols-3">
            {examSets.map((exam) => (
              <button key={exam.id} onClick={() => selectExam(exam.id)} className={`rounded-2xl p-4 text-left ring-1 transition hover:scale-[1.01] ${activeExamId === exam.id ? "bg-slate-950 text-white ring-slate-950" : "bg-slate-50 text-slate-800 ring-slate-200 hover:bg-slate-100"}`}>
                <div className="font-black">{exam.name}</div>
                <div className={`mt-1 text-sm leading-5 ${activeExamId === exam.id ? "text-slate-300" : "text-slate-500"}`}>{exam.subtitle}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 flex flex-wrap items-center gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <button onClick={() => setMode(mode === "exam" ? "study" : "exam")} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:scale-[1.02]">
            {mode === "exam" ? "Lülita õpperežiimile" : "Lülita testirežiimile"}
          </button>
          <button onClick={checkAll} className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:scale-[1.02]">Kontrolli kõik</button>
          <button onClick={() => setShowSolutions((v) => !v)} className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-200">
            {showSolutions ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showSolutions ? "Peida lahendused" : "Näita lahendusi"}
          </button>
          <button onClick={reset} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50"><RotateCcw className="h-4 w-4" /> Alusta seda proovieksamit uuesti</button>
          <a href="./proovieksamid_vastused.html" className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50"><FileText className="h-4 w-4" /> Vastused ja lahenduskäigud</a>
          <div className="ml-auto text-sm text-slate-500">{mode === "exam" ? "Testirežiim: proovi enne ise." : "Õpperežiim: vihjed ja selgitused on kohe nähtavad."}</div>
        </section>

        <section className="mt-6 space-y-5">
          {questions.map((q, index) => {
            const isChecked = !!checked[q.id];
            const isCorrect = isChecked && equalsAny(answers[q.id], q.answer);
            const showHint = mode === "study" || showHints[q.id];
            const showExplanation = mode === "study" || showSolutions || isChecked;

            return (
              <motion.article key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.015, 0.25) }} className="overflow-hidden rounded-[1.7rem] bg-white shadow-sm ring-1 ring-slate-200">
                <div className="grid gap-6 p-5 lg:grid-cols-[1fr_420px] lg:p-6">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2"><SectionPill>{q.topic}</SectionPill><span className="text-sm font-bold text-slate-400">{activeExam.name} · Ülesanne {index + 1}</span></div>
                    <h3 className="text-xl font-black tracking-tight text-slate-950">{q.title}</h3>
                    <p className="mt-3 text-lg leading-8 text-slate-800">{q.prompt}</p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input value={answers[q.id] ?? ""} onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))} placeholder="Sisesta vastus..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 sm:max-w-xs" />
                      <button onClick={() => checkOne(q.id)} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:scale-[1.02]">Kontrolli</button>
                      <button onClick={() => setShowHints((prev) => ({ ...prev, [q.id]: !prev[q.id] }))} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 ring-1 ring-amber-200 transition hover:bg-amber-100"><HelpCircle className="h-4 w-4" /> Vihje</button>
                    </div>
                    {isChecked && (
                      <div className={`mt-4 flex items-start gap-3 rounded-2xl p-4 ${isCorrect ? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200" : "bg-rose-50 text-rose-900 ring-1 ring-rose-200"}`}>
                        {isCorrect ? <CheckCircle2 className="mt-0.5 h-5 w-5" /> : <XCircle className="mt-0.5 h-5 w-5" />}
                        <div><div className="font-black">{isCorrect ? "Õige!" : "Veel mitte päris."}</div>{!isCorrect && <div className="mt-1 text-sm">Vaata vihjet ja lahenduskäiku, siis proovi uuesti. Õige vastus: <b>{q.answer[0]}</b></div>}</div>
                      </div>
                    )}
                    {showHint && <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-950 ring-1 ring-amber-200"><b>Vihje:</b> {q.hint}</div>}
                    {showExplanation && <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 ring-1 ring-slate-200"><b>Selgitus:</b> {q.explanation}</div>}
                  </div>
                  <div className="flex items-center justify-center">
                    {q.diagram ? q.diagram : (
                      <div className="flex h-full min-h-52 w-full items-center justify-center rounded-2xl bg-slate-50 p-6 text-center ring-1 ring-slate-200">
                        <div><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"><Calculator className="h-5 w-5 text-slate-600" /></div><div className="text-sm font-bold text-slate-500">Kirjuta lahenduskäik paberile</div><div className="mt-1 text-xs leading-5 text-slate-400">See aitab vältida peast arvutamise vigu.</div></div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </section>

      </main>
    </div>
  );
}
