# productivity
Final Project: Clairandra Yoo, Alexandra Pipkin, and Jackandra Griffin

Title: Productive Procrastination
Premise: When your work is dragging, come fill out our simple quiz to decide which method of procrastination you would most benefit from.

DESIGN:
    Our code utilizes HTML, CSS, JavaScript, and Flask to create an interactive website with the ability to store past user data. We store
the user data in an SQL database titled 'productivity' with the table name 'users' and columns named: 'id,' 'username,' and 'hash.' Using 
hash helps us protects the user's private data, in this case, the password.
    The register page can add to this databased using the register.html page and the function 'register' defined in app.py. Register runs
through a series of checks to ensure the user filled out all of the required field and whether the username has been taken or not. Once it
has confirmed this, it adds the user's information to the database for future use. 
    Login uses this developed database to create a user session. Everyone who
uses our site will be required to login, in order to record their past records
of use.

// Did we do this?

The login function in app.py first checks if all the fields have been 
filled. Then, it checks the SQL database to see if this user already exists or not. If it exists, the site logs them in, and sends them back to the home page.
    Once the user has been logged in, they can access the Quiz Page. This has 
8 questions which help the program understand where the user is at, physcially
and mentally.

// Did we change this?

There are four categories of potential procrastination that we will evaluate for
the user: self-care, productivity, movement, and creativity. We ask each of these questions on a scale from 'Strongly Disagree' to 'Strongly Agree,' which each will be translated to a numerical value from 0 to 4. 
    Each category has two questions that will be asked of the user. The values of 
these categories will all be stored in one counter, but separated by different digits. To accomplish this, each question has a different "weight" that will be multiplied by the answer value. This means all of the values for the self-care are stored in the 1000s place, the productivity values are in the 100s place, the movement ones are stored in the 10s place, and the creativity ones are stored in the 1s place. This total counter compiles as the user does the clicking. 
   Once the user clicks submit, the code takes this counter, and finds which of 
the digits has the greatest value.  