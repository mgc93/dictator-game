/**
 * jspsych-survey-likert
 * a jspsych plugin for measuring items on a likert scale
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins['survey-likert-slider-tied-simple'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-likert-slider-tied-simple',
    description: '',
    parameters: {
      questions: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        array: true,
        pretty_name: 'Questions',
        nested: {
          prompt: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Prompt',
            default: undefined,
            description: 'Questions that are associated with the slider.'
          },
          // labels: {
          //   type: jsPsych.plugins.parameterType.STRING,
          //   array: true,
          //   pretty_name: 'Labels',
          //   default: undefined,
          //   description: 'Labels to display for individual question.'
          // },
          required: {
            type: jsPsych.plugins.parameterType.BOOL,
            pretty_name: 'Required',
            default: false,
            description: 'Makes answering the question required.'
          },
          name: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Question Name',
            default: '',
            description: 'Controls the name of data values associated with this question'
          },
          // slider
          // min: {
          //   type: jsPsych.plugins.parameterType.INT,
          //   pretty_name: 'Min slider',
          //   default: 0,
          //   description: 'Sets the minimum value of the slider.'
          // },
          // max: {
          //   type: jsPsych.plugins.parameterType.INT,
          //   pretty_name: 'Max slider',
          //   default: 100,
          //   description: 'Sets the maximum value of the slider',
          // },
          // slider_start: {
          //   type: jsPsych.plugins.parameterType.INT,
          //   pretty_name: 'Slider starting value',
          //   default: 10,
          //   description: 'Sets the starting value of the slider',
          // },
          // step: {
          //   type: jsPsych.plugins.parameterType.INT,
          //   pretty_name: 'Step',
          //   default: 1,
          //   description: 'Sets the step of the slider'
          // }
          // labels_top: {
          //   type: jsPsych.plugins.parameterType.HTML_STRING,
          //   pretty_name:'Labels Top',
          //   default: [],
          //   array: true,
          //   description: 'Labels of the slider top.',
          // },
          // labels_bottom: {
          //   type: jsPsych.plugins.parameterType.HTML_STRING,
          //   pretty_name:'Labels Bottom',
          //   default: [],
          //   array: true,
          //   description: 'Labels of the slider bottom.',
          // }
        }
      },
      randomize_question_order: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Randomize Question Order',
        default: false,
        description: 'If true, the order of the questions will be randomized'
      },
      preamble: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Preamble',
        default: null,
        description: 'String to display at top of the page.'
      },
      scale_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Scale width',
        default: null,
        description: 'Width of the likert scales in pixels.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'Label of the button.'
      },
      autocomplete: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Allow autocomplete',
        default: false,
        description: "Setting this to true will enable browser auto-complete or auto-fill for the form."
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    if(trial.scale_width !== null){
      var w = trial.scale_width + 'vw';
    } else {
      var w = '100%';
    }

    var html = "";
    // inject CSS for trial - see CSS file instead: survey-likert-slider
    // html += '<style id="jspsych-survey-likert-css">';
    // html += ".jspsych-survey-likert-statement { display:block; font-size: 16px; padding-top: 40px; margin-bottom:10px; }"+
    //   ".jspsych-survey-likert-opts { list-style:none; width:"+w+"; margin:auto; padding:0 0 35px; display:block; font-size: 14px; line-height:1.1em; }"+
    //   ".jspsych-survey-likert-opt-label { line-height: 1.1em; color: #444; }"+
    //   ".jspsych-survey-likert-opts:before { content: ''; position:relative; top:11px; /*left:9.5%;*/ display:block; background-color:#efefef; height:4px; width:100%; }"+
    //   ".jspsych-survey-likert-opts:last-of-type { border-bottom: 0; }"+
    //   ".jspsych-survey-likert-opts li { display:inline-block; /*width:19%;*/ text-align:center; vertical-align: top; }"+
    //   ".jspsych-survey-likert-opts li input[type=radio] { display:block; position:relative; top:0; left:50%; margin-left:-6px; }"
    // html += '</style>';

    // show preamble text
    if(trial.preamble !== null){
      html += '<div id="jspsych-survey-likert-preamble" class="jspsych-survey-likert-preamble">'+trial.preamble+'</div>';
    }

    if ( trial.autocomplete ) {
      html += '<form id="jspsych-survey-likert-form">';
    } else {
      html += '<form id="jspsych-survey-likert-form" autocomplete="off">';
    }

    // add likert scale questions ///
    // generate question order. this is randomized here as opposed to randomizing the order of trial.questions
    // so that the data are always associated with the same question regardless of order
    var question_order = [];
    for(var i=0; i<trial.questions.length; i++){
      question_order.push(i);
    }
    if(trial.randomize_question_order){
      question_order = jsPsych.randomization.shuffle(question_order);
    }


    html += '<div id="outer_container">';
    html += '<div id="container"></div>';
    html += '<span class="multislider">';
    
    for (var i = 0; i < trial.questions.length; i++) {
      var question = trial.questions[question_order[i]];


      // add question
      //html += '<label class="jspsych-survey-likert-statement">' + question.prompt + '</label>';


      // add options

      // var width = 100 / question.labels.length;

      // options - buttons
      // var options_string = '<ul class="jspsych-survey-likert-opts" data-name="'+question.name+'" data-radio-group="Q' + question_order[i] + '">';
      // for (var j = 0; j < question.labels.length; j++) {
      //   options_string += '<li style="width:' + width + '%"><label class="jspsych-survey-likert-opt-label"><input type="radio" name="Q' + question_order[i] + '" value="' + j + '"';
      //   if(question.required){
      //     options_string += ' required';
      //   }
      //   options_string += '>' + question.labels[j] + '</label></li>';
      // }
      // options_string += '</ul>';
      // html += options_string;



      // options - slider
      // html += '<div class="jspsych-html-slider-response-container" ';
      // if(trial.slider_width !== null){
      //   html += 'width:'+trial.slider_width+'px;';
      // }
      // html += '">';



      //html += '<ul class="jspsych-survey-likert-opts" data-name="'+question.name+'" data-radio-group="Q' + question_order[i] + '">';


      //html += '<input type="range" name="Q' + question_order[i] + '" value="'+trial.slider_start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" class="slider" id="jspsych-html-slider-response-response"></input>';
      
      html += '<input type ="text" name="Q' + question_order[i] + '" value="'+ 0 +'" data-min="'+0+'" data-max="'+100+'" class="amount"></input>';
      html += '<div class = "slider tied">';
      html += '</div>';


      // labels
      // html += '<div>'
      // for(var j=0; j < trial.labels_top.length; j++){
      //   var width = 100/(trial.labels_top.length-1);
      //   var left_offset = (j * (100 /(trial.labels_top.length - 1))) - (width/2);
      //   html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%; top: -20%;">';
      //   html += '<span style="text-align: center; font-size: 80%;">'+trial.labels_top[j]+'</span>';
      //   html += '</div>'
      // }
      // for(var j=0; j < trial.labels_bottom.length; j++){
      //   var width = 100/(trial.labels_bottom.length-1);
      //   var left_offset = (j * (100 /(trial.labels_bottom.length - 1))) - (width/2);
      //   html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
      //   html += '<span style="text-align: center; font-size: 80%;">'+trial.labels_bottom[j]+'</span>';
      //   html += '</div>'
      // }
      // html += '</div>';



      //html += '</ul>';



      // html += '</div>';

    }

    html += '</span>';
    html += '</div>';
    html += '</div>';

    // add submit button
    html += '<input type="submit" id="jspsych-survey-likert-next" class="jspsych-survey-likert jspsych-btn" value="'+trial.button_label+'"></input>';

    html += '</form>'

    display_element.innerHTML = html;



    // tie sliders together
    $(display_element).ready(function () {
      console.log("ready!");

      var init = true;
      var elements = $(".multislider").children(".slider.tied").length;



      var MAX = 100;
      var initValue = (MAX / elements) >> 0;
      var InitMod = MAX % elements;

      $(".slider.tied").each(function () {
        var slidersTied = $(".slider.tied");
        var context = $(this);

        var input = context.prev(".amount");
        //console.log(input);

        var val = input.data('answer');
        //console.log(val);
        var min = input.data('min');
        var max = input.data('max');
        var range = 1;
        var proceed = false;

        $(this).empty().slider({
          value: val,
          min: min,
          max: max,
          range: range,
          animate: "slow",
          create: function (event, ui) {

            if (InitMod > 0) {
              $(this).slider('value', initValue + 1);
              $(this).prev('.amount').val(initValue + 1);
              InitMod = InitMod - 1;
            }
            else {
              $(this).slider('value', initValue);
              $(this).prev('.amount').val(initValue);
            }

          },
          slide: function (e, ui) {

            // Update display to current value
            $(this).prev('.amount').val(ui.value);

            var current = ($(this).index() / 2) >> 0;
            var total = 0;
            var counter = 0

            slidersTied.not(this).each(function () {

              total += $(this).slider("option", "value");
              counter += 1;
            });

            total += ui.value;

            if (total != MAX) {
              proceed = true;
            }

            var missing = MAX - total;
            console.log("missing: " + missing);

            counter = 0;

            if (proceed) {

              //carico vettore elementi
              var elements = [];

              slidersTied.each(function () {
                elements[counter] = $(this);
                counter += 1;
              });

              var endIndex = counter - 1;
              counter = endIndex + 1;

              while (missing != 0) {

                console.log("current counter: " + counter);
                do {
                  if (counter == 0) {
                    counter = endIndex;
                  }
                  else {
                    counter = counter - 1;
                  }
                } while (counter == current)

                console.log("elemento attuale: " + counter);

                var value = elements[counter].slider("option", "value");
                var result = value + missing;

                if (result >= 0) {
                  elements[counter].slider('value', result);
                  elements[counter].prev('.amount').val(result);

                  missing = 0;
                }
                else {
                  missing = result;
                  elements[counter].slider('value', 0);
                  elements[counter].prev('.amount').val(0);
                }

              }

            }

          }
        });
      });

    });



    // var init = true;
    // //var elements = display_element.querySelector(".multislider").children(".slider.tied").length;
    // var elements = display_element.querySelectorAll(".multislider .slider.tied").length;
    // var MAX = 100;
    // var initValue = (MAX / elements) >> 0;
    // var InitMod = MAX % elements;

    // display_element.querySelectorAll(".slider.tied").forEach(function (element) {
    //   var slidersTied = display_element.querySelectorAll(".slider.tied");
    //   //var context = display_element.querySelector(this);

    //   var context = display_element.querySelector(element);

    //   //var input = context.prev(".amount");
    //   var prev_input = context.previousElementSibling;
    //   var input = prev_input.querySelector('.amount');

    //   var val = input.data('answer');
    //   var min = input.data('min');
    //   var max = input.data('max');
    //   var range = 1;
    //   var proceed = false;

    //   display_element.querySelector(this).empty().slider({
    //     value: val,
    //     min: min,
    //     max: max,
    //     range: range,
    //     animate: "slow",
    //     create: function (event, ui) {

    //       if (InitMod > 0) {
    //         display_element.querySelector(this).slider('value', initValue + 1);
    //         display_element.querySelector(this).prev('.amount').val(initValue + 1);
    //         InitMod = InitMod - 1;
    //       }
    //       else {
    //         display_element.querySelector(this).slider('value', initValue);
    //         display_element.querySelector(this).prev('.amount').val(initValue);
    //       }

    //     },
    //     slide: function (e, ui) {

    //       // Update display to current value
    //       display_element.querySelector(this).prev('.amount').val(ui.value);

    //       var current = (display_element.querySelector(this).index() / 2) >> 0;
    //       var total = 0;
    //       var counter = 0

    //       slidersTied.not(this).each(function () {

    //         total += display_element.querySelector(this).slider("option", "value");
    //         counter += 1;
    //       });

    //       total += ui.value;

    //       if (total != MAX) {
    //         proceed = true;
    //       }

    //       var missing = MAX - total;
    //       console.log("missing: " + missing);

    //       counter = 0;

    //       if (proceed) {

    //         //carico vettore elementi
    //         var elements = [];

    //         slidersTied.each(function () {
    //           elements[counter] = display_element.querySelector(this);
    //           counter += 1;
    //         });

    //         var endIndex = counter - 1;
    //         counter = endIndex + 1;

    //         while (missing != 0) {

    //           console.log("current counter: " + counter);
    //           do {
    //             if (counter == 0) {
    //               counter = endIndex;
    //             }
    //             else {
    //               counter = counter - 1;
    //             }
    //           } while (counter == current)

    //           console.log("elemento attuale: " + counter);

    //           var value = elements[counter].slider("option", "value");
    //           var result = value + missing;

    //           if (result >= 0) {
    //             elements[counter].slider('value', result);
    //             elements[counter].prev('.amount').val(result);

    //             missing = 0;
    //           }
    //           else {
    //             missing = result;
    //             elements[counter].slider('value', 0);
    //             elements[counter].prev('.amount').val(0);
    //           }

    //         }

    //       }

    //     }
    //   });
    // });






    display_element.querySelector('#jspsych-survey-likert-form').addEventListener('submit', function(e){
      e.preventDefault();
      // measure response time
      var endTime = performance.now();
      var response_time = endTime - startTime;


      // create object to hold responses
      var question_data = {};
      var matches = display_element.querySelectorAll('#jspsych-survey-likert-form .jspsych-survey-likert-opts');
      for(var index = 0; index < matches.length; index++){
        var id = matches[index].dataset['radioGroup'];

      // button responses
      //   var el = display_element.querySelector('input[name="' + id + '"]:checked');
      //   if (el === null) {
      //     var response = "";
      //   } else {
      //     var response = parseInt(el.value);
      //   }

      //   var obje = {};
      //   if(matches[index].attributes['data-name'].value !== ''){
      //     var name = matches[index].attributes['data-name'].value;
      //   } else {
      //     var name = id;
      //   }
      //   obje[name] = response;
      //   Object.assign(question_data, obje);
      // }

      // slider responses 
        var response = display_element.querySelector('input[name="' + id + '"]').valueAsNumber;
        // var response = display_element.querySelector('#jspsych-html-slider-response-response').valueAsNumber;

      var obje = {};
      if(matches[index].attributes['data-name'].value !== ''){
        var name = matches[index].attributes['data-name'].value;
      } else {
        var name = id;
      }
      obje[name] = response;
      Object.assign(question_data, obje);
    }
      



      // save data
      var trial_data = {
        "rt": response_time,
        "responses": JSON.stringify(question_data),
        "question_order": JSON.stringify(question_order)
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trial_data);
    });

    var startTime = performance.now();
  };

  return plugin;
})();
