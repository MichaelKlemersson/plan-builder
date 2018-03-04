import React, { Component } from 'react';
import CardPlan from './CardPlan';
import './styles/scss/style.scss';

class ListPlansComponent extends Component {
    state = {
        plans: []
    };

    componentWillMount() {
        fetch('/api/list-plans')
            .then(response => response.json())
            .then(response => this.setState({ plans: response.plans }));
    }

    render() {
        const plans = this.state.plans;

        return (
            <div className="card-list">
                {plans.map(plan => (<CardPlan plan={plan} key={plan.name}/>))}
            </div>
        );
    }
}

export default ListPlansComponent;