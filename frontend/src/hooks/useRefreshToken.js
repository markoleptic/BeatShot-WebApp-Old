import axios from '../api/axios';
import { useAuthContext } from '../context/AuthProvider';
import useAuth from './useAuth.js';

const useRefreshToken = () => {
    const { setAuth  } = useAuthContext();
    const refresh = async () => {
        const response = await axios.get('/api/refresh', {
            withCredentials: true,
        });
        setAuth(prev => {
            return { ...prev, 
                username: response.data.username,
                accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;