# Project-1-Connect-4

This game is a simple two-player only connnect 4 variant. The screen will start out with a modal. Please plug in your name and the name of your competitor. One player will play red, one will play yellow. After the modal dissapears the board will appear. The rules are simple:

1) drop your pieces into a column on the board.
2) try to get 4 in a row. 
3) the first player to get 4 in a row wins. 


code:

Each circle on the board will be its own div. They will all have the class of circle. All of these divs will be stored in an array.  DocumentQuerySelectorAll("circle") will automatically store all of these divs into an array. There will be a button beneath each column to play in that column. The button will then access the circle array to change the color of the corresponding circle in that column. 

There will be a series of nested if statements to change the color of the correct div.For example if the first two circle divs in the column are colored clicking the button will color the third circle div from the bottom.  

The win condition will use the div array to check for four of the same color in a row.  
