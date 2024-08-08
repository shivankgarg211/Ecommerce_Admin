import React from "react";
import "./dashboard.css";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "Company flow chart",
};
export const data1 = [
  [
    "Month",
    "Bolivia",
    "Ecuador",
    "Madagascar",
    "Papua New Guinea",
    "Rwanda",
    "Average",
  ],
  ["2004/05", 165, 938, 522, 998, 450, 614.6],
  ["2005/06", 135, 1120, 599, 1268, 288, 682],
  ["2006/07", 157, 1167, 587, 807, 397, 623],
  ["2007/08", 139, 1110, 615, 968, 215, 609.4],
  ["2008/09", 136, 691, 629, 1026, 366, 569.6],
];

export const options1 = {
  title: "Monthly Hospital Perfomance",
  vAxis: { title: "Patient" },
  hAxis: { title: "Month" },
  seriesType: "bars",
  series: { 5: { type: "line" } },
};
function Dashboard() {
  return (
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-xl-3">
            <div class="card bg-c-blue order-card">
              <div class="card-block">
                <h6 class="m-b-20">Employee</h6>
                <h2 class="text-right">
                  <i class="fa fa-cart-plus f-left"></i>
                  <span>486</span>
                </h2>
                <p class="m-b-0">
                  Total Employee<span class="f-right">351</span>
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-xl-3">
            <div class="card bg-c-green order-card">
              <div class="card-block">
                <h6 class="m-b-20">Shops</h6>
                <h2 class="text-right">
                  <i class="fa fa-rocket f-left"></i>
                  <span>486</span>
                </h2>
                <p class="m-b-0">
                  Total Shops<span class="f-right">351</span>
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-xl-3">
            <div class="card bg-c-yellow order-card">
              <div class="card-block">
                <h6 class="m-b-20">Users</h6>
                <h2 class="text-right">
                  <i class="fa fa-refresh f-left"></i>
                  <span>486</span>
                </h2>
                <p class="m-b-0">
                  Total Users<span class="f-right">351</span>
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-xl-3">
            <div class="card bg-c-pink order-card">
              <div class="card-block">
                <h6 class="m-b-20">Revenue</h6>
                <h2 class="text-right">
                  <i class="fa fa-credit-card f-left"></i>
                  <span>486</span>
                </h2>
                <p class="m-b-0">
                  Total Revenue<span class="f-right">351</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        </div>
        <div className="chart">
          <Chart
            chartType="ComboChart"
            width="100%"
            height="400px"
            data={data1}
            options={options1}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
