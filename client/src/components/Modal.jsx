import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, setIsOpen }) => {
  return (
    <div id="modal" className={isOpen.isOpen ? "display" : "hidden"}>
      <IoClose onClick={() => setIsOpen({ isOpen: false, order: [] })} />
      <table>
        <thead>
          <tr>
          <th>Name</th>
          <th>quantity</th>
          <th>amount</th>
        </tr>
        </thead>
        <tbody>
          {isOpen?.order?.map((curEle) => (
          <tr>
            <td>{curEle.food.name}</td>
            <td>{curEle.quantity}</td>
            <td>{curEle.quantity * curEle.food.price}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Modal;
