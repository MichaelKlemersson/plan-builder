import { findIndex, map } from 'lodash';
import { powerSet } from '../utils/math';
import Plan from '../models/Plan';

class PlanBuilder {
    constructor (services, addons) {
        this.allServices = services;
        this.mainServices = services.filter(service => !service.is_optional);
        this.optionalServices = services.filter(service => service.is_optional);
        this.addons = addons;
    }

    getServiceSets() {
        return (this.buildPlans(this.buildServicesCombinations()));
    }

    buildServicesCombinations() {
        let bundles = [];

        this.mainServices.forEach(service => {
            let servicesAndAddons = this.getOptionalServicesNamesRecursive(
                this.getOptionalServicesFor(service),
                [service.name],
                this.mainServices
            ).concat(this.getAddonsNames());

            bundles = bundles.concat(powerSet(servicesAndAddons).filter(combination => {
                return combination.indexOf(service.name) !== -1;
            }));
        });

        return bundles.map(bundle => {
            return bundle.map(serviceName => {
                let service = this.allServices.filter(service => service.name === serviceName).pop();
                if (service) {
                    return service;
                } else {
                    return this.addons.filter(service => service.name === serviceName).pop();
                }
            });
        });
    }

    buildPlans(bundles) {
        let plans = [];

        bundles.forEach(bundle => {
            const plan = new Plan();
            let isValidServiceBundle = true;
            
            bundle.forEach(service => {
                if (service !== undefined && !plan.hasService(service) && plan.canBundleService(service)) {
                    if (service.type === 'addon') {
                        plan.pushAddons(service);
                    } else {
                        plan.addService(service);
                    }
                } else {
                    isValidServiceBundle = false;
                }
            });

            if (isValidServiceBundle) {
                plans.push(plan.toJson());
            }
        });

        return plans;
    }

    getOptionalServicesNamesRecursive(services, allServices = [], exclude = []) {
        services.forEach(service => {
            if (allServices.indexOf(service.name) === -1 && findIndex(exclude, ['name', service.name]) === -1) {
                allServices.push(service.name);
            }
            
            if (service.available_for && service.available_for.length) {
                return this.getOptionalServicesNamesRecursive(service.available_for, allServices, exclude);
            }
        });

        return allServices;
    }

    getOptionalServicesFor(mainService) {
        return this.optionalServices.filter(optionalService => {
            return optionalService.available_for.filter(service => {
                return mainService.name === service.name && mainService.type === service.type;
            }).length > 0;
        });
    }

    getAddonsNames() {
        return map(this.addons, 'name');
    }
}

export default PlanBuilder;
