// A personality quiz

// This is an array of objects that stores the personality trait that is prompted to the user and the weight for each prompt. 
// If a personality trait is considered more introverted, it will have a negative weight.
// If a personlity trait is considered more extroverted, it will have a positive weight.

var prompts = [
    {
        prompt: 'It is very late.',
        weight: 1000,
        class: 'group1'
    },
    {
        prompt: 'I have a lot of other things that I want to get do.',
        weight: 100,
        class: 'group2'
    },
    {
        prompt: 'It has been a long time since I last moved around.',
        weight: 10,
        class: 'group3'
    },
    {
        prompt: 'It has been a long time since I did art for myself.',
        weight: 1,
        class: 'group4'
    },
    {
        prompt: 'I feel like I have been doing the same thing for too long.',
        weight: 1,
        class: 'group4'
    },
    {
        prompt: 'I am feeling very jittery and/or antsy.',
        weight: 10,
        class: 'group3'
    },
    {
        prompt: 'I am so in the zone right now.',
        weight: 100,
        class: 'group2'
    },
    {
        prompt: 'I have not eaten in a long time.',
        weight: 1000,
        class: 'group1'
    }
]

var prompt_values = [
    {
        value: 'Strongly Agree',
        class: 'btn-default btn-strongly-agree',
        weight: 4
    },
    {
        value: 'Agree',
        class: 'btn-default btn-agree',
        weight: 3
    },
    {
        value: 'Neutral',
        class: 'btn-default btn-neutral',
        weight: 2
    },
    {
        value: 'Disagree',
        class: 'btn-default btn-disagree',
        weight: 1
    },
    {
        value: 'Strongly Disagree',
        class: 'btn-default btn-strongly-disagree',
        weight: 0
    }
]
    
    // For each prompt, create a list item to be inserted in the list group
    function createPromptItems() {
        document.addEventListener('DOMContentLoaded', function() {
            console.log("createPromptItems");
            for (var i = 0; i < prompts.length; i++) {
                console.log('in for loop createPromptItems');
                var prompt_li = document.createElement('li');
                var prompt_p = document.createElement('p');
                var prompt_text = document.createTextNode(prompts[i].prompt);

                prompt_li.setAttribute('class', 'list-group-item prompt');
                prompt_p.appendChild(prompt_text);
                prompt_li.appendChild(prompt_p);

                document.getElementById('quiz').appendChild(prompt_li);
            }
        })
    }
    
    // For each possible value, create a button for each to be inserted into each li of the quiz
    // function createValueButtons() {
        
    // 	for (var li_index = 0; li_index < prompts.length; li_index++) {
    // 		for (var i = 0; i < prompt_values.length; i++) {
    // 			var val_button = document.createElement('button');
    // 			var val_text = document.createTextNode(prompt_values[i].value);
    
    // 			val_button.setAttribute('class', 'value-btn btn ' + prompt_values[i].class);
    // 			val_button.appendChild(val_text);
    
    // 			document.getElementsByClassName('prompt')[li_index].appendChild(val_button);
    // 		}
    // 	}
    // }
    function createValueButtons() {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('look at me now ma')
            for (var li_index = 0; li_index < prompts.length; li_index++) {
                var group = document.createElement('div');
                group.className = 'btn-group btn-group-justified';
        
                for (var i = 0; i < prompt_values.length; i++) {
                    var btn_group = document.createElement('div');
                    btn_group.className = 'btn-group';
        
                    var button = document.createElement('button');
                    var button_text = document.createTextNode(prompt_values[i].value);
                    button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
                    button.appendChild(button_text);
                    button.addEventListener('click', function () {
                        console.log('here');
                        var classList = $(this).attr('class');
                        // console.log(classList);
                        var classArr = classList.split(" ");
                        // console.log(classArr);
                        var this_group = classArr[0];
                        // console.log(this_group);
                    
                        // If button is already selected, de-select it when clicked and subtract any previously added values to the total
                        // Otherwise, de-select any selected buttons in group and select the one just clicked
                        // And subtract deselected weighted value and add the newly selected weighted value to the total
                        if($(this).hasClass('active')) {
                            $(this).removeClass('active');
                            total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
                        } else {
                            // $('[class='thisgroup).prop('checked', false);
                            total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
                            // console.log($('.'+this_group+'.active').text());
                            $('.'+this_group).removeClass('active');
                    
                            // console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
                            // $(this).prop('checked', true);
                            $(this).addClass('active');
                            total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
                        }
                    
                        console.log(total);
                    })
        
                    btn_group.appendChild(button);
                    group.appendChild(btn_group);
        
                    document.getElementsByClassName('prompt')[li_index].appendChild(group);
                }
            }
            
            document.getElementById('submit-btn').addEventListener('click', function() {
                // After clicking submit, add up the totals from answers
            // For each group, find the value that is active
            $('.results').removeClass('hide');
            $('.results').addClass('show');
            
            // The scores for the test are stored in a four-digit counter. The code below separates the digits so they can be compared to see which has the highest score
            s = (total - (total % 1000)) / 1000
            p = ((total % 1000) - (total % 100)) / 100
            m = ((total % 100) - (total % 10)) / 10
            c = total % 10
            // We set movement as the baseline/tiebreaker. This is because we feel movement is the best way to take a break.
            highest = 0
            slot = 3
    
            // Which one of the four scores is the highest. This will find that number and remember which digit it was
            if(s > highest) {
                slot = 1
            }
            if(m > highest) {
                slot = 3
            }
            if(p > highest) {
                slot = 2
            }
            if(c > highest) {
                slot = 4
            }
    
            
            if(slot == 4) {
                // document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
                // console.log(document.getElementById('intro-bar').style.width);
                // document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
                document.getElementById('results').innerHTML = '<b>Time for a little creativity...</b><br><br>\
                You have been doing the same monotonous task for too long. Studies show that a quick creativity break can rejuvenate the brain.\n\
        <br><br>\
        Consider one of the following:\n\
        <br><br>\
        1. Think of two animals, and draw the cutest possible combination of the two.\n\n\
        <br><br>\
        2. Create a collage with five photos. Each photo should feature something that starts with each vowel.\n\n\
        <br><br>\
        3. Get a short story writing prompt from:\n\n\ '    
        // Create anchor element.
                // var a = document.createElement('a'); 
                  
                // // Create the text node for anchor element.
                // var link = document.createTextNode("Short Story Prompt Generator");
                  
                // // Append the text node to anchor element.
                // a.appendChild(link);  
                  
                // // Set the href property.
                // a.href = "https://www.squibler.io/plot-generator"; 
                  
                // // Append the anchor element to the body.
                // document.getElementById('shortStoryLink').append(a);
           
            } else if(slot == 1) {
                document.getElementById('results').innerHTML = "<b>We should switch gears.</b><br><br>\
               We get the sense that you still want to work, you just do not want to work on this anymore.\
        <br><br>\
        Maybe you just need the motivational boost of getting something done:\
        <br><br>\
        <li> 1. Clean a corner of the room. You will feel a lot better with a little less clutter, and then you will be ready to start working again\n\n\ </li>\
        <br><br>\
        <li id='toDoList'> 2. Knock out a smaller task. It will be one less thing weighing on your mind!\n\n\ </li>\
        <br><br>\
        <li> 3. Pick something you have always wanted to try. What would you need to do first? </li>";
            } else if(slot == 3) {
                document.getElementById('results').innerHTML = '<b>Treat yo self!</b><br><br>\
               Right now, your top priority should be you. Work is important, but you cannot succeed unless you take care of yourself.\
        <br><br>\
        Take a break to do the important things:\
        <br><br>\
        <li> 1. Go to sleep. If it is well into the AM, you should go to bed. Few things are worth messing up your sleep routine.\n\n\ </li>\
        <br><br>\
        <li> 2. Eat. If it has been a while since you last ate, put some fuel in your body. You will feel a lot better when you start again.\n\n\ </li>\
        <br><br>\
        <li> 3. Take a shower. You will feel productive and clean. It is a win-win. </li>\ '
        // Create anchor element.
        var a = document.createElement('a'); 
                  
        // Create the text node for anchor element.
        var link = document.createTextNode("Dance Break");
          
        // Append the text node to anchor element.
        a.appendChild(link);  
          
        // Set the href property.
        a.href = "https://www.youtube.com/watch?v=5UMCrq-bBCg&list=RDCMUCANLZYMidaCbLQFWXBC95Jg&start_radio=1"; 
          
        // Append the anchor element to the body.
        document.getElementById('danceBreakLink').append(a);
            } else if(slot == 2) {
                document.getElementById('results').innerHTML = "<b>Time to move!</b><br><br>\
                You have been sitting down for too long. Getting the blood flowing and relieving energy is key to your success.\
        <br><br>\
        Depending on how much time you have, here are some good options:\
        <br><br>\
        <br><br>\
        <li> Go for a run. Whether it is 2 miles or ten, a run can get out those jitters and make you feel great.\n\n\ </li>\
        <br><br>\
        <li id='danceBreakLink'> Take a quick dance break by following this link: \n\n\ </li>\
        <br><br>\
        <li> Take a shower. You will feel productive and clean. It is a win-win. </li> \ "
            // Create anchor element.
            var a = document.createElement('a'); 
                  
            // Create the text node for anchor element.
            var link = document.createTextNode("Dance Break");
              
            // Append the text node to anchor element.
            a.appendChild(link);  
              
            // Set the href property.
            a.href = "https://www.youtube.com/watch?v=5UMCrq-bBCg&list=RDCMUCANLZYMidaCbLQFWXBC95Jg&start_radio=1"; 
              
            // Append the anchor element to the body.
            document.getElementById('danceBreakLink').append(a); 
            }
        
            // Hide the quiz after they submit their results
            $('#quiz').addClass('hide');
            $('#submit-btn').addClass('hide');
            $('#retake-btn').removeClass('hide');
            })
        })
        
    }
    
    createPromptItems();
    createValueButtons();
    
    // Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
    // Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
    var total = 0;
    
    // Get the weight associated to group number
    function findPromptWeight(prompts, group) {
        var weight = 0;
    
        for (var i = 0; i < prompts.length; i++) {
            if (prompts[i].class === group) {
                weight = prompts[i].weight;
            }
        }
    
        return weight;
    }
    
    // Get the weight associated to the value
    function findValueWeight(question, value) {

        var weight = 0;
    
        for (var i = 0; i < question.length; i++) {
            if (question[i].value === value) {
                weight = question[i].weight;
            }
        }
    
        return weight;
    }
    
    // When user clicks a value to agree/disagree with the prompt, display to the user what they selected
    $('.value-btn').mousedown(function () {
        console.log('here_button');
        var classList = $(this).attr('class');
        // console.log(classList);
        var classArr = classList.split(" ");
        // console.log(classArr);
        var this_group = classArr[0];
        // console.log(this_group);
    
        // If button is already selected, de-select it when clicked and subtract any previously added values to the total
        // Otherwise, de-select any selected buttons in group and select the one just clicked
        // And subtract deselected weighted value and add the newly selected weighted value to the total
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
        } else {
            // $('[class='thisgroup).prop('checked', false);
            total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
            // console.log($('.'+this_group+'.active').text());
            $('.'+this_group).removeClass('active');
    
            // console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
            // $(this).prop('checked', true);
            $(this).addClass('active');
            total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
        }
    
        console.log(total);
    })
    
    
    
    $('#submit-btn').click(function () {
        // After clicking submit, add up the totals from answers
        // For each group, find the value that is active
        $('.results').removeClass('hide');
        $('.results').addClass('show');
        
        // The scores for the test are stored in a four-digit counter. The code below separates the digits so they can be compared to see which has the highest score
        s = (total - (total % 1000)) / 1000
        p = ((total % 1000) - (total % 100)) / 100
        m = ((total % 100) - (total % 10)) / 10
        c = total % 10
        // We set movement as the baseline/tiebreaker. This is because we feel movement is the best way to take a break.
        highest = 0
        slot = 3

        // Which one of the four scores is the highest. This will find that number and remember which digit it was
        if(s > highest) {
            slot = 1
        }
        if(m > highest) {
            slot = 3
        }
        if(p > highest) {
            slot = 2
        }
        if(c > highest) {
            slot = 4
        }

        
        if(slot == 4) {
            // document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
            // console.log(document.getElementById('intro-bar').style.width);
            // document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
            document.getElementById('results').innerHTML = "<b>Time for a little creativity...</b><br><br>\
            You have been doing the same monotonous task for too long. Studies show that a quick creativity break can rejuvenate the brain.\n\
    <br><br>\
    Consider one of the following:\n\
    <br><br>\
    1. Think of two animals, and draw the cutest possible combination of the two.\n\n\
    <br><br>\
    2. Create a collage with five photos. Each photo should feature something that starts with each vowel.\n\n\
    <br><br>\
    3. Get a short story writing prompt from:\n\n\ " 
                // Create anchor element.
            var a = document.createElement('a'); 
              
            // Create the text node for anchor element.
            var link = document.createTextNode("Short Story Prompt Generator");
              
            // Append the text node to anchor element.
            a.appendChild(link);  
              
            // Set the href property.
            a.href = "https://www.squibler.io/plot-generator"; 
              
            // Append the anchor element to the body.
            document.getElementById('shortStoryLink').append(a);
       
        } else if(slot == 1) {
            document.getElementById('results').innerHTML = "<b>We should switch gears.</b><br><br>\
           We get the sense that you still want to work, you just do not want to work on this anymore.\
    <br><br>\
    Maybe you just need the motivational boost of getting something done:\
    <br><br>\
    1. Clean a corner of the room. You will feel a lot better with a little less clutter, and then you will be ready to start working again\n\n\
    <br><br>\
    2. Knock out a smaller task. It will be one less thing weighing on your mind!\n\n\
    <br><br>\
    3. Pick something you have always wanted to try. What would you need to do first?";
        } else if(slot == 3) {
            document.getElementById('results').innerHTML = "<b>Treat yo self!</b><br><br>\
           Right now, your top priority should be you. Work is important, but you cannot succeed unless you take care of yourself.\
    <br><br>\
    Take a break to do the important things:\
    <br><br>\
    1. Go to sleep. If it is well into the AM, you should go to bed. Few things are worth messing up your sleep routine.\n\n\
    <br><br>\
    2. Eat. If it has been a while since you last ate, put some fuel in your body. You will feel a lot better when you start again.\n\n\
    <br><br>\
    3. Take a shower. You will feel productive and clean. It is a win-win.";
        } else if(slot == 2) {
            document.getElementById('results').innerHTML = "<b>Time to move!</b><br><br>\
            You have been sitting down for too long. Getting the blood flowing and relieving energy is key to your success.\
    <br><br>\
    Depending on how much time you have, here are some good options:\
    <br><br>\
    <br><br>\
    <li> Go for a run. Whether it is 2 miles or ten, a run can get out those jitters and make you feel great.\n\n\ </li>\
    <br><br>\
    <li id='danceBreakLink'> Take a quick dance break by following this link: \n\n\ </li>\
    <br><br>\
    <li> Take a shower. You will feel productive and clean. It is a win-win. </li> \ "
        // Create anchor element.
        var a = document.createElement('a'); 
              
        // Create the text node for anchor element.
        var link = document.createTextNode("Dance Break");
          
        // Append the text node to anchor element.
        a.appendChild(link);  
          
        // Set the href property.
        a.href = "https://www.youtube.com/watch?v=5UMCrq-bBCg&list=RDCMUCANLZYMidaCbLQFWXBC95Jg&start_radio=1"; 
          
        // Append the anchor element to the body.
        document.getElementById('danceBreakLink').append(a); 
        }
    
        // Hide the quiz after they submit their results
        $('#quiz').addClass('hide');
        $('#submit-btn').addClass('hide');
        $('#retake-btn').removeClass('hide');
    })
    
    // Refresh the screen to show a new quiz if they click the retake quiz button
    $('#retake-btn').click(function () {
        $('#quiz').removeClass('hide');
        $('#submit-btn').removeClass('hide');
        $('#retake-btn').addClass('hide');
    
        $('.results').addClass('hide');
        $('.results').removeClass('show');
    })