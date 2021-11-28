import {useState, useEffect, CSSProperties} from 'react'

const delay : number = 20 
const scGap : number = 0.02 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth) 
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) => Math.max(0, scale - i / n)

const divideScale = (scale : number, i : number, n : number) => Math.min(1 / n, maxScale(scale, i, n)) * n 

const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (scale : number, w : number, h : number) => {
    const sf : number = sinify(scale)
    const sf1 : number = divideScale(sf, 0, 2)
    const sf2 : number = divideScale(sf, 1, 2)
    const position = 'absolute'
    const size : number = Math.min(w, h) / 10
    const left : string = `${w / 2 - size / 2}px` 
    const background : string = "#BDBDBD"
    return {
        circleStyle() : CSSProperties {
            const top : string = `${(h / 2 - size / 2) * sf1}px`
            const width : string = `${size}px`
            const height : string = `${size}px`
            const borderRadius : string = `50%`
            return {
                position, 
                left, 
                top, 
                width, 
                height, 
                background,
                borderRadius  
            }
        }, 

        boxStyle() : CSSProperties {
            const top : string = `${h / 2 - size / 2 + (h / 2 - size / 2) * sf2}px`
            const width : string = `${size}px`
            const height : string = `${size}px`
            return {
                width, 
                height, 
                position, 
                top, 
                left, 
                background 
            }           
        }
    } 
}