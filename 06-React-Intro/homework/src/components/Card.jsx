import React from 'react';

export default function Card(props) {
  // acá va tu código
  return (
  <div>  
      <div>{props.name}</div>
      <h2 id="subtitles">Min</h2>
      <h3>{props.min}</h3>
      <img src={"http://openweathermap.org/img/wn/${props.img}@2x.png"}/> 
  </div>)
};
