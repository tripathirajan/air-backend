const airlineModel = require("../models/airlineModel");
const { StatusCodes: HttpStatusCode } = require("http-status-codes");

const defaultFilter = {};
const getAllAirline = async (_, res) => {
  const airlineList = await airlineModel.find({});
  if (!airlineList || airlineList.length === 0) {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      success: false,
      message: "No data found!",
      result: [],
    });
  }
  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Success!",
    result: airlineList,
  });
};

const getAirlineInfo = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(HttpStatusCode.NOT_FOUND).json({
      success: false,
      message: "No data found!",
      result: [],
    });

  const airlineInfo = await airlineModel.findById(id);
  if (!airlineInfo || Object.keys(airlineInfo)?.length === 0) {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      success: false,
      message: "No data found!",
      result: [],
    });
  }
  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Success!",
    result: airlineInfo,
  });
};

const addNewAirline = (req, res) => {};

const updateAirline = (req, res) => {};

module.exports = {
  getAllAirline,
  getAirlineInfo,
  addNewAirline,
  updateAirline,
};
