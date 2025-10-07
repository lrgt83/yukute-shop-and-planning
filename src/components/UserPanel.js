import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/auth";

function UserPanel({ isActive, handleClose }) {
  const dispatch = useDispatch();

  const {
    tokenPayload: { user },
  } = useSelector((state) => state.auth);

  return (
    <div
      id="kt_quick_user"
      className={`offcanvas offcanvas-right p-10 ${
        isActive ? "offcanvas-on" : ""
      }`}
    >
      <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
        <h3 className="font-weight-bold m-0">Mi perfil</h3>
        <button
          className="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
          onClick={handleClose}
        >
          <i className="ki ki-close icon-xs text-muted"></i>
        </button>
      </div>
      <div className="offcanvas-content pr-5 mr-n5">
        <div className="d-flex align-items-center mt-5">
          <div className="d-flex flex-column">
            <div className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary">
              {user.first_name} {user.last_name}
            </div>
            <div className="text-muted mt-1">
              {(user.groups.length && user.groups[0].name) || ""}
            </div>
            <div className="navi mt-2">
              <div className="navi-item">
                <span className="navi-link p-0 pb-2">
                  <span className="navi-icon mr-1">
                    <span className="svg-icon svg-icon-lg svg-icon-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g stroke="none" fill="none">
                          <rect x="0" y="0" width="24" height="24" />
                          <path
                            d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z"
                            fill="#000000"
                          />
                          <circle
                            fill="#000000"
                            opacity="0.3"
                            cx="19.5"
                            cy="17.5"
                            r="2.5"
                          />
                        </g>
                      </svg>
                    </span>
                  </span>
                  <span className="navi-text text-muted text-hover-primary">
                    {user.email}
                  </span>
                </span>
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
