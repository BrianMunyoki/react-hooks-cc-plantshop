import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
useEffect(() => {
  fetch("http://localhost:6001/plants")
    .then((res) => res.json())
    .then((data) => {
      const normalized = data.map((plant) => ({
        ...plant,
        inStock: plant.inStock ?? true,  
      }));
      setPlants(normalized);
    });
}, []);
function handleAddPlant(newPlant) {
  // strip inStock before sending
  const { name, image, price } = newPlant;

  fetch("http://localhost:6001/plants", {
    method: "POST",
    headers: { "Content-Type": "Application/JSON" },
    body: JSON.stringify({ name, image, price }),
  })
    .then((res) => res.json())
    .then((data) => setPlants([...plants, { ...data, inStock: true }]));
}

  function handleToggleStock(id) {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
      )
    );
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} onToggleStock={handleToggleStock} />
    </main>
  );
}

export default PlantPage;
