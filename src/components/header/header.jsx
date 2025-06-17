import { FaCog } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import "./header.css";
import { HiOutlineSearch } from "react-icons/hi";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function Header() {
  return (
    <header>
      <div className="header__left">
        <button className="back-button">
          <FiArrowLeft size={17} />
        </button>

        <div className="header__details">
          <figure>
            <img src="Apple_Logo.jpg" alt="Board Logo." />
          </figure>

          <div className="header__name">
            <span>
              <b>Apple</b>
            </span>
            <p>5 boards 24 members</p>
          </div>
        </div>
      </div>
      
      <div className="header__right">
        <div className="header__input">
          <HiOutlineSearch size={20} />
          <input type="text" placeholder="Search" />
        </div>
        <button>
          <BsBoxArrowUpRight />
        </button>
        <button>
          <FaCog />
        </button>
      </div>
    </header>
  );
}
