import React from 'react'
import './MainContent.scss'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'


export default function MainContent(props) {

    let prices = []
    let horas = [];

    let pricesYesterday = []
    let pricesToday = []

    //Si los props no estan definidos no se mostraria nada
    if (props.data === undefined) {
        return(
            <div className="c-mainContent">
            </div>
        )
    }

    props.data.attributes.values.map((el)=>{
       let date = new Date(Date.parse(el.datetime))
        //Con este if consigo los datos de las ultimas 24 horas
       if(props.yesterday < date && date < props.today){

            //Guardo tanto los precios como las horas en diferentes arrays
           prices = [...prices, el.value]

           horas = [...horas,(date.getDate())+"/"+(date.getMonth()+1)+" - "+(date.getHours())+":00"];
            
        }
        //Aca obtengo los precios solo de el dia de ayer
        if(props.yesterday.getDate() === date.getDate()){
            pricesYesterday = [...pricesYesterday, el.value]
        }
        //Aca obtengo los precios de el dia de hoy
        if(props.today.getDate()=== date.getDate()){
            pricesToday = [...pricesToday,el.value]
        }

     })
        //Obtengo las prosiciones de los precios mas altos y mas bajos.
        const maxPriceYesterday = pricesYesterday.indexOf(Math.max.apply(null,pricesYesterday))
        const minPriceYesterday = pricesYesterday.indexOf(Math.min.apply(null,pricesYesterday))

        const maxPriceToday = pricesToday.indexOf(Math.max.apply(null,pricesToday))
        const minPriceToday = pricesToday.indexOf(Math.min.apply(null,pricesToday))  
        
        //Obtengo la media de los precios
        let media = (prices.reduce((a,b)=>a+b,0)/24).toFixed(2)
        
        
    return (
        <div className="c-mainContent">
            <div className="c-mainContent__prices-container">
                <div className="c-mainContent__prices">
                        <div className="c-mainContent__price">
                        <p className="c-mainContent__title">
                            Precio mas bajo de ayer
                        </p>
                        <h3 className="c-mainContent__min-price">
                            {pricesYesterday[minPriceYesterday]}<small>€/MWh</small>
                        </h3>
                        <h4 className="c-mainContent__hour">
                            {minPriceYesterday}:00
                        </h4>
                        </div>
                        <div className="c-mainContent__price">
                        <p className="c-mainContent__title">
                            Precio mas alto de ayer
                        </p>
                        <h3 className="c-mainContent__max-price">
                            {pricesYesterday[maxPriceYesterday]}<small>€/MWh</small>
                        </h3>
                        <h4 className="c-mainContent__hour">
                            {maxPriceYesterday}:00
                        </h4>
                        </div>
                    </div>
             </div>
             <div className="c-mainContent__chart">
                <Line data={{
                    labels:horas,
                    datasets:[{label:'precio',data:prices,backgroundColor:'red',borderColor:'red'}]
                }}
                />

            <p>Precio Medio <br/> {media}</p>
            </div>
             <div className="c-mainContent__prices-container">
             <div className="c-mainContent__prices">
                        <div className="c-mainContent__price">
                        <p className="c-mainContent__title">
                            Precio mas bajo de hoy
                        </p>
                        <h3 className="c-mainContent__min-price">
                            {pricesToday[minPriceToday]}<small>€/MWh</small>
                        </h3>
                        <h4 className="c-mainContent__hour">
                            {minPriceToday}:00
                        </h4>
                        </div>
                        <div className="c-mainContent__price">
                        <p className="c-mainContent__title">
                            Precio mas alto de hoy
                        </p>
                        <h3 className="c-mainContent__max-price">
                            {pricesToday[maxPriceToday]}<small>€/MWh</small>
                        </h3>
                        <h4 className="c-mainContent__hour">
                            {maxPriceToday}:00
                        </h4>
                        </div>
                 </div>
             </div>
        </div>

    )
}
