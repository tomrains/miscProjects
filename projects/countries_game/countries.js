var countries = ['China', 'India', 'The United States', 'Indonesia', 'Brazil', 'Pakistan', 'Nigeria', 'Bangladesh', 'Russia', 'Mexico', 'Japan', 'Ethiopia', 'The Phillipines', 'Egypt', 'Vietnam', 'Germany', 'Democratic Republic of the Congo', 'Iran', 'Turkey', 'Thailand', 'The United Kingdom', 'France', 'Italy', 'Tanzania', 'South Africa', 'Myanmar', 'South Korea', 'Kenya', 'Colombia', 'Spain', 'Argentina', 'Ukraine', 'Uganda', 'Algeria', 'Sudan', 'Iraq', 'Poland', 'Canada', 'Morocco', 'Afghanistan', 'Saudi Arabia', 'Peru', 'Venezuela', 'Uzbekistan', 'Malaysia', 'Angola', 'Mozambique', 'Nepal', 'Ghana', 'Yemen', 'Madagascar', 'North Korea', 'Australia', 'Ivory Coast', 'Cameroon', 'Taiwan', 'Niger', 'Sri Lanka', 'Romania', 'Burkina Faso', 'Malawi', 'Mali', 'Syria', 'Kazakhstan', 'Chile', 'Zambia', 'The Netherlands', 'Guatemala', 'Ecuador', 'Zimbabwe', 'Cambodia', 'Senegal', 'Chad', 'Somalia', 'Guinea', 'South Sudan', 'Rwanda', 'Tunisia', 'Cuba', 'Belgium', 'Benin', 'Greece', 'Bolivia', 'Haiti', 'Burundi', 'The Dominican Republic', 'Czechia (formerly known as the Czech Republic)', 'Portugal', 'Sweden', 'Azerbaijan', 'Hungary', 'Jordan', 'Belarus', 'United Arab Emirates', 'Honduras', 'Tajikistan', 'Serbia', 'Austria', 'Switzerland', 'Israel', 'Papua New Guinea', 'Togo', 'Sierra Leone', 'Hong Kong', 'Bulgaria', 'Laos', 'Paraguay', 'El Salvador', 'Libya', 'Nicaragua', 'Lebanon', 'Kyrgyzstan', 'Turkmenistan', 'Denmark', 'Singapore', 'Finland', 'Slovakia', 'Norway', 'Congo', 'Eritrea', 'Palestine', 'Costa Rica', 'Ireland', 'Liberia', 'New Zealand', 'The Central African Republic', 'Oman', 'Mauritania', 'Croatia', 'Kuwait', 'Panama', 'Moldova', 'Georgia', 'Puerto Rico', 'Bosnia and Herzegovina', 'Uruguay', 'Mongolia', 'Armenia', 'Albania', 'Jamaica', 'Lithuania', 'Qatar', 'Namibia', 'Botswana', 'Lesotho', 'The Gambia', 'The Republic of Macedonia', 'Slovenia', 'Gabon', 'Latvia', 'Guinea-Bissau', 'Bahrain', 'Trinidad and Tobago', 'Swaziland', 'Estonia', 'Timor-Leste', 'Equatorial Guinea', 'Mauritius', 'Cyprus', 'Djibouti', 'Fiji', 'Reunion', 'Comoros', 'Bhutan', 'Guyana', 'Montenegro', 'Macau', 'The Solomon Islands', 'Luxembourg', 'Suriname', 'Western Sahara', 'Cabo Verde', 'Guadeloupe', 'Maldives', 'Malta', 'Brunei', 'The Bahamas', 'Martinique', 'Belize', 'Iceland', 'Barbados', 'French Polynesia', 'French Guiana', 'New Caledonia', 'Vanuatu', 'Mayotte'];
var populations = [1409517397, 1339180127, 324459463, 263991379, 209288278, 197015955, 190886311, 164669751, 143989754, 129163276, 127484450, 104957438, 104918090, 97553151, 95540800, 82114224, 81339988, 81162788, 80745020, 69037513, 66181585, 64979548, 59359900, 57310019, 56717156, 53370609, 50982212, 49699862, 49065615, 46354321, 44271041, 44222947, 42862958, 41318142, 40533330, 38274618, 38170712, 36624199, 35739580, 35530081, 32938213, 32165485, 31977065, 31910641, 31624264, 29784193, 29668834, 29304998, 28833629, 28250420, 25570895, 25490965, 24450561, 24294750, 24053727, 23626456, 21477348, 20876917, 19679306, 19193382, 18622104, 18541980, 18269868, 18204499, 18054726, 17094130, 17035938, 16913503, 16624858, 16529904, 16005373, 15850567, 14899994, 14742523, 12717176, 12575714, 12208407, 11532127, 11484636, 11429336, 11175692, 11159773, 11051600, 10981229, 10864245, 10766998, 10618303, 10329506, 9910701, 9827589, 9721559, 9702353, 9468338, 9400145, 9265067, 8921343, 8790574, 8735453, 8476005, 8321570, 8251162, 7797695, 7557212, 7364883, 7084571, 6858160, 6811297, 6377853, 6374616, 6217581, 6082357, 6045117, 5758075, 5733551, 5708844, 5523231, 5447662, 5305383, 5260750, 5068831, 4920724, 4905769, 4761657, 4731906, 4705818, 4659080, 4636262, 4420184, 4189353, 4136528, 4098587, 4051212, 3912061, 3663131, 3507017, 3456750, 3075647, 2930450, 2930187, 2890299, 2890297, 2639211, 2533794, 2291661, 2233339, 2100568, 2083160, 2079976, 2025137, 1949670, 1861283, 1492584, 1369125, 1367254, 1309632, 1296311, 1267689, 1265138, 1179551, 956985, 905502, 876562, 813912, 807610, 777859, 628960, 622567, 611343, 583455, 563402, 552628, 546388, 449568, 436330, 430835, 428697, 395361, 384896, 374681, 335025, 285719, 283007, 282731, 276255, 276244, 253045];

var questions_asked = 1;
var questions_correct = 0;

var newline = "\n";

while (questions_asked < 6) {
  var country1 = Math.floor((Math.random() * 186) + 1);
  var country2 = Math.floor((Math.random() * 186) + 1);
  if (country1 == country2) {
    country2 = country1 + 1;
  }
  if (country2 > 185) {
  country2 = country2 - 2;
  }
//the math might be wonky - figure out how many figures are in each array!

  var user_input = prompt(`Question ${questions_asked}: Which country has more people: A) ${countries[country1]} or B) ${countries[country2]}?`);
  var alteredInput = user_input.toUpperCase(user_input.trim());

  while (alteredInput != 'A' && alteredInput != 'B') {
    alert("Please enter A or B for your response.");
    var user_input = prompt(`Question ${questions_asked}: Which country has more people: A) ${countries[country1]} or B) ${countries[country2]}?`);
    alteredInput = user_input.toUpperCase(user_input.trim());
  }

  if (country1 < country2 && alteredInput == 'A') {
    var people = (populations[country1] - populations[country2]); //on previous code i had stuff to add in commas in the right spot - can figure that out later
    people = people.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    alert(`CORRECT! ${countries[country1]} has ${people} more people than ${countries[country2]}.`);
    questions_correct++;
  } else if (country1 < country2 && alteredInput == 'B') {
      var people = (populations[country1] - populations[country2]);
      people = people.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      alert(`WRONG! ${countries[country1]} has ${people} more people than ${countries[country2]}.`);
  } else if (country1 > country2 && alteredInput == 'A') {
      var people = (populations[country2] - populations[country1]);
      people = people.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      alert(`WRONG! ${countries[country2]} has ${people} more people than ${countries[country1]}.`);
  } else { //country1 > country2 and user_input == 'B'
      var people = (populations[country2] - populations[country1]);
      people = people.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      alert(`CORRECT! ${countries[country2]} has ${people} more people than ${countries[country1]}.`);
      questions_correct++;
  }
  questions_asked += 1
}

if (questions_correct == 0) {
  alert("Thanks for playing! You didn't get any questions right this time.");
} else if (questions_correct == 1) {
  alert(`Thanks for playing! You got ${questions_correct} question right out of 5. You could've done worse!`);
} else if (questions_correct == 2) {
  alert(`Thanks for playing! You got ${questions_correct} questions right out of 5. Not great, but not bad either!`);
} else if (questions_correct == 3) {
  alert(`Thanks for playing! You got ${questions_correct} questions right out of 5. A respectable score.`);
} else if (questions_correct == 4) {
  alert(`Thanks for playing! You got ${questions_correct} questions right out of 5. Fantastic job!`);
} else { //questions_correct == 5
  alert(`Thanks for playing! You got ${questions_correct} questions right out of 5. You're a geography genius!`);
}

