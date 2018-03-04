import express from 'express';
import { Router } from 'express';
import PlanBuilder from '../services/PlanBuilder';
import { loadFile } from '../utils/fileLoader';
import path from 'path';

let router = new Router();

router.get('/list-plans', (req, res, next) => {
    const { addons, services } = loadFile(path.resolve(__dirname, '../services_addons.json'));
    res.json({
        plans: (new PlanBuilder(services, addons)).getServiceSets()
    });
});

export default router;
