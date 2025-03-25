import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllPuppies = () => {
    const [puppies, setPuppies] = useState([])
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [searchParam, setSearchParam ] = useState('')


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2502-FTB-ET-WEB-FT/players")
                const result = await response.json()
                
                setPuppies(result.data.players)
            } catch (error) {
                setError(error)
            }
        }fetchData()
    }, []);


   
    async function delData(id) {
        try {
          const response = await fetch (`https://fsa-puppy-bowl.herokuapp.com/api/2502-FTB-ET-WEB-FT/players/${id}`, {
            method: "DELETE",
          }

          );  if (response.ok) {
           
            setPuppies(puppies.filter((puppy) => puppy.id !== id));
          } else {
            console.error("Failed to delete puppy");
          }
        } catch (error) {
          setError(error);
        }
      }

      async function postData(name, breed, imageUrl) {
        try {
            const response = await fetch ("https://fsa-puppy-bowl.herokuapp.com/api/2502-FTB-ET-WEB-FT/players", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, breed, imageUrl})
            }
            ); const json = await response.json()
            
             setPuppies([...puppies, json.data.newPlayer])
            
             setName('')
                setBreed('')
                setImageUrl('')
               
                
        } catch (error) {
            setError(error)
        }
    }

    const puppiesToDisplay =
    searchParam ? puppies.filter((puppy) => puppy.name.toLowerCase().includes(searchParam)) :
    puppies

    return (
        <>
          <div>
            <label>
              Search: {" "}
              <input
                type="text"
                placeholder="search"
                onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
              />
            </label>
          </div>
      
          <h2>Create New Puppy</h2>
      
      <label>
        Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Breed: <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
      </label>
      <label>
        Image URL: <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <button className="submitButton" onClick={() => postData(name, breed, imageUrl)}>
        Submit
      </button>

          {puppiesToDisplay.map((puppy) => {
            return (
              <div key={puppy.id} className="list">
                {puppy.name}
                <button onClick={() => navigate(`/${puppy.id}`)}>See Details</button>
                <button onClick={() => delData(puppy.id)}>Delete</button>
              </div>
            );
          })}
      
          
        </>
      );
}
 
export default AllPuppies;