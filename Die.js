import React from "react"

export default function Die(props) {
    const arr= Array(props.value).fill(0)
    const pip = arr.map((e, index)=> <span className="pip" key={index}></span>)
        
    
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {pip}
        </div>
    )
}