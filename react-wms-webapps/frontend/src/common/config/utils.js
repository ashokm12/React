export const API_TIMEOUT = 60 * 1000;

export function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === name + '=') {
				cookieValue = decodeURIComponent(
					cookie.substring(name.length + 1)
				);
				break;
			}
		}
	}
	return cookieValue;
}

export function generateFormDataForJSON(json) {
	const supportsFormData = window.FormData !== undefined;
	let data = supportsFormData ? new FormData() : '';
	Object.keys(json)
		.filter(key => {
			return json[key] !== null;
		})
		.forEach(key => {
			if (Array.isArray(json[key])) {
				const valueArray = json[key];
				valueArray.forEach(k => {
					if (supportsFormData) {
						data.append(`${key}`, k);
					} else {
						data = `${data}${key}=${k}&`;
					}
				});
			} else if (typeof json[key] === 'object' && json[key].name) {
				// TODO not supporting IE9 for file upload
				if (supportsFormData) {
					data.append(`${key}`, json[key], json[key].name);
				}
			} else {
				if (supportsFormData) {
					data.append(`${key}`, json[key]);
				} else {
					data = `${data}${key}=${json[key]}&`;
				}
			}
		});

	return data;
}