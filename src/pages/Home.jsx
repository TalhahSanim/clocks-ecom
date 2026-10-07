import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <title>Welcome to Parralel Store</title>
      <section>
        <div
          className="page"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ color: "white", textAlign: "center" }}>
            Pure style, zero effort
          </h2>
          <blockquote style={{ color: "white", textAlign: "center" }}>
            Discover premium daily wear made to move with you.
          </blockquote>
          <Link
            style={{
              backgroundColor: "rgb(49, 188, 153)",
              padding: "1.2rem",
              display: "inline-block",
              borderRadius: "0.3rem",
              textDecoration: "none",
              marginTop: "2rem",
              color: "rgb(173, 251, 230)",
              fontWeight: "bolder",
            }}
          >
            Browse Now
          </Link>
        </div>
      </section>
      {/* have the produc id in function call parameters */}
    </>
  );
};
export default Home;
