import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-a479f.firebaseio.com/'
})
instance.defaults.headers.post['Access-Control-Allow-Origin'] ='true';

export default instance;