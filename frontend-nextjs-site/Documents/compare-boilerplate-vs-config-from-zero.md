footer: © Dwarves Foundation, 2020
slidenumbers: true

# Boilerplate vs configuration from zero
---

# Prepared by

Hang Tran


---

# Agenda

1. Overview
1.1 What is boilerplate
1.2 What is from-zero-configuration
2. Comparison
3. Example:
3.1.  Boilerplate
3.1.1.  Create React App
3.1.2.  React static
3.1.3.  NextJS
     	3.2.  From zero configure
3.2.1.  Poi


---

# 1.  Overview

## 1.1 What is boilerplate?

Boilerplate code or boilerplate refers to sections of code that have to be included in many places with little or no alteration. It is often used when referring to languages that are considered verbose.


---
# 1. Overview

## 1.2 What is from-zero-configuration


Developer has to build an app’s structure from literally zero, without any boilerplate in place


---

# 2. Comparision

Boilerplate | From-zero-configuration
---|---
Faster way to jump right into development | Take longer time and more effort to decide what stack to use, how to structure your
Use the default setup from the boilerplate, it might not always be the best solution for the project | Can customize and have complete control over what is used in the project




---

# 3. Example
## 3.1.1 create-react-app
- Setting up the tools to develop a React application can be intimidating and time-consuming: set up Babel to transpile JSX into browser-ready code, configure Webpack to bundle the app’s assets.
-A tool (built by developers at Facebook) that gives you a massive head start when building React apps.
- Save developers from time-consuming setup and configuration.
- Simply run one command and Create React App sets up the tools needed to start React project.



---

# 3. Example
## 3.1 Boilerplate
### 3.1.2 React static
- A progressive static-site framework for React, a next-gen static site generator for React.
- Simple SSR and static export
- Ability to easily customize Webpack config
- Automatic and customizable page prefetching
- Minimal hardcoded dependecy allows for a more movable codebase
- Smooth scrolling to in-page hashes
- Auto-generated sitemaps

---

![inline](https://i.ibb.co/6n8J8Yq/Screenshot-2020-02-05-at-21-53-13.png)

---

# 3. Example
## 3.1 Boilerplate
### 3.1.3 NextJS
- Next.js is a framework that renders react applications on the server
- Provide a boilerplate application.
- Generate incredibly performant, accessible and SEO friendly websites.
- Create Single Page Applications out-of-the-box

---

![inline](https://i.ibb.co/x3TC1RD/Screenshot-2020-02-05-at-22-16-56.png)

---

# 3. Example
## 3.1 Boilerplate
### 3.1.3 Compare Gatsby and Next
Gatsby|Next
---|---
A static site generator tool - which generates static HTML on build time. It doesn’t use a server | Mainly a tool for server-side rendered pages - dynamically generates the HTML every time a new request comes in with the use of a server
Can function without any server at all | Requires a server to be able to run
Generates pure HTML/CSS/JS at build time |  Creates HTML/CSS/JS at run time. So each time a new request comes in, it creates a new HTML page from the server

---

# 3. Example
## 3.1 Boilerplate
### 3.1.3 When to choose between Gatsby and Next
Gatsby|Next
---|---
Have lots of content or expect content to grow a lot over time, then static generated web pages are not the best solution because it takes much time to build the site again and again | Want with some "starter" templates, as well as a relatively recently introduced "themes" which all make getting a fully functioning web app up and running a quick process
When creating a very large app with thousands of pages it can be fairly slow to rebuild |
If you want more freedom with how you access your data |


---

# 3. Example
## 3.2 Poi
- Poi is a bundler built on the top of webpack, trying to make developing and bundling apps with webpack as easy as possible
- Poi.js is a tool that comes to replace starter-kits and boilerplate projects. Poi’s promise is “no more configuration hell”. With almost no config it delivers the following:
- Automatic transpilation and bundling (with webpack and babel/postcss)
- Hot code reloading

---

# 3. Example
## 3.2 Poi
- Files in ./static are copied to dist folder
- Poi offers us an option of zero-configuration by providing sane defaults and hiding them away until you need to tweak a change to suit your needs

---

# Reference
- https://medium.com/@tannerlinsley/️-introducing-react-static-a-progressive-static-site-framework-for-react-3470d2a51ebc
- https://dev.to/aurelkurtula/introduction-to-the-basics-of-nextjs-1loa
- https://dev.to/jameesy/gatsby-vs-next-js-what-why-and-when-4al5
- https://hackernoon.com/zero-config-react-typescript-css-modules-jest-with-poi-bbcedfe2383a
- https://poi.js.org

---

Q&A
