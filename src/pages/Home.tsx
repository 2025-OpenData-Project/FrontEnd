import Slide from "../components/Slide";
import LocationRcmd from "../components/LocationRcmd";
import HomeTourList from "../components/homeC/HomeTourList";
import HomeQnA from "../components/homeC/HomeQnA";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Slide />
      <LocationRcmd />
      <HomeTourList />
      <HomeQnA />
    </div>
  );
};

export default Home;
