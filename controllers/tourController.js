const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../natours/dev-data/data/tours-simple.json`)
);

//Param Middleware for checking tour ID
exports.checkID = (req, res, next, val) => {
  console.log(`Your tour ID is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }
  next();
};

//Checking if the post contains the name and price
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide name and price",
    });
  }
  next();
};

// 2)ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((i) => i.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  //   handling ID for new tour
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  //Merging the tours with the new tour
  fs.writeFile(
    `${__dirname}/natours/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",

        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<New updated Tour>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
//////End of Handlers
