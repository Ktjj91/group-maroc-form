import { useEffect, useState } from "react";

import bgImage from "./assets/bg-image.jpg";
import logo from "./assets/logo.png";
import maroc from "./assets/maroc.png";

function App() {
  const [users, setUsers] = useState([]);
  const arrayData = [];
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://maroc-group-default-rtdb.firebaseio.com/user.json"
      );
      if (response.ok) {
        const data = await response.json();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            // Convertir la chaîne JSON en objet JavaScript
            const userData = JSON.parse(data[key]);
            arrayData.push(userData);
          }
        }
        setUsers(arrayData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });
    const json = JSON.stringify(object);
    fetch("https://maroc-group-default-rtdb.firebaseio.com/user.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Handle success response
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    alert(
      "Votre formulaire a été envoyé avec succès et oui c'est une alerte toute pourrie mais j'avais la flemme de faire une modale, désolé ! "
    );
    e.target.reset();
  };

  return (
    <>
      <div
        className="flex flex-col justify-between align-center items-center"
        style={{
          backgroundImage: "url(/src/assets/bg-image.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100" + "vh",
        }}
      >
        <h1
          style={{
            backgroundImage: `url(${maroc})`,
          }}
          className="text-5xl text-white text-center mt-3 bg-contain bg-no-repeat bg-center p-14 w-full bg-[#C1272D]"
        >
          MAROC 2024
        </h1>

        <div className="flex justify-center mx-auto w-[90%] flex-row flex-wrap">
          {users.map((user) => (
            <article
              className="m-2  flex flex-col bg-white rounded-lg mt-5 border p-2"
              key={user.name + user + Math.random()}
            >
              <h3 className="text-l font-bold flex flex-col items-center justify-center">
                {user.name}
              </h3>
              <p>Discord : {user.discord}</p>
              <a href={user.github}>Github : {user.github}</a>
              <a href={user.linkedin}>Linkedin : {user.linkedin}</a>
            </article>
          ))}
        </div>

        <section className="mx-5  flex w-[90%] mb-5 justify-between flex-wrap">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mt-5 h-fit bg-white w-full lg:w-1/4 rounded-xl shadow border p-5"
            style={{ minWidth: "300" + "px" }}
          >
            <div className="flex flex-col">
              <label htmlFor="name">Nom</label>
              <input className="border " name="name" type="text" />
            </div>
            <div className="mt-5 flex flex-col">
              <label htmlFor="github">Github</label>
              <input className="border" name="github" type="text" />
            </div>
            <div className="mt-5 flex flex-col">
              <label htmlFor="discord">Discord</label>
              <input className="border" type="text" name="discord" />
            </div>
            <div className="mt-5 flex flex-col">
              <label htmlFor="linkedin">Linkedin</label>
              <input className="border" type="text" name="linkedin" />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 mt-3"
              type="submit"
            >
              Envoyer
            </button>
          </form>
          <img src={logo} alt="" className="w-[25%] mx-auto lg:m-0" />
        </section>
      </div>
    </>
  );
}

export default App;
