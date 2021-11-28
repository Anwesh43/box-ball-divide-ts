import React from 'react'
import withContext from './withContext'
import {useStyle} from './hooks'

interface BoxBallDivideProps {
    w : number,
    h : number, 
    scale : number, 
    onClick : Function 
}

const BoxBallDivide = (props : BoxBallDivideProps) => {
    const {boxStyle, circleStyle} = useStyle(props.scale, props.w, props.h)
    return (
        <React.Fragment>
            <div style = {boxStyle()}></div>
            <div style = {circleStyle()}></div>
        </React.Fragment>
    )
}

export default withContext(BoxBallDivide)