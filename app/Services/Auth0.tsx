export class ApiToken {
    private static instance: ApiToken;
    private token: string | undefined;

    private constructor() {}

    public static getInstance() : ApiToken {
        if(!ApiToken.instance)
        {
            console.log("here");
            ApiToken.instance = new ApiToken();
        }

        return ApiToken.instance;
    }

    public validateToken(): Boolean {
        
        
        
        return false;
    }

    public async getToken() {
        if(!this.token || this.token == "") {
            const response: Response =  await fetch("Auth 0 domain", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: '{"client_id":"","audience":"http://localhost:8000/","grant_type":"client_credentials"}'
            })

            if(!response.ok)
            {
                throw new Error("Error Fetching API Token");
            }

            const responseBody = await response.json();
            this.token = responseBody.access_token;
        }

        console.log(this.token);
        return this.token
    }
};

export async function getApiToken() {
    const apiToken: ApiToken = ApiToken.getInstance()
    return await apiToken.getToken();
}