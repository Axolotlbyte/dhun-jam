import { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { Chart } from "react-google-charts";
import "./dashboard.css";
// {
//   "id": 4,
//   "name": "Diona",
//   "location": "Jaipur",
//   "charge_customers": true,
//   "amount": {
//       "category_6": 999,
//       "category_7": 200,
//       "category_8": 500,
//       "category_9": 545,
//       "category_10": 900
//   }
// }

export default function Dashboard({}) {
  const [data, setData] = useState({
    id: null,
    name: "Loading... ",
    location: "",
    charge_customers: true,
    amount: {
      category_6: 99,
      category_7: 79,
      category_8: 59,
      category_9: 39,
      category_10: 19,
    },
  });

  const [disabled, setDisabled] = useState(false);

  const dataCh = [
    ["", "Songs"],
    ["Custom", data.amount.category_6],
    ["Category 1", data.amount.category_7],
    ["Category 2", data.amount.category_8],
    ["Category 3", data.amount.category_9],
    ["Category 4", data.amount.category_10],
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://stg.dhunjam.in/account/admin/4");

        // console.log(res.data);

        return setData({ ...res.data.data });
      } catch (error) {
        console.log(error);
        return;
      }
    };

    getData();
  }, []);

  const handleSave = () => {
    try {
      const res = axios.put("", {});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full min-h-screen bg-black">
      <div style={{ width: "600px" }} className=" mx-auto ">
        {/* Heading */}
        <h1 className="py-5 font-extrabold">
          {data.name}, {data.location} at Dhun Jam
        </h1>

        <form className="flex gap-8 flex-col text-left">
          {/* Point 3 */}
          <div className="flex gap-5 items-center justify-center">
            <p className="w-1/2">
              Do you want to charge your customers for requesting songs?
            </p>
            <div className="w-1/2 flex gap-5 justify-center items-center">
              <label className="flex gap-2 items-center justify-center">
                <input
                  value={"yes"}
                  type="radio"
                  checked={data.charge_customers}
                />
                Yes
              </label>
              <label className="flex gap-2 items-center justify-center">
                <input
                  value={"no"}
                  type="radio"
                  checked={!data.charge_customers}
                />
                No
              </label>
            </div>
          </div>

          {/* Custom Song Amount */}
          <div className="flex gap-5 items-center justify-center">
            <p className="w-1/2">Custom song request amount - </p>
            <div className="w-1/2">
              <input
                style={{ maxWidth: "300px" }}
                className="py-2 px-2 rounded-lg border border-white bg-transparent"
                type="number"
                placeholder="enter amount"
                value={data.amount.category_6}
                disabled={!data.charge_customers}
              />
            </div>
          </div>

          {/* Regular Songs */}
          <div className="flex gap-5 items-center justify-center">
            <p className="w-1/2">
              Regular song request amount from high to low -
            </p>
            <div className="flex shrink-0 gap-2 w-1/2">
              <input
                className="w-1/4 p-2 border border-white rounded-lg bg-transparent"
                type="number"
                placeholder="0"
                value={data.amount.category_10}
                disabled={!data.charge_customers}
              />
              <input
                className="w-1/4 p-2 border border-white rounded-lg bg-transparent"
                type="number"
                placeholder="0"
                value={data.amount.category_9}
                disabled={!data.charge_customers}
              />
              <input
                className="w-1/4 p-2 border border-white rounded-lg bg-transparent"
                type="number"
                placeholder="0"
                value={data.amount.category_8}
                disabled={!data.charge_customers}
              />
              <input
                className="w-1/4 p-2 border border-white rounded-lg bg-transparent"
                type="number"
                placeholder="0"
                value={data.amount.category_7}
                disabled={!data.charge_customers}
              />
            </div>
          </div>

          {/* Graph */}
          <div>
            {/* <Plot
              className="bg-transparent"
              data={[
                {
                  type: "bar",
                  colorbar: { color: "#F0C3F1" },
                  colorscale: { color: "#000000" },

                  x: [1, 2, 3, 4, 5],
                  y: [
                    data.amount.category_6,
                    data.amount.category_7,
                    data.amount.category_8,
                    data.amount.category_9,
                    data.amount.category_10,
                  ],
                },
              ]}
              layout={{ width: 600, height: 600, colorway: "" }}
            /> */}
            <Chart
              chartType="Bar"
              width="100%"
              height="400px"
              data={dataCh}
              options={{}}
              className="bg-black"
              // options={options}
            />
          </div>

          <button
            className={"input-button" + (data.charge_customers ? "" : " ")}
            disabled
            onClick={() => ""}
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
