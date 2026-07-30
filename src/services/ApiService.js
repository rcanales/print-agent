import axios from 'axios';
import config from '../config/config.js';

import {
    getToken,
    setToken,
    clearToken
} from '../utils/tokenStore.js';

export default class ApiService {

    constructor() {

        this.client = axios.create({
            baseURL: config.laravelBaseUrl,
            timeout: 15000,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

    }

    /**
     * Obtiene un nuevo token del servidor.
     */
    async login() {

        const response = await this.client.post('/auth/login', {
            agent_id: config.agentId,
            secret: config.agentSecret
        });

        const token = response.data?.access_token;

        if (!token) {

            throw new Error(
                'El servidor no devolvió un access_token.'
            );

        }

        setToken(token);

        return token;

    }

    /**
     * Agrega el Bearer Token al cliente.
     */
    setAuthorizationHeader() {

        const token = getToken();

        this.client.defaults.headers.common.Authorization = `Bearer ${token}`;

    }

    /**
     * Realiza una petición autenticada.
     */
    async request(
        method,
        url,
        data = null,
        retry = true
    ) {

        if (!getToken()) {
            await this.login();
        }

        this.setAuthorizationHeader();

        try {

            const response = await this.client({
                method,
                url,
                data
            });

            return response;

        }
        catch (error) {

            if (
                retry &&
                error.response?.status === 401
            ) {

                clearToken();

                await this.login();

                return this.request(
                    method,
                    url,
                    data,
                    false
                );

            }

            throw error;

        }

    }

}