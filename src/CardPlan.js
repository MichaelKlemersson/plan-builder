import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class CardPlan extends Component {
    render() {
        const plan = this.props.plan;

        return (
            <div className="col-md-4 form-group">
                <div className="card">
                    <div className="card-header">
                        {plan.name}
                    </div>
                    <ul className="list-group list-group-flush">
                        {plan.services.map(service => (<li className="list-group-item">{service.name}</li>))}
                    </ul>
                    <div className="card-footer text-right">
                        R$ {plan.price}
                    </div>
                </div>
            </div>
        );
    }
}

export default CardPlan;