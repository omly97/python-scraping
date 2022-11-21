Vue.use(axios)

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {"Content-type": "application/json"}
});

instance.defaults.withCredentials = false;
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*',
instance.interceptors.response.use(
    // Tout code d'état qui se situe dans la plage de 2xx provoque le déclenchement de cette fonction
    function (response) {
        return response.data;
    },

    // Tout code d'état qui sort de la plage de 2xx provoque le déclenchement de cette fonction
    function (error) {
        /**
         * Tester le code d'etat de la réponse
         * SI c'est 401 (erreur d'auth) ALORS recharger la page
         * SINON renvoyer les donnees de reponse
         */
        if (error.response.status == 401) {
            location.reload();
        }
        else {
            return Promise.reject(error.response.data);
        }
    }
);

export default instance;
