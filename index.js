import{a as y,S as b,i as a}from"./assets/vendor-BK_rxH-O.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const L="51479963-53d51370f5836e8ee394a60fa",w="https://pixabay.com/api/";async function v(r,o=1,t=15){try{const i={key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:t};return(await y.get(w,{params:i})).data}catch(i){throw console.error("Error fetching images:",i),i}}const l=document.querySelector(".gallery");let S=new b(".gallery a",{captionsData:"alt",captionDelay:250});function q(r){if(!l){console.error('Gallery container not found. Make sure an element with class "gallery" exists.');return}const o=r.map(t=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${t.largeImageURL}">
        <img
          class="gallery-image"
          src="${t.webformatURL}"
          alt="${t.tags}"
        />
        <div class="info">
          <p class="info-item"><b>Likes</b> ${t.likes}</p>
          <p class="info-item"><b>Views</b> ${t.views}</p>
          <p class="info-item"><b>Comments</b> ${t.comments}</p>
          <p class="info-item"><b>Downloads</b> ${t.downloads}</p>
        </div>
      </a>
    </li>
  `).join("");l.insertAdjacentHTML("beforeend",o),S.refresh()}function E(){l&&(l.innerHTML="")}const c=document.querySelector(".loader");function M(){c&&c.classList.add("is-visible")}function P(){c&&c.classList.remove("is-visible")}const f=document.querySelector(".load-more-btn");function I(){f&&f.classList.add("is-visible")}function h(){f&&f.classList.remove("is-visible")}let n=1,p="";const m=15,d=document.querySelector(".form"),R=d.elements["search-text"],B=document.querySelector(".gallery"),$=document.querySelector(".load-more-btn");d.addEventListener("submit",x);$.addEventListener("click",O);async function g(){M(),h();try{const r=await v(p,n,m);if(r.hits.length===0){a.info({title:"Information",message:"Sorry, there are no images matching your request. Please try again!",position:"topRight"}),n>1&&a.info({title:"Information",message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}if(q(r.hits),n>1){const t=B.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:2*t,behavior:"smooth"})}const o=Math.ceil(r.totalHits/m);n<o?I():a.info({title:"Information",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch(r){a.error({title:"Error",message:"Something went wrong! Please try again later.",position:"topRight"}),console.error("Error while fetching images:",r)}finally{P()}}async function x(r){r.preventDefault();const o=R.value.trim();if(o===""){a.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}p=o,n=1,E(),h(),await g(),d.reset()}async function O(){n+=1,await g()}
//# sourceMappingURL=index.js.map
