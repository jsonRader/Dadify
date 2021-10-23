const TOKEN_KEY = 'vb-token';
export default {
    getToken: function() {
        return localStorage.getItem(TOKEN_KEY);
    },
    setToken: function(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },
    removeToken: function() {
        localStorage.removeItem(TOKEN_KEY);
    }
}