export class ApiResponse<T> {
    data: T;
    success: boolean;
    error: ApiError;
}

export class ApiError {
    readonly name: string;      // type of errors
    readonly errors: any[];     // errors
}

const apiCall = (apiUrl: string, method: string): <T>(action: string, params: RequestInit) => Promise<ApiResponse<T | null>> => {
    return async <T>(action: string, params: any): Promise<ApiResponse<T | null>> => {
        try {
            const response = await fetch(`${apiUrl}/${action}`.replace(/\/$/, ""), Object.assign({}, { method, body: params ? JSON.stringify(params) : "" }));
            const json = await parseResponse<T>(response);
            return json;
        }
        catch (error) {
            console.error("ERROR: ", error);
            return {
                success: false,
                error: {
                    name: "HTTP Error",
                    errors: []
                },
                data: null
            };
        }
    };
};

const parseResponse = async <T>(response: Response): Promise<ApiResponse<T | null>> => {
    try {
        const json = await response.json() as ApiResponse<T>;
        if (json.success !== true) {
            console.log("ERROR: ", json);
        }
        return json;
    }
    catch (error) {
        console.error("ERROR: ", error);
        return {
            success: false,
            error: {
                name: "JSON Parse Error",
                errors: []
            },
            data: null
        };
    }
};

export class Api {
    get: <T>(action: string, params: any) => Promise<ApiResponse<T | null>>;
    put: <T>(action: string, params: any) => Promise<ApiResponse<T | null>>;
    post: <T>(action: string, params: any) => Promise<ApiResponse<T | null>>;
    delete: <T>(action: string, params: any) => Promise<ApiResponse<T | null>>;

    constructor(controller, version = "v1") {
        const apiUrl = `${process.env.API_URL}/${version}/${controller}`;
        this.get = apiCall(apiUrl, "GET");
        this.put = apiCall(apiUrl, "PUT");
        this.post = apiCall(apiUrl, "POST");
        this.delete = apiCall(apiUrl, "DELETE");
    }



}
