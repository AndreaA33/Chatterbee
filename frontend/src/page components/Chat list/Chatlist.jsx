import React from 'react'
import "./chatlist.css"
import pfp from "../../assets/johnpowell_headshot_0.jpg"
import img1 from "../../assets/linkedin-pfp.jpg"
import img2 from "../../assets/1-intro-photo-final.jpg"
import img3 from "../../assets/downloadpfpimage.jpg"

function Chatlist() {
  return (
    <div className='chatlist'>
      <div className='chatlist-user'>
        <img src={pfp}/>
        <p>John Clarks</p>
        <p>***</p>
      </div>
      <div className='chatlist-search'>
        <input placeholder='Search'/>
        <button>+</button>
      </div>
      <div className='chatlist-list'>
        <div className='chatlist-listitem'>
            <img src={img1}/>
            <div className='chatlist-listinf'>
                <div className='listinf-line1'>
                    <p>Andrea Anikwe</p>
                    <p>8:47am</p>
                </div>
                <div className='message'>
                    <p>If you have another memory stick or external hard drive with more If you have another memory stick or external hard drive with more If you have another memory stick or external hard drive with more</p>
                </div>
            </div>
        </div>
        <div className='chatlist-listitem'>
            <img src={img2}/>
            <div className='chatlist-listinf'>
                <div className='listinf-line1'>
                    <p>Matthew Paul</p>
                    <p>4:13am</p>
                </div>
                <div className='message'>
                   <p>message</p> 
                </div>
                
            </div>
        </div>
        <div className='chatlist-listitem'>
            <img src={img3}/>
            <div className='chatlist-listinf'>
                <div className='listinf-line1'>
                    <p>James Ryley</p>
                    <p>9:47pm</p>
                </div>
                <div className='message'>
                   <p>message</p> 
                </div>
            </div>
        </div>
        <div className='chatlist-listitem'>
            <img src={img1}/>
            <div className='chatlist-listinf'>
                <div className='listinf-line1'>
                    <p>Fin West</p>
                    <p>5:24pm</p>
                </div>
                <div className='message'>
                   <p>message</p> 
                </div>
            </div>
        </div>
        <div className='chatlist-listitem'>
            <img src={img2}/>
            <div className='chatlist-listinf'>
                <div className='listinf-line1'>
                    <p>Quavious Gray</p>
                    <p>10:55pm</p>
                </div>
                <div className='message'>
                   <p>message</p> 
                </div>
            </div>
        </div>
      </div>
      <button className='logout-button'>LOGOUT</button>
    </div>
  )
}

export default Chatlist
