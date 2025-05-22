"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequestStatus = exports.getRequests = exports.submitRequest = void 0;
const data_source_1 = require("../data-source");
const Request_1 = require("../entities/Request");
const User_1 = require("../entities/User");
const Software_1 = require("../entities/Software");
const requestRepo = data_source_1.AppDataSource.getRepository(Request_1.Request);
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
const softwareRepo = data_source_1.AppDataSource.getRepository(Software_1.Software);
const submitRequest = async (req, res) => {
    const { softwareId, accessType, reason } = req.body;
    const user = await userRepo.findOneBy({ id: req.user.id });
    const software = await softwareRepo.findOneBy({ id: softwareId });
    if (!user || !software) {
        res.status(400).json({ message: "Invalid user or software" });
        return;
    }
    const request = requestRepo.create({ user, software, accessType, reason, status: "Pending" });
    await requestRepo.save(request);
    res.status(201).json({ message: "Request submitted" });
};
exports.submitRequest = submitRequest;
const getRequests = async (_req, res) => {
    const requests = await requestRepo.find({ relations: ["user", "software"] });
    res.json(requests);
};
exports.getRequests = getRequests;
const updateRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const request = await requestRepo.findOneBy({ id: parseInt(id) });
    if (!request) {
        res.status(404).json({ message: "Request not found" });
        return;
    }
    request.status = status;
    await requestRepo.save(request);
    res.json({ message: `Request ${status.toLowerCase()}` });
};
exports.updateRequestStatus = updateRequestStatus;
 