import logo from "./logo.svg";
import "./SignUpSpecialist.css";


function SingUp(){


}


function SignUpSpecialist() {
  return (
    <div>
      <div className="row" style={{ width: "40%", margin: "0 auto" }}>
        <div className="col-4">
          <h1 style={{ float: "right" }}>DermoApp</h1>
        </div>
        <div className="col-8">
          <select style={{ width: "270%" }} class="selectpicker">
            <option data-content='<span class="flag-icon flag-icon-us"></span> English'>
              English
            </option>
            <option data-content='<span class="flag-icon flag-icon-mx"></span> Español'>
              Español
            </option>
          </select>

        </div>
      </div>
      <br />

      <form style={{ width: "100%", margin: "0 auto" }}>
        <div className="form-group">
          <input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Name"
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            id="exampleInputPassword1"
            placeholder="LastName"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Confirm Your Email"
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            id="exampleInputPassword1"
            placeholder="User"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Confirm Password"
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Do you accept terms and conditions?
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Specialist
        </button>
      </form>
    </div>
  );
}

export default SignUpSpecialist;
