import { Link } from "react-router-dom";
import "./Users.css";
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
      <ul
        style={{
          listStyle: "none",
          fontSize: "3rem",
          lineHeight: "1.6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {users.map((user) => (
          <li key={user.id}>
            <Link
              to={`/users/${user.id}/${user.name}`}
              style={{ textDecoration: "none" }}
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul
        className="productList"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {products.map((product) => (
          <li
            key={product.id}
            className="product"
            style={{
              padding: "2rem",
              backgroundColor: "rgb(86, 193, 168)",
              color: "rgb(146, 243, 217)",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            <img
              src={product.imgurl}
              style={{ width: "100%", borderRadius: "2rem" }}
            ></img>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button onClick={() => onCartAdd(product.name)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Users;
