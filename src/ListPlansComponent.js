import React, { Component } from 'react';
import CardPlan from './CardPlan';
import 'bootstrap/dist/css/bootstrap.css';

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
            <div>
                <h2 className="page-header text-center">Veja nossas opções de planos abaixo</h2>

                <div className="card-list row">
                    {plans.map(plan => (<CardPlan plan={plan} key={plan.name}/>))}
                </div>
            </div>
        );
    }
}

export default ListPlansComponent;