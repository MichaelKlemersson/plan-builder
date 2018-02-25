import { findIndex, merge } from 'lodash';

class Plan {
    constructor (services, addons = []) {
        this.services = [];
        this.addons = addons;
        if (!Array.isArray(services) || !services.length) {
            throw new Error('Plan must contains at least one service');
        } else {
            services.forEach(service => this.addService(service));
        }
    }

    addService(service) {
        if (this.services.length) {
            if (this.hasService(service)) {
                throw new Error('Plan can onle has one of each type of service');
            }
            
            if (!this.canBundleService(service)) {
                throw new Error('Can not add an uncommon service to a Plan');
            }
        }

        this.services.push(service);
    }

    canBundleService(serviceToCompare) {
        for (let index in this.services) {
            const isAvailable = findIndex(serviceToCompare.available_for, (availableService) => {
                return (this.services[index].name === availableService.name) &&
                    (this.services[index].type === availableService.type);
            }) > -1;

            if (isAvailable) {
                return true;
            }
        }

        return false;
    }

    hasService(serviceToFind) {
        return findIndex(this.services, (service) => {
            return (service.name === serviceToFind.name) && (service.type === serviceToFind.type);
        }) > -1;
    }

    getPrice() {
        const reducer = (prev, next) => {
            let subTotal = prev.price + next.price;
            if (next.addition) {
                subTotal += next.addition;
            } else if (next.discount) {
                subTotal -= next.discount;
            }

            return subTotal;
        };
        let servicesTotal = this.services.reduce(reducer);
        let addonsTotal = 0;
        if (this.addons.length) {
            addonsTotal = this.services.reduce(reducer);
        }

        return servicesTotal + addonsTotal;
    }

    pushAddons(addon) {
        this.addons = merge(this.addons, Array.isArray(addon) ? addon : [addon]);
    }
}

export default Plan;
