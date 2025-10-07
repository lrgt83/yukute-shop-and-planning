import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername, updatePassword, getToken } from "../../reducers/auth";

import { useNavigate } from "react-router-dom";

import { toastErrorLogin, toastInstance } from "../../helpers/toasts";

import { APP_URLS } from "../../helpers/routes";

import loginImage from "../../assets/theme/media/svg/illustrations/yukute-login.jpg";
import "../../assets/theme/css/pages/login/login-1.css";

function Login() {
  const { username, password, token, loginStatus, sessionExpired } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordInputRef = useRef(null);
  const usernameInputRef = useRef(null);

  useEffect(() => {
    if (token && loginStatus === "succeeded" && !sessionExpired) {
      return navigate(APP_URLS.dashboard);
    }
    if (loginStatus === "failed") {
      toastInstance.dismiss();
      toastErrorLogin();
    }
  }, [token, loginStatus, sessionExpired, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getToken({ username, password }));
  };

  const disableSubmit = loginStatus === "loading";

  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
        id="kt_login"
      >
        <div
          className="login-aside d-flex flex-column flex-row-auto"
          style={{ backgroundColor: "#0c182f" }}
        >
          {/* <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
            <a href="/login" className="text-center mb-10">
              <img
                src="assets/media/logos/logo-letter-1.png"
                className="max-h-70px"
                alt=""
              />
            </a>
            <h3
              className="font-weight-bolder text-center font-size-h4 font-size-h1-lg"
              style={{ color: "#986923" }}
            >
              La herramienta ideal
              <br />
              para tu negocio
            </h3>
          </div> */}
          <div
            className="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
            style={{ backgroundImage: `url(${loginImage})` }}
          ></div>
        </div>
        <div className="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
          <div className="d-flex flex-column-fluid flex-center">
            <div className="login-form login-signin">
              <form
                className="form"
                noValidate="novalidate"
                id="kt_login_signin_form"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="pb-13 pt-lg-0 pt-5">
                  <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                    Bienvenido
                  </h3>
                </div>
                <div className="form-group">
                  <label className="font-size-h6 font-weight-bolder text-dark">
                    Usuario
                  </label>
                  <input
                    onChange={() =>
                      dispatch(updateUsername(usernameInputRef.current.value))
                    }
                    ref={usernameInputRef}
                    className="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                    type="text"
                    name="username"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <div className="d-flex justify-content-between mt-n5">
                    <label className="font-size-h6 font-weight-bolder text-dark pt-5">
                      Password
                    </label>
                  </div>
                  <input
                    onChange={() =>
                      dispatch(updatePassword(passwordInputRef.current.value))
                    }
                    ref={passwordInputRef}
                    className="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                    type="password"
                    name="password"
                    autoComplete="off"
                  />
                </div>
                <div className="pb-lg-0 pb-5">
                  <input
                    type="submit"
                    className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
                    value="Iniciar Sesión"
                    disabled={disableSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
