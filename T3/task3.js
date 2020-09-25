class Program {
    employees = [
      {
        "id": 1,
        "name": "Mildred Carson",
        "drinks": ["Macchiato"]
      },
      {
        "id": 2,
        "name": "Clifford Brown",
        "drinks": ["Latte"]
      },
      {
        "id": 3,
        "name": "Kellie Fletcher",
        "drinks": ["Flat White", "Espresso"]
      },
      {
        "id": 4,
        "name": "Don Parsons",
        "drinks": ["Espresso"]
      },
      {
        "id": 5,
        "name": "Renee Reynolds",
        "drinks": ["Cappuccino", "Macchiato"]
      },
      {
        "id": 6,
        "name": "Rudolph Bishop",
        "drinks": ["Latte", "Macchiato", "Flat White"]
      },
      {
        "id": 7,
        "name": "Geraldine Carpenter",
        "drinks": ["Espresso"]
      },
      {
        "id": 8,
        "name": "Hilda Jimenez",
        "drinks": ["Latte", "Macchiato", "Espresso"]
      },
      {
        "id": 9,
        "name": "Pauline Roberson",
        "drinks": ["Espresso"]
      },
      {
        "id": 10,
        "name": "Vanessa Barrett",
        "drinks": ["Flat White", "Cappuccino", "Latte"]
      }
    ];
    recipes = {
      "Cappuccino": {
        "coffee": 0.01,
        "water": 0.035,
        "milk": 0.09
      },
      "Espresso": {
        "coffee": 0.01,
        "water": 0.035
      },
      "Latte": {
        "coffee": 0.01,
        "water": 0.035,
        "milk": 0.135
      },
      "Flat White": {
        "coffee": 0.02,
        "water": 0.04,
        "milk": 0.11
      },
      "Macchiato": {
        "coffee": 0.01,
        "water": 0.035,
        "milk": 0.015
      }
    };
    prices = {
      "coffee": 3.6,
      "water": 1,
      "milk": 1.5
    };
  
    recipesPrices;
    maxEmployeesDrinksCount;
    sortedDrinksForEmployees;
  
    sortedDrinksByPrice;
  
    constructor() {
      this.setMaxEmployeesDrinksCount(); //Ищем максимальное кол-во любимых напитков
      this.calculateRecipePrice();  //Считаем стоимость всех напитков
      this.filterAndSortDrinks();   // Сортируем напитки 
    }
  
    processEmployees(budget) {     //выбираем приглашенных
      const employeesToParty = new Map();
  
      this.sortedDrinksByPrice.forEach(drink => {
        for (let i = 0; i <= this.maxEmployeesDrinksCount; i++) {
          this.employees.forEach(employee => {
            if ((budget - this.getDrinkPrice(drink) > 0) && employee.drinks[i] === drink) {
              if(!employeesToParty.has(employee.id)){
                budget = budget - this.getDrinkPrice(drink)
                employeesToParty.set(employee.id, {...employee, selected: i, drinks: [drink]});
              }
              else if(employeesToParty.get(employee.id).selected > i){
                budget = budget + this.getDrinkPrice(employeesToParty.get(employee.id).drinks[0]) - this.getDrinkPrice(drink)
                employeesToParty.set(employee.id, {...employee, selected: i, drinks: [drink]});
              }
            }
          });
        }
      });
  
      console.log(Array.from(employeesToParty.values()))
    }
  
    filterAndSortDrinks() {
      this.sortedDrinksByPrice = Object.keys(this.recipes).sort((first, second) => this.getDrinkPrice(first) - this.getDrinkPrice(second))
    }
  
  
    setMaxEmployeesDrinksCount() {
      this.maxEmployeesDrinksCount = this.employees
        .map(employee => employee.drinks.length)
        .sort()
        .reverse()[0];
    }
  
    getDrinkPrice(drinkName) {
      return this.recipesPrices[drinkName];
    }
  
    calculateRecipePrice() {
      this.recipesPrices = Object.entries(this.recipes)    //
        .reduce((accum, [drinkName, ingredients]) => ({
          ...accum,
          [drinkName]: this.getPriceBasedOnIngredients(ingredients)
        }), {});
    }
  
    getPriceBasedOnIngredients(ing) {     
      return Object.entries(ing)
        .reduce((accum, [ingredient, amount]) => accum + this.getIngredientPrice(ingredient) * amount, 0)
        .toFixed(2);            
    }
  
    getIngredientPrice(ingredient) {
      if (!this.prices || !this.prices[ingredient]) {
        throw new Error("No price for such ingredient");
      }
      return this.prices[ingredient];
    }
  
  }
  
  const program = new Program();
  
  program.processEmployees(0.25);



