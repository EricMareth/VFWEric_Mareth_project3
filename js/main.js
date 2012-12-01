// Web App Part 3
// Eric Mareth
// Visual Frameworks 1212

window.addEventListener("DOMContentLoaded", function(){
	
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function whatType(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('selectType'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "type");
		for(i=0, j=charType.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = charType[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	function getSelectedRadio(){
		var sexChange = document.forms[0].gender;
		for(i=0; i<sexChange.length; i++){
			if (sexChange[i].checked){
				genderVal = sexChange[i].value;
			}
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('charForm').style.display = "none";
				$('clearLink').style.display = "inline";
				$('displayData').style.display = "none";
				$('addChar').style.display = "inline";
				break;
			case "off":
				$('charForm').style.display = "block";
				$('clearLink').style.display = "inline";
				$('displayData').style.display = "inline";
				$('addChar').style.display = "none";			
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	
	function getData(){
		toggleControls("on");
		if (localStorage.length === 0){
			alert("There are no characters lurking in the shadows!");
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id","items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "display";
		for( i=0, length=localStorage.length; i<length; i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);						// ORIGINAL KEY definition = randomly generated number.
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0] + " " + obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);		// passing key to makeItemLinks function.
		}
	}
	
	// Creates edit and delete links
	function makeItemLinks(key, linksLi){						// KEY is passed from getData function.
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var	editText = "Edit Character";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText ="Delete Character";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//Grabs data from item in local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Shows the form.
		toggleControls("off");
		
		//populates the form fields with current localStorage values.
		$('charName').value  = item.name[1];
		$('taleName').value  = item.story[1];
		$('homeLand').value  = item.land[1];
		var radios = document.forms[0].gender;
		for(i=0; i<radios.length; i++){
			if(radios[i].value == "Male" && item.gender[1] == "Male"){
				radios[i].setAttribute("checked","checked");
			}else if(radios[i].value == "Female" && item.gender[1] == "Female"){
				radios[i].setAttribute("checked","checked");
			}else if(radios[i].value == "Complicated" && item.gender[1] == "Female"){
				radios[i].setAttribute("checked","checked");
			}
		}
		$('age').value  = item.age[1];
		$('type').value  = item.type[1];
		$('details').value  = item.details[1];
		$('created').value  = item.created[1];
		
		// remove the initial listener from the input 'save contact'
		save.removeEventListener("click", storeData);
		$('saveChar').value = "Edit Contact";
		var editSubmit = $('saveChar');
		// Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to banish this character?"); 
		if(ask){
			localStorage.removeItem(this.key);
			alert("That character has been irrevocably thrown into the void!")
			window.location.reload();
		}else{
			alert("This character has been SPARED! For now...");
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All characters have been destroyed!");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
		//Define the elements we want to check.
		var getName = $('charName');
		var getType = $('type');
		
		errMsg.innerHTML = "";
		getName.style.border = "1px solid black";
		getType.style.border = "1px solid black";
		
		var messageAry = [];
		
		if(getName.value === ""){
			var nameError = "Please tell us your character name.";
			getName.style.border = "1px solid red";
			messageAry.push(nameError);	
		}
		
		if(getType.value === "|-Choose Character Type-|"){
			var typeError = "What type of character is this?";
			getType.style.border = "1px solid red";
			messageAry.push(typeError);	
		}
		
		if(messageAry.length >= 1){
			for(i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			 e.preventDefault();
			return false;
		}else{
			storeData(this.key);
		}
	}
	
		
	
	function storeData(key){
		if(!key){
			var id			= Math.floor(Math.random()*10000001);
		}else{
			id = key;
		};
		getSelectedRadio();
		var item		={};
			item.name		=["Name:", $('charName').value];
			item.story		=["Story:", $('taleName').value];
			item.land		=["Land:", $('homeLand').value];
			item.gender		=["Sex:", genderVal];
			item.age		=["Age:", $('age').value];
			item.type		=["Character Type:", $('type').value];
			item.details	=["Details:", $('details').value];
			item.created	=["Birthdate:", $('created').value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Your character has been remembered!");
		
	}
	
	
	var charType = ["|-Choose Character Type-|", "Hero", "Side-kick", "Love Interest", "Mentor", "Villain", "Henchman", "Sub-Villain", "Supporting", "Walk-on", "Off-Screen"];
	var	errMsg  = $('errors');

	whatType();

	var displayData = $('displayData');
	displayData.addEventListener("click", getData);
	var clearLink = $('clearLink');
	clearLink.addEventListener("click", clearLocal);
	var save = $('saveChar');
	save.addEventListener("click", validate);
	
});