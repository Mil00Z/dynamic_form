// Functions
    // create Form Data
     function Input (type,name,label,id,truc){

        this.type = type;
        this.name = name;
        this.label = label;
        this.id = id;
     }
// Create Storage Container to display data
let Forms = localStorage;

// CREATE FORM Step By Step
var i = 1;
if (window.location.href.includes('index')){

// ADD QUESTIONS
let mainForm = document.getElementById('main-form');

document.querySelector('#add').addEventListener('click',function(e){

     let getNode = document.querySelector('.question-block');
     let newNode = getNode.cloneNode(true);

    // Count & Itération
    i ++ ;
    newNode.querySelector('.question-type--label').textContent = "#" + i ;
    newNode.querySelector('.question-query').setAttribute('id', 'q' + i);
    newNode.querySelector('.question-query').value = "";

     mainForm.insertBefore(newNode,document.querySelector('.actions'));

     console.log('question added ') ;

  });

  mainForm.addEventListener('submit',function(e){
    e.preventDefault();


    // Target FORM
    this.classList.add('selected');

    let questionQuery = mainForm.querySelectorAll('.question-query');
    let responseType = mainForm.querySelectorAll('.response-type');

    let survey = {
      questions : []
    };

    for (var makeInput of questionQuery  ) {
      let newQuestion = makeInput.value;
      let newItem = {
        title : newQuestion,
      }
      survey.questions.push(newItem);
      // console.log(survey);
    }


    // alert('Nombre de questions :  ' + responseType.length);
    for (i=0; i<responseType.length;i++){

      // value of inputType Selected
      let newInput = responseType[i].value;

      // Format date to target form by data
      let theDate = new Date();
     theDate = theDate.getFullYear().toString() + '-' + theDate.getMonth().toString().padStart(2,0) + '-' + theDate.getDay().toString().padStart(2,0);
      // console.log(newQuestion);

      //Target the form by ID
      let formId = document.querySelector('form.selected').getAttribute('id');

      // Update Data in Survey Object
      survey.questions[i].inputType = newInput;
      survey.questions[i].dataId = formId;
      survey.questions[i].dataNumber = i ;
      survey.questions[i].dateSurvey = theDate;

      Forms.setItem(document.querySelector('#form-name').value, JSON.stringify(survey.questions[i]));
      console.log(Forms)

    }
    alert(JSON.stringify(survey));
    window.location = 'AForm.html';
  });
}
//Récupérer les DATA formulaires
// Condition si theForm pas existant
if(document.getElementById('the-form') !== null){
  //Récupération statique car obligation de passer le nom du formulaire en paramètre... à voir pour une amélioration future
  var getLocalObject = JSON.parse(Forms.getItem('benji'));
  console.log(getLocalObject);


  var theForm= document.getElementById('the-form');
  let inputs = theForm.querySelectorAll('input');

  // Add name of Form
  theForm.querySelector('.form-title').textContent = localStorage.key(0);
  theForm.querySelector('.form-title').dataset.name = localStorage.key(0) ;

  // get All of Input
   for (var input of inputs){

     let labelOfInput = input.previousSibling;
     labelOfInput.textContent = getLocalObject.title;
     input.type = getLocalObject.inputType;


        // Input Object
            let dataInput = {
                'inputType': input.type,
                'inputlabel': labelOfInput.value,
                'inputValue': input.value,
                'inputName':input.name,
                'inputId':input.getAttribute('id') ?  input.getAttribute('id') : ''
      }
      // end for
      console.log(dataInput);
  }

  theForm.addEventListener('submit',function(e){

    e.preventDefault();
    e.stopPropagation();

    // get All of Input
     for (var input of inputs){

       let labelOfInput = input.previousSibling;
       labelOfInput.textContent = survey.questions.title;


          // Input Object
              let dataInput = {
                  'inputType': input.type,
                  'inputlabel': labelOfInput.value,
                  'inputValue': input.value,
                  'inputName':input.name,
                  'inputId':input.getAttribute('id') ?  input.getAttribute('id') : ''
        }
        // end for
        console.log(dataInput);
    }
  })

  // Form Object
  let dataForm = {
        'id': theForm.getAttribute('id'),
         'formName' : theForm.dataset.name,
         'inputLength':inputs.length,
         'date':new Date()
  }
  console.log(dataForm);
 
} else {
  console.log('élèment inexistant dans le DOM');
}

//Refresh DATA
document.getElementById('clearData').addEventListener('click',function(e){
    if(this.dataset.value == 'off') {
      localStorage.clear();
      this.dataset.value = 'on' ;
      alert('Data Locales effacées !');
    } else {
      console.log('données déjà cleared');
    }

});
