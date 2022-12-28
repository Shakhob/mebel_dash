import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/JWTAuthContext";
import MainRoutes from "./routes/MainRoutes";
const App = () => {
  const content = useRoutes(MainRoutes);

  // return <MainRoutes />;
  return <AuthProvider>{content}</AuthProvider>;
};

export default App;
