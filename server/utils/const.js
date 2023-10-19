
const { Op } = require("sequelize");
const Recipes = require("../models/recipeModel");
const Materials = require("../models/materialsModel");
const unitMasterial = ["kg", "gram", "phần", "lít", "quả", "con", "thùng"];
const apiQueryRest = (params) => {
    const { _offset, _limit, _sort, _order, q, title, ...rest } = params;
    let query = {};
    if (_limit) query.limit = +_limit;
    if (_offset) query.offset = +_offset;
    if (q) query.where = { [title]: { [Op.substring]: q } };
    if (_sort) query.order = [[_sort, _order]];

    if (Object.keys(rest).length > 0) {
        const whereConditions = {};
        for (let [index, value] of Object.entries(rest)) {
            const key = index.substring(1);
            const [op, opValue] = value.split("_");
            if (!whereConditions[key]) {
                whereConditions[key] = {};
            }
            whereConditions[key][Op[op]] = opValue;
        }
        query.where = { ...query.where, ...whereConditions };
    }

    return query;
};


const handleTotalQty = async (pr) => {
    let recipes = await Recipes.findAll({ where: { id_product: { [Op.in]: pr.map(i => i.id) } }, raw: true });
    const totalQuantity = pr.map(order => {
        const totalQuantities = recipes
            .filter(recipe => recipe.id_product === order.id)
            .map(recipe => ({
                id_material: recipe.id_material,
                total: recipe.quantity * order.quantity,
                id_product: order.id
            }));
        return { [order.id]: totalQuantities };
    });
    return totalQuantity
}
const checkQtyMaterials = async (data, model) => {
    let checkOver = await model.findAll({
        attributes: ["id", "amount"], where: {
            [Op.or]: data.map((item) => ({
                id: item.id_material,
                amount: { [Op.lt]: parseFloat(item.total) }
            }))
        }, raw: true
    });
    return checkOver.length > 0;
}

module.exports = { unitMasterial, apiQueryRest, handleTotalQty, checkQtyMaterials };