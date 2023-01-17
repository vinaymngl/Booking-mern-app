import React, { useContext, useState } from 'react';
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import useFetch from '../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const {data,loading,error} = useFetch(`/hotels/find/${id}`);
  const { dates,options } = useContext(SearchContext);
  const[openModal,setOpenModal] = useState(false);


  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };
  const days = dayDifference(dates[0].endDate,dates[0].startDate);
 

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
    
  };
   const {user} = useContext(AuthContext);
   const navigate = useNavigate();
  const handleClick = () =>{
    if(user){
      setOpenModal(true);

    }else{
      // navigate("/login");
      setOpenModal(true)

    }
  }  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? "loading":<div className="hotelContainer">
        {open && <div className="slider">
          <FontAwesomeIcon onClick={() => setOpen(false)} icon={faCircleXmark} className="close" />
          <FontAwesomeIcon onClick={() => setSlideNumber(slideNumber === 0 ? 5 : slideNumber - 1)} icon={faCircleArrowLeft} className="arrow" />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon onClick={() => setSlideNumber(slideNumber === 5 ? 0 : slideNumber + 1)} icon={faCircleArrowRight} className="arrow" />
        </div>}
        
        <div className="hotelWrapper">
          <button className='bookNow'>Researve or book now</button>
          <h1 className='hotelTitle'>{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className='hotelDistance'>
            {data.distance}
          </span>
          <span className='hotelPriceHighlight'>Book a stay starting at $ {data.cheapestPrice}</span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className='hotelImgWrapper'>
                <img src={photo} onClick={() => handleOpen(i)} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.title}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for {days}-night stays</h1>
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </span>
              <h2>
                <b>${data.cheapestPrice*days*options.rooms}</b> {days} nights
              </h2>
              <button onClick={handleClick}>Reserve</button>
            </div>
          </div>

        </div>
        <MailList />
        <Footer />
      </div>}
      {openModal && <Reserve setOpen={setOpenModal} hotelId = {id}/>}
    </div>
  )
}

export default Hotel
