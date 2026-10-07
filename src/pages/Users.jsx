import { Link } from "react-router-dom";
import styles from "./Users.module.css";
const users = [
  { id: 1, name: "Ada Lovelace" },
  { id: 2, name: "Alan Turing" },
  { id: 3, name: "Grace Hopper" },
];

const products = [
  {
    id: 1,
    name: "String",
    imgurl:
      "https://www.bakerross.com.au/media/catalog/product/c/o/cotton-string-ag212a.jpg",
    price: "$10",
  },
  {
    id: 2,
    name: "Shirt",
    imgurl: "https://www.mxstore.com.au/assets/full/FL-HRDRM-c.jpg",
    price: "$20",
  },
  {
    id: 3,
    name: "Umbrella",
    imgurl: "https://ethercustom.com/cdn/shop/files/1630909335229.jpg",
    price: "$30",
  },
];

function Users({ onCartAdd }) {
  return (
    <>
      <h1>User List</h1>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.id}>
            <Link
              to={`/users/${user.id}/${user.name}`}
              className={styles.userLink}
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.id} className={styles.product}>
            <img
              src={product.imgurl}
              alt={product.name}
              className={styles.productImage}
            ></img>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button
              className={styles.button}
              onClick={() => onCartAdd(product.name)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Users;
