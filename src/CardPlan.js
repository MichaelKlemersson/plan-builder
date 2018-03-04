import React, { Component } from 'react';
import './styles/scss/style.scss';

class CardPlan extends Component {
    render() {
        const plan = this.props.plan;

        return (
            <div className="card">
                <div className="title">
                    {plan.name}
                </div>
                <div className="body">
                    {plan.services.map(service => {
                        <p className="card-item">{service.name}</p>
                    })}
                </div>
                <div className="footer">
                    {plan.price}
                </div>
            </div>
        );
    }
}

export default CardPlan;