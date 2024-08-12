function Mid2Component(props){
    // Define state variables and functions here if needed

    return (
      <div>
        <div>
                      <p className="u1">Unit-3</p>
                      <div className="form-group">
                        <label for="Q1">Q1</label>
                        <select id="Q1" className="form-select" aria-label="Default select example" onChange={props.q1func} name='Q1' value={props.selfunc.Q1}>
                          <option selected>select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label for="Q2">Q2</label>
                        <select id="Q2" className="form-select" aria-label="Default select example" onChange={props.q1func} name='Q2' value={props.selfunc.Q2}>
                          <option selected>select </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <p className="u1">Unit-4</p>
                      <div className="form-group">
                        <label for="Q3">Q3</label>
                        <select id="Q3" className="form-select" aria-label="Default select example" onChange={props.q1func} name='Q3' value={props.selfunc.Q3}>
                          <option selected>select </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label for="Q4">Q4</label>
                        <select id="Q4" className="form-select" aria-label="Default select example" onChange={props.q1func} name='Q4' value={props.selfunc.Q4}>
                          <option selected>select </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <p className="u1">Unit-5</p>
                      <div className="form-group">
                        <label for="Q5">Q5</label>
                        <select id="Q5" className="form-select" aria-label="Default select example" onChange={props.q1func} name='Q5' value={props.selfunc.Q5}>
                          <option selected>select </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label for="Q6">Q6</label>
                        <select id="Q6" className="form-select" aria-label="Default select example" onChange={props.q1func} name='Q6' value={props.selfunc.Q6}>
                          <option selected>select </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                    </div>
      </div>
    );
  };

export default Mid2Component;