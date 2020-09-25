class Copy{
	
	items;
	copies;
	time = 0;

	constructor() {                                        
			const x = +prompt("input x");
			const y = +prompt("input y");
			this.items = [x, y];
			this.copies = +prompt("input N");
	}
	
	calculate() {

		const fasterXerox = this.items.sort()[0]; 
		const slowerXerox = this.items.sort().reverse()[0]; 
		
		if (this.copies > 0 ){
			
			this.time+=fasterXerox;             // первый скан
			this.copies--;
												// циклы, где принтеры работают от одновременного начала, до одновременного конца
			this.time += this.NOK(this.items) * this.NokInCopies(fasterXerox,slowerXerox);                  
			this.copies -= this.copiesInNOK(fasterXerox,slowerXerox) * this.NokInCopies(fasterXerox,slowerXerox);
			
			//К сожалению, я понял что все что написано лишнее,  а для работы достаточно следущих пару строк.. Но идея была шикарная


			let addTime = [];					//оставшиеся страницы
			for(let i=0; i<=this.copies; i++){
				const j = this.copies-i;
				const nf = i * fasterXerox;
				const ns = j * slowerXerox;
				const slower = [ns,nf].sort((a, b) => a - b).reverse()[0] ;
				addTime.push(slower);
			}
			this.time += addTime.sort((a, b) => a - b)[0];
			alert(this.time);



		} else alert("Input correct value of copies");
			
	}
	
	NokInCopies(fX,sX){															//сколько "NOK-ов" будет в процессе

		return Math.floor(this.copies/this.copiesInNOK(fX,sX));

	}

	copiesInNOK(fX,sX){                                                            //Сколько страниц напечатают два принтера, от одновременного начатия и до одновременного конца
		return this.NOK(this.items) / fX + this.NOK(this.items) / sX;
	}

	NOK(xeroxes){   											// найменьшее общее кратное
		const newXers = [...xeroxes];
		let a = newXers[0];
			for (var i = 1; i < newXers.length; i++){
				let b = newXers[ i ];
				const c = a;
				while (a && b){ a > b ? a %= b : b %= a; } 
						a = Math.abs(c*newXers[ i ])/(a+b);
				}
			return a;
			
	}

	advan(fX,sX){                                              // Сколько успеет отдать быстрый принтер страниц, пока медленный печатает одну
		return Math.floor(sX/fX)
	}
}




const copy = new Copy();

copy.calculate();

