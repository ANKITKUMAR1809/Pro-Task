import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const StatDashboard = () => {
  const [stat, setStat] = useState(null);
  const {user}= useAuth();
  useEffect(() => {
    axios
      .post("http://localhost:3000/api/user/get-stat", {
        email: user.email,
      })
      .then((res) => {
        if (res.data.success) {
          setStat(res.data);
        }
      });
  }, []);

  if (!stat) return null;

  const createdDate = new Date(stat.createdAt);
  const lastStrike = stat.lastStrikeDate
    ? new Date(stat.lastStrikeDate)
    : null;

  const daysSinceJoin = Math.floor(
    (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const isActiveToday =
    lastStrike &&
    lastStrike.toDateString() === new Date().toDateString();

  return (
    <section className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Your Activity Stats
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Current Streak" value={`${stat.strikeCount} 🔥`} />
        <StatCard
          title="Last Active"
          value={
            lastStrike
              ? lastStrike.toLocaleDateString()
              : "No activity yet"
          }
        />
        <StatCard
          title="Joined"
          value={createdDate.toLocaleDateString()}
        />
        <StatCard
          title="Status"
          value={isActiveToday ? "Active Today ✅" : "Inactive ❌"}
        />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Active for {daysSinceJoin} days
      </p>
    </section>
  );
};

const StatCard = ({ title, value }) => (
  <div className="border rounded-lg p-4 text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default StatDashboard;
