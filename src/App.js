import './App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationDrawer from './components/NavigationDrawer/NavigationDrawer';
import AppBar from './components/AppBar/AppBar';
import MainContent from './components/MainContent/MainContent';

function App() {
  //La data recibida de la api se guarda en el state
  const [data, setData] = useState();
  const [today, setToday] = useState();
  const [yesterday, setYesterday] = useState();
  //Obtengo el dia acutal y en anterior

  //UseEffect para iniciliazar today, yesterday y para la llamada a la api con axios
  useEffect(() => {
    const today = new Date()
    const yesterday = new Date(today)

    yesterday.setDate(yesterday.getDate() - 1)

    today.toDateString()
    yesterday.toDateString()

    setToday(today);
    setYesterday(yesterday);

    axios.get(`https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}T00:00&end_date=${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T23:59&time_trunc=hour&cached=true`)
      .then(res => {
        setData(res.data.included[0])
      })

  }, [])

  return (
    <BrowserRouter>
      <div className="p-main">
        <div className="p-main__navigationDrawer">
          <NavigationDrawer />
        </div>
        <div className="p-main__appBar">
          <AppBar />
        </div>
        <div className="p-main__main">
          <Routes>
            <Route path="/" element={<MainContent yesterday={yesterday} today={today} data={data} />} />
          </Routes>
        </div>
      </div>

    </BrowserRouter >
  );
}

export default App;
