import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fieldType, setFieldType] = useState("");
  const [newArray, setNewArray] = useState([...items]);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Produce");

  //Updating state for category selection in Form
  function handleNewCategory(event) {
    setNewCategory(event.target.value);
  }
  //Updating state for name input in Form
  function handleNewName(event) {
    setNewName(event.target.value)
  }

  // handling state for category filter
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  // handling state for name filter
  function onSearchChange(event) {
    setFieldType(event.target.value)
  }

  //Adding New Item Function
  function onItemFormSubmit(event) {
    event.preventDefault();
    if (newName === "") {
      alert("Enter An Item!")
    } else {
      const newItemObject = {
        id: newArray.length + 1,
        name: newName,
        category: newCategory
      }
      //newArray.concat(test)
      setNewArray(prevNewArray => prevNewArray.concat(newItemObject))
    }
  }

  const itemsToDisplay = newArray.filter((item) => {
    if (selectedCategory === "All") {
        return item.name.toLowerCase().includes(fieldType.toLowerCase());
        //DONT NEED THIS SINCE INCLUDES ALREADY HANDLES EMPTY STRINGS
      // if (fieldType === "") {
      // 
      // } else if (item.name.toLowerCase().includes(fieldType.toLowerCase())) {
      //   return true;
      // }
      
    } else{
      return selectedCategory === item.category && item.name.toLowerCase().includes(fieldType.toLowerCase())
    }
      //THERE IS ALSO A SHORTER WAY OF DOING THIS  ^^^^
    // else if (item.category === selectedCategory) {
    //   if (item.name.toLowerCase().includes(fieldType.toLowerCase())) {
    //     return true;
    //   }
    // }
  });

    //JUST SEARCH FUNCTIONALITY
  // const nameSearch = items.filter((item) => {
  //   if (fieldType === "") {
  //     return true;
  //   } else if (item.name.toLowerCase().includes(fieldType.toLowerCase())) {
  //     return true;
  //   }
  // })

  return (
    <div className="ShoppingList">
      <ItemForm
        newName={newName}
        handleNewName={handleNewName}
        newCategory={newCategory}
        handleNewCategory={handleNewCategory}
        onItemFormSubmit={onItemFormSubmit}

      />

      <Filter
        onCategoryChange={handleCategoryChange}
        search={fieldType}
        onSearchChange={onSearchChange}
      />

      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
