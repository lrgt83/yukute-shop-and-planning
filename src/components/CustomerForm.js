import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setCustomerFormField,
  createCustomer,
  resetStateProperty,
} from "../reducers/customers";

const CustomerForm = ({ afterCreateAction }) => {
  const dispatch = useDispatch();

  const { customerForm, createCustomerRequestStatus } = useSelector(
    (state) => state.customers
  );
  const { nit, firstName, lastName, address } = customerForm;

  const { token } = useSelector((state) => state.auth);

  const handleUpdateInput = (field, value) => {
    dispatch(setCustomerFormField({ field, value }));
  };

  useEffect(() => {
    if (afterCreateAction && createCustomerRequestStatus === "succeeded") {
      afterCreateAction();
      dispatch(resetStateProperty({ field: "createCustomerRequestStatus" }));
    }
  }, [dispatch, createCustomerRequestStatus, afterCreateAction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createCustomer({
        token,
        payload: {
          ...customerForm,
          first_name: firstName,
          last_name: lastName,
        },
      })
    );
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <div className="card-body py-0">
        <div className="col-12 px-0 pb-3">
          <label>NIT</label>
          <input
            type="text"
            className={`form-control ${!nit ? "is-invalid" : "is-valid"}`}
            placeholder="Ingresa la cantidad"
            onChange={(e) => handleUpdateInput("nit", e.target.value)}
            value={nit}
          />
          <div className="invalid-feedback">Ingrese un NIT valido</div>
        </div>
        <div className="col-12 px-0 pb-3">
          <label>NOMBRES</label>
          <input
            type="text"
            className={`form-control ${!firstName ? "is-invalid" : "is-valid"}`}
            placeholder="Ingresa la cantidad"
            onChange={(e) => handleUpdateInput("firstName", e.target.value)}
            value={firstName}
          />
          <div className="invalid-feedback">Ingrese un NIT valido</div>
        </div>
        <div className="col-12 px-0 pb-3">
          <label>APELLIDOS</label>
          <input
            type="text"
            className={`form-control ${!lastName ? "is-invalid" : "is-valid"}`}
            placeholder="Ingresa la cantidad"
            onChange={(e) => handleUpdateInput("lastName", e.target.value)}
            value={lastName}
          />
          <div className="invalid-feedback">Ingrese un NIT valido</div>
        </div>
        <div className="col-12 px-0 pb-3">
          <label>DIRECCION</label>
          <input
            type="text"
            className={`form-control ${!address ? "is-invalid" : "is-valid"}`}
            placeholder="Ingresa la cantidad"
            onChange={(e) => handleUpdateInput("address", e.target.value)}
            value={address}
          />
          <div className="invalid-feedback">Ingrese un NIT valido</div>
        </div>
        <div className="col-12 pt-3 px-0">
          <input
            type="submit"
            className="btn btn-success w-100 p-5"
            value="AGREGAR CLIENTE +"
          />
        </div>
      </div>
    </form>
  );
};

export default CustomerForm;
