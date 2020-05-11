import config from '../config';
import TokenService from '../Services/token-service';

const AuthorApiService = {
    getAuthors() {
        return fetch(`${config.API_ENDPOINT}/authors`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res =>
            (!res.ok) ? res.json().then(e => Promise.reject(e))
            : res.json()
        );    
    },
    getLoggedInAuthor() {
        return fetch(`${config.API_ENDPOINT}/authors/user/loggedin`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()    
        );
    },
    getAuthorById(id) {
        return fetch(`${config.API_ENDPOINT}/authors/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>
            (!res.ok) ? res.json().then(e => Promise.reject(e))
            : res.json()
        );
    },
    async postAuthor(author) {
        const Response = await fetch(`${config.API_ENDPOINT}/authors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(author)
        });
        const json = await Response.json();
        return (Response, json);
    },
    updateAuthor(author) {
        return fetch(`${config.API_ENDPOINT}/authors/${author.author_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(author)
        });
    },
    deleteAuthor(id) {
        return fetch(`${config.API_ENDPOINT}/authors/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        });
    }
};

export default AuthorApiService;