/*
const endpoint = 'https://en.wikipedia.org/w/api.php';

const domParser = new DOMParser();
function queryApi(query) {
  const url = new URL(endpoint);
  const params = { format: 'json', origin: '*', ...query };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return fetch(url).then(response => response.json());
}
function getPageName(page) {
  return queryApi({ action: 'query', titles: page})
    .then(res => Object.values(res.query.pages)[0].title);
}

function getPageHtml(pageName){
 return queryApi({ action: 'parse', page: pageName, prop: 'text', section: 0, redirects: 1 })
    .then(res => domParser.parseFromString(res.parse.text['*'], 'text/html'));
}
function getFirstParagraph(element){
    return  Array.from(element.querySelectorAll('p:not(.mw-empty-elt)')).find(p => !p.querySelector('#coordinates'));
}
function getPageTitle(url){
    return url.split('/').filter(el=>el).pop();
}
function isArticle(name){
    return !(name.endsWith(':') ? name.slice(0, -1) : name).includes(':');
}
function getWikiLinks(element) {
  return Array.from(element.querySelectorAll('a'))
    .map(link => link.getAttribute('href'))
    .filter(link => link.startsWith('/wiki/')) // Only links to Wikipedia articles
    .map(getPageTitle) // Get the title
    .map(link => link.split('#')[0]) // Eliminate anchor links
    .filter(isArticle) // Make sure it's an article and not a part of another namespace
    .map(link => link.replace(/_/g, ' ')) // Replace underscores with spaces for more readable names
    .filter((n, i, self) => self.indexOf(n) === i); // Remove duplicates
}
function getSubPages(pageName) {
  return getPageHtml(pageName)
    .then(getFirstParagraph)
    .then(getWikiLinks);
}

*/
function getColor(level) {
  return lightenHex('#03C4EB', 5 * level); // Gets 5% lighter for each level
}

// const endpoint = 'https://api.datamuse.com/words?ml=';
const endpoint = 'https://words.bighugelabs.com/api/2/';
const api = 'd4539b1d311281379caa242526c45c44';

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

// function getSubPages(pageName) {
//   const url = endpoint + pageName;
//   var subpages = new Array(10);
//   var synonyms = JSON.parse(httpGet(url));
//   for(var i=0;i<10;i ++){
//     subpages = synonyms[i].JSON.;

//   }

//   return Promise.resolve(subpages);

// }
function getSubPages(pageName) {
  const url = endpoint + api + '/' + pageName + '/json';
  var subpages = new Array(10);
  var synonyms = JSON.parse(httpGet(url));
  subpages = synonyms.noun.syn;
  if (subpages.length > 10) {
    subpages = subpages.slice(0, 10);
  }

  return Promise.resolve(subpages);

}