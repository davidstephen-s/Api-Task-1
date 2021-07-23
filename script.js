let page = 
`<div class="container">
<div class="row">
  <div class="col-lg-5 col-md-4 col-sm-12 pb-4">
    <div class="text pt-4">
      <h3>Try It</h3>
      <p>Enter a word to lookup and learn with examples and images for all possible</p>
    </div>
    <div class="getInput pt-4">
      <form>
        <div class="form-group">
          <label>Enter a Word</label>
          <input type="text" pattern="[a-zA-Z]+" class="form-control" id="word" placeholder="Alphabets only" title="Enter only alphabets" />
          <div class="invalid-feedback">word is required</div>
        </div>
        <button class="btn btn-success btn-block" id="mybutton">Go &nbsp;<i class="fa fa-arrow-right" aria-hidden="true"></i></button>
      </form>
    </div>
  </div>
  <div class="col-lg-7 col-md-8 col-sm-12 py-5" id="mycolumn">
    
  </div>
</div>
</div>`;
document.getElementsByClassName('mygrid')[0].innerHTML = page;
//to create DOM elements
function createMyElement(elem, elemClass = "", elemId = "") {
  let element = document.createElement(elem);
  element.setAttribute("class", elemClass);
  element.setAttribute("id", elemId);
  return element;
}
let printDefinitions = (count,outputDiv,data) =>{
  for(i=0;i<count;i++){
    let defdiv = createMyElement('div','word_def py-3');
    outputDiv.append(defdiv);                    /* to add scroll bar */
    outputDiv.classList.add('overflow');   
    let p1 = createMyElement('p',"mypara pb-2");
    p1.innerHTML = `<p class="font-weight-bold text-dark">Definition </p>${data.definitions[i]['definition']}`;
    
    let p2 = createMyElement('p',"mypara pb-2");
    p2.innerHTML = `<p class="font-weight-bold text-dark">Parts of Speech</p>${data.definitions[i]['type']}`;
    defdiv.append(p1,p2);

    if(data.definitions[i]['example']!== null){
      let p3 = createMyElement('p',"mypara pb-2");
      p3.innerHTML = `<p class="font-weight-bold text-dark">Examples </p>${data.definitions[i]['example']}`;
      defdiv.append(p3);
    }
    
  }
}
let displayOutput = (data) =>{
  let mycol = document.getElementById('mycolumn');
  let mydiv = createMyElement('div',"",'result_division');
  mycol.appendChild(mydiv);
  let outputDiv = document.getElementById('result_division');
                         
  document.querySelector('#result_division').innerHTML = "";
  let entered_word = createMyElement('h2','font-weight-bold text-center outputFont pb-2');
  entered_word.innerText = data.word.toUpperCase();
  outputDiv.append(entered_word);
  //Add image if exists 
  if(data.definitions[0].image_url !== null){
    let addImg = createMyElement('img','rounded-circle');
    addImg.setAttribute('src',data.definitions[0].image_url);
    outputDiv.appendChild(addImg);
    console.log(outputDiv);
  }
  printDefinitions(data.definitions.length,outputDiv,data);
}
// Event listener for button
document.getElementById('mybutton').addEventListener('click',function(e){
  e.preventDefault();
  let word = document.getElementById('word').value;
    document.getElementById('word').classList.remove('is-invalid');
    let fetchData = async (word) =>{
      try{
        let resp = await fetch(`https://owlbot.info/api/v4/dictionary/${word}`,{
        method: "GET",
        headers : {
            Authorization: "Token a431e94a89be5bb1672849ed3ae9478ea4fe1ed4"
        }});
        let data = await resp.json();
        console.log(data);
        if(data){
          displayOutput(data);
        }
        
      }
      catch(err){
        console.log(err);
        console.log("word "+ typeof word);
        if(word === ""){
          document.getElementById('word').classList.add('is-invalid');
        }
        else if(!word.match(/^[A-Za-z]+$/)){
          alert("Enter only Alphabets");
        }
        else{
          alert("Make sure to give proper input with right spelling");
        }
      }
    }
    fetchData(word);
  
})