import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode

// const API_URL = 'http://localhost:1337';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';

// Fetch messages with correct Authorization token
// export const fetchMessages = async (token) => {
//   const response = await axios.get(`${API_URL}/api/messages?populate=*`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   });
//   return response.data.data;
// };

// Send message with correct Authorization token
export const sendMessage = async (content, token) => {
  const decodedToken = jwtDecode(token); // Decode token to get user ID
  const userId = decodedToken.id;

  console.log('Debug: Sending message:', content); // Log message content
  console.log('Debug: Sender ID from token:', userId); // Log sender ID

  try {
    const response = await fetch('http://localhost:1337/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Include JWT token
      },
      body: JSON.stringify({ text: content }),
    });
  
    console.log('Debug: Raw Response:', response); // Check the raw response
  
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
    }
  
    const data = await response.json(); // Parse JSON response
    console.log('Debug: Message sent successfully. Response:', data);
  
    return data; // Return the parsed response
  
  } catch (error) {
    console.error('Debug: Error sending message:', error.message);
    throw error;
  }
}

// Login user
export const login = async (email, password) => {
  console.log('here');
  console.log(API_URL);

  const res = await fetch('http://localhost:1337/api/auth/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: email,  
      password: password, 
    }),
  });

  const data = await res.json();
  console.log('Debug: Login successful. Response:', data);
  return data;
  // axios
  // .post('http://localhost:1337/api/auth/local', {
  //   identifier: email,
  //   password: password,
  // })
  // .then(response => {
  //   // Handle success.
  //   console.log('Well done!');
  //   console.log('User profile', response.data.user);
  //   console.log('User token', response.data.jwt);
  // })
  // .catch(error => {
  //   // Handle error.
  //   console.log('An error occurred:', error.response);
  // });


  // const response = await axios.post(`http://localhost:1337/api/auth/local`, {
  //   identifier: email,
  //   password: password,
  // },
  //   {
  //     headers: { "Content-Type": "application/json" }
  //   });
  // return response.data;
}

// Register user
export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/local/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
};
