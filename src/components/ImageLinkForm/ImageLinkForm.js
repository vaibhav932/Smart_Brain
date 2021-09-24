import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonChange}) =>{
    return (
       <div>
           <div style={{paddingBottom:'20px', fontWeight: 'bold' }}>
           {`This Magic Brain will detect your face from the picture. Give it a try`}
           </div>
           <div className="center">
               <div className="form center pa4 b3 shadow-5">
               <input className="f4 pa2 w-70 center" type="text" placeholder="image url" onChange = {onInputChange} />
               <button className="w-30 grow f4 link ph3 pv2 dib white bg-blue" onClick = {onButtonChange} >Detect</button>
               </div>
           </div>
           
       </div>
    )
}

export default ImageLinkForm;