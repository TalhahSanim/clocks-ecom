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
  { name: "Oak Wall Clock", price: 89.99, category: "wall", stock: 30 },
  { name: "Brass Mantel Clock", price: 149.99, category: "mantel", stock: 15 },
  { name: "Retro Alarm Clock", price: 39.99, category: "alarm", stock: 60 },
  { name: "Pendulum Grandfather Clock", price: 899.99, category: "floor", stock: 5 },
  { name: "Minimalist Desk Clock", price: 49.99, category: "desk", stock: 45 },
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
  //TODO: setProductBySKU("SKU-001"),  { name: "Oak Wall Clock", price: 89.99, category: "wall", stock: 30 }
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
