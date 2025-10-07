import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SweetAlert2 from "react-sweetalert2";

import { voidPurchase } from "../../reducers/inventory/newPurchase";

import {
  formatDateForFrontend,
  formatTimestamp,
} from "../../helpers/converters";

import { APP_URLS } from "../../helpers/routes";

import invoiceHeaderBG from "../../assets/theme/media/bg/bg-6.jpg";
import { formatCurrency } from "../../utils/helpers";

const PurchaseDetails = ({ purchase }) => {
  const dispatch = useDispatch();

  const [swalConfirmProps, setSwalConfirmProps] = useState({});
  const [swalDeniedProps, setSwalDeniedProps] = useState({});

  const {
    tokenPayload: { user },
    token,
  } = useSelector((state) => state.auth);

  const { voidPurchaseStatus } = useSelector((state) => state.newPurchase);

  const isAdmin =
    user.groups.filter((group) => group.name === "administradores").length > 0;

  const handleVoidPurchase = () => {
    setSwalConfirmProps({
      show: true,
      title: "Anular compra No." + purchase.id,
      showCancelButton: true,
      confirmButtonText: "Anular",
      cancelButtonText: "Cancelar",
      text: "Ingrese el numero de compra a anular",
      input: "text",
      icon: "warning",
      customClass: {
        confirmButton: "danger btn-danger",
      },
    });
  };

  return (
    <div className="card card-custom overflow-hidden">
      <div className="card-body p-0">
        <div
          className="row justify-content-center bgi-size-cover bgi-no-repeat py-8 px-8 py-md-27 px-md-0"
          style={{ backgroundImage: `url(${invoiceHeaderBG})` }}
        >
          <div className="col-md-9">
            <div className="d-flex justify-content-between pb-10 pb-md-20 flex-column flex-md-row">
              <h1 className="display-4 text-white font-weight-boldest mb-10">
                COMPRA No. {purchase.id}
              </h1>
              <h1 className="display-4 text-white font-weight-boldest mb-10">
                {purchase.voided ? "ANULADO" : ""}
              </h1>
              <div className="d-flex flex-column align-items-md-end px-0">
                <span className="text-white d-flex flex-column align-items-md-end opacity-70">
                  <span>PROVEEDOR</span>
                  <span>{purchase.provider.name}</span>
                </span>
              </div>
            </div>
            <div className="border-bottom w-100 opacity-20"></div>
            <div className="d-flex justify-content-between text-white pt-6">
              <div className="d-flex flex-column flex-root">
                <span className="font-weight-bolde mb-2r">
                  FECHA Y HORA DE COMPRA
                </span>
                <span className="opacity-70">
                  {formatTimestamp(purchase.purchase_date)}
                </span>
              </div>
              <div className="d-flex flex-column flex-root">
                <span className="font-weight-bolder mb-2"></span>
                <span className="opacity-70"></span>
              </div>
              <div className="d-flex flex-column flex-root">
                <span className="font-weight-bolder mb-2">
                  ENCARGADO DE LA COMPRA
                </span>
                <span className="opacity-70">
                  {`${purchase.user.first_name} ${purchase.user.last_name}`}
                  <br />
                  {`${purchase.user.email}`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center py-8 px-8 py-md-10 px-md-0">
          <div className="col-md-9">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="pl-0 font-weight-bold text-muted text-uppercase">
                      PRODUCTO
                    </th>
                    <th className="text-right font-weight-bold text-muted text-uppercase">
                      CANTIDAD
                    </th>
                    <th className="text-right font-weight-bold text-muted text-uppercase">
                      PRECIO UNITARIO
                    </th>
                    <th className="text-right pr-0 font-weight-bold text-muted text-uppercase">
                      FECHA DE VENCIMIENTO
                    </th>
                    <th className="text-right pr-0 font-weight-bold text-muted text-uppercase">
                      SUBTOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {purchase.purchase_items.map((purchaseItem) => (
                    <tr
                      className="font-weight-boldest font-size-lg"
                      key={purchaseItem.id}
                    >
                      <td className="pl-0 pt-7">{`${purchaseItem.product.name} - ${purchaseItem.product.description} - ${purchaseItem.product.brand.name} - ${purchaseItem.product.category.name}`}</td>
                      <td className="text-right pt-7">
                        {purchaseItem.quantity}
                      </td>
                      <td className="text-right pt-7">
                        {formatCurrency(purchaseItem.price)}
                      </td>
                      <td className="text-right pt-7">
                        {formatDateForFrontend(purchaseItem.expiration_date)}
                      </td>
                      <td className="text-danger pr-0 pt-7 text-right">
                        {formatCurrency(
                          Number(purchaseItem.subtotal)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row justify-content-center bg-gray-100 py-8 px-8 py-md-10 px-md-0">
          <div className="col-md-9">
            <div className="d-flex justify-content-end flex-column flex-md-row font-size-lg">
              <div className="d-flex flex-column text-md-right">
                <span className="font-size-lg font-weight-bolder mb-1">
                  TOTAL
                </span>
                <span className="font-size-h2 font-weight-boldest text-danger mb-1">
                  {formatCurrency(purchase.total, true)}
                </span>
                <span>Impuestos incluidos</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center py-8 px-8 py-md-10 px-md-0">
          <div className="col-md-9">
            <div className="d-flex justify-content-between">
              {isAdmin && !purchase.voided && (
                <button
                  type="button"
                  className={`btn btn-outline-danger font-weight-bold ${
                    voidPurchaseStatus === "loading"
                      ? "spinner spinner-darker-danger spinner-right ml-2"
                      : ""
                  }`}
                  onClick={handleVoidPurchase}
                  disabled={voidPurchaseStatus === "loading"}
                >
                  {`${
                    voidPurchaseStatus === "loading"
                      ? "ANULANDO COMPRA "
                      : "ANULAR COMPRA"
                  }`}
                </button>
              )}
              <Link to={`/${APP_URLS.reports.purchases}`}>
                <button
                  type="button"
                  className="btn btn-primary font-weight-bold"
                  disabled={voidPurchaseStatus === "loading"}
                >
                  Regresar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SweetAlert2
        {...swalConfirmProps}
        didClose={() => {
          setSwalConfirmProps({});
        }}
        onConfirm={({ isConfirmed, value }) => {
          setSwalConfirmProps({});
          if (isConfirmed && Number(value) === purchase.id) {
            dispatch(voidPurchase({ token, purchaseId: purchase.id }));
            return;
          }
          setSwalDeniedProps({
            show: true,
            title: "Error",
            text: "Numero de compra incorrecto",
            icon: "error",
          });
        }}
      />
      <SweetAlert2
        {...swalDeniedProps}
        didClose={() => {
          setSwalDeniedProps({});
        }}
      />
    </div>
  );
};

export default PurchaseDetails;
