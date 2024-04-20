import { useEffect, useState } from "react"

function App() {
  const [users, setUsers] = useState([]);
  const [toogle, setToogle] = useState(false);
  let arrayData = [];
  const fetchData = async () => {
    try {
      const response = await fetch("https://maroc-group-default-rtdb.firebaseio.com/user.json");
      if (response.ok) {
        const data = await response.json();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            // Convertir la chaîne JSON en objet JavaScript
            const userData = JSON.parse(data[key]);
            arrayData.push(userData)
          }
        }
        setUsers(arrayData)

      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const data = new FormData(e.target);
    var object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    fetch('https://maroc-group-default-rtdb.firebaseio.com/user.json', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)

    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle success response
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }


  return (
    <>
      <div className="h-screen	w-screen flex flex-col mt-5 items-center ">
        <h1 className="text-3xl text-center mt-3">Contact github groupe Maroc et autres</h1>
        <button className="border ronded  text-white px-4 bg-green-700 hover:bg-green-900">Form</button>
        <section className="flex flex-col">
         <form  onSubmit={(e) => handleSubmit(e)} className="mt-5">
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 mt-3" type="submit">Envoyer</button>
          </form>
      
          <div className="flex flex-row flex-wrap">
            {
              users.map((user) => (
                <article className="m-2 mt-5 border p-2 rounded" key={user.name + user + Math.random()}>
                  <h3 className="text-l font-bold flex flex-col items-center justify-center">{user.name}</h3>
                  <p>Discord : {user.discord}</p>
                  <p>Github : {user.github}</p>
                  <p>Linkedin : {user.linkedin}</p>
                </article>
              ))
            }

          </div>
        </section>

      </div>


    </>
  )
}

export default App
