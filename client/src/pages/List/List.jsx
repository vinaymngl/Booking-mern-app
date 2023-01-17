import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import "./list.css";
import SearchItem from '../../components/searchItem/SearchItem';
import { useLocation } from 'react-router-dom';
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import useFetch from "../../hooks/useFetch.js"


const List = () => {
  const [openDates, setOpenDates] = useState(false);
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [min,setMin] = useState(undefined);
  const [max,setMax] = useState(undefined);
  const {data, loading, error, reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max ||10000}`);
  const handleClick = () =>{
    reFetch();

  }
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder= {destination} />
            </div>
            <div className="lsItem">
              <label>Check-in Dates</label>
              <span onClick={() => setOpenDates(!openDates)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate, "MM/dd/yyyy"
              )}`} </span>
              {openDates &&
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min Price <small>Per Night</small>
                  </span>
                  <input type="number" onClick={(e) =>setMin(e.target.value)} className='lsOptionInput' />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max Price <small>Per Night</small>
                  </span>
                  <input type="number" onClick={(e) =>setMax(e.target.value)}  className='lsOptionInput' />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Adult
                  </span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={options.adults} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Children
                  </span>
                  <input type="number" min={0} className='lsOptionInput' placeholder={options.children} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Room
                  </span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={options.rooms} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? ("loading" ): <>
              {data.map(item => (
                <SearchItem item = {item} key = {item._id} />
              ))}</>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List