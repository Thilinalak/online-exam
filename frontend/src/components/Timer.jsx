import {useState, useEffect} from 'react'

const Timer = () => {

    const [seconds, setSeconds] = useState(60) 
    const [minutes, setMinutes] = useState(0) 
    const [hours, setHours] = useState(0) 

    let timer

    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds - 1)

            if(seconds === 59){
                setMinutes(minutes - 1)
                setSeconds(0)
            }
        },1000)
    return () => {clearInterval(timer)}

    })

    
  return (
    <div>
        {minutes} : {seconds}
    </div>
  )
}

export default Timer