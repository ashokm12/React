import { getCookie, generateFormDataForJSON } from '../config/utils';

// import {
//   DISABLE_ACTION_ITEMS,
//   ENABLE_ACTION_ITEMS,
//   ENABLE_PAGE_STATE_ASYNC,
//   DISABLE_PAGE_STATE_ASYNC,
//   SCROLL_TO_FIRST_ERROR,
// } from '../actions/PageStateActions';

function redirectLogin() {
	const { pathname, search } = window.location;
	const next = `${pathname}${search}`;
	window.location.href = `${
		window.location.origin
	}/accounts/login/?next=${encodeURIComponent(next)}`;
}

function log403(args) {
	const { message, endpoint, payload = {}, ...props } = args;
	const e = new Error(message);
	// Sentry.withScope(scope => {
	// 	scope.setTag('error', 'Server Responded with 403');
	// 	scope.setExtra('errorInfo', {
	// 		uri: endpoint,
	// 		payload: JSON.stringify(payload),
	// 		CSRFToken: getCookie('csrftoken'),
	// 		...props,
	// 	});
	// 	Sentry.captureException(e);
	// });
}

function handle400AndAbove(request, reject, { endpoint, payload }) {
	const { status, responseText } = request;
	switch (status) {
		case 401: {
			// redirectLogin();
			window.location.href =
				'https://sellerpad.io/main/#/login';
			break;
		}

		case 403: {
			log403({
				message: '403 Forbidden',
				endpoint,
				payload,
			});
			reject({});
			break;
		}

		case 429: {
			reject({
				json: JSON.parse(JSON.stringify({ error: responseText })),
				status,
			});
			break;
		}

		default: {
			// any other 4xx error should send back a json response with errors
			try {
				const json = responseText;
				reject({
					json,
					status,
				});
			} catch (e) {
				reject({
					json: {},
					status,
				});
			}
			break;
		}
	}
}

function handle200To400(request, resolve) {
	const jsonResponse =
		request.status === 204 ? {} : JSON.parse(request.responseText);
	resolve({
		isServerOK: true,
		...jsonResponse,
	});
}

export function postApi({
	endpoint,
	payload,
	method = 'POST',
	payloadAsIs,
	isPayloadJson,
	skipCsrfToken,
}) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		let modifiedPayload = payload;
		if (!payloadAsIs) {
			modifiedPayload = payload;
		}
		const params = isPayloadJson
			? JSON.stringify(modifiedPayload)
			: generateFormDataForJSON(modifiedPayload);
		request.open(method, endpoint, true);
		request.withCredentials = true;
		if (!skipCsrfToken) {
			request.setRequestHeader(
				'X-CSRFToken',
				getCookie('csrftoken') || ''
			);
		}

		//Set the request header depending on the payload type.
		if (isPayloadJson) {
			request.setRequestHeader('Content-type', 'application/json');
		} else if (isPayloadJson === 'multipart') {
			request.setRequestHeader('Content-type', 'multipart/form-data');
		} else if (!(window.FormData && params instanceof FormData)) {
			request.setRequestHeader(
				'Content-type',
				'application/x-www-form-urlencoded'
			);
		}
		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				handle200To400(request, resolve);
			} else {
				handle400AndAbove(request, reject, { endpoint, payload });
			}
		};
		request.send(params);
	});
}

export const POST_API = Symbol('Post API');

export default (store) => (next) => (action) => {
	const postAPI = action[POST_API];

	if (typeof postAPI === 'undefined') {
		return next(action);
	}

	let { endpoint, payload } = postAPI;
	const { method = 'post', types } = postAPI;
	const [requestType, successType, failureType] = types;

	if (typeof endpoint === 'function') {
		endpoint = endpoint(store.getState());
	}
	if (typeof endpoint !== 'string') {
		throw new Error('Specify a string endpoint URL.');
	}

	if (typeof payload === 'function') {
		payload = payload(store.getState());
	}

	if (typeof payload !== 'object') {
		throw new Error('Specify the payload for POST request');
	}

	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected an array of three action types.');
	}
	if (!types.every((type) => typeof type === 'string')) {
		throw new Error('Expected action types to be strings.');
	}

	function actionWith(data) {
		const finalAction = { ...action, ...data };

		delete finalAction[POST_API];
		return finalAction;
	}

	function handlePostApi() {
		const { payloadAsIs = false } = postAPI;
		const { isPayloadJson = false } = postAPI;
		const { skipCsrfToken = false } = postAPI;
		return postApi({
			endpoint,
			payload,
			method,
			payloadAsIs,
			isPayloadJson,
			skipCsrfToken,
		}).then(
			(response) => {
				if (postAPI.successTypeActionProps) {
					next(
						actionWith({
							response,
							...postAPI.successTypeActionProps,
							type: successType,
						})
					);
				} else {
					next(actionWith({ response, type: successType }));
				}

				const { onSuccess } = postAPI;

				if (onSuccess) {
					if (typeof onSuccess !== 'function') {
						throw new Error(
							'Success Callback should be a function'
						);
					}
					onSuccess(response, store.getState(), store.dispatch);
				}
			},
			({ status, json: response }) => {
				console.log(response, postAPI, 'jso');
				// stop going any further if rejection promise didn't send in status
				// this would happen only for 401s and 403s.
				if (typeof status === 'undefined') {
					return;
				}

				try {
					console.log(response);
					let failureTypeActionData = {
						errors: postAPI.failureActionErrors
							? postAPI.failureActionErrors(
									JSON.parse(response),
									store.getState(),
									store.dispatch
							  )
							: response
							? JSON.parse(response)
							: null,
					};

					if (!failureTypeActionData.errors) {
						console.error(
							'failureActionErrors should be a function'
						); // eslint-disable-line no-console
						throw new Error(
							'failureActionErrors should be a function'
						);
					}

					if (postAPI.failureTypeActionProps) {
						failureTypeActionData = {
							...failureTypeActionData,
							...postAPI.failureTypeActionProps,
						};
					}

					next(
						actionWith({
							type: failureType,
							...failureTypeActionData,
						})
					);

					//   next(actionWith({ type: SCROLL_TO_FIRST_ERROR }));

					const { onFailure } = postAPI;

					if (onFailure) {
						if (typeof onFailure !== 'function') {
							throw new Error(
								'Failure Callback should be a function'
							);
						}
						onFailure(response, store.getState(), store.dispatch);
					}
				} catch (e) {
					console.error(e.stack); // eslint-disable-line no-console

					// Sentry.withScope(scope => {
					// 	scope.setTag(
					// 		'error',
					// 		'Exception caught processing the failure type' +
					// 			failureType
					// 	);
					// 	scope.setExtra('errorInfo', {
					// 		endpoint,
					// 		status,
					// 		payload: JSON.stringify(payload),
					// 		response: JSON.stringify(response),
					// 		state: JSON.stringify(store.getState()),
					// 	});
					// 	Sentry.captureException(e);
					// });
				}
			}
		);
	}

	let { validator } = postAPI;
	let { toValidate } = postAPI;

	if (typeof validator === 'function' && typeof toValidate !== 'function') {
		throw new Error(
			'Expected toValidate to be a function since you supplied a validator method'
		);
	}

	let requestTypeActionData = { type: requestType };

	if (postAPI.requestTypeActionProps) {
		requestTypeActionData = {
			...requestTypeActionData,
			...postAPI.requestTypeActionProps,
		};
	}
	next(actionWith(requestTypeActionData));

	if (!validator) {
		return handlePostApi();
	} else {
		if (typeof toValidate === 'function') {
			toValidate = toValidate(store.getState());
		}

		// if LGTM validator is not passed, it's a function that returns the LGTM instance
		if (!('validate' in validator)) {
			validator = validator(store.getState());
			if (!('validate' in validator)) {
				throw new Error('Expected Validator to be instance of LGTM');
			}
		}
		return validator.validate(toValidate).then((result) => {
			if (result.valid) {
				return handlePostApi();
			}
			let failureTypeActionData = {
				type: failureType,
				errors: result.errors,
			};

			if (postAPI.failureTypeActionProps) {
				failureTypeActionData = {
					...failureTypeActionData,
					...postAPI.failureTypeActionProps,
				};
			}
			return Promise.all([
				next(actionWith(failureTypeActionData)),
				//   next(actionWith({ type: SCROLL_TO_FIRST_ERROR })),
			]);
		});
	}
};