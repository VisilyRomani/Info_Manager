import io from 'socket.io-client';
const socketURL = 'http://localhost:5000'
export const socket = io(socketURL, {
    // withCredentials:true,
    transportOptions:{
      polling:{
        extraHeaders:{
          "my-custom-headers":"abcd"
        }
      }
    }
  });

  // export const socketAuth = () => {
  //   socket.io.opts.extraHeaders = {
  //     'x-auth-token':'SET_TOKEN',
  //   };
  //   socket.io.opts.transportOptions = {
  //     polling:{
  //       extraHeaders: {
  //         'x-auth-token': 'SET_TOKEN'
  //       },
  //     }
  //   }
  //   socket.io.disconnect();
  //   socket.io.open();
  // }