import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getSale, voidSale } from "../../reducers/reports/sales";
import invoiceHeaderBG from "../../assets/theme/media/bg/bg-2.jpg";
import SweetAlert2 from "react-sweetalert2";
import { formatTimestamp } from "../../helpers/converters";
import { APP_URLS } from "../../helpers/routes";
import Spinner from "../Spinner";
import { formatCurrency } from "../../utils/helpers";

const SaleDetails = () => {
  const dispatch = useDispatch();

  const { saleId } = useParams();

  const [swalConfirmProps, setSwalConfirmProps] = useState({});
  const [swalDeniedProps, setSwalDeniedProps] = useState({});

  const {
    tokenPayload: { user },
    token,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (saleId) {
      dispatch(getSale({ token, saleId }));
    }
  }, [dispatch, token, saleId]);

  const { voidRequestStatus, saleRequestStatus, sale } = useSelector(
    (state) => state.salesReport
  );

  const isAdmin =
    user.groups.filter((group) => group.name === "administradores").length > 0;

  const handleVoidSale = () => {
    setSwalConfirmProps({
      show: true,
      title: "Anular venta No." + sale.id,
      showCancelButton: true,
      confirmButtonText: "Anular",
      cancelButtonText: "Cancelar",
      text: "Ingrese el numero de venta a anular",
      input: "text",
      icon: "warning",
      customClass: {
        confirmButton: "danger btn-danger",
      },
    });
  };

  if (saleRequestStatus === "loading" || !sale) {
    return <Spinner />;
  }

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
                VENTA No. {sale.id}
              </h1>
              <h1 className="display-4 text-white font-weight-boldest mb-10">
                {sale.voided ? "ANULADO" : ""}
              </h1>
              <div className="d-flex flex-column align-items-md-end px-0">
                <span className="text-white d-flex flex-column align-items-md-end opacity-70">
                  <span>CLIENTE</span>
                  {sale.customer ? (
                    <span>
                      {sale.customer.first_name} {sale.customer.last_name} NIT:{" "}
                      {sale.customer.nit}{" "}
                    </span>
                  ) : (
                    "CONSUMIDOR FINAL"
                  )}
                </span>
              </div>
            </div>
            <div className="border-bottom w-100 opacity-20"></div>
            <div className="d-flex justify-content-between text-white pt-6">
              <div className="d-flex flex-column flex-root">
                <span className="font-weight-bolde mb-2r">
                  FECHA Y HORA DE VENTA
                </span>
                <span className="opacity-70">
                  {formatTimestamp(sale.sale_date)}
                </span>
              </div>
              <div className="d-flex flex-column flex-root">
                <span className="font-weight-bolder mb-2"></span>
                <span className="opacity-70"></span>
              </div>
              <div className="d-flex flex-column flex-root">
                <span className="font-weight-bolder mb-2">
                  ENCARGADO DE LA VENTA
                </span>
                <span className="opacity-70">
                  {`${sale.user.first_name} ${sale.user.last_name}`}
                  <br />
                  {`${sale.user.email}`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center py-8 px-8 py-md-10 px-md-0">
          <div className="col-md-9">
            <div className="table-responsive">
              <table className="table">
                <thead className="text-dark">
                  <tr>
                    <th className="pl-0 font-weight-bold text-uppercase">
                      PRODUCTO
                    </th>
                    <th className="text-right font-weight-bold text-uppercase">
                      CANTIDAD
                    </th>
                    <th className="text-right font-weight-bold text-uppercase">
                      PRECIO UNITARIO
                    </th>
                    <th className="text-right pr-0 font-weight-bold text-uppercase">
                      SUBTOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sale.sale_invoice_items.map((saleItem) => (
                    <tr
                      className="font-weight-boldest font-size-lg"
                      key={saleItem.id}
                    >
                      <td className="pl-0 pt-7">{`${saleItem.product.name} - ${saleItem.product.description} - ${saleItem.product.brand.name} - ${saleItem.product.category.name}`}</td>
                      <td className="text-right pt-7">{saleItem.quantity}</td>
                      <td className="text-right pt-7">
                        {formatCurrency(saleItem.sale_price)}
                      </td>
                      <td className="text-danger pr-0 pt-7 text-right">
                        {formatCurrency(saleItem.subtotal)}
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
                  {formatCurrency(sale.total, true)}
                </span>
                {/* <span>Impuestos incluidos</span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center py-8 px-8 py-md-10 px-md-0">
          <div className="col-md-9">
            <div className="d-flex justify-content-between">
              {isAdmin && !sale.voided && (
                <button
                  type="button"
                  className={`btn btn-outline-danger font-weight-bold ${
                    voidRequestStatus === "loading"
                      ? "spinner spinner-darker-danger spinner-right ml-2"
                      : ""
                  }`}
                  onClick={handleVoidSale}
                  disabled={voidRequestStatus === "loading"}
                >
                  {`${
                    voidRequestStatus === "loading"
                      ? "ANULANDO VENTA "
                      : "ANULAR VENTA"
                  }`}
                </button>
              )}
              <Link to={`/${APP_URLS.reports.sales}`}>
                <button
                  type="button"
                  className="btn btn-primary font-weight-bold"
                  disabled={voidRequestStatus === "loading"}
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
          if (isConfirmed && Number(value) === sale.id) {
            dispatch(voidSale({ token, saleId: sale.id }));
            return;
          }
          setSwalDeniedProps({
            show: true,
            title: "Error",
            text: "Numero de venta incorrecto",
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

export default SaleDetails;
