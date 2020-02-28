footer: © Dwarves Foundation, 2019
### **Server-side rendering vs Client-side rendering**

---
##I. Client-side Rendering (updating)

---

- Client-side rendering (CSR) means rendering pages directly in the browser using JavaScript. 
- All logic, data fetching, templating and routing are handled on the client rather than the server.


---
![](http://arkwright.github.io/images/scaling-react-server-side-rendering/client-side-rendering-fallback.svg)

---
##II. Server-side Rendering

---
##What's Server-side rendering?

- Server-side rendering (SRR) is a method to render your website. 
- When the user opens your page, his browser makes a request to the server, and the server generates ready to provide HTML.

---
![](http://arkwright.github.io/images/scaling-react-server-side-rendering/server-side-rendering.svg)

---
##Why would we use SSR?

There're 2 main reasons:

- Performance benefit for our customers
- Consistent SEO performance

---
##Server-side rendering pros

- SEO friendly - SSR guarantees your pages are easily indexable by search engines.
- Better performance for the user - User will see the content faster.
- Social Media Optimization: When people try to post your link on Facebook, Twitter, etc. then a nice preview will show up with the page title, description, and image.
- Best for static sites.

---
##Server-side rendering cons

- TTFB (Time to first byte) is slower; your server has to spend some time to prepare HTML for your page instead of sending almost empty HTML doc with link to javascript.
- The page is viewable sooner, but it’s not interactive and the beginning, a user has to wait until react will be done executing.
- Full page reload after routes change.
- Implementation complexity is high.

---
##III. Next.js

---
- Next.js is one React framework to implement SSR in a very simple way, but it's not limited to this. 

- It's advertised by its creators as a **zero-configuration, single-command toolchain for React apps.** 

- It provides a common structure that allows you to easily build a frontend React application, and transparently handles server-side rendering for you.

--- 
##Somes of Next.js' features:
- An intuitive page-based routing system (with support for dynamic routes).
- Automatically statically optimizes page(s) when possible
- Server-side renders page(s) with blocking data requirements.
- Automatic code splitting for faster page loads.
- Customizable with community plugins and with your own Babel and Webpack configurations.

---
##IV.Demo

---
##Init Project

https://github.com/ngochangjelly/boilerplate-generator

---
##V.Q&A
