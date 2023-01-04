import "./css/ExtendedPanel.css";

function ExpendedPanel({ expended, timeData }){
    return (
        <div className="expended-panel" style={ expended ? {"display": "flex"}:{"display": "none"}}>
            <div className="row timezone">
                <div>current timezone</div>
                <span>{ timeData.data.timezone }</span>
            </div>
            <div className="row day-of-year">
                <div>day of the year</div>
                <span> { timeData.data.day_of_year } </span>
            </div>
            <div className="row day-of-week">
                <div>day of the week</div>
                <span> { timeData.data.day_of_week } </span>
            </div>
            <div className="row week-number">
                <div>week number</div>
                <span> { timeData.data.week_number } </span>
            </div>
        </div>
    );
}

export default ExpendedPanel;