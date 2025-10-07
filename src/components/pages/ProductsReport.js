import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";

import {
  setFilterField as setProductsReportField,
  getProducts,
} from "../../reducers/inventory";

function ProductsReport() {
  const { token } = useSelector((state) => state.auth);
  const {
    filterFields: { name, description, category__name, brand__name },
    products,
    productsRequestStatus,
  } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = [
      {
        filterField: "name__icontains",
        filterValue: name,
      },
      {
        filterField: "description__icontains",
        filterValue: description,
      },
      {
        filterField: "category__name__icontains",
        filterValue: category__name,
      },
      {
        filterField: "brand__name__icontains",
        filterValue: brand__name,
      },
    ];
    dispatch(getProducts({ filters, token }));
  };

  const handleUpdateInput = ({ target: { value, name } }) => {
    dispatch(setProductsReportField({ field: name, value }));
  };

  const disableSubmit = productsRequestStatus === "loading";

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Descipcion",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Marca",
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: "Categoria",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Existencias",
      selector: (row) => row.stock,
    },
    {
      name: "Abastecido",
      selector: (row) => row.supplied,
      sortable: true,
    },
  ];

  const data = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: `
      ${product.brand.name} - 
      ${product.brand.description}
    `,
    category: `
      ${product.category.name} - 
      ${product.category.description}
    `,
    stock: product.stock,
    supplied: product.supplied ? "Si" : "No",
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
            <div className="col-md-6">
              <label>Nombre:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por nombre del producto"
                name="name"
                onChange={(e) => handleUpdateInput(e)}
                value={name}
              />
            </div>
            <div className="col-md-6">
              <label>Descipcion:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por descripcion del producto"
                name="description"
                onChange={(e) => handleUpdateInput(e)}
                value={description}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label>Marca:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por marca del producto"
                name="brand__name"
                onChange={(e) => handleUpdateInput(e)}
                value={brand__name}
              />
            </div>
            <div className="col-md-6">
              <label>Categoria:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por categoria del producto"
                name="category__name"
                onChange={(e) => handleUpdateInput(e)}
                value={category__name}
              />
            </div>
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
            title={dataTableTitleOptions[productsRequestStatus]}
            columns={columns}
            data={productsRequestStatus === "succeeded" ? data : []}
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

export default ProductsReport;
