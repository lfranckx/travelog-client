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
    getByUsername(username) {
        console.log('GET AUTHOR BY USERNAME', username);
        
        return fetch(`${config.API_ENDPOINT}/authors/${username}`, {
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
        console.log('sending author', author);
        return fetch(`${config.API_ENDPOINT}/authors/${author.username}`, {
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
    },
    uploadFile(file) {
        console.log('sending file', file);
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': '.png, .jpg, .jpeg .gif',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: file
        };
        // Remove 'Content-Type' header to allow browser to add
        // along with the correct 'boundary'
        delete options.headers['Content-Type'];
        return fetch(`${config.API_ENDPOINT}/upload`, options);
    }
};

export default AuthorApiService;