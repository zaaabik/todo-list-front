export function getAlltodo() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:1113/todo", false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText)
}