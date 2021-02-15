// Data from https://data.giss.nasa.gov/gistemp
// Mean from https://earthobservatory.nasa.gov/world-of-

chartIt();

// Creation of our own Chart
async function chartIt() {
  const data = await getData(); // Wait for this data before charting it
  const ctx = document.getElementById("chart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",

    // The data for our dataset
    data: {
      labels: data.xs,
      datasets: [
        {
          label:
            "Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies in Celcius",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: data.ys,
          borderWith: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value, index, values) {
                return value + "deg";
              },
            },
          },
        ],
      },
    },
  });
}

async function getData() {
  const xs = [];
  const ys = [];
  const response = await fetch("data/GLB.Ts+dSST.csv");
  const data = await response.text();

  const table = data.split("\n").slice(1); // seperate my rows with a newline char and remove the first row
  // Difference between mean data globally in 2 years
  table.forEach((row) => {
    const columns = row.split(",");
    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    ys.push(parseFloat(temp) + 14); // The 14 is the global mean in degrees
    console.log(year, temp);
  });
  return { xs, ys };
}
