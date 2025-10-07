import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { Modal, Typography } from "@material-ui/core";
import CustomerForm from "../CustomerForm";
import SliderCheckbox from "../Switch";

import { getProducts } from "../../reducers/inventory";
import { getCustomers } from "../../reducers/customers";
import {
  setSaleFormField,
  addProductToList,
  removeProductFromList,
  resetSaleList,
  saveNewSale,
  setTypeOfSale,
} from "../../reducers/inventory/newSale";
import { isInteger } from "../../helpers/validators";
import {
  toastRemoveProductPurchaseList,
  toastRequestVoidPurchase,
  toastAddInvalidProductPurchaseList,
} from "../../helpers/toasts";

function Billing() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProducts({ token }));
    dispatch(getCustomers({ token }));
  }, [dispatch, token]);

  const { products } = useSelector((state) => state.inventory);
  const { customers, createCustomerRequestStatus, customersRequestStatus } =
    useSelector((state) => state.customers);
  const {
    saleForm: { productId, quantity, customerId, productLabel, customerLabel },
    saleList,
    saveNewSaleStatus,
    total,
    typeOfSale,
  } = useSelector((state) => state.newSale);

  const billTypeMapper = {
    SALE: {
      saleTitle: "Nueva Venta",
      saveButton: "Guardar Venta",
      products: products.filter((product) => product.inventory_type === "SB"),
      saleType: "RS",
    },
    EVENT: {
      saleTitle: "Nuevo Evento",
      saveButton: "Guardar Evento",
      products: products.filter((product) => product.inventory_type === "EV"),
      saleType: "EV",
    },
  };

  const invalidStock = () => {
    if (!productId || !quantity) {
      return toastRequestVoidPurchase;
    }
    const selectedProduct = billTypeMapper[typeOfSale].products.filter(
      (product) => product.id === productId
    );
    if (selectedProduct.length === 0) {
      return false;
    }
    return selectedProduct[0].stock < Number(quantity);
  };
  const savingNewSale = saveNewSaleStatus === "loading";
  const insufficientStock = invalidStock();
  const invalidQuantity =
    !isInteger(quantity) || insufficientStock || quantity === "0";
  const selectProductPersistedState = {
    value: productId,
    label: productLabel,
  };
  const emptyList = saleList.length === 0;

  const selectProductInitialState = {
    value: null,
    label: "Selecciona un producto",
  };

  const disableAddButton =
    savingNewSale || insufficientStock || invalidQuantity || !productId;

  let invalidQuantityMessage = "Ingrese un monto valido";
  invalidQuantityMessage = insufficientStock
    ? `Cantidad excede las existencias`
    : invalidQuantityMessage;

  const selectCustomerPersistedState = {
    value: customerId,
    label: customerLabel,
  };

  const selectCustomerInitialState = {
    value: null,
    label: "Selecciona cliente",
  };

  const [billCF, setBillCF] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  const handleChangeCF = () => {
    setBillCF(!billCF);
    if (!billCF) {
      setSelectedCustomerValue(selectCustomerInitialState);
      handleUpdateInput("customerId", null);
    }
  };

  const [selectedProductValue, setSelectedProductValue] = useState(
    selectProductPersistedState
  );
  const [selectedCustomerValue, setSelectedCustomerValue] = useState(
    selectCustomerPersistedState
  );
  const [productThresholdStatus, setProductThresholdStatus] = useState("");

  const productIsAdded = (productId) => {
    const filteredProducts = saleList.filter(
      (saleListItem) => saleListItem.productId === productId
    );
    return filteredProducts.length > 0;
  };

  const optionsProduct = billTypeMapper[typeOfSale].products.map((product) => ({
    value: product.id,
    label: `${product.name} - ${product.description} - ${product.brand.name} - ${product.category.name} - Existencias: ${product.stock}`,
    disabled: productIsAdded(product.id) || product.stock <= 0,
    minThreshold: product.min_threshold,
    stock: product.stock,
  }));

  const optionsCustomer = customers.map((customer) => ({
    value: customer.id,
    label: `${customer.first_name} ${customer.last_name} - ${customer.nit}`,
  }));

  const handleUpdateInput = (field, value) => {
    dispatch(setSaleFormField({ field, value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = billTypeMapper[typeOfSale].products.filter(
      (product) => product.id === productId
    );
    if (!productToAdd || productToAdd.length === 0) {
      toastAddInvalidProductPurchaseList();
      return;
    }
    dispatch(addProductToList({ product: productToAdd[0], quantity }));
    setSelectedProductValue(selectProductInitialState);
  };

  const handleRemoveProduct = (index, productToSell) => {
    dispatch(removeProductFromList({ index, productToSell }));
    toastRemoveProductPurchaseList();
    setSelectedProductValue();
  };

  const handleResetSaleList = () => {
    dispatch(resetSaleList());
  };

  const handleSaveNewSale = () => {
    dispatch(
      saveNewSale({
        saleList,
        customerId,
        token,
        saleType: billTypeMapper[typeOfSale].saleType,
      })
    );
    setSelectedProductValue(selectProductInitialState);
    setSelectedCustomerValue(selectCustomerInitialState);
    dispatch(resetSaleList());
  };

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
                      {billTypeMapper[typeOfSale].saleTitle}
                    </h1>
                  </div>
                </div>
                <div className="col-md-3 d-flex justify-content-end">
                  <SliderCheckbox
                    checked={typeOfSale !== "SALE"}
                    onChange={(e, value) => {
                      dispatch(
                        setTypeOfSale(typeOfSale === "SALE" ? "EVENT" : "SALE")
                      );
                      setSelectedProductValue(selectProductInitialState);
                      setSelectedCustomerValue(selectCustomerInitialState);
                      dispatch(resetSaleList());
                      setProductThresholdStatus("");
                    }}
                    labelChecked={"Cambiar a Venta"}
                    labelUnchecked="Cambiar a Evento"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="form" onSubmit={(e) => handleAddProduct(e)}>
          <div className="card-body py-0">
            <div className="form-group row mb-3">
              <div className="col-md-10">
                <label>Cliente</label>
                <Select
                  key={`my_unique_select_customer_key_${customerId}`}
                  options={optionsCustomer}
                  onChange={(choice) => {
                    handleUpdateInput("customerId", choice.value);
                    handleUpdateInput("customerLabel", choice.label);
                    setSelectedCustomerValue({
                      value: choice.value,
                      label: choice.label,
                    });
                  }}
                  value={selectedCustomerValue}
                  isDisabled={billCF}
                  isLoading={
                    createCustomerRequestStatus === "loading" ||
                    customersRequestStatus === "loading"
                  }
                />
                <div className="form-group mt-2 mb-1">
                  <div className="checkbox-inline">
                    <label className="checkbox checkbox-lg">
                      <input
                        type="checkbox"
                        checked={billCF}
                        onChange={handleChangeCF}
                        name="Checkboxes3_1"
                      />
                      <span></span>
                      Consumidor Final
                    </label>
                  </div>
                  <span className="form-text text-muted">
                    Facturar como consumidor final
                  </span>
                </div>
                {!customerId && !billCF && (
                  <div className="invalid-feedback d-block">
                    Selecciona un cliente
                  </div>
                )}
              </div>
              <div className="col-md-2 mt-8 px-0">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={() => setShowClientModal(true)}
                >
                  Crear Cliente +
                </button>
              </div>
            </div>
            <hr></hr>
            <div className="form-group row">
              <div className="col-md-10">
                <label>Producto</label>
                <Select
                  key={`my_unique_select_key__${productId}`}
                  options={optionsProduct}
                  onChange={(choice) => {
                    handleUpdateInput("productId", choice.value);
                    handleUpdateInput("productLabel", choice.label);
                    setSelectedProductValue({
                      value: choice.value,
                      label: choice.label,
                    });
                    if (
                      choice.minThreshold &&
                      choice.stock <= choice.minThreshold
                    ) {
                      setProductThresholdStatus(
                        "Producto en baja existencia, minimo recomenado " +
                          choice.minThreshold
                      );
                    }
                    if (
                      choice.minThreshold &&
                      choice.stock > choice.minThreshold
                    ) {
                      setProductThresholdStatus("Producto abastecido");
                    }
                  }}
                  value={selectedProductValue}
                  isOptionDisabled={(option) => option.disabled}
                />
                {!productId && (
                  <div className="invalid-feedback d-block">
                    Selecciona un producto
                  </div>
                )}
                <div className="d-block">
                  <Typography color="primary" variant="subtitle2">
                    {productThresholdStatus}
                  </Typography>
                </div>
              </div>
              <div className="col-md-2 px-0">
                <label>Cantidad</label>
                <input
                  type="text"
                  className={`form-control ${
                    invalidQuantity ? "is-invalid" : "is-valid"
                  }`}
                  placeholder="Ingresa la cantidad"
                  onChange={(e) =>
                    handleUpdateInput("quantity", e.target.value)
                  }
                  value={quantity}
                />
                <div className="invalid-feedback">{invalidQuantityMessage}</div>
              </div>
            </div>
          </div>
          <div className="row px-8 pb-8">
            <div className="col-12">
              <input
                type="submit"
                className="btn btn-success w-100 p-5"
                value="AGREGAR +"
                disabled={disableAddButton}
              />
            </div>
          </div>
        </form>
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
                      <td className="align-middle font-size-h4 text-right pr-0 border-0">
                        SUBTOTAL
                      </td>
                      <td className="align-middle font-size-h4 text-right pr-0 border-0"></td>
                    </tr>
                  </thead>
                  <tbody>
                    {saleList.map((productToSell, index) => (
                      <tr
                        key={index}
                        className="font-size-lg font-weight-bolder h-65px"
                      >
                        <td className="align-middle pl-0 border-0">
                          {productToSell.productLabel}
                        </td>
                        <td className="align-middle text-center border-0">
                          {productToSell.quantity}
                        </td>
                        <td className="align-middle text-center border-0">
                          {productToSell.salePrice}
                        </td>
                        <td className="align-middle text-center text-danger font-weight-boldest font-size-h5 pr-0 border-0">
                          {productToSell.subTotal}
                        </td>
                        <td className="align-middle text-right text-danger font-weight-boldest font-size-h5 pr-0 border-0">
                          <button
                            type="button"
                            className="btn btn-danger"
                            disabled={savingNewSale}
                            onClick={() =>
                              handleRemoveProduct(index, productToSell)
                            }
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
        <div className="row justify-content-center px-8">
          <div className="col-md-9">
            <div className="d-flex align-items-center justify-content-between text-white max-w-425px position-relative ml-auto px-7 py-5 bgi-no-repeat bgi-size-cover bgi-position-center btn-success">
              <div className="font-weight-boldest font-size-h6">TOTAL</div>
              <div className="font-weight-boldest font-size-h1">{total}</div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center py-8 px-8 px-md-0">
            <div className="col-md-9">
              <div className="d-flex font-size-sm flex-wrap">
                <button
                  type="button"
                  className="btn btn-light-danger font-weight-bolder btnl-l mr-3 my-1 px-7 btn-lg"
                  disabled={emptyList || savingNewSale}
                  onClick={handleResetSaleList}
                >
                  Limpiar lista
                </button>
                <button
                  type="button"
                  className="btn btn-success font-weight-bolder btn-lg ml-sm-auto my-1 px-7"
                  disabled={
                    savingNewSale || emptyList || (!customerId && !billCF)
                  }
                  onClick={handleSaveNewSale}
                >
                  {savingNewSale && <i className="flaticon2-hourglass-1"></i>}
                  {savingNewSale && "Guardando..."}
                  {!savingNewSale && billTypeMapper[typeOfSale].saveButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={showClientModal}
        onClose={() => setShowClientModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Crear Cliente</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowClientModal(false)}
              >
                <i aria-hidden="true" className="ki ki-close"></i>
              </button>
            </div>
            <div className="modal-body">
              <CustomerForm
                afterCreateAction={() => {
                  setShowClientModal(false);
                  dispatch(getCustomers({ token }));
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Billing;
