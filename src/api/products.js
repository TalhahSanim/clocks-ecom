import {
  doc,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const sampleProducts = [
  { name: "Classic Tee", price: 74.99, category: "apparel", stock: 50 },
  { name: "Denim Jacket", price: 54.99, category: "apparel", stock: 45 },
  { name: "Canvas Tote Bag", price: 74.99, category: "acessories", stock: 88 },
  { name: "Wool Beanie", price: 44.99, category: "acessories", stock: 43 },
  { name: "Running Sneakers", price: 66.99, category: "apparel", stock: 99 },
];

export async function seedProducts() {
  const productsRef = collection(db, "products");
  for (const product of sampleProducts) {
    const docRef = await addDoc(productsRef, {
      ...product,
      createdAt: new Date(),
    });
    console.log("Added product:", product.name, docRef.id);
  }
}
export async function setProductBySKU(sku, product) {
  //TODO: setProductBySKU("SKU-001"),  { name: "Classic Tee", price: 74.99, category: "apparel", stock: 50 }
  await setDoc(doc(db, "products", sku), product);
}

export async function decrementStock(productId, quantityPurchased) {
  const productRef = doc(db, "products", productId);

  await updateDoc(productRef, {
    stock: increment(-quantityPurchased),
  });
}

export async function removeDoc(productId) {
  await deleteDoc(doc(db, "products", productId));
}
