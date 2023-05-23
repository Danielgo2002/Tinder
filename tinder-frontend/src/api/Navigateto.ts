import { useNavigate } from "react-router-dom";

export function NavigateTo(location: string) {
  const navigate = useNavigate();
  navigate(location);
}
