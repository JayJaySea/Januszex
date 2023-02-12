import classes from "./Filters.module.css";

const BrandFilter = ({car})=>{
    return (
        <option className={classes.option}>{car.brand}</option>

    )
}
const ModelFilter = ({car})=>{
    return (
        <option className={classes.option}>{car.model}</option>

    )
}
const ComfortFilter = ({car})=>{
    return (
        <option className={classes.option}>{car.comfortScale}</option>

    )
}
const ColorFilter = ({car})=>{
    return (
        <option className={classes.option}>{car.color}</option>

    )
}
const SeatsFilter = ({car})=>{
    return (
        <option className={classes.option}>{car.howManySeats}</option>

    )
}
const TransporterFilter = ({car})=>{
    return (
        <option className={classes.option}>{car.isATrack}</option>

    )
}

function Filters (options){
    const brandOptions=[...new Map(options.map(option=>[option["brand"],option])).values()];
    const modelOptions=[...new Map(options.map(option=>[option["model"],option])).values()];
    const comfortOptions=[...new Map(options.map(option=>[option["comfortScale"],option])).values()];
    const colorOptions=[...new Map(options.map(option=>[option["color"],option])).values()];
    const seatsOptions=[...new Map(options.map(option=>[option["howManySeats"],option])).values()];
    const transportOptions=[...new Map(options.map(option=>[option["isATruck"],option])).values()];
    return (
        <div>
             <select className={classes.select}>
                {
                    brandOptions.map((opt,id)=>{return (<BrandFilter key={id} car={opt} />)})
                }
                </select>
                <div className={classes.filtersData}>Model:</div>
                <select className={classes.select}>
                {
                    modelOptions.map((opt,id)=>{return (<ModelFilter key={id} car={opt} />)})
                }
                </select>
                <div className={classes.filtersData}>Comfort Scale:</div>
                <select className={classes.select}>
                {
                    comfortOptions.map((opt,id)=>{return (<ComfortFilter key={id} car={opt} />)})
                }
                </select>
                <div className={classes.filtersData}>Color:</div>
                <select className={classes.select}>
                {
                    colorOptions.map((opt,id)=>{return (<ColorFilter key={id} car={opt} />)})
                }
                </select>
                <div className={classes.filtersData}>Seats:</div>
                <select className={classes.select}>
                {
                    seatsOptions.map((opt,id)=>{return (<SeatsFilter key={id} car={opt} />)})
                }
                </select>
                <div className={classes.filtersData}>Is a transporter:</div>
                <select className={classes.select}>
                {
                    transportOptions.map((opt,id)=>{return (<TransporterFilter key={id} car={opt} />)})
                }
                </select></div>
    )
}

export default Filters