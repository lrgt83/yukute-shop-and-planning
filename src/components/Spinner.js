function Spinner({ message = "Cargando..." }) {
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="spinner spinner-6x mt-20"></div>
      {message}
    </div>
  );
}

export default Spinner;
