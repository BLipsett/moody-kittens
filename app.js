/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target;
  let kittenID = generateId();
  let kittenName = form.name.value;
  let kittenMood = "Happy";
  let kittenImage = "https://robohash.org/" + kittenName + "?set=set4";
  let kitten = kittens.find((kitten) => kitten.name == kittenName);

  if (kittenName == "") {
    alert("Must enter a valid name");
    return;
  }

  if (kitten) {
    alert("Cannot have kittens with the same name");
  } else {
    kitten = {
      id: kittenID,
      name: kittenName,
      image: kittenImage,
      mood: kittenMood,
      tolerance: 5,
    };
    // }
    kittens.push(kitten);
    console.log(kitten);
  }
  saveKittens();
  form.reset();
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"));
  if (storedKittens) {
    kittens = storedKittens;
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenElem = document.getElementById("kittens");
  let kittenTemplate = "";
  kittens.forEach((kitten) => {
    kittenTemplate += `
    <div class="kitten-card">
    <h4>${kitten.id}</h4>
    <img class="kitten" src=${kitten.image}?set=set4>
    <h3><span>${kitten.name}</span></h3>
    <h4><span>Mood: ${kitten.mood}<span></h4>
    <h4>Tolerance: <span>${kitten.tolerance}</span></h4>
    <input type="number" id="petCounter" value="5">
    <button onClick="pet(id)">PET</button>
    <button>FEED</button>
    </div>`;
  });
  kittenElem.innerHTML = kittenTemplate;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find((k) => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let input = document.getElementById("petCounter");
  input.value = parseInt(input.value) + 1;
  console.log("click" + id);
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

// function findCat() {
//   let findImage = <img src="https://robohash.org/YOUR-TEXT.png"></img>;
// }

loadKittens();
drawKittens();
