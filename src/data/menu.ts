/**
 * Menu data — owner-editable.
 * Prices are in PKR exactly as printed on the Mirchi Point menu.
 * Add, rename or reprice items by editing the arrays below.
 */

export type MenuItem = {
  name: string;
  price: number;
  /** Optional portion label, e.g. "Half" / "Full". */
  portion?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "fast-food",
    label: "Fast Food",
    items: [
      { name: "New Crunch Burger", price: 350 },
      { name: "Supper Broast", price: 600 },
      { name: "Half Broast", price: 1200 },
      { name: "Zinger Burger", price: 480 },
      { name: "Zinger Burger Extra Mayo", price: 500 },
      { name: "Zinger Burger Cheese", price: 520 },
      { name: "Zinger Club Sandwich", price: 500 },
      { name: "Royal Club Sandwich", price: 550 },
      { name: "Barbeq Club Sandwich", price: 450 },
      { name: "Fries", price: 200 },
    ],
  },
  {
    id: "roll",
    label: "Roll",
    items: [
      { name: "Chicken Chatni Roll", price: 260 },
      { name: "Chicken Mayo Roll", price: 280 },
      { name: "Beef Sikh Kabab Roll", price: 240 },
      { name: "Chicken Seekh Kabab Roll", price: 220 },
      { name: "Zinger Roll", price: 300 },
      { name: "Chicken Cheese Roll", price: 300 },
      { name: "Paratha", price: 80 },
    ],
  },
  {
    id: "karahi-handi",
    label: "Karahi & Handi",
    items: [
      { name: "Special Chicken Butter Karahi", portion: "Half", price: 1200 },
      { name: "Special Chicken Butter Karahi", portion: "Full", price: 2400 },
      { name: "Butter Cheese Karahi", portion: "Half", price: 1300 },
      { name: "Butter Cheese Karahi", portion: "Full", price: 2600 },
      { name: "Makhni Handi", portion: "Half", price: 1150 },
      { name: "Makhni Handi", portion: "Full", price: 2250 },
      { name: "Special Mirchi Handi", portion: "Half", price: 1200 },
      { name: "Special Mirchi Handi", portion: "Full", price: 2400 },
      { name: "Spicy Gola Kabab Karahi", portion: "Half", price: 700 },
      { name: "Special Creamy Gola Kabab Karahi", portion: "Half", price: 800 },
      { name: "Chicken Peshawari Karahi", portion: "Half", price: 1000 },
      { name: "Chicken Peshawari Karahi", portion: "Full", price: 2000 },
      { name: "Chicken Karahi", portion: "Quarter Piece", price: 550 },
      { name: "Chicken Karahi", portion: "Half", price: 1000 },
      { name: "Chicken Karahi", portion: "Full", price: 2000 },
      { name: "White Karahi", portion: "Quarter Piece", price: 600 },
      { name: "White Karahi", portion: "Half", price: 1100 },
      { name: "White Karahi", portion: "Full", price: 2200 },
      { name: "Chicken Achari Karahi", portion: "Half", price: 1100 },
      { name: "Chicken Boneless Katakat", portion: "Plate", price: 600 },
    ],
  },
  {
    id: "bbq",
    label: "BBQ",
    items: [
      { name: "Chicken Tikka Chest", price: 450 },
      { name: "Chicken Malai Tikka", price: 600 },
      { name: "Chicken Green Tikka", price: 500 },
      { name: "Chicken Reshmi Boti Tikka", price: 480 },
      { name: "Chicken Boti", price: 380 },
      { name: "Chicken Malai Boti", price: 450 },
      { name: "Green Boti", portion: "Boneless", price: 420 },
      { name: "Chicken Bihari Boti", price: 400 },
      { name: "Chicken Reshmi Kabab", price: 320 },
      { name: "Chicken Gola Kabab", price: 360 },
      { name: "Beef Gola Kabab", price: 400 },
      { name: "Special Malai Kabab", portion: "Seekh", price: 450 },
    ],
  },
  {
    id: "biryani",
    label: "Biryani",
    items: [
      { name: "Mirchi Special Matka Biryani", portion: "Half kg", price: 500 },
      { name: "Mirchi Special Matka Biryani", portion: "1 kg", price: 850 },
    ],
  },
  {
    id: "chinese",
    label: "Chinese",
    items: [
      { name: "Special Mirchi Rice", price: 800 },
      { name: "Chicken Chops with Rice", price: 700 },
      { name: "Chicken Chili Dry with Rice", price: 700 },
      { name: "Chicken Chili with Rice", price: 700 },
      { name: "Chicken Manchurian with Rice", price: 700 },
      { name: "Chicken Chowmein", price: 650 },
      { name: "Singaporeian Rice", price: 750 },
      { name: "Chicken Fried Rice", price: 400 },
      { name: "Egg Fried Rice", price: 350 },
      { name: "Vegetables Fried Rice", price: 350 },
      { name: "Spaghetti", price: 650 },
      { name: "White Sauce Pasta", portion: "Half", price: 400 },
      { name: "White Sauce Pasta", portion: "Full", price: 800 },
      { name: "Penny Pasta", price: 400 },
      { name: "Cheese Pasta", price: 500 },
      { name: "Hot & Sour Soup", price: 350 },
      { name: "Chicken Soup", price: 350 },
      { name: "Vegetables Soup", price: 350 },
    ],
  },
];

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function fullItemName(item: MenuItem): string {
  return item.portion ? `${item.name} (${item.portion})` : item.name;
}

/** Featured / must-try picks — swap the ids/images when the owner sends real photos. */
export type FeaturedItem = {
  name: string;
  price: number;
  category: string;
  image: string;
};
