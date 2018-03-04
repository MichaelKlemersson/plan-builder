import { describe, it } from 'mocha';
import { expect } from 'chai';
import path from 'path';
import Plan from './models/Plan';
import { loadFile } from './utils/fileLoader';

const { services, addons } = loadFile(path.join(__dirname, './services_addons.json'));

describe('File Loader Utils Tests', () => {
    it('Should load services and addons from json file', () => {
        const { services, addons } = loadFile(path.join(__dirname, './services_addons.json'));
        expect(addons).to.be.an('array');
        expect(services).to.be.an('array');
    });
});

describe('Plan Model Tests', () => {
    it('Should create a Plan', () => {
        expect(new Plan([services[0]])).to.be.an('object');
    });

    it('Should get the plan price', () => {
        const availableServices = [services[1], services[4], addons[0]];
        const plan = new Plan(availableServices);
        const totalPlan = 55;

        expect(plan.getPrice()).to.be.eq(totalPlan);
    });

    it('A Plan should not has a repeated service', () => {
        let availableServices = [services[0], services[0]];

        expect(() => new Plan(availableServices)).to.throw('Plan can onle has one of each type of service');
    });

    it('Should only add available services', () => {
        let unCommonServices = [services[0], services[3]];

        expect(() => new Plan(unCommonServices)).to.throw('Can not add an uncommon service to a Plan');
    });
});

// describe('Plan Builder Tests');
