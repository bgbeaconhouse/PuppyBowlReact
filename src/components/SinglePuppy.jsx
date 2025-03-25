import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const SinglePuppy = () => {
    const [singlePuppy, setSinglePuppy] = useState([]);
    const {id} = useParams()
    

useEffect(() => {
    async function getData() {
        try {
            const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2502-FTB-ET-WEB-FT/players/${id}`)
            const result = await response.json()
            console.log(result.data.player)
            setSinglePuppy(result.data.player)
        } catch (error) {
            setError(error)
        }
    }getData()
}, []);



    return ( 
        <article><div>Name: {singlePuppy.name} <div>Breed: {singlePuppy.breed}</div> Status: {singlePuppy.status}</div> <img src={singlePuppy.imageUrl} alt="{puppy.id}"></img></article>
     );
}
 
export default SinglePuppy;