import React from "react";
import './userappstyles.css';

const AppointmentsHistory = () => {
  const appointments = [
    {
      name: "Akula Sri Ram karthik",
      phone: "7989388254",
      email: "sriaramkarthikakula6@gmail.com",
      specialization: "Ayurveda",
      hospital: "Ayush Bhimavaram Hospital",
      appointmentSlot: "10/08/2024 - 9:20 AM",
      hospitalAddress: "Add a little bit of body text",
      problem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      name: "Akula Sri Ram karthik",
      phone: "7989388254",
      email: "sriaramkarthikakula6@gmail.com",
      specialization: "Ayurveda",
      hospital: "Ayush Bhimavaram Hospital",
      appointmentSlot: "03/08/2024 - 9:10 AM",
      hospitalAddress: "Add a little bit of body text",
      problem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
  ];

  return (
    <div className="appointments-history">
      <h2 className="title">User Appointments History</h2>
      {appointments.map((appointment, index) => (
        <div key={index} className="appointment-card">
          <div className="appointment-details">
            <div className="user-info">
              <img src="/path-to-profile-image" alt="Profile" className="profile-image" />
              <div className="user-text">
                <p><strong>Name:</strong> {appointment.name}</p>
                <p><strong>Phone:</strong> {appointment.phone}</p>
                <p><strong>Email:</strong> {appointment.email}</p>
                <p><strong>Specialization:</strong> {appointment.specialization}</p>
              </div>
            </div>
            <div className="hospital-info">
              <p><strong>{appointment.hospital}</strong></p>
              <p><strong>Appointment Slot:</strong> {appointment.appointmentSlot}</p>
              <p><strong>Hospital Address:</strong> {appointment.hospitalAddress}</p>
              <p><strong>Problem:</strong> {appointment.problem}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="footer">Footer</div>
    </div>
  );
};

export default AppointmentsHistory;
