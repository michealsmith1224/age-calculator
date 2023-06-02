import "./App.css";
import Container from "react-bootstrap/Container";
import { useState } from "react";

import submit from "./img/icon-arrow.svg";

function App(params) {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formvalues, setformvalues] = useState({
    day: "",
    month: "",
    year: "",
  });
  const handlesubmit = (e) => {
    e.preventDefault(); //prevent reloading of the page when submitted
    setFormErrors(validate(formvalues));
    setIsSubmit(true);
  };
  const validate = (values) => {
    let errors = {};
    const regex = /[0-9]/;
    const date = new Date();
    const lastDayInAMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    );

    if (values.day === "") {
      errors.day = "cannot be empty";
    } else if (!regex.test(values.day)) {
      errors.day = "Must be a valid day";
    } else if (values.day < 1 || values.day > lastDayInAMonth.getDate()) {
      errors.day = "invalid day";
    }
    // ==================end of day input validation ==-============
    if (!values.month) {
      errors.month = "cannot be empty";
    } else if (!regex.test(values.month)) {
      errors.month = "Must be a valid month";
    } else if (values.month < 1 || values.month > 12) {
      errors.month = "invalid month";
    }

    // ================end of month input validation ============
    if (!values.year) {
      errors.year = "cannot be empty";
    } else if (!regex.test(values.year)) {
      errors.year = "Must be a valid year";
    } else if (values.year > date.getFullYear()) {
      errors.year = "must be in the past";
    }

    // ==================ensd of year input validation ======================

    return errors;
  };

  const handlechange = (e) => {
    const { value, name } = e.target;
    setformvalues({ ...formvalues, [name]: value });
    setIsSubmit(false);
  };

  // perosns age details ========

  return (
    <div className="App">
      <Container>
        <div className="card p-5 ">
          <div className="inputes">
            <form onSubmit={handlesubmit}>
              <div className="input gap-3 d-flex justify-content-start">
                <div className="day">
                  <div className="text1">
                    <p
                      className={
                        Object.keys(formErrors).includes("day") && isSubmit
                          ? "text-danger mb-1"
                          : "mb-1"
                      }
                    >
                      DAY
                    </p>
                  </div>
                  <div className="text2">
                    <input
                      style={{
                        border:
                          Object.keys(formErrors).includes("day") && isSubmit
                            ? "1px solid #dc3545"
                            : "",
                      }}
                      type="text"
                      name="day"
                      value={formvalues.day}
                      onChange={handlechange}
                      placeholder="DD"
                    />
                  </div>
                  <div className="error">
                    <i className="text-danger">{formErrors.day}</i>
                  </div>
                </div>
                <div className="month">
                  <div className="text1">
                    <p
                      className={
                        Object.keys(formErrors).includes("month") && isSubmit
                          ? "text-danger mb-1"
                          : "mb-1"
                      }
                    >
                      MONTH
                    </p>
                  </div>
                  <div className="text2">
                    <input
                      style={{
                        border:
                          Object.keys(formErrors).includes("month") && isSubmit
                            ? "1px solid #dc3545"
                            : "",
                      }}
                      type="text"
                      value={formvalues.month}
                      onChange={handlechange}
                      name="month"
                      placeholder="MM"
                    />
                  </div>
                  <div className="error">
                    <i className="text-danger">{formErrors.month}</i>
                  </div>
                </div>
                <div className="year">
                  <div className="text1">
                    <p
                      className={
                        Object.keys(formErrors).includes("year") && isSubmit
                          ? "text-danger mb-1"
                          : "mb-1"
                      }
                    >
                      YEAR
                    </p>
                  </div>
                  <div className="text2">
                    <input
                      style={{
                        border:
                          Object.keys(formErrors).includes("year") && isSubmit
                            ? "1px solid #dc3545"
                            : "",
                      }}
                      type="text"
                      name="year"
                      value={formvalues.year}
                      onChange={handlechange}
                      placeholder="YYYY"
                    />
                  </div>
                  <div className="error">
                    <i className="text-danger">{formErrors.year}</i>
                  </div>
                </div>
              </div>
              <div className="button">
                <div className="hr">
                  <hr />
                </div>
                <button type="submit">
                  {" "}
                  <img className="img-fluid" src={submit} alt="" />
                </button>
              </div>
            </form>
          </div>
          <div className="outputes mt-4">
            <small className="text-secondary note">
              NB: it tells you your age and how many month and days you have
              lived
            </small>
            <p>
              <span>
                {Object.keys(formErrors).length === 0 && isSubmit
                  ? new Date().getFullYear() - formvalues.year
                  : "- -"}
              </span>
              years
            </p>

            <p>
              <span>
                {Object.keys(formErrors).length === 0 && isSubmit
                  ? formvalues.year * 12
                  : "- -"}
              </span>
              months
            </p>

            <p>
              <span>
                {Object.keys(formErrors).length === 0 && isSubmit
                  ? formvalues.year * 365
                  : "- -"}
              </span>
              days
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
