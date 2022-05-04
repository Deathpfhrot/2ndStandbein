import Navigation from "./Navigagtions";

const DefaultPage = (props) => {
  return (
    <div>
      <Navigation />
      <h1>{props}</h1>
    </div>
  );
};

export default DefaultPage;
