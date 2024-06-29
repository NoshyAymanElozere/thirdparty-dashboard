export function getUniqueParams()
{
    let urlParams = new URLSearchParams(window.location.search);

    const uniqueParams = new Set();
    
    urlParams.forEach((value, key) => {
        uniqueParams.add(key);
    });
    
    const uniqueParamsArray = Array.from(uniqueParams);

    let uniqueUrlParams = new URLSearchParams();

    uniqueParamsArray.forEach((item) => uniqueUrlParams.append(item, urlParams.get(item)));

    return uniqueUrlParams;
}