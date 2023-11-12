const moment = require("moment");
const { Op, Sequelize } = require("sequelize");
const Recipes = require("../models/recipeModel");
const Materials = require("../models/materialsModel");
const TableByOrder = require("../models/tableByOrder");
const OrderDetail = require("../models/orderDetailModel");
const Product = require("../models/productModel");
const ImageProduct = require("../models/imageModel");
const Order = require("../models/orderModel");
const unitMasterial = ["kg", "gram", "phần", "lít", "quả", "con", "thùng"];
const apiQueryRest = (params) => {
    const { _offset, _limit, _sort, _order, q, title, _noQuery, ...rest } = params;
    let query = { distinct: true };
    if (_noQuery === 1) return query.raw = true;
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
    const totalQuantity = pr.map(sp => {
        const totalmaterial = recipes
            .filter(recipe => recipe.id_product === sp.id)
            .map(recipe => ({
                id_material: recipe.id_material,
                total: recipe.quantity * sp.quantity,
                id_product: sp.id
            }));
        return totalmaterial;
    });
    return totalQuantity
}

const getQtyMaterialByProduct = async (product) => {
    let data = await Recipes.findAll({ attributes: ["id_material", "quantity", "id_product"], where: { id_product: product.id }, raw: true });
    const result = data.map(recipe => ({
        id_material: recipe.id_material,
        total: recipe.quantity * product.quantity,
        id_product: product.id
    }))
    return result
}


const checkQtyMaterials = async (data, model) => {
    const checkOver = await model.findAll({
        where: {
            [Op.or]: data.map((item) => ({
                id: item.id_material,
                amount: {
                    [Op.gte]: item.total
                }
            }))
        }, raw: true
    });
    return checkOver.length === data.length;
}

const bien = {
    include: {
        model: OrderDetail, attributes: ["id", "quantity", "id_order", "id_product"],
        include: {
            model: Product, attributes: ["id", "name_product", "price", "status"],
            include: { model: ImageProduct, attributes: ["url"], }
        }
    }
}

function tinhWeek(weekNumber) {
    const allDaysInWeek = [];
    moment.locale('vi');
    const year = moment().year();
    const startDate = moment().year(year).isoWeek(weekNumber).startOf('isoWeek');
    const endDate = moment().year(year).isoWeek(weekNumber).endOf('isoWeek');

    let currentDay = startDate.clone();
    while (currentDay.isSameOrBefore(endDate)) {
        allDaysInWeek.push(currentDay.format('YYYY-MM-DD'));
        currentDay.add(1, 'days');
    }
    return allDaysInWeek;
}

function currentYear(pa = "startOf") {
    const date = moment()[pa]("year");
    return date.format("YYYY-MM-DD");
}
function isEmpty(value) {
    return (
        (value == null) ||
        (value.hasOwnProperty('length') && value.length === 0) ||
        (value.constructor === Object && Object.keys(value).length === 0) ||
        (+value === 0)
    )
}
const bookingValidate = (params) => {
    return Object.values(params).every(value => !isEmpty(value));
}


const templateSendUser = ({ createdAt, name, tableId, token }) => {
    let html = `<h1>Nhà hàng hải sản thủy tinh xin chào quý kháck</h1>
     <h3> ${name} bạn vừa đặt trước bàn số ${tableId} thời gian : ${moment(createdAt).format("DD/MM/YYYY HH:mm")} </h3>
    <p>Bạn có thể hủy đơn hàng khi click vào đây : <a href='${process.env.CLIENT_URL}/cancel-booking/${token}'>Cancel</a></p>
     `;
    return html
}




const checkBooking = async (time, tableId, dining_option = "eat-in", params = "subtract", limit = 135) => {
    let query = {}
    if (dining_option === "eat-in") {
        query = {
            include: {
                model: Order, where: {
                    status: {
                        [Op.lte]: 4,
                        [Op.ne]: 0
                    }
                }
            },
        }
    }
    query.where = {
        dining_option: dining_option,
        status: { [Op[dining_option === "eat-in" ? 'ne' : "eq"]]: "confirmed" },
        createdAt: { [Op[dining_option === "eat-in" ? "gte" : "lte"]]: moment(time)[params](limit, 'minutes') },
        tableId: Array.isArray(tableId) ? { [Op.in]: tableId } : tableId
    }
    const isEatIn = await TableByOrder.findAll(query);
    return isEatIn.length > 0;
}
module.exports = { isEmpty, checkBooking, templateSendUser, bookingValidate, currentYear, tinhWeek, bien, unitMasterial, apiQueryRest, handleTotalQty, checkQtyMaterials, getQtyMaterialByProduct };