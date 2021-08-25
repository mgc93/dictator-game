/** to do list */

// test version

// (done) generate exchange rates for each trial - block interval and trial exchange rate
// response screen plugin - 
    // (done) add css files (delete style from plugin)
    // (done) add specific info for trial in the plugin
    // (done) add how much the other person gets on top for 10 value labels depending on the exchange (100-er*GIVE)
    // (done) finish up stimulus display for the trial - trial exchange rate
    // change self-trial-value reference pick random within exchange rate?
// (done) add block overview before each part (7)
// survey - empirical beliefs
    // (done) change survery-likert to have sliders instead of radio button
    // (done) change how answers are recorded from the sliders
    // (done) finish up question prompts, label etc.
    // (done) change where question prompt is displayed? - left of the slider?
    // add beginning and end labels to the sliders?
    // (done) add 7 parts for each block
    // tie sliders
    // (done) add prompt about exchange rate for the survey
// (done) survey - normative beliefs
    // (done) add prompt about exchange rate for the survey
    // add beginning and end labels to the sliders?
// (done) instructions
// (done) control quizes
// (done) payment 
// (done) get rid of eyetracking leftover code
// (done) add payment address, name etc. code
// (done) payment variable in the code if failed any part
// (done) add payment data to json file to make it easier to do the payment
// (done) turn tokens to dollars
// (done) update numbers in block overview
// (done) discuss the exchange rate 
// fix typos
// check data in browser is correct
// (done) randomize block order for each subject
// (done) change overview screen
// (done) change index consent form for no-eyetracking study
// add bonus from give rate of another participant?
// (done) change info displayed about exchange rate
// (done) change room to block
// (done) change control questionnaire
// (done) change and add new instructions
// (done) change endowment to 100 always
// (done) take out normative and empirical belief surveys



// design for games
function getRandomNumber(min, max) {
    var randNumber = Math.random() * (max - min) + min;
    return parseFloat(randNumber.toFixed(2));
}

// generate exchange rates
    // 7 blocks of trials - 20 trials per block
    // mean exchange rates: self-other (1, 0.5, 2, 0.33, 3, 0.25, 4)
    // interval exchange rate +/- 0.2

function TrialDetails(block,trial,vs_block,vo_block,er_block,vs_trial,vo_trial,er_trial,er_block_bottom,er_block_top,self_labels_trial,other_labels_trial) {
    this.block = block;
    this.trial = trial;
    this.vs_block = vs_block;
    this.vo_block = vo_block;
    this.er_block = er_block;
    this.er_block_bottom = er_block_bottom;
    this.er_block_top = er_block_top;
    this.vs_trial = vs_trial;
    this.vo_trial = vo_trial;
    this.er_trial = er_trial;
    this.self_labels_trial = self_labels_trial;
    this.other_labels_trial = other_labels_trial;
}

// randomize blocks exchange rates
function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }
var IndexBlock = range(0, 6); 
var randIndexBlock = jsPsych.randomization.shuffle(IndexBlock);


generateExchangeRates = function(randIndexBlock){
    var vs_block_original = [1, 1, 2, 1, 3, 1, 4];
    var vo_block_original = [1, 2, 1, 3, 1, 4, 1];
    var er_block_original = [1, 2, 0.5, 3, 0.33, 4, 0.25];
    var er_block_bottom_original = [0.8, 1.8, 0.3, 2.8, 0.13, 3.8, 0.05];
    var er_block_top_original = [1.2, 2.2, 0.7, 3.2, 0.53, 4.2, 0.45];
    var er_block_trial_exchange_rate = [
        [1, 0.86, 0.96, 0.99, 1.03, 1.15, 0.85, 0.81, 1.17, 0.80, 1.09, 1.18, 1.12, 1.16, 1.20, 1.04, 1.10, 0.98, 1.14, 0.84],
        [2, 2.19, 2.12, 1.92, 1.89, 1.85, 2.17, 1.90, 2.10, 1.82, 2.13, 1.83, 2.14, 1.93, 2.15, 2.18, 2.20, 1.95, 1.80, 2.04],
        [0.5, 0.67, 0.53, 0.65, 0.30, 0.39, 0.44, 0.51, 0.35, 0.42, 0.54, 0.31, 0.70, 0.66, 0.41, 0.70, 0.64, 0.56, 0.32, 0.60],
        [3, 2.90, 3.15, 3.04, 2.82, 3.05, 3.03, 2.83, 3.01, 2.84, 3.08, 2.93, 2.86, 3.10, 2.80, 2.88, 3.20, 2.87, 3.18, 2.81],
        [0.33, 0.43, 0.48, 0.50, 0.20, 0.47, 0.29, 0.51, 0.36, 0.18, 0.15, 0.45, 0.52, 0.23, 0.21, 0.49, 0.44, 0.32, 0.13, 0.53],
        [4, 3.82, 3.84, 4.18, 4.02, 3.88, 3.96, 3.93, 4.05, 3.87, 3.93, 3.80, 4.09, 3.89, 3.81, 4.20, 4.16, 4.01, 3.85, 3.96],
        [0.25, 0.28, 0.44, 0.24, 0.20, 0.27, 0.08, 0.23, 0.15, 0.43, 0.06, 0.29, 0.41, 0.09, 0.05, 0.37, 0.30, 0.45, 0.07, 0.25]
    ];
    var vs_block = [];
    var vo_block = [];
    var er_block = [];
    var er_block_top = [];
    var er_block_bottom = [];
    var er_block_exchange_rate = [];
    // randomize order or blocks
    for (var i = 0; i < randIndexBlock.length; i++){
        vs_block.push(vs_block_original[randIndexBlock[i]]);
        vo_block.push(vo_block_original[randIndexBlock[i]]);
        er_block.push(er_block_original[randIndexBlock[i]]);
        er_block_bottom.push(er_block_bottom_original[randIndexBlock[i]]);
        er_block_top.push(er_block_top_original[randIndexBlock[i]]);
        er_block_exchange_rate.push(er_block_trial_exchange_rate[randIndexBlock[i]]);
    }

    var labels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    var nBlocks = er_block.length;
    var nTrialsBlock = 20;
    var ExpDesign = [];
    var k = 0;
    for(var block = 0; block < nBlocks; block++){
        for(var trial = 0; trial < nTrialsBlock; trial++){
            var TrialDesign = new TrialDetails();
            // add the exact exchange rate for the first trial
            // var er_trial = getRandomNumber(er_block_bottom[block],er_block_top[block]);
            var er_trial = er_block_exchange_rate[block][trial];
            var vs_trial = vs_block[block];
            var vo_trial = er_trial/vs_trial;
            var self_labels_trial = [];
            var other_labels_trial = [];
            for(var l = 0; l < labels.length; l++) {
                self_labels_trial[l] =  labels[l]; //labels[l]*vs_trial; 
                self_labels_trial[l] = parseFloat(self_labels_trial[l].toFixed(0));
                other_labels_trial[l] = labels[l]*er_trial; //labels[l]*vo_trial;
                other_labels_trial[l] = parseFloat(other_labels_trial[l].toFixed(0));
            }
            TrialDesign.block = block;
            TrialDesign.trial = k;
            TrialDesign.vs_block = vs_block[block];
            TrialDesign.vo_block = vo_block[block];
            TrialDesign.er_block = er_block[block];
            TrialDesign.er_block_bottom = er_block_bottom[block];
            TrialDesign.er_block_top = er_block_top[block];
            TrialDesign.vs_trial = vs_trial;
            TrialDesign.vo_trial = vo_trial;
            TrialDesign.er_trial = er_trial;
            TrialDesign.self_labels_trial = self_labels_trial;
            TrialDesign.other_labels_trial = other_labels_trial
            ExpDesign.push(TrialDesign);
            k++;
        }
    }
    return ExpDesign;
}

// generate exchange rates for the whole experiment
var ExpDesign = generateExchangeRates(randIndexBlock);








// payment for failing
var payFailQuiz1 = '75c';
var payFailQuiz2 = '300c';

/**************/
/** Constants */
/**************/
var nImageInst = 2;

// subject random id
var subject_id = jsPsych.randomization.randomID(7);

/** load instructions images */
var instructions_images = [];
for (var i = 1; i < 10; i++) {
    instructions_images.push('img/instructions/Slide' + i + '.png');
}

/** control questions images */
var control_images = [];
for (var i = 1; i < 2; i++){
    control_images.push('img/control/control_img_' + i + '.png');
}

/** load all the images, and remember to preload before starting the experiment */
var instruct_img = [];
for (var i = 0; i < nImageInst; i++) {
    instruct_img.push('img/instruct' + i + '.png');
}





// subject status and survey code
function makeSurveyCode(status) {
    uploadSubjectStatus(status);
    var prefix = { 'success': 'cg', 'failed': 'sb' }[status]
    return `${prefix}${subject_id}`;
}

function uploadSubjectStatus(status) {
    $.ajax({
        type: "POST",
        url: "/subject-status",
        data: JSON.stringify({ subject_id, status }),
        contentType: "application/json"
    });
}


/***********************/
/******** Experiment ***/
/***********************/

var paymentInfo = {
    type: 'html-keyboard-response',
    stimulus: `<div> In order to receive payment for this study, you will need to provide Venmo/Paypal or Zelle information. <br/>
                <br><br/>
                When you are ready, press the SPACE BAR to continue. </div>`,
    post_trial_gap: 500,
    choices: ['spacebar'],
};

var payment_options = ["Venmo",
                        "Paypal",
                        "Zelle"];

var payment_data = [];
                        
var paymentQuestion = {
    type: 'survey-multi-choice',
    questions: [
        { prompt: "How would you like to be paid?", name: 'Payment', options: payment_options, required: true }
    ],
    on_finish: function (data) {
        payment_data.push(data);
    }
}

var personalInfoQuestion = {
    type: 'survey-text',
    questions: [
        { prompt: "What is your name?", rows: 1, columns: 50, required: true },
        { prompt: "What is the account name or email address associated with your Venmo/Paypal/Zelle account? ", rows: 1, columns: 50, required: true },
    ],
    preamble: `<div>Please answer the following questions. </div>`,
};

var surveyQuestion = {
    type: 'survey-text',
    questions: [
        { prompt: "What's your age?", rows: 1, columns: 50, required: true },
        { prompt: "What's your gender?", rows: 1, columns: 50, require: true },
    ],
    preamble: `<div>Thanks for choosing our experiment! Please answer the following questions to begin today's study. </div>`,
};






/** full screen */
var fullscreenEnter = {
    type: 'fullscreen',
    message: `<div> Before we begin, please close any unnecessary programs or applications on your computer. <br/>
    This will help the study run more smoothly.    <br/>
    Also, please close any browser tabs that could produce popups or alerts that would interfere with the study.    <br/>
    Finally, once the study has started, <b>DO NOT EXIT</b> fullscreen mode or you will terminate the study and not receive any payment. <br/>   
    <br><br/>
    The study will switch to full screen mode when you press the button below.  <br/>
    When you are ready to begin, press the button.</div>`,
    fullscreen_mode: true,
    on_finish: function () {
        document.body.style.cursor = 'none'
    }
};

var experimentOverview = {
    type: 'html-keyboard-response',
    stimulus: `<div> <font size=120%; font color = 'green';>Experiment Overview </font><br/>
                                                     <br><br/>
                          Now, we will begin with the study.<br/>
                                                        <br><br/>
                          When you are ready, press the  <b>SPACE BAR</b> to continue. </div>`,
    choices: ['spacebar'],
    post_trial_gap: 500,
}


// instructions
function getImgHTML(instructions){
    var imgHTMLInstructions = [];
    var startString = [`<img class = 'img_instructions' src="`];
    var endString = [`"></img>`];
    var elements = [];
    for (var i = 0; i <= instructions.length; i++){
        elements[i] = startString.concat(instructions[i],endString);
        imgHTMLInstructions.push(elements[i].join(' '));
    }
    return imgHTMLInstructions;
}

imgHTMLInstructions = getImgHTML(instructions_images);

// display instructions choice task
var choiceInstructions = {
    type: 'instructions',
    pages: imgHTMLInstructions.slice(0,9),
    show_clickable_nav: true,
    on_finish: function () {
        document.body.style.cursor = 'pointer'
    }
}








// number of correct answers for control questions - choice task
function getAnswersChoiceQuiz(choice_quiz_data){
    var nCorrect = 0;
    var responses = choice_quiz_data[0].responses.slice(1,choice_quiz_data[0].responses.length-1).split(',');
    var correctAnswers = ["100","63","80","FALSE"];
    for(var i = 0; i < responses.length; i++){
        if(responses[i].includes(correctAnswers[i])){
            nCorrect = nCorrect + 1;
        } else {
            nCorrect = nCorrect + 0;
        }
    }
    return nCorrect;
}




function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




// quiz about the choice task
var question_choice_1_options = ["0",
                        "20",
                        "100"];
var question_choice_2_options = ["0",
                        "20",
                        "63",
                        "250"];
var question_choice_3_options = ["0",
                        "20",
                        "80",
                        "100"];
var question_choice_4_options = ["TRUE",
                        "FALSE"];

// still to finish
var passedQuiz1 = 1;
var choice_quiz_data = [];
var controlQuestionsChoice = {
    type: 'survey-multi-choice',
    questions: [
        { prompt: "Question 1: What is the maximum number of tokens that you can allocate to another anonymous participant?", name: 'Q1', options: question_choice_1_options, required: true },
        { prompt: "Question 2: Suppose you decided to give 20 of your tokens to the other participant, as shown above. How many tokens will the other participant get?", name: 'Q2', options: question_choice_2_options, required: true },
        { prompt: "Question 3: Suppose you decided to allocate 20 tokens to the other participant, as shown above. How many tokens are you left with?", name: 'Q3', options: question_choice_3_options, required: true },
        { prompt: "Question 4: You will find out the identity of the other participant at the end of the experiment.", name: 'Q4', options: question_choice_4_options, required: true }
    ],
    preamble: `<div> 
        <br><br/>
        Please answer the following questions to begin today's study. Scroll down to see all questions.</div>
        <br><br/>
        <div>Consider the following situation.</div>
    </div>
    <br><br/>
    <img class = 'img_questions' src="img/control/control_img_1.png"></img>
    <br><br/>`,
    on_finish: function (data) {
        choice_quiz_data.push(data);
        document.body.style.cursor = 'none';
        nCorrectChoice = getAnswersChoiceQuiz(choice_quiz_data);
        if(nCorrectChoice<3){
            survey_code = makeSurveyCode('failed');
            closeFullscreen();
            jsPsych.endExperiment(`We are sorry! Unfortunately, you have answered only ${nCorrectChoice} questions correctly.  </br> You will receive ${payFailQuiz1} for making it this far. Thank you for signing up!`);
            passedQuiz1 = 0;
        }
    }
};




// choice overview
var choiceOverview = {
    type: 'html-keyboard-response',
    stimulus: `<div><font size=120%; font color = 'green';>Task </font><br/>
                                        <br><br/>
            Each round, you will have to decide how to split a number of tokens between you and another anonymous participant. <br/>      
            To select how many tokens to give, click on the slider bar. <br/>
            After each choice, look at the red circle at the center of the screen.  <br/>
            <br><br/>
            When you are ready, press the  <b>SPACE BAR</b> to continue.  </div>`,
    choices: ['spacebar'],
    post_trial_gap: 500,
    on_finish: () => document.body.style.cursor = 'pointer',
}


function getRandomFixDur(min,max) {
    return Math.random() * max + min;
}

var fixation1 = {
    type: 'html-keyboard-response',
    stimulus: '<span id="calibration_dot_instruction"></span>',
    choices: jsPsych.NO_KEYS,
    trial_duration: getRandomFixDur(0.5,1.5)*1000,
    on_finish: () => document.body.style.cursor = 'pointer',
};

// The average value for the self is <b><font color='green'>${ExpDesign[choice_count].vs_block}</font></b>.<br/>
// The average value for the other is <b><font color='red'>${ExpDesign[choice_count].vo_block}</font></b>.<br/>
var choice_count = 0;
var blockOverview = {
    type: 'html-keyboard-response',
    stimulus: () => `<div><font size=110%; font color = 'green';>Block ${ExpDesign[choice_count].block + 1} </font><br/>
                                        <br><br/>
            In this block, for each token you give, the other person gets <b><font size=120%;> ${ExpDesign[choice_count].er_block}</font></b> tokens on average<br/>      
            <br><br/>
            When you are ready, press the  <b>SPACE BAR</b> to continue.  </div>`,
    choices: ['spacebar'],
    post_trial_gap: 500,
}

var if_node1 = {
    timeline: [blockOverview],
    conditional_function: function () {
        if (Math.round(choice_count % 20) == 0) {
            return true;
        } else {
            return false;
        }
    }
}


var if_node2 = {
    timeline: [fixation1],
    conditional_function: function () {
        if (Math.round(choice_count % 20) != 0) {
            return true;
        } else {
            return false;
        }
    }
}



/** choices */
// trial - dictator game
// Value for the self: <b><font color='green'>${ExpDesign[choice_count].vs_trial}</font></b><br/>
// Value for the other: <b><font color='red'>${parseFloat(ExpDesign[choice_count].vo_trial.toFixed(2))}</font></b><br/>
var choice_data = [];
var game_choice = {
    timeline: [
        // fixation1,
         if_node1,
         if_node2,
        {
            type: "html-slider-response-dg",
            stimulus: () => `<div><font size=110%; font color = 'green';>Block ${ExpDesign[choice_count].block + 1} </font><br/>
                                        <br><br/>
            Exchange rate: <b><font color='white';> ${ExpDesign[choice_count].er_trial}</font></b> <br/>      
            <br><br/>
            </div>`,
            block: () => ExpDesign[choice_count].block,
            trial_number: () => ExpDesign[choice_count].trial,
            value_self_block: () => ExpDesign[choice_count].vs_block,
            value_other_block: () => ExpDesign[choice_count].vo_block,
            exchange_rate_block: () => ExpDesign[choice_count].er_block,
            value_self_trial: () => ExpDesign[choice_count].vs_trial,
            value_other_trial: () => ExpDesign[choice_count].vo_trial,
            exchange_rate_trial: () => ExpDesign[choice_count].er_trial,
            er_interval_bottom_block: () => ExpDesign[choice_count].er_bottom_block,
            er_interval_top_block: () => ExpDesign[choice_count].er_top_block,
            labels_top: () => ExpDesign[choice_count].other_labels_trial,  // other 
            labels_bottom: () => ExpDesign[choice_count].self_labels_trial, // self
            prompt: `<p id = "prompt-question"> How much do you want to give? </p>`,
            on_finish: function (data) {
                choice_data.push(data);
                choice_count++;
            }
        }      
    ],
    loop_function: () => choice_count < ExpDesign.length, // change this to 70 after uploading
};







// /// break
// var breaktime = {
//     type: "html-keyboard-response",
//     stimulus: `<div>You are about halfway done! Now you can take a short break if you want.</br>
//                 <br></br>
//                 When you are ready to continue the study, press the <b>SPACE BAR</b>.</div>`,
//     choices: ['spacebar'],
//     post_trial_gap: 500,
// };




// // instructions empirical belief task
// var empiricalBeliefInstructions = {
//     type: 'instructions',
//     pages: imgHTMLInstructions.slice(9,17),
//     show_clickable_nav: true,
//     on_finish: function () {
//         document.body.style.cursor = 'pointer'
//     }
// }

// // number of correct answers for control questions - belief task
// function getAnswersBeliefQuiz(belief_quiz_data){
//     var nCorrect = 0;
//     var responses = belief_quiz_data[0].responses.slice(1,belief_quiz_data[0].responses.length-1).split(',');
//     var correctAnswers = ["$5","$11","FALSE"];
//     for(var i = 0; i < responses.length; i++){
//         if(responses[i].includes(correctAnswers[i])){
//             nCorrect = nCorrect + 1;
//         } else {
//             nCorrect = nCorrect + 0;
//         }
//     }
//     return nCorrect;
// }

// // quiz about the belief task
// var question_belief_1_options = ["$11",
//                         "$9",
//                         "$7",
//                         "$5"];
// var question_belief_2_options = ["$11",
//                         "$9",
//                         "$7",
//                         "$5"];
// var question_belief_3_options = ["TRUE",
//                          "FALSE"];

// // still to finish
// var passedQuiz2 = 1;
// var belief_quiz_data = [];
// var controlQuestionsBelief = {
//     type: 'survey-multi-choice',
//     questions: [
//         { prompt: "Question 1: Suppose you estimate that 40% of the participants gave between 20 and 30 tokens. What will you earn if this decision is selected for payment?", name: 'Q1', options: question_belief_1_options, required: true },
//         { prompt: "Question 2: Suppose you estimate that 23% of the participants gave between 20 and 30 tokens. What will you earn if this decision is selected for payment?", name: 'Q2', options: question_belief_2_options, required: true },
//         { prompt: "Question 3: You will receive your payment for this part of the experiment immediately.", name: 'Q3', options: question_belief_3_options, required: true }
//     ],
//     preamble: `<div> 
//         <br><br/>
//         Please answer the following questions to begin today's study. Scroll down to see all questions.</div>
//         <div>Consider the following situation.</div>
//     </div>
//     <br><br/>
//     <div>Suppose that 20% of the participants in this study gave between 20 and 30 tokens when the exchange rate for self and other tokens was 1 to 1. </div>
//     <br><br/>
//     <div>Recall that the rule used to calculate your earnings for this part of the study is the following.</div>
//     <div>
//             <div>If your estimate is within 5% of the correct answer you earn $11</div>
//             <div>If your estimate is between 5% and 10% of the correct answer you earn $9</div>
//             <div>If your estimate is between 10% and 15% of the correct answer you earn $7</div>
//             <div>Otherwise you earn $5</div>
//     </div>
//     <br><br/>`,
//     on_finish: function (data) {
//         belief_quiz_data.push(data);
//         document.body.style.cursor = 'none';
//         nCorrectBelief = getAnswersBeliefQuiz(belief_quiz_data);
//         if(nCorrectBelief<2){
//             survey_code = makeSurveyCode('failed');
//             closeFullscreen();
//             jsPsych.endExperiment(`We are sorry! Unfortunately, you have answered only ${nCorrectBelief} questions correctly.  </br> You will receive  ${payFailQuiz2} for making it this far. Your survey code is: ${survey_code}${payFailQuiz2}. Thank you for signing up!`);
//             passedQuiz2 = 0;
//         }
//     }
// };


// // empirical belief overview
// var empiricalBeliefOverview = {
//     type: 'html-keyboard-response',
//     stimulus: `<div><font size=120%; font color = 'green';>Part 2 Task </font><br/>
//                                         <br><br/>
//             Each round, you will answer questions in a survey. <br/>  
//             You can make your responses by clicking on the slider bars. <br/>
//             When you are sure of your response, you can click the <b><font color='green'>CONTINUE</font></b> button. <br/>
//             <br><br/>
//             When you are ready, press the  <b>SPACE BAR</b> to continue.  </div>`,
//     choices: ['spacebar'],
//     post_trial_gap: 500,
//     on_finish: function () {
//         document.body.style.cursor = 'pointer';
//     }
// }


// // vself x labels [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
// // vother x labels - how much the other receives 
// function getPromptLabels(){
//     // get labels for each block
//     var labels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
//     var vs_block = [1, 1, 2, 1, 3, 1, 4];
//     var vo_block = [1, 2, 1, 3, 1, 4, 1];
//     var startStringGive = [`Gave [`];
//     var startStringReceive = [`Received [`];
//     var endString = [`)`];
//     var endStringLast = [`]`];
//     var elements = [];
//     var elementsGive = [];
//     var elementsReceive = [];
//     var nBlocks = vs_block.length;
//     var promptLabels = [];
//     var promptLabelsGive = [];
//     var promptLabelsReceive = [];
//     for(var block = 0; block < nBlocks; block++){
//         promptLabels.push([]);
//         promptLabelsGive.push([]);
//         promptLabelsReceive.push([]);
//     }
//     for(var block = 0; block < nBlocks; block++){
//         // create labels for block
//         var self_labels_block = [];
//         var other_labels_block = [];
//         for(var l = 0; l < labels.length; l++) {
//             self_labels_block[l] = labels[l]*vs_block[block]; 
//             self_labels_block[l] = self_labels_block[l].toFixed(0);
//             other_labels_block[l] = labels[l]*vo_block[block];
//             other_labels_block[l] = other_labels_block[l].toFixed(0); 
//         }
//         // create prompt give labels for block
//         for(var i = 0; i <= 9; i++){
//             if(i!==9){
//                 elementsGive[i] = startStringGive.concat(self_labels_block[i],', ',self_labels_block[i+1],endString);
//             }
//             else {
//                 elementsGive[i] = startStringGive.concat(self_labels_block[i],', ',self_labels_block[i+1],endStringLast);
//             }
//             promptLabelsGive[block].push(elementsGive[i].join(''));
//         }
//         // create prompt receive labels for block
//         for(var i = 0; i <= 9; i++){
//             if(i!==9){
//                 elementsReceive[i] = startStringReceive.concat(other_labels_block[i],', ',other_labels_block[i+1],endString);
//             }
//             else {
//                 elementsReceive[i] = startStringReceive.concat(other_labels_block[i],', ',other_labels_block[i+1],endStringLast);
//             }
//             promptLabelsReceive[block].push(elementsReceive[i].join(''));
//         }
//         // concatenate give receive labels
//         for(var i = 0; i <= 9; i++){
//             elements[i] = promptLabelsGive[block][i].concat(' - ',promptLabelsReceive[block][i]);
//             promptLabels[block].push(elements[i]);
//         }
//     }

//     return promptLabels;
// }

// var promptLabels = getPromptLabels();

// // get question labels: B_x_Q_y 
// function getQuestionLabels(){
//     var nBlocks = 7;
//     var blockString = [`B`];
//     var questionString = [`Q`];
//     var questionLabels = [];
//     var elements = [];
//     for(var block = 0; block < nBlocks; block++){
//         questionLabels.push([]);
//     }
//     // create labels for questions: B_x_Q_y
//     for(var block = 0; block < nBlocks; block++){
//         for(var q = 0; q < 10; q++) {
//             elements[q] = blockString.concat((block+1).toString(),questionString,(q+1).toString());
//             questionLabels[block].push(elements[q].join(''));
//         }
//     }
//     return questionLabels;
// }

// var questionLabels = getQuestionLabels();


// not used
// var empiricalBeliefSurvey = {
//     type: 'survey-likert-slider',
//     questions: [
//       {prompt: () => promptLabels[block][0], name: () => questionLabels[block][0]},
//       {prompt: () => promptLabels[block][1], name: () => questionLabels[block][1]},
//       {prompt: () => promptLabels[block][2], name: () => questionLabels[block][2]},
//       {prompt: () => promptLabels[block][3], name: () => questionLabels[block][3]},
//       {prompt: () => promptLabels[block][4], name: () => questionLabels[block][4]},
//       {prompt: () => promptLabels[block][5], name: () => questionLabels[block][5]},
//       {prompt: () => promptLabels[block][6], name: () => questionLabels[block][6]},
//       {prompt: () => promptLabels[block][7], name: () => questionLabels[block][7]},
//       {prompt: () => promptLabels[block][8], name: () => questionLabels[block][8]},
//       {prompt: () => promptLabels[block][9], name: () => questionLabels[block][9]}
//     ],
//     randomize_question_order: false,
//     scale_width: 50,
//     preamble: `<div> 
//         <br><br/>
//         Please answer the following questions.</div>
//         <br><br/>
//     <br><br/>
//     <div>Estimate the proportion of Give rates <br></div>
//     <br><br/>
//     </div>`,
//     on_finish: function (data) {
//         empirical_belief_data.push(data);
//     }
//   };

// var vs_block = [1, 1, 2, 1, 3, 1, 4];
// var vo_block = [1, 2, 1, 3, 1, 4, 1];
// var er_block = [1, 0.5, 2, 0.33, 3, 0.25, 4];
// var promptLabelsBlock = [];
// var questionLabelsBlock = [];
// var block_emp = 0;
// var empirical_belief_data = [];
// var empirical_belief = {
//     timeline: [
//         {
//             type: 'survey-likert-slider',
//             questions: () => [
//                 {prompt: promptLabels[block_emp][0], name: questionLabels[block_emp][0]},
//                 {prompt: promptLabels[block_emp][1], name: questionLabels[block_emp][1]},
//                 {prompt: promptLabels[block_emp][2], name: questionLabels[block_emp][2]},
//                 {prompt: promptLabels[block_emp][3], name: questionLabels[block_emp][3]},
//                 {prompt: promptLabels[block_emp][4], name: questionLabels[block_emp][4]},
//                 {prompt: promptLabels[block_emp][5], name: questionLabels[block_emp][5]},
//                 {prompt: promptLabels[block_emp][6], name: questionLabels[block_emp][6]},
//                 {prompt: promptLabels[block_emp][7], name: questionLabels[block_emp][7]},
//                 {prompt: promptLabels[block_emp][8], name: questionLabels[block_emp][8]},
//                 {prompt: promptLabels[block_emp][9], name: questionLabels[block_emp][9]},
//             ],
//             randomize_question_order: false,
//             scale_width: 50,
//             preamble: () => `<div> 
//                 <br><br/>
//                 The average exchange rate for self/other was <b><font size=120%;> ${er_block[block_emp]}</font></b> <br/>      
//                 The average value for the self was <b><font color='green'>${vs_block[block_emp]}</font></b>.<br/>
//                 The average value for the other was <b><font color='red'>${vo_block[block_emp]}</font></b>.<br/>
//                 <br><br/>
//                 Please stimate the proportion of Give rates <br>
//                 <br><br/>
//                 </div>`,
//             on_finish: function (data) {
//                 empirical_belief_data.push(data);
//                 block_emp++;
//             }
//         }      
//         ],
//         loop_function: () => block_emp < 7, 
// };

// // instructions normative belief task
// var normativeBeliefInstructions = {
//     type: 'instructions',
//     pages: imgHTMLInstructions.slice(17,25),
//     show_clickable_nav: true,
//     on_finish: function () {
//         document.body.style.cursor = 'pointer'
//     }
// }

// // normative belief overview
// var normativeBeliefOverview = {
//     type: 'html-keyboard-response',
//     stimulus: `<div><font size=120%; font color = 'green';>Part 3 Task </font><br/>
//     <br><br/>
//     Each round, you will answer questions in a survey. <br/>  
//     You can make your responses by clicking on the slider bars. <br/>
//     When you are sure of your response, you can click the <b><font color='green'>CONTINUE</font></b> button. <br/>
//     <br><br/>
//     When you are ready, press the  <b>SPACE BAR</b> to continue.  </div>`,
//     choices: ['spacebar'],
//     post_trial_gap: 500,
//     on_finish: function () {
//         document.body.style.cursor = 'pointer';
//     }
// }


// var block_norm = 0;
// var normative_belief_data = [];
// var normative_belief = {
//     timeline: [
//         {
//             type: 'survey-likert-slider',
//             questions: () => [
//                 {prompt: promptLabels[block_norm][0], name: questionLabels[block_norm][0]},
//                 {prompt: promptLabels[block_norm][1], name: questionLabels[block_norm][1]},
//                 {prompt: promptLabels[block_norm][2], name: questionLabels[block_norm][2]},
//                 {prompt: promptLabels[block_norm][3], name: questionLabels[block_norm][3]},
//                 {prompt: promptLabels[block_norm][4], name: questionLabels[block_norm][4]},
//                 {prompt: promptLabels[block_norm][5], name: questionLabels[block_norm][5]},
//                 {prompt: promptLabels[block_norm][6], name: questionLabels[block_norm][6]},
//                 {prompt: promptLabels[block_norm][7], name: questionLabels[block_norm][7]},
//                 {prompt: promptLabels[block_norm][8], name: questionLabels[block_norm][8]},
//                 {prompt: promptLabels[block_norm][9], name: questionLabels[block_norm][9]},
//             ],
//             randomize_question_order: false,
//             scale_width: 50,
//             preamble: () => `<div> 
//                 <br><br/>
//                 The average exchange rate for self/other was <b><font size=120%;> ${er_block[block_norm]}</font></b> <br/>      
//                 The average value for the self was <b><font color='green'>${vs_block[block_norm]}</font></b>.<br/>
//                 The average value for the other was <b><font color='red'>${vo_block[block_norm]}</font></b>.<br/>
//                 <br><br/>
//                 Please stimate the appropriateness of each Give rate <br>
//                 <br><br/>
//                 </div>`,
//             on_finish: function (data) {
//                 normative_belief_data.push(data);
//                 block_norm++;
//             }
//         }      
//         ],
//         loop_function: () => block_norm < 7, 
// };

// var select_trial = {
//   type: "",
//   charity: [],
//   donation: 5
// }
// var randomselector = function () {
//     var trials = jsPsych.data.get().filterCustom(function (trial) {
//         return trial.rating > 0 || (trial.trial_type == "binary-choice" && trial.realtrial)
//     })
//     selectedtrialindex = getRandomInt(0, trials.count() - 1);
//     selectedtrial = JSON.parse(trials.json())[selectedtrialindex];

//     select_trial.type = selectedtrial.trial_type;
//     //console.log(JSON.parse(trials.json())[selectedtrialindex]);

//     if (select_trial.type === "image-slider-response") {
//         select_trial.type = "Willingness to Donate"
//         select_trial.donation = selectedtrial.rating;
//         select_trial.charity = selectedtrial.stimulus;
//     } else {
//         select_trial.type = "Donating Preference"
//         select_trial.donation = 5;
//         if (selectedtrial.key_press == 70) {
//             select_trial.charity = selectedtrial.stimulus[0];
//         } else {
//             select_trial.charity = selectedtrial.stimulus[1];
//         }
//     }
//     html = ` <div> One trial from the <b><font color='red'>${select_trial.type}</font></b> task has been selected for donation! </br>
//     The charity you donate to is: </br>
//     <br></br>
//     <img height="300px" width="500px" src="${select_trial.charity}"/> </br>
//      <br></br>
//      We will donate  <b><font color='red'>$${select_trial.donation}</font></b> to this charity on your behalf.</br>
//      <br></br>
//      Thank you for participating! The webcam will turn off when you close the browser tab.</br>
//      Your quiz score is ${(quiz_correct_count / 5) * 100}, we will add ${quiz_correct_count * 10} cents to your final payment.</br>
//      Your survey code is: ${makeSurveyCode('success')}
//      </div>`;
//     return html
// }

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFinalPay(choice_data){
    // get random trial for payment
    var nTrials = choice_data.length;
    var randTrial = getRandomInt(0,nTrials);
    var givenTrial = choice_data[randTrial].response;
    var exchange_rate_trial = choice_data[randTrial].exchange_rate_trial;
    var payOtherTrial = givenTrial*exchange_rate_trial;
    var paySelfTrial = (100-givenTrial);
    return [parseFloat(paySelfTrial.toFixed(0)),parseFloat(payOtherTrial.toFixed(0)),exchange_rate_trial];
}

var finalPay = [0, 0, 0];
var successExp = false;
var success_guard = {
    type: 'call-function',
    func: () => { 
        successExp = true; 
        finalPay = getFinalPay(choice_data);
    }
}




/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
    }
}


var on_finish_callback = function () {
    // jsPsych.data.displayData();
    jsPsych.data.addProperties({
        browser_name: bowser.name,
        browser_type: bowser.version,
        subject: subject_id,
        subject: subject_id,
        interaction: jsPsych.data.getInteractionData().json(),
        pass_quiz_1: passedQuiz1,
        // pass_quiz_2: passedQuiz2,
        payment_self: finalPay[0],
        payment_other: finalPay[1],
        payment_trial: finalPay[2],
        windowWidth: screen.width,
        windowHight: screen.height
    });
    var data = JSON.stringify(jsPsych.data.get().values());
    $.ajax({
        type: "POST",
        url: "/data",
        data: data,
        contentType: "application/json"
    })
        .done(function () {
            // alert("your data has been saved!")
        })
        .fail(function () {
            // alert("problem occured while writing data to box.");
            // var csv = jsPsych.data.get().csv();
            // var filename = "coordination-game-test.csv";
            // downloadCSV(csv, filename);
        })
}

var trialcounter;



//Your survey code is: ${makeSurveyCode('success')}${finalPay[0]}. </br>
function startExperiment() {
    jsPsych.init({
        timeline: [
            paymentInfo,
            paymentQuestion,
            personalInfoQuestion,
            surveyQuestion,
            fullscreenEnter,
            choiceInstructions,
            controlQuestionsChoice,
            experimentOverview,
            choiceOverview,
            game_choice,
            // breaktime,
            // empiricalBeliefInstructions,
            // controlQuestionsBelief,
            // empiricalBeliefOverview,
            // empirical_belief,
            // normativeBeliefInstructions,
            // normativeBeliefOverview,
            // normative_belief,
            success_guard
        ],
        on_trial_finish: function () {
            trialcounter = jsPsych.data.get().count();
            if (successExp) {
                closeFullscreen()
                document.body.style.cursor = 'pointer'
                jsPsych.endExperiment(`<div>
                Thank you for your participation! You can close the browser to end the experiment now. </br>
                We selected one random trial for payment. </br>
                The selected trial had an exchange rate of ${finalPay[2]}. </br>
                You chose to give ${finalPay[1]} tokens to another participant and kept ${finalPay[0]} tokens. </br>
                Your earnings are ${parseFloat(finalPay[0]*0.05).toFixed(2)} dollars. </br> 
                You gave ${parseFloat(finalPay[1]*0.05).toFixed(2)} dollars to another participant. </br> 
                <br></br>
                We will send you ${parseFloat(finalPay[0]*0.05).toFixed(2)} dollars soon! </br> 
                We will send you the additional payment from another person's decision within the next 2 weeks. </br>
                </div>`);
            }
            if (trialcounter == 30) { 
                on_finish_callback();
                jsPsych.data.reset();
            }
        },
        preload_images: [instructions_images, control_images, instruct_img],
        on_finish: () => on_finish_callback(),
        on_close: () => on_finish_callback()

    });
};

function saveData() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'write_data.php'); // change 'write_data.php' to point to php script.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            //   console.log(response.success);
        }
    };
    xhr.send(jsPsych.data.get().json());
}