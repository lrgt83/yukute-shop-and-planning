import toast from "react-hot-toast";

export const DEFAULT_DURATION = 5000;
export const DEFAULT_POSITION = "bottom_right";

export const PURCHASE_LIST_PRODUCT_ADDED =
  "Producto agregado a la lista de compras";
export const PURCHASE_INVALID_PRODUCT_ADDED =
  "Corrige los campos para agregar el producto a la lista de compras";
export const PURCHASE_LIST_PRODUCT_REMOVED =
  "Producto removido de la lista de compras";
export const NEW_PURCHASE_SAVING = "Guardando nueva compra";
export const NEW_PURCHASE_SAVED = "Compra guardada con exito";
export const NEW_PURCHASE_FAILED =
  "Error al guardar la compra, intente de nuevo";
export const NEW_SALE_SAVING = "Guardando nueva venta";
export const NEW_SALE_SAVED = "Venta guardada con exito";
export const NEW_SALE_FAILED = "Error al guardar la venta, intente de nuevo";
export const VOID_PURCHASE_REQUEST = "Anulando compra";
export const VOID_PURCHASE_FAILED =
  "Error al anular la compra, intente de nuevo";
export const VOID_PURCHASE_SUCCESS = "Compra anulada correctamente";
export const CUSTOMER_CREATE_REQUEST = "Creando cliente";
export const CUSTOMER_CREATE_SUCCESS = "Cliente creado correctamente";
export const CUSTOMER_CREATE_FAILED =
  "Error al crear cliente, intente de nuevo";
export const VOID_SALE_REQUEST = "Anulando venta";
export const VOID_SALE_FAILED = "Error al anular la venta, intente de nuevo";
export const VOID_SALE_SUCCESS = "Venta anulada correctamente";
export const LOGIN_FAILED = "Error al iniciar sesion, intenta de nuevo.";

export const toastAddInvalidProductPurchaseList = () =>
  toast.error(PURCHASE_INVALID_PRODUCT_ADDED, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastAddProductPurchaseList = () =>
  toast.success(PURCHASE_LIST_PRODUCT_ADDED, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastRemoveProductPurchaseList = () =>
  toast.error(PURCHASE_LIST_PRODUCT_REMOVED, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastSavingNewPurchase = () =>
  toast.loading(NEW_PURCHASE_SAVING, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastSavedNewPurchase = () =>
  toast.success(NEW_PURCHASE_SAVED, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastErrorNewPurchase = () =>
  toast.error(NEW_PURCHASE_FAILED, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastRequestVoidPurchase = () =>
  toast.loading(VOID_PURCHASE_REQUEST, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastFailedVoidPurchase = () =>
  toast.error(VOID_PURCHASE_FAILED, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastSuccessVoidPurchase = () =>
  toast.success(VOID_PURCHASE_SUCCESS, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastRequestCreateCustomer = () =>
  toast.loading(CUSTOMER_CREATE_REQUEST, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastFailedCreateCustomer = () =>
  toast.error(CUSTOMER_CREATE_FAILED, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastSuccessCreateCustomer = () =>
  toast.success(CUSTOMER_CREATE_SUCCESS, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastRequestVoidSale = () =>
  toast.loading(VOID_SALE_REQUEST, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastFailedVoidSale = () =>
  toast.error(VOID_SALE_FAILED, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastSuccessVoidSale = () =>
  toast.success(VOID_SALE_SUCCESS, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastSavingNewSale = () =>
  toast.loading(NEW_SALE_SAVING, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastSavedNewSale = () =>
  toast.success(NEW_SALE_SAVED, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastErrorNewSale = () =>
  toast.error(NEW_SALE_FAILED, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastErrorLogin = () =>
  toast.error(LOGIN_FAILED, {
    position: DEFAULT_POSITION,
    duration: DEFAULT_DURATION,
  });

export const toastInstance = toast;
