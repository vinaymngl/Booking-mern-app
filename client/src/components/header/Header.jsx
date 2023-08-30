import React, { useContext, useState } from 'react';
import {useNavigate} from "react-router-dom"; 
import "./header.css"
import { faBed, faPlane, faCar, faTaxi, faCalendarDays, faPerson, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';


const Header = ({ type }) => {
  const [openDates, setOpenDates] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [options, setOptions] = useState({
    adults: 0,
    children: 0,
    rooms: 0
  })

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1
      };
    });
  };
  const {dispatch} = useContext(SearchContext);


  const handleSearch = () =>{
    dispatch({type : "NEW_SEARCH",payload : {destination,dates,options}})
    navigate("/hotels",{state : {destination,dates,options}});

  };

  return (
    <div className="header">
      <div className = {type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        { type !== "list" &&
          <div><h1 className='headertitle'> A lifetime of discounts? It's a Genius</h1>
          <p className="headerDesc"> Get rewarded for your travels – unlock instant savings of 10% or more with a free Lamabooking account</p>
          {!user &&<button className="headerBtn">Sign in / Register</button>}

          <div className="headerSearch">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faBed} className="headerIcon" />
              <input type="text" placeholder='where?' className='headerSearchInput' onChange={e=>setDestination(e.target.value)} />
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <span onClick={() => setOpenDates(!openDates)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`} </span>
              {openDates &&
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDates([item.selection])}
                  minDate = {new Date()}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                />
              }

            </div>
            <div className="headerSearchItem" >
              <FontAwesomeIcon icon={faPerson} className="headerIcon" />
              <span className='headerSearchText' onClick={() => setOpenOptions(!openOptions)}>{`${options.adults} adult. ${options.children} children. ${options.rooms} rooms`}</span>
              <div className="options">
                {openOptions && <div>
                  <div className="optionItem">
                    <span className="optionText">Adults</span>
                    <div className="optionCounter">
                      <button className="optionCounterButton" onClick={() => handleOption("adults", "d")} disabled={options.adults < 1}>-</button>
                      <span className="optionCounterNumber">{options.adults}</span>
                      <button className="optionCounterButton" onClick={() => handleOption("adults", "i")}>+</button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                      <button className="optionCounterButton" onClick={() => handleOption("children", "d")} disabled={options.children <= 0}>-</button>
                      <span className="optionCounterNumber">{options.children}</span>
                      <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                      <button className="optionCounterButton" onClick={() => handleOption("rooms", "d")} disabled={options.rooms < 1}>-</button>
                      <span className="optionCounterNumber">{options.rooms}</span>
                      <button className="optionCounterButton" onClick={() => handleOption("rooms", "i")}>+</button>
                    </div>
                  </div>
                </div>
                }
              </div>
            </div>
            <div className="headerSearchItem">
              <button onClick = {handleSearch} className="headerBtn">Search</button>
            </div>
          </div>
        </div>}
      </div>
    </div>

  )
}

export default Header
