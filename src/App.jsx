import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  function inputValue(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setUser((prev) => {
        let updatedGoals = prev.goals || [];
        if (checked) {
          updatedGoals = [...updatedGoals, value];
        } else {
          updatedGoals = updatedGoals.filter((goal) => goal !== value);
        }
        return { ...prev, [name]: updatedGoals };
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  }

  function signUp(e) {
    e.preventDefault();
    setSubmittedData(user); // show data after submit
  }

  return (
    <>
      <div className="container shadow-lg rounded-4 m-5 p-5 w-50 bg-light mx-auto">
        <h2 className="text-center mb-4 text-success">🏋️ Gym Admission Form</h2>

        <form onSubmit={signUp}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="form-label fw-bold" htmlFor="fullName" >Full Name</label>
            <input
            id="fullName"
              name="fullName" 
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              onChange={inputValue}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="form-label fw-bold"  htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={inputValue}
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="form-label fw-bold"  htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
              onChange={inputValue}
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="form-label fw-bold"  htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              className="form-control"
              placeholder="Enter your age"
              onChange={inputValue}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-bold"  htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={inputValue}
            />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label"  htmlFor="gender">Gender</label>
            <div>
              <input
                id="male"
                name="gender"
                type="radio"
                value="male"
                onChange={inputValue}
              />{" "}
              <label htmlFor="male">Male</label>
              
              <input

                id="female"
                name="gender"
                type="radio"
                value="female"
                className="ms-3"
                onChange={inputValue}
              />{" "}
              <label htmlFor="female">Female</label>
              
            </div>
          </div>

          {/* Membership Plan */}
          <div className="mb-3">
            <label className="form-label fw-bold"  htmlFor="membership">Membership Type</label>
            <select id="membership" name="membership" className="form-select" onChange={inputValue}>
              <option value="" disabled selected>
                -- Select Membership --
              </option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Fitness Goals */}
          <div className="mb-3">
            <label className="form-label fw-bold"  >Fitness Goal</label>
            <div>
              <input
                id="weightloss"
                name="goals"
                type="checkbox"
                value="Weight Loss"
                onChange={inputValue}
              />{" "}
              <label htmlFor="weightloss"> Weight Loss</label>
             
              <input
                id="musclegain"
                name="goals"
                type="checkbox"
                value="Muscle Gain"
                className="ms-3"
                onChange={inputValue}
              />{" "}
              <label htmlFor="musclegain"> Muscle Gain</label>
             
              <input
                id="generalfitness"
                name="goals"
                type="checkbox"
                value="General Fitness"
                className="ms-3"
                onChange={inputValue}
              />{" "}
              <label htmlFor="generalfitness">General Fitness</label>
              
            </div>
          </div>

          {/* City */}
          <div className="mb-3">
            <label className="form-label fw-bold"  htmlFor="city">City</label>
            <select id="city" name="city" className="form-select" onChange={inputValue}>
              <option value="" disabled selected>
                -- Select City --
              </option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Surat">Surat</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Joining Date */}
          <div className="mb-3">
            <label className="form-label fw-bold"  htmlFor="joiningDate">Joining Date</label>
            <input
              id="joiningDate"
              name="joiningDate"
              type="date"
              className="form-control"
              onChange={inputValue}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-success px-4 py-2">
              Submit Admission
            </button>
          </div>
        </form>
      </div>

      {/* 🔽 Data Display Section */}
      {submittedData && (
        <div className="container w-50 bg-white shadow rounded-4 p-4 mt-4">
          <h4 className="text-success mb-3">✅ Submitted Data</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Full Name</th>
                <td>{submittedData.fullName}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{submittedData.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{submittedData.phone}</td>
              </tr>
              <tr>
                <th>Age</th>
                <td>{submittedData.age}</td>
              </tr>
              <tr>
                <th>Password</th>
                <td>{submittedData.password}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{submittedData.gender}</td>
              </tr>
              <tr>
                <th>Membership</th>
                <td>{submittedData.membership}</td>
              </tr>
              <tr>
                <th>Goals</th>
                <td>{submittedData.goals?.join(", ")}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{submittedData.city}</td>
              </tr>
              <tr>
                <th>Joining Date</th>
                <td>{submittedData.joiningDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default App;
