import React from 'react';
import "./propertyList.css";
import image1 from "../featured/assets/1.jpg"
import useFetch from '../../hooks/useFetch';
import { images } from './images';

const PropertyList = () => {
    const {data,error,loading} = useFetch("/hotels/countByType");
    
      // console.log(data);

    return (
        <div className="pList">
        {loading? "loading please wait" : <> {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={images[i]}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}</>}
        </div>
    )
}

export default PropertyList
