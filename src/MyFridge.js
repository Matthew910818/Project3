import react, { useState, useContext } from 'react'
import { FridgeContext } from './FridgeContext';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'

function MyFridge(){
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { items: fridgeItems, setItems: setFridgeItems } = useContext(FridgeContext);
    const navigate = useNavigate();

    const handleAddItem = () => {
        if (itemName.trim() === '') return;

        const newItem = {
            name: itemName,
            quantity: quantity === '' ? 1 : quantity,
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
                <button
                    className='clear_fridge back_to_home'
                    onClick={() => navigate('/')}
                >
                    Back to home
                </button>
                <h1>My Fridge</h1>
                <button className='clear_fridge' onClick={() => setFridgeItems([])}> Clear Fridge </button>
            </div>

            <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '4rem',
                gap: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%'
                }}>
                    <input 
                        className='input_food_items' 
                        type="text" 
                        placeholder="Enter food item..." 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)}
                        style={{ 
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            width: '250px',
                            margin: 0
                        }}
                    />
                    <input 
                        type="text" 
                        value={quantity} 
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || (/^[1-9][0-9]*$/.test(value) || value === '0')) {
                                setQuantity(value === '' ? '' : Number(value));
                            }
                        }}
                        onBlur={() => {
                            if (quantity === '' || quantity === 0) {
                                setQuantity(1);
                            }
                        }}
                        style={{ 
                            padding: '0.5rem', 
                            width: '100px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            margin: 0
                        }}
                    />
                    <button 
                        onClick={handleAddItem} 
                        style={{ 
                            backgroundColor: '#FE4A50',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '15px',
                            cursor: 'pointer'
                        }}
                    >
                        Add Item     
                    </button>
                </div>

                <div style={{ 
                    width: '500px',
                    margin: '20px auto'
                }}>
                    {fridgeItems.map((item, index) => (
                        <div key={index} style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between', 
                            padding: '8px 12px',
                            marginBottom: '8px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ 
                                    marginRight: '12px',
                                    fontSize: '16px'
                                }}>
                                    🍽️
                                </span>
                                <span>
                                    {item.quantity} {item.name}
                                </span>
                            </div>
                            <button
                                style={{ 
                                    backgroundColor: '#FE4A50',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '15px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleRemoveItem(index)}
                            >
                                Remove Items
                            </button>
                        </div>
                    ))}
                </div>
                
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem' 
                }}>
                    <Link to="/recipes">
                        <button
                            style={{
                                backgroundColor: '#f06060',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                fontSize: '1rem',
                                borderRadius: '15px',
                                cursor: 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            Generate the Recipes
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MyFridge;