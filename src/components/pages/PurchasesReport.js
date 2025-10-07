import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Moment from "react-moment";
import moment from "moment";
import SortIcon from "@material-ui/icons/ArrowDownward";

import {
  setFilterField as setPurchaseReportField,
  getPurchases,
} from "../../reducers/reports/purchases";

function PurchasesReport() {
  const { token } = useSelector((state) => state.auth);
  const {
    filterFields: { username, purchaseDateFrom, purchaseDateTo },
    purchases,
    purchasesRequestStatus,
  } = useSelector((state) => state.purchasesReports);
  const dispatch = useDispatch();

  const [voidPurchasesCheck, setVoidPurchasesCheck] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = [
      {
        filterField: "user__username__icontains",
        filterValue: username,
      },
      {
        filterField: "purchase_date_after",
        filterValue: purchaseDateFrom,
      },
      {
        filterField: "purchase_date_before",
        filterValue: purchaseDateTo,
      },
      {
        filterField: "voided",
        filterValue: voidPurchasesCheck,
      },
    ];
    dispatch(getPurchases({ filters, token }));
  };

  const handleUpdateInput = ({ target: { value, name } }) => {
    dispatch(setPurchaseReportField({ field: name, value }));
  };

  const momentDateFromValid = purchaseDateFrom
    ? moment(purchaseDateFrom, "D/M/YYYY", true).isValid()
    : true;
  const momentDateToValid = purchaseDateTo
    ? moment(purchaseDateTo, "D/M/YYYY", true).isValid()
    : true;

  const disableSubmit =
    purchasesRequestStatus === "loading" ||
    !momentDateFromValid ||
    !momentDateToValid;

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Fecha de compra",
      selector: (row) => row.purchase_date,
      format: (row) => <Moment format="DD/MM/YYYY">{row.purchase_date}</Moment>,
      sortable: true,
    },
    {
      name: "Encargado",
      selector: (row) => row.username,
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

  const data = purchases.map((purchase) => ({
    id: purchase.id,
    purchase_date: purchase.purchase_date,
    username: purchase.user.username,
    total: purchase.total,
    action: (
      <Link to={`${purchase.id}`}>
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
                name="purchaseDateFrom"
                onChange={(e) => handleUpdateInput(e)}
                value={purchaseDateFrom}
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
                name="purchaseDateTo"
                onChange={(e) => handleUpdateInput(e)}
                value={purchaseDateTo}
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
          <div class="form-group">
            <div class="checkbox-inline">
              <label class="checkbox checkbox-lg">
                <input
                  type="checkbox"
                  checked={voidPurchasesCheck}
                  onChange={() => setVoidPurchasesCheck(!voidPurchasesCheck)}
                  name="Checkboxes3_1"
                />
                <span></span>
                Compras anuladas
              </label>
            </div>
            <span class="form-text text-muted">
              Marcar para ver compras anuladas
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
            title={dataTableTitleOptions[purchasesRequestStatus]}
            columns={columns}
            data={purchasesRequestStatus === "succeeded" ? data : []}
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

export default PurchasesReport;
