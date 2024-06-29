import { getUniqueParams } from "../helpers/urlHelper.js";

const pagination = document.querySelector('.pagination')

pagination.innerHTML = `
<span class="page">Page</span>
            <ul class="pLinks">
              <a class="page-link" href="${generatePaginationUrl(getPreviousPageNumber())}">
                <img src="media/icons/prev.png">
              </a>
              <a class="page-link" href="##"
                <span>${getCurrentPage()}</span>
              </a>
              <a class="page-link" href="${generatePaginationUrl(getNextPageNumber())}"><img src="media/icons/next.png"></a>
            </ul>
`

function getNextPageNumber()
{
    let currentPage = getCurrentPage();

    return ++currentPage;
}

function getPreviousPageNumber()
{
    let currentPage = getCurrentPage();

    if(currentPage <= 1)
    {
        return 1;
    }

    return --currentPage;
}

export function getCurrentPage()
{
    return getPaginationParams().page;
}

export function getPerPage()
{
    return getPaginationParams().perPage;
}

export function getPaginationParams()
{
    const params = getUniqueParams();

    let perPage = getValidPerPage(params.get('per_page')),
        page = getValidPageNumber(params.get('page'));
    
    return {perPage, page};
}

export function pushPaginationParams(page, perPage)
{
    const urlParams = getUniqueParams()

    const tmpPage = getValidPageNumber(page || urlParams.get('page'));
    const tmpPerPage = getValidPerPage(perPage || urlParams.get('per_page'))

    urlParams.delete('page')
    urlParams.delete('per_page')

    urlParams.append('page', getValidPageNumber(tmpPage))
    urlParams.append('per_page', getValidPerPage(tmpPerPage))

    return urlParams;
}

export function stringifyPaginationParams(page, perPage)
{
    return pushPaginationParams(page, perPage).toString()
}

function getValidPageNumber(page)
{
    page = Number.parseInt(page);

    if(! Number.isInteger(page) || page < 1)
    {
        page = 1;
    }

    return page;
}

function getValidPerPage(perPage)
{
    perPage = Number.parseInt(perPage)

    if(! Number.isInteger(perPage) || (perPage < 5 || perPage > 100))
    {
        perPage = 5;
    }

    return perPage;
}

function generatePaginationUrl(page)
{
    return `${window.location.origin}?${stringifyPaginationParams(page)}`
}