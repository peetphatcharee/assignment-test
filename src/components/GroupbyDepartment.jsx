import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  
  const groupedUsers = users.reduce((acc, user) => {
    const dept = user.company.department;

    if (!acc[dept]) {
      acc[dept] = {
        male: 0,
        female: 0,
        ageRange: "",
        minAge: user.age,
        maxAge: user.age,
        hair: {},
        addressUser: {},
      };
    }

    acc[dept][user.gender]++;
    acc[dept].minAge = Math.min(acc[dept].minAge, user.age);
    acc[dept].maxAge = Math.max(acc[dept].maxAge, user.age);
    acc[dept].ageRange = `${acc[dept].minAge}-${acc[dept].maxAge}`;

    if (user.hair && user.hair.color) {
      const color = user.hair.color.trim();
      acc[dept].hair[color] = (acc[dept].hair[color] || 0) + 1;
    }

    const userKey = `${user.firstName}${user.lastName}`;
    acc[dept].addressUser[userKey] = user.address.postalCode;

    return acc;
  }, {});

  const fetchUsers = async () => {
    axios.get("https://dummyjson.com/users")
    .then(response => setUsers(response.data.users))
    .catch(error => console.error(error));
};
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>User Groups by Department</h3>
      {Object.entries(groupedUsers).map(([department, data]) => (
        <div key={department} className="department-wrapper">
          <details open  className="json-data">
            <summary>{department}</summary>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </details>
        </div>
      ))}
    </div>
  );
}
