import { useEffect, useState } from "react";
import { NotificationsBell } from "@/components/notifications";
import startImg from "@/assets/screens/start.webp";
import homeImg from "@/assets/screens/home.webp";
import systemsImg from "@/assets/screens/systems.webp";
import sectionsImg from "@/assets/screens/sections.webp";
import allImg from "@/assets/screens/all.webp";

/** الشاشات المعتمدة: صور المستخدم الأصلية تُعرض كما هي مع مناطق نقر شفافة. */
export type ImageScreenKind = "start" | "home" | "systems" | "sections" | "all";

const W = 1672;
const H = 941;
type Spot = [number, number, number, number, string, string];

const SRC: Record<ImageScreenKind, string> = { start: startImg, home: homeImg, systems: systemsImg, sections: sectionsImg, all: allImg };

const side = (x2: number, ys: [number, string, string][]): Spot[] => ys.map(([y, a, l]) => [12, y, x2, y + 50, a, l]);

const SPOTS: Record<ImageScreenKind, Spot[]> = {
  start: [
    [604, 618, 1070, 704, "start", "ابدأ"],
    [418, 528, 1258, 594, "start", "ابدأ"],
  ],
  home: [
    ...side(235, [[157, "home", "الرئيسية"], [215, "energy", "الدراسات الهندسية"], [270, "energy", "الدراسة الاقتصادية"], [325, "quote", "عروض الأسعار"], [378, "products", "المنتجات والمنظومات"], [432, "products", "الأجهزة والمنتجات"], [488, "quote", "العملاء والطلبات"], [543, "quote", "المشاريع"], [598, "settings", "الإعدادات"], [866, "exit", "تسجيل الخروج"]]),
    [268, 478, 936, 646, "energy", "الدراسات الهندسية"],
    [950, 478, 1652, 646, "quote", "صمم منظومتك"],
    [268, 660, 936, 826, "products", "الأجهزة والمنتجات"],
    [950, 660, 1652, 826, "support", "خدماتنا واستشاراتنا"],
  ],
  systems: [
    ...side(255, [[133, "home", "الرئيسية"], [190, "energy", "الدراسات الهندسية"], [240, "energy", "الدراسة الاقتصادية"], [290, "quote", "عروض الأسعار"], [343, "products", "المنتجات والمخطوطات"], [395, "products", "الأجهزة والمنتجات"], [447, "quote", "العملاء والطلبات"], [500, "quote", "المشاريع"], [552, "settings", "الإعدادات"], [843, "exit", "تسجيل الخروج"]]),
    [296, 185, 352, 235, "exit", "خروج"],
    [636, 185, 694, 235, "settings", "الإعدادات"],
    [290, 267, 957, 520, "sys:com", "حلول المتاجر والشركات"],
    [975, 267, 1650, 520, "sys:res", "منظومات المنازل والفلل"],
    [290, 535, 957, 765, "sys:agr", "طاقة الآبار والمزارع"],
    [975, 535, 1650, 765, "sys:ind", "محطات المصانع والمنشآت"],
    [295, 780, 1650, 906, "sys:item", "طلب معدات فردية"],
  ],
  sections: [
    ...side(287, [[137, "home", "الرئيسية"], [193, "quote", "صمم منظومتك"], [250, "energy", "الدراسات الهندسية"], [305, "quote", "عروض الأسعار"], [360, "products", "المنتجات والمنظومات"], [416, "products", "الأجهزة والملحقات"], [472, "quote", "العملاء والطلبات"], [528, "quote", "المشاريع"], [583, "settings", "الإعدادات"], [836, "exit", "تسجيل الخروج"]]),
    [332, 254, 692, 304, "all", "كل المنتجات"],
    [718, 254, 1652, 304, "all", "بحث"],
    [332, 324, 790, 372, "all", "الشركات"],
    [332, 392, 978, 622, "cat:inverters", "الإنفرترات"],
    [998, 392, 1652, 622, "cat:panels", "الألواح الشمسية"],
    [332, 642, 978, 866, "cat:batteries", "البطاريات"],
    [998, 642, 1652, 866, "cat:storage", "أنظمة التخزين"],
  ],
  all: [
    ...side(250, [[125, "home", "الرئيسية"], [180, "energy", "الدراسات الهندسية"], [235, "energy", "الدراسة الاقتصادية"], [290, "quote", "عروض الأسعار"], [345, "products", "المنتجات والمنظومات"], [398, "products", "الأجهزة والمنتجات"], [452, "quote", "العملاء والطلبات"], [507, "quote", "المشاريع"], [560, "settings", "الإعدادات"], [838, "exit", "تسجيل الخروج"]]),
    [302, 138, 352, 188, "exit", "خروج"],
    [624, 138, 676, 188, "settings", "الإعدادات"],
    [296, 222, 1646, 272, "real-all", "بحث"],
    [296, 284, 750, 330, "real-all", "الشركات"],
    [296, 345, 964, 626, "real-all", "منتج"],
    [982, 345, 1650, 626, "real-all", "منتج"],
    [296, 640, 964, 888, "real-all", "منتج"],
    [982, 640, 1650, 888, "real-all", "منتج"],
  ],
};

/** يعرض الصور على شاشات الكمبيوتر فقط (عرض 1024 فأكثر). */
export function useDesktopScreens() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const f = () => setOn(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return on;
}

type Box = [number, number, number, number];
const BELL: Partial<Record<ImageScreenKind, Box>> = { home: [1396, 38, 1456, 98], all: [380, 130, 440, 192] };
const NAME: Partial<Record<ImageScreenKind, Box>> = { home: [1512, 44, 1634, 96] };
const pos = ([x1, y1, x2, y2]: Box) => ({ left: `${(x1 / W) * 100}%`, top: `${(y1 / H) * 100}%`, width: `${((x2 - x1) / W) * 100}%`, height: `${((y2 - y1) / H) * 100}%` });

export function ImageScreen({ kind, onAction, userName, isAdmin = false }: { kind: ImageScreenKind; onAction: (action: string) => void; userName?: string; isAdmin?: boolean }) {
  return (
    <div dir="ltr" className="fixed inset-0 z-40 grid place-items-center overflow-hidden bg-navy" data-image-screen={kind}>
      <div className="relative" style={{ width: `min(100vw, calc(100dvh * ${W} / ${H}))`, aspectRatio: `${W} / ${H}` }}>
        <img src={SRC[kind]} alt="" draggable={false} className="absolute inset-0 size-full select-none object-contain" />
        {SPOTS[kind].map(([x1, y1, x2, y2, action, label], i) => (
          <button
            key={i}
            type="button"
            aria-label={label}
            title={label}
            onClick={() => onAction(action)}
            className="absolute cursor-pointer rounded-lg !bg-transparent transition hover:!bg-card/10 focus-visible:outline-2 focus-visible:outline-gold"
            style={{ left: `${(x1 / W) * 100}%`, top: `${(y1 / H) * 100}%`, width: `${((x2 - x1) / W) * 100}%`, height: `${((y2 - y1) / H) * 100}%` }}
          />
        ))}
        {BELL[kind] && (
          <div className="absolute z-10 grid place-items-center bg-card" style={pos(BELL[kind]!)}>
            <NotificationsBell isAdmin={isAdmin} />
          </div>
        )}
        {NAME[kind] && (
          <div dir="rtl" className="absolute z-10 flex flex-col justify-center bg-card text-right font-bold leading-tight text-navy" style={{ ...pos(NAME[kind]!), fontSize: "min(0.9vw, 1.6dvh)" }}>
            <span>أهلاً وسهلاً</span>
            <span className="truncate">{userName || "مستخدم تجريبي"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
