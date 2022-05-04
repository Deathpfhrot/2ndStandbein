import { useEffect } from "react";
import { useState } from "react";

const Dashboard = () => {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1234/api/planes/all")
      .then((response) => response.json())
      .then((planesData) => setPlanes(planesData));
  }, []);

  return (
    <div>
      <header>
        <div>
          <h2>Username</h2>
          <p>MasterShop</p>
        </div>
        <h3>Dashboard</h3>
        <h3>Statics</h3>
        <h3>Products</h3>
        <h3>Messages</h3>
        <h3>Aids Campaign</h3>
        <div>
          <h3>Support</h3>
          <h3>Settings</h3>
        </div>
      </header>
      <main>
        <h1>Dashboard for Aiplanes</h1>
        <p></p>
        <section>
          <h2>Best Seller</h2>
          <article>
            <div key={planes[0]._id}>
              <h3>{planes[0].title}</h3>
              <h2>{planes[0].price}</h2>
              <h2>{planes[0].category}</h2>
              <p>{planes[0].description}</p>
              <p>{planes[0].variations}</p>
              <img src={planes[0].image} alt="random" />
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
