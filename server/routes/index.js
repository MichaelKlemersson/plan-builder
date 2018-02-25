import express from 'express';
import { router } from 'express';
import PlanBuilder from '../services/PlanBuilder';
import { loadFile } from '../utils/fileLoader';
import path from 'path';

router.get('/', (req, res, next) => {
    const { addons, services } = loadFile(path.resolve(__dirname, '../services_addons.json'));
    res.json(PlanBuilder.getAvailablePlans(services, addons));
});

export default router;
