import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";

import { getProducts, getProviders } from "../../reducers/inventory";
import {
  setPurchaseFormField,
  addProductToList,
  removeProductFromList,
  resetPurchase,
  saveNewPurchase,
  setProvider,
  getPurchase,
} from "../../reducers/inventory/newPurchase";

import PurchaseDetails from "./PurchaseDetails";
import Spinner from "../Spinner";

import { isDecimal, isInteger, isValidUIDate } from "../../helpers/validators";
import {
  toastAddProductPurchaseList,
  toastRemoveProductPurchaseList,
} from "../../helpers/toasts";

import imageAb7 from "../../assets/theme/media/svg/shapes/abstract-7.svg";
import imageAb9 from "../../assets/theme/media/svg/shapes/abstract-9.svg";
import { formatCurrency } from "../../utils/helpers";

function Purchase() {
  const dispatch = useDispatch();
  const { purchaseId } = useParams();

  const isEditing = !!purchaseId;

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetPurchase());
    dispatch(getProviders({ token }));
    dispatch(getProducts({ token }));
    if (isEditing) {
      dispatch(getPurchase({ token, purchaseId }));
    }
  }, [dispatch, token, purchaseId, isEditing]);

  const { products, providers } = useSelector((state) => state.inventory);
  const {
    purchaseForm: { productId, quantity, price, expirationDate, productLabel },
    providerId,
    providerLabel,
    purchaseList,
    total,
    saveNewPurchaseStatus,
    getPurchaseStatus,
    purchaseDetail,
  } = useSelector((state) => state.newPurchase);

  const selectPersistedState = {
    value: productId,
    label: productLabel,
  };

  const selectInitialState = {
    value: null,
    label: "Selecciona un producto",
  };

  const selectProviderPersistedState = {
    value: providerId,
    label: providerLabel,
  };

  const selectProviderInitialState = {
    value: null,
    label: "Selecciona un proveedor",
  };

  const [selectedValue, setSelectedValue] = useState(selectPersistedState);
  const [selectedProviderValue, setSelectedProviderValue] = useState(
    selectProviderPersistedState
  );

  const options = products.map((product) => ({
    value: product.id,
    label: `${product.name} - ${product.description} - ${product.brand.name} - ${product.category.name}`,
  }));

  const optionsProviders = providers.map((provider) => ({
    value: provider.id,
    label: `${provider.name} - ${provider.description}`,
  }));

  const handleUpdateInput = (field, value) => {
    dispatch(setPurchaseFormField({ field, value }));
  };

  const expirationDateValid = expirationDate
    ? isValidUIDate(expirationDate)
    : true;

  const invalidQuantity = !isInteger(quantity);
  const invalidPrice = !isDecimal(price);

  const disableAddProduct =
    !productId ||
    invalidQuantity ||
    invalidPrice ||
    !expirationDateValid ||
    !providerId;

  const savingNewPurchase = saveNewPurchaseStatus === "loading";
  const disableSaveNewPurchase = purchaseList.length === 0 || savingNewPurchase;

  const handleAddProduct = (e) => {
    e.preventDefault();
    dispatch(addProductToList());
    setSelectedValue(selectInitialState);
    toastAddProductPurchaseList();
  };

  const handleRemoveProduct = (index, purchaseItemId) => {
    dispatch(removeProductFromList({ index, purchaseItemId }));
    toastRemoveProductPurchaseList();
  };

  const handleResetPurchaseList = () => {
    dispatch(resetPurchase());
    setSelectedValue(selectInitialState);
    setSelectedProviderValue(selectProviderInitialState);
  };

  const handleSaveNewPurchase = () => {
    dispatch(
      saveNewPurchase({
        purchaseList,
        providerId,
        token,
      })
    );
    setSelectedValue(selectInitialState);
    setSelectedProviderValue(selectProviderInitialState);
  };

  if (getPurchaseStatus === "loading" || (!purchaseDetail && isEditing)) {
    return <Spinner />;
  }

  if (isEditing) {
    return <PurchaseDetails purchase={purchaseDetail} />;
  }

  return (
    <div className="card card-custom">
      <div className="card-body p-0">
        <div className="container">
          <div className="card card-custom card-shadowless">
            <div className="card-body p-0">
              <div className="row justify-content-left py-2 px-2 py-md-8 px-md-0">
                <div className="col-md-9">
                  <div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
                    <h1 className="display-3 font-weight-boldest order-1 order-md-2 mb-5 mb-md-0">
                      Nueva compra
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="form" onSubmit={(e) => handleAddProduct(e)}>
          <div className="card-body py-0">
            <div className="form-group row">
              <div className="col-12">
                <label>Proveedor</label>
                <Select
                  key={`my_unique_select_key__provider${providerId}`}
                  options={optionsProviders}
                  onChange={(choice) => {
                    handleUpdateInput("providerId", choice.value);
                    handleUpdateInput("providerLabel", choice.label);
                    dispatch(
                      setProvider({
                        providerId: choice.value,
                        providerLabel: choice.label,
                      })
                    );
                    setSelectedProviderValue({
                      value: choice.value,
                      label: choice.label,
                    });
                  }}
                  value={selectedProviderValue}
                />
                {!providerId && (
                  <div className="invalid-feedback d-block">
                    Selecciona un proveedor
                  </div>
                )}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-12">
                <label>Producto</label>
                <Select
                  key={`my_unique_select_key__${productId}`}
                  options={options}
                  onChange={(choice) => {
                    handleUpdateInput("productId", choice.value);
                    handleUpdateInput("productLabel", choice.label);
                    setSelectedValue({
                      value: choice.value,
                      label: choice.label,
                    });
                  }}
                  value={selectedValue}
                />
                {!productId && (
                  <div className="invalid-feedback d-block">
                    Selecciona un producto
                  </div>
                )}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-4">
                <label>Cantidad</label>
                <input
                  type="text"
                  className={`form-control ${
                    invalidQuantity ? "is-invalid" : "is-valid"
                  }`}
                  placeholder="Ingresa la cantidad"
                  name="purchaseDateTo"
                  onChange={(e) =>
                    handleUpdateInput("quantity", e.target.value)
                  }
                  value={quantity}
                />
                <div className="invalid-feedback">Ingrese un monto valido</div>
              </div>
              <div className="col-lg-4">
                <label>Precio:</label>
                <input
                  type="text"
                  className={`form-control ${
                    invalidPrice ? "is-invalid" : "is-valid"
                  }`}
                  placeholder="Ingresa el precio"
                  name="price"
                  onChange={(e) => handleUpdateInput("price", e.target.value)}
                  value={price}
                />
                <div className="invalid-feedback">Ingrese un monto valido</div>
              </div>
              <div className="col-lg-4">
                <label>Fecha de vencimiento:</label>
                <input
                  type="text"
                  className={`form-control ${
                    expirationDateValid ? "is-valid" : "is-invalid"
                  }`}
                  placeholder="Ingresa la fecha de vencimiento"
                  name="expirationDate"
                  onChange={(e) =>
                    handleUpdateInput("expirationDate", e.target.value)
                  }
                  value={expirationDate}
                />
                <div className="invalid-feedback">
                  La fecha debe estar en formato DD/MM/AAAA
                </div>
              </div>
            </div>
          </div>
          <div className="row pl-8 pb-8">
            <div className="col-lg-12 text-left">
              <input
                type="submit"
                className="btn btn-success"
                value="Agregar +"
                disabled={disableAddProduct}
              />
            </div>
          </div>
        </form>
        <div className="position-relative">
          <div
            className="bgi-size-cover bgi-position-center bgi-no-repeat h-65px"
            style={{ backgroundImage: `url(${imageAb7})` }}
          ></div>
          <div className="container top-0 left-0 right-0">
            <div className="row justify-content-center">
              <div className="col-md-9">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr className="font-weight-boldest h-65px">
                        <td className="align-middle font-size-h4 pl-0 border-0">
                          PRODUCTO
                        </td>
                        <td className="align-middle font-size-h4 text-right border-0">
                          CANTIDAD
                        </td>
                        <td className="align-middle font-size-h4 text-right border-0">
                          PRECIO
                        </td>
                        <td className="align-middle font-size-h4 text-right border-0">
                          FECHA DE VENCIMIENTO
                        </td>
                        <td className="align-middle font-size-h4 text-right pr-0 border-0">
                          SUBTOTAL
                        </td>
                        <td className="align-middle font-size-h4 text-right pr-0 border-0"></td>
                      </tr>
                    </thead>
                    <tbody>
                      {purchaseList.map((product, index) => (
                        <tr
                          className="font-size-lg font-weight-bolder h-65px"
                          key={index}
                        >
                          <td className="align-middle pl-0 border-0">
                            {product.productLabel}
                          </td>
                          <td className="align-middle text-center border-0">
                            {product.quantity}
                          </td>
                          <td className="align-middle text-center border-0">
                            {product.price}
                          </td>
                          <td className="align-middle text-center border-0">
                            {product.expirationDateFormatted}
                          </td>
                          <td className="align-middle text-center text-danger font-weight-boldest font-size-h5 pr-0 border-0">
                            {(!product.invalidPrice &&
                              !product.invalidQuantity &&
                              Number(product.price) *
                                Number(product.quantity)) ||
                              ""}
                          </td>
                          <td className="align-middle text-right text-danger font-weight-boldest font-size-h5 pr-0 border-0">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() =>
                                handleRemoveProduct(
                                  index,
                                  product.purchaseItemId
                                )
                              }
                              disabled={savingNewPurchase}
                            >
                              Quitar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row justify-content-center px-8">
              <div className="col-md-9">
                <div
                  className="rounded d-flex align-items-center justify-content-between text-white max-w-425px position-relative ml-auto px-7 py-5 bgi-no-repeat bgi-size-cover bgi-position-center"
                  style={{ backgroundImage: `url(${imageAb9})` }}
                >
                  <div className="font-weight-boldest font-size-h5">TOTAL</div>
                  <div className="text-right d-flex flex-column">
                    <span className="font-weight-boldest font-size-h3 line-height-sm">
                      {formatCurrency(total, true)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center py-8 px-8 px-md-0">
            <div className="col-12">
              <div className="d-flex font-size-sm flex-wrap">
                <button
                  type="button"
                  className="btn btn-light-warning font-weight-bolder mr-3 my-1 px-7"
                  onClick={handleResetPurchaseList}
                  disabled={disableSaveNewPurchase}
                >
                  Limpiar lista
                </button>
                <button
                  type="button"
                  className="btn btn-success font-weight-bolder ml-sm-auto my-1 px-7"
                  onClick={handleSaveNewPurchase}
                  disabled={disableSaveNewPurchase}
                >
                  {savingNewPurchase && (
                    <i className="flaticon2-hourglass-1"></i>
                  )}
                  {savingNewPurchase && "Guardando..."}
                  {!savingNewPurchase && "Guardar compra"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Purchase;
