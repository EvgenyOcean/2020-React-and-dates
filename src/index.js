import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class RenderTable extends React.Component{

    creatingTable(date){
        let daysAmount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        // firstDay == gapses amount at the beginning of the month
        firstDay = 
            firstDay === 0 ? firstDay = 6 : 
            firstDay -= 1; 

        let trsNeeded = Math.ceil((daysAmount + firstDay) / 7); // how many trs needed

        let j = 1; // for: 1. filling in the table with dates 2. keys 
        let trs = [];

        // main logic for creating trs, tds 
        for (let i=1; i <= trsNeeded; i++){
            let tds = [];
            for (let weekday=1 ; weekday <= 7; j++, weekday++){
                if (j - firstDay > daysAmount){
                    tds.push(<td key={j}></td>); 
                    continue; 
                }
                // Some gaps, due to some cases when a month is started on wed, tue etc..
                if (j <= firstDay){
                    tds.push(<td key={j}></td>);
                } else {
                    tds.push(<td key={j}>{j - firstDay}</td>);
                }
            }
            trs.push(<tr key={i}>{tds}</tr>); 
        }

        return trs; 
    }

    render(){
        let formatter = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'});
        return(
            <table>
                <caption>{formatter.format(this.props.date)}</caption>
                <tbody>
                    <tr>
                        <th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
                    </tr>
                    {this.creatingTable(this.props.date)}
                </tbody>
            </table>
        )
    }
}

function RenderButtons(props){
    return(
        <div className='btns'>
            <button onClick={props.handler} name='prev'>Prev</button>
            <button onClick={props.handler} name='next'>Next</button>
        </div>
    )
}

class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.monthChange = this.monthChange.bind(this);
        this.state = {
            date: new Date(), 
        };
    }

    monthChange(e){
        let target = e.target.name;
        if (target === 'prev'){
            let date = new Date(JSON.parse(JSON.stringify(this.state.date))); 
            date.setMonth(date.getMonth() - 1); 
            this.setState({date: date});
        } else {
            let date = new Date(JSON.parse(JSON.stringify(this.state.date))); 
            date.setMonth(date.getMonth() + 1); 
            this.setState({date: date});
        }
    }

    render(){
        return(
            <div className='main'>
                <RenderTable date={this.state.date}/>
                <RenderButtons handler={this.monthChange}/>
            </div>
        )
    }
}

ReactDOM.render(<Calendar />, document.getElementById('root'));
