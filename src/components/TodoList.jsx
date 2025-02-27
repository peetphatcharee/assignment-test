import { useState, useEffect } from "react";



const initialData = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

export default function App() {
  const [dataList, setDataList] = useState(initialData);
  const [fruitColumn, setFruitColumn] = useState([]);
  const [vegetableColumn, setVegetableColumn] = useState([]);

  const moveToColumn = (item) => {
    setDataList((prev) => prev.filter((i) => i.name !== item.name));
    if (item.type === "Fruit") {
      setFruitColumn((prev) => [...prev, item]);
    } else {
      setVegetableColumn((prev) => [...prev, item]);
    }

    setTimeout(() => moveBackToMain(item), 5000);
  };

  const moveBackToMain = (item) => {
    setDataList((prev) => {
      if (!prev.some((i) => i.name === item.name)) {
        return [...prev, item];
      }
      return prev;
    });
  
    if (item.type === "Fruit") {
      setFruitColumn((prev) => prev.filter((i) => i.name !== item.name));
    } else {
      setVegetableColumn((prev) => prev.filter((i) => i.name !== item.name));
    }
  };
  
  return (
    <div className="container">
      <div>
        <h3>Main List</h3>
        {dataList.map((item) => (
          <div
            key={item.name}
            className="button-wrapper"
            onClick={() => moveToColumn(item)}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div className="column-wrapper ms-5">
        <div className="column-header">Fruit Column</div>
        <div className="column-body">
          {fruitColumn.map((fruit) => (
            <div
              key={fruit.name}
              className="button-wrapper mt-1"
              onClick={() => moveBackToMain(fruit)}
            >
              {fruit.name}
            </div>
          ))}
        </div>
      </div>

      <div className="column-wrapper">
        <div className="column-header">Vegetable Column</div>
        <div className="column-body">
          {vegetableColumn.map((veg) => (
            <div
              key={veg.name}
              className="button-wrapper mt-1"
              onClick={() => moveBackToMain(veg)}
            >
              {veg.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
