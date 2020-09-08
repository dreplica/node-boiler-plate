"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../config/validator");
var pg_config_1 = __importDefault(require("../model/pg-config"));
var joi_1 = __importDefault(require("joi"));
var sql = pg_config_1.default.sql;
var Request = /** @class */ (function () {
    function Request() {
    }
    Request.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sql(templateObject_1 || (templateObject_1 = __makeTemplateObject([" \n\t\t\t\tSELECT org.organization,org.id, org.address,org.ceo,emp.employee,prod.product\n                FROM organization org\n                JOIN  employees emp \n                ON emp.organizationid = org.id\n                JOIN products prod\n\t\t\t\tON emp.organizationid = prod.organizationid\n\t\t\t\t"], [" \n\t\t\t\tSELECT org.organization,org.id, org.address,org.ceo,emp.employee,prod.product\n                FROM organization org\n                JOIN  employees emp \n                ON emp.organizationid = org.id\n                JOIN products prod\n\t\t\t\tON emp.organizationid = prod.organizationid\n\t\t\t\t"])))];
                    case 1:
                        result = _a.sent();
                        data = result.map(function (item) {
                            item.employee = item.employee.split(',');
                            item.product = item.product.split(',');
                            item.totalEmployees = item.employee.length;
                            return item;
                        });
                        return [2 /*return*/, { data: data, code: 200 }];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, { error: "sorry couldn't retrieve data" + error_1, code: 400 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Request.prototype.post = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, item, error, checkName, organization, employ, prod, employees, products, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = validator_1.checkPostSchema.validate(post), item = _a.value, error = _a.error;
                        if (error)
                            throw new Error(error.message);
                        return [4 /*yield*/, sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SELECT organization FROM organization WHERE organization=", ""], ["SELECT organization FROM organization WHERE organization=", ""])), item.organization)];
                    case 1:
                        checkName = _b.sent();
                        if (checkName.length)
                            throw new Error('Sorry user already exist');
                        return [4 /*yield*/, sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["INSERT INTO organization VALUES(uuid_generate_v4(), \n\t\t\t", ",", ",", ") Returning *"], ["INSERT INTO organization VALUES(uuid_generate_v4(), \n\t\t\t", ",", ",", ") Returning *"])), item.organization, item.ceo, item.address)];
                    case 2:
                        organization = (_b.sent())[0];
                        return [4 /*yield*/, sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["INSERT INTO employees VALUES(uuid_generate_v4(),\n\t\t\t", ", ", ") Returning *"], ["INSERT INTO employees VALUES(uuid_generate_v4(),\n\t\t\t", ", ", ") Returning *"])), organization.id, item.employees.join(','))];
                    case 3:
                        employ = (_b.sent())[0].employee;
                        return [4 /*yield*/, sql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["INSERT INTO products VALUES(uuid_generate_v4(),\n\t\t\t", ", ", ") Returning *"], ["INSERT INTO products VALUES(uuid_generate_v4(),\n\t\t\t", ", ", ") Returning *"])), organization.id, item.products.join(','))];
                    case 4:
                        prod = (_b.sent())[0].product;
                        employees = employ.split(',');
                        products = prod.split(',');
                        return [2 /*return*/, {
                                data: __assign(__assign({}, organization), { employees: employees, totalEmployees: employees.length, products: products }),
                                code: 200
                            }];
                    case 5:
                        error_2 = _b.sent();
                        return [2 /*return*/, { error: error_2.message, code: 404 }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Request.prototype.put = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    Request.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var idSchema, value, error;
            return __generator(this, function (_a) {
                try {
                    idSchema = joi_1.default.object({
                        id: joi_1.default.string().guid({ version: 'uuidv4' })
                    })
                        .validate({ id: id });
                    value = idSchema.value, error = idSchema.error;
                    if (error)
                        throw new Error("sorry couldn't delete");
                    sql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["DELETE FROM organization WHERE id=", ""], ["DELETE FROM organization WHERE id=", ""])), value.id);
                    return [2 /*return*/, { data: 'item deleted', code: 200 }];
                }
                catch (error) {
                    return [2 /*return*/, { error: error.message, code: 404 }];
                }
                return [2 /*return*/];
            });
        });
    };
    return Request;
}());
exports.default = Request;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
