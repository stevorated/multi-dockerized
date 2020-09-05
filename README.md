# **Dockerized signin\signup boilerplate**

## Basic

a **simple** multi service **dockrized** project including a **react** frontend, and a **node/ngnix** backend with **postgres** and **redis** providing the data layer.

### Stack:
+ Nginx (reverse proxy) 
+ Node 
+ Postresql 
+ Redis 
+ TypeScript 
+ React 
+ material-ui 
+ Docker

The app and servers are routed through nginx proxy to http://localhost:3050  
**web** service (React app) will be available in http://localhost:3050/  
**auth** service (auth service with jwt based auth & handshake endpoint) will be available in http://localhost:3050/auth/v1/some/route  
**fib** service will be available in http://localhost:3050/fib/v1/some/route  
**worker** just provides a sample (redundant) action just to show the capability.  


## Start up = Development mode

`yarn compose`

### Starting each service

each of the service has a few scripts in common: 

- `start`, for building and starting the app in production mode
- `dev`, for building and starting the app in development mode
- `test`, for running a jest test runner (Enzyme also in the react service)
- `clean` & `clean:mod` will clean dist and node_modules for convinience 

this will start all the services and will expose them in localhost:3050

Enjoy for now.. 🆒

# Full Deployment & Development guide guide

... in the near future i hope

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF `CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
