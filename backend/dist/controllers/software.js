"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSoftware = exports.createSoftware = void 0;
const Software_1 = require("../entities/Software");
const data_source_1 = require("../data-source");
const softwareRepo = data_source_1.AppDataSource.getRepository(Software_1.Software);
const createSoftware = async (req, res) => {
    const { name, description, accessLevels } = req.body;
    try {
        const software = softwareRepo.create({ name, description, accessLevels });
        await softwareRepo.save(software);
        res.status(201).json(software);
    }
    catch (err) {
        res.status(400).json({ message: "Creation failed" });
    }
};
exports.createSoftware = createSoftware;
const getAllSoftware = async (_req, res) => {
    try {
        const software = await softwareRepo.find();
        res.json(software);
    }
    catch (err) {
        res.status(500).json({ message: "Fetch error" });
    }
};
exports.getAllSoftware = getAllSoftware;
