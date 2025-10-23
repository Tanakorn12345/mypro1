import React, { useState } from "react";
import "./updatemenu.css";
import { useNavigate } from "react-router-dom";

const UpdateMenu = () => {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState({
    oldName: "",
    oldPrice: "",
    oldDesc: "",
    newName: "",
    newPrice: "",
    newDesc: "",
    oldType: "",
    newType: "",
  });

  const handleChange = (e) => {
    setMenuData({ ...menuData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("ข้อมูลถูกบันทึกเรียบร้อย!");
    navigate("/overview"); // กลับไปหน้า Overview หลังจากกด Confirm
  };

  return (
    <div className="update-container">
      <nav className="navbar">
        <h2>LINE GIRL</h2>
        <ul className="nav-links">
          <li>HOME</li>
          <li>ORDER</li>
          <li>ABOUT</li>
          <li>SEARCH</li>
          <li>INBOX</li>
        </ul>
        <button className="manage-btn" onClick={() => navigate("/overview")}>
          จัดการเมนู/สินค้า +
        </button>
      </nav>

      <div className="update-content">
        <h2>การแก้ไขเมนู/สินค้า</h2>
        <p>Update Menu</p>

        <div className="update-form">
          <div className="form-left">
            <label>Menu name old</label>
            <input name="oldName" value={menuData.oldName} onChange={handleChange} />

            <label>Price menu old</label>
            <input name="oldPrice" value={menuData.oldPrice} onChange={handleChange} />

            <label>Description menu old</label>
            <input name="oldDesc" value={menuData.oldDesc} onChange={handleChange} />

            <label>Menu name new</label>
            <input name="newName" value={menuData.newName} onChange={handleChange} />

            <label>Price menu new</label>
            <input name="newPrice" value={menuData.newPrice} onChange={handleChange} />

            <label>Description menu new</label>
            <input name="newDesc" value={menuData.newDesc} onChange={handleChange} />
          </div>

          <div className="form-right">
            <label>Image new</label>
            <img
              src="/fried-shrimp.png"
              alt="menu"
              className="menu-image"
            />

            <div className="dropdowns">
              <select name="oldType" value={menuData.oldType} onChange={handleChange}>
                <option value="">Menu Type Old</option>
                <option value="main">Main</option>
                <option value="drink">Drink</option>
                <option value="dessert">Dessert</option>
              </select>

              <select name="newType" value={menuData.newType} onChange={handleChange}>
                <option value="">Menu Type New</option>
                <option value="main">Main</option>
                <option value="drink">Drink</option>
                <option value="dessert">Dessert</option>
              </select>

              <button className="confirm-btn" onClick={handleSubmit}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMenu;
