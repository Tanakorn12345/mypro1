import React from "react";
import { useNavigate } from "react-router-dom";
import "./managehome.css";

function ManageHome() {
  const navigate = useNavigate();

  return (
    <div className="managehome-container">
      <nav className="navbar">
        <div className="logo">LINE GIRL</div>
        <ul className="nav-links">
          <li>HOME</li>
          <li>ORDER</li>
          <li>ABOUT</li>
          <li>SEARCH</li>
          <li>INBOX</li>
        </ul>
        <div className="profile-icon">👤</div>
      </nav>

      <div className="restaurant-info">
        <img src="/kfc-logo.png" alt="KFC Logo" className="logo-img" />
        <div>
          <h2>KFC Restaurant</h2>
          <p>สาขาบางแวก</p>
          <p className="open-status">เปิดร้าน (รับออเดอร์ถึง 22:00)</p>
          <button className="close-btn">ตั้งปิดร้าน</button>
        </div>

        <button className="manage-btn" onClick={() => navigate("/overview")}>
          MANAGEMENT MODE
        </button>
      </div>

      <div className="sales-summary">
        <h3>ยอดขายวันนี้</h3>
        <p className="sales-amount">฿10,000.00</p>
      </div>

      <div className="quality-section">
        <p>คุณภาพออเดอร์สัปดาห์ก่อน</p>
      </div>

      <div className="actions">
        <button className="action-btn">แคมเปญ</button>
        <button className="action-btn">โฆษณา</button>
      </div>
    </div>
  );
}

export default ManageHome;
