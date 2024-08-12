import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

const ChildComponent = ({ formData }) => {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            {/* Dynamically create table headers */}
            {formData.length > 0 && Object.keys(formData[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render table rows */}
          {formData.map((data, index) => (
            <tr key={index}>
              {Object.values(data).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChildComponent;
