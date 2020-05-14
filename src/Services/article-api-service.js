import config from '../config';
import TokenService from '../Services/token-service';

const ArticleApiService = {
    getArticles() {
        return fetch(`${config.API_ENDPOINT}/articles`, {
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
    getArticle(id) {
        return fetch(`${config.API_ENDPOINT}/articles/${id}`, {
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
    getByUsername(username) {
        console.log('GETTING ARTICLES BY USERNAME', username);
        
        return fetch(`${config.API_ENDPOINT}/articles/user/${username}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>
            (!res.ok) ? res.json().then(e => Promise.reject(e))
            : res.json()
        );
    },
    async postArticle(article) {
        console.log('POSTING ARTICLE', article);
        
        const Response = await fetch(`${config.API_ENDPOINT}/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(article)
        });
        const json = await Response.json();
        return (Response, json);
    },
    updateArticle(article) {
        console.log('updating article', article);
        
        return fetch(`${config.API_ENDPOINT}/articles/${article.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(article)
        });
    },
    deleteArticle(id) {
        console.log('DELETING ARTICLE');
        return fetch(`${config.API_ENDPOINT}/articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        });
    },
    uploadFile(file) {
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

export default ArticleApiService;