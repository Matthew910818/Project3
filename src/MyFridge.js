import react, { useState } from 'react'
import './index.css'

function MyFridge(){
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [fridgeItems, setFridgeItems] = useState([]);

    const handleAddItem = () => {
        if (itemName.trim() === '') return;

        const newItem = {
            name: itemName,
            quantity: quantity,
            id: Date.now()
        };

        setFridgeItems([...fridgeItems, newItem]);
        setItemName('');
        setQuantity(1);
    }

    const handleRemoveItem = (idexToRemove) => {
        const updatedItems = (fridgeItems.filter((_, index) => index !== idexToRemove));
        setFridgeItems(updatedItems);
    }

    return (
        <div>
        <div className='green_header'>
            <button className='clear_fridge back_to_home'>Back to home</button>
            <h1>My Fridge</h1>
            <button className='clear_fridge' onClick={() => setFridgeItems([])}> Clear Fridge </button>
        </div>

        <div style={{ margin: '2rem'}}>
            <input className='input_food_items' type="text" placeholder="Enter food item..." value={itemName} onChange={(e) => setItemName(e.target.value)}
            style={{ marginLeft: '10px', padding: '0.5rem'}}
            />
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ marginLeft: '10px', padding: '0.5rem', width: '100px' }}
            />

            <button onClick={handleAddItem} className='clear_fridge' style={{ marginLeft: '10px', padding: '0.5rem' }}>Add Item     
            </button>
        </div>

        <ul>
            {fridgeItems.map((item, index) => (
                <li key={index}> 
                {item.quantity} {item.name}
                <button
                style ={{ marginLeft: '15px' }}
                onClick={() => handleRemoveItem(index)}
                >
                    Remove Items
                </button>
                </li>
            ))}
        </ul>
    </div>


    );
}

export default MyFridge;