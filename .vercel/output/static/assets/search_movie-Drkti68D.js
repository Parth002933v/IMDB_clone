import{w as i}from"./with-props-BwqmSWsg.js";import{a as l,j as e,L as a}from"./chunk-K6AXKMTT-ChX_KrkW.js";import{f as r}from"./utils-CNFb9ZM6.js";import{F as o}from"./fallbackImage-B3NB27oW.js";import{P as m}from"./PaginatedNavBar-CwOFHtwC.js";const n=({params:t})=>{const s=l();return e.jsx(d,{outlet:s.data.searchedMovies})},v=i(n);function d({outlet:t}){return e.jsxs(e.Fragment,{children:[t.results.map((s,c)=>e.jsxs("div",{className:"flex h-32 overflow-hidden rounded-lg shadow",children:[e.jsx(a,{to:`/movie/${s.id}`,className:"h-full w-32 overflow-hidden",children:e.jsx(o,{alt:s.title,src:s.poster_path?`https://media.themoviedb.org/t/p/w130_and_h195_bestv2${s.poster_path}`:"/images/defaultBGImage.svg",defaultImage:"/images/defaultBGImage.svg"})}),e.jsxs("div",{className:"flex w-full flex-col justify-between px-3 py-3",children:[e.jsxs("div",{children:[e.jsx(a,{to:`/movie/${s.id}`,className:"font-semibold hover:text-[#01b4e4]",children:s.title}),e.jsxs("span",{className:"font-light text-gray-500",children:["(",e.jsx(e.Fragment,{children:s.original_title}),")"]}),e.jsx("div",{className:"text-sm text-gray-500",children:r(s.release_date)})]}),e.jsx("p",{className:"line-clamp-2 text-sm",children:s.overview})]})]},s.id)),e.jsx("div",{className:"flex w-full justify-center gap-2.5",children:e.jsx(m,{currentPage:t.page,totalPages:t.total_pages})})]})}export{d as M,v as s};