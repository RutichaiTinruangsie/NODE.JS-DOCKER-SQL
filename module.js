const paramRequired = (paraName) => {
  return {
    success: true,
    data: { status: "failed", message: paraName + " is required" },
  };
};

module.exports = {
  paramRequired,
};
