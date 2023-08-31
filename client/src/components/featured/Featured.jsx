import React from 'react';
import "./featured.css";
import useFetch from '../../hooks/useFetch';

const Featured = () => {
  const { data, error, loading } = useFetch("/hotels/countByCity?cities=Delhi,Jaipur,Mumbai,Chennai");

  return (
    <div className='featured'>
      {loading ? "Loading please wait" :
        (<>
          <div className='featuredItem'>
            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/56/e2/7e/engineering-marvel-at.jpg?w=1200&h=-1&s=1" alt="img" className='featuredImg' />
            <div className="featuredTitles">
              <h1>{data[0]} properties</h1>
              <h1>Delhi</h1>
            </div>
          </div>
          <div className='featuredItem'>
            <img src="https://miro.medium.com/v2/resize:fit:603/1*fYA-b-KA9UUqPL2OsDYkQw.png" alt="img" className='featuredImg' />
            <div className="featuredTitles">
              <h1>{data[1]} properties</h1>
              <h1>Jaipur</h1>
            </div>
          </div>
          <div className='featuredItem'>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/103705059.jpg?k=9e078265b31ad1815a573da8ed2a665f863e3925e1efd730df703421868a2ada&o=&hp=1" alt="img" className='featuredImg' />
            <div className="featuredTitles">
              <h1>{data[2]} properties</h1>
              <h1>Mumbai</h1>
            </div>
          </div> 
          <div className='featuredItem'>
            <img src="https://img.traveltriangle.com/blog/wp-content/uploads/2020/03/Chennai-Admire-The-Colonial-Architecture_26th-Mar.jpg" alt="img" className='featuredImg' />
            <div className="featuredTitles">
              <h1>{data[3]} properties</h1>
              <h1>Chennai</h1>
            </div>
          </div>  
          </>)}
  </div>
  )
    
}

export default Featured
