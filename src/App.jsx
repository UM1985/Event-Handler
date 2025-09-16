import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Load from localStorage on mount  
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Save to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      // update
      const updated = [...users];
      updated[editingIndex] = { ...data, id: users[editingIndex].id };
      setUsers(updated);
      setEditingIndex(null);
    } else {
      // add
      setUsers([...users, { ...data, id: Date.now() }]);
    }
    reset();
  };

  const handleEdit = (index) => {
    const user = users[index];
    for (const key in user) {
      setValue(key, user[key]); // prefill fields
    }
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="container shadow-lg rounded-4 m-5 p-5 w-50 bg-light mx-auto">
        <h2 className="text-center mb-4 text-success">🏋️ Gym Admission Form</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="form-label fw-bold">Full Name</label>
            <input
              {...register("fullName", { required: true })}
              type="text"
              className="form-control"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="form-label fw-bold">Email Address</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="form-label fw-bold">Phone Number</label>
            <input
              {...register("phone", { required: true })}
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="form-label fw-bold">Age</label>
            <input
              {...register("age")}
              type="number"
              className="form-control"
              placeholder="Enter your age"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-bold">Password</label>
            <input
              {...register("password")}
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
              <input
                {...register("gender")}
                id="male"
                type="radio"
                value="male"
              />{" "}
              <label htmlFor="male">Male</label>
              <input
                {...register("gender")}
                id="female"
                type="radio"
                value="female"
                className="ms-3"
              />{" "}
              <label htmlFor="female">Female</label>
            </div>
          </div>

          {/* Membership */}
          <div className="mb-3">
            <label className="form-label fw-bold">Membership Type</label>
            <select {...register("membership")} className="form-select">
              <option value="">-- Select Membership --</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Goals */}
          <div className="mb-3">
            <label className="form-label fw-bold">Fitness Goal</label>
            <div>
              <input
                type="checkbox"
                value="Weight Loss"
                {...register("goals")}
                id="weightloss"
              />
              <label htmlFor="weightloss"> Weight Loss</label>
              <input
                type="checkbox"
                value="Muscle Gain"
                {...register("goals")}
                id="musclegain"
                className="ms-3"
              />
              <label htmlFor="musclegain"> Muscle Gain</label>
              <input
                type="checkbox"
                value="General Fitness"
                {...register("goals")}
                id="generalfitness"
                className="ms-3"
              />
              <label htmlFor="generalfitness"> General Fitness</label>
            </div>
          </div>

          {/* City */}
          <div className="mb-3">
            <label className="form-label fw-bold">City</label>
            <select {...register("city")} className="form-select">
              <option value="">-- Select City --</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Surat">Surat</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Joining Date */}
          <div className="mb-3">
            <label className="form-label fw-bold">Joining Date</label>
            <input {...register("joiningDate")} type="date" className="form-control" />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success px-4 py-2">
              {editingIndex !== null ? "Update" : "Submit Admission"}
            </button>
          </div>
        </form>
      </div>

      {/* 🔽 Data Table */}
      <div className="container w-75 bg-white shadow rounded-4 p-4 mt-4">
        <h4 className="text-success mb-3">✅ Members List</h4>
        {users.length === 0 ? (
          <p className="text-muted">No members added yet.</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Membership</th>
                <th>Goals</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id}>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.membership}</td>
                  <td>
                    {Array.isArray(u.goals) ? u.goals.join(", ") : u.goals}
                  </td>
                  <td>{u.city}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(i)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(i)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default App;
