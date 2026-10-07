import { useNavigate, useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  const { name } = useParams();

  const navigate = useNavigate();
  return (
    <>
      <div className="page">
        <h1>
          User #{id}: {name}
        </h1>
        <p>
          This is where you would "fetch" and show the details for the user.
        </p>
        <button onClick={() => navigate("/users")}>Back to All Users!</button>
      </div>
    </>
  );
}
export default UserDetail;
