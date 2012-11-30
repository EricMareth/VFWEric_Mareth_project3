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
		var makeList =document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "display";
		for( i=0, length=localStorage.length; i<length; i++){
			var makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0] + " " + obj[n][1];
				makeSubLi.innerHTML = optSubText;
			}
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All characters have been destroyed!");
			window.location.reload();
			return false;
		}
	}
	
	function storeData(){
		var id			= Math.floor(Math.random()*10000001);
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
	
	
	var charType = ["Hero", "Side-kick", "Love Interest", "Mentor", "Villain", "Henchman", "Sub-Villain", "Supporting", "Walk-on", "Off-Screen", ]
	whatType();

	var displayData = $('displayData');
	displayData.addEventListener("click", getData);
	var clearLink = $('clearLink');
	clearLink.addEventListener("click", clearLocal);
	var save = $('saveChar');
	save.addEventListener("click", storeData);
	
});