import React, { useState } from "react";
import "./deleteMenu.css";

const DeleteMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const menuData = [
    { id: "L001", name: "Chicken fried", restaurant: "KFC", price: 35, status: "Active", action: "Edit" },
    { id: "L002", name: "Rice bow", restaurant: "KFC", price: 34, status: "Pending", action: "view detail" },
    { id: "L003", name: "Coke", restaurant: "KFC", price: 35, status: "Active", action: "view detail" },
    { id: "L004", name: "Chicken pop", restaurant: "KFC", price: 38, status: "Active", action: "Edit" },
    { id: "L005", name: "Chicken pop", restaurant: "KFC", price: 40, status: "Active", action: "Pending" },
  ];

  const filteredMenu = menuData.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="delete-container">
      <h2>การลบเมนู/สินค้า</h2>
      <p>Delete Menu</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search goods"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">🔍</button>
      </div>

      <table className="menu-table">
        <thead>
          <tr>
            <th>MENU ID</th>
            <th>MENU NAME</th>
            <th>RESTAURANT NAME</th>
            <th>PRICE</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredMenu.map((menu) => (
            <tr key={menu.id}>
              <td>
                <button className="delete-btn">DELETE</button> {menu.id}
              </td>
              <td>{menu.name}</td>
              <td>{menu.restaurant}</td>
              <td>{menu.price}</td>
              <td>{menu.status}</td>
              <td>{menu.action}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="confirm-container">
        <button className="confirm-btn">Confirm</button>
      </div>
    </div>
  );
};

export default DeleteMenu;
