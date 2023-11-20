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
  const [reload, setReload] = useState(false);
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

    const userData = localStorage.getItem("userData");

    console.log(userData)

    getData();
  }, [reload]);

  useEffect(() => {
    if (data.charge_customers) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [data.charge_customers]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const body = {
        amount: {
          category_6: data.amount.category_6,
          category_7: data.amount.category_7,
          category_8: data.amount.category_8,
          category_9: data.amount.category_9,
          category_10: data.amount.category_10,
        },
      };

      const res = await axios.put("https://stg.dhunjam.in/account/admin/4", {
        ...body,
      });

      console.log(body);

      alert("Success!");

      return setData({ ...data, ...res.data.data });
    } catch (error) {
      console.log(error);
      alert("an error occured!");
      return setReload(!reload);
    }
  };

  return (
    <div className="w-full bg-black">
      <div style={{ width: "600px" }} className=" mx-auto h-fit ">
        {/* Heading */}
        <h1 className="py-5 font-extrabold mb-10">
          {data.name}, {data.location} at Dhun Jam
        </h1>

        <form className="flex gap-8 flex-col h-fit text-left">
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
                  onClick={() => setData({ ...data, charge_customers: true })}
                />
                Yes
              </label>
              <label className="flex gap-2 items-center justify-center">
                <input
                  value={"no"}
                  type="radio"
                  checked={!data.charge_customers}
                  onClick={() => setData({ ...data, charge_customers: false })}
                />
                No
              </label>
            </div>
          </div>

          {/* Custom Song Amount */}
          <div className="flex h-fit gap-5 items-center justify-center">
            <p className="w-1/2">Custom song request amount - </p>
            <div className="w-1/2">
              <input
                style={{ maxWidth: "300px" }}
                id={""}
                className={"py-2 px-2 rounded-lg border border-white" + (data.charge_customers ? " bg-transparent" : " disabled-button cursor-not-allowed")}
                type="number"
                placeholder="enter amount"
                value={data.amount.category_6}
                disabled={!data.charge_customers}
                onChange={(e) =>
                  setData({
                    ...data,
                    amount: { ...data.amount, category_6: e.target.value },
                  })
                }
              />
            </div>
          </div>

          {/* Regular Songs */}
          <div className="flex h-fit gap-5 items-center justify-center">
            <p className="w-1/2">
              Regular song request amount from high to low -
            </p>
            <div className="flex shrink-0 gap-2 w-1/2">
              <input
                className={"w-1/4 p-2 border border-white rounded-lg" + (data.charge_customers ? " bg-transparent" : " disabled-button cursor-not-allowed")}
                type="number"
                placeholder="0"
                value={data.amount.category_10}
                disabled={!data.charge_customers}
                onChange={(e) =>
                  setData({
                    ...data,
                    amount: { ...data.amount, category_10: e.target.value },
                  })
                }
              />
              <input
                className={"w-1/4 p-2 border border-white rounded-lg" + (data.charge_customers ? " bg-transparent" : " disabled-button cursor-not-allowed")}
                type="number"
                placeholder="0"
                value={data.amount.category_9}
                disabled={!data.charge_customers}
                onChange={(e) =>
                  setData({
                    ...data,
                    amount: { ...data.amount, category_9: e.target.value },
                  })
                }
              />
              <input
                className={"w-1/4 p-2 border border-white rounded-lg" + (data.charge_customers ? " bg-transparent" : " disabled-button cursor-not-allowed")}
                type="number"
                placeholder="0"
                value={data.amount.category_8}
                disabled={!data.charge_customers}
                onChange={(e) =>
                  setData({
                    ...data,
                    amount: { ...data.amount, category_8: e.target.value },
                  })
                }
              />
              <input
                className={"w-1/4 p-2 border border-white rounded-lg" + (data.charge_customers ? " bg-transparent" : " disabled-button cursor-not-allowed")}
                type="number"
                placeholder="0"
                value={data.amount.category_7}
                disabled={!data.charge_customers}
                onChange={(e) =>
                  setData({
                    ...data,
                    amount: { ...data.amount, category_7: e.target.value },
                  })
                }
              />
            </div>
          </div>

          {/* Graph */}
          <div>
            <Chart
              chartType="Bar"
              width="100%"
              height="400px"
              data={dataCh}
              options={{
                width: "600px",
                height: "600px",
                backgroundColor: "#000000",
                chartArea: {
                  backgroundColor: {
                    fill: "#000000",
                    fillOpacity: 0.8,
                  },
                },
                // Colors the entire chart area, simple version
                // backgroundColor: '#FF0000',
                // Colors the entire chart area, with opacity
              }}
            />
          </div>

          <button
            className={
              "ds-button " +
              (data.charge_customers ? "" : " cursor-not-allowed")
            }
            id={data.charge_customers ? "enabled-button" : "disabled-button"}
            onClick={(e) => handleSave(e)}
            type="submit"
            disabled={!data.charge_customers}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
