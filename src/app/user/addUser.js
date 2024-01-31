import { useState } from "react";
import { addUser, updateUser } from "../api/backed/route";
import { useEffect } from "react";

const AddUser = ({ onSubmit, userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    userRole: "Admin",
    status: "active",
  });
  const [loading,setLoading] = useState(false);
  console.log("data", userData);
  useEffect(() => {
    // Check if userData contains data before opening the modal
    if (userData) {
      setFormData({
        username: userData.name,
        email: userData.email,
        mobile: userData.mobile_number,
        userRole: userData.role,
        status: userData.status,
      });
      setShowModal(true);
    }
  }, [userData]);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setLoading(false);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!userData) {
      addUser({
        userName: formData.username,
        userRole: formData.userRole,
        userStatus: formData.status,
        userPassword: "Test@123",
        userToken: "",
        userEmail: formData.email,
        userMobile: formData.mobile,
      }).then((response) => {
        console.log(">>>>>>>response", response);
        if (response.data.status === 200) {
          setLoading(false);
          onSubmit();
          setFormData({
            username: "",
            email: "",
            mobile: "",
            userRole: "Admin",
            status: "active",
          });

          handleCloseModal();
        }
      });
    } else {
      updateUser({
        userId: userData.user_id,
        userName: formData.username,
        userRole: formData.userRole,
        userStatus: formData.status,
        userPassword: "Test@123",
        userToken: "",
        userEmail: formData.email,
        userMobile: formData.mobile,
      }).then((response) => {
        if (response.data.status === 200) {
          setLoading(false);
          onSubmit();
          setFormData({
            username: "",
            email: "",
            mobile: "",
            userRole: "Admin",
            status: "active",
          });

          handleCloseModal();
        }
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary float-md-end"
        onClick={handleOpenModal}
      >
        Add User
      </button>

      {showModal && (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          style={{ display: "contents" }}
        >
          <div
            className="modal-dialog modal-dialog-scrollable"
            style={{
              height: "100%",
              width: "100%",
              position: "fixed",
              margin: "auto",
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading} >
                      {loading ? (
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <>Submit</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUser;
