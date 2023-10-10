import "./style.scss";
import React from 'react'

export const Card = props => {
    return (
        <div id={props.uid} className="music">
            <div id={props.uid} className={`music-content ${props.isSelected ? 'active' : ''}`} onClick={props.handleCheckboxChange}>

                <div id={props.uid} className="image-wrapper"><img id={props.uid} src={props.image} alt="Song cover"/></div>
                <div id={props.uid} className="right">
                    <span id={props.uid} className="name">{ props.name }</span>
                    <span id={props.uid} className="songs">{props.no_of_songs} tracks</span>
                    <span id={props.uid} className="duration">{props.duration}</span>
                </div>
            </div>
        </div>
    )
}

export default Card