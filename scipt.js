const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');
 
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);

});

const getWordInfo = async(word)=>{
    try {
         resultDiv.innerHTML = "Fetching Data...";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        //alert("Word:" + word);

        let definitions = data[0].meanings[0].definitions[0];

        resultDiv.innerHTML = `
        <h2><strong>Word:</strong>${data[0].word}</h2>
        <p class="PartsOfSpeech">${data[0].meanings[0].partsOfSpeech}</p>
        <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not found" : definitions.definition }</p>
        <p><strong>Example:</strong>${definitions.definition === undefined ? "Not found" : definitions.example}</p>
        <p><strong>Antonyms:</strong>
        `;

        //Fetching Antonyms
        if(definitions.antonyms.length ===0){
            resultDiv.innerHTML += `<span>Not Found</span>`;
        }
        else{

            for(let i=0;i<definitions.antonyms.length;i++){
            resultDiv.innerHTML += `<li>${definitions.antonyms[i]}`
            }
        }
    
        //Adding Read More Button
        resultDiv.innerHTML +=`<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`
    }
    catch (error) {
        resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>`;
    
    }
    
}

// Task to do- Fetch Synonyms as we have done for antonyms