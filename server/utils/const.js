
const { Op, Sequelize, where } = require("sequelize");
const unitMasterial = ["kg", "gram", "phần", "lít", "quả", "con", "thùng"];
const apiQueryRest = (params) => {
    const { _offset, _limit, _sort, _order, ...rest } = params;
    let query = { raw: true }
    if (_limit) query.limit = +_limit;
    if (_offset) query.offset = +_offset;
    if (_sort) query.order = [[_sort, _order]];
    if (rest) {
        const whereConditions = {};
        for (let [index, value] of Object.entries(params)) {
            const key = index.substring(1);
            const [op, opValue] = value.split("_");
            if (!whereConditions[key]) {
                whereConditions[key] = {};
            }
            whereConditions[key][Op[op]] = opValue;
        }
        query.where = { ...whereConditions };
    }
    return query
}
module.exports = { unitMasterial, apiQueryRest }