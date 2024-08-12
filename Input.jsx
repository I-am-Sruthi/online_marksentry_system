function Input(params){
    return (
        <div className='col-6'>
          <label>{params.Qnum}:</label>
          <input type='text' placeholder={params.Qnum} name={params.Qnum} onChange={params.Changeres} value={params.Qval}></input>
        </div>
    );
  }
export default Input;