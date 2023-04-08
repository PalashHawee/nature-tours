const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/natours/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((i) => i.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
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
});

app.patch("/api/v1/tours/:id", (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<New updated Tour>",
    },
  });
});

app.delete("/api/v1/tours/:id", (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
