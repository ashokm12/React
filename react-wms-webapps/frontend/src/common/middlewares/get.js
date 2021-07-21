import { API_TIMEOUT } from "../config/utils";

const urlTimeoutId = {};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint) {
  return fetch(endpoint, {
    credentials: "include",
    header: {
      Cookie:
        "JSESSIONID=18FBBA1C69BE6D23BA699A39E8E5AA92; mod_auth_openidc_state_eo6qIsVTVUf6SjsB1PAvGCtV_3U=eyJhbGciOiAiZGlyIiwgImVuYyI6ICJBMjU2R0NNIn0..8EXNNxcsxwmmYsez.x0yo11FvIDl_MM1H_68yhECm1HcbnanypLcVMM6yyeN07lV1W6Cogjt_CMxJ5B_pFvrIP8l_5K90Um_eOnp6FVNl3ZBMUIIXt0fzSMPbU7qA0i2Gw3g6-aBPbC6Khm_zppTihx-1Y7FfwAcGzibIFOlMiT9EClY4Owvfeu-wtdfjTgAw35da29_cAumWiIzL-IPR3bHsWqqJZBxSaXasOALYwdFJD9mTNYoQGxeIc05S-FJ1L3X-n2kx_qpfE1EPiwpDAZm7qJlnY27aAiH-9mF6yC6Se5xg36xs0H5Cdb8JxavwXQdvCl91kU9-TmdhRXCcrkxBsVavbZMhA0D5z-iRrcHbdwW7xip3YkGjHh21iS_j8a3tIJ-6dxs01aorDcCSOKe4nVgUkvRarXgqi-A_3k-UT0jMf3Tf.IZDkPe7zdQO6UoN3mj0VXA; nics_mod_auth_openidc_session=8b52678b-fb62-4877-a904-6f2b7d0505f4; uoid=74",
    },
  })
    .then((response) => {
      if (urlTimeoutId[endpoint]) {
        clearTimeout(urlTimeoutId[endpoint]);
        delete urlTimeoutId[endpoint];
      }
      return response
        .json()
        .then((json) => ({ json, response }))
        .catch(() => {
          if (response.ok) {
            return Promise.resolve({ response });
          }
          return Promise.reject({
            status: response.status,
          });
        });
    })
    .then(({ json, response }) => {
      if (Array.isArray(json)) {
        json = {
          data: json,
        };
      } else if (typeof json !== "object") {
        json = {};
      }
      json.isServerOK = !!response.ok;
      if (!json.isServerOK) {
        return Promise.reject({
          status: response.status,
          ...json,
        });
      }
      return { ...json };
    });
}

function callApiWithTimeout({ endpoint, timeout }) {
  return Promise.race([
    callApi(endpoint),
    new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        reject({
          status: 500,
          message: "Request timed out",
        });
      }, timeout);
      urlTimeoutId[endpoint] = id;
    }),
  ]);
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol("Call API");

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types } = callAPI;

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.");
  }
  if (!types.every((type) => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }

  const [requestType, successType, failureType] = types;

  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  }

  function successHandler(response) {
    //   next(actionWith({ type: MARK_PAGE_FOUND }));
    if (callAPI.successTypeActionProps) {
      next(
        actionWith({
          response,
          ...callAPI.successTypeActionProps,
          type: successType,
        })
      );
    } else {
      next(actionWith({ response, type: successType }));
    }
    const { onSuccess } = callAPI;
    if (onSuccess) {
      if (typeof onSuccess !== "function") {
        throw new Error("Success Callback should be a function");
      }
      onSuccess(response, store.getState(), store.dispatch);
    }
  }

  function handleCallApi() {
    //   if (endpoint.indexOf('/webapi/') >= 0) {
    // 	return callApiWithTimeout({ endpoint, timeout: API_TIMEOUT }).then(successHandler, failureHandler);
    //   }
    //   return callApi(endpoint).then(successHandler, failureHandler);
    return callApiWithTimeout({ endpoint, timeout: API_TIMEOUT }).then(
      successHandler,
      failureHandler
    );
  }

  function failureHandler(response) {
    response.status = response.status || 0;

    switch (response.status) {
      case 401:
        if (Object.keys(store.getState()).includes("dashboard")) {
          // 401 UnAuthorized or 403 forbidden redirects to be done only for logged in pages
          window.location.href = "https://sellerpad.io/main/#/login";
          return false;
        }
        //   next(actionWith({ type: MARK_USER_LOGGED_OUT }));
        break;
      // case 403:
      //   next(actionWith({ type: MARK_PAGE_FORBIDDEN }));
      //   break;
      // case 404:
      //   next(actionWith({ type: MARK_PAGE_NOT_FOUND }));
      //   break;
      // case 0:
      // case 500:
      //   next(actionWith({ type: MARK_REQUEST_TIMEOUT }));
      //   break;
      default:
        break;
    }

    next(
      actionWith({
        type: failureType,
        error: response.message || "Something bad happened",
      })
    );

    const { onFailure } = callAPI;

    if (onFailure) {
      if (typeof onFailure !== "function") {
        throw new Error("Failure Callback should be a function");
      }
      onFailure(response, store.getState(), store.dispatch);
    }
  }

  let requestTypeActionData = { type: requestType };

  if (callAPI.requestTypeActionProps) {
    requestTypeActionData = {
      ...requestTypeActionData,
      ...callAPI.requestTypeActionProps,
    };
  }
  next(actionWith(requestTypeActionData));

  //validate the get params
  const { validator } = callAPI;
  let { toValidate } = callAPI;
  if (typeof validator === "function" && typeof toValidate !== "function") {
    throw new Error(
      "Expected toValidate to be a function since you supplied a validator method"
    );
  }

  if (!validator) {
    return handleCallApi();
  } else {
    if (typeof toValidate === "function") {
      toValidate = toValidate(store.getState());
    }
    return validator.validate(toValidate).then((result) => {
      if (result.valid) {
        return handleCallApi();
      }

      let failureTypeActionData = {
        type: failureType,
        errors: result.errors,
      };

      if (callAPI.failureTypeActionProps) {
        failureTypeActionData = {
          ...failureTypeActionData,
          ...callAPI.failureTypeActionProps,
        };
      }
      return Promise.resolve(next(actionWith(failureTypeActionData)));
    });
  }
};
