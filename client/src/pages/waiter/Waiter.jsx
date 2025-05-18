import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';

const Waiter = () => {
 const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState({
    isOpen: false,
    order: [],
  });

  const handleUpdate = async () => {};

  return isLoading ? (
    "Loading..."
  ) : (
    <div id="container">
      <div id="banner">
        <h1>Orders</h1>
      </div>

      <div id="reciepe-container">
        {Array(10).fill(1).map(()=>(<div id="tile">
          <h1>Table 1</h1>
          <div id="tile-btn">
            <button id="delete" onClick={()=>{
                setIsOpen({
                    isOpen : true,
                    order : []
                })
            }}>view Details</button>
            <select name="" id="delete">
                <option value="">Yet To Deliver</option>
                <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>))}
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Waiter