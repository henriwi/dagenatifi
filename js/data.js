var data = (function() {
	var textToMatch = "Det ble stille og (russeren) viste hvordan den [sorte] ingeniøren fungerte? Plutselig/Da så de tjueen(?) hobbiter [som] kom ved {siden} av kartongen! Boken kom og satt!? En venn (ristet) ei løvinne [bestemt]. Soldaten {lekte} leiligheten rett(?) ved en lysegrønn fiskebåt!! En turist [malte} en osthøvel. Trompetene {ankom}, mens gullfiskene sang på turbinen!! En figur $malte$ en #moped#. En kjempehelt &hørte& datamaskinen %til% purkene! En &sjeik& kjøpte seg en (verdensvant) overhead. #Lysegrønne# kanarifugler {fyllte} luften, og en tjukkas filosoferte /gjennom/ en boks. Noen [gullfisker] hacket veldig $brutalt$. Kaninene snøfreste mange bukker! Skien kom eller snakket(?). Plutselig var #isbjørnen# der foran den kraftige %ubåten%, og knakk(!) alle bueskytterene vagt. Ei jente $assisterte$ sabeltanngiraffen {rått}. Bjørnen var rosa og svær! En gullfisk tatoverte en turist brutalt. Da (malte) krigeren venninna latterlig.";
	var textArray = textToMatch.split("");
		
	function asArray() {
		return textArray;
	}
	
	function getValue(i) {
		var text = textArray[i];
		if(text === " ") {
			return "&nbsp;"
		} else {
			return text;
		}
	}
	
	function length() {
		return textArray.length;
	}
	
	return {
		asArray: asArray,
		getValue: getValue,
		length: length
	}
})();