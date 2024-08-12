import "./Styles.css";
import React from 'react';

function Uploadexcelbutton(){
    return(
        <span className="upperfixed">
            <div className='exceluploadbutton'>
                <button type="button" class="btn btn-success"><i class="bi bi-box-arrow-right"></i> Upload Excel</button>
            </div>
        </span>
            
        
    )
}
export default Uploadexcelbutton;