// Run Once -> npm run seed
// copies clocks from Catalogoue.jsx -> into Firestore "products" collection
import "dotenv/config";
import { db } from "../config/db.js";

const products = [
  {
    id: 1,
    name: "Oak Wall Clock",
    imgurl:
      "https://images.unsplash.com/photo-1590587754330-6fc06e3a9bb7?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    price: "$89.99",
  },
  {
    id: 2,
    name: "Brass Mantel Clock",
    imgurl:
      "https://images.unsplash.com/photo-1579963824145-fc7a6fb4db82?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    price: "$149.99",
  },
  {
    id: 3,
    name: "Retro Alarm Clock",
    imgurl:
      "https://images.unsplash.com/photo-1415604934674-561df9abf539?q=80&w=3180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    price: "$39.84",
  },
  {
    id: 4,
    name: "Classic Round Wall Clock",
    imgurl:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=1200&auto=format&fit=crop",
    price: "$49.99",
  },
  {
    id: 5,
    name: "Vintage Clock Collection",
    imgurl:
      "https://images.unsplash.com/photo-1533749047139-189de3cf06d3?q=80&w=1200&auto=format&fit=crop",
    price: "$219.00",
  },
  {
    id: 6,
    name: "Antique Pocket Watch",
    imgurl:
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=1200&auto=format&fit=crop",
    price: "$129.50",
  },
  {
    id: 7,
    name: "Blue Sand Hourglass",
    imgurl:
      "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1200&auto=format&fit=crop",
    price: "$34.95",
  },
  {
    id: 8,
    name: "Monochrome Alarm Clock",
    imgurl:
      "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=1200&auto=format&fit=crop",
    price: "$29.99",
  },
  {
    id: 9,
    name: "Crystal Hourglass",
    imgurl:
      "https://images.unsplash.com/photo-1518281361980-b26bfd556770?q=80&w=1200&auto=format&fit=crop",
    price: "$44.00",
  },
  {
    id: 10,
    name: "Minimalist White Wall Clock",
    imgurl:
      "https://images.unsplash.com/photo-1616198814651-e71f960c3180?q=80&w=1200&auto=format&fit=crop",
    price: "$59.95",
  },
  {
    id: 11,
    name: "Gallery Clock Set",
    imgurl:
      "https://images.unsplash.com/photo-1643424975787-f134e78ecbc8?q=80&w=1200&auto=format&fit=crop",
    price: "$189.00",
  },
  {
    id: 12,
    name: "Distressed Roman Wall Clock",
    imgurl:
      "https://images.unsplash.com/photo-1602503497793-4094d8c53e88?q=80&w=1200&auto=format&fit=crop",
    price: "$74.50",
  },
  {
    id: 13,
    name: "Walnut Station Clock",
    imgurl:
      "https://images.unsplash.com/photo-1504197832061-98356e3dcdcf?q=80&w=1200&auto=format&fit=crop",
    price: "$94.99",
  },
  {
    id: 14,
    name: "Red Twin Bell Alarm Clock",
    imgurl:
      "https://images.unsplash.com/photo-1550534791-2677533605ab?q=80&w=1200&auto=format&fit=crop",
    price: "$32.50",
  },
  {
    id: 15,
    name: "Mini Bell Alarm Clock",
    imgurl:
      "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=1200&auto=format&fit=crop",
    price: "$24.99",
  },
  {
    id: 16,
    name: "Midnight Desk Clock",
    imgurl:
      "https://images.unsplash.com/photo-1456574808786-d2ba7a6aa654?q=80&w=1200&auto=format&fit=crop",
    price: "$54.00",
  },
  {
    id: 17,
    name: "Silver Dial Wristwatch",
    imgurl:
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200&auto=format&fit=crop",
    price: "$159.00",
  },
  {
    id: 18,
    name: "Industrial Metal Clock",
    imgurl:
      "https://images.unsplash.com/photo-1575203091586-611fe505bb0e?q=80&w=1200&auto=format&fit=crop",
    price: "$69.95",
  },
  {
    id: 19,
    name: "Steel Chronograph Watch",
    imgurl:
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=1200&auto=format&fit=crop",
    price: "$179.99",
  },
  {
    id: 20,
    name: "Roman Numeral Mantel Clock",
    imgurl:
      "https://images.unsplash.com/photo-1577436705536-4f2b677b1639?q=80&w=1200&auto=format&fit=crop",
    price: "$119.00",
  },
  {
    id: 21,
    name: "Farmhouse Wall Clock",
    imgurl:
      "https://images.unsplash.com/photo-1549190179-646f048c6108?q=80&w=1200&auto=format&fit=crop",
    price: "$64.99",
  },
  {
    id: 22,
    name: "Silver Bell Alarm Clock",
    imgurl:
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?q=80&w=1200&auto=format&fit=crop",
    price: "$36.95",
  },
  {
    id: 23,
    name: "Clock Tower Replica",
    imgurl:
      "https://images.unsplash.com/photo-1439754389055-9f0855aa82c2?q=80&w=1200&auto=format&fit=crop",
    price: "$249.00",
  },
  {
    id: 24,
    name: "Botanical Wall Clock",
    imgurl:
      "https://images.unsplash.com/photo-1633603125151-6a3c1a4778a5?q=80&w=1200&auto=format&fit=crop",
    price: "$57.50",
  },
  {
    id: 25,
    name: "Scandi Wall Clock",
    imgurl:
      "https://images.unsplash.com/photo-1524671470795-c7d181eca26e?q=80&w=1200&auto=format&fit=crop",
    price: "$62.00",
  },
  {
    id: 26,
    name: "Heritage Grayscale Clock",
    imgurl:
      "https://images.unsplash.com/photo-1512856246663-647a81ef198e?q=80&w=1200&auto=format&fit=crop",
    price: "$84.95",
  },
  {
    id: 27,
    name: "Two-Tone Wooden Wall Clock",
    imgurl:
      "https://images.unsplash.com/photo-1606674556490-c2bbb4ee05e5?q=80&w=1200&auto=format&fit=crop",
    price: "$79.99",
  },
  {
    id: 28,
    name: "Sunshine Yellow Clock",
    imgurl:
      "https://images.unsplash.com/photo-1592495981488-073153776d9a?q=80&w=1200&auto=format&fit=crop",
    price: "$27.95",
  },
  {
    id: 29,
    name: "Wooden Frame Hourglass",
    imgurl:
      "https://images.unsplash.com/photo-1499377193864-82682aefed04?q=80&w=1200&auto=format&fit=crop",
    price: "$39.00",
  },
  {
    id: 30,
    name: "Silver Link Watch",
    imgurl:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop",
    price: "$299.00",
  },
  {
    id: 31,
    name: "Grey Roman Alarm Clock",
    imgurl:
      "https://images.unsplash.com/photo-1536662788222-6927ce05daea?q=80&w=1200&auto=format&fit=crop",
    price: "$31.50",
  },
  {
    id: 32,
    name: "Mint Green Alarm Clock",
    imgurl:
      "https://images.unsplash.com/photo-1617299263454-3f1b584c89f3?q=80&w=1200&auto=format&fit=crop",
    price: "$28.99",
  },
];

// Guess a category from the name
function guessCategory(name) {
  const lowerCaseName = name.toLowerCase();
  if (lowerCaseName.includes("alarm")) return "alarm";
  if (lowerCaseName.includes("mantel")) return "mantel";
  if (lowerCaseName.includes("watch")) return "watch";
  if (lowerCaseName.includes("hourglass")) return "hourglass";
  if (lowerCaseName.includes("desk")) return "desk";
  if (lowerCaseName.includes("tower") || lowerCaseName.includes("grandfather"))
    return "floor";
  return "wall";
}

// for...of with await -> add clocks  one at a time in order
for (const product of products) {
  const refererence = await db.collection("products").add({
    name: product.name,
    description: `The official ${product.name.toLowerCase()}.`,
    category: guessCategory(product.name),
    price: Number(product.price.replace("$", "")), // $87.95 -> 87.95
    stock: 10,
    image: product.imgurl,
    createdAt: new Date(),
  });
  console.log(`Added ${product.name} (${refererence.id})`);
}

// close connection so script finishes
process.exit(0);
