import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, setIsOpen }) => {
  if (!isOpen.isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOpen({ isOpen: false, order: [] })}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsOpen({ isOpen: false, order: [] })}>
          <IoClose />
        </button>
        <h2>Order Details</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {isOpen?.order?.map((curEle, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600 }}>{curEle.food.name}</td>
                <td>{curEle.quantity}</td>
                <td>₹{curEle.food.price}</td>
                <td style={{ fontWeight: 600 }}>₹{curEle.quantity * curEle.food.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
