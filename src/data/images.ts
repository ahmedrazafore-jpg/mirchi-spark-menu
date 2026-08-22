import bbq from "@/assets/dish-bbq.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import broast from "@/assets/dish-broast.jpg";
import chowmein from "@/assets/dish-chowmein.jpg";
import karahi from "@/assets/hero-karahi.jpg";
import pasta from "@/assets/dish-pasta.jpg";
import rice from "@/assets/dish-rice.jpg";
import roll from "@/assets/dish-roll.jpg";
import soup from "@/assets/dish-soup.jpg";
import zinger from "@/assets/dish-zinger.jpg";

/** Category banner artwork. */
export const categoryImage: Record<string, string> = {
  "fast-food": zinger,
  roll: roll,
  "karahi-handi": karahi,
  bbq: bbq,
  biryani: biryani,
  chinese: rice,
};

/** Keyword → image, first match wins. Swap for real product photos later. */
const keywordImages: Array<[RegExp, string]> = [
  [/broast|fries/i, broast],
  [/sandwich/i, broast],
  [/burger|zinger/i, zinger],
  [/roll|paratha/i, roll],
  [/karahi|handi|katakat/i, karahi],
  [/biryani/i, biryani],
  [/soup/i, soup],
  [/pasta|spaghetti/i, pasta],
  [/chowmein|noodle/i, chowmein],
  [/rice/i, rice],
  [/tikka|boti|kabab/i, bbq],
];

export function itemImage(categoryId: string, itemName: string): string {
  for (const [re, img] of keywordImages) {
    if (re.test(itemName)) return img;
  }
  return categoryImage[categoryId] ?? karahi;
}
