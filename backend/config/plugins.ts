export default () => ({
    'users-permissions': {
      enabled:true
    },
      config: {
        jwtSecret: process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzM5NjE0MzM3LCJleHAiOjE3NDIyMDYzMzd9.SK67uQuN4_SOqdj0OY24htauaQeAKTXbijJJbWNCX-k',  // Use your generated JWT secret
      },
  });
  