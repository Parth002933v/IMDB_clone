import ax, { AxiosError, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import {
	TBaseApiResponse,
	TBaseApiResponseSchema,
	TSessionErrorSchema,
} from '~/tyoes';

export const axios = ax.create({
	timeout: 3000,
	// withCredentials: true,
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOCKEN}`,
		'Content-Type': 'application/json',
	},
});

axiosRetry(axios, {
	retries: 3,
	retryDelay: rc => {
		console.log(`Retrying request... Attempt #${rc}`);
		return rc * 1000;
	},
	retryCondition: error => {
		return axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error);
	},
});

axios.interceptors.request.use(config => {
	// console.log('===apihandler==', config.url, '===apihandler===');
	// const url = new URL(config.url || '');
	// url.searchParams.append('watch_region', 'IN');
	// url.searchParams.append('language', 'hi-IN');
	// config.url = url.toString();
	// console.log(config);
	return config;
});

axios.interceptors.response.use(
	response => {
		return response;
	},
	(error: AxiosError) => {
		// console.log('==raw error==', error, '===raw error===');
		// console.log(handledError);

		return handleApiError(error);
		// return Promise.reject(handledError);
	}
);

const handleApiError = (
	error: AxiosError
): Promise<TBaseApiResponse | AxiosResponse> => {
	if (error.response) {
		const { data, status } = error.response;
		const sessionError = TSessionErrorSchema.safeParse(data);
		if (sessionError.success) {
			return Promise.reject({
				status_message: sessionError.data.status_message,
				statusCode: sessionError.data.status_code,
			});
		}

		const globalAPIError = TBaseApiResponseSchema.safeParse(data);
		if (globalAPIError.success) {
			// is the error response contents status code 3 for un authorized error
			if (globalAPIError.data.status_code == 3) {
				// return Promise.resolve(error.response); // want to return here
				error.response.data = undefined;
				return Promise.resolve(error.response);
			}
			return Promise.reject({
				success: false,
				statusCode: globalAPIError.data.status_code,
				status_message: globalAPIError.data.status_message,
			});
		}

		return Promise.reject({
			status_message: `Unexpected error with status: ${error.message}`,
		});
	} else if (error.request) {
		return Promise.reject({
			status_message:
				'No response received from the server. Please check your network.',
		});
	} else {
		return Promise.reject<TBaseApiResponse>({
			status_message: `Request error: ${error.message}`,
		});
	}
};
