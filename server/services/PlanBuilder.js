import Plan from '../models/Plan'

class PlanBuilder {
    constructor (services, addons) {
        this.services = services;
        this.addons = addons;
        this.plans = new Set();
    }

    getAvailablePlans() {
        const baseServices = services.filter(service => service.type === 'bb');
        const othersServices = services.filter(service => service.type !== 'bb');
        baseServices.forEach(service => {
            this.addPlan([service]);
            
            if (addons.length) {
                addons.forEach(addon => this.addPlan([service], [addon]));
                this.addPlan([service], addons);
            }
        });
        
    }

    getOnlyBasePlans() {
        let plans = [];
        this.services.filter(service => service.type === 'bb').forEach(service => {
            plans.push(new Plan([service]));
        });

        return plans;
    }

    getBasePlansWithAddons() {
        return this.getOnlyBasePlans().map(plan => {
            this.addons.forEach(addon => {
                plan.pushAddons(addon);
            });

            plan.pushAddons(this.addons);

            return plan;
        });
    }

    addPlan(services, addons = []) {
        this.plans.add(new Plan(services, addons));
    }
}

export default PlanBuilder;
