import "./StatisticsWidget.scss"

export default function StatisticsWidget(props){
    return(
        <section className="statisticsWidget">
            <h2>{props.name}</h2>
            <p className={props.style}>{props.stats}</p>
        </section>
    )
}