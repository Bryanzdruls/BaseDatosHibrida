"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const users = yield user_1.default.findAll();
        res.json({
            users,
            body: req.body,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'internal server error'
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(500).json({
                msg: 'user doesnt exist',
            });
        }
        res.json({
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'internal server error'
        });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const existEmail = yield user_1.default.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (existEmail) {
            return res.status(400).json({
                msg: 'Email already exists'
            });
        }
        const user = yield user_1.default.create({ name, email });
        res.status(200).json({
            msg: 'user created',
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'internal server error'
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'User doesnt exist'
            });
        }
        yield user.update(body);
        res.status(200).json({
            msg: 'user updated',
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'internal server error'
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'User doesnt exist'
            });
        }
        yield user.update({ state: false });
        res.status(200).json({
            msg: 'user updated',
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'internal server error'
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map