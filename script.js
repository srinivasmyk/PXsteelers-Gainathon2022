const notionAPIKey= document.querySelector("#APIKey");
const PXAPIKey ="6234ac6d-ed3b-41c9-9343-88eb319b0e30";
const surveyTypeSelected = document.querySelector("#surveys");
const getRes=document.querySelector(".getSurveyRes");
// document.querySelector("");
// document.querySelector("");

const notionDatabaseId="f382751e5d924bb8b9df60f0ca772607";





const sendHTTPRequest= (method,url,data)=>{
    const promise= new Promise((resolve,reject) => {
        const xhr= new XMLHttpRequest();
        xhr.open(method,url);
        xhr.responseType='json';
    xhr.setRequestHeader('X-APTRINSIC-API-KEY',PXAPIKey);
    xhr.setRequestHeader('Connection','keep-alive');
    xhr.setRequestHeader('Accept','*/*');
    xhr.setRequestHeader('Accept-Encoding','gzip, deflate, br');
        xhr.onload= () =>{
            resolve(xhr.response);
        }
        xhr.send();
    });
    return promise;
}

const notionSendHTTPRequest= (method,url,data)=>{
    const promise= new Promise((resolve,reject) => {
        const xhr= new XMLHttpRequest();
        xhr.open(method,url);
        xhr.responseType='json';
        
    xhr.setRequestHeader('Authorization',notionAPIKey);
    xhr.setRequestHeader('Connection','keep-alive');
    xhr.setRequestHeader('Accept','*/*');
    xhr.setRequestHeader('Notion-Version','2022-02-22');
    xhr.setRequestHeader('Access-Control-Allow-Origin','*');
    xhr.setRequestHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
    xhr.setRequestHeader('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token');



    xhr.setRequestHeader('Accept-Encoding','gzip, deflate, br');
        xhr.onload= () =>{
            resolve(xhr.response);
        }
        xhr.send([{
            "parent": {
                "database_id": "f382751e5d924bb8b9df60f0ca772607"
            },
            "properties": {
                "Type": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": survey.results[0].score
                               
                            }
                        }]
                }
            }
        }]);
    });
    return promise;
}

/////////////
const getSurveyResponses= ()=>{
    sendHTTPRequest('GET','https://api.aptrinsic.com/v1/survey/responses?filter=contentType==IN_APP_SURVEY_NPS').then(responseData =>{
       
         survey=responseData;  
       // console.log(survey.results);
       createPage(survey);

    })
   
}

getRes.addEventListener('click',getSurveyResponses);

//console.log(getSurveyResponses());

const createPage=(survey)=>{
    notionSendHTTPRequest('POST','https://api.notion.com/v1/pages/',survey);
}