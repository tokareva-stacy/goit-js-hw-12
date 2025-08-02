import{a as f,S as m,i as l}from"./assets/vendor-BK_rxH-O.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))u(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&u(n)}).observe(document,{childList:!0,subtree:!0});function e(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(r){if(r.ep)return;r.ep=!0;const t=e(r);fetch(r.href,t)}})();const d="51479963-53d51370f5836e8ee394a60fa",p="https://pixabay.com/api/";async function y(s){const o={key:d,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};try{return(await f.get(p,{params:o})).data}catch(e){throw console.error("Error while retrieving images:",e),new Error("Failed to retrieve images. Please try again.")}}const i=document.querySelector(".gallery");let g=new m(".gallery a",{captionsData:"alt",captionDelay:250});function h(s){if(!i){console.error('Gallery container not found. Make sure an element with class "gallery" exists.');return}const o=s.map(e=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img
          class="gallery-image"
          src="${e.webformatURL}"
          alt="${e.tags}"
        />
        <div class="info">
          <p class="info-item"><b>Likes</b> ${e.likes}</p>
          <p class="info-item"><b>Views</b> ${e.views}</p>
          <p class="info-item"><b>Comments</b> ${e.comments}</p>
          <p class="info-item"><b>Downloads</b> ${e.downloads}</p>
        </div>
      </a>
    </li>
  `).join("");i.insertAdjacentHTML("beforeend",o),g.refresh()}function b(){i&&(i.innerHTML="")}const a=document.querySelector(".loader");function w(){a&&a.classList.add("is-visible")}function L(){a&&a.classList.remove("is-visible")}const c=document.querySelector(".form"),v=c.elements["search-text"];document.querySelector(".gallery");c.addEventListener("submit",S);async function S(s){s.preventDefault();const o=v.value.trim();if(o===""){l.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}b(),w();try{const e=await y(o);e.hits.length===0?l.info({title:"Information",message:"Sorry, there are no images matching your request. Please try again!",position:"topRight"}):h(e.hits)}catch(e){l.error({title:"Error",message:"Something went wrong! Please try again later.",position:"topRight"}),console.error("Error while searching images:",e)}finally{L(),c.reset()}}
//# sourceMappingURL=index.js.map
