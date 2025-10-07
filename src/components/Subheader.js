import { useLocation } from "react-router-dom";
import { APP_PATH_NAMES } from "../helpers/routes";

function Subheader() {
  const { pathname } = useLocation();
  return (
    <div className="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
      <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div className="d-flex align-items-center flex-wrap mr-1">
          <div className="d-flex align-items-baseline flex-wrap mr-5">
            <h5 className="text-dark font-weight-bold my-1 mr-5">
              {APP_PATH_NAMES[pathname] || ""}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subheader;
