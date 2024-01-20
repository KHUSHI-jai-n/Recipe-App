let result = document.getElementById('result')
let searchBtn = document.getElementById('search-btn')
let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
let input = document.getElementById('user-inp')
input.focus();

searchBtn.addEventListener('click', () => {
  let userInp = document.getElementById('user-inp').value
  if (userInp.length == 0) {
    result.innerHTML = `<h3 class="text-xl mt-4 text-center text-slate-700">Input field is empty</h3>`
  } else {
    fetch(url + userInp)
      .then(response => response.json())
      .then(data => {
        let myMeal = data.meals[0]
        let count = 1
        let ingredients = []
        for (let i in myMeal) {
          let ingredient = ''
          let measure = ''
          if (i.startsWith('strIngredient') && myMeal[i]) {
            ingredient = myMeal[i]
            measure = myMeal[`strMeasure` + count]
            count++
            ingredients.push(`${measure} ${ingredient}`)
          }
        }
        console.log(ingredients)
        result.innerHTML = `<img class="w-[60%] block mt-7 ml-20" src = ${myMeal.strMealThumb}>
      <div class="details relative bg-amber-400 text-center py-2">
          <h2 class="text-xl font-semibold">${myMeal.strMeal}</h2>
          <h2 class="text-md">${myMeal.strArea}</h2>
      </div>
      <div id="ingredient-con"></div>
      <div class="absolute bg-white w-[100%] z-[2] min-h-[100%] top-0 left-0 rounded-xl hidden" id="recipe">
          <button id="hide-recipe" class="relative w-7 h-7 bg-amber-400 text-lg px-1 top-5 left-[90%] rounded-md hover:opacity-85">X</button>
          <pre id="instructions" class="whitespace-pre-wrap break-words px-5 pt-10 pb-5" >${myMeal.strInstructions}</pre>
      </div>
      <button id="show-recipe" class="relative font-semibold text-lg left-[75%] py-3 px-2 bg-amber-400 top-4 rounded-lg hover:bg-amber-300 hover:scale-105 duration-200 cursor-pointer">View Recipe</button>
      `
        let ingredientCon = document.getElementById('ingredient-con')
        let parent = document.createElement('ul')
        parent.classList.add('text-base')
        parent.classList.add('list-disc')
        parent.classList.add('relative')
        parent.classList.add('grid')
        parent.classList.add('grid-cols-2')
        parent.classList.add('gap-x-4')
        parent.classList.add('gap-y-3')
        parent.classList.add('pt-5')
        parent.classList.add('pl-5')
        let recipe = document.getElementById('recipe')
        let hideRecipe = document.getElementById('hide-recipe')
        let showRecipe = document.getElementById('show-recipe')
        ingredients.forEach(i => {
          let child = document.createElement('li')
          child.innerText = i
          parent.appendChild(child)
          ingredientCon.appendChild(parent)
        })
        hideRecipe.addEventListener('click', () => {
          recipe.style.display = 'none'
        })
        showRecipe.addEventListener('click', () => {
          recipe.style.display = 'block'
        })
      }).catch(()=>{
        result.innerHTML = `<h3 class="text-xl mt-4 text-center text-slate-700">Invalid Input</h3>`
      })
  }
})
