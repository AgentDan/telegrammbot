import './App.css'
import {useEffect} from "react";
const tg = window.Telegram.WebApp

function App() {

    useEffect(() => {
        tg.ready();
    }, []);

    const onClose = () => {
        tg.close()
    }

  return (
    <>
        <h1>HELLO</h1>
        <button onClick={onClose}>Закрыть</button>
    </>
  )
}

export default App
