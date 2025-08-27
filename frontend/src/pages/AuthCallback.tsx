import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt_token = params.get("jwt_token");
    if (jwt_token) {
      localStorage.setItem("jwt_token", jwt_token); // save for later API calls
      navigate("/search"); 
    }
  }, [params, navigate]);

  return <p>Finishing login ...</p>;
}
