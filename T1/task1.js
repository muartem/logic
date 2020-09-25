class Santa {

	
capWeight;
items;
count = 0;


constructor() {                                        
  const x = +prompt("input x");
  const y = +prompt("input y");
  const z = +prompt("input Z");
  this.items = [x, y, z];
  this.capWeight = +prompt("input w");
}

calculate() {

  const min = this.items.sort()[0];                     // ищем сколько максимум в раз влезет в сумку самый легкий предмет
  const maxCount = Math.floor(this.capWeight / min);  

  for (let i = 0; i <= maxCount; i++) {

	for (let j = 0; j <= maxCount; j++){
	  const xn = i * this.items[0];                     // x n-ое кол-во раз            
	  const yn = j * this.items[1];                     // y n-ое кол-во раз  
	  const zn = (maxCount - j) * this.items[2];        // z n-ое кол-во раз  
	  this.isEqual([xn, yn, zn])                       // сравниваем
	}
  }

  console.log(this.count)

}

isEqual(arr) {
  
  const length = arr.length
  for(let i=0; i<=length; i++){
	const newArr = [...arr];
	newArr[i] = 0;
	console.log(newArr)
	if(newArr.reduce((accum, next) => accum + next, 0) == this.capWeight){
		this.count++;
	}
  }
  
}

}

const santa = new Santa();


santa.calculate();
