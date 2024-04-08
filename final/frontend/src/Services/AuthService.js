// services/AuthService.js
import axios from 'axios';

const AuthService = {
    async login(email, password) {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    async forgotPassword(email) {
        try {
          const response = await axios.post('http://localhost:5000/api/users/forgotPassword', { email });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      async resetPassword(email, otp, newPassword) {
        try {
            const response = await axios.post('http://localhost:5000/api/users/resetPassword', { email, enteredOTP:otp, newPassword });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default AuthService;
