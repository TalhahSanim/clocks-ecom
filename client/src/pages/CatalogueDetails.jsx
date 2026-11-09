import { useNavigate, useParams } from "react-router-dom";
import form from "../styles/Form.module.css";
function CatalogueDetails() {
  const { id } = useParams();
  const { name } = useParams();

  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>
          Product #{id}: {name}
        </h1>
        <p>
          This is where you would "fetch" and show the details for the user.
        </p>
        <button className={form.button} onClick={() => navigate("/users")}>
          Back to All Users!
        </button>
      </div>
    </>
  );
}
export default CatalogueDetails;

// THis page will cbecome single product page as catalogue details page
