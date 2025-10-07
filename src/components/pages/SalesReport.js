import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Moment from "react-moment";
import moment from "moment";
import SortIcon from "@material-ui/icons/ArrowDownward";

import {
  setFilterField as setPurchaseReportField,
  getSales,
} from "../../reducers/reports/sales";
import { saleTypeMapper } from "../../helpers/constants";

function SalesReport() {
  const { token } = useSelector((state) => state.auth);
  const {
    filterFields: { username, saleDateFrom, saleDateTo, nit, name, lastname },
    sales,
    salesRequestStatus,
  } = useSelector((state) => state.salesReport);
  const dispatch = useDispatch();

  const [voidSalesCheck, setVoidSalesCheck] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = [
      {
        filterField: "user__username__icontains",
        filterValue: username,
      },
      {
        filterField: "sale_date_after",
        filterValue: saleDateFrom,
      },
      {
        filterField: "sale_date_before",
        filterValue: saleDateTo,
      },
      {
        filterField: "voided",
        filterValue: voidSalesCheck,
      },
      {
        filterField: "customer__nit__icontains",
        filterValue: nit,
      },
      {
        filterField: "customer__first_name__icontains",
        filterValue: name,
      },
      {
        filterField: "customer__last_name__icontains",
        filterValue: lastname,
      },
    ];
    dispatch(getSales({ filters, token }));
  };

  const handleUpdateInput = ({ target: { value, name } }) => {
    dispatch(setPurchaseReportField({ field: name, value }));
  };

  const momentDateFromValid = saleDateFrom
    ? moment(saleDateFrom, "D/M/YYYY", true).isValid()
    : true;
  const momentDateToValid = saleDateTo
    ? moment(saleDateTo, "D/M/YYYY", true).isValid()
    : true;

  const disableSubmit =
    salesRequestStatus === "loading" ||
    !momentDateFromValid ||
    !momentDateToValid;

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Tipo de venta",
      selector: (row) => row.sale_type,
      sortable: true,
    },
    {
      name: "Fecha de venta",
      selector: (row) => row.sale_date,
      format: (row) => <Moment format="DD/MM/YYYY">{row.sale_date}</Moment>,
      sortable: true,
    },
    {
      name: "Encargado",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => row.customer,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: "Acciones",
      selector: (row) => row.action,
    },
  ];

  const data = sales.map((sale) => ({
    id: sale.id,
    sale_type: saleTypeMapper[sale.sale_type],
    sale_date: sale.sale_date,
    username: sale.user.username,
    customer: sale.customer
      ? `
      ${sale.customer.nit} - 
      ${sale.customer.first_name} - 
      ${sale.customer.last_name}
    `
      : "CF",
    total: sale.total,
    action: (
      <Link to={`${sale.id}`}>
        <button title="Ver detalle" className="btn btn-icon btn-warning">
          <i className="flaticon-edit-1"></i>
        </button>
      </Link>
    ),
  }));

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  const dataTableTitleOptions = {
    loading: "Generando reporte",
    failed: "Error en la consulta, intente de nuevo",
    succeeded: "Resultados de la consulta",
  };

  return (
    <div className="card card-body">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="card-body pb-0">
          <div className="form-group row">
            <div className="col-lg-4">
              <label>Fecha compra desde esta fecha:</label>
              <input
                type="text"
                className={`form-control ${
                  momentDateFromValid ? "is-valid" : "is-invalid"
                }`}
                placeholder="Fecha inicio"
                name="saleDateFrom"
                onChange={(e) => handleUpdateInput(e)}
                value={saleDateFrom}
              />
              <div className="invalid-feedback">
                La fecha debe estar en formato DD/MM/AAAA.
              </div>
            </div>
            <div className="col-lg-4">
              <label>Fecha compra hasta esta fecha:</label>
              <input
                type="text"
                className={`form-control ${
                  momentDateToValid ? "is-valid" : "is-invalid"
                }`}
                placeholder="Fecha fin"
                name="saleDateTo"
                onChange={(e) => handleUpdateInput(e)}
                value={saleDateTo}
              />
              <div className="invalid-feedback">
                La fecha debe estar en formato DD/MM/AAAA.
              </div>
            </div>
            <div className="col-lg-4">
              <label>Encargado:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar nombre de usuario del encargado"
                name="username"
                onChange={(e) => handleUpdateInput(e)}
                value={username}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-4">
              <label>Nit Cliente:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar nit del cliente"
                name="nit"
                onChange={(e) => handleUpdateInput(e)}
                value={nit}
              />
            </div>
            <div className="col-lg-4">
              <label>Nombres Cliente:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por nombres del cliente"
                name="name"
                onChange={(e) => handleUpdateInput(e)}
                value={name}
              />
            </div>
            <div className="col-lg-4">
              <label>Apellidos Cliente:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por apellidos del cliente"
                name="lastname"
                onChange={(e) => handleUpdateInput(e)}
                value={lastname}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="checkbox-inline">
              <label className="checkbox checkbox-lg">
                <input
                  type="checkbox"
                  checked={voidSalesCheck}
                  onChange={() => setVoidSalesCheck(!voidSalesCheck)}
                  name="Checkboxes3_1"
                />
                <span></span>
                Ventas anuladas
              </label>
            </div>
            <span className="form-text text-muted">
              Marcar para ver ventas anuladas
            </span>
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-lg-12 text-left">
              <input
                type="submit"
                className="btn btn-success"
                value="Consultar"
                disabled={disableSubmit}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-xl-12">
          <DataTable
            title={dataTableTitleOptions[salesRequestStatus]}
            columns={columns}
            data={salesRequestStatus === "succeeded" ? data : []}
            sortIcon={<SortIcon />}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            allowRowEvents
          />
        </div>
      </div>
    </div>
  );
}

export default SalesReport;
