import { getUniqueParams } from "../helpers/urlHelper.js"

let searchComponent = document.querySelector('.searchComponent')

console.log(searchComponent)
searchComponent.innerHTML = `<div class="filter">
<form class="filterBox fsear" id="">
  <input type="text" placeholder="Search" class="w-100 py-1">
  <button><img src="media/icons/search.png" alt=""></button>
</form>
</div>`


export function baseSearchHandler(closure)
{
        
}