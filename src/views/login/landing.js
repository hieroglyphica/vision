import "./landing.css";
import image1 from "../../images/space1.jpg";

const Landing = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundImage: `url(${image1})`,
        backgroundRepeat: "no-repeat",
        opacity: "1",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></div>
  );
};
export default Landing;
