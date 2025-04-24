import react from 'react'
import './index.css'
function MyFridge(){
    return (
        <div>
        <div className='green_header'>
            <button className='clear_fridge back_to_home'>Back to home</button>
            <h1>My Fridge</h1>
            <button className='clear_fridge'> Clear Fridge</button>
        </div>

        <div>
            <input className='input_food_items' type="text" placeholder="Enter food item..." />
        </div>


        </div>


    );
}

export default MyFridge;