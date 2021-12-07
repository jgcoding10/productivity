# productivity
Final Project: Clairandra Yoo, Alexandra Pipkin, and Jackandra Griffin

Title: Productive Procrastination
Premise: When your work is dragging, come fill out our simple quiz to decide which method of procrastination you would most benefit from.

DESIGN:
    Our code utilizes HTML, CSS, JavaScript, and Flask to create an interactive website with the ability to store past user data. Our time management favicon really sets us apart in our wedbsite appeal. Beyond that, we store
the user data in an SQL database titled 'productivity' with the table name 'users' and columns named: 'id,' 'username,' and 'hash.' Using 
hash helps us protects the user's private data, in this case, the password.
    The register page can add to this databased using the register.html page and the function 'register' defined in app.py. Register runs
through a series of checks to ensure the user filled out all of the required field and whether the username has been taken or not. Once it
has confirmed this, it adds the user's information to the database for future use. 
    Login uses this developed database to create a user session. Everyone who
uses our site will be required to login. The login function in app.py first checks if all the fields have been filled. Then, it checks the SQL database to see if this user already exists or not. If it exists, the site logs them in, and sends them back to the home page.
    Once the user has been logged in, they can access the Quiz Page. This has 
8 questions which help the program understand where the user is at, physcially
and mentally. There are four categories of potential procrastination that we will evaluate for the user: self-care, productivity, movement, and creativity. We ask each of these questions on a scale from 'Strongly Disagree' to 'Strongly Agree,' which each will be translated to a numerical value from 0 to 4 and used in an algorithm to determine the best way to productively procrastinate. 
    Each category has two questions that will be asked of the user. The values of 
these categories will all be stored in one counter, but separated by different digits. To accomplish this, each question has a different "weight" that will be multiplied by the answer value. This means all of the values for the self-care are stored in the 1000s place, the productivity values are in the 100s place, the movement ones are stored in the 10s place, and the creativity ones are stored in the 1s place. This total counter compiles as the user does the clicking. 
   Once the user clicks submit, the code takes this counter, and finds which of 
the digits has the greatest value. For example, say we are in the thousands place, taking the remaineder when you divide the total by 1000, then subtracting that from the full total, and dividing all of that by 1000. This will leave us with the value of the desired 1000s place digit. 
    With all of these values, the code finds which one is the greatest. It will 
then change to display a results page depending on which one you got. This will have an explanation of the result you received, as well as a few ideas of how you can best procrastinate. 
    We also included a button on the quiz page that says "Click to suffer!" which 
can take you to a page where you can do something else with your time. 
    The last mechanism we added is a todo list. When you get the productivity 
result, it will provide a link to your todo list. On this page, you can type in the entry field a task you need to do. If there is nothing entered, the field will just display the prompt. If you try to submit without putting anything in, it will give you an error message. 
    Once you enter a valid task, it will put it into the list below. This new 
item will always appear at the top of the list. If you click off the task, the event listener will recognize this and create a strikethrough on the task so that you get the satisfaction of knowing you're done. If you click on the little trash can all the way to the right, it will take the task out of the array so that you cannot see it at all anymore. 