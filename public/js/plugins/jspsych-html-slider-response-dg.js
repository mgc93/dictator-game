/**
 * jspsych-html-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-slider-response-dg'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-slider-response-dg',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 100,
        description: 'Sets the maximum value of the slider',
      },
      slider_start: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Slider starting value',
        default: 50,
        description: 'Sets the starting value of the slider',
      },
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      labels_top: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name:'Labels Top',
        default: [],
        array: true,
        description: 'Labels of the slider top.',
      },
      labels_bottom: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name:'Labels Bottom',
        default: [],
        array: true,
        description: 'Labels of the slider bottom.',
      },
      block: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Block Number',
        default: null,
        description: 'Block Number.'
      },
      trial_number: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Trial Number',
        default: null,
        description: 'Trial Number.'
      },
      value_self_block: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Value Self Block',
        default: null,
        description: 'Value Self of Token for the Block.'
      },
      value_other_block: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Value Other Block',
        default: null,
        description: 'Value Other of Token for the Block.'
      },
      exchange_rate_block: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Exchange Rate Block',
        default: null,
        description: 'Exchange Rate of Token for the Block.'
      },
      value_self_trial: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Value Self Trial',
        default: null,
        description: 'Value Self of Token for the Trial.'
      },
      value_other_trial: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Value Other Trial',
        default: null,
        description: 'Value Other of Token for the Trial.'
      },
      exchange_rate_trial: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Exchange Rate Trial',
        default: null,
        description: 'Exchange Rate of Token for the Trial.'
      },
      er_interval_bottom_block: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Exchange Rate Interval Bottom Block',
        default: null,
        description: 'Value of Exchange Rate Interval Bottom Block.'
      },
      er_interval_top_block: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Exchange Rate Interval Top Block',
        default: null,
        description: 'Value of Exchange Rate Interval Top Block.'
      },
      slider_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Slider width',
        default: null,
        description: 'Width of the slider in pixels.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      require_movement: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Require movement',
        default: false,
        description: 'If true, the participant will have to move the slider before continuing.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the slider.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    var html = '<div id="jspsych-html-slider-response-wrapper" style="margin: 100px 0px;">';
    html += '<div id="jspsych-html-slider-response-stimulus">' + trial.stimulus + '</div>';


    html += '<div class="jspsych-html-slider-response-container" ';
    if(trial.slider_width !== null){
      html += 'width:'+trial.slider_width+'px;';
    }
    html += '">';
    html += '<input type="range" value="'+trial.slider_start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" id="jspsych-html-slider-response-response"></input>';
    html += '<div>'
    for(var j=0; j < trial.labels_top.length; j++){
      var width = 100/(trial.labels_top.length-1);
      var left_offset = (j * (100 /(trial.labels_top.length - 1))) - (width/2);
      html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%; top: -20%;">';
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels_top[j]+'</span>';
      html += '</div>'
    }
    for(var j=0; j < trial.labels_bottom.length; j++){
      var width = 100/(trial.labels_bottom.length-1);
      var left_offset = (j * (100 /(trial.labels_bottom.length - 1))) - (width/2);
      html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels_bottom[j]+'</span>';
      html += '</div>'
    }
    html += '</div>';
    html += '</div>';

    html += '</div>';

    if (trial.prompt !== null){
      html += trial.prompt;
    }

    // add submit button
    html += '<button id="jspsych-html-slider-response-next" class="jspsych-btn" '+ (trial.require_movement ? "disabled" : "") + '>'+trial.button_label+'</button>';

    display_element.innerHTML = html;

    var response = {
      rt: null,
      response: null
    };

    if(trial.require_movement){
      display_element.querySelector('#jspsych-html-slider-response-response').addEventListener('change', function(){
        display_element.querySelector('#jspsych-html-slider-response-next').disabled = false;
      })
    }

    display_element.querySelector('#jspsych-html-slider-response-next').addEventListener('click', function() {
      // measure response time
      var endTime = performance.now();
      response.rt = endTime - startTime;
      response.response = display_element.querySelector('#jspsych-html-slider-response-response').valueAsNumber;

      if(trial.response_ends_trial){
        end_trial();
      } else {
        display_element.querySelector('#jspsych-html-slider-response-next').disabled = true;
      }

    });

    

    function end_trial(){

      jsPsych.pluginAPI.clearAllTimeouts();

      // save data
      var trialdata = {
        "rt": response.rt,
        "stimulus": trial.stimulus,
        "slider_start": trial.slider_start,
        "response": response.response,
        "block": trial.block,
        "trial_number": trial.trial_number,
        "value_self_block": trial.value_self_block,
        "value_other_block": trial.value_other_block,
        "exchange_rate_block": trial.exchange_rate_block,
        "value_self_trial": trial.value_self_trial,
        "value_other_trial": trial.value_other_trial,
        "exchange_rate_trial": trial.exchange_rate_trial,
        "er_interval_bottom_block": trial.er_interval_bottom_block,
        "er_interval_top_block": trial.er_interval_top_block
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    }

    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-slider-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    var startTime = performance.now();
  };

  return plugin;
})();
