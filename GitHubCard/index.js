/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get("https://api.github.com/users/lucasgreenwell")
  .then(response => {
    // console.log(response)
    axios.get(response.data.followers_url)
      .then(response => {
        // console.log(response.data);
        response.data.forEach(obj =>{
          // console.log(obj);
          axios.get(`https://api.github.com/users/${obj.login}`)
            .then(response => {
              console.log(response)
              makeCard(response);
            })
        })
      })
    makeCard(response);
  })
  // .get("https://api.github.com/users/lucasgreenwell/followers")
  //   .then (response => {
  //     console.log(response)
  //   })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the followersArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ["https://api.github.com/users/Godnoken", "https://api.github.com/users/alex-lc", "https://api.github.com/users/alexisdavalos"];

// followersArray.forEach(ele => {
//   axios.get(ele)
//   .then(response => {
//     // console.log(response)
//     makeCard(response);
//   })
// })

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the 
          following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function makeCard (obj){
  //create elements
  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const link = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  //add classes
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name')
  username.classList.add('username');

  // set up structure
  const cards = document.querySelector('.cards');
  cards.append(card);
  card.append(img, cardInfo);
  cardInfo.append(name, username, location, profile, followers, following, bio);
  profile.insertAdjacentElement('afterend', link);

  // add info to elements
  name.textContent = obj.data.name;
  username.textContent = obj.data.login;
  location.textContent = obj.data.location;
  profile.textContent = "Profile: ";
  followers.textContent = `Followers: ${obj.data.followers}`;
  following.textContent = `Following: ${obj.data.followers}`;
  bio.textContent = obj.data.bio;
  img.setAttribute('src', obj.data.avatar_url)
  link.setAttribute('href',obj.data.html_url)
  link.textContent = obj.data.html_url;


  // for loop to Worker, had to alter component slightly, 
  // name.textContent = obj.name;
  // username.textContent = obj.login;
  // location.textContent = obj.location;
  // profile.textContent = "Profile: ";
  // followers.textContent = `Followers: ${obj.followers}`;
  // following.textContent = `Following: ${obj.followers}`;
  // bio.textContent = obj.bio;
  // img.setAttribute('src', obj.avatar_url)
  // link.setAttribute('href',obj.html_url)
  // link.textContent = obj.html_url;
}

