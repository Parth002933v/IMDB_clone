import{w as c,a as d}from"./with-props-BwqmSWsg.js";import{j as e,i as u,r as i}from"./chunk-K6AXKMTT-ChX_KrkW.js";import{P as x}from"./profileMediaCard-Dgum8gXf.js";import"./utils-CNFb9ZM6.js";import{T as f}from"./tyoes-CgVAvb21.js";import"./sessionStorage-BF0OBVdh.js";import{u as p}from"./useCustomFetcher-GDegCx-T.js";const E=d(function({error:t}){const n=f.safeParse(t||"");return n.success?e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-gray-100 p-6",children:e.jsxs("div",{className:"w-full max-w-lg rounded-lg bg-white p-8 shadow-lg",children:[e.jsxs("h1",{className:"mb-4 text-4xl font-bold text-red-600",children:["Error ",n.data.status_code]}),e.jsx("h2",{className:"mb-4 text-xl text-gray-700",children:n.data.status_message}),e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{onClick:()=>window.location.reload(),className:"rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",children:"Retry"})})]})}):u(t)?e.jsxs(e.Fragment,{children:[e.jsxs("h1",{children:[t.status," ",t.statusText]}),e.jsx("p",{children:t.data}),e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{onClick:()=>window.location.reload(),className:"rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",children:"Retry"})})]}):t instanceof Error?e.jsxs("div",{children:[e.jsx("h1",{children:"Error"}),e.jsx("p",{children:t.message}),e.jsx("p",{children:"The stack trace is:"}),e.jsx("pre",{children:t.stack}),e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{onClick:()=>window.location.reload(),className:"rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",children:"Retry"})})]}):e.jsx("h1",{children:'"unknown"'})}),m=({loaderData:s})=>s?e.jsx(h,{movieData:s}):e.jsx(e.Fragment,{children:"User Not Found"}),R=c(m),h=({movieData:s})=>{const[t,n]=i.useState(s.results),{fetcher:l,fetcherState:a,data:o}=p(void 0);return i.useEffect(()=>{!o||!o.results||(n(r=>[...r,...o.results]),s.page=o.page)},[o]),i.useEffect(()=>{n(r=>[...s.results])},[s,s.results]),e.jsxs("div",{className:"flex h-full w-full flex-col items-center justify-center gap-4 px-5",children:[t==null?void 0:t.map(r=>e.jsx(x,{cardData:r},r.id)),s.page>0&&s.page<s.total_pages&&e.jsx("div",{onClick:()=>{const r=new URLSearchParams;r.set("group-type","Recommendations"),r.set("page",(s.page+1).toString()),r.set("media_type","movie"),l.load(`/api/remote/load-items?${r}`)},className:"w-full cursor-pointer rounded-lg bg-purple-500 py-3 text-center text-xl font-bold text-white",children:a==="loading"?e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18px",fill:"#fff",className:"ml-2 inline animate-spin",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z","data-original":"#000000"})}):e.jsx(e.Fragment,{children:"Load More"})})]})};export{E,h as M,R as a};