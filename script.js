const selectTag=document.querySelectorAll('select')
const fromText = document.querySelector('.from-text')
const toText = document.querySelector('.to-text')
translateBtn = document.querySelector('button')
swapBtn = document.querySelector('.swap')
iconBtn = document.querySelectorAll('.row i')




selectTag.forEach((tag,id)=>
    {
        for(const country_code in countries)
        {
            //default value
            let selected
            if( id==0 && country_code == "en-GB")
            {
                selected="selected"
            }
            else if(id == 1 && country_code == "vi-VN")
            {
                selected="selected"
            }
            let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
            tag.insertAdjacentHTML("beforeend",option) //insert country inside listItem
        }
    })


//translate Button
translateBtn.addEventListener("click", ()=>
{
    //get text field value
    let text = fromText.value

    //get select value
    translateFrom = selectTag[0].value
    translateTo = selectTag[1].value

    //waiting
    if(!text) return toText.value= "Translating..."

    let apiURL=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`

    //fetch
    fetch(apiURL)
      .then(function(response)
      {
        return response.json()
        //JSON.parse : JSON > Javascript
      })
      .then(function(data)
      {
        console.log(data)
        toText.value = data.responseData.translatedText
      })
})

//swap Button
swapBtn.addEventListener("click", ()=>
{
    let tempText =fromText.value //hoán vị
    tempLang= selectTag[0].value
    fromText.value=toText.value
    selectTag[0].value=selectTag[1].value
    toText.value = tempText
    selectTag[1].value=tempLang
    
})

iconBtn.forEach(icon=>{
    icon.addEventListener("click",({target})=>
    {
        if(target.classList.contains("fa-copy"))
        {
            if(target.id == "from")
            {
                console.log('from copy clicked')
                navigator.clipboard.writeText(fromText.value)
            }
            else
            {
                console.log('to copy clicked')
                navigator.clipboard.writeText(toText.value)

            }
        }
        else
        {
            let speech
            if(target.id == "from")
            {
                speech= new SpeechSynthesisUtterance(fromText.value) //lấy giá trị để đọc
                speech.lang =selectTag[0].value
            }
            else
            {
                speech= new SpeechSynthesisUtterance(toText.value)
                speech.lang =selectTag[1].value
            }
            speechSynthesis.speak(speech) //đọc
        }
    })
})
