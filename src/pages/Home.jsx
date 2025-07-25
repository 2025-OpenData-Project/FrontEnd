//import { useNavigate } from "react-router-dom";
import Slide from "../components/Slide";
import LocationRcmd from "../components/LocationRcmd";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Slide />
      <LocationRcmd />
    </div>
  );
};

export default Home;
