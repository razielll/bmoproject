1. How long did you spend on the coding test? What would you add to your solution if you had
   more time? If you didn&#39;t spend much time on the coding test then use this as an opportunity to
   explain what you would add.

     I spend around 10-15 minutes on creating the class component and displaying the API call.
     I would add a loader spinner/indicator, and maybe some error handling.
     Another 5-10 minutes to read about and implement WCAG.
     I would also add, next and previous buttons functionality, and maybe an options, to change the display setting,
     for example, two buttons on the top right side, that toggle between a list display and 'card items' display, with picture and other details.


2. What was the most useful feature that was added to the latest version of your chosen language?

    Definitely async/await functionality.
    Module imports is HUGE,  i.e.     import { someExport } from '../moduleDir/', 
    And ofcourse, the crown jewel of ES6, ARROW functions!
      let myFunc = () => {}

    also for an example of async await, when i first wrote the code to fetch results it was
      
      fetch(API_URL + this.state.searchQuery)
        .then(res => res.json())
        .then((result) => {
          console.log('GOT RESULTs', result)
          this.setState({
            total: result.total_entries,
            page: this.current_page,
            restaurants: result.restaurants
          });
        })

    and after moving to async/await syntax, i think it's much more intuitive and easier to read
      
      fetchResults = async () => {
        const API_URL = 'http://opentable.herokuapp.com/api/restaurants?city='

        const fetchResult = await fetch(API_URL + this.state.searchQuery)
        const jsonResult = await fetchResult.json();
        const { total_entries, restaurants } = jsonResult;

        this.setState({
          total: total_entries,
          restaurants: restaurants
        }, () => {
          console.log('state updated with results!');
        });
      };


- Please include a snippet of code that shows how you&#39;ve used it.

  Since the arrow function inherits the lexical scope, We saved ourselves binding our handler functions in the constructor by using arrow function in the class component.
  This sounds a mouthful, i'll demonstrate;

  Instead of doing :
  --------------------------
    constructor (props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
  --------------------------

  We did :
  --------------------------
    handleChange = (e) => {
      this.setState({ searchQuery: e.target.value })
    }
  --------------------------
  Much cleaner.

3. How would you track down a performance issue in production? Have you ever had to do this?

    Few methods, One would be using the Performance monitor tool in the chrome devtools. 
    Then there's the react Profiler, which i havn't used too much recently to be honest.
    There's are the first options i would tackle to track down UNSEEN performance issues.


4. How would you improve the API that you just used?
    After some thinking, I would definitely add last_page parameter to the API return result.

5. Please describe yourself using JSON.
    const DEVELOPER_ANTON = {
        'name': 'Stoliarchuk Anton',
        'age': '32',
        'location': 'Toronto, Ontario, Canada',
        'languages': 'English, Hebrew, Russian',
        'Hobbies':'Computers, Sports, Yoga, Reading',
        'skills': 'Ninja, JS Ninja',
        'tech_stack': 'React.JS , Node, NPM, Vue.JS, Git, Jira, CSS, expres, REST APIs, Mongo, ask me for more!'
    }
