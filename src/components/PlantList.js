import React, {useState, useEffect} from "react";
import PlantCard from "./PlantCard";

function PlantList() {
 const [plants,setPlants]=useState([])
  useEffect(()=>fetch (`http://localhost:6001/plants`)
  .then(res=>res.json())
  .then(data=>setPlants(data))
  .catch(error=>console.error('Error:',error)));
  function handleToggleStock(id){
    const updatedPlants=plants.map(plant=>plant.id===id? {...plant, instock:!plant.instock}:plant)
    setPlants(updatedPlants)
  }
  return (
    <ul className="cards">{plants.map(plant=>{
      return <PlantCard key={plant.id} name={plant.name} price={plant.cost}/>
    })}</ul>
  );
}

export default PlantList;
