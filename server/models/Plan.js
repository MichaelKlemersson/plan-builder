import { findIndex, merge } from 'lodash';

class Plan {
    constructor (services, addons = []) {
        this.services = [];
        this.addons = addons;

        if (services && services.length) {
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

    canBundleService(service) {
        if (!this.services.length) {
            return true;
        }

        for (let index in this.services) {
            const isAvailable = findIndex(service.available_for, (availableService) => {
                return (this.services[index].name === availableService.name) &&
                    (this.services[index].type === availableService.type);
            }) > -1;

            if (isAvailable) {
                return true;
            }
        }

        return false;
    }

    hasService(serviceToFind, checkName = false) {
        if (!this.services.length) {
            return false;
        }

        return findIndex(this.services, (service) => {
            if (!checkName) {
                return (service.type === serviceToFind.type);
            } else {
                return (service.type === serviceToFind.type && service.name === serviceToFind.name);
            }
        }) > -1;
    }

    getPrice() {
        const reducer = (current, next) => {
            let subTotal = 0;

            if (current && current.price) {
                subTotal = current.price;
            } else {
                subTotal = current;
            }
            
            if (next && next.price) {
                subTotal += next.price;
            }
            
            if (next.available_for.length) {
                const taxes = next.available_for.filter(service => this.hasService(service, true));
                if (taxes) {
                    taxes.forEach(tax => {
                        if (tax && tax.discount) {
                            subTotal -= tax.discount;
                        } else if (tax && tax.addition) {
                            subTotal += tax.addition;
                        }
                    });
                }
            }

            return subTotal;
        };
        let servicesTotal = this.services.length > 1 ? this.services.reduce(reducer) : this.services[0].price;
        let addonsTotal = 0;
        if (this.addons.length) {
            addonsTotal = this.addons.reduce(reducer);
        }

        return servicesTotal;
    }

    getName() {
        let planName = "";
        this.services.forEach((service, index) => planName += ((index != 0 ? "+" : '') + service.name));
        this.addons.forEach(addon => planName += ("+" + addon.name));

        return planName;
    }

    pushAddons(addon) {
        this.addons.push(addon);
    }

    toJson() {
        return {
            name: this.getName(),
            price: this.getPrice(),
            services: this.services,
            addons: this.addons
        };
    }
}

export default Plan;
